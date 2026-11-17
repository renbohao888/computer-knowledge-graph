/* ============================================================
 * 节点内部详细拆解：语言 / 架构 / 测试 / 协作
 * ============================================================ */
window.KB = window.KB || {};
KB.DETAILS = KB.DETAILS || {};

KB.DETAILS.mobile = { groups: [
  { name: '平台与框架', items: [
    { name: '原生开发', desc: 'Swift/Kotlin 与系统能力。' },
    { name: '跨端框架', desc: 'Flutter、React Native。' },
    { name: '小程序', desc: '微信/支付宝生态与限制。' }
  ] },
  { name: '工程', items: [
    { name: '网络与缓存', desc: '接口层与离线缓存。' },
    { name: '性能', desc: '启动、帧率、内存。' },
    { name: '适配', desc: '机型、刘海屏、深色模式。' }
  ] },
  { name: '发布', items: [
    { name: '签名与打包', desc: '证书与渠道包。' },
    { name: '热更新', desc: '合规与灰度。' }
  ] }
] };

KB.DETAILS.websocket = { groups: [
  { name: '协议', items: [
    { name: '握手', desc: 'HTTP Upgrade 升级。' },
    { name: '帧格式', desc: '文本/二进制、掩码。' },
    { name: '心跳与断线重连', desc: 'ping/pong 与指数退避。' }
  ] },
  { name: '应用', items: [
    { name: '实时消息', desc: '聊天、通知、协同。' },
    { name: '推送与订阅', desc: '频道与鉴权。' },
    { name: '水平扩展', desc: '连接网关与消息广播。' }
  ] },
  { name: '运维', items: [
    { name: '连接数', desc: '文件句柄与内存。' },
    { name: '代理配置', desc: 'Nginx Upgrade 头。' }
  ] }
] };

KB.DETAILS.orm = { groups: [
  { name: '映射', items: [
    { name: '实体与表', desc: '字段映射与命名策略。' },
    { name: '关系映射', desc: '一对一/一对多/多对多。' },
    { name: '懒加载与 N+1', desc: '什么时候触发查询。' }
  ] },
  { name: '性能', items: [
    { name: '批量操作', desc: 'batch insert 与 foreach。' },
    { name: 'SQL 日志', desc: '看清实际执行的语句。' },
    { name: '连接池', desc: '与 ORM 会话的关系。' }
  ] },
  { name: '事务', items: [
    { name: '声明式事务', desc: '边界与传播。' },
    { name: '缓存', desc: '一级/二级缓存与脏读。' }
  ] }
] };

KB.DETAILS.async = { groups: [
  { name: '线程池', items: [
    { name: '核心参数', desc: '核心数、队列、最大数、拒绝策略。' },
    { name: '线程池隔离', desc: '不同业务分开，避免互相拖垮。' },
    { name: '监控', desc: '活跃线程与队列长度。' }
  ] },
  { name: '异步模型', items: [
    { name: 'Future/CompletableFuture', desc: '组合与异常处理。' },
    { name: '响应式', desc: '背压与事件循环。' },
    { name: '协程', desc: '轻量级线程。' }
  ] },
  { name: '常见坑', items: [
    { name: '线程池打满', desc: '阻塞任务占满线程。' },
    { name: '上下文丢失', desc: 'ThreadLocal 与 MDC。' }
  ] }
] };

KB.DETAILS.microservice = { groups: [
  { name: '拆分', items: [
    { name: '按业务边界', desc: 'DDD 限界上下文。' },
    { name: '粒度取舍', desc: '拆太细的运维成本。' },
    { name: '数据归属', desc: '一个服务一个库。' }
  ] },
  { name: '通信', items: [
    { name: '同步调用', desc: 'REST/RPC 与超时。' },
    { name: '异步消息', desc: '解耦与最终一致。' },
    { name: '服务发现', desc: '注册中心与负载均衡。' }
  ] },
  { name: '治理', items: [
    { name: '熔断限流', desc: '防止雪崩。' },
    { name: '链路追踪', desc: '跨服务排障。' },
    { name: '配置与灰度', desc: '动态配置与流量切分。' }
  ] }
] };

KB.DETAILS.appcache = { groups: [
  { name: '本地缓存', items: [
    { name: 'Caffeine/Guava', desc: '进程内缓存与淘汰。' },
    { name: '命中率', desc: '容量与过期策略。' },
    { name: '一致性', desc: '更新时主动失效。' }
  ] },
  { name: '分布式缓存', items: [
    { name: 'Redis/Memcached', desc: '共享缓存层。' },
    { name: '缓存键设计', desc: '维度与版本。' },
    { name: '热 key', desc: '本地二级缓存。' }
  ] },
  { name: '模式', items: [
    { name: 'Cache Aside', desc: '读缓存、写库后删缓存。' },
    { name: 'Write Through/Behind', desc: '写路径的取舍。' }
  ] }
] };

