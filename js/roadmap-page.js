/* 로드맵 페이지 전용 동작. roadmap.html 의 인라인 <script> 에서 분리했다.
   defer 를 붙이지 않고 </body> 직전에서 로드한다 — 최상위의
   const tip = document.getElementById("courseTip") 이 파싱 시점에 DOM 을 읽고,
   analytics.js(defer)와의 실행 순서도 인라인이던 때와 같아야 하기 때문이다. */
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}

/* ---------- hover tooltip (구/신 교과목코드) ---------- */
const tip=document.getElementById("courseTip");
function showTip(el,evt){
  const name=el.dataset.name||el.textContent.trim();
  const oldc=el.dataset.old||"—", newc=el.dataset.new||"—";
  tip.innerHTML='<div class="tip-name">'+esc(name)+'</div><div class="tip-rows">'+
    '<div class="tip-row"><span>구 교과목코드</span><b>'+esc(oldc)+'</b></div>'+
    '<div class="tip-row"><span>신 교과목코드</span><b>'+esc(newc)+'</b></div></div>';
  tip.classList.add("show");tip.setAttribute("aria-hidden","false");moveTip(evt,el);
}
function moveTip(evt,el){
  const pad=14;let x,y;
  if(evt&&evt.clientX){x=evt.clientX+16;y=evt.clientY+18;}
  else{const r=el.getBoundingClientRect();x=r.left+r.width/2;y=r.bottom+10;}
  const tw=tip.offsetWidth,th=tip.offsetHeight;
  if(x+tw+pad>window.innerWidth)x=window.innerWidth-tw-pad;
  if(y+th+pad>window.innerHeight)y=(evt?evt.clientY:0)-th-18;
  if(x<pad)x=pad;if(y<pad)y=pad;
  tip.style.left=x+"px";tip.style.top=y+"px";
}
function hideTip(){tip.classList.remove("show");tip.setAttribute("aria-hidden","true");}
function bindTips(scope){
  const sel=".course-box:not([data-notip])";
  scope.addEventListener("mouseover",e=>{const el=e.target.closest(sel);if(el)showTip(el,e);});
  scope.addEventListener("mousemove",e=>{const el=e.target.closest(sel);if(el&&tip.classList.contains("show"))moveTip(e,el);});
  scope.addEventListener("mouseout",e=>{if(e.target.closest(sel))hideTip();});
  scope.addEventListener("focusin",e=>{const el=e.target.closest(sel);if(el)showTip(el,null);});
  scope.addEventListener("focusout",e=>{if(e.target.closest(sel))hideTip();});
}

/* ---------- graduate toggle (expands grid to the right) ---------- */
function initGradToggle(){
  const button=document.getElementById("gradEdgeToggle");
  const grid=document.getElementById("ugGrid");
  const wrapper=document.querySelector(".roadmap-wrapper");
  const setOpen=open=>{
    button.setAttribute("aria-expanded",String(open));
    grid.classList.toggle("show-grad",open);
    requestAnimationFrame(()=>{
      drawConnectors();
      if(open){
        const targetLeft=Math.max(0,button.offsetLeft-24);
        wrapper.scrollTo({left:targetLeft,behavior:"smooth"});
      }else{
        wrapper.scrollTo({left:0,behavior:"smooth"});
      }
    });
  };
  button.addEventListener("click",()=>{
    setOpen(button.getAttribute("aria-expanded")!=="true");
  });
}

/* ---------- connectors ---------- */
/* 선 색은 여기서 정하지 않는다 — path 에 edge-<종류> class 만 붙이고
   실제 색은 위 <style> 의 .connector-svg .edge-req / .edge-rec / .edge-solid 가 쥔다.
   범례 스와치와 색이 어긋나지 않게 하려는 것. */
