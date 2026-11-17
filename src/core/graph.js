/* ============================================================
 * 3D 图：初始化、样式访问器、相机运动
 * 渲染由 3d-force-graph（底层 Three.js / WebGL）完成。
 * ============================================================ */
window.KB = window.KB || {};

/* ---------- 样式访问器 ---------- */
KB.nodeSize = function (n) {
  const base = 1.2 + Math.min(n._deg || 0, 8) * 0.9;
  const sel = KB.state.selected;
  if (!sel) return base;
  if (n.id === sel) return base * 1.9;                 // 中心的点放大
  const nb = KB.neighborMap.get(sel) || [];
  if (nb.some(e => e.id === n.id)) return base * 1.35;  // 直接相连的略大
  return base;
};

KB.colorOfNode = function (n) {
  const s = KB.state;
  /* 方向模式：同一种颜色代表同一条路径，亮度代表掌握度（越亮越该补） */
  if (s.track) {
    if (!n.tracks.includes(s.track)) return KB.fade('#8fa3c0', 0.9);
    if (!KB.matches(n) || (s.focus && !KB.inFocusSet(n.id))) {
      return KB.fade(KB.TRACKS[s.track].color, 0.82);
    }
    const t = KB.STATUS_TINT[KB.effStatus(n)];
    return KB.fade(KB.TRACKS[s.track].color, t != null ? t : 0.2);
  }
  const base = KB.STATUS_COLOR[KB.effStatus(n)] || '#9fb3cc';

  if (s.focus) {
    if (!KB.inFocusSet(n.id)) return KB.fade(base, 0.86);
    if (!KB.matches(n)) return KB.fade(base, 0.6);
    return base;
  }

  /* 选中一个节点：它自己全亮，直接相连的"前后置"只是略暗，
     其余几乎隐掉——这样旋转过去时，周围清清楚楚就是它的关系网。 */
  if (s.selected) {
    if (n.id === s.selected) return base;
    const nb = KB.neighborMap.get(s.selected) || [];
    if (nb.some(e => e.id === n.id)) return KB.fade(base, 0.08);
    if (!KB.matches(n)) return KB.fade(base, 0.78);
    return KB.fade(base, 0.62);
  }

  if (!KB.matches(n)) return KB.fade(base, 0.74);
  return base;
};

KB.colorOfLink = function (l) {
  if (l.learn) return KB.learnVisible(l) ? KB.fade('#d9b45a', 0.3) : KB.BG;
  const s = KB.idOf(l.source), t = KB.idOf(l.target);
  if (KB.isHotLink(l)) return KB.LINK_HOT;
  const a = KB.byId[s], b = KB.byId[t];
  if (KB.state.track) {
    const inA = a && a.tracks.includes(KB.state.track);
    const inB = b && b.tracks.includes(KB.state.track);
    if (inA && inB) return KB.fade(KB.TRACKS[KB.state.track].color, 0.5);
    return KB.fade(KB.LINK_BASE, 0.9);
  }
  if (KB.state.focus && !(KB.inFocusSet(s) && KB.inFocusSet(t))) return KB.fade(KB.LINK_BASE, 0.86);
  if (KB.state.selected && !KB.isHotLink(l)) return KB.fade(KB.LINK_BASE, 0.82);
  if (!KB.matches(a) || !KB.matches(b)) return KB.fade(KB.LINK_BASE, 0.8);
  return KB.fade(KB.LINK_BASE, 0.42);
};

KB.particleCount = function (l) {
  if (l.learn) return KB.learnVisible(l) ? 3 : 0;
  const s = KB.idOf(l.source), t = KB.idOf(l.target);
  if (KB.state.track) {
    const a = KB.byId[s], b = KB.byId[t];
    const inA = a && a.tracks.includes(KB.state.track);
    const inB = b && b.tracks.includes(KB.state.track);
    if (!(inA && inB)) return 0;
    return KB.isHotLink(l) ? 4 : 1;
  }
  if (KB.state.focus && !(KB.inFocusSet(s) && KB.inFocusSet(t))) return 0;
  if (KB.state.selected && !KB.isHotLink(l)) return 0;
  if (!KB.matches(KB.byId[s]) || !KB.matches(KB.byId[t])) return 0;
  return KB.isHotLink(l) ? 4 : 1;
};

