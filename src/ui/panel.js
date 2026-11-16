/* ============================================================
 * 详情面板：节点详情 / 方向概览
 * 结构：位置 → 名称 → 标签 → 描述 → 细分知识点 → 前置 / 后置 / 其他关联
 * ============================================================ */
window.KB = window.KB || {};

KB.panelEl = null;

KB.getPanel = function () {
  if (!KB.panelEl) KB.panelEl = document.getElementById('panel');
  return KB.panelEl;
};

function rowFor(oid, relOf) {
  const o = KB.byId[oid];
  if (!o) return '';
  const e = relOf.get(oid);
  const tag = e ? `${e.dir === 'out' ? '→' : '←'} ${KB.esc(e.relation)}` : KB.esc(o.layer);
  const c = KB.STATUS_COLOR[KB.effStatus(o)] || '#9fb3cc';
  return `<li><button data-goto="${KB.esc(oid)}">
    <span class="dot" style="background:${c};color:${c}"></span>
    <span class="nb-name">${KB.esc(o.name)}</span>
    <span class="nb-rel">${tag}</span>
  </button></li>`;
}

function group(title, hint, ids, note, relOf) {
  if (!ids.length && !note) return '';
  return `<div class="p-group">
    <div class="p-group-title"><span>${title}</span><em>${hint}</em><b>${ids.length}</b></div>
    ${ids.length
      ? `<ul class="p-nb">${ids.map(id => rowFor(id, relOf)).join('')}</ul>`
      : `<div class="p-note">${note}</div>`}
  </div>`;
}

KB.renderPanel = function (id) {
  const n = KB.byId[id];
  const panel = KB.getPanel();
  if (!n) { KB.closePanel(); return; }

  const li = Math.max(0, KB.LAYERS.indexOf(n.layer));
  const relOf = new Map((KB.neighborMap.get(id) || []).map(e => [e.id, e]));

  /* 前置：显式 before 优先；没写的话退化成"更低层的邻居" */
  let preIds = n.before.filter(x => KB.byId[x]);
  if (!preIds.length && !Array.isArray(n.before)) {
    preIds = (KB.neighborMap.get(id) || [])
      .filter(e => KB.LAYERS.indexOf(KB.byId[e.id].layer) > li)
      .map(e => e.id);
  }
  const preSet = new Set(preIds);

  /* 后置：谁把我写进了它的 before */
  const afterIds = KB.NODES.filter(x => x.before.includes(id)).map(x => x.id);
  const afterSet = new Set(afterIds);

  /* 其余直接连线：只讲架构关系 */
  const related = (KB.neighborMap.get(id) || [])
    .filter(e => !preSet.has(e.id) && !afterSet.has(e.id))
    .map(e => e.id);

  const hitChild = KB.state.highlightChild || null;
  const children = (n.children || []).map(ch => {
    const hit = hitChild && ch.name === hitChild;
    return `<div class="child${hit ? ' is-hit' : ''}">
      <b>${KB.esc(ch.name)}</b>
      <span>${KB.esc(ch.desc || '')}</span>
    </div>`;
  }).join('');

  const st = KB.effStatus(n);
  const color = KB.STATUS_COLOR[st] || '#9fb3cc';
  panel.innerHTML = `
    <button class="panel-close" data-close aria-label="关闭详情">✕</button>
    ${KB.state.track ? `<button class="p-back" data-backtrack>← ${KB.esc(KB.state.track)} 方向</button>` : ''}
    <div class="p-layer">
      <span class="p-stack">${KB.LAYERS.map((l, i) => `<i class="${i === li ? 'on' : ''}"></i>`).join('')}</span>
      <span>${KB.esc(n.layer)}</span>
      <span class="p-depth">第 ${li + 1} 层 / ${KB.LAYERS.length}</span>
    </div>
    <h2 class="p-title">${KB.esc(n.name)}</h2>
    <div class="p-chips">
      <span class="chip chip-status" style="--c:${color}">${KB.esc(st)}</span>
      <span class="chip">${KB.esc(n.domain)}</span>
      ${n.tracks.length ? `<span class="chip">${KB.esc(n.tracks.join(' / '))}</span>` : ''}
      <span class="chip chip-dim">${n._deg} 条连线</span>
    </div>
    <div class="p-progress">
      <span>我的进度</span>
      ${KB.STATUS_LIST.map(s => `<button class="p-prog${st === s ? ' active' : ''}" data-progress="${KB.esc(s)}" style="--c:${KB.STATUS_COLOR[s]}">${KB.esc(s)}</button>`).join('')}
      ${KB.hasProgress(n) ? `<em>作者标注 ${KB.esc(n.status)}</em>` : ''}
    </div>
    <p class="p-desc">${KB.esc(n.description)}</p>
    <p class="p-layerdef">${KB.esc(KB.LAYER_INFO[n.layer] || '')}</p>
    ${children ? `<div class="p-group">
      <div class="p-group-title"><span>细分知识点</span><em>可以继续拆下去</em><b>${n.children.length}</b></div>
      <div class="p-children">${children}</div>
    </div>` : ''}
    ${group('前置知识', '先懂这些', preIds, '这张图里的地基，没有更低层的前置节点。', relOf)}
    ${group('学完之后', '这些以它为前置', afterIds, '', relOf)}
    ${group('其他关联', '架构上的直接相连', related, '', relOf)}
    <button class="p-focus" data-focus>${KB.state.focus === id ? '退出邻域聚焦' : '聚焦这个邻域'}</button>
  `;
  panel.classList.add('open');

  if (hitChild) {
    const el = panel.querySelector('.child.is-hit');
    if (el) el.scrollIntoView({ block: 'center' });
  }
};