const specs=[
  /* 교양 수학·통계 기초 체인 (연회색) */
  {k:"link",from:"math1",to:"math2",t:"solid"},
  {k:"link",from:"math2",to:"stat",t:"solid"},
  {k:"link",from:"math2",to:"emath1",t:"solid"},
  {k:"link",from:"emath1",to:"emath2",t:"solid"},

  /* 필수 선수과목 (파랑) */
  {k:"link",from:"emath1",to:"or1",t:"req"},
  {k:"link",from:"emath1",to:"imrm",t:"req"},
  {k:"link",from:"emath2",to:"imrm",t:"req"},
  {k:"link",from:"comp",to:"dma",t:"req",mid:"src"},
  {k:"link",from:"stat",to:"iestat",t:"req",mid:"src"},
  {k:"link",from:"stat",to:"ergo",t:"req",mid:"src"},
  {k:"link",from:"ipd",to:"pqd",t:"rec"},
  {k:"link",from:"prod",to:"logi",t:"req"},
  {k:"link",from:"or1",to:"optm",t:"req"},
  {k:"link",from:"optm",to:"opta",t:"rec"},
  {k:"link",from:"or1",to:"opta",t:"req",route:"under"},
  {k:"merge",from:["or2","iestat"],to:"sim",t:"req"},
  {k:"merge",from:["dma","iestat"],to:"dmine",t:"req"},
  {k:"vertical",from:"dmine",to:"bigdata",t:"req"},
  {k:"link",from:"dmine",to:"textan",t:"req"},
  {k:"link",from:"iestat",to:"textan",t:"req",enter:"top"},

  /* 권장 선수과목 (회색) */
  {k:"link",from:"scimgmt",to:"creative",t:"rec"},
  {k:"link",from:"or1",to:"or2",t:"rec"},
  {k:"vertical",from:"ergo",to:"ergolab",t:"rec"},
  {k:"link",from:"ergo",to:"ergodes",t:"rec"},
  {k:"link",from:"ergodes",to:"hid",t:"rec"},
  {k:"link",from:"techm",to:"econ",t:"rec"},
  {k:"branch",from:"econ",to:["finintro","fintech"],t:"rec"},
  {k:"link",from:"emath2",to:"or2",t:"rec"},
  {k:"link",from:"emath2",to:"iestat",t:"rec"},
  {k:"link",from:"icomp",to:"dma",t:"rec"},
  {k:"link",from:"icomp",to:"dmine",t:"rec"},
  {k:"link",from:"comp",to:"imrm",t:"rec",route:"under"},
  {k:"link",from:"comp",to:"optm",t:"rec",route:"under"},
  {k:"link",from:"comp",to:"opta",t:"rec",route:"under"},
  {k:"branch",from:"or1",to:["svc","prod","logi"],t:"rec"},
  {k:"branch",from:"or2",to:["svc","prod","logi"],t:"rec"},

  /* 산업공학의 이해 → 각 영역 첫 과목 (필수, 파랑) */
  {k:"branch",from:"ieintro",to:["scimgmt","or1","or2","iestat","dma","ergo","techm","econ"],t:"req"}
];
const SVG_NS="http://www.w3.org/2000/svg", OFF=16;