/* ---------- 初始化 ---------- */
KB.initGraph = function () {
  const g = ForceGraph3D({ controlType: 'trackball' })(document.getElementById('graph'));

  g.backgroundColor(KB.BG)
    .showNavInfo(false)
    .nodeRelSize(6.2)
    .nodeResolution(14)
    .nodeOpacity(1)
    .nodeVal(KB.nodeSize)
    .nodeColor(KB.colorOfNode)
    .nodeLabel(() => '')
    .linkColor(KB.colorOfLink)
    .linkOpacity(0.95)
    .linkDirectionalParticles(KB.particleCount)
    .linkDirectionalParticleWidth(l => l.learn ? 1.9 : (KB.isHotLink(l) ? 2.4 : 1.1))
    .linkDirectionalParticleSpeed(l => l.learn ? 0.005 : (KB.isHotLink(l) ? 0.011 : 0.0032))
    .linkDirectionalParticleColor(l => l.learn ? '#e8c777' : (KB.isHotLink(l) ? '#9fe8ff' : 'rgba(120,170,230,.5)'))
    .onNodeClick(KB.handleNodeClick)
    .onNodeHover(KB.handleNodeHover)
    .onLinkHover(KB.handleLinkHover)
    .onBackgroundClick(KB.handleBackgroundClick)
    .onEngineStop(KB.handleEngineStop);

  g.d3Force('charge').strength(-820).distanceMax(1500);
  g.d3Force('link')
    .distance(l => l.learn ? 40 : (KB.sameLayerLink(l) ? 85 : 150))
    .strength(l => l.learn ? 0 : 0.4);    // 学习路径不参与布局

  /* 把节点往 z=0 拉，让每一层尽量落在同一个深度平面上。
     否则斜视角下层与层会互相穿插，刻度也对不齐。 */
  const forceZ = (alpha) => {
    const k = 0.22 * alpha;
    for (let i = 0; i < KB.NODES.length; i++) {
      KB.NODES[i].vz += (0 - KB.NODES[i].z) * k;
    }
  };
  forceZ.initialize = () => {};
  g.d3Force('z', forceZ);

  g.d3AlphaDecay(0.026).warmupTicks(70).cooldownTicks(170);

  /* 偏广一点的视角 + 斜方位，透视更强，模型看起来才有立体感 */
  if (g.camera()) { g.camera().fov = 55; g.camera().updateProjectionMatrix(); }
  g.cameraPosition({ x: 480, y: 320, z: 1300 }, { x: 0, y: 0, z: 0 }, 0);

  KB.graph = g;
  g.graphData({ nodes: KB.NODES, links: KB.graphLinks });
  return g;
};

KB.sameLayerLink = function (l) {
  const a = KB.byId[KB.idOf(l.source)], b = KB.byId[KB.idOf(l.target)];
  return !!(a && b && a.layer === b.layer);
};

/* 重新推一遍样式（3D 属性访问器每帧都会重算，这里保证即时生效） */
KB.refreshStyles = function () {
  if (!KB.graph) return;
  KB.graph
    .nodeColor(KB.colorOfNode)
    .linkColor(KB.colorOfLink)
    .linkDirectionalParticles(KB.particleCount);
  KB.updateMatchStat();
};

/* ---------- 相机 ---------- */
KB.clearHover = function () {
  KB.state.hover = null;
  KB.state.hoverLink = null;
  KB.hideTip();
};

/* 绕节点做轨道旋转：方位角转到正面、抬高一点俯角，同时拉近。
   视觉上就是整个立体模型转过来，把这个模块转到你面前。 */
