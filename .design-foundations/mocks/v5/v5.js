/* 히어로 장식: 모서리 기준점(+)만. 치수 눈금(1-1~4-2)은 2026-10-26 요청으로 제거. */
(function () {
  const ns = "http://www.w3.org/2000/svg";
  document.querySelectorAll(".hero").forEach((hero) => {
    const svg = hero.querySelector(".hero-marks");
    if (!svg) return;
    function draw() {
      const w = hero.clientWidth, h = hero.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      svg.replaceChildren();
      const p = document.createElementNS(ns, "path");
      p.setAttribute("stroke", "rgba(255,255,255,0.42)"); p.setAttribute("fill", "none");
      p.setAttribute("d", [[18, 18], [w - 18, 18], [18, h - 18], [w - 18, h - 18]]
        .map(([x, y]) => `M${x - 6} ${y}H${x + 6}M${x} ${y - 6}V${y + 6}`).join(""));
      svg.appendChild(p);
    }
    draw(); addEventListener("resize", draw);
  });
})();
