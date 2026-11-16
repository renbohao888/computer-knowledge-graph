/* ============================================================
 * 屏幕标签层
 * - 节点名：把 3D 坐标投影成屏幕坐标，用 HTML 渲染（永远正对镜头）
 * - 连线关系：取两端中点，把 relation 写在线上
 * 两者共用一套"防重叠"占位逻辑：先放节点名，再在空隙里放关系。
 * ============================================================ */
window.KB = window.KB || {};

const nodeEls = new Map();
const nodeW = new Map();
const edgeEls = [];        // 与 KB.graphLinks 中非 learn 连线一一对应
const boxes = [];          // 本帧已占用的矩形
let nodeVec = null;
let edgeVec = null;

/* 总览时只留最长的几条，拉近后再逐步放出更多关系文字 */
const EDGE_FAR = 10;
const EDGE_NEAR = 24;
const EDGE_MIN_LEN = 70;

KB.buildLabels = function () {
  const layer = document.getElementById('labels');
  layer.innerHTML = '';
  nodeEls.clear();
  nodeW.clear();

  KB.NODES.forEach(n => {
    const el = document.createElement('div');
    el.className = 'node-label';
    el.textContent = n.name;
    layer.appendChild(el);
    nodeEls.set(n.id, el);
    nodeW.set(n.id, 0);
  });

  /* 每条架构连线一个标签元素（学习路径不标，避免噪音） */
  edgeEls.length = 0;
  KB.graphLinks.forEach(l => {
    if (l.learn) { edgeEls.push(null); return; }
    const el = document.createElement('div');
    el.className = 'edge-label';
    el.textContent = l.relation || '';
    layer.appendChild(el);
    edgeEls.push(el);
  });

  /* 文本宽度只需量一次 */
  requestAnimationFrame(() => {
    KB.NODES.forEach(n => {
      const el = nodeEls.get(n.id);
      if (el) nodeW.set(n.id, el.offsetWidth || n.name.length * 11);
    });
  });
};

function project(node, cam, w, h) {
  if (!nodeVec) nodeVec = KB.graph.camera().position.clone();
  nodeVec.set(node.x || 0, node.y || 0, node.z || 0).project(cam);
  return {
    x: (nodeVec.x * 0.5 + 0.5) * w,
    y: (-nodeVec.y * 0.5 + 0.5) * h,
    z: nodeVec.z
  };
}

function projectPoint(x, y, z, cam, w, h) {
  if (!edgeVec) edgeVec = KB.graph.camera().position.clone();
  edgeVec.set(x, y, z).project(cam);
  return {
    x: (edgeVec.x * 0.5 + 0.5) * w,
    y: (-edgeVec.y * 0.5 + 0.5) * h,
    z: edgeVec.z
  };
}

function overlaps(box) {
  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    if (!(box.x2 < b.x1 || box.x1 > b.x2 || box.y2 < b.y1 || box.y1 > b.y2)) return true;
  }
  return false;
}

