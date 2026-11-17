/* ============================================================
 * 点击节点后的 2D 关系视图（王者荣耀人物关系图那种）
 * - 打开：把 3D 里的节点按当前投影位置"摊平"，再收拢成关系图
 * - 中心是当前知识点，前置在左、后续在右、其他关联在下方
 * - 关闭详情：淡出 2D，回到 3D
 * 只在选中节点时出现，不改变默认的 3D 主界面。
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const nodeEls = new Map();
  const edgeEls = [];
  const pos = new Map();
  const view = { x: 0, y: 0, k: 1 };
  let svg, vp, gEdges, gNodes;
  let raf = 0;
  let drag = null;
  let focusIds = new Set();
  let labelAbove = new Map();

  const idOf = (v) => (v && typeof v === 'object') ? v.id : v;
  const el = (tag, cls) => { const e = document.createElementNS(NS, tag); if (cls) e.setAttribute('class', cls); return e; };

  /* 2D 里不要用 3D 的聚光变暗逻辑，邻居要保持原色 */
  function color2d(n) {
    if (KB.state.track) {
      if (!(n.tracks || []).includes(KB.state.track)) return KB.fade('#8fa3c0', 0.85);
      const t = KB.STATUS_TINT[KB.effStatus(n)];
      return KB.fade(KB.TRACKS[KB.state.track].color, t != null ? t : 0.2);
    }
    const c = KB.STATUS_COLOR[KB.effStatus(n)] || '#9fb3cc';
    return KB.matches(n) ? c : KB.fade(c, 0.7);
  }

  KB.twoDInit = function () {
    svg = document.getElementById('stage');
    if (!svg || svg.childNodes.length) return;
    vp = el('g'); svg.appendChild(vp);
    gEdges = el('g'); vp.appendChild(gEdges);
    gNodes = el('g'); vp.appendChild(gNodes);

    KB.graphLinks.forEach(l => {
      const p = el('path', 'e2' + (l.learn ? ' learn' : ''));
      const t = el('text', 'e2l');
      gEdges.appendChild(p);
      gEdges.appendChild(t);
      edgeEls.push({ el: p, txt: t, l });
    });

    KB.NODES.forEach(n => {
      const g = el('g', 'n2');
      g.setAttribute('data-id', n.id);
      g.appendChild(el('circle'));
      const t = el('text');
      t.textContent = n.name;
      g.appendChild(t);
      gNodes.appendChild(g);
      nodeEls.set(n.id, g);
      pos.set(n.id, { x: 0, y: 0 });
    });

    bindStage();
  };

  /* 3D 当前画面上的屏幕坐标，作为 2D 摊平的起点 */
  function projectedPositions() {
    const out = new Map();
    const g = KB.graph, cam = g && g.camera();
    const W = window.innerWidth, H = window.innerHeight;
    if (!cam) {
      KB.NODES.forEach(n => out.set(n.id, { x: W / 2, y: H / 2 }));
      return out;
    }
    const v = cam.position.clone();
    KB.NODES.forEach(n => {
      if (!n.__threeObj) { out.set(n.id, { x: W / 2, y: H / 2 }); return; }
      v.copy(n.__threeObj.position).project(cam);
      out.set(n.id, v.z > 1 ? { x: W / 2, y: H / 2 } : { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H });
    });
    return out;
  }

  function layoutFocus(id) {
    const W = window.innerWidth, H = window.innerHeight;
    const narrow = W <= 900;
    const railW = narrow ? 0 : 290;
    const panelW = narrow ? 0 : 480;
    const cx = narrow ? W / 2 : (railW + (W - panelW)) / 2;
    const cy = narrow ? H * 0.24 : H / 2;

    const n = KB.byId[id];
    const before = (n.before || []).filter(x => KB.byId[x]);
    const after = KB.NODES.filter(x => (x.before || []).includes(id)).map(x => x.id);
    const preSet = new Set(before), afterSet = new Set(after);
    const rel = (KB.neighborMap.get(id) || []).filter(e => !preSet.has(e.id) && !afterSet.has(e.id)).map(e => e.id);

    const ring = before.length + after.length + rel.length;
    /* 半径不能超过可用区域，否则最外圈会被左栏或右面板挡住 */
    const freeHalf = Math.min((W - panelW - railW) / 2 - 50, H / 2 - 80);
    const R = narrow
      ? Math.max(90, Math.min(150, 70 + ring * 9))
      : Math.max(210, Math.min(freeHalf, 210 + ring * 24));

    const target = new Map();
    target.set(id, { x: cx, y: cy });
    focusIds = new Set([id]);

    labelAbove.clear();
    const place = (list, a0, a1) => list.forEach((nid, i) => {
      const a = list.length === 1 ? (a0 + a1) / 2 : a0 + (a1 - a0) * (i / (list.length - 1));
      const rad = a * Math.PI / 180;
      target.set(nid, { x: cx + Math.cos(rad) * R, y: cy + Math.sin(rad) * R });
      focusIds.add(nid);
      /* 相邻节点的名字上下交错，避免挤在同一行 */
      labelAbove.set(nid, i % 2 === 1);
    });
    /* 三个区间之间留出空隙，避免相邻两组落在同一个角度上 */
    place(before, 150, 210);   // 左半圈：前置
    place(after, -45, 45);     // 右半圈：后续
    place(rel, 62, 118);       // 下方：其他关联

    return target;
  }

  function applyNow() {
    const sel = KB.state.selected;
    KB.NODES.forEach(n => {
      const g = nodeEls.get(n.id);
      if (!g) return;
      const p = pos.get(n.id) || { x: 0, y: 0 };
      g.setAttribute('transform', `translate(${p.x.toFixed(1)},${p.y.toFixed(1)})`);

      const visible = !sel || focusIds.has(n.id);
      g.style.opacity = visible ? '1' : '0';
      g.style.pointerEvents = visible ? 'auto' : 'none';

      const isCenter = n.id === sel;
      const r = isCenter ? 21 : (sel ? 12 : 10 + Math.min(n._deg || 0, 8) * 0.8);
      const c = g.firstChild;
      c.setAttribute('r', r.toFixed(1));
      c.setAttribute('fill', color2d(n));

      const t = g.lastChild;
      const above = sel && !isCenter && labelAbove.get(n.id);
      t.setAttribute('y', above ? (-r - 9).toFixed(1) : (r + 14).toFixed(1));
      t.style.opacity = (sel && !isCenter) ? '0.92' : '1';
    });

    edgeEls.forEach(({ el: p, txt, l }) => {
      const s = idOf(l.source), t = idOf(l.target);
      const a = pos.get(s), b = pos.get(t);
      if (!a || !b) return;
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      /* 直线连接 */
      p.setAttribute('d', `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} L ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);

      let op = 0;
      if (sel) {
        const inSet = focusIds.has(s) && focusIds.has(t);
        const touches = s === sel || t === sel;
        op = inSet ? (touches ? 0.9 : 0.22) : 0;
      }
      if (KB.state.track) {
        const A = KB.byId[s], B = KB.byId[t];
        if (!(A && B && A.tracks.includes(KB.state.track) && B.tracks.includes(KB.state.track))) op = 0;
      }
      p.style.opacity = String(op);
      p.style.stroke = l.learn ? 'rgba(217,180,90,.8)' : (op > 0.5 ? '#5cc8ff' : 'rgba(96,140,200,.4)');

      /* 从中心射出去的连线写上关系短语（放在靠外一侧，别挤在中心） */
      const showLabel = !!sel && !l.learn && (s === sel || t === sel) && focusIds.has(s) && focusIds.has(t) && op > 0;
      if (showLabel) {
        const cx0 = s === sel ? a.x : b.x;
        const cy0 = s === sel ? a.y : b.y;
        const ox = s === sel ? b.x : a.x;
        const oy = s === sel ? b.y : a.y;
        txt.textContent = l.relation || '';
        txt.setAttribute('x', (cx0 + (ox - cx0) * 0.56).toFixed(1));
        txt.setAttribute('y', (cy0 + (oy - cy0) * 0.56 - 5).toFixed(1));
        txt.style.opacity = '0.95';
      } else {
        txt.style.opacity = '0';
      }
    });

    vp.setAttribute('transform', `translate(${view.x.toFixed(1)},${view.y.toFixed(1)}) scale(${view.k.toFixed(3)})`);
  }

  function animateTo(target, ms) {
    cancelAnimationFrame(raf);
    const start = new Map();
    KB.NODES.forEach(n => start.set(n.id, { ...(pos.get(n.id) || { x: 0, y: 0 }) }));
    const t0 = performance.now();
    const dur = Math.max(1, ms || 700);
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / dur);
      const k = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      KB.NODES.forEach(n => {
        const a = start.get(n.id);
        const b = target.get(n.id) || a;
        pos.set(n.id, { x: a.x + (b.x - a.x) * k, y: a.y + (b.y - a.y) * k });
      });
      applyNow();
      if (t < 1) raf = requestAnimationFrame(step);
    };
    step();
  }

  /* 打开 2D 关系图：先从 3D 的当前投影位置开始，再摊平 */
  KB.twoDFocus = function (id) {
    if (!svg) return;
    if (KB.state.mode !== '2d') {
      const p = projectedPositions();
      p.forEach((v, k) => pos.set(k, v));
      view.x = 0; view.y = 0; view.k = 1;
      KB.state.mode = '2d';
      document.body.classList.add('mode-2d');
      applyNow();                 // 先原地显示，与 3D 画面对齐
    }
    const target = layoutFocus(id);
    animateTo(target, 720);
  };

  KB.twoDExit = function () {
    if (KB.state.mode === '2d') {
      KB.state.mode = '3d';
      document.body.classList.remove('mode-2d');
      cancelAnimationFrame(raf);
    }
  };

  KB.twoDRefresh = function () {
    if (svg && KB.state.mode === '2d') applyNow();
  };

  function bindStage() {
    svg.addEventListener('wheel', (e) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.12 : 0.89;
      const k2 = Math.max(0.35, Math.min(2.4, view.k * factor));
      const wx = (e.clientX - view.x) / view.k;
      const wy = (e.clientY - view.y) / view.k;
      view.k = k2;
      view.x = e.clientX - wx * k2;
      view.y = e.clientY - wy * k2;
      applyNow();
    }, { passive: false });

    svg.addEventListener('pointerdown', (e) => {
      if (e.button === 0 || e.button === 2) {
        drag = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, node: e.target.closest('.n2'), moved: false };
      }
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
      if (drag.moved) { view.x = drag.vx + dx; view.y = drag.vy + dy; applyNow(); }
    });
    window.addEventListener('pointerup', () => {
      if (!drag) return;
      const d = drag; drag = null;
      if (d.moved) return;
      const g = d.node;
      if (g) KB.selectNode(g.getAttribute('data-id'), false);
    });

    svg.addEventListener('contextmenu', (e) => e.preventDefault());
    svg.addEventListener('pointerover', (e) => {
      const g = e.target.closest('.n2');
      if (!g) return;
      const n = KB.byId[g.getAttribute('data-id')];
      if (n) { KB.showNodeTip(n); KB.setCursor('pointer'); }
    });
    svg.addEventListener('pointerout', (e) => {
      if (e.target.closest('.n2')) { KB.hideTip(); KB.setCursor('grab'); }
    });
  }
})();
