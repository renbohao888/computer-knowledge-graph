#!/usr/bin/env node
/* ============================================================
 * 数据校验：node scripts/validate.mjs
 * CI 和本地提交前都跑这个。任何一项不通过都会以非零码退出。
 * ============================================================ */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

const ctx = { matchMedia: () => ({ matches: false }) };
vm.createContext(ctx);
ctx.window = ctx;              // 让 window === 全局对象，脚本里的裸 KB 才能解析
vm.runInContext(read('src/config.js'), ctx);
vm.runInContext(read('src/data/nodes.js'), ctx);
vm.runInContext(read('src/data/links.js'), ctx);

const KB = ctx.KB;
const nodes = KB.NODES;
const links = KB.LINKS;

const errors = [];
const warnings = [];
const err = (m) => errors.push(m);

const ids = new Set();
const byId = Object.create(null);

for (const n of nodes) {
  if (!n.id) err('节点缺少 id: ' + JSON.stringify(n).slice(0, 60));
  if (ids.has(n.id)) err('重复 id: ' + n.id);
  ids.add(n.id);
  byId[n.id] = n;

  if (!KB.LAYERS.includes(n.layer)) err(`未知 layer: ${n.id} → ${n.layer}`);
  if (!KB.STATUS_LIST.includes(n.status)) err(`未知 status: ${n.id} → ${n.status}`);
  if (!n.name) err('缺少 name: ' + n.id);
  if (!n.domain) err('缺少 domain: ' + n.id);
  if (!n.description || n.description.length < 8) err('描述过短: ' + n.id);

  if (!Array.isArray(n.tracks) || !n.tracks.length) err('缺少 tracks: ' + n.id);
  else n.tracks.forEach(t => { if (!KB.TRACKS[t]) err(`未知方向: ${n.id} → ${t}`); });

  if (!Array.isArray(n.before)) err('缺少 before: ' + n.id);
  if (n.keywords && !Array.isArray(n.keywords)) err('keywords 必须是数组: ' + n.id);
  if (n.children) {
    if (!Array.isArray(n.children)) err('children 必须是数组: ' + n.id);
    else n.children.forEach((c, i) => {
      if (!c || !c.name) err(`children[${i}] 缺少 name: ${n.id}`);
    });
  }
}

const deg = Object.create(null);
nodes.forEach(n => { deg[n.id] = 0; });
const pairs = new Set();

for (const l of links) {
  if (!l.source || !l.target || !l.relation) err('连线缺字段: ' + JSON.stringify(l));
  if (!ids.has(l.source)) err('source 不存在: ' + l.source);
  if (!ids.has(l.target)) err('target 不存在: ' + l.target);
  if (l.source === l.target) err('自环: ' + l.source);
  if (byId[l.source] && byId[l.target]) {
    const key = [l.source, l.target].sort().join('|');
    if (pairs.has(key)) err('重复连线: ' + key);
    pairs.add(key);
    deg[l.source]++; deg[l.target]++;
  }
}

for (const n of nodes) {
  for (const p of n.before || []) {
    if (!ids.has(p)) err(`before 指向不存在的节点: ${n.id} → ${p}`);
    if (p === n.id) err('before 指向自己: ' + n.id);
  }
}

/* 学习前置不允许成环 */
const mark = Object.create(null);
const dfs = (id, stack) => {
  if (mark[id] === 1) { err('before 有环: ' + stack.concat(id).join(' → ')); return; }
  if (mark[id] === 2) return;
  mark[id] = 1;
  (byId[id].before || []).forEach(p => { if (byId[p]) dfs(p, stack.concat(id)); });
  mark[id] = 2;
};
nodes.forEach(n => dfs(n.id, []));

/* 软性建议 */
for (const n of nodes) {
  if (deg[n.id] < 2) warnings.push(`孤立感: ${n.id} 只有 ${deg[n.id]} 条连线`);
  if (!n.description || n.description.length > 80) warnings.push(`描述偏长（>80 字）: ${n.id}`);
}
for (const t of Object.keys(KB.TRACKS)) {
  const c = nodes.filter(n => (n.tracks || []).includes(t)).length;
  if (c < 3) warnings.push(`方向「${t}」只有 ${c} 个节点`);
}

const degs = Object.values(deg).sort((a, b) => a - b);
const stat = {
  nodes: nodes.length,
  links: links.length,
  layers: KB.LAYERS.length,
  tracks: Object.keys(KB.TRACKS).length,
  children: nodes.reduce((s, n) => s + (n.children || []).length, 0),
  keywords: nodes.reduce((s, n) => s + (n.keywords || []).length, 0),
  degree: { min: degs[0], median: degs[Math.floor(degs.length / 2)], max: degs[degs.length - 1] }
};

console.log('数据概览:', JSON.stringify(stat, null, 0));

if (warnings.length) {
  console.log('\n提示 (' + warnings.length + '):');
  warnings.forEach(w => console.log('  · ' + w));
}

if (errors.length) {
  console.error('\n错误 (' + errors.length + '):');
  errors.forEach(e => console.error('  ✗ ' + e));
  process.exit(1);
}

console.log('\n✓ 数据校验通过');