KB.orbitTo = function (node, ms) {
  if (!KB.graph || !node) return;
  const cam = KB.graph.camera();
  if (!cam) return;
  KB.clearHover();
  KB._orbitCancel = false;

  const st = KB.graph.cameraPosition();
  const startTarget = st.lookAt || { x: 0, y: 0, z: 0 };
  const r0 = Math.hypot(st.x - node.x, st.y - node.y, st.z - node.z) || 800;
  const a0 = Math.atan2(st.x - node.x, st.z - node.z);
  const e0 = Math.asin(Math.max(-1, Math.min(1, (st.y - node.y) / r0)));

  /* 用"多数邻居"的距离来取景（70 分位），而不是最远的那个：
     不然一两个远房邻居会把镜头拉得很远，中心节点小得看不清。
     少数特别远的靠右侧面板的列表兜底。 */
  const nb = KB.neighborMap.get(node.id) || [];
  const dists = [];
  for (const e of nb) {
    const m = KB.byId[e.id];
    if (m && typeof m.x === 'number') {
      dists.push(Math.hypot(m.x - node.x, m.y - node.y, m.z - node.z));
    }
  }
  dists.sort((a, b) => a - b);
  const reach = dists.length ? dists[Math.floor((dists.length - 1) * 0.7)] : 120;
  const fov = ((cam && cam.fov) || 50) * Math.PI / 180;
  const r1 = Math.max(400, Math.min(1000, reach * 1.9 + 140));
  const a1 = 0.35;     // 3/4 视角，不是正对，保留立体感
  const e1 = 0.30;     // 略微俯视

  let da = a1 - a0;
  while (da > Math.PI) da -= Math.PI * 2;
  while (da < -Math.PI) da += Math.PI * 2;

  const dur = KB.reduceMotion ? 0 : (ms || 1450);
  const labelsEl = document.getElementById('labels');
  const startOrbit = () => {
    KB._orbiting = true;
    if (labelsEl) labelsEl.classList.add('orbiting');
  };
  const endOrbit = () => {
    KB._orbiting = false;
    if (labelsEl) labelsEl.classList.remove('orbiting');
    if (KB.graph) KB.graph.linkDirectionalParticles(KB.particleCount);
  };
  /* 走库自己的 cameraPosition：它会同时同步 controls 的注视点。
     直接改 camera.position 而不动 controls，镜头会指偏。 */
  const place = (a, e, r, k) => {
    const px = node.x + Math.sin(a) * Math.cos(e) * r;
    const py = node.y + Math.sin(e) * r;
    const pz = node.z + Math.cos(a) * Math.cos(e) * r;

    /* 面板打开时，把节点放到"可用区域"的中心而不是整屏中心，
       否则右侧的邻居会被面板挡住 */
    let fx = node.x - px, fy = node.y - py, fz = node.z - pz;
    const fl = Math.hypot(fx, fy, fz) || 1;
    fx /= fl; fy /= fl; fz /= fl;
    const rx = -fz, rz = fx;               // right = cross(forward, up)

    const panelEl = document.getElementById('panel');
    const panelOpen = panelEl && panelEl.classList.contains('open') && window.innerWidth > 900;
    const wide = window.innerWidth > 900;
    const panelW = panelOpen ? 480 : 0;
    const railW = wide ? 290 : 0;          // 左侧栏也占位置，节点要放在它右侧
    const worldPerPx = (2 * Math.tan(fov / 2) * r) / window.innerHeight;
    const shift = ((panelW - railW) / 2) * worldPerPx;

    /* 前 45% 先把注视点从当前位置摇到节点（节点平滑滑到中间），
       之后注视点钉死在节点上，模型绕着它转 */
    const pan = Math.min(1, k / 0.45);
    const pk = pan < 0.5 ? 2 * pan * pan : 1 - Math.pow(-2 * pan + 2, 2) / 2;
    const tx = startTarget.x + (node.x + rx * shift - startTarget.x) * pk;
    const ty = startTarget.y + (node.y - startTarget.y) * pk;
    const tz = startTarget.z + (node.z + rz * shift - startTarget.z) * pk;

    /* 每帧直接摆相机，不走库的缓动，避免注视点滞后导致节点漂移 */
    const controls = KB.graph.controls && KB.graph.controls();
    if (controls && controls.target) controls.target.set(tx, ty, tz);
    cam.position.set(px, py, pz);
    cam.lookAt(tx, ty, tz);
  };

  if (!dur) { place(a1, e1, r1, 1); return; }

  startOrbit();
  const t0 = performance.now();
  const step = () => {
    if (KB._orbitCancel) { endOrbit(); return; }
    const t = Math.min(1, (performance.now() - t0) / dur);
    /* easeInOutQuint：起步和收尾都更软，不会"弹一下" */
    const k = t < 0.5 ? 16 * Math.pow(t, 5) : 1 - Math.pow(-2 * t + 2, 5) / 2;
    place(a0 + da * k, e0 + (e1 - e0) * k, r0 + (r1 - r0) * k, k);
    if (t < 1) requestAnimationFrame(step);
    else endOrbit();
  };
  requestAnimationFrame(step);
};