KB.DETAILS['unit-test'] = { groups: [
  { name: '写法', items: [
    { name: 'AAA 结构', desc: '准备、执行、断言。' },
    { name: '一个测试一个行为', desc: '失败时能定位。' },
    { name: '命名', desc: '描述场景与期望。' }
  ] },
  { name: '依赖处理', items: [
    { name: 'Mock 与 Stub', desc: '隔离外部依赖。' },
    { name: '测试数据库', desc: '内存库或容器。' },
    { name: '时间与随机', desc: '可注入的时钟。' }
  ] },
  { name: '质量', items: [
    { name: '覆盖率', desc: '分支覆盖比行覆盖有意义。' },
    { name: '可测性', desc: '依赖注入与纯函数。' },
    { name: '测试速度', desc: '快才能常跑。' }
  ] }
] };

KB.DETAILS['api-test'] = { groups: [
  { name: '内容', items: [
    { name: '正常与异常', desc: '参数校验、错误码。' },
    { name: '边界值', desc: '空、超长、特殊字符。' },
    { name: '鉴权', desc: '未登录与越权。' }
  ] },
  { name: '自动化', items: [
    { name: '工具', desc: 'Postman、pytest、RestAssured。' },
    { name: '数据准备', desc: '夹具与清理。' },
    { name: 'CI 集成', desc: '每次提交跑一遍。' }
  ] },
  { name: 'Mock 与契约', items: [
    { name: '服务 Mock', desc: '依赖未就绪时联调。' },
    { name: '契约测试', desc: '消费者驱动的接口约定。' }
  ] }
] };

KB.DETAILS['perf-test'] = { groups: [
  { name: '指标', items: [
    { name: '吞吐与延迟', desc: 'QPS、P50/P95/P99。' },
    { name: '错误率', desc: '超时与失败。' },
    { name: '资源水位', desc: 'CPU、内存、连接数。' }
  ] },
  { name: '工具', items: [
    { name: 'JMeter/Locust', desc: '场景编排。' },
    { name: 'wrk/ab', desc: '快速压接口。' },
    { name: '监控联动', desc: '压测时看服务端指标。' }
  ] },
  { name: '设计', items: [
    { name: '基准与峰值', desc: '先测基线再逐步加压。' },
    { name: '瓶颈定位', desc: 'CPU、锁、数据库、网络。' }
  ] }
] };

KB.DETAILS.lock = { groups: [
  { name: '实现', items: [
    { name: 'Redis 锁', desc: 'SET NX PX 与唯一值。' },
    { name: 'ZooKeeper 锁', desc: '临时顺序节点。' },
    { name: '数据库锁', desc: '行锁与唯一索引。' }
  ] },
  { name: '正确性', items: [
    { name: '误删保护', desc: '校验持有者再删。' },
    { name: '续期', desc: '看门狗机制。' },
    { name: '可重入', desc: '同线程重复获取。' }
  ] },
  { name: '坑', items: [
    { name: '锁超时', desc: '业务没跑完锁先过期。' },
    { name: '主从切换', desc: '锁丢失与 Redlock 争议。' }
  ] }
] };

KB.DETAILS.scheduler = { groups: [
  { name: '模型', items: [
    { name: 'cron 表达式', desc: '分时日月周。' },
    { name: '固定频率与固定延迟', desc: '任务耗时的差别。' },
    { name: '线程池', desc: '并发执行与阻塞。' }
  ] },
  { name: '分布式调度', items: [
    { name: '选主', desc: '只有一个实例执行。' },
    { name: '分片执行', desc: '按任务分片并行。' },
    { name: '调度中心', desc: 'XXL-JOB、ElasticJob。' }
  ] },
  { name: '可靠性', items: [
    { name: '幂等', desc: '重复触发不重复处理。' },
    { name: '失败重试与告警', desc: '补偿与人工介入。' }
  ] }
] };

KB.DETAILS.es = { groups: [
  { name: '原理', items: [
    { name: '倒排索引', desc: '词项到文档。' },
    { name: '分片与副本', desc: '水平扩展与高可用。' },
    { name: '近实时', desc: 'refresh 与 segment。' }
  ] },
  { name: '查询', items: [
    { name: 'match 与 term', desc: '分词查询与精确值。' },
    { name: '聚合', desc: 'terms、date_histogram。' },
    { name: '相关性', desc: 'BM25 与 boost。' }
  ] },
  { name: '运维', items: [
    { name: '映射设计', desc: '字段类型与分词器。' },
    { name: '容量规划', desc: '分片数量与堆内存。' }
  ] }
] };

