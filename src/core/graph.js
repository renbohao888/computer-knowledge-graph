/* ============================================================
 * 3D 图：初始化、样式访问器、相机运动
 * 渲染由 3d-force-graph（底层 Three.js / WebGL）完成。
 * ============================================================ */
window.KB = window.KB || {};

/* ---------- 样式访问器 ---------- */
KB.nodeSize = function (n) {
  return 1.2 + Math.min(n._deg || 0, 8) * 0.9;
};

KB.colorOfNode = function (n) {
  const s = KB.state;
  /* 方向模式：同一种颜色代表同一条路径，亮度代表掌握度（越亮越该补） */
  if (s.track) {
    if (!n.tracks.includes(s.track)) return KB.fade('#8fa3c0', 0.9);
    if (!KB.matches(n) || (s.focus && !KB.inFocusSet(n.id))) {
      return KB.fade(KB.TRACKS[s.track].color, 0.82);
    }
    const t = KB.STATUS_TINT[n.status];
    return KB.fade(KB.TRACKS[s.track].color, t != null ? t : 0.2);
  }
  const base = KB.STATUS_COLOR[n.status] || '#9fb3cc';
  if (s.focus && !KB.inFocusSet(n.id)) return KB.fade(base, 0.84);
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
  if (!KB.matches(KB.byId[s]) || !KB.matches(KB.byId[t])) return 0;
  return KB.isHotLink(l) ? 4 : 1;
};

/* ---------- 初始化 ---------- */
KB.initGraph = function () {
  const g = ForceGraph3D({ controlType: 'trackball' })(document.getElementById('graph'));

  g.backgroundColor(KB.BG)
    .showNavInfo(false)
    .nodeRelSize(8)
    .nodeResolution(15)
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

  g.d3Force('charge').strength(-460).distanceMax(1100);
  g.d3Force('link')
    .distance(l => l.learn ? 40 : (KB.sameLayerLink(l) ? 62 : 112))
    .strength(l => l.learn ? 0 : 0.45);   // 学习路径不参与布局

  /* 收敛得快一点，首屏不用等太久就能开始点 */
  g.d3AlphaDecay(0.024).warmupTicks(60).cooldownTicks(180);

  /* 初始用斜视角，否则 11 层会压成一条竖线 */
  g.cameraPosition({ x: 620, y: 300, z: 880 }, { x: 0, y: 0, z: 0 }, 0);

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

/* 飞向节点：沿当前视角方向推进，方位感不变 */
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

KB.fitView = function () {
  if (!KB.graph) return;
  KB.clearHover();
  KB.graph.zoomToFit(KB.reduceMotion ? 0 : 900, 34);
};

/* 把镜头收到一组节点的包围球上（方向模式） */
KB.fitSubset = function (ids) {
  if (!KB.graph) return;
  const ns = ids.map(id => KB.byId[id]).filter(n => n && typeof n.x === 'number');
  if (!ns.length) return;
  KB.clearHover();

  let cx = 0, cy = 0, cz = 0;
  ns.forEach(n => { cx += n.x; cy += n.y; cz += n.z; });
  cx /= ns.length; cy /= ns.length; cz /= ns.length;

  let r = 0;
  ns.forEach(n => { r = Math.max(r, Math.hypot(n.x - cx, n.y - cy, n.z - cz)); });
  r = Math.max(r, 45);

  const cam = KB.graph.camera();
  const fov = ((cam && cam.fov) || 50) * Math.PI / 180;
  const dist = (r / Math.sin(fov / 2)) * 1.18;

  const cur = KB.graph.cameraPosition();
  let ux = cur.x - cx, uy = cur.y - cy, uz = cur.z - cz;
  const len = Math.hypot(ux, uy, uz) || 1;
  ux /= len; uy /= len; uz /= len;

  KB.graph.cameraPosition(
    { x: cx + ux * dist, y: cy + uy * dist, z: cz + uz * dist },
    { x: cx, y: cy, z: cz },
    KB.reduceMotion ? 0 : 1000
  );
};

KB.setCursor = function (c) {
  const el = document.querySelector('#graph canvas');
  if (el) el.style.cursor = c;
};
