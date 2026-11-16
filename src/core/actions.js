/* ============================================================
 * 交互动作：单击 / 双击 / 选中 / 聚焦 / 方向模式 / 替换数据
 * ============================================================ */
window.KB = window.KB || {};

let clickTimer = null;
let clickCandidate = null;
let didInitialFit = false;

/* 单击 / 双击判定：300ms 内两次点同一节点算双击 */
KB.handleNodeClick = function (node) {
  if (clickTimer && clickCandidate === node.id) {
    clearTimeout(clickTimer);
    clickTimer = null; clickCandidate = null;
    KB.toggleFocus(node.id);
    return;
  }
  clickCandidate = node.id;
  clickTimer = setTimeout(() => {
    clickTimer = null; clickCandidate = null;
    KB.selectNode(node.id, true);
  }, 280);
};

KB.handleBackgroundClick = function () {
  if (clickTimer) { clearTimeout(clickTimer); clickTimer = null; clickCandidate = null; }
  KB.clearSelection();
};

KB.handleNodeHover = function (node) {
  KB.state.hover = node ? node.id : null;
  if (node) KB.showNodeTip(node);
  else if (!KB.state.hoverLink) KB.hideTip();
  KB.setCursor(node ? 'pointer' : 'grab');
};

KB.handleLinkHover = function (link) {
  KB.state.hoverLink = link || null;
  if (link && !KB.state.hover) KB.showLinkTip(link);
  if (!link && !KB.state.hover) KB.hideTip();
};

KB.handleEngineStop = function () {
  if (didInitialFit) return;
  didInitialFit = true;
  KB.fitView();
};

/* 每个知识点都有自己的地址：#/redis，可以直接分享或刷新回到这一页 */
KB.syncHash = function (id) {
  const n = id ? KB.byId[id] : null;
  const hash = n ? '#/' + id : '#';
  if (location.hash !== hash) {
    try { history.replaceState(null, '', hash); } catch (e) { location.hash = hash; }
  }
  document.title = n ? `${n.name} · 计算机知识体系` : '计算机知识体系 · 3D 交互图谱';
};

KB.selectNode = function (id, fly) {
  const n = KB.byId[id];
  if (!n) return;
  if (KB.state.focus && !KB.inFocusSet(id)) KB.state.focus = null;
  KB.state.selected = id;
  if (fly) KB.orbitTo(n);
  KB.renderPanel(id);
  KB.updateFocusBadge();
  KB.refreshStyles();
  KB.syncHash(id);
};

KB.clearSelection = function () {
  KB.state.selected = null;
  KB.state.focus = null;
  KB.closePanel();
  KB.updateFocusBadge();
  KB.refreshStyles();
  KB.syncHash(null);
};

KB.toggleFocus = function (id) {
  KB.state.focus = (KB.state.focus === id) ? null : id;
  KB.state.selected = id;
  const n = KB.byId[id];
  if (n) KB.orbitTo(n, 900);
  KB.renderPanel(id);
  KB.updateFocusBadge();
  KB.refreshStyles();
};

/* 方向模式：让一条学习路径成为主视角 */
KB.selectTrack = function (name) {
  if (!KB.TRACKS[name]) return;
  KB.state.track = (KB.state.track === name) ? null : name;

  if (KB.state.track) {
    KB.state.layer = null;
    KB.state.domain = null;
    KB.state.status = null;
    KB.state.selected = null;
    KB.state.focus = null;
    KB.closePanel();
    KB.updateFocusBadge();
    KB.syncFilterUI();
    const ids = KB.NODES.filter(n => n.tracks.includes(KB.state.track)).map(n => n.id);
    KB.fitSubset(ids);
    KB.renderTrackPanel(KB.state.track);
  } else {
    KB.closePanel();
    KB.syncFilterUI();
    KB.fitView();
  }
};

KB.updateMatchStat = function () {
  const total = KB.NODES.length;
  const hit = KB.NODES.filter(KB.matches).length;
  const el = document.getElementById('matchStat');
  if (el) el.innerHTML = `匹配 <b>${hit}</b> / ${total}`;
};

KB.updateFocusBadge = function () {
  const el = document.getElementById('focusBadge');
  if (!el) return;
  if (!KB.state.focus) { el.classList.remove('show'); el.innerHTML = ''; return; }
  const n = KB.byId[KB.state.focus];
  el.innerHTML = `<span>聚焦「${KB.esc(n ? n.name : '')}」的直接邻域</span><button data-clear>退出</button>`;
  el.classList.add('show');
};

/* ------------------------------------------------------------
 * 替换整套数据（把 {nodes, links} 换掉，筛选重置）
 * 浏览器控制台可用：KB.updateGraphData({nodes:[...], links:[...]})
 * ------------------------------------------------------------ */
KB.updateGraphData = function (newData) {
  if (!newData || !Array.isArray(newData.nodes) || !Array.isArray(newData.links)) return;

  KB.NODES.length = 0;
  KB.LINKS.length = 0;
  newData.nodes.forEach(n => KB.NODES.push({ ...n }));
  newData.links.forEach(l => KB.LINKS.push({ ...l }));

  const s = KB.state;
  s.selected = null; s.focus = null;
  s.layer = null; s.domain = null; s.status = null; s.track = null;

  KB.closePanel();
  KB.updateFocusBadge();
  KB.buildIndex();
  KB.prepareLinks();
  KB.buildRailUI();
  KB.buildDomainOptions();
  KB.buildLabels();
  KB.graph.graphData({ nodes: KB.NODES, links: KB.graphLinks });
  KB.refreshStyles();
  didInitialFit = false;
};