KB.DETAILS.rpc = { groups: [
  { name: '协议', items: [
    { name: 'gRPC', desc: 'HTTP/2 + Protobuf。' },
    { name: 'Dubbo', desc: 'Java 生态的 RPC。' },
    { name: '序列化', desc: 'Protobuf、Thrift、JSON。' }
  ] },
  { name: '治理', items: [
    { name: '超时与重试', desc: '幂等前提下重试。' },
    { name: '负载均衡', desc: '客户端侧选择。' },
    { name: '链路追踪', desc: '跨进程上下文。' }
  ] },
  { name: '问题', items: [
    { name: '连接数', desc: '长连接与多路复用。' },
    { name: '版本兼容', desc: '字段增删的兼容规则。' }
  ] }
] };

KB.DETAILS.repl = { groups: [
  { name: '机制', items: [
    { name: 'binlog 格式', desc: 'ROW/STATEMENT/MIXED。' },
    { name: '复制线程', desc: 'IO 线程与 SQL 线程。' },
    { name: '半同步', desc: '至少一个从库确认。' }
  ] },
  { name: '延迟', items: [
    { name: '大事务', desc: '拆分与限流。' },
    { name: '并行复制', desc: '按库/组提交并行。' },
    { name: '监控', desc: 'Seconds_Behind_Master。' }
  ] },
  { name: '切换', items: [
    { name: '主从切换', desc: '选主与数据补齐。' },
    { name: '读写分离', desc: '延迟读兜底。' }
  ] }
] };

KB.DETAILS.shard = { groups: [
  { name: '策略', items: [
    { name: '范围分片', desc: '按时间或 id 区间。' },
    { name: '哈希分片', desc: '均匀但扩容麻烦。' },
    { name: '分片键选择', desc: '避免跨分片查询。' }
  ] },
  { name: '扩容', items: [
    { name: '双倍扩容', desc: '减少迁移量。' },
    { name: '数据迁移', desc: '校验与灰度。' },
    { name: '全局 id', desc: '雪花算法与号段。' }
  ] },
  { name: '问题', items: [
    { name: '跨分片查询', desc: '聚合与二次查询。' },
    { name: '分布式事务', desc: '最终一致方案。' }
  ] }
] };

KB.DETAILS.nosql = { groups: [
  { name: '类型', items: [
    { name: '文档型', desc: 'MongoDB 与嵌套结构。' },
    { name: '键值型', desc: 'Redis、DynamoDB。' },
    { name: '列族与图', desc: 'HBase、Neo4j。' }
  ] },
  { name: '选型', items: [
    { name: '一致性取舍', desc: '强一致与最终一致。' },
    { name: '查询模式', desc: '按访问方式设计模型。' },
    { name: '运维成本', desc: '集群与备份。' }
  ] }
] };

KB.DETAILS.process = { groups: [
  { name: '概念', items: [
    { name: '进程与线程', desc: '地址空间与调度单位。' },
    { name: '协程', desc: '用户态调度与栈。' },
    { name: '上下文切换', desc: '开销与触发条件。' }
  ] },
  { name: '调度', items: [
    { name: '时间片', desc: '公平与响应。' },
    { name: '优先级', desc: '实时与普通进程。' },
    { name: 'CPU 亲和', desc: '缓存局部性。' }
  ] },
  { name: '通信', items: [
    { name: '管道与信号', desc: '父子进程通信。' },
    { name: '共享内存', desc: '最快但要同步。' },
    { name: 'Socket', desc: '跨机与本机通信。' }
  ] }
] };

KB.DETAILS.mem = { groups: [
  { name: '虚拟内存', items: [
    { name: '页表', desc: '虚拟地址到物理地址。' },
    { name: '缺页与换页', desc: '按需调页。' },
    { name: 'mmap', desc: '文件映射与共享内存。' }
  ] },
  { name: '分配与回收', items: [
    { name: '堆与栈', desc: '分配方式与生命周期。' },
    { name: '内存碎片', desc: '外碎片与内碎片。' },
    { name: 'OOM', desc: '触发条件与保护。' }
  ] },
  { name: '排障', items: [
    { name: '泄漏排查', desc: '增长趋势与堆快照。' },
    { name: 'RSS 与缓存', desc: '页缓存是否算进程内存。' }
  ] }
] };