/* 沿当前视角推进（备用：需要保持方位时用） */
KB.flyTo = function (node, ms) {
  if (!KB.graph || !node) return;
  KB.clearHover();
  const dist = 330 + (node._deg || 4) * 10;
  const cam = KB.graph.cameraPosition();
  let ux = (cam.x || 0) - node.x, uy = (cam.y || 0) - node.y, uz = (cam.z || 0) - node.z;
  let len = Math.hypot(ux, uy, uz);
  if (len < 1e-3) { ux = 0; uy = 0; uz = 1; len = 1; }
  ux /= len; uy /= len; uz /= len;
  KB.graph.cameraPosition(
    { x: node.x + ux * dist, y: node.y + uy * dist, z: node.z + uz * dist },
    { x: node.x, y: node.y, z: node.z },
    KB.reduceMotion ? 0 : (ms || 1100)
  );
};

/* 搜索定位：绕 Y 轴偏一点再拉近，像用手把星图拨过去 */
KB.flyToSearch = function (node) {
  if (!KB.graph || !node) return;
  KB.clearHover();
  const cam = KB.graph.cameraPosition();
  const az = Math.atan2((cam.x || 0) - node.x, (cam.z || 0) - node.z) + 0.55;
  const el = 0.30;
  const dist = 500;
  KB.graph.cameraPosition(
    {
      x: node.x + Math.sin(az) * Math.cos(el) * dist,
      y: node.y + Math.sin(el) * dist,
      z: node.z + Math.cos(az) * Math.cos(el) * dist
    },
    { x: node.x, y: node.y, z: node.z },
    KB.reduceMotion ? 0 : 1300
  );
};

/* 屏幕空间取景：按投影后的包围盒填满画面。
   zoomToFit 按包围球算，节点一多景深会浪费大半个屏幕。 */
KB.fitNodes = function (nodes, ms) {
  if (!KB.graph) return;
  const ns = (nodes || []).filter(n => n && n.__threeObj);
  if (!ns.length) return;
  const cam = KB.graph.camera();
  if (!cam) return;
  KB.clearHover();

  let cx = 0, cy = 0, cz = 0;
  ns.forEach(n => { cx += n.x; cy += n.y; cz += n.z; });
  cx /= ns.length; cy /= ns.length; cz /= ns.length;

  const cur = KB.graph.cameraPosition();
  let ux = cur.x - cx, uy = cur.y - cy, uz = cur.z - cz;
  let dist = Math.hypot(ux, uy, uz) || 600;
  ux /= dist; uy /= dist; uz /= dist;

  const v = cam.position.clone();
  for (let i = 0; i < 6; i++) {
    cam.position.set(cx + ux * dist, cy + uy * dist, cz + uz * dist);
    cam.lookAt(cx, cy, cz);
    cam.updateMatrixWorld(true);
    cam.updateProjectionMatrix();

    let maxN = 0, behind = 0;
    for (let j = 0; j < ns.length; j++) {
      v.copy(ns[j].__threeObj.position).project(cam);
      /* 在相机后面的点会被跳过，但那样会取景过近，
         所以一旦发现有节点在背后，就把相机往后退。 */
      if (!isFinite(v.x) || !isFinite(v.y) || v.z > 1) { behind++; continue; }
      const ax = Math.abs(v.x), ay = Math.abs(v.y);
      if (ax > maxN) maxN = ax;
      if (ay > maxN) maxN = ay;
    }
    if (behind) { dist *= 1.6; continue; }
    if (maxN < 0.001) break;
    dist = Math.max(120, dist * maxN / 0.86);
  }

  KB.graph.cameraPosition(
    { x: cx + ux * dist, y: cy + uy * dist, z: cz + uz * dist },
    { x: cx, y: cy, z: cz },
    KB.reduceMotion ? 0 : (ms == null ? 800 : ms)
  );
};

KB.fitView = function () {
  KB.fitNodes(KB.NODES, 800);
};

/* 方向模式：只框住这一串节点 */
KB.fitSubset = function (ids) {
  KB.fitNodes(ids.map(id => KB.byId[id]).filter(Boolean), 1000);
};

KB.setCursor = function (c) {
  const el = document.querySelector('#graph canvas');
  if (el) el.style.cursor = c;
};
