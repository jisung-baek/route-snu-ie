// js/courses-data.js 읽고 쓰기. 브라우저가 <script>로 동기 로드하는 파일이라 JS 형식이지만 내용은 JSON입니다.
const fs = require("node:fs");

const PREFIX = "window.COURSE_SOURCE = ";

function renderDataFile(payload) {
  const header = [
    "// 자동 생성 파일 — 직접 수정하지 마세요. GitHub Actions(update-courses)가 학과 게시물의 엑셀로 다시 만듭니다.",
    `// 원본: ${payload.sourceUrl}`,
    "// 형식: js/script.js의 normalizeCourses()가 읽습니다. 화면 코드는 이 파일의 필드명을 직접 읽지 않습니다.",
    ""
  ].join("\n");
  return `${header}${PREFIX}${JSON.stringify(payload, null, 2)};\n`;
}

function readDataFile(path) {
  if (!fs.existsSync(path)) return null;
  const text = fs.readFileSync(path, "utf8");
  const start = text.indexOf(PREFIX);
  if (start < 0) return null;
  const json = text.slice(start + PREFIX.length).replace(/;\s*$/, "");
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

module.exports = { renderDataFile, readDataFile };
