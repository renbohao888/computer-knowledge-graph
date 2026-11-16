/* ============================================================
 * 教程正文：id → 文章块数组
 * ------------------------------------------------------------
 * 块类型（按顺序渲染）：
 *   { h: '小节标题' }
 *   { p: '一段话' }
 *   { ul: ['要点', '要点'] }
 *   { code: `多行代码`, lang: 'java' }
 *   { tip: '一句话提醒' }
 *   { links: [{ t: '显示名', u: 'https://...' }] }
 *
 * 想给某个知识点补教程：在这里加一个以节点 id 为键的数组。
 * 没写教程的节点，详情页会显示"这篇还在写"，不影响其它功能。
 * ============================================================ */
window.KB = window.KB || {};
KB.ARTICLES = {

  java: [
    { h: '是什么', p: '一门面向对象的静态类型语言，编译成字节码后跑在 JVM 上。"一次编写，到处运行"靠的不是语言本身，而是虚拟机这层抽象。' },
    { h: '为什么重要', p: '国内企业后端的主流选择：生态最完整、中间件客户端最全、招人最多。学会 Java 不只是语法，而是学会读框架源码。' },
    { h: '核心概念', ul: [
      '类与对象、接口与抽象类：用接口表达契约，用组合代替继承',
      '泛型：编译期类型检查，运行时被擦除——所以不能 new T()',
      '集合框架：List / Map / Set，先看底层结构再选',
      '注解与反射：框架"声明式编程"的底层机制',
      'JUC 并发包：线程池、锁、原子类、并发容器',
      'GC 与内存模型：对象在哪、什么时候被回收'
    ] },
    { h: '最小示例：注解 + 反射', code: `@Retention(RetentionPolicy.RUNTIME)
@interface Log { String value(); }

class OrderService {
  @Log("create")
  public void create() {}
}

Method m = OrderService.class.getMethod("create");
System.out.println(m.getAnnotation(Log.class).value()); // create`, lang: 'java' },
    { h: '常见坑', ul: [
      '字符串用 == 比较的是引用，不是内容',
      'SimpleDateFormat 不是线程安全的，改用 DateTimeFormatter',
      '在遍历集合时删除元素会抛 ConcurrentModificationException',
      '泛型擦除后，List<String> 和 List<Integer> 在运行时是同一个类型'
    ] },
    { links: [
      { t: 'Java 官方教程', u: 'https://docs.oracle.com/javase/tutorial/' },
      { t: '阿里巴巴 Java 开发手册', u: 'https://github.com/alibaba/p3c' }
    ] }
  ],

  spring: [
    { h: '是什么', p: 'Java 的企业级开发框架，核心是 IoC 容器和 AOP；Spring Boot 在它之上把配置和依赖"自动化"了。' },
    { h: '为什么重要', p: '它把对象的创建、依赖关系、事务、日志这些横切关注点从业务代码里拿走了，让业务代码只关心业务。' },
    { h: '核心概念', ul: [
      'IoC：对象由容器创建和注入，你只声明依赖',
      'Bean 生命周期：实例化 → 属性注入 → 初始化 → 使用 → 销毁',
      'AOP：把事务、日志、权限织入方法调用',
      '@Transactional：基于代理，同类内部调用会失效',
      '自动装配：starter + 条件注解，依赖即配置'
    ] },
    { h: '最小示例', code: `@RestController
@RequestMapping("/orders")
class OrderController {
  private final OrderService service;

  OrderController(OrderService service) { this.service = service; }

  @PostMapping
  public Order create(@RequestBody CreateOrder req) {
    return service.create(req);   // 事务在 service 层
  }
}`, lang: 'java' },
    { h: '常见坑', ul: [
      '@Transactional 加在 private 方法或同类自调用上不生效',
      '事务里做 HTTP 调用：长事务拖垮连接池',
      '循环依赖：A 依赖 B，B 依赖 A，启动直接失败',
      '把 @Configuration 的类当普通 new 用，代理和单例都会丢'
    ] },
    { links: [{ t: 'Spring Boot 文档', u: 'https://docs.spring.io/spring-boot/' }] }
  ],

  mysql: [
    { h: '是什么', p: '最常用的关系型数据库，默认引擎 InnoDB：支持事务、行锁、MVCC 和聚簇索引。' },
    { h: '为什么重要', p: '业务数据的主存储。SQL 写得对不对、索引建得合不合理，直接决定系统能撑多少人。' },
    { h: '核心概念', ul: [
      'B+ 树索引：叶子节点串成链表，范围查询快',
      '聚簇索引：主键索引的叶子就是整行数据',
      'MVCC：快照读不加锁，靠 undo log 版本链',
      '隔离级别：读已提交 vs 可重复读',
      '执行计划：type / key / rows / Extra',
      '主从复制：binlog 同步，读写分离会读到旧数据'
    ] },
    { h: '最小示例：看执行计划', code: `EXPLAIN SELECT id, name
FROM orders
WHERE user_id = 42 AND status = 1
ORDER BY created_at DESC
LIMIT 20;

-- 关注：
-- type = ref/range 好，ALL 是全表扫描
-- key  实际使用的索引
-- Extra Using filesort / Using temporary 要警惕`, lang: 'sql' },
    { h: '常见坑', ul: [
      '字段类型不匹配导致隐式转换，索引直接失效',
      '深分页 LIMIT 100000, 20 会扫掉前面十万行',
      '大事务长时间持锁，把连接池拖死',
      'SELECT * 带来的回表和网络开销'
    ] },
    { links: [{ t: 'MySQL 8.4 手册', u: 'https://dev.mysql.com/doc/refman/8.4/en/' }] }
  ],

  redis: [
    { h: '是什么', p: '内存键值数据库，支持字符串、哈希、列表、集合、有序集合等结构，常被用作缓存和轻量协调服务。' },
    { h: '为什么重要', p: '把热点数据挡在数据库前面，是大多数系统最便宜的性能优化。' },
    { h: '核心概念', ul: [
      '五种基本结构 + 位图 / HyperLogLog / Stream',
      'RDB 快照与 AOF 日志：持久化的两种取舍',
      '过期与淘汰：TTL、惰性删除、LRU/LFU',
      '主从 + 哨兵：故障转移',
      'Cluster：16384 个槽位分片'
    ] },
    { h: '常用命令', code: `SET user:42:name "Ada" EX 3600
INCR article:9:views
ZADD rank 100 "alice"
SET lock:order:1 "uuid" NX PX 30000`, lang: 'bash' },
    { h: '常见坑', ul: [
      '大 key / 热 key：一个 key 几 MB，单线程直接卡住',
      '缓存穿透 / 击穿 / 雪崩：空值缓存、互斥重建、过期打散',
      '分布式锁过期后误删别人的锁：要校验 value',
      '生产环境用 KEYS * 或 FLUSHALL'
    ] },
    { links: [{ t: 'Redis 文档', u: 'https://redis.io/docs/latest/' }] }
  ],

  'http-cache': [
    { h: '是什么', p: '浏览器和 CDN 按 HTTP 头缓存响应的机制，决定一个请求是否真的到达服务器。' },
    { h: '为什么重要', p: '少一次请求就少一次延迟、少一份带宽、少一点后端压力。静态资源优化的第一站。' },
    { h: '两种缓存', ul: [
      '强缓存：Cache-Control / Expires 未过期，不发请求',
      '协商缓存：带上 If-None-Match / If-Modified-Since 问一下，命中返回 304',
      'HTML 用 no-cache，带 hash 的 JS/CSS 用长缓存'
    ] },
    { h: '示例', code: `Cache-Control: public, max-age=31536000, immutable
ETag: "abc123"

# 下次请求
If-None-Match: "abc123"
→ 304 Not Modified（没有响应体）`, lang: 'http' },
    { h: '常见坑', ul: [
      'index.html 被长缓存，发版后用户还在用旧页面',
      'CDN 缓存了带 Set-Cookie 的响应',
      '忘了 Vary: Accept-Encoding，压缩与未压缩版本串了'
    ] },
    { links: [{ t: 'MDN：HTTP 缓存', u: 'https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching' }] }
  ],

  tcpip: [
    { h: '是什么', p: '互联网的传输层协议族：IP 负责寻址，TCP 负责可靠有序的字节流，UDP 负责快但不保证。' },
    { h: '为什么重要', p: '排查网络问题的通用语言：超时、重置、丢包、TIME_WAIT 都能落到这几个状态上。' },
    { h: '核心概念', ul: [
      '三次握手：SYN → SYN-ACK → ACK，两次不够是因为要确认双向可达',
      '四次挥手：TIME_WAIT 等 2MSL，保证最后的 ACK 能被处理',
      '拥塞控制：慢启动、拥塞避免、快速重传',
      'TCP 是字节流，没有消息边界，所以要自己定协议'
    ] },
    { h: '排查命令', code: `ss -tlnp                 # 谁在监听
ss -tan state time-wait | wc -l
tcpdump -i any -nn port 8080 -w /tmp/a.pcap`, lang: 'bash' },
    { h: '常见坑', ul: [
      '短连接太多导致 TIME_WAIT 堆积、端口耗尽',
      '以为 TCP 会帮你分包，结果粘包',
      '没开 keepalive，中间设备悄悄断开连接'
    ] },
    { links: [{ t: 'RFC 9293（TCP）', u: 'https://datatracker.ietf.org/doc/html/rfc9293' }] }
  ],

  tls: [
    { h: '是什么', p: '在不可信网络上建立加密通道并验证对方身份：TLS 1.3 一次往返就能完成握手。' },
    { h: '为什么重要', p: 'HTTPS 的底座。没有它，密码和 token 在公网上就是明文。' },
    { h: '核心概念', ul: [
      '握手：协商套件、交换密钥、验证证书',
      '证书链：服务器证书 → 中间 CA → 根 CA',
      'SNI：一个 IP 多个域名时，客户端告诉服务器访问哪个站点',
      '会话复用：Session Ticket 减少握手开销',
      'mTLS：双向验证，服务间互信的常见做法'
    ] },
    { h: '检查一张证书', code: `openssl s_client -connect example.com:443 \\
  -servername example.com </dev/null 2>/dev/null \\
  | openssl x509 -noout -dates -subject -issuer`, lang: 'bash' },
    { h: '常见坑', ul: [
      '证书过期没人发现：加到期监控',
      '证书链不全，浏览器能开、某些客户端报错',
      '老客户端不支持 SNI，拿到默认证书'
    ] },
    { links: [{ t: 'RFC 8446（TLS 1.3）', u: 'https://datatracker.ietf.org/doc/html/rfc8446' }] }
  ],

  docker: [
    { h: '是什么', p: '把应用和依赖打成镜像，用 namespace 和 cgroups 做隔离的容器运行时。' },
    { h: '为什么重要', p: '"在我机器上是好的"终结者：构建一次，到处以同样方式运行。' },
    { h: '核心概念', ul: [
      '镜像分层：每条指令一层，层可复用、可缓存',
      'Dockerfile：多阶段构建能把编译环境和运行环境分开',
      '网络：bridge / host / 自定义网络',
      '数据卷：容器可丢，数据不能丢'
    ] },
    { h: '多阶段构建示例', code: `FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html`, lang: 'dockerfile' },
    { h: '常见坑', ul: [
      '用 latest 标签，回滚时不知道退回哪个版本',
      '容器里写业务数据，重建即丢',
      'COPY . . 放在最前面，改一行代码就重装依赖',
      '镜像里带上了 .git 和密钥'
    ] },
    { links: [{ t: 'Docker 文档', u: 'https://docs.docker.com/' }] }
  ],

  k8s: [
    { h: '是什么', p: '容器编排系统：你声明"我要 3 个副本、跑这个镜像"，它负责调度、重启、滚动更新和扩缩容。' },
    { h: '为什么重要', p: '从"一台台机器"变成"一个集群"的分水岭。' },
    { h: '核心概念', ul: [
      'Pod：最小调度单元，一个或多个容器',
      'Deployment：副本数与滚动更新策略',
      'Service：稳定入口，ClusterIP / NodePort / LoadBalancer',
      'Ingress：七层路由与证书',
      '探针：liveness 重启，readiness 摘流量',
      'HPA：按指标扩缩容'
    ] },
    { h: '最小 Deployment', code: `apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
        - name: api
          image: registry.example.com/api:1.4.2
          readinessProbe:
            httpGet: { path: /healthz, port: 8080 }`, lang: 'yaml' },
    { h: '常见坑', ul: [
      '只有 liveness 没有 readiness：启动未完成就被打流量',
      '不设 requests/limits：调度不准、OOM 被驱逐',
      '用 latest 镜像 + imagePullPolicy 默认，更新不生效'
    ] },
    { links: [{ t: 'Kubernetes 文档', u: 'https://kubernetes.io/zh-cn/docs/' }] }
  ],

  git: [
    { h: '是什么', p: '分布式版本控制系统：每次提交都是完整快照，分支只是指向提交的指针。' },
    { h: '为什么重要', p: '协作和变更历史的底座。会用 rebase 和 cherry-pick，历史才干净可回溯。' },
    { h: '核心概念', ul: [
      '工作区 → 暂存区 → 本地仓库 → 远程',
      '分支是指针，创建和切换几乎零成本',
      'merge 保留分叉，rebase 把提交"搬"到新基底',
      'cherry-pick 把单个提交摘到另一条分支'
    ] },
    { h: '常用流程', code: `git switch -c feat/login
git fetch origin
git rebase origin/main
git push --force-with-lease   # 只对自己的分支用`, lang: 'bash' },
    { h: '常见坑', ul: [
      '对共享分支 rebase 或 force push',
      '提交了密钥 / 大文件，之后每个克隆都带着它',
      '冲突时无脑选 ours/theirs，把别人的改动删了'
    ] },
    { links: [{ t: 'Pro Git（中文）', u: 'https://git-scm.com/book/zh/v2' }] }
  ],

  cicd: [
    { h: '是什么', p: '从提交代码到部署上线的一整条自动化流水线：构建、测试、打包镜像、发布、回滚。' },
    { h: '为什么重要', p: '把"发布"从高风险手工操作变成可重复的日常动作，缩短反馈时间。' },
    { h: '核心概念', ul: [
      '流水线即代码：配置和业务代码一起版本化',
      '分阶段：构建 → 测试 → 镜像 → 部署，失败即停',
      '制品：每次构建产出唯一版本号，可追溯',
      '灰度与回滚：先小流量，出问题一键退回'
    ] },
    { h: '最小流水线', code: `stages: [build, test, image, deploy]

build:
  script: ./mvnw -q -DskipTests package

test:
  script: ./mvnw -q test

image:
  script: docker build -t registry/app:$CI_COMMIT_SHA .`, lang: 'yaml' },
    { h: '常见坑', ul: [
      '流水线要 40 分钟，没人愿意等',
      '测试不稳定，红了先重跑——最后没人看结果',
      '生产靠手改配置，和仓库里的不一致'
    ] },
    { links: [{ t: 'GitLab CI/CD', u: 'https://docs.gitlab.com/ci/' }] }
  ],

  rest: [
    { h: '是什么', p: '一种接口风格：用 URL 表达资源，用 HTTP 方法表达动作，用状态码表达结果。' },
    { h: '为什么重要', p: '前后端、服务之间的契约。设计得好，接口自解释；设计得差，每个调用方都要读文档。' },
    { h: '核心概念', ul: [
      '资源建模：名词复数，/orders/42/items',
      '方法语义：GET 查、POST 建、PUT 全量改、PATCH 局部改、DELETE 删',
      '状态码：201 创建、204 无内容、400 参数错、401 未认证、403 无权限、404 不存在、409 冲突、422 语义错',
      '幂等：GET/PUT/DELETE 天然幂等，POST 用 Idempotency-Key'
    ] },
    { h: '示例', code: `GET    /orders?status=paid&cursor=abc123
POST   /orders
Idempotency-Key: 8f2c...

PATCH  /orders/42
{"status": "shipped"}`, lang: 'http' },
    { h: '常见坑', ul: [
      '用 GET 做删除 / 下单',
      '所有响应都返回 200，错误藏在 body 里',
      'offset 分页深翻页越来越慢'
    ] },
    { links: [{ t: 'Fielding 博士论文（REST）', u: 'https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm' }] }
  ],

  authn: [
    { h: '是什么', p: '认证 = 证明"你是谁"。常见方式有密码、短信、OAuth2 第三方登录、JWT 令牌。' },
    { h: '为什么重要', p: '一切权限的前提；认证做错，后面所有安全设计都白搭。' },
    { h: '核心概念', ul: [
      '密码存储：加盐 + 慢哈希（bcrypt / argon2），不要 MD5',
      '会话：服务端 Session 可主动失效；JWT 无状态但难撤销',
      'JWT 结构：header.payload.signature，payload 只是 Base64，不是加密',
      'OAuth2 授权码模式 + PKCE：第三方登录的标准姿势',
      'OIDC：在 OAuth2 上补一层身份信息'
    ] },
    { h: 'JWT 长什么样', code: `header.payload.signature
{"alg":"RS256","typ":"JWT"}
.{"sub":"42","exp":1730000000,"role":"admin"}
.<签名>`, lang: 'json' },
    { h: '常见坑', ul: [
      '把 JWT 当加密数据，往里塞手机号',
      '过期时间设成 30 天且不能撤销',
      'token 放 localStorage，被 XSS 直接读走',
      'OAuth2 授权码模式漏了 state / PKCE'
    ] },
    { links: [{ t: 'OAuth 2.0', u: 'https://oauth.net/2/' }] }
  ],

  llm: [
    { h: '是什么', p: '在海量文本上预训练、再用指令数据和人类偏好对齐的大语言模型。它本质是"下一个 token 的概率分布"。' },
    { h: '为什么重要', p: '通用语言能力可以零样本完成很多任务，但它是"生成器"不是"数据库"。' },
    { h: '核心概念', ul: [
      'token：模型处理的最小单位，中文通常 1 字≈1~2 token',
      '上下文窗口：一次能看多少 token，直接决定成本',
      '预训练 → SFT → RLHF/DPO：三个阶段解决不同问题',
      '幻觉：不知道时会编，需要外部事实约束（RAG）',
      '量化与蒸馏：用精度换成本和延迟'
    ] },
    { h: '最小调用', code: `resp = client.messages.create(
    model="claude-sonnet-5-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "用三句话解释 B+ 树"}],
)
print(resp.content[0].text)`, lang: 'python' },
    { h: '常见坑', ul: [
      '把模型当数据库查事实',
      '上下文塞满历史，成本失控',
      '没有评测集就上线，改一版 prompt 全靠感觉'
    ] },
    { links: [{ t: 'Anthropic 文档', u: 'https://docs.anthropic.com/zh-CN/docs/' }] }
  ],

  transformer: [
    { h: '是什么', p: '以自注意力为核心的神经网络结构，取代了 RNN 的循环，让训练可以并行、长依赖更好建模。' },
    { h: '为什么重要', p: 'GPT、BERT、几乎今天所有大模型的骨架。' },
    { h: '核心概念', ul: [
      'Q / K / V：每个位置向所有位置"提问、匹配、取值"',
      '多头注意力：不同子空间关注不同关系',
      '位置编码：注意力本身不知道顺序，要额外注入',
      '残差 + LayerNorm：让深层网络能训得动',
      'KV Cache：推理时缓存历史，省算力但吃显存'
    ] },
    { h: '核心公式', code: `Attention(Q, K, V) = softmax(Q·Kᵀ / √d_k) · V`, lang: 'text' },
    { h: '常见坑', ul: [
      '复杂度是 O(n²)，长上下文成本爆炸',
      '位置编码外推到训练长度之外会掉点',
      '推理时 KV Cache 的显存随上下文线性增长'
    ] },
    { links: [{ t: 'Attention Is All You Need', u: 'https://arxiv.org/abs/1706.03762' }] }
  ],

  rag: [
    { h: '是什么', p: '检索增强生成：先从知识库里查出相关片段，再把片段和问题一起交给模型回答。' },
    { h: '为什么重要', p: '让模型回答私有、最新、可溯源的知识，而不是靠记忆瞎编。' },
    { h: '核心概念', ul: [
      '切分：块大小、重叠、按语义边界切',
      'Embedding：把文本映射到向量空间',
      '向量检索：ANN 索引，召回 top-k',
      '混合检索：关键词（BM25）+ 向量互补',
      '重排与引用：rerank，答案带出处'
    ] },
    { h: '最小流程', code: `chunks = split(docs, size=500, overlap=80)
vecs   = embed(chunks)
hits   = vector_db.search(embed(query), top_k=8)
answer = llm(prompt=build(query, hits))`, lang: 'python' },
    { h: '常见坑', ul: [
      '切分把一句话/一个表格切断了',
      '只做向量检索，专有名词召回很差',
      '没有评测集，改切分参数全凭感觉'
    ] },
    { links: [{ t: 'RAG 原论文', u: 'https://arxiv.org/abs/2005.11401' }] }
  ],

  agent: [
    { h: '是什么', p: '让模型在"思考 → 调工具 → 看结果"的循环里完成任务，而不是只输出一段文本。' },
    { h: '为什么重要', p: '把语言能力接到真实世界上：查库、调接口、跑代码、发消息。' },
    { h: '核心概念', ul: [
      '工具定义：名字、参数 schema、说明',
      'function calling：模型输出结构化参数，由程序执行',
      'ReAct：思考、行动、观察的循环',
      '记忆：短期上下文 + 长期存储',
      '权限与沙箱：高危操作要人工确认',
      'MCP：把工具和上下文标准化接入'
    ] },
    { h: '一次工具调用', code: `{"tool": "search", "input": {"query": "2026 年 CPU 制程"}}
→ 程序执行后返回结果
→ 模型基于结果继续推理或调用下一个工具`, lang: 'json' },
    { h: '常见坑', ul: [
      '没有步数上限，陷入死循环',
      '工具权限过大，模型能删库',
      '没有日志，出问题无法复现'
    ] },
    { links: [{ t: 'Model Context Protocol', u: 'https://modelcontextprotocol.io/' }] }
  ],

  cpu: [
    { h: '是什么', p: '执行指令的处理器：取指、译码、执行、写回，多个阶段流水线并行。' },
    { h: '为什么重要', p: '性能的物理边界。缓存命中、分支预测、指令并行决定了代码能跑多快。' },
    { h: '核心概念', ul: [
      '流水线：不同指令的不同阶段同时进行',
      '乱序执行：在依赖允许的范围内重排指令',
      '分支预测：预测错要冲刷流水线，代价很大',
      '缓存层级 L1/L2/L3：容量越大越慢',
      '多核与超线程：物理核 vs 逻辑核'
    ] },
    { h: '缓存友好的写法', code: `// 按行连续访问，命中率高
for (int i = 0; i < N; i++)
  for (int j = 0; j < N; j++)
    sum += a[i][j];

// 按列访问，跨步大，缓存不友好
for (int j = 0; j < N; j++)
  for (int i = 0; i < N; i++)
    sum += a[i][j];`, lang: 'c' },
    { h: '常见坑', ul: [
      '以为多线程一定更快，忽视了缓存伪共享',
      '热点数据跨 NUMA 节点访问',
      '用浮点做大量分支判断，分支预测失败率高'
    ] },
    { links: [{ t: 'Agner Fog 优化手册', u: 'https://www.agner.org/optimize/' }] }
  ],

  mcu: [
    { h: '是什么', p: '把处理器核、Flash、RAM 和外设集成到一颗芯片上，通常跑裸机程序或 RTOS。' },
    { h: '为什么重要', p: '成本低、实时、低功耗，是所有电器、汽车、工业设备的控制核心。' },
    { h: '核心概念', ul: [
      'GPIO：引脚电平与复用功能',
      '中断：中断向量表、优先级、上半部/下半部',
      '定时器与 PWM：定时、计数、调光调速',
      'ADC：把模拟量变成数字',
      '时钟与低功耗：睡眠模式与唤醒源'
    ] },
    { h: '点灯（STM32 HAL）', code: `while (1) {
  HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_SET);
  HAL_Delay(500);
  HAL_GPIO_WritePin(LED_GPIO_Port, LED_Pin, GPIO_PIN_RESET);
  HAL_Delay(500);
}`, lang: 'c' },
    { h: '常见坑', ul: [
      '在中断里做耗时操作或调用阻塞函数',
      '引脚浮空没加上下拉，读数乱跳',
      '电源去耦没做好，ADC 采样全是噪声'
    ] },
    { links: [{ t: 'STM32 文档', u: 'https://www.st.com/en/microcontrollers-microprocessors/stm32-32-bit-arm-cortex-mcus.html' }] }
  ],

  sbc: [
    { h: '是什么', p: '单板计算机：一块信用卡大小的板子，跑完整 Linux，带 GPIO、USB、HDMI 和网络。' },
    { h: '为什么重要', p: '把软件能力带到硬件现场；Jetson 这类板子还带 GPU/NPU，是边缘 AI 的常见载体。' },
    { h: '核心概念', ul: [
      '烧录系统镜像到 SD 卡，首次启动配置',
      'SSH 远程登录，headless 使用',
      'GPIO 40Pin：3.3V 电平，注意不要接 5V 设备',
      'CSI 摄像头 / DSI 显示',
      '供电：电压不足会随机重启'
    ] },
    { h: '点灯（树莓派 Python）', code: `import RPi.GPIO as GPIO, time

GPIO.setmode(GPIO.BCM)
GPIO.setup(17, GPIO.OUT)
GPIO.output(17, True);  time.sleep(1)
GPIO.output(17, False)
GPIO.cleanup()`, lang: 'python' },
    { h: '常见坑', ul: [
      '用手机充电器供电，负载一高就重启',
      '直接拔电导致 SD 卡文件系统损坏',
      '把 5V 设备接到 GPIO 上烧板子'
    ] },
    { links: [{ t: 'Raspberry Pi 文档', u: 'https://www.raspberrypi.com/documentation/' }] }
  ],

  'data-cleaning': [
    { h: '是什么', p: '处理缺失值、重复记录、异常值和格式不一致，把原始数据变成能分析的数据。' },
    { h: '为什么重要', p: '垃圾进垃圾出：清洗没做好，后面的统计和模型全是错的。' },
    { h: '核心步骤', ul: [
      '缺失值：删除、填充（均值/中位数/模型）、标记缺失',
      '去重：确定业务主键，避免误删',
      '异常值：分布、规则、人工复核',
      '标准化：单位、时区、编码、枚举值',
      '校验规则：空值率、范围、唯一性、跨表一致'
    ] },
    { h: 'pandas 示例', code: `df = df.drop_duplicates(subset=["order_id"])
df["amount"] = df["amount"].fillna(0).clip(lower=0)
df["city"] = df["city"].str.strip().str.upper()
df["created_at"] = pd.to_datetime(df["created_at"], utc=True)`, lang: 'python' },
    { h: '常见坑', ul: [
      '用均值填充严重偏态的数据',
      '去重时选错主键，把正常订单删了',
      '时区不统一，跨天统计全错'
    ] },
    { links: [{ t: 'pandas 文档', u: 'https://pandas.pydata.org/docs/' }] }
  ],

  algorithms: [
    { h: '是什么', p: '把问题拆成可执行的步骤，并保证在可接受的时间/空间内得到结果。' },
    { h: '为什么重要', p: '数据量一大，O(n²) 和 O(n log n) 就是能不能上线的区别。' },
    { h: '核心套路', ul: [
      '分治：拆成同类子问题，再合并',
      '动态规划：状态 + 转移方程 + 边界',
      '贪心：证明局部最优能推出全局最优',
      '回溯：枚举 + 剪枝',
      '复杂度：先看输入规模，再选算法'
    ] },
    { h: '0/1 背包', code: `def knapsack(weights, values, cap):
    dp = [0] * (cap + 1)
    for w, v in zip(weights, values):
        for c in range(cap, w - 1, -1):
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[cap]`, lang: 'python' },
    { h: '常见坑', ul: [
      'DP 状态定义错，转移写得对也没用',
      '边界条件漏掉（空数组、单元素）',
      '递归没记忆化，指数级爆炸'
    ] },
    { links: [{ t: 'CP-Algorithms', u: 'https://cp-algorithms.com/' }] }
  ],

  'data-structures': [
    { h: '是什么', p: '数据的组织方式：数组、链表、哈希表、树、堆、图，决定了每种操作的复杂度。' },
    { h: '为什么重要', p: '选错结构，代码怎么写都快不了；选对了，很多优化根本不需要。' },
    { h: '怎么选', ul: [
      '随机访问多 → 数组',
      '频繁插入删除 → 链表',
      '按 key 查找 → 哈希表',
      '有序 + 范围查询 → 平衡树 / B+ 树',
      '取最值 → 堆',
      '关系与路径 → 图'
    ] },
    { h: '哈希表的最小实现', code: `class HashMap:
    def __init__(self, n=16):
        self.b = [[] for _ in range(n)]

    def put(self, k, v):
        i = hash(k) % len(self.b)
        for kv in self.b[i]:
            if kv[0] == k:
                kv[1] = v
                return
        self.b[i].append([k, v])`, lang: 'python' },
    { h: '常见坑', ul: [
      '哈希冲突严重时退化成链表',
      '树结构插入有序数据后退化成链',
      '忽视缓存局部性，链表遍历比数组慢很多'
    ] },
    { links: [{ t: 'Open Data Structures', u: 'https://opendatastructures.org/' }] }
  ],

  'web-security': [
    { h: '是什么', p: 'Web 应用的攻击面与防护：注入、XSS、CSRF、SSRF、越权、文件上传。' },
    { h: '为什么重要', p: '一次 SQL 注入就能带走整个数据库；越权只需要改一个 id。' },
    { h: '核心防线', ul: [
      '所有输入都不可信：参数化查询、白名单校验',
      '输出编码：HTML/JS/URL 上下文不同，编码方式不同',
      'CSRF：SameSite Cookie + Token',
      'SSRF：限制出站地址，禁止访问内网',
      '越权：每个请求都校验"这个人能不能操作这个资源"'
    ] },
    { h: 'SQL 注入：错误与正确', code: `# 危险：字符串拼接
cur.execute(f"select * from users where name='{name}'")

# 正确：参数化
cur.execute("select * from users where name=%s", (name,))`, lang: 'python' },
    { h: '常见坑', ul: [
      '只在前端做权限校验',
      '只在输入过滤，不在输出编码',
      '把内网地址当白名单外的"可信"'
    ] },
    { links: [{ t: 'OWASP Top 10', u: 'https://owasp.org/www-project-top-ten/' }] }
  ]

};
