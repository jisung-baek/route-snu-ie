// 학과 홈페이지 게시물(KBoard) 읽기: 제목에서 날짜 뽑기, 첨부 xlsx 내려받기.
// 사이트 구조가 바뀌면 이 파일만 고치면 됩니다.
const { createHash } = require("node:crypto");

const USER_AGENT = "route-snu-ie course updater (+https://route-snu-ie.vercel.app)";
const DATE_PATTERNS = [
  /(\d{4})\s*[.\-/]\s*(\d{1,2})\s*[.\-/]\s*(\d{1,2})/, // 2026.07.29 · 2026-7-29
  /(\d{4})\s*년\s*(\d{1,2})\s*월\s*(\d{1,2})\s*일/     // 2026년 7월 29일
];

function decodeEntities(text) {
  return text
    .replace(/&#8211;/g, "–").replace(/&#8212;/g, "—")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'");
}

function extractDate(text) {
  for (const pattern of DATE_PATTERNS) {
    const m = text.match(pattern);
    if (!m) continue;
    const [, y, mo, d] = m;
    const iso = `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
    if (!Number.isNaN(Date.parse(iso))) return iso;
  }
  return null;
}

function parsePostHtml(html, postUrl) {
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? decodeEntities(titleMatch[1]).replace(/\s*[–-]\s*SNU\s*$/, "").trim() : "";

  const origin = new URL(postUrl).origin;
  const attachments = [];
  // 다운로드 버튼: onclick="window.location.href='/archive/?...&action=kboard_file_download&...&file=file1'" title="다운로드 파일명.xlsx"
  const buttonPattern = /window\.location\.href='([^']*kboard_file_download[^']*)'[^>]*title="(?:다운로드\s*)?([^"]*)"/g;
  for (const m of html.matchAll(buttonPattern)) {
    attachments.push({ url: new URL(decodeEntities(m[1]), origin).toString(), name: decodeEntities(m[2]).trim() });
  }
  return { title, sourceDate: extractDate(title), attachments };
}

async function fetchText(url, options = {}) {
  const res = await fetch(url, { headers: { "user-agent": USER_AGENT, ...(options.headers || {}) }, redirect: "follow" });
  if (!res.ok) throw new Error(`${url} 응답 ${res.status}`);
  return { text: await res.text(), setCookie: res.headers.getSetCookie?.() || [] };
}

async function fetchPost(postUrl) {
  const { text, setCookie } = await fetchText(postUrl);
  const cookie = setCookie.map((c) => c.split(";")[0]).join("; ");
  return { ...parsePostHtml(text, postUrl), cookie };
}

async function downloadAttachment(url, { cookie, referer }) {
  const res = await fetch(url, { headers: { "user-agent": USER_AGENT, cookie, referer }, redirect: "follow" });
  if (!res.ok) throw new Error(`첨부 다운로드 실패: 응답 ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "";
  // xlsx는 zip이라 "PK"로 시작합니다. 로그인 페이지 같은 HTML이 내려오면 여기서 걸립니다.
  const isZip = buffer.length > 4 && buffer[0] === 0x50 && buffer[1] === 0x4b;
  if (!isZip) throw new Error(`첨부가 xlsx가 아닙니다 (content-type: ${contentType || "없음"}, ${buffer.length} bytes)`);
  return { buffer, sha256: createHash("sha256").update(buffer).digest("hex") };
}

module.exports = { parsePostHtml, extractDate, fetchPost, downloadAttachment };
