/* ============================================================
 * 术语库界面：搜索 155 个节点与 1700+ 条细分知识点
 * 点术语看说明、所属节点、相邻关系，并可跳回 3D 图。
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  let layer = '';
  let current = null;
  let list = [];
  let seq = 0;

  const $ = (id) => document.getElementById(id);
  const esc = (s) => KB.esc(s == null ? '' : s);

  function openOverlay() {
    const el = $('glossaryOverlay');
    if (!el) return;
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    KB.state.glossaryOpen = true;
    setTimeout(() => { const i = $('glossaryInput'); if (i) i.focus(); }, 60);
  }

  function closeOverlay() {
    const el = $('glossaryOverlay');
    if (!el) return;
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    KB.state.glossaryOpen = false;
  }

  function renderChips() {
    const box = $('glossaryChips');
    const c = KB.glossaryCounts();
    box.innerHTML = `<button class="gchip${layer === '' ? ' on' : ''}" data-layer="">全部<em>${c.total}</em></button>` +
      KB.LAYERS.map(l => {
        const n = c.byLayer[l] || 0;
        return `<button class="gchip${layer === l ? ' on' : ''}" data-layer="${esc(l)}">${esc(l)}<em>${n}</em></button>`;
      }).join('');
  }

  function row(e) {
    const active = current && current.key === e.key;
    const kind = e.kind === 'node' ? '节点' : '细分';
    return `<button class="grow${active ? ' on' : ''}${e.kind === 'child' ? ' child' : ''}" data-key="${esc(e.key)}">
      <span class="gterm"><b>${esc(e.term)}</b><span class="gkind">${kind}</span></span>
      <span class="gdesc">${esc(e.desc || '')}</span>
      <span class="glayer">${esc(e.layer)}${e.parent ? ' · ' + esc(e.parent) : ''}</span>
    </button>`;
  }

  function renderList() {
    const box = $('glossaryList');
    const q = $('glossaryInput').value.trim();
    if (!q && !layer) {
      box.innerHTML = `<div class="gempty gintro">
        <b>搜索一个术语</b><br>
        可以搜节点名、细分知识点、别名或描述，例如 <code>注解</code>、<code>主从延迟</code>、<code>ci cd</code>、<code>树莓派</code>。<br>
        共 ${KB.glossaryCounts().nodes} 个节点、${KB.glossaryCounts().children} 条细分知识点。
      </div>`;
      return;
    }
    if (!list.length) {
      box.innerHTML = `<div class="gempty">没有匹配「${esc(q)}」的术语</div>`;
      return;
    }
    box.innerHTML = list.map(row).join('');
  }

  function renderDetail(e) {
    const box = $('glossaryDetail');
    if (!e) {
      box.innerHTML = '<div class="gempty">在左侧选择一个术语</div>';
      return;
    }
    current = e;

    const node = e.nodeId && KB.byId[e.nodeId] ? KB.byId[e.nodeId] : null;
    const tracks = (e.tracks || []).map(t => `<span class="gtrack">${esc(t)}</span>`).join('');

    let children = '';
    if (e.kind === 'node' && node) {
      const kids = (node.children || []);
      children = `<div class="gsec"><h4>细分知识点 <em>${kids.length} 条</em></h4>
        <div class="gkids">${kids.map(k => `<span class="gkid" title="${esc(k.desc || '')}">${esc(k.name)}</span>`).join('')}</div>
      </div>`;
    }

    let neighbors = '';
    if (node) {
      const rel = KB.glossaryNeighbors(e.nodeId);
      neighbors = `<div class="gsec"><h4>直接关联 <em>${rel.length} 条</em></h4>
        <div class="grel">${rel.map(r => `<button class="grel-item" data-goto="${esc(r.node.id)}">
          <b>${esc(r.node.name)}</b>
          <span>${r.dir === 'out' ? '→' : '←'} ${esc(r.relation || '')}</span>
        </button>`).join('')}</div>
      </div>`;
    }

    const parent = e.kind === 'child' && node
      ? `<div class="gsec"><h4>所属节点</h4>
          <button class="gparent" data-goto="${esc(e.nodeId)}">
            <b>${esc(e.parent)}</b>
            <span>${esc(e.group ? '分区：' + e.group : '打开节点')}</span>
          </button>
        </div>`
      : '';

    box.innerHTML = `
      <div class="ghead">
        <div>
          <h2>${esc(e.term)}</h2>
          <div class="gmeta">
            <span class="gkind-big">${e.kind === 'node' ? '知识点节点' : '细分知识点'}</span>
            <span>${esc(e.layer)}</span>
            ${tracks}
          </div>
        </div>
        <button class="gcopy" data-copy="1" title="复制术语与说明">复制</button>
      </div>
      <div class="gsec"><h4>说明</h4>
        <p class="gdesc-full">${esc(e.desc || '暂无说明')}</p>
      </div>
      ${parent}
      ${children}
      ${neighbors}
      <div class="gactions">
        ${node ? `<button class="gbtn" data-goto="${esc(e.nodeId)}">${e.kind === 'node' ? '在 3D 图中打开' : '打开所属节点'}</button>` : ''}
        <button class="gbtn ghost" data-copy="1">复制术语</button>
      </div>`;
  }

  function selectEntry(key) {
    const e = KB.glossaryGet(key);
    if (!e) return;
    renderDetail(e);
    renderList();
  }

  function doSearch(q) {
    const my = ++seq;
    list = KB.glossarySearch(q, layer, 80);
    if (my !== seq) return;
    renderList();
  }

  function copyCurrent() {
    if (!current) return;
    const text = current.term + (current.desc ? '：' + current.desc : '');
    const done = () => KB.showToast('已复制：' + current.term);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => KB.showToast('复制失败'));
    } else {
      KB.showToast('当前浏览器不支持自动复制');
    }
  }

  function goNode(nodeId) {
    const n = KB.byId[nodeId];
    if (!n) return;
    closeOverlay();
    if (!KB.matches(n)) {
      const s = KB.state;
      s.layer = null; s.domain = null; s.status = null; s.track = null;
      KB.syncFilterUI();
    }
    KB.state.highlightChild = current && current.kind === 'child' ? current.term : null;
    KB.selectNode(nodeId, false);
    KB.orbitTo(n, 1250);
  }

  function bind() {
    const el = $('glossaryOverlay');
    if (!el || el.dataset.bound) return;
    el.dataset.bound = '1';

    el.addEventListener('click', (ev) => {
      if (ev.target.closest('[data-close]')) { closeOverlay(); return; }
      const chip = ev.target.closest('.gchip');
      if (chip) {
        layer = chip.dataset.layer || '';
        renderChips();
        doSearch($('glossaryInput').value.trim());
        return;
      }
      const rowEl = ev.target.closest('.grow');
      if (rowEl) { selectEntry(rowEl.dataset.key); return; }
      const go = ev.target.closest('[data-goto]');
      if (go) { goNode(go.dataset.goto); return; }
      if (ev.target.closest('[data-copy]')) { copyCurrent(); return; }
    });

    let timer = null;
    const input = $('glossaryInput');
    input.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => doSearch(input.value.trim()), 200);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && KB.state.glossaryOpen) { e.stopPropagation(); closeOverlay(); }
    });
  }

  KB.openGlossary = function (query) {
    bind();
    openOverlay();
    const c = KB.glossaryCounts();
    const stat = $('glossaryStats');
    if (stat) stat.textContent = `${c.nodes} 个节点 · ${c.children} 条细分知识点`;
    renderChips();
    renderList();
    if (query) {
      $('glossaryInput').value = query;
      doSearch(query);
      if (list[0]) selectEntry(list[0].key);
    } else {
      setTimeout(() => $('glossaryInput').focus(), 80);
    }
  };

  KB.bindGlossary = function () {
    bind();
    const btn = $('glossaryBtn');
    if (btn) btn.addEventListener('click', () => KB.openGlossary(''));
  };
})();