function drawConnectors(){
  const wrapper=document.querySelector(".roadmap-wrapper");
  const grid=document.querySelector(".roadmap-grid");
  const svg=document.querySelector(".connector-svg");
  if(!wrapper||!grid||!svg)return;
  const width=Math.max(wrapper.clientWidth,grid.scrollWidth);
  const height=Math.max(wrapper.clientHeight,grid.scrollHeight);
  svg.setAttribute("viewBox",`0 0 ${width} ${height}`);
  svg.setAttribute("width",width);svg.setAttribute("height",height);
  svg.style.width=width+"px";svg.style.height=height+"px";
  svg.replaceChildren();
  const wb=wrapper.getBoundingClientRect();
  const sx=wrapper.scrollLeft, sy=wrapper.scrollTop;
  const P=id=>{const b=document.getElementById(id);if(!b)return null;
    if(b.offsetWidth===0&&b.offsetHeight===0)return null;
    const r=b.getBoundingClientRect();
    const left=r.left-wb.left+sx,right=r.right-wb.left+sx,top=r.top-wb.top+sy,bottom=r.bottom-wb.top+sy;
    return{left,right,top,bottom,cx:left+r.width/2,cy:top+r.height/2};};
  const W=t=>t==="req"?"1.9":"1.4";  /* 선 두께 (살짝 얇게) */
  const HIT_W=18, VERTICAL_HIT_W=56, VERTICAL_HIT_EXT=6;
  /* add()는 현재 그리는 간선(edge)의 path 조각을 버퍼에 모은다 — 이후 hover 가능한 그룹으로 묶기 위함 */
  let edgeSegs=null, edgeHitSegs=null;
  const add=(d,t,hitD)=>{
    if(edgeSegs){edgeSegs.push(d);edgeHitSegs.push(hitD||d);return;}
    const p=document.createElementNS(SVG_NS,"path");p.setAttribute("d",d);p.setAttribute("fill","none");
    p.setAttribute("class","edge-"+t);p.setAttribute("stroke-width",W(t));
    p.setAttribute("stroke-linecap","round");p.setAttribute("stroke-linejoin","round");svg.appendChild(p);};
  const arrow=(x,y,dir,t)=>{const s=3.4;let d;
    if(dir==="d")d=`M ${x-s} ${y-s} L ${x} ${y} L ${x+s} ${y-s}`;
    else if(dir==="u")d=`M ${x-s} ${y+s} L ${x} ${y} L ${x+s} ${y+s}`;
    else d=`M ${x-s} ${y-s} L ${x} ${y} L ${x-s} ${y+s}`;
    add(d,t);};

  /* distribute exit / entry points so multiple arrows on one box start at different y */
  const outMap={}, inMap={};
  specs.forEach((sp,idx)=>{
    if(sp.k==="vertical")return;
    const froms=sp.k==="merge"?sp.from:[sp.from];
    const tos=sp.k==="branch"?sp.to:[sp.to];
    froms.forEach(f=>{(outMap[f]=outMap[f]||[]).push(idx+"|"+f);});
    tos.forEach(t=>{(inMap[t]=inMap[t]||[]).push(idx+"|"+t);});
  });
  const exitF={},entryF={};
  for(const k in outMap){const L=outMap[k];L.forEach((key,i)=>exitF[key]=(i+1)/(L.length+1));}
  /* 진입점이 홀수 개면 가운데 하나가 정확히 박스 중앙(cy)에 놓인다. 같은 행 박스의 출구선도
     대부분 중앙에서 나오므로 그 가로선과 정확히 겹친다 — 진입 묶음 전체를 살짝 비대칭으로 민다.
     (진입이 1개뿐이면 직선을 유지해야 하므로 그대로 둔다) */
  const ENTRY_SKEW=0.12;
  for(const k in inMap){const L=inMap[k];
    const skew=(L.length>1&&L.length%2===1)?ENTRY_SKEW:0;
    L.forEach((key,i)=>entryF[key]=(i+1)/(L.length+1)+skew);}
  const exY=(id,idx,p)=>{const f=exitF[idx+"|"+id]; return f==null?p.cy:p.top+(p.bottom-p.top)*f;};
  const enY=(id,idx,p)=>{const f=entryF[idx+"|"+id]; return f==null?p.cy:p.top+(p.bottom-p.top)*f;};

  /* under 라우트 레인 분리 — 박스 아래로 우회하는 선들은 모두 같은 통로(e.bottom+7)와
     같은 진입점(e.cx)을 써서 서로 완전히 겹쳐 그려졌다. 통로 y와 도착 진입 x를 나눠 준다. */
  const UNDER_BASE=6, UNDER_STEP=7, underY={}, underEnterX={};
  {
    const items=[];
    specs.forEach((sp,idx)=>{
      if(sp.k!=="link"||sp.route!=="under")return;
      const s=P(sp.from),e=P(sp.to);if(!s||!e)return;
      items.push({idx,to:sp.to,bottom:e.bottom,run:Math.abs(e.cx-(s.right+OFF))});
    });
    /* 도착 박스 아랫변이 같은(=같은 행) 것끼리 통로를 나눈다 — 긴 선일수록 바깥(아래) 통로로 */
    const rows={};
    items.forEach(it=>{const k=Math.round(it.bottom/8);(rows[k]=rows[k]||[]).push(it);});
    Object.keys(rows).forEach(k=>{
      const L=rows[k];L.sort((a,b)=>b.run-a.run);
      L.forEach((it,i)=>{it.lane=L.length-1-i;   /* lane 0 = 박스에 가장 가까운 통로 */
        underY[it.idx]=it.bottom+UNDER_BASE+it.lane*UNDER_STEP;});
    });
    /* 같은 박스 아래로 진입하는 화살표는 x를 분산 — 안쪽 통로일수록 왼쪽에서 올라온다
       (바깥 통로가 안쪽 통로의 가로 구간을 가로지르지 않는다) */
    const byTarget={};
    items.forEach(it=>{(byTarget[it.to]=byTarget[it.to]||[]).push(it);});
    Object.keys(byTarget).forEach(id=>{
      const L=byTarget[id],e=P(id);if(!e)return;
      if(L.length<2){underEnterX[L[0].idx]=e.cx;return;}
      L.sort((a,b)=>a.lane-b.lane);
      L.forEach((it,i)=>{underEnterX[it.idx]=e.left+(e.right-e.left)*(i+1)/(L.length+1);});
    });
  }

  /* 세로선 레인 분리 — 같은 세로 통로에서 y구간이 '실제로 겹치는' link 세로구간만 좌우로 벌린다.
     (같은 열의 다른 행처럼 안 겹치는 선은 벌리지 않아, 화살표가 박스 경계까지 밀리지 않는다) */
  const LANE_GAP=8, laneMidX={}, vbuckets={};
  const pushLane=(idx,base,ys)=>{
    const key=Math.round(base/16);
    (vbuckets[key]=vbuckets[key]||[]).push({idx,base,y1:Math.min(...ys),y2:Math.max(...ys)});
  };
  specs.forEach((sp,idx)=>{
    if(sp.enter==="top")return;
    if(sp.k==="link"){
      const s=P(sp.from),e=P(sp.to);if(!s||!e)return;
      /* under 라우트도 같은 통로를 쓰므로 함께 벌린다 (내려가는 세로구간이 겹쳤다) */
      const base=(sp.route==="under")?s.right+OFF
        :((e.left>s.right)?((sp.mid==="src")?s.right+OFF:e.left-OFF):(s.right+OFF));
      const b=(sp.route==="under")?underY[idx]:enY(sp.to,idx,e);
      if(b==null)return;
      pushLane(idx,base,[exY(sp.from,idx,s),b]);
    }else if(sp.k==="branch"){
      /* 분기 줄기(세로 trunk)도 같은 통로를 쓴다 — link/under 세로선과 겹쳤다 */
      const s=P(sp.from);if(!s)return;const es=sp.to.map(P);if(es.some(x=>!x))return;
      pushLane(idx,s.right+OFF,[exY(sp.from,idx,s),...sp.to.map((b,i)=>enY(b,idx,es[i]))]);
    }else if(sp.k==="merge"){
      const e=P(sp.to);if(!e)return;const ss=sp.from.map(P);if(ss.some(x=>!x))return;
      pushLane(idx,e.left-OFF,[enY(sp.to,idx,e),...sp.from.map((a,i)=>exY(a,idx,ss[i]))]);
    }
  });
  Object.keys(vbuckets).forEach(k=>{
    const L=vbuckets[k];
    if(L.length<2){laneMidX[L[0].idx]=L[0].base;return;}
    /* 구간 그래프 레인 배정: y구간이 겹치면 다른 레인, 안 겹치면 레인 재사용 */
    L.sort((a,b)=>a.y1-b.y1);
    const laneEnd=[];
    L.forEach(it=>{let lane=-1;
      for(let j=0;j<laneEnd.length;j++){if(laneEnd[j]<=it.y1){lane=j;break;}}
      if(lane<0)lane=laneEnd.length;
      laneEnd[lane]=it.y2; it.lane=lane;});
    const nL=laneEnd.length;
    L.forEach(it=>{laneMidX[it.idx]=it.base+(it.lane-(nL-1)/2)*LANE_GAP;});
  });

  const link=(idx,a,b,t,opt)=>{opt=opt||{};const s=P(a),e=P(b);if(!s||!e)return;
    const sy=exY(a,idx,s),ey=enY(b,idx,e);
    if(opt.enter==="top"){const tx=e.cx;
      add(`M ${s.right} ${sy} H ${tx} V ${e.top}`,t);arrow(tx,e.top,"d",t);return;}
    if(opt.route==="under"){
      const tx=laneMidX[idx]!=null?laneMidX[idx]:s.right+OFF;
      const uy=underY[idx]!=null?underY[idx]:e.bottom+7;
      const ex=underEnterX[idx]!=null?underEnterX[idx]:e.cx;
      add(`M ${s.right} ${sy} H ${tx} V ${uy} H ${ex} V ${e.bottom}`,t);arrow(ex,e.bottom,"u",t);return;}
    let midX;
    if(laneMidX[idx]!=null){ midX=laneMidX[idx]; }
    else if(e.left>s.right){ midX = (opt.mid==="src") ? s.right+OFF : e.left-OFF; }
    else { midX = s.right+OFF; }
    /* 오른쪽으로 가는 선은 화살표 앞에 최소 가로 여백을 남긴다 (세로선이 화살촉에 바로 붙지 않게) */
    if(e.left>s.right) midX=Math.max(s.right+6,Math.min(midX,e.left-10));
    add(`M ${s.right} ${sy} H ${midX} V ${ey} H ${e.left}`,t);arrow(e.left,ey,"r",t);};
  const branch=(idx,a,bs,t)=>{const s=P(a);if(!s)return;const es=bs.map(P);if(es.some(x=>!x))return;
    const sy=exY(a,idx,s),tx=laneMidX[idx]!=null?laneMidX[idx]:s.right+OFF;const eys=bs.map((b,i)=>enY(b,idx,es[i]));
    add(`M ${s.right} ${sy} H ${tx}`,t);add(`M ${tx} ${Math.min(sy,...eys)} V ${Math.max(sy,...eys)}`,t);
    bs.forEach((b,i)=>{add(`M ${tx} ${eys[i]} H ${es[i].left}`,t);arrow(es[i].left,eys[i],"r",t);});};
  const merge=(idx,as,b,t)=>{const e=P(b);if(!e)return;const ss=as.map(P);if(ss.some(x=>!x))return;
    const ey=enY(b,idx,e),tx=laneMidX[idx]!=null?laneMidX[idx]:e.left-OFF;const sys=as.map((a,i)=>exY(a,idx,ss[i]));
    as.forEach((a,i)=>add(`M ${ss[i].right} ${sys[i]} H ${tx}`,t));
    add(`M ${tx} ${Math.min(ey,...sys)} V ${Math.max(ey,...sys)} M ${tx} ${ey} H ${e.left}`,t);arrow(e.left,ey,"r",t);};
  const vertical=(idx,a,b,t)=>{const s=P(a),e=P(b);if(!s||!e)return;
    const x=s.cx,y1=s.cy<=e.cy?s.bottom:s.top,y2=s.cy<=e.cy?e.top:e.bottom;
    /* 스택 내부 세로선은 길이가 8px뿐이라 hit 영역을 양쪽 박스 안으로 조금 넓힌다.
       박스가 SVG 위에 그려지므로 박스 위 hover는 그대로 박스 툴팁이 이긴다. */
    const dir=y2>=y1?1:-1, ext=VERTICAL_HIT_EXT*dir;
    add(`M ${x} ${y1} V ${y2}`,t,`M ${x} ${y1-ext} V ${y2+ext}`);arrow(x,y2,"d",t);};

  // 그리기 순서: 연회색 → 회색(권장) → 파랑(필수) 순으로, 겹쳐도 파랑이 항상 위에 보이도록
  const zrank=t=>t==="req"?2:(t==="rec"?1:0);
  const drawOrder=[...specs.keys()].sort((a,b)=>zrank(specs[a].t)-zrank(specs[b].t));
  const nameOf=id=>{const b=document.getElementById(id);return b?(b.dataset.name||b.textContent.trim()):id;};
  drawOrder.forEach(idx=>{
    const sp=specs[idx];
    edgeSegs=[];edgeHitSegs=[];
    if(sp.k==="link")link(idx,sp.from,sp.to,sp.t,sp);
    else if(sp.k==="branch")branch(idx,sp.from,sp.to,sp.t);
    else if(sp.k==="merge")merge(idx,sp.from,sp.to,sp.t);
    else if(sp.k==="vertical")vertical(idx,sp.from,sp.to,sp.t);
    const segs=edgeSegs, hitSegs=edgeHitSegs; edgeSegs=null;edgeHitSegs=null;
    if(!segs||!segs.length)return;
    /* hover 가능한 간선 그룹: 넓은 투명 hit path + 실제 보이는 path들 */
    const g=document.createElementNS(SVG_NS,"g");
    g.setAttribute("class","edge");
    g.dataset.from=(sp.k==="merge"?sp.from:[sp.from]).map(nameOf).join(", ");
    g.dataset.to=(sp.k==="branch"?sp.to:[sp.to]).map(nameOf).join(", ");
    g.dataset.type=sp.t;
    const hit=document.createElementNS(SVG_NS,"path");
    hit.setAttribute("class","edge-hit");hit.setAttribute("d",hitSegs.join(" "));
    hit.setAttribute("fill","none");hit.setAttribute("stroke","transparent");
    hit.setAttribute("stroke-width",sp.k==="vertical"?VERTICAL_HIT_W:HIT_W);
    g.appendChild(hit);
    segs.forEach(d=>{const p=document.createElementNS(SVG_NS,"path");p.setAttribute("class","edge-vis edge-"+sp.t);
      p.setAttribute("d",d);p.setAttribute("fill","none");p.setAttribute("stroke-width",W(sp.t));
      p.setAttribute("stroke-linecap","round");p.setAttribute("stroke-linejoin","round");g.appendChild(p);});
    svg.appendChild(g);
  });
}
function debounce(fn,ms){let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms);};}
const dDraw=debounce(drawConnectors,80);

