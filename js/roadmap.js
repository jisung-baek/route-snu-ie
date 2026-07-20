const connectorSpecs = [
  { kind: "link", from: "course-math1", to: "course-math2", type: "solid" },
  { kind: "link", from: "course-math2", to: "course-eng-math1", type: "solid" },
  { kind: "merge", from: ["course-stat", "course-eng-math1"], to: "course-eng-math2", type: "solid" },

  { kind: "link", from: "course-computer-practice", to: "course-data-management", type: "solid" },
  { kind: "link", from: "course-industrial-computing", to: "course-data-management", type: "dashed" },

  {
    kind: "shared-trunk",
    from: ["course-data-management", "course-ie-stat"],
    to: ["course-data-mining", "course-bigdata-applications", "course-text-analytics"],
    type: "solid"
  },
  { kind: "link", from: "course-data-mining", to: "course-grad-data-mining-methods", type: "dashed" },
  { kind: "link", from: "course-bigdata-applications", to: "course-grad-data-learning", type: "dashed" },
  { kind: "link", from: "course-text-analytics", to: "course-grad-multivariate-analysis", type: "dashed" },

  { kind: "link", from: "course-or1", to: "course-or2", type: "solid" },
  { kind: "branch", from: "course-or2", to: ["course-optimization-models", "course-industrial-math-methods"], type: "solid" },
  { kind: "link", from: "course-optimization-models", to: "course-simulation", type: "solid" },
  { kind: "link", from: "course-industrial-math-methods", to: "course-optimization-algorithms", type: "solid" },
  {
    kind: "branch",
    from: "course-simulation",
    to: ["course-grad-convex-optimization", "course-grad-integer-optimization", "course-grad-stochastic"],
    type: "dashed"
  },

  { kind: "left-trunk", nodes: ["course-ie-stat", "course-logistics"], leftOf: "course-or1", type: "dashed" },
  { kind: "link", from: "course-logistics", to: "course-production-management", type: "solid" },
  { kind: "branch", from: "course-production-management", to: ["course-grad-inventory-management", "course-grad-production-planning"], type: "dashed" },

  { kind: "link", from: "course-service-engineering", to: "course-grad-product-engineering", type: "dashed" },

  { kind: "branch", from: "course-engineering-economy", to: ["course-finance-intro", "course-fintech-intro"], type: "solid" },
  { kind: "link", from: "course-finance-intro", to: "course-grad-industrial-economic-analysis", type: "dashed" },
  { kind: "link", from: "course-fintech-intro", to: "course-grad-tech-innovation-methods", type: "dashed" },

  { kind: "vertical", from: "course-ergonomics", to: "course-ergonomics-lab", type: "dashed" },
  { kind: "link", from: "course-ergonomics", to: "course-ergonomics-design", type: "solid" },
  { kind: "link", from: "course-ergonomics-design", to: "course-human-interface-design", type: "solid" },
  { kind: "late-branch", from: "course-ergonomics", to: ["course-grad-human-performance", "course-grad-biomechanics"], type: "dashed" }
];

const SVG_NS = "http://www.w3.org/2000/svg";
const TRUNK_OFFSET = 20;
const LEFT_TRUNK_OFFSET = 18;

