// 학과 엑셀(향후 2년 개설 예정 교과목) → 사이트 내부 형식 변환.
// 이 파일만 엑셀의 생김새를 압니다. 화면(js/script.js)은 여기서 만든 결과만 읽습니다.
//
// 결과 형식(과목 하나):
//   { category: "2학년", name: "경영과학1", type: "전필", offerings: [["2026-1", "O(연합전공)"], ...] }
//
// 원칙: 구조를 못 읽으면 errors에 담고(= 실패), 값이 이상하면 warnings에 담고 기본값으로 계속 갑니다.

const TERM_HEADER = /(\d{4})\s*학년도\s*([12])\s*학기/;
const OFFERED_MARK = /^[Oo○〇◯]/; // "O", "O(연합전공)" 등 개설 표시의 첫 글자

function cellText(value) {
  if (value == null) return "";
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "object") {
    if (Array.isArray(value.richText)) return value.richText.map((part) => part.text).join("").trim();
    if (value.result !== undefined) return cellText(value.result); // 수식 셀
    if (value.text !== undefined) return cellText(value.text);     // 하이퍼링크 셀
  }
  return String(value).trim();
}

const squash = (text) => cellText(text).replace(/\s+/g, "");

function findHeaderRow(rows, schema) {
  const nameAliases = schema.headers.name.map(squash);
  const typeAliases = schema.headers.type.map(squash);
  for (let r = 0; r < Math.min(rows.length, 20); r += 1) {
    const cells = rows[r].map(squash);
    const nameCol = cells.findIndex((c) => nameAliases.includes(c));
    const typeCol = cells.findIndex((c) => typeAliases.includes(c));
    const termCols = cells
      .map((c, i) => ({ c, i }))
      .filter(({ c }) => TERM_HEADER.test(c))
      .map(({ c, i }) => {
        const [, year, half] = c.match(TERM_HEADER);
        return { col: i, term: `${year}-${half}` };
      });
    if (nameCol >= 0 && termCols.length > 0) {
      return { rowIndex: r, nameCol, typeCol, termCols };
    }
  }
  return null;
}

/**
 * @param {unknown[][]} rows  시트를 행 단위 2차원 배열로 읽은 것 (1행부터, 셀 원시값)
 * @param {object} schema     data/course-schema.json
 */