/* ---------- roadmap image download ---------- */
function initImageDownload(){
  const menu=document.querySelector(".dl-menu");
  const btn=document.getElementById("dlBtn");
  const pop=document.getElementById("dlPop");
  if(!menu||!btn||!pop)return;
  const close=()=>{pop.hidden=true;btn.setAttribute("aria-expanded","false");};
  const open=()=>{pop.hidden=false;btn.setAttribute("aria-expanded","true");};
  btn.addEventListener("click",e=>{e.stopPropagation();pop.hidden?open():close();});
  document.addEventListener("click",e=>{if(!menu.contains(e.target))close();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")close();});
  /* 옵션은 미리 만들어 둔 정적 이미지를 바로 내려받는 <a download> 링크 — 클릭 시 메뉴만 닫는다 */
  pop.querySelectorAll(".dl-opt").forEach(opt=>opt.addEventListener("click",close));
}

/* ---------- 연결선 hover: 어디→어디, 필수/권장 툴팁 + 하이라이트 ---------- */
function initEdgeHover(){
  const svg=document.querySelector(".connector-svg");
  const tipEl=document.getElementById("edgeTip");
  if(!svg||!tipEl)return;
  const label=t=>t==="rec"?"권장 선수과목":(t==="req"?"필수 선수과목":"기초 연계");
  const move=evt=>{const pad=14;let x=evt.clientX+16,y=evt.clientY+18;const tw=tipEl.offsetWidth,th=tipEl.offsetHeight;
    if(x+tw+pad>window.innerWidth)x=window.innerWidth-tw-pad;
    if(y+th+pad>window.innerHeight)y=evt.clientY-th-18;
    if(x<pad)x=pad;if(y<pad)y=pad;tipEl.style.left=x+"px";tipEl.style.top=y+"px";};
  const show=(g,evt)=>{const t=g.dataset.type;
    tipEl.innerHTML='<div class="et-body"><b>'+esc(g.dataset.from)+'</b><span class="et-arrow">→</span><b>'+esc(g.dataset.to)+'</b><span class="et-tag et-'+t+'">'+label(t)+'</span></div>';
    tipEl.classList.add("show");tipEl.setAttribute("aria-hidden","false");move(evt);};
  const hide=()=>{tipEl.classList.remove("show");tipEl.setAttribute("aria-hidden","true");};
  svg.addEventListener("mouseover",e=>{const g=e.target.closest(".edge");if(!g)return;hideTip();svg.classList.add("dim");g.classList.add("hl");show(g,e);});
  svg.addEventListener("mousemove",e=>{if(tipEl.classList.contains("show"))move(e);});
  svg.addEventListener("mouseout",e=>{const g=e.target.closest(".edge");if(!g)return;g.classList.remove("hl");svg.classList.remove("dim");hide();});
}

document.addEventListener("DOMContentLoaded",()=>{
  bindTips(document.getElementById("ugGrid"));
  initGradToggle();
  initImageDownload();
  initEdgeHover();
  drawConnectors();
});
window.addEventListener("load",drawConnectors);
window.addEventListener("resize",dDraw);
window.addEventListener("scroll",hideTip,true);
if("ResizeObserver"in window){
  document.addEventListener("DOMContentLoaded",()=>{const g=document.querySelector(".roadmap-grid");if(g)new ResizeObserver(dDraw).observe(g);});
}
if(document.fonts)document.fonts.ready.then(drawConnectors);