function drawConnectors() {
  const wrapper = document.querySelector(".roadmap-wrapper");
  const grid = document.querySelector(".roadmap-grid");
  const svg = document.querySelector(".connector-svg");

  if (!wrapper || !grid || !svg) return;

  const width = Math.max(wrapper.clientWidth, wrapper.scrollWidth, grid.offsetLeft + grid.scrollWidth);
  const height = Math.max(wrapper.clientHeight, wrapper.scrollHeight, grid.offsetTop + grid.scrollHeight);

  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.style.width = `${width}px`;
  svg.style.height = `${height}px`;
  svg.replaceChildren();

  const wrapperBox = wrapper.getBoundingClientRect();
  const scrollX = wrapper.scrollLeft;
  const scrollY = wrapper.scrollTop;

  const pointFor = (id) => {
    const box = document.getElementById(id);
    if (!box) return null;

    const rect = box.getBoundingClientRect();
    const left = rect.left - wrapperBox.left + scrollX;
    const right = rect.right - wrapperBox.left + scrollX;
    const top = rect.top - wrapperBox.top + scrollY;
    const bottom = rect.bottom - wrapperBox.top + scrollY;

    return {
      left,
      right,
      top,
      bottom,
      centerX: left + rect.width / 2,
      centerY: top + rect.height / 2
    };
  };

  const appendPath = (d, type) => {
    const path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", type === "dashed" ? "#888" : "#555");
    path.setAttribute("stroke-width", "1.5");

    if (type === "dashed") {
      path.setAttribute("stroke-dasharray", "3,4");
    }

    svg.appendChild(path);
  };

  const linkPath = (from, to) => {
    const start = pointFor(from);
    const end = pointFor(to);
    if (!start || !end) return "";

    const midX = end.left > start.right ? (start.right + end.left) / 2 : start.right + TRUNK_OFFSET;
    return `M ${start.right} ${start.centerY} H ${midX} V ${end.centerY} H ${end.left}`;
  };

  const branchPath = (from, targets) => {
    const start = pointFor(from);
    const ends = targets.map(pointFor);
    if (!start || ends.some((point) => !point)) return "";

    const trunkX = start.right + TRUNK_OFFSET;
    const targetYs = ends.map((point) => point.centerY);
    const minY = Math.min(...targetYs);
    const maxY = Math.max(...targetYs);
    const branches = ends.map((point) => `M ${trunkX} ${point.centerY} H ${point.left}`).join(" ");

    return `M ${start.right} ${start.centerY} H ${trunkX} M ${trunkX} ${minY} V ${maxY} ${branches}`;
  };

  const mergePath = (sources, to) => {
    const starts = sources.map(pointFor);
    const end = pointFor(to);
    if (!end || starts.some((point) => !point)) return "";

    const trunkX = end.left - TRUNK_OFFSET;
    const sourceYs = starts.map((point) => point.centerY);
    const minY = Math.min(...sourceYs);
    const maxY = Math.max(...sourceYs);
    const incoming = starts.map((point) => `M ${point.right} ${point.centerY} H ${trunkX}`).join(" ");

    return `${incoming} M ${trunkX} ${minY} V ${maxY} M ${trunkX} ${end.centerY} H ${end.left}`;
  };

  const sharedTrunkPath = (sources, targets) => {
    const starts = sources.map(pointFor);
    const ends = targets.map(pointFor);
    if (starts.some((point) => !point) || ends.some((point) => !point)) return "";

    const trunkX = Math.max(...starts.map((point) => point.right)) + TRUNK_OFFSET;
    const allYs = [...starts, ...ends].map((point) => point.centerY);
    const minY = Math.min(...allYs);
    const maxY = Math.max(...allYs);
    const incoming = starts.map((point) => `M ${point.right} ${point.centerY} H ${trunkX}`).join(" ");
    const outgoing = ends.map((point) => `M ${trunkX} ${point.centerY} H ${point.left}`).join(" ");

    return `${incoming} M ${trunkX} ${minY} V ${maxY} ${outgoing}`;
  };

  const lateBranchPath = (from, targets) => {
    const start = pointFor(from);
    const ends = targets.map(pointFor);
    if (!start || ends.some((point) => !point)) return "";

    const trunkX = Math.min(...ends.map((point) => point.left)) - TRUNK_OFFSET;
    const allYs = [start.centerY, ...ends.map((point) => point.centerY)];
    const minY = Math.min(...allYs);
    const maxY = Math.max(...allYs);

    const incoming = `M ${start.right} ${start.centerY} H ${trunkX}`;
    const trunk = `M ${trunkX} ${minY} V ${maxY}`;
    const branches = ends.map((point) => `M ${trunkX} ${point.centerY} H ${point.left}`).join(" ");

    return `${incoming} ${trunk} ${branches}`;
  };

  const leftTrunkPath = (nodes, leftOfId) => {
    const points = nodes.map(pointFor);
    if (points.some((point) => !point)) return "";

    const anchor = leftOfId ? pointFor(leftOfId) : null;
    const trunkX = anchor
      ? anchor.left - LEFT_TRUNK_OFFSET
      : Math.min(...points.map((point) => point.left)) - LEFT_TRUNK_OFFSET;

    const ys = points.map((point) => point.centerY);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);

    const trunk = `M ${trunkX} ${minY} V ${maxY}`;
    const stubs = points.map((point) => `M ${trunkX} ${point.centerY} H ${point.left}`).join(" ");

    return `${trunk} ${stubs}`;
  };

  const verticalPath = (from, to) => {
    const start = pointFor(from);
    const end = pointFor(to);
    if (!start || !end) return "";

    const x = start.centerX;
    const y1 = start.centerY <= end.centerY ? start.bottom : start.top;
    const y2 = start.centerY <= end.centerY ? end.top : end.bottom;

    return `M ${x} ${y1} V ${y2}`;
  };

  connectorSpecs.forEach((spec) => {
    let d = "";

    if (spec.kind === "link") {
      d = linkPath(spec.from, spec.to);
    } else if (spec.kind === "branch") {
      d = branchPath(spec.from, spec.to);
    } else if (spec.kind === "late-branch") {
      d = lateBranchPath(spec.from, spec.to);
    } else if (spec.kind === "merge") {
      d = mergePath(spec.from, spec.to);
    } else if (spec.kind === "shared-trunk") {
      d = sharedTrunkPath(spec.from, spec.to);
    } else if (spec.kind === "left-trunk") {
      d = leftTrunkPath(spec.nodes, spec.leftOf);
    } else if (spec.kind === "vertical") {
      d = verticalPath(spec.from, spec.to);
    }

    if (d) appendPath(d, spec.type);
  });
}

function debounce(fn, ms) {
  let timer;
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

const debouncedDraw = debounce(drawConnectors, 80);

document.addEventListener("DOMContentLoaded", drawConnectors);
window.addEventListener("resize", debouncedDraw);
window.addEventListener("load", drawConnectors);

if ("ResizeObserver" in window) {
  document.addEventListener("DOMContentLoaded", () => {
    const grid = document.querySelector(".roadmap-grid");
    if (!grid) return;

    const observer = new ResizeObserver(debouncedDraw);
    observer.observe(grid);
  });
}

if (document.fonts) {
  document.fonts.ready.then(drawConnectors);
}
