#!/usr/bin/env node
// 교과목번호 표 생성기.
//
//   node bin/build-codes.js    docs/ie_codes.xlsx + data/course-codes-manual.json → js/course-codes.js
//
// 끝에 js/courses-data.js의 과목 중 번호를 못 찾은 과목을 출력합니다.

const fs = require("node:fs");
const path = require("node:path");
const { readAllSheets } = require("../lib/xlsx");
const { buildCodeMap, lookupCodes, renderCodesFile } = require("../lib/course-codes");
const { readDataFile } = require("../lib/data-file");

const ROOT = path.resolve(__dirname, "../../..");
const TABLE_PATH = path.join(ROOT, "docs/ie_codes.xlsx");
const MANUAL_PATH = path.join(ROOT, "data/course-codes-manual.json");
const OUT_PATH = path.join(ROOT, "js/course-codes.js");
const DATA_PATH = path.join(ROOT, "js/courses-data.js");

async function main() {
  const sheets = await readAllSheets(fs.readFileSync(TABLE_PATH));
  const manual = JSON.parse(fs.readFileSync(MANUAL_PATH, "utf8")).courses || [];
  const map = buildCodeMap(sheets, manual);
  fs.writeFileSync(OUT_PATH, renderCodesFile(map, ["docs/ie_codes.xlsx", "data/course-codes-manual.json"]));

  const counts = Object.entries(map).map(([level, entries]) => `${level} ${Object.keys(entries).length}`).join(", ");
  console.log(`[codes] js/course-codes.js: ${counts} (수동 ${manual.length})`);

  const data = readDataFile(DATA_PATH);
  if (data) {
    const missing = data.courses.filter((course) => !lookupCodes(map, course));
    console.log(`[codes] 개설 예정 ${data.courses.length}과목 중 번호 없음 ${missing.length}개${missing.length ? `: ${missing.map((c) => `${c.category}/${c.name}`).join(", ")}` : ""}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