KB.tickLabels = function (cam) {
  const st = KB.state;
  const w = window.innerWidth, h = window.innerHeight;
  boxes.length = 0;

  /* ---------- 节点名 ---------- */
  if (st.labels) {
    const items = [];
    for (let i = 0; i < KB.NODES.length; i++) {
      const n = KB.NODES[i];
      const el = nodeEls.get(n.id);
      if (!el) continue;
      const obj = n.__threeObj;
      if (!obj) { el.style.opacity = '0'; continue; }

      const p = project(obj.position, cam, w, h);
      if (p.z > 1 || p.x < -0.06 * w || p.x > 1.06 * w || p.y < -0.06 * h || p.y > 1.06 * h) {
        el.style.opacity = '0';
        continue;
      }

      let prio = 1, op = 0.68;
      if (st.selected === n.id || st.hover === n.id) { prio = 4; op = 1; }
      else if (st.focus && KB.inFocusSet(n.id)) { prio = 2; op = 0.9; }
      else if (st.focus) { prio = 0; op = 0.1; }
      else if (st.selected) {
        const nb = KB.neighborMap.get(st.selected) || [];
        if (nb.some(e => e.id === n.id)) { prio = 2; op = 0.72; }
        else { prio = 0; op = 0.12; }
      }
      else if (!KB.matches(n)) { prio = 0; op = 0.16; }

      items.push({ n, el, x: p.x, y: p.y - 13, prio, op, hot: st.selected === n.id || st.hover === n.id });
    }

    items.sort((a, b) => (b.prio - a.prio) || ((b.n._deg || 0) - (a.n._deg || 0)) ||
      (a.n.id < b.n.id ? -1 : 1));

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      it.el.style.transform = `translate3d(${it.x.toFixed(1)}px,${it.y.toFixed(1)}px,0) translate(-50%,-50%)`;
      it.el.classList.toggle('is-hot', it.hot);

      const halfW = (nodeW.get(it.n.id) || it.n.name.length * 11) / 2 + 8;
      const box = { x1: it.x - halfW, x2: it.x + halfW, y1: it.y - 11, y2: it.y + 11 };
      if (overlaps(box)) { it.el.style.opacity = '0'; continue; }
      boxes.push(box);
      it.el.style.opacity = String(it.op);
    }
  } else {
    nodeEls.forEach(el => { el.style.opacity = '0'; });
  }

  /* ---------- 连线关系 ---------- */
  const showEdges = st.relations;
  const cands = [];
  for (let i = 0; i < KB.graphLinks.length; i++) {
    const el = edgeEls[i];
    if (!el) continue;
    if (!showEdges) { el.style.opacity = '0'; continue; }

    const l = KB.graphLinks[i];
    const a = KB.byId[KB.idOf(l.source)], b = KB.byId[KB.idOf(l.target)];
    if (!a || !b) { el.style.opacity = '0'; continue; }

    const mx = ((a.x || 0) + (b.x || 0)) / 2;
    const my = ((a.y || 0) + (b.y || 0)) / 2;
    const mz = ((a.z || 0) + (b.z || 0)) / 2;
    const p = projectPoint(mx, my, mz, cam, w, h);
    if (p.z > 1 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) { el.style.opacity = '0'; continue; }

    /* 屏幕上的两点距离，太短就没地方写字 */
    const pa = project(a, cam, w, h);
    const pb = project(b, cam, w, h);
    const len = Math.hypot(pa.x - pb.x, pa.y - pb.y);
    if (len < EDGE_MIN_LEN) { el.style.opacity = '0'; continue; }

    const hot = KB.isHotLink(l);
    if (st.selected && !hot) { el.style.opacity = '0'; continue; }
    cands.push({ el, x: p.x, y: p.y, len, hot, rel: l.relation || '' });
  }

  cands.sort((a, b) => (Number(b.hot) - Number(a.hot)) || (b.len - a.len));

  const camPos = KB.graph.cameraPosition();
  const camDist = Math.hypot(camPos.x || 0, camPos.y || 0, camPos.z || 0);
  const limit = camDist < 950 ? EDGE_NEAR : EDGE_FAR;

  let shown = 0;
  for (let i = 0; i < cands.length; i++) {
    const c = cands[i];
    if (shown >= limit && !c.hot) { c.el.style.opacity = '0'; continue; }

    c.el.style.transform = `translate3d(${c.x.toFixed(1)}px,${c.y.toFixed(1)}px,0) translate(-50%,-50%)`;
    c.el.classList.toggle('is-hot', c.hot);

    const halfW = Math.min(c.rel.length * 5.2, 90) + 6;
    const box = { x1: c.x - halfW, x2: c.x + halfW, y1: c.y - 8, y2: c.y + 8 };
    if (overlaps(box)) { c.el.style.opacity = '0'; continue; }
    boxes.push(box);
    c.el.style.opacity = c.hot ? '1' : '0.62';
    shown++;
  }
};

/* ---------- 层刻度：把 11 层在画面上的高度标出来 ---------- */
const axisRows = new Map();
let axisVec = null;

KB.buildAxis = function () {
  const box = document.getElementById('layerAxis');
  if (!box) return;
  box.innerHTML = '';
  axisRows.clear();
  KB.LAYERS.forEach(l => {
    const el = document.createElement('div');
    el.className = 'axis-row';
    el.innerHTML = `<span>${KB.esc(l)}</span><i></i>`;
    el.querySelector('span').addEventListener('click', () => {
      KB.state.layer = (KB.state.layer === l) ? null : l;
      KB.syncFilterUI();
    });
    box.appendChild(el);
    axisRows.set(l, el);
  });
};

KB.updateAxis = function (cam) {
  if (!axisRows.size) return;
  if (!axisVec) axisVec = KB.graph.camera().position.clone();
  const h = window.innerHeight;

  /* 用层中心 (0, layerY, 0) 投影：世界坐标的 y 是有序的，
     所以刻度永远按顺序排列，相当于一把标尺。 */
  KB.LAYERS.forEach(l => {
    const el = axisRows.get(l);
    if (!el) return;
    axisVec.set(0, KB.layerY[l], 0).project(cam);
    if (axisVec.z > 1 || axisVec.y < -1.05 || axisVec.y > 1.05) {
      el.style.opacity = '0';
      el.classList.remove('active');
      return;
    }
    el.style.top = ((-axisVec.y * 0.5 + 0.5) * h).toFixed(1) + 'px';
    el.style.opacity = '';
    el.classList.toggle('active', KB.state.layer === l);
  });
};
