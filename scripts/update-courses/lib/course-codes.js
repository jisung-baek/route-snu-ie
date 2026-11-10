// 교과목번호 표(docs/ie_codes.xlsx, 공과대학 교과목 코드체계 개편표)를 과목명 → { old, new } 표로 만듭니다.
// 학과 개설 예정 엑셀에는 번호가 없어서, 화면(js/script.js)이 과목명으로 이 표를 찾아 붙입니다.
const fs = require("node:fs");
const { cellText } = require("./parse-courses");

const PREFIX = "window.COURSE_CODES = ";
const DEPARTMENT = "산업공학과";

// 과목명 비교 키: 공백을 지우고 "(구 최적화원론)" 같은 옛 이름 메모를 뺀다.
// js/script.js의 courseNameKey()와 똑같아야 합니다.
function courseNameKey(name) {
  return String(name || "").replace(/\(구[^)]*\)/g, "").replace(/\s+/g, "");
}

function levelOf(sheetName) {
  return /대학원/.test(sheetName) ? "graduate" : "undergraduate";
}

// 헤더는 위쪽 몇 행에 나뉘어 있으므로 열마다 위 5행의 글자를 이어 붙여 찾는다.
function findColumns(rows) {
  const top = rows.slice(0, 5);
  const width = Math.max(...top.map((row) => row.length));
  const labels = Array.from({ length: width }, (_, c) => top.map((row) => cellText(row[c]).replace(/\s+/g, "")).join("|"));
  const find = (re) => labels.findIndex((label) => re.test(label));
  const findLast = (re) => labels.findLastIndex((label) => re.test(label));
  const cols = { old: find(/교과목번호/), name: find(/교과목명/), dept: find(/주관학과/), next: findLast(/교과목코드체계/) };
  const missing = Object.entries(cols).filter(([, index]) => index < 0).map(([key]) => key);
  if (missing.length) throw new Error(`교과목번호 표에서 열을 찾지 못했습니다: ${missing.join(", ")}`);
  let firstData = 0;
  for (let r = 0; r < rows.length; r += 1) if (/^[A-Z0-9]+\.[A-Z0-9]+$/.test(cellText(rows[r][cols.old]))) { firstData = r; break; }
  return { cols, firstData };
}

// sheets: [{ name, rows }]. 산업공학과 과목과 공과대학 공통(주관학과 빈칸) 과목만 담고, 같은 이름이면 산업공학과가 이긴다.
function buildCodeMap(sheets, manual = []) {
  const map = { undergraduate: {}, graduate: {} };
  const rank = {};
  for (const sheet of sheets) {
    const level = levelOf(sheet.name);
    const { cols, firstData } = findColumns(sheet.rows);
    for (const row of sheet.rows.slice(firstData)) {
      const name = cellText(row[cols.name]);
      const old = cellText(row[cols.old]);
      const dept = cellText(row[cols.dept]);
      if (!name || !old || (dept && dept !== DEPARTMENT)) continue;
      const key = courseNameKey(name);
      const score = dept === DEPARTMENT ? 2 : 1;
      if ((rank[`${level}|${key}`] || 0) >= score) continue;
      rank[`${level}|${key}`] = score;
      map[level][key] = { old, new: cellText(row[cols.next]) || null };
    }
  }
  // 수동 표: 적은 칸만 덮고, former(이름이 바뀌기 전 과목 번호)는 덧붙인다.
  for (const entry of manual) {
    const level = entry.level === "graduate" ? "graduate" : "undergraduate";
    const key = courseNameKey(entry.name);
    const base = map[level][key] || { old: null, new: null };
    const next = { old: entry.old || base.old, new: entry.new || base.new };
    const former = [...(base.former || []), ...(entry.former || [])].filter((f) => f && f.old);
    if (former.length) next.former = former.map((f) => ({ name: f.name || "", old: f.old }));
    map[level][key] = next;
  }
  return map;
}

// 화면과 같은 규칙으로 찾는다: 대학원 과목은 대학원 표 먼저, 나머지는 학사 표 먼저.
function lookupCodes(map, course) {
  const key = courseNameKey(course.name);
  const order = course.category === "대학원" ? ["graduate", "undergraduate"] : ["undergraduate", "graduate"];
  for (const level of order) if (map[level]?.[key]) return map[level][key];
  return null;
}

function renderCodesFile(map, source) {
  const header = [
    "// 자동 생성 파일 — 직접 수정하지 마세요. scripts/update-courses에서 `npm run codes`로 다시 만듭니다.",
    `// 원본: ${source.join(", ")}`,
    "// 형식: { undergraduate|graduate: { 과목명 키(공백 제거): { old: 구 교과목번호, new: 신 코드, former?: [{ name: 이전 과목명, old }] } } }",
    ""
  ].join("\n");
  return `${header}${PREFIX}${JSON.stringify(map, null, 2)};\n`;
}

function readCodesFile(path) {
  if (!fs.existsSync(path)) return null;
  const text = fs.readFileSync(path, "utf8");
  const start = text.indexOf(PREFIX);
  if (start < 0) return null;
  try {
    return JSON.parse(text.slice(start + PREFIX.length).replace(/;\s*$/, ""));
  } catch {
    return null;
  }
}

module.exports = { courseNameKey, buildCodeMap, lookupCodes, renderCodesFile, readCodesFile };