/* 方向概览面板 */
KB.renderTrackPanel = function (name) {
  const info = KB.TRACKS[name];
  const panel = KB.getPanel();
  if (!info) return;

  const nodes = KB.NODES.filter(n => n.tracks.includes(name));
  const counts = KB.STATUS_LIST.map(s => ({ s, c: nodes.filter(n => KB.effStatus(n) === s).length }));
  const pct = Math.round((counts[0].c / Math.max(1, nodes.length)) * 100);
  const layerHas = new Set(nodes.map(n => n.layer));
  const groups = KB.LAYERS
    .map(l => ({ l, arr: nodes.filter(n => n.layer === l) }))
    .filter(g => g.arr.length);

  panel.innerHTML = `
    <button class="panel-close" data-close aria-label="关闭详情">✕</button>
    <div class="p-layer">
      <span class="p-stack">${KB.LAYERS.map(l => `<i class="${layerHas.has(l) ? 'on' : ''}"></i>`).join('')}</span>
      <span>学习方向</span>
      <span class="p-depth">${nodes.length} 个知识点</span>
    </div>
    <h2 class="p-title">${KB.esc(name)}</h2>
    <p class="p-desc">${KB.esc(info.desc)}</p>
    <div class="track-stats">
      ${counts.map(x => `<div class="ts-row"><i style="background:${KB.STATUS_COLOR[x.s]}"></i><span>${x.s}</span><b>${x.c}</b></div>`).join('')}
    </div>
    <div class="progress"><i style="width:${pct}%"></i></div>
    <p class="progress-text">${pct}% 已掌握 · 同色是同一方向，越亮越需要补</p>
    ${groups.map(g => `
      <div class="p-group">
        <div class="p-group-title"><span>${KB.esc(g.l)}</span><b style="margin-left:auto">${g.arr.length}</b></div>
        <ul class="p-nb">${g.arr.map(n => {
          const s2 = KB.effStatus(n);
          const c = KB.STATUS_COLOR[s2] || '#9fb3cc';
          return `<li><button data-goto="${KB.esc(n.id)}">
            <span class="dot" style="background:${c};color:${c}"></span>
            <span class="nb-name">${KB.esc(n.name)}</span>
            <span class="nb-rel">${KB.esc(s2)}</span>
          </button></li>`;
        }).join('')}</ul>
      </div>`).join('')}
    <button class="p-focus" data-clear-track>退出方向模式</button>
  `;
  panel.classList.add('open');
};

KB.closePanel = function () {
  const panel = KB.getPanel();
  if (panel) panel.classList.remove('open');
};

KB.renderPanelIfOpen = function () {
  if (KB.state.selected && KB.getPanel().classList.contains('open')) KB.renderPanel(KB.state.selected);
};

KB.bindPanel = function () {
  KB.getPanel().addEventListener('click', (e) => {
    const go = e.target.closest('[data-goto]');
    if (go) { KB.selectNode(go.dataset.goto, true); return; }
    const pr = e.target.closest('[data-progress]');
    if (pr) { KB.setProgress(KB.state.selected, pr.dataset.progress); return; }
    if (e.target.closest('[data-focus]')) { KB.toggleFocus(KB.state.selected); return; }
    if (e.target.closest('[data-backtrack]')) { if (KB.state.track) KB.renderTrackPanel(KB.state.track); return; }
    if (e.target.closest('[data-clear-track]')) { KB.selectTrack(KB.state.track); return; }
    if (e.target.closest('[data-close]')) { KB.clearSelection(); }
  });
};
