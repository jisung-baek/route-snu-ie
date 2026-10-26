// 과목 경로 강조 — roadmap-page.js 의 전역 specs(연결 데이터)를 그대로 읽는다.
// 과목에 올리면 그 과목의 모든 선수(위로)·후수(아래로) 과목과 그 사이 선만 남기고 나머지를 흐린다.
(function () {
  const wrapper = document.querySelector(".roadmap-wrapper");
  if (!wrapper || typeof specs === "undefined") return;

  const asList = (v) => (Array.isArray(v) ? v : [v]);
  const next = {}, prev = {};
  specs.forEach((sp) => asList(sp.from).forEach((a) => asList(sp.to).forEach((b) => {
    (next[a] = next[a] || []).push(b);
    (prev[b] = prev[b] || []).push(a);
  })));
  const walk = (start, map) => {
    const seen = new Set([start]), queue = [start];
    while (queue.length) (map[queue.shift()] || []).forEach((n) => { if (!seen.has(n)) { seen.add(n); queue.push(n); } });
    return seen;
  };
  // 연결선 그룹(.edge)에는 과목 '이름'만 남아 있으므로 id → 이름으로 맞춘다
  const nameOf = (id) => { const b = document.getElementById(id); return b ? (b.dataset.name || b.textContent.trim()) : id; };

  function trace(box) {
    const ids = new Set([...walk(box.id, next), ...walk(box.id, prev)]);
    const names = new Set([...ids].map(nameOf));
    wrapper.classList.add("tracing");
    wrapper.querySelectorAll(".course-box").forEach((b) => {
      b.classList.toggle("on-path", ids.has(b.id));
      b.classList.toggle("is-origin", b === box);
    });
    wrapper.querySelectorAll(".connector-svg .edge").forEach((g) => {
      const from = g.dataset.from.split(", "), to = g.dataset.to.split(", ");
      g.classList.toggle("on-path", from.some((n) => names.has(n)) && to.some((n) => names.has(n)));
    });
  }
  function clear() {
    wrapper.classList.remove("tracing");
    wrapper.querySelectorAll(".is-origin").forEach((b) => b.classList.remove("is-origin"));
  }
  wrapper.addEventListener("mouseover", (e) => { const box = e.target.closest(".course-box[id]"); if (box) trace(box); });
  wrapper.addEventListener("mouseout", (e) => { if (e.target.closest(".course-box[id]")) clear(); });
  wrapper.addEventListener("focusin", (e) => { const box = e.target.closest(".course-box[id]"); if (box) trace(box); });
  wrapper.addEventListener("focusout", clear);
})();
