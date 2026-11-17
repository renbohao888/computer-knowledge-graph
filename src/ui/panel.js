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
  const article = (KB.ARTICLES || {})[id];
  const tab = KB.state.panelTab || 'overview';

  const overview = `
    <p class="p-desc">${KB.esc(n.description)}</p>
    ${renderNeighborMap(id, preIds, afterIds, related)}
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

  const articleHtml = article
    ? renderArticle(article)
    : `<div class="a-empty">这篇教程还在写。<br>欢迎在 <b>src/data/articles.js</b> 里补上：是什么、为什么、核心概念、示例和常见坑。</div>
       <button class="p-focus" data-focus>${KB.state.focus === id ? '退出邻域聚焦' : '聚焦这个邻域'}</button>`;

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
    <div class="p-tabs">
      <button class="p-tab${tab === 'overview' ? ' active' : ''}" data-tab="overview">概览</button>
      <button class="p-tab${tab === 'article' ? ' active' : ''}" data-tab="article">教程${article ? '' : ' · 待补'}</button>
    </div>
    <div class="p-tab-body">${tab === 'article' ? articleHtml : overview}</div>
  `;
  panel.classList.add('open');
  panel.scrollTop = 0;

  if (hitChild && tab !== 'article') {
    const el = panel.querySelector('.child.is-hit');
    if (el) el.scrollIntoView({ block: 'center' });
  }
};

/* 2D 平面关系图：当前节点居中，前置在左、后续在右、其他关联在下 */
function renderNeighborMap(id, preIds, postIds, relIds) {
  const W = 400;
  const rows = Math.max(preIds.length, postIds.length, 1);
  const gap = rows > 6 ? 38 : 44;
  const H = Math.max(190, rows * gap + 44);
  const cx = W / 2, cy = H / 2;
  const relOf = new Map((KB.neighborMap.get(id) || []).map(e => [e.id, e]));

  const short = (s) => (s.length > 9 ? s.slice(0, 9) + '…' : s);
  const colorOf = (oid) => KB.STATUS_COLOR[KB.effStatus(KB.byId[oid])] || '#9fb3cc';

  const row = (list, x) => list.map((pid, i) => ({
    pid, x, y: cy + (i - (list.length - 1) / 2) * gap
  }));
  const pre = row(preIds, 60);
  const post = row(postIds, W - 60);
  const rel = relIds.map((pid, i) => ({
    pid,
    x: 36 + (i + 0.5) * ((W - 72) / Math.max(1, relIds.length)),
    y: H - 24
  }));

  /* 邻居多的时候关系文字会互相压字，这时候只画线，关系交给下面的列表 */
  const showEdgeLabels = preIds.length <= 3 && postIds.length <= 3 && relIds.length <= 4;

  const edgeOf = (o) => {
    const mx = (cx + o.x) / 2;
    const my = (cy + o.y) / 2 + (o.y > cy + 40 ? 8 : 0);
    const d = `M ${cx} ${cy} Q ${mx} ${my} ${o.x} ${o.y}`;
    const e = relOf.get(o.pid);
    const label = (showEdgeLabels && e) ? e.relation : '';
    return `<path d="${d}" class="map-edge" />` +
      (label ? `<text x="${mx}" y="${my - 3}" class="map-rel">${KB.esc(label.length > 6 ? label.slice(0, 6) + '…' : label)}</text>` : '');
  };

  const nodeAt = (o, r) => {
    const p = KB.byId[o.pid];
    const x = o.x.toFixed(1), y = o.y.toFixed(1);
    return `<g class="map-node" data-goto="${KB.esc(o.pid)}">
      <rect x="${(o.x - 46).toFixed(1)}" y="${(o.y - 14).toFixed(1)}" width="92" height="${r * 2 + 22}"
            fill="transparent" pointer-events="all" />
      <circle cx="${x}" cy="${y}" r="${r}" fill="${colorOf(o.pid)}" />
      <text x="${x}" y="${(o.y + r + 12).toFixed(1)}" text-anchor="middle" class="map-name">${KB.esc(short(p.name))}</text>
    </g>`;
  };

  return `<div class="p-map"><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="关系平面图">
    <text x="12" y="16" class="map-tag">前置</text>
    <text x="${W - 12}" y="16" text-anchor="end" class="map-tag">后续</text>
    ${preIds.length ? `<text x="12" y="${H - 6}" class="map-tag">关联</text>` : ''}
    ${pre.map(edgeOf).join('')}
    ${post.map(edgeOf).join('')}
    ${rel.map(edgeOf).join('')}
    <circle cx="${cx}" cy="${cy}" r="11" fill="${colorOf(id)}" class="map-center" />
    <circle cx="${cx}" cy="${cy}" r="18" fill="none" class="map-halo" />
    ${pre.map(o => nodeAt(o, 7)).join('')}
    ${post.map(o => nodeAt(o, 7)).join('')}
    ${rel.map(o => nodeAt(o, 6)).join('')}
  </svg></div>`;
}

/* 教程正文：一个块里可以同时有标题、段落、列表、代码，按出现顺序拼接 */
function renderArticle(blocks) {
  return (blocks || []).map(b => {
    let out = '';
    if (b.h) out += `<h3 class="a-h">${KB.esc(b.h)}</h3>`;
    if (b.p) out += `<p class="a-p">${KB.esc(b.p)}</p>`;
    if (b.ul) out += `<ul class="a-ul">${b.ul.map(x => `<li>${KB.esc(x)}</li>`).join('')}</ul>`;
    if (b.code) out += `<pre class="a-pre"><code>${KB.esc(b.code)}</code></pre>`;
    if (b.tip) out += `<div class="a-tip">${KB.esc(b.tip)}</div>`;
    if (b.links) out += `<div class="a-links">${b.links.map(l => `<a href="${KB.esc(l.u)}" target="_blank" rel="noopener">${KB.esc(l.t)}</a>`).join('')}</div>`;
    return out;
  }).join('');
}

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
    const tb = e.target.closest('[data-tab]');
    if (tb) { KB.state.panelTab = tb.dataset.tab; KB.renderPanel(KB.state.selected); return; }
    if (e.target.closest('[data-focus]')) { KB.toggleFocus(KB.state.selected); return; }
    if (e.target.closest('[data-backtrack]')) { if (KB.state.track) KB.renderTrackPanel(KB.state.track); return; }
    if (e.target.closest('[data-clear-track]')) { KB.selectTrack(KB.state.track); return; }
    if (e.target.closest('[data-close]')) { KB.clearSelection(); }
  });
};