KB.DETAILS.fs = { groups: [
  { name: '基础', items: [
    { name: 'inode', desc: '元数据与文件名分离。' },
    { name: '目录结构', desc: '树形与挂载点。' },
    { name: '权限', desc: '文件与目录的 rwx 含义不同。' }
  ] },
  { name: 'IO', items: [
    { name: '页缓存', desc: '读写先过缓存。' },
    { name: '顺序与随机', desc: '机械盘与 SSD 的差异。' },
    { name: 'fsync', desc: '落盘与持久化。' }
  ] },
  { name: '排障', items: [
    { name: '磁盘满', desc: 'df 与 inode 两种情况。' },
    { name: '删除未释放', desc: '进程仍持有文件句柄。' }
  ] }
] };

KB.DETAILS.jvm = { groups: [
  { name: '内存', items: [
    { name: '堆', desc: '新生代与老年代。' },
    { name: '栈与元空间', desc: '线程栈与方法区。' },
    { name: '对象分配', desc: 'TLAB 与逃逸分析。' }
  ] },
  { name: 'GC', items: [
    { name: '分代回收', desc: 'Minor/Major GC。' },
    { name: '收集器', desc: 'G1、ZGC、CMS 的取舍。' },
    { name: '调优', desc: '停顿与吞吐目标。' }
  ] },
  { name: '类加载', items: [
    { name: '双亲委派', desc: '类加载顺序。' },
    { name: '热部署与冲突', desc: '重复类问题。' }
  ] },
  { name: '工具', items: [
    { name: 'jstack/jmap', desc: '线程与堆。' },
    { name: 'Arthas', desc: '在线诊断。' }
  ] }
] };

KB.DETAILS.codereview = { groups: [
  { name: '流程', items: [
    { name: '小 PR', desc: '一次只做一件事。' },
    { name: '描述与自测', desc: '让评审者快速理解。' },
    { name: '响应时限', desc: '别让 PR 挂着。' }
  ] },
  { name: '关注点', items: [
    { name: '正确性', desc: '边界与错误处理。' },
    { name: '可维护性', desc: '命名、结构、重复。' },
    { name: '安全与性能', desc: '注入、N+1、锁。' }
  ] },
  { name: '文化', items: [
    { name: '对事不对人', desc: '讨论代码不评价人。' },
    { name: '自动化兜底', desc: '格式与静态检查交给 CI。' }
  ] }
] };

KB.DETAILS['c-cpp'] = { groups: [
  { name: '语言', items: [
    { name: '指针与引用', desc: '地址、解引用、引用语义。' },
    { name: '内存管理', desc: '栈、堆、RAII。' },
    { name: '模板', desc: '泛型与编译期计算。' }
  ] },
  { name: '现代 C++', items: [
    { name: '智能指针', desc: 'unique_ptr/shared_ptr。' },
    { name: '移动语义', desc: '右值引用与性能。' },
    { name: '并发', desc: 'std::thread 与原子。' }
  ] },
  { name: '工具', items: [
    { name: '编译与链接', desc: '头文件与符号。' },
    { name: '调试', desc: 'gdb、ASan、valgrind。' }
  ] }
] };

KB.DETAILS.go = { groups: [
  { name: '语言', items: [
    { name: '类型与接口', desc: '隐式实现接口。' },
    { name: '错误处理', desc: 'error 返回与包装。' },
    { name: '包管理', desc: 'go mod。' }
  ] },
  { name: '并发', items: [
    { name: 'goroutine', desc: '轻量协程与调度器。' },
    { name: 'channel', desc: '通信与同步。' },
    { name: 'context', desc: '取消与超时传播。' }
  ] },
  { name: '工程', items: [
    { name: '标准库 HTTP', desc: '服务端与客户端。' },
    { name: '性能分析', desc: 'pprof。' }
  ] }
] };

KB.DETAILS.rust = { groups: [
  { name: '所有权', items: [
    { name: '借用与生命周期', desc: '编译期内存安全。' },
    { name: '移动语义', desc: '默认 move。' },
    { name: '智能指针', desc: 'Box/Rc/RefCell。' }
  ] },
  { name: '并发', items: [
    { name: 'Send/Sync', desc: '线程安全约束。' },
    { name: 'async/await', desc: 'Future 与运行时。' },
    { name: '通道', desc: '消息传递。' }
  ] },
  { name: '工程', items: [
    { name: 'Cargo', desc: '依赖与工作区。' },
    { name: '错误处理', desc: 'Result 与 anyhow。' },
    { name: 'unsafe', desc: '何时需要与风险。' }
  ] }
] };

