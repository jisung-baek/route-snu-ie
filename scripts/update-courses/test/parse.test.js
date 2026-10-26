const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { readWorkbookRows } = require("../lib/xlsx");
const { parseCourseRows, diffAgainstPrevious } = require("../lib/parse-courses");
const { parsePostHtml, extractDate } = require("../lib/post");
const { renderDataFile, readDataFile } = require("../lib/data-file");

const schema = JSON.parse(fs.readFileSync(path.join(__dirname, "../../../data/course-schema.json"), "utf8"));
const fixture = (name) => path.join(__dirname, "fixtures", name);

async function parseFixture() {
  const { rows } = await readWorkbookRows(fs.readFileSync(fixture("2026-07-29.xlsx")));
  return parseCourseRows(rows, schema);
}

test("2026-07-29 엑셀 → 2025-2 이후만 남기면 손으로 만든 사이트 데이터 64개와 똑같다", async () => {
  const result = await parseFixture();
  assert.equal(result.errors.length, 0);
  assert.deepEqual(result.terms, ["2023-2", "2024-1", "2024-2", "2025-1", "2025-2", "2026-1", "2026-2", "2027-1", "2027-2", "2028-1"]);

  const expected = JSON.parse(fs.readFileSync(fixture("2026-07-29.expected.json"), "utf8"));
  const trimmed = result.courses
    .map((c) => ({ ...c, offerings: c.offerings.filter(([term]) => term >= "2025-2") }))
    .filter((c) => c.offerings.length > 0);
  assert.deepEqual(trimmed, expected);
});

test("알려진 불규칙(끝 공백, 구분 칸의 'O', 각주 행)은 경고 없이 처리된다", async () => {
  const result = await parseFixture();
  const codes = result.warnings.map((w) => w.code);
  assert.deepEqual(codes, []);
  assert.ok(result.stats.droppedNoOffering >= 6, "각주 행과 개설 없는 과목이 제외돼야 한다");
  const linear = result.courses.find((c) => c.name === "선형최적화");
  assert.equal(linear.type, "", "구분 'O'는 aliases로 빈 값이 된다");
  assert.ok(!result.courses.some((c) => /\s$/.test(c.name)), "과목명 끝 공백 제거");
});

test("헤더를 못 찾으면 errors, 이상한 값은 warnings + 기본값", () => {
  const broken = parseCourseRows([["제목"], ["아무", "열", "없음"]], schema);
  assert.equal(broken.errors[0].code, "header_not_found");
  assert.deepEqual(broken.courses, []);

  const odd = parseCourseRows([
    [null, "교과목명", "구분", "2027학년도 1학기", "2027학년도 2학기"],
    ["5학년", "새과목", "전탐", "O", "X"],
    [null, "둘째", null, "△", "o(연합)"]
  ], schema);
  assert.equal(odd.errors.length, 0);
  assert.deepEqual(odd.courses, [
    { category: "5학년", name: "새과목", type: "", offerings: [["2027-1", "O"]] },
    { category: "5학년", name: "둘째", type: "", offerings: [["2027-2", "O(연합)"]] }
  ]);
  const codes = odd.warnings.map((w) => w.code).sort();
  assert.deepEqual(codes, ["unknown_category", "unknown_mark", "unknown_type"]);
});

test("직전 데이터와 비교해 추가/삭제/급변을 경고한다", () => {
  const prev = [{ category: "2학년", name: "A" }, { category: "2학년", name: "B" }, { category: "대학원", name: "C" }];
  const next = [{ category: "2학년", name: "A" }, { category: "2학년", name: "B2" }];
  const diff = diffAgainstPrevious(prev, next, schema);
  assert.deepEqual(diff.added, ["2학년|B2"]);
  assert.deepEqual(diff.removed, ["2학년|B", "대학원|C"]);
  assert.ok(diff.warnings.some((w) => w.code === "course_count_jump"));
  assert.deepEqual(diffAgainstPrevious(undefined, next, schema).warnings, []);
});

test("게시물 HTML에서 제목 날짜와 첨부를 읽는다", () => {
  const html = `<html><head><title>향후 2년 개설 예정 교과목 목록(2026.07.29기준 업데이트) &#8211; SNU</title></head>
  <body><button onclick="window.location.href='/archive/?mod=document&uid=1613&action=kboard_file_download&kboard-file-download-nonce=abc&file=file1'" title="다운로드 표.xlsx">표.xlsx</button></body></html>`;
  const post = parsePostHtml(html, "https://ie.snu.ac.kr/archive/?mod=document&uid=1613");
  assert.equal(post.title, "향후 2년 개설 예정 교과목 목록(2026.07.29기준 업데이트)");
  assert.equal(post.sourceDate, "2026-07-29");
  assert.deepEqual(post.attachments, [{ url: "https://ie.snu.ac.kr/archive/?mod=document&uid=1613&action=kboard_file_download&kboard-file-download-nonce=abc&file=file1", name: "표.xlsx" }]);

  assert.equal(extractDate("목록(2027-1-5 업데이트)"), "2027-01-05");
  assert.equal(extractDate("2027년 1월 15일 기준"), "2027-01-15");
  assert.equal(extractDate("최신 목록"), null);
});

test("courses-data.js는 쓴 그대로 다시 읽힌다", () => {
  const payload = { schemaVersion: 1, sourceDate: "2026-07-29", sourceUrl: "https://x", terms: ["2026-1"], courses: [{ category: "a", name: "b", type: "", offerings: [["2026-1", "O"]] }] };
  const tmp = path.join(__dirname, "tmp-data.js");
  fs.writeFileSync(tmp, renderDataFile(payload));
  try {
    assert.deepEqual(readDataFile(tmp), payload);
  } finally {
    fs.unlinkSync(tmp);
  }
  assert.equal(readDataFile(path.join(__dirname, "nope.js")), null);
});
