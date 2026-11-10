const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { readAllSheets } = require("../lib/xlsx");
const { courseNameKey, buildCodeMap, lookupCodes, renderCodesFile, readCodesFile } = require("../lib/course-codes");

const ROOT = path.join(__dirname, "../../..");
const header = [
  ["연번", "교과목번호", "교과목명", "주관대학(원)", "주관학과(부)", "코드체계 구조도", "코드체계 구조도"],
  ["연번", "교과목번호", "교과목명", "주관대학(원)", "주관학과(부)", "전공코드", "교과목코드체계"]
];

test("과목명 키는 공백과 '(구 …)' 메모를 무시한다", () => {
  assert.equal(courseNameKey("경영과학 1"), courseNameKey("경영과학1"));
  assert.equal(courseNameKey("볼록최적화(구 최적화원론)"), "볼록최적화");
});

test("산업공학과와 공대 공통 과목만 담고, 같은 이름이면 산업공학과가 이긴다", () => {
  const sheets = [{
    name: "대학원",
    rows: [...header,
      [1, "M3309.005100", "산업공학특론", "공과대학", "협동과정 인공지능전공", "IPAI", "IPAI.G001"],
      [2, "406.559", "산업공학특론", "공과대학", "산업공학과", "IE", "IE.G012"],
      [3, "M2177.011700", "공통과목", "공과대학", null, "ENGR", "ENGR.G025"],
      [4, "4190.001", "타과과목", "공과대학", "컴퓨터공학부", "CSE", "CSE.G001"]]
  }];
  const map = buildCodeMap(sheets);
  assert.deepEqual(map.graduate["산업공학특론"], { old: "406.559", new: "IE.G012" });
  assert.deepEqual(map.graduate["공통과목"], { old: "M2177.011700", new: "ENGR.G025" });
  assert.equal(map.graduate["타과과목"], undefined);
});

test("수동 표가 엑셀 표를 덮고, 대학원 과목은 대학원 표를 먼저 본다", () => {
  const sheets = [
    { name: "학사", rows: [...header, [1, "406.100", "같은이름", "공과대학", "산업공학과", "IE", "IE.1000"]] },
    { name: "대학원", rows: [...header, [1, "406.500", "같은이름", "공과대학", "산업공학과", "IE", "IE.G500"]] }
  ];
  const map = buildCodeMap(sheets, [{ name: "수동 과목", level: "undergraduate", old: "033.001" }]);
  assert.equal(lookupCodes(map, { name: "같은 이름", category: "대학원" }).new, "IE.G500");
  assert.equal(lookupCodes(map, { name: "같은이름", category: "3학년" }).new, "IE.1000");
  assert.deepEqual(lookupCodes(map, { name: "수동과목", category: "교양" }), { old: "033.001", new: null });
  assert.equal(lookupCodes(map, { name: "없는과목", category: "교양" }), null);
});

test("실제 docs/ie_codes.xlsx: 전공필수 번호가 이수규정 표와 같다", async () => {
  const map = buildCodeMap(await readAllSheets(fs.readFileSync(path.join(ROOT, "docs/ie_codes.xlsx"))));
  assert.deepEqual(lookupCodes(map, { name: "산업공학의 이해", category: "1학년" }), { old: "406.434", new: "IE.1010" });
  assert.deepEqual(lookupCodes(map, { name: "생산관리", category: "3학년" }), { old: "406.310", new: "IE.3210" });
  assert.deepEqual(lookupCodes(map, { name: "볼록최적화(구 최적화원론)", category: "대학원" }), { old: "M1505.003100", new: "IE.G320" });
});

test("수동 표는 적은 칸만 덮고 former를 덧붙인다", () => {
  const sheets = [{ name: "대학원", rows: [...header, [1, "M1505.003100", "볼록최적화", "공과대학", "산업공학과", "IE", "IE.G320"]] }];
  const map = buildCodeMap(sheets, [{ name: "볼록최적화", level: "graduate", former: [{ name: "최적화원론", old: "406.563" }] }]);
  assert.deepEqual(map.graduate["볼록최적화"], { old: "M1505.003100", new: "IE.G320", former: [{ name: "최적화원론", old: "406.563" }] });
});

test("생성 파일은 다시 읽으면 같은 표가 된다", () => {
  const map = { undergraduate: { 가: { old: "1", new: "2" } }, graduate: {} };
  const file = path.join(require("node:os").tmpdir(), `course-codes-${process.pid}.js`);
  fs.writeFileSync(file, renderCodesFile(map, ["test"]));
  assert.deepEqual(readCodesFile(file), map);
  fs.unlinkSync(file);
});
