/* ============================================================
 * 搜索：名称 / id / 别名 keywords / 子知识点 children / 层 / 方向 / 描述
 * 命中子知识点时，结果会显示「Java 语言与并发 › 注解 Annotation」，
 * 选中后面板会滚到那一条并高亮。
 * ============================================================ */
window.KB = window.KB || {};

let srList = [];
let srIndex = 0;

const squash = (s) => String(s || '').toLowerCase().replace(/[\s/\-_.·、，,()（）]+/g, '');

function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

function hl(text, q) {
  if (!q) return KB.esc(text);
  try {
    const safe = escRe(KB.esc(q));
    return KB.esc(text).replace(new RegExp('(' + safe + ')', 'ig'), '<mark>$1</mark>');
  } catch (e) { return KB.esc(text); }
}

/* 一个字段是否命中某个词。单字/双字要更严格，避免 "c" 把什么都匹配上 */
function fieldHit(field, token) {
  const f = String(field || '').toLowerCase();
  const t = token.toLowerCase();
  const ts = squash(t);
  if (ts.length < 2) return squash(f) === ts;
  return f.includes(t) || squash(f).includes(ts);
}

function nodeFields(n) {
  return [n.name, n.id, n.layer, n.domain, n.description]
    .concat(n.keywords || [])
    .concat((n.children || []).map(c => c.name));
}

/* 多词查询：每个词都要在这条知识点的某个字段里出现 */
function nodeHasAllTokens(n, tokens) {
  const fields = nodeFields(n);
  return tokens.every(tk => fields.some(f => fieldHit(f, tk)));
}

function childForTokens(n, tokens) {
  for (const ch of n.children || []) {
    if (tokens.some(tk => fieldHit(ch.name, tk))) return ch.name;
  }
  return null;
}

KB.searchNodes = function (query) {
  const raw = String(query || '').trim();
  if (!raw) return [];
  const q = raw.toLowerCase();
  const qs = squash(raw);
  const tokens = q.split(/\s+/).filter(Boolean);
  const hits = [];

  for (const n of KB.NODES) {
    let score = 0;
    let child = null;
    const name = n.name.toLowerCase();

    if (tokens.length > 1) {
      /* "java 注解" 这种：所有词都要命中 */
      if (!nodeHasAllTokens(n, tokens)) continue;
      score = squash(name).includes(qs) ? 95 : 72;
      child = childForTokens(n, tokens);
    } else {
      if (name === q) score = 140;
      else if (name.startsWith(q)) score = 120;
      else if (name.includes(q)) score = 100;
      else if (squash(name) === qs) score = 95;
      else if (squash(name).includes(qs)) score = 85;
      else if (n.id.toLowerCase() === q || n.id.toLowerCase() === qs) score = 90;
      else if (n.id.toLowerCase().includes(q)) score = 60;

      /* 子知识点比别名更具体，先看它 */
      if (!score) {
        for (const ch of n.children) {
          const cn = ch.name.toLowerCase();
          if (cn === q || squash(cn) === qs) { score = 78; child = ch.name; break; }
          if (qs.length >= 2 && (cn.includes(q) || squash(cn).includes(qs))) { score = 62; child = ch.name; break; }
          if (qs.length >= 2 && squash(ch.desc || '').includes(qs)) { score = 42; child = ch.name; break; }
        }
      }

      /* 别名：短的只允许完全相等 */
      if (!score) {
        for (const k of n.keywords) {
          const kk = k.toLowerCase();
          const kl = squash(kk);
          if (kk === q || kl === qs) { score = 80; break; }
          if (kl.length >= 3 && (kk.includes(q) || kl.includes(qs) || q.includes(kk))) { score = 65; break; }
        }
      }

      /* 已经是子知识点命中的，补一个高亮（别名命中时也一样） */
      if (score && !child) {
        const ch = (n.children || []).find(x => fieldHit(x.name, q));
        if (ch) child = ch.name;
      }

      if (!score) {
        if (n.layer.toLowerCase().includes(q) || n.domain.toLowerCase().includes(q)) score = 30;
        else if (n.description.toLowerCase().includes(q)) score = 20;
      }
    }

    if (score) hits.push({ id: n.id, name: n.name, layer: n.layer, child, score });
  }

  return hits
    .sort((a, b) => (b.score - a.score) || a.name.localeCompare(b.name, 'zh'))
    .slice(0, 8);
};

function renderSearchResults() {
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');
  const q = input.value.trim();
  if (!q) { box.classList.remove('show'); srList = []; return; }

  box.innerHTML = srList.length
    ? srList.map((r, i) => `
        <button class="sr-item${i === srIndex ? ' active' : ''}" data-id="${KB.esc(r.id)}" data-child="${KB.esc(r.child || '')}" role="option">
          <span class="sr-dot" style="background:${KB.STATUS_COLOR[KB.effStatus(KB.byId[r.id])] || '#9fb3cc'}"></span>
          <span class="sr-name">${hl(r.name, q)}${r.child ? `<em> › ${hl(r.child, q)}</em>` : ''}</span>
          <span class="sr-layer">${KB.esc(r.layer)}</span>
        </button>`).join('')
    : `<div class="sr-empty">没有匹配「${KB.esc(q)}」的知识点</div>`;

  box.classList.add('show');
  const act = box.querySelector('.sr-item.active');
  if (act) act.scrollIntoView({ block: 'nearest' });
}

KB.chooseSearch = function (id, child) {
  const n = KB.byId[id];
  if (!n) return;
  /* 当前筛选把它藏了，就先清空，免得"飞过去却看不见" */
  if (!KB.matches(n)) {
    const s = KB.state;
    s.layer = null; s.domain = null; s.status = null; s.track = null;
    KB.syncFilterUI();
  }
  KB.state.highlightChild = child || null;
  document.getElementById('searchResults').classList.remove('show');
  document.getElementById('searchInput').blur();
  KB.selectNode(id, false);
  KB.orbitTo(n, 1250);
};

KB.bindSearch = function () {
  const input = document.getElementById('searchInput');
  const box = document.getElementById('searchResults');

  input.addEventListener('input', () => {
    srList = KB.searchNodes(input.value);
    srIndex = 0;
    renderSearchResults();
  });

  input.addEventListener('focus', () => {
    if (input.value.trim()) {
      srList = KB.searchNodes(input.value);
      srIndex = 0;
      renderSearchResults();
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(() => box.classList.remove('show'), 140);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (srList.length) { srIndex = Math.min(srIndex + 1, srList.length - 1); renderSearchResults(); }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (srList.length) { srIndex = Math.max(srIndex - 1, 0); renderSearchResults(); }
    } else if (e.key === 'Enter') {
      if (srList[srIndex]) {
        e.preventDefault();
        const r = srList[srIndex];
        KB.chooseSearch(r.id, r.child);
      }
    } else if (e.key === 'Escape') {
      e.stopPropagation();
      box.classList.remove('show');
      input.blur();
    }
  });

  box.addEventListener('mousedown', (e) => {
    const b = e.target.closest('[data-id]');
    if (b) {
      e.preventDefault();
      KB.chooseSearch(b.dataset.id, b.dataset.child || null);
    }
  });

  document.addEventListener('keydown', (e) => {
    const k = e.key.toLowerCase();
    if ((e.ctrlKey || e.metaKey) && k === 'k') {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (!e.ctrlKey && !e.metaKey && !e.altKey && e.key === '/' && document.activeElement !== input) {
      e.preventDefault();
      input.focus();
    }
  });
};
