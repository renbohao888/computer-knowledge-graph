/* ============================================================
 * 学习路线（第二批）：算法 / 数据库 / 测试 / 移动端 / 图形 / 大模型应用 / 云原生
 * ============================================================ */
window.KB = window.KB || {};
KB.PATHS = KB.PATHS || [];

KB.PATHS.push(
  {
    id: 'algorithm',
    name: '算法与数据结构',
    level: '零基础 → 能通过大厂笔试与算法面试',
    desc: '先把数据结构用熟，再按题型练算法，最后补上计算理论与复杂度分析。刷题不是背题，是按模式归纳。',
    steps: [
      { phase: '一、数学与基础', node: 'discrete-math', title: '离散数学', note: '集合、逻辑、图论的基本语言。' },
      { phase: '一、数学与基础', node: 'data-structures', title: '数据结构', note: '数组、链表、栈队列、哈希、树、堆、并查集。' },
      { phase: '一、数学与基础', node: 'complexity', title: '算法复杂度', note: '会写之前先会估：时间与空间上界。' },
      { phase: '二、算法设计', node: 'algorithms', title: '算法设计', note: '排序、二分、双指针、回溯、动态规划、贪心。' },
      { phase: '二、算法设计', node: 'graph-algorithms', title: '图算法', note: 'BFS/DFS、最短路、拓扑排序、最小生成树。' },
      { phase: '二、算法设计', task: true, title: '刷题 150–200 道', note: '按题型刷：数组、字符串、链表、树、图、DP；每题写思路与复杂度。' },
      { phase: '三、理论加固', node: 'computability', title: '计算理论', note: '可计算性、P/NP；理解问题难度的边界。' },
      { phase: '三、理论加固', node: 'information-theory', title: '信息论', note: '熵与编码；理解压缩与损失函数有帮助。' }
    ]
  },
  {
    id: 'database',
    name: '数据库 / DBA',
    level: '零基础 → 能独立设计、优化与守护一套数据库',
    desc: '从 SQL 写到索引与事务，再到复制、分片和备份恢复。DBA 的核心是数据不能丢、查询不能慢。',
    steps: [
      { phase: '一、SQL', node: 'sql', title: 'SQL', note: '查询、聚合、JOIN、窗口函数。' },
      { phase: '一、SQL', node: 'data-modeling', title: '数据建模', note: '范式、维度建模与表结构设计。' },
      { phase: '二、MySQL', node: 'mysql', title: 'MySQL', note: '存储引擎、参数与日常运维。' },
      { phase: '二、MySQL', node: 'index', title: '索引与执行计划', note: 'B+ 树、最左前缀、explain。' },
      { phase: '二、MySQL', node: 'tx', title: '事务与隔离级别', note: 'MVCC、锁、死锁。' },
      { phase: '三、架构', node: 'repl', title: '主从复制', note: 'binlog、延迟与切换。' },
      { phase: '三、架构', node: 'shard', title: '分库分表', note: '分片键、扩容与跨分片查询。' },
      { phase: '三、架构', node: 'nosql', title: 'NoSQL 文档库', note: '什么时候不该用关系库。' },
      { phase: '三、架构', node: 'olap', title: '数据仓库与 OLAP', note: '分析型负载的引擎选型。' },
      { phase: '四、守护数据', node: 'backup', title: '备份与恢复', note: '备份策略与恢复演练。' },
      { phase: '四、守护数据', node: 'data-governance', title: '数据治理', note: '元数据、质量与权限。' },
      { phase: '四、守护数据', task: true, title: '做一次恢复演练', note: '从备份把库恢复到新实例，记录 RTO 与踩到的坑。' }
    ]
  },
  {
    id: 'testing',
    name: '测试开发',
    level: '零基础 → 能搭自动化测试体系',
    desc: '从写单测开始，到接口自动化、性能压测和 CI 卡点。测试开发的价值是让问题在合入前被发现。',
    steps: [
      { phase: '一、基础', node: 'unit-test', title: '单元测试', note: 'AAA、Mock、可测性。' },
      { phase: '一、基础', node: 'test-strategy', title: '测试体系', note: '分层策略与用例设计。' },
      { phase: '一、基础', node: 'api-test', title: '接口测试', note: '正常、异常、边界与鉴权。' },
      { phase: '二、进阶', node: 'perf-test', title: '性能压测', note: '指标、场景与瓶颈定位。' },
      { phase: '二、进阶', node: 'code-quality', title: '代码质量与重构', note: '静态检查与复杂度。' },
      { phase: '三、工程化', node: 'cicd', title: 'CI/CD 流水线', note: '测试卡点与制品。' },
      { phase: '三、工程化', node: 'monitor', title: '指标监控', note: '线上质量兜底。' },
      { phase: '三、工程化', node: 'incident', title: '故障响应与复盘', note: '缺陷逃逸后的闭环。' }
    ]
  },
  {
    id: 'mobile-dev',
    name: '移动端开发',
    level: '零基础 → 能独立上架一个 App',
    desc: '从 Web 基础到原生/跨端框架，再到性能、适配与发布。移动端最容易被低估的是兼容性和上架流程。',
    steps: [
      { phase: '一、基础', node: 'js-ts', title: 'JavaScript / TypeScript', note: '语法与类型；跨端框架的共同底座。' },
      { phase: '一、基础', node: 'html-css', title: 'HTML / CSS', note: '布局与响应式。' },
      { phase: '一、基础', node: 'http2-quic', title: 'HTTP 协议', note: '接口、缓存与弱网。' },
      { phase: '二、移动端', node: 'mobile', title: '移动端 / 小程序', note: '原生与跨端的能力边界。' },
      { phase: '二、移动端', node: 'cross-platform', title: '跨端开发', note: 'Flutter / RN / 小程序选型。' },
      { phase: '二、移动端', node: 'rest', title: 'REST 与 API 契约', note: '和服务端对齐接口。' },
      { phase: '三、系统能力', node: 'android', title: 'Android 系统', note: '或 iOS，按目标平台选一个深入。' },
      { phase: '三、系统能力', node: 'ios', title: 'iOS 系统', note: '沙箱、权限与上架审核。' },
      { phase: '四、交付', node: 'unit-test', title: '单元测试', note: '关键逻辑与组件测试。' },
      { phase: '四、交付', node: 'cicd', title: 'CI/CD 流水线', note: '自动打包与灰度发布。' }
    ]
  },
  {
    id: 'graphics-game',
    name: '图形与游戏开发',
    level: '有编程基础 → 能做 3D 渲染与交互项目',
    desc: '数学打底，理解渲染管线，再落到 WebGL 或引擎。图形学的门槛在数学与调试，不在于 API 数量。',
    steps: [
      { phase: '一、数学', node: 'linear-algebra', title: '线性代数', note: '向量、矩阵、变换。' },
      { phase: '一、数学', node: 'calculus', title: '微积分与梯度', note: '光照与数值方法。' },
      { phase: '二、渲染', node: 'graphics', title: '计算机图形学', note: '光栅化、着色器、纹理、光照。' },
      { phase: '二、渲染', node: 'gpu', title: 'GPU 与并行计算', note: '管线与并行执行。' },
      { phase: '三、工程', node: 'c-cpp', title: 'C / C++', note: '引擎与原生图形库的语言。' },
      { phase: '三、工程', node: 'video', title: '音视频与编解码', note: '游戏里也绕不开。' },
      { phase: '四、动手', task: true, title: '写一个可交互 3D 场景', note: '用 three.js 或 WebGL 实现旋转、拾取、光照与后处理。' }
    ]
  },
  {
    id: 'llm-app',
    name: '大模型应用开发',
    level: '会编程 → 能落地一个可用的 AI 应用',
    desc: '不训练基础模型，重点是把模型用对：提示、检索、工具、评测与部署。每个环节都要有可度量的结果。',
    steps: [
      { phase: '一、基础', node: 'python', title: 'Python 服务', note: '调用 SDK、处理数据、写 API。' },
      { phase: '一、基础', node: 'transformer', title: 'Transformer 与注意力', note: '理解上下文与 token。' },
      { phase: '一、基础', node: 'llm', title: '大语言模型', note: '能力边界、幻觉与提示工程。' },
      { phase: '二、增强', node: 'rag', title: 'RAG 与向量检索', note: '切分、检索、重排、引用。' },
      { phase: '二、增强', node: 'agent', title: 'Agent 与工具调用', note: '规划、工具与权限。' },
      { phase: '二、增强', node: 'finetune', title: '微调与对齐', note: 'LoRA 与偏好优化。' },
      { phase: '三、上线', node: 'inference', title: '推理与部署', note: '量化、批处理与推理引擎。' },
      { phase: '三、上线', node: 'ai-eval', title: '评测与 AI 安全', note: '基准、人工评估与红队。' },
      { phase: '四、动手', task: true, title: '做一个 RAG 问答机器人', note: '导入 50 篇文档，能引用原文回答，并有一套 20 题的评测集。' }
    ]
  },
  {
    id: 'cloud-native',
    name: '云原生平台',
    level: '有 Linux 基础 → 能搭一套 Kubernetes 平台',
    desc: '从 Linux 和网络走到容器、K8s、IaC 与可观测性。平台工程的目标是让业务团队自助上线且不炸。',
    steps: [
      { phase: '一、底座', node: 'linux', title: 'Linux 基础', note: '进程、网络、systemd。' },
      { phase: '一、底座', node: 'tcpip', title: 'TCP/IP 与 Socket', note: '端口、连接与排障。' },
      { phase: '一、底座', node: 'virtualization', title: '虚拟化', note: 'VM 与容器的边界。' },
      { phase: '二、容器', node: 'docker', title: '容器 Docker', note: '镜像、网络、卷。' },
      { phase: '二、容器', node: 'k8s', title: 'Kubernetes 编排', note: '对象、调度、网络与存储。' },
      { phase: '三、云上', node: 'cloud', title: '云服务器与 VPC', note: '网络规划与安全组。' },
      { phase: '三、云上', node: 'iac', title: 'IaC 自动化配置', note: 'Terraform / Ansible。' },
      { phase: '三、云上', node: 'cicd', title: 'CI/CD 流水线', note: '构建、发布与回滚。' },
      { phase: '四、可观测与稳态', node: 'monitor', title: '指标监控', note: '黄金指标与告警。' },
      { phase: '四、可观测与稳态', node: 'logging', title: '日志与链路追踪', note: '一次请求的全链路。' },
      { phase: '四、可观测与稳态', node: 'chaos', title: '混沌工程', note: '主动验证容错。' },
      { phase: '四、可观测与稳态', node: 'cost', title: '成本优化', note: '利用率与弹性。' }
    ]
  }
);
