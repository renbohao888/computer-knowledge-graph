# 参与贡献

这个项目最需要的东西不是代码，是**知识本身**：

- 某个知识点写错了、过时了、太浅
- 缺了一个重要的节点，或者少了一条该有的关系
- 一个大的知识点可以拆成几个更小的
- 某个名词的俗称 / 英文 / 缩写搜不到

这些都可以直接提 PR，不需要懂前端。

## 数据在哪

| 想改什么 | 改哪个文件 |
|---|---|
| 软件系统主干的知识点 | `src/data/nodes.js` |
| 前端 / 移动端 / iOS | `src/data/nodes-client.js` |
| 架构、测试、安全、图形与音视频 | `src/data/nodes-engineering.js` |
| AI、数据、数学与算法 | `src/data/nodes-data-ai.js` |
| 网络、运行时、基础设施、嵌入式、硬件 | `src/data/nodes-systems.js` |
| 知识点之间的关系 | `src/data/links.js` 或 `links-more.js` |
| 分层、方向、颜色 | `src/config.js` |
| 页面结构 / 样式 / 交互 | `index.html`、`src/*.js`、`src/styles.css` |

拿不准放哪时：先看目标节点所在的 `layer`，再按学科选文件；实在不确定就放进 `nodes.js`，review 时再挪。

数据是纯 JS 字面量，Git 里可 diff、可 review，不需要数据库。

## 加一个知识点

在 `src/data/nodes.js` 里按层找到合适的位置，加一条：

```js
{ id:'redis-sentinel', name:'哨兵模式', layer:'中间件', domain:'可用性',
  status:'待补充', tracks:['运维','数据'], before:['redis'],
  keywords:['sentinel','故障转移','主从切换'],
  children:[
    { name:'客观下线', desc:'多个哨兵投票判定主库不可用。' }
  ],
  description:'监控主从、自动故障转移，解决主库挂了要人工切的问题。' }
```

字段说明：

| 字段 | 必填 | 说明 |
|---|---|---|
| `id` | ✓ | 唯一，小写英文 + 连字符，连线用它引用 |
| `name` | ✓ | 显示名（中文优先） |
| `layer` | ✓ | 必须是 `config.js` 里 `LAYERS` 的一项（共 13 层） |
| `domain` | ✓ | 问题域：性能 / 可用性 / 安全 / 一致性 / 可观测性 / 交付运维 / 研发效率 / 网络通信 |
| `status` | ✓ | `已掌握` / `待补充` / `模糊`。这是作者的初始标注，读者可以在页面上用自己的进度覆盖它，所以按"这个知识点本身的难度/常见程度"标比按个人情况更合适 |
| `tracks` | ✓ | 学习方向，可多个，必须在 `TRACKS` 里 |
| `before` | ✓ | 学它之前要先懂的节点 id，没有就写 `[]` |
| `description` | ✓ | 一两句话：它是什么、为什么重要 |
| `keywords` | 否 | 搜索别名：俗称、英文、缩写 |
| `children` | 否 | 细分知识点 `[{name, desc}]`，把一个点拆成可学的小块 |

## 加一条关系

在 `src/data/links.js` 里：

```js
{ source:'redis', target:'redis-sentinel', relation:'由它实现故障转移' }
```

- `source` / `target` 必须是存在的 id
- `relation` 会显示在 3D 连线中间，请写成"动词 + 名词"的短句（6~12 字最好）
- **不要为了连而连**：一对节点之间只保留一条最有信息量的关系

## 拆解一个知识点

如果某个点太大（比如"Java 语言与并发"），给它加 `children`：

```js
children:[
  { name:'注解 Annotation', desc:'@Override、@Transactional 这类元数据，框架靠它做声明式编程。' }
]
```

搜索"注解"时就会定位到 Java，并在面板里高亮这一条——这是这个项目最重要的检索能力，欢迎继续补。

## 写一篇教程

详情页的"教程"来自 `src/data/articles.js`，按节点 id 组织：

```js
java: [
  { h: '是什么', p: '...' },
  { h: '核心概念', ul: ['...', '...'] },
  { h: '最小示例', code: `...`, lang: 'java' },
  { h: '常见坑', ul: ['...'] },
  { links: [{ t: 'Java 官方教程', u: 'https://...' }] }
],
```

一个块里可以同时有 `h` / `p` / `ul` / `code` / `tip` / `links`，会按顺序渲染。

写法建议：先说"是什么、为什么"，再列"核心概念"，给一个能跑的最小示例，最后写"常见坑"和官方链接。不用抄整篇文档，把关键点讲清、指个路就够了。

## 加一个方向 / 一层

- 方向：`src/config.js` 的 `TRACKS` 加一项（名字、颜色、一句话），再给相关节点补 `tracks`
- 分层：`LAYERS` 和 `LAYER_INFO` 各加一项，注意顺序就是 3D 里的上下顺序

## 提交前

```bash
node scripts/validate.mjs
```

它会检查：id 唯一、层/方向/状态合法、连线端点存在、没有重复边和自环、`before` 没有环、每个点至少 2 条边。

数据校验不过的 PR 不会合并。

## PR 里请写清楚

1. 加了什么 / 改了什么，为什么
2. 信息来源（官方文档、教材、RFC 链接都行）
3. 如果改了 `status`，说明依据

## 本地预览

```bash
node scripts/serve.mjs      # http://127.0.0.1:8791
# 或者
docker compose up --build   # http://127.0.0.1:8080
```

## 代码贡献

- 零构建、零依赖，浏览器直接跑；不要引入打包工具
- 新交互请保持"不打断阅读"：能淡出就不要删除，能提示就不要弹窗
- 中文文案按现有语气：说人话，不用营销词
