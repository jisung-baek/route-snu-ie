// PR 본문 / 실패 Issue 본문 만들기. 관리자가 문서를 열지 않아도 여기만 보고 할 일을 알 수 있게 씁니다.
const DOC_PATH = "docs/개설과목-자동업데이트-운영.md";

const list = (items) => items.map((w) => `- ${w.message}`).join("\n");

function prBody({ post, sourceDate, titleDateUnchanged, previous, result, diff }) {
  const warnings = [...result.warnings, ...diff.warnings];
  const lines = [];
  lines.push(`학과 게시물 [${post.title}](${post.url})의 엑셀이 바뀌어 개설 과목 데이터를 다시 만들었습니다.`);
  lines.push("");
  lines.push("| | 이전 | 이번 |");
  lines.push("|---|---|---|");
  lines.push(`| 자료 날짜 | ${previous?.sourceDate || "-"} | ${sourceDate || "(제목에서 못 찾음)"} |`);
  lines.push(`| 과목 수(엑셀 전체) | ${previous?.courses?.length ?? "-"} | ${result.courses.length} |`);
  lines.push(`| 학기 범위 | ${previous?.terms ? `${previous.terms[0]} ~ ${previous.terms.at(-1)}` : "-"} | ${result.terms[0]} ~ ${result.terms.at(-1)} |`);
  lines.push(`| 첨부 파일 | | ${post.attachmentName} |`);
  lines.push("");

  if (titleDateUnchanged) {
    lines.push("> ⚠️ 게시물 제목의 날짜는 그대로인데 첨부 파일 내용이 바뀌었습니다. 학과가 파일만 교체한 것으로 보입니다.");
    lines.push("");
  }

  lines.push(warnings.length ? `### ⚠️ 확인할 점 ${warnings.length}건` : "### ✅ 자동 검사에서 걸린 것이 없습니다");
  if (warnings.length) lines.push(list(warnings));
  lines.push("");
  lines.push("### 머지 전 체크리스트");
  lines.push("- [ ] 아래 Vercel **Preview** 링크(bot 댓글)에서 `courses.html`을 열어 과목 목록이 정상인지 본다");
  lines.push("- [ ] 위 \"확인할 점\"이 있으면 하나씩 확인한다 (모르는 구분 값 → `data/course-schema.json`에 추가 후 Actions에서 다시 실행)");
  lines.push("- [ ] 홈(`index.html`)의 \"N개 과목 · YYYY-N학기까지\"와 footer 날짜가 바뀌었는지 본다");
  lines.push("- [ ] 이상 없으면 **Merge** — 머지되면 사이트에 바로 반영됩니다");
  lines.push("");
  lines.push(`자세한 절차: \`${DOC_PATH}\``);
  return lines.join("\n");
}

function issueBody({ post, error, result }) {
  const lines = [];
  lines.push(`개설 과목 자동 업데이트가 실패했습니다. 사이트는 **기존 데이터를 그대로** 보여주고 있으니 급하지는 않습니다.`);
  lines.push("");
  lines.push(`- 게시물: ${post?.url || "(읽지 못함)"}`);
  if (post?.title) lines.push(`- 제목: ${post.title}`);
  lines.push(`- 실행 로그: ${process.env.RUN_URL || "(Actions 탭에서 확인)"}`);
  lines.push("");
  lines.push("### 원인");
  lines.push("```");
  lines.push(error);
  lines.push("```");
  if (result?.errors?.length) lines.push(list(result.errors));
  lines.push("");
  lines.push("### 대응");
  lines.push("| 원인이 이런 경우 | 이렇게 |");
  lines.push("|---|---|");
  lines.push("| 헤더(교과목명/구분/학기)를 못 찾음 | 엑셀을 열어 헤더 이름을 확인하고 `data/course-schema.json`의 `headers`에 추가 |");
  lines.push("| 제목에서 날짜를 못 찾음 | 게시물 제목 형식이 바뀐 것. 개발자에게 `scripts/update-courses/lib/post.js`의 DATE_PATTERNS 수정 요청 |");
  lines.push("| xlsx 첨부가 없거나 2개 이상 | 학과가 파일을 다르게 올린 것. 게시물을 확인하고 필요하면 `sourcePostUid` 변경 |");
  lines.push("| 게시물 응답 오류(404/500) | 게시물이 옮겨졌는지 확인. 새 uid를 `data/course-schema.json`에 반영 |");
  lines.push("| 첨부가 xlsx가 아님(HTML 등) | 학과 사이트가 로그인을 요구하기 시작했을 수 있음. 개발자 확인 필요 |");
  lines.push("");
  lines.push("고친 뒤에는 Actions 탭 → **Update courses** → Run workflow 로 바로 다시 실행할 수 있습니다.");
  lines.push("");
  lines.push(`자세한 절차: \`${DOC_PATH}\``);
  return lines.join("\n");
}

module.exports = { prBody, issueBody };