function parseCourseRows(rows, schema) {
  const warnings = [];
  const errors = [];
  const warn = (code, message) => warnings.push({ code, message });

  const header = findHeaderRow(rows, schema);
  if (!header) {
    errors.push({
      code: "header_not_found",
      message: `헤더 행을 찾지 못했습니다. "${schema.headers.name.join("/")}" 열과 "YYYY학년도 N학기" 열이 같은 행에 있어야 합니다.`
    });
    return { courses: [], terms: [], warnings, errors, stats: {} };
  }
  if (header.typeCol < 0) {
    warn("type_header_missing", `"${schema.headers.type.join("/")}" 열이 없어 모든 과목의 구분을 빈 값으로 둡니다.`);
  }
  // 학년/영역 열: 교과목명 바로 왼쪽 열. 병합 셀이라 그룹 첫 행에만 값이 있어 아래로 채웁니다.
  const categoryCol = header.nameCol - 1;
  if (categoryCol < 0) warn("category_column_missing", "교과목명 왼쪽에 학년/영역 열이 없어 모든 과목의 영역을 빈 값으로 둡니다.");

  const knownCategories = new Set(schema.categories.known);
  const knownTypes = new Set(schema.types.known);
  const typeAliases = schema.types.aliases || {};
  const unknownCategories = new Set();
  const unknownTypes = new Set();
  const unknownMarks = new Set();

  const courses = [];
  let currentCategory = "";
  let droppedNoOffering = 0;
  let duplicateNames = 0;
  const seenNames = new Set();

  for (let r = header.rowIndex + 1; r < rows.length; r += 1) {
    const row = rows[r] || [];
    if (categoryCol >= 0 && cellText(row[categoryCol])) currentCategory = cellText(row[categoryCol]);

    const name = cellText(row[header.nameCol]).replace(/\s+/g, " ");
    if (!name) continue;

    const offerings = [];
    for (const { col, term } of header.termCols) {
      const mark = cellText(row[col]);
      if (!mark) continue;
      if (!OFFERED_MARK.test(mark)) {
        unknownMarks.add(mark);
        continue;
      }
      offerings.push([term, "O" + mark.slice(1).trim()]);
    }
    // 개설 학기가 하나도 없는 행은 각주("가. 인간공학 분야 : …")거나 정보가 없는 과목이라 뺍니다.
    if (offerings.length === 0) {
      droppedNoOffering += 1;
      continue;
    }

    let type = header.typeCol >= 0 ? cellText(row[header.typeCol]) : "";
    if (Object.prototype.hasOwnProperty.call(typeAliases, type)) type = typeAliases[type];
    if (type && !knownTypes.has(type)) {
      unknownTypes.add(type);
      type = "";
    }

    if (currentCategory && !knownCategories.has(currentCategory)) unknownCategories.add(currentCategory);

    const key = `${currentCategory}|${name}`;
    if (seenNames.has(key)) duplicateNames += 1;
    seenNames.add(key);

    courses.push({ category: currentCategory, name, type, offerings });
  }

  if (courses.length === 0) errors.push({ code: "no_courses", message: "개설 학기가 있는 과목이 한 개도 없습니다." });
  if (unknownTypes.size) warn("unknown_type", `모르는 구분 값을 빈 값으로 바꿨습니다: ${[...unknownTypes].map((v) => `"${v}"`).join(", ")} — 맞는 값이면 data/course-schema.json의 types.known에 추가하세요.`);
  if (unknownCategories.size) warn("unknown_category", `모르는 학년/영역 값이 있습니다(그대로 표시됨): ${[...unknownCategories].map((v) => `"${v}"`).join(", ")} — 맞는 값이면 categories.known에 추가하세요.`);
  if (unknownMarks.size) warn("unknown_mark", `"O"로 시작하지 않는 개설 표시를 무시했습니다: ${[...unknownMarks].map((v) => `"${v}"`).join(", ")}`);
  if (duplicateNames) warn("duplicate_course", `같은 영역에 같은 이름의 과목이 ${duplicateNames}건 중복됩니다.`);

  const terms = header.termCols.map((t) => t.term).sort();
  return {
    courses,
    terms,
    warnings,
    errors,
    stats: { headerRow: header.rowIndex + 1, droppedNoOffering, termCount: terms.length }
  };
}

// 직전 데이터와 비교해 사람이 봐야 할 변화를 경고로 만듭니다.
function diffAgainstPrevious(previousCourses, nextCourses, schema) {
  const warnings = [];
  if (!Array.isArray(previousCourses) || previousCourses.length === 0) return { warnings, added: [], removed: [] };

  const key = (c) => `${c.category}|${c.name}`;
  const prevKeys = new Set(previousCourses.map(key));
  const nextKeys = new Set(nextCourses.map(key));
  const added = nextCourses.filter((c) => !prevKeys.has(key(c))).map(key);
  const removed = previousCourses.filter((c) => !nextKeys.has(key(c))).map(key);

  const ratio = Math.abs(nextCourses.length - previousCourses.length) / previousCourses.length;
  const limit = schema.validation?.courseCountChangeWarnRatio ?? 0.2;
  if (ratio > limit) {
    warnings.push({ code: "course_count_jump", message: `과목 수가 ${previousCourses.length} → ${nextCourses.length}개로 ${Math.round(ratio * 100)}% 바뀌었습니다.` });
  }
  if (added.length) warnings.push({ code: "courses_added", message: `새로 생긴 과목 ${added.length}개: ${added.join(", ")}` });
  if (removed.length) warnings.push({ code: "courses_removed", message: `사라진 과목 ${removed.length}개(이름이 바뀐 것일 수 있음): ${removed.join(", ")}` });
  return { warnings, added, removed };
}

module.exports = { parseCourseRows, diffAgainstPrevious, cellText, TERM_HEADER };
