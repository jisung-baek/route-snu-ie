#!/usr/bin/env node
// 개설 과목 자동 업데이트 실행기.
//
//   node bin/run.js                       게시물을 확인하고, 바뀌었으면 js/courses-data.js를 다시 만든다
//   node bin/run.js --force               바뀌지 않았어도 다시 만든다
//   node bin/run.js --file a.xlsx --date 2026-07-29   내려받지 않고 로컬 파일로 만든다 (수동 복구용)
//
// 결과는 out/ 폴더에 남깁니다 (워크플로가 읽음):
//   out/status        unchanged | changed | failed
//   out/report.json   상세
//   out/pr-body.md    changed일 때 PR 본문
//   out/issue-body.md failed일 때 Issue 본문
//   out/source.xlsx   내려받은 원본

const fs = require("node:fs");
const path = require("node:path");
const { createHash } = require("node:crypto");
const { readWorkbookRows } = require("../lib/xlsx");
const { parseCourseRows, diffAgainstPrevious } = require("../lib/parse-courses");
const { fetchPost, downloadAttachment } = require("../lib/post");
const { renderDataFile, readDataFile } = require("../lib/data-file");
const { prBody, issueBody } = require("../lib/report");

const ROOT = path.resolve(__dirname, "../../..");
const SCHEMA_PATH = path.join(ROOT, "data/course-schema.json");
const DATA_PATH = path.join(ROOT, "js/courses-data.js");
const OUT_DIR = path.resolve(__dirname, "../out");

function parseArgs(argv) {
  const args = { force: false, file: null, date: null };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--force") args.force = true;
    else if (argv[i] === "--file") args.file = argv[++i];
    else if (argv[i] === "--date") args.date = argv[++i];
    else throw new Error(`모르는 옵션: ${argv[i]}`);
  }
  return args;
}

function writeOut(name, content) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, name), content);
}

function finish(status, report) {
  writeOut("status", status);
  writeOut("report.json", JSON.stringify(report, null, 2));
  console.log(`[update-courses] ${status}: ${report.summary}`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const schema = JSON.parse(fs.readFileSync(SCHEMA_PATH, "utf8"));
  const previous = readDataFile(DATA_PATH);
  const postUrl = schema.sourcePostUrl || `https://ie.snu.ac.kr/archive/?mod=document&uid=${schema.sourcePostUid}`;

  let post;
  let file;
  if (args.file) {
    const buffer = fs.readFileSync(args.file);
    file = { buffer, sha256: createHash("sha256").update(buffer).digest("hex") };
    post = { url: postUrl, title: `(로컬 파일) ${path.basename(args.file)}`, sourceDate: args.date || null, attachmentName: path.basename(args.file) };
  } else {
    const fetched = await fetchPost(postUrl);
    post = { url: postUrl, title: fetched.title, sourceDate: fetched.sourceDate };
    const xlsx = fetched.attachments.filter((a) => /\.xlsx$/i.test(a.name));
    if (xlsx.length !== 1) {
      throw new Error(`xlsx 첨부가 정확히 1개여야 하는데 ${xlsx.length}개입니다: ${fetched.attachments.map((a) => a.name).join(", ") || "(첨부 없음)"}`);
    }
    post.attachmentName = xlsx[0].name;
    file = await downloadAttachment(xlsx[0].url, { cookie: fetched.cookie, referer: postUrl });
  }
  writeOut("source.xlsx", file.buffer);

  if (!post.sourceDate) {
    throw new Error(`게시물 제목에서 날짜를 찾지 못했습니다: "${post.title}"`);
  }

  const titleDateUnchanged = previous?.sourceDate === post.sourceDate;
  const fileUnchanged = previous?.sourceFileSha256 === file.sha256;
  if (!args.force && titleDateUnchanged && fileUnchanged) {
    return finish("unchanged", { summary: `제목 날짜(${post.sourceDate})와 파일 해시가 그대로입니다.`, sourceDate: post.sourceDate });
  }

  const { rows, sheetName } = await readWorkbookRows(file.buffer);
  const result = parseCourseRows(rows, schema);
  if (result.errors.length) {
    const error = new Error(result.errors.map((e) => e.message).join("\n"));
    error.result = result;
    error.post = post;
    throw error;
  }
  const diff = diffAgainstPrevious(previous?.courses, result.courses, schema);

  const payload = {
    schemaVersion: 1,
    sourceDate: post.sourceDate,
    sourceTitle: post.title,
    sourceUrl: post.url,
    sourceFile: post.attachmentName,
    sourceFileSha256: file.sha256,
    generatedAt: new Date().toISOString(),
    terms: result.terms,
    courses: result.courses
  };
  fs.writeFileSync(DATA_PATH, renderDataFile(payload));

  const body = prBody({ post, sourceDate: post.sourceDate, titleDateUnchanged, previous, result, diff });
  writeOut("pr-body.md", body);
  finish("changed", {
    summary: `${result.courses.length}개 과목, ${result.terms[0]}~${result.terms.at(-1)} (시트 "${sheetName}", 헤더 ${result.stats.headerRow}행, 개설 없음 제외 ${result.stats.droppedNoOffering}행)`,
    sourceDate: post.sourceDate,
    titleDateUnchanged,
    warnings: [...result.warnings, ...diff.warnings],
    stats: result.stats,
    added: diff.added,
    removed: diff.removed
  });
}

main().catch((error) => {
  const message = error?.stack || String(error);
  writeOut("issue-body.md", issueBody({ post: error.post || null, error: error.message || message, result: error.result }));
  finish("failed", { summary: error.message || message, error: message });
  process.exitCode = 1;
});
