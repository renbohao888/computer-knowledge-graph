/* ============================================================
 * 术语库：把 155 个节点与 1700+ 条细分知识点变成可检索的词条
 * ------------------------------------------------------------
 * 不需要额外数据文件，启动后从 KB.NODES / children 自动构建。
 * 搜索同时匹配术语名、描述、所属节点与 keywords。
 * ============================================================ */
window.KB = window.KB || {};
(function () {
  let entries = null;
  let byKey = null;

  const squash = (s) => String(s || '').toLowerCase()
    .replace(/[\s/\-_.·、，,()（）［］【】]+/g, '');

  function build() {
    if (entries) return entries;
    const list = [];
    KB.NODES.forEach(n => {
      list.push({
        key: 'n:' + n.id,
        term: n.name,
        kind: 'node',
        nodeId: n.id,
        layer: n.layer,
        desc: n.description || '',
        keywords: n.keywords || [],
        tracks: n.tracks || []
      });
      (n.children || []).forEach((c, i) => {
        if (!c || !c.name) return;
        list.push({
          key: 'c:' + n.id + ':' + i,
          term: c.name,
          kind: 'child',
          nodeId: n.id,
          parent: n.name,
          group: c.group || '',
          layer: n.layer,
          desc: c.desc || '',
          keywords: [],
          tracks: n.tracks || []
        });
      });
    });
    entries = list;
    byKey = new Map(list.map(e => [e.key, e]));
    return entries;
  }

  KB.buildGlossary = build;
  KB.glossaryGet = function (key) { build(); return byKey.get(key) || null; };

  KB.glossaryCounts = function () {
    const list = build();
    const byLayer = {};
    list.forEach(e => { byLayer[e.layer] = (byLayer[e.layer] || 0) + 1; });
    return {
      total: list.length,
      nodes: list.filter(e => e.kind === 'node').length,
      children: list.filter(e => e.kind === 'child').length,
      byLayer
    };
  };

  KB.glossarySearch = function (q, layer, limit) {
    const list = build();
    const raw = String(q || '').trim();
    const lim = Math.max(1, Math.min(Number(limit) || 80, 200));

    if (!raw) {
      return list.filter(e => !layer || e.layer === layer).slice(0, lim);
    }

    const ql = raw.toLowerCase();
    const qs = squash(raw);
    const tokens = ql.split(/\s+/).filter(Boolean);
    const out = [];

    for (const e of list) {
      if (layer && e.layer !== layer) continue;
      const name = String(e.term || '');
      const hay = squash([name, e.desc, e.parent, e.group, (e.keywords || []).join(' ')]
        .filter(Boolean).join(' '));
      if (!tokens.every(t => hay.includes(squash(t)))) continue;

      let score = 0;
      if (name.toLowerCase() === ql || squash(name) === qs) score = 200;
      else if (name.toLowerCase().startsWith(ql) || squash(name).startsWith(qs)) score = 160;
      else if (name.toLowerCase().includes(ql) || squash(name).includes(qs)) score = 130;
      else if ((e.keywords || []).some(k => squash(k).includes(qs))) score = 100;
      else if (squash(e.desc).includes(qs)) score = 70;
      if (!score) continue;
      if (e.kind === 'node') score += 6;
      out.push({ score, e });
    }

    out.sort((a, b) => (b.score - a.score) ||
      (a.e.term.length - b.e.term.length) ||
      a.e.term.localeCompare(b.e.term, 'zh'));
    return out.slice(0, lim).map(x => x.e);
  };

  /* 节点直接相邻的知识点与关系短语 */
  KB.glossaryNeighbors = function (nodeId) {
    const seen = new Set();
    const out = [];
    (KB.neighborMap.get(nodeId) || []).forEach(e => {
      if (!KB.byId[e.id] || seen.has(e.id)) return;
      seen.add(e.id);
      out.push({ node: KB.byId[e.id], relation: e.relation, dir: e.dir });
    });
    return out;
  };
})();