KB.DETAILS.asm = { groups: [
  { name: '基础', items: [
    { name: '寄存器', desc: '通用与专用寄存器。' },
    { name: '寻址方式', desc: '立即、直接、间接。' },
    { name: '函数调用约定', desc: '参数与返回值位置。' }
  ] },
  { name: '指令', items: [
    { name: '数据传送', desc: 'mov 与内存访问。' },
    { name: '控制流', desc: '跳转、循环、条件。' },
    { name: '栈操作', desc: 'push/pop 与栈帧。' }
  ] },
  { name: '应用', items: [
    { name: '反汇编分析', desc: '看崩溃与性能。' },
    { name: '内联汇编', desc: 'C 中嵌入。' }
  ] }
] };

KB.DETAILS.architecture = { groups: [
  { name: '分层', items: [
    { name: '分层架构', desc: '接口、应用、领域、基础设施。' },
    { name: '六边形/整洁架构', desc: '依赖倒置。' },
    { name: '边界与依赖', desc: '谁可以依赖谁。' }
  ] },
  { name: '模式', items: [
    { name: '单体与微服务', desc: '组织与部署的取舍。' },
    { name: '事件驱动', desc: '解耦与最终一致。' },
    { name: 'CQRS', desc: '读写分离模型。' }
  ] },
  { name: '演进', items: [
    { name: '模块化单体', desc: '先理顺边界再拆。' },
    { name: '架构决策记录', desc: 'ADR 记录为什么。' }
  ] }
] };

KB.DETAILS.ddd = { groups: [
  { name: '战略', items: [
    { name: '限界上下文', desc: '业务边界的划分。' },
    { name: '通用语言', desc: '业务与技术同一套词。' },
    { name: '上下文映射', desc: '团队与系统关系。' }
  ] },
  { name: '战术', items: [
    { name: '实体与值对象', desc: '身份与不可变。' },
    { name: '聚合与聚合根', desc: '一致性边界。' },
    { name: '领域事件', desc: '业务事实的传播。' }
  ] },
  { name: '落地', items: [
    { name: '事件风暴', desc: '协作建模工作坊。' },
    { name: '与表结构的关系', desc: '领域模型不等于数据库模型。' }
  ] }
] };

KB.DETAILS['test-strategy'] = { groups: [
  { name: '分层', items: [
    { name: '单元测试', desc: '快、量大、贴近代码。' },
    { name: '集成测试', desc: '模块之间的契约。' },
    { name: '端到端', desc: '关键路径少量覆盖。' }
  ] },
  { name: '流程', items: [
    { name: '测试左移', desc: '需求与设计阶段介入。' },
    { name: '用例设计', desc: '等价类、边界值、场景法。' },
    { name: '缺陷管理', desc: '分级、复现、回归。' }
  ] },
  { name: '门禁', items: [
    { name: '覆盖率门槛', desc: '新增代码优先。' },
    { name: 'CI 卡点', desc: '失败不允许合并。' }
  ] }
] };

KB.DETAILS['code-quality'] = { groups: [
  { name: '规范', items: [
    { name: '命名与结构', desc: '见名知意、函数单一职责。' },
    { name: '注释', desc: '解释为什么，不复述代码。' },
    { name: '格式化', desc: '交给工具，不争论。' }
  ] },
  { name: '重构', items: [
    { name: '小步重构', desc: '测试保护下持续改。' },
    { name: '消除重复', desc: '三次法则。' },
    { name: '降低复杂度', desc: '拆分长函数与深嵌套。' }
  ] },
  { name: '工具', items: [
    { name: '静态检查', desc: 'ESLint、SonarQube。' },
    { name: '复杂度度量', desc: '圈复杂度与重复率。' }
  ] }
] };

KB.DETAILS.documentation = { groups: [
  { name: '类型', items: [
    { name: 'README', desc: '是什么、怎么跑。' },
    { name: '架构与决策', desc: 'ADR 与设计文档。' },
    { name: 'API 文档', desc: 'OpenAPI 自动生成。' }
  ] },
  { name: '写作', items: [
    { name: '面向读者', desc: '新人还是维护者。' },
    { name: '示例优先', desc: '能复制运行的代码。' },
    { name: '结构与检索', desc: '目录与关键词。' }
  ] },
  { name: '维护', items: [
    { name: '随代码更新', desc: '文档过期比没有更糟。' },
    { name: '文档评审', desc: '和代码一起 review。' }
  ] }
] };
