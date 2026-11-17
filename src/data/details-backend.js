/* ============================================================
 * 节点内部详细拆解：数据库 / 中间件 / 后端 / 交付
 * ============================================================ */
window.KB = window.KB || {};
KB.DETAILS = KB.DETAILS || {};

KB.DETAILS.mysql = { groups: [
  { name: 'SQL 与查询', items: [
    { name: 'SELECT 与 JOIN', desc: '内连接、左连接、自连接；笛卡尔积怎么来的。' },
    { name: '聚合与分组', desc: 'GROUP BY、HAVING 与 WHERE 的顺序。' },
    { name: '子查询与 UNION', desc: '相关子查询、EXISTS 的写法与性能。' },
    { name: '窗口函数', desc: 'ROW_NUMBER、RANK、累计求和。' },
    { name: '写入与更新', desc: 'INSERT ... ON DUPLICATE KEY、批量更新。' },
    { name: 'explain', desc: 'type、key、rows、Extra；先看有没有走索引。' }
  ] },
  { name: '索引', items: [
    { name: 'B+ 树结构', desc: '为什么用 B+ 树而不是二叉树或哈希。' },
    { name: '聚簇索引与二级索引', desc: '主键即数据；二级索引要回表。' },
    { name: '联合索引与最左前缀', desc: '(a,b,c) 能命中哪些查询。' },
    { name: '覆盖索引', desc: '查询列都在索引里，避免回表。' },
    { name: '索引失效', desc: '函数、隐式转换、前导模糊、OR 的条件。' },
    { name: '索引设计取舍', desc: '不是越多越好；写放大与空间。' }
  ] },
  { name: '事务与锁', items: [
    { name: 'ACID', desc: '原子、一致、隔离、持久；靠什么实现。' },
    { name: '隔离级别', desc: '读未提交、读已提交、可重复读、串行化。' },
    { name: 'MVCC', desc: 'undo log + 版本链 + ReadView。' },
    { name: '行锁与间隙锁', desc: 'Next-Key Lock；范围更新为什么锁住一片。' },
    { name: '死锁', desc: '怎么产生、如何看死锁日志、怎么避免。' },
    { name: '长事务', desc: '占用 undo、阻塞 DDL；监控与拆分。' }
  ] },
  { name: '架构与复制', items: [
    { name: '主从复制', desc: 'binlog → relay log → 重放。' },
    { name: '复制延迟', desc: '大事务、单线程重放；延迟怎么看。' },
    { name: '半同步与组复制', desc: '数据不丢的取舍与代价。' },
    { name: '读写分离', desc: '写主读从；一致性读的兜底。' },
    { name: '高可用切换', desc: 'MHA、Orchestrator、云数据库自动切换。' }
  ] },
  { name: '分库分表', items: [
    { name: '垂直拆分', desc: '按业务拆库、按字段拆表。' },
    { name: '水平分片', desc: '分片键选择；路由与聚合。' },
    { name: '扩容与迁移', desc: '双写、数据校验、灰度切流。' },
    { name: '分布式事务', desc: '本地消息表、TCC、最终一致。' }
  ] },
  { name: '运维与优化', items: [
    { name: '慢查询日志', desc: 'long_query_time、pt-query-digest 汇总。' },
    { name: '连接池', desc: '最大连接、超时、泄漏。' },
    { name: '备份与恢复', desc: 'mysqldump、xtrabackup；恢复演练。' },
    { name: '参数调优', desc: 'buffer pool、redo log、刷盘策略。' },
    { name: '在线 DDL', desc: '大表加字段的风险与工具。' }
  ] }
] };

KB.DETAILS.redis = { groups: [
  { name: '数据结构', items: [
    { name: 'String', desc: '计数器、分布式锁、缓存对象。' },
    { name: 'Hash', desc: '对象字段存储；小 hash 的压缩编码。' },
    { name: 'List', desc: '队列与栈；阻塞弹出。' },
    { name: 'Set', desc: '去重、交并差、共同好友。' },
    { name: 'ZSet', desc: '排行榜、延迟队列、按分数范围查询。' },
    { name: 'Bitmap / HyperLogLog / Stream', desc: '签到、UV 估算、消息流。' }
  ] },
  { name: '持久化', items: [
    { name: 'RDB', desc: '快照；fork 与写时复制。' },
    { name: 'AOF', desc: '追加日志；always/everysec/no 的取舍。' },
    { name: '混合持久化', desc: 'RDB + AOF，重启恢复更快。' },
    { name: '恢复演练', desc: '备份文件是否真的能起来。' }
  ] },
  { name: '高可用', items: [
    { name: '主从复制', desc: '全量 + 增量；复制积压缓冲区。' },
    { name: '哨兵', desc: '监控、主观/客观下线、故障转移。' },
    { name: 'Cluster 分片', desc: '16384 个槽；MOVED/ASK 重定向。' },
    { name: '脑裂与数据丢失', desc: '异步复制下的取舍。' }
  ] },
  { name: '缓存问题', items: [
    { name: '缓存穿透', desc: '查不存在的数据；布隆过滤器与空值缓存。' },
    { name: '缓存击穿', desc: '热点 key 过期瞬间；互斥重建。' },
    { name: '缓存雪崩', desc: '大批 key 同时过期；过期时间打散。' },
    { name: '一致性与双写', desc: '先删缓存还是先更库；延迟双删。' },
    { name: '热 key 与大 key', desc: '拆分、本地缓存、监控发现。' }
  ] },
  { name: '使用与运维', items: [
    { name: '过期与淘汰', desc: '惰性删除 + 定期删除；LRU/LFU 策略。' },
    { name: '分布式锁', desc: 'SET NX PX、续期、误删保护。' },
    { name: 'Pipeline 与事务', desc: '减少 RTT；MULTI 不等于原子回滚。' },
    { name: 'Lua 脚本', desc: '原子执行多步操作。' },
    { name: '慢查询与监控', desc: 'slowlog、内存碎片、连接数。' }
  ] }
] };

KB.DETAILS.docker = { groups: [
  { name: '镜像', items: [
    { name: '分层与缓存', desc: '每条指令一层；顺序影响命中率。' },
    { name: 'Dockerfile', desc: 'FROM/RUN/COPY/CMD/ENTRYPOINT 的分工。' },
    { name: '多阶段构建', desc: '构建环境与运行环境分离，镜像更小。' },
    { name: '镜像瘦身', desc: 'alpine、清理缓存、.dockerignore。' }
  ] },
  { name: '容器', items: [
    { name: '生命周期', desc: 'create → start → stop → rm；退出码。' },
    { name: '网络模式', desc: 'bridge/host/none/自定义网络与 DNS。' },
    { name: '数据卷', desc: 'volume 与 bind mount；数据不能放容器层。' },
    { name: '资源限制', desc: '--cpus、--memory、OOM 与退出码 137。' },
    { name: '日志', desc: 'docker logs 与日志驱动；日志写满磁盘。' }
  ] },
  { name: '仓库与分发', items: [
    { name: 'tag 与 digest', desc: 'latest 不可靠；用 digest 钉住版本。' },
    { name: '私有仓库', desc: 'Harbor、登录与推送。' },
    { name: '镜像安全', desc: '漏洞扫描、非 root 运行、签名。' }
  ] },
  { name: '编排与生态', items: [
    { name: 'docker compose', desc: '多容器本地编排；depends_on 不等于就绪。' },
    { name: '与 k8s 的关系', desc: '单机容器 → 集群编排的演进。' },
    { name: '构建缓存与 CI', desc: '远程缓存、分层复用。' }
  ] },
  { name: '排障', items: [
    { name: '进容器看现场', desc: 'docker exec -it sh；没有 shell 的镜像。' },
    { name: '网络不通', desc: '端口映射、容器内监听地址 0.0.0.0。' },
    { name: '启动失败', desc: '看 logs、退出码、entrypoint 与权限。' }
  ] }
] };

KB.DETAILS.k8s = { groups: [
  { name: '核心对象', items: [
    { name: 'Pod', desc: '最小调度单位；一个或多个容器共享网络。' },
    { name: 'Deployment', desc: '副本管理、滚动更新与回滚。' },
    { name: 'Service', desc: 'ClusterIP/NodePort/LoadBalancer；标签选择器。' },
    { name: 'Ingress', desc: '七层入口；域名与路径路由。' },
    { name: 'ConfigMap / Secret', desc: '配置与敏感信息注入。' }
  ] },
  { name: '调度与资源', items: [
    { name: 'requests / limits', desc: '调度依据与上限；超限被 OOMKilled。' },
    { name: 'QoS 等级', desc: 'Guaranteed/Burstable/BestEffort。' },
    { name: '亲和与污点', desc: 'nodeSelector、affinity、taint/toleration。' },
    { name: 'HPA', desc: '按 CPU/自定义指标扩缩容。' }
  ] },
  { name: '网络', items: [
    { name: 'CNI', desc: 'Pod 网络由插件提供；Calico/Flannel。' },
    { name: 'Service 与 kube-proxy', desc: 'iptables/IPVS 转发规则。' },
    { name: '集群 DNS', desc: 'service.namespace.svc.cluster.local。' },
    { name: '网络策略', desc: 'NetworkPolicy 限制 Pod 间访问。' }
  ] },
  { name: '存储', items: [
    { name: 'PV / PVC', desc: '存储抽象与绑定。' },
    { name: 'StorageClass', desc: '动态供给；云盘与本地盘。' },
    { name: '有状态应用', desc: 'StatefulSet 与稳定网络标识。' }
  ] },
  { name: '运维', items: [
    { name: 'kubectl 常用', desc: 'get/describe/logs/exec/port-forward。' },
    { name: '健康探针', desc: 'liveness/readiness/startup 的区别。' },
    { name: '滚动更新', desc: 'maxSurge/maxUnavailable；回滚。' },
    { name: '命名空间与 RBAC', desc: '多租户隔离与权限。' }
  ] },
  { name: '排障', items: [
    { name: 'Pending', desc: '资源不足、亲和冲突、PVC 未绑定。' },
    { name: 'CrashLoopBackOff', desc: '看 logs --previous。' },
    { name: 'ImagePullBackOff', desc: '镜像名、仓库认证、网络。' },
    { name: 'Service 访问不通', desc: 'endpoints 是否为空、端口名是否匹配。' }
  ] }
] };

KB.DETAILS.java = { groups: [
  { name: '语言基础', items: [
    { name: '类型与装箱', desc: '基本类型与包装类；== 与 equals。' },
    { name: '集合框架', desc: 'ArrayList/LinkedList/HashMap/TreeMap 的取舍。' },
    { name: '泛型与擦除', desc: '编译期检查、运行时擦除的后果。' },
    { name: '异常体系', desc: '受检异常、运行时异常、try-with-resources。' },
    { name: 'Lambda 与 Stream', desc: '函数式接口、惰性求值与并行流。' }
  ] },
  { name: '并发', items: [
    { name: '线程与线程池', desc: '核心参数、队列、拒绝策略。' },
    { name: 'synchronized 与锁升级', desc: '偏向锁、轻量级锁、重量级锁。' },
    { name: 'JUC 工具', desc: 'ReentrantLock、CountDownLatch、Semaphore。' },
    { name: '原子类与 CAS', desc: 'ABA 问题与 AtomicStampedReference。' },
    { name: '并发容器', desc: 'ConcurrentHashMap、CopyOnWriteArrayList。' },
    { name: '内存模型 JMM', desc: '可见性、有序性、happens-before。' }
  ] },
  { name: 'JVM', items: [
    { name: '运行时内存', desc: '堆、栈、方法区、元空间。' },
    { name: 'GC 算法与收集器', desc: 'G1/ZGC；停顿时间与吞吐。' },
    { name: '类加载', desc: '双亲委派与打破它的场景。' },
    { name: '诊断工具', desc: 'jstack、jmap、jstat、Arthas。' }
  ] },
  { name: '工程', items: [
    { name: 'Maven / Gradle', desc: '依赖冲突、作用域、多模块。' },
    { name: '单元测试', desc: 'JUnit、Mockito；可测性设计。' },
    { name: '日志规范', desc: 'SLF4J、占位符、异步日志。' }
  ] },
  { name: '常见坑', items: [
    { name: 'ConcurrentModificationException', desc: '遍历时删除元素。' },
    { name: 'SimpleDateFormat 线程不安全', desc: '换 DateTimeFormatter。' },
    { name: '字符串拼接', desc: '循环里 + 的代价；StringBuilder。' },
    { name: 'OOM 排查', desc: '堆 dump、泄漏对象定位。' }
  ] }
] };

KB.DETAILS.spring = { groups: [
  { name: 'IoC 容器', items: [
    { name: 'Bean 定义与作用域', desc: 'singleton/prototype；生命周期回调。' },
    { name: '依赖注入方式', desc: '构造器注入优先；循环依赖与三级缓存。' },
    { name: '条件装配', desc: '@Conditional、@Profile、starter 机制。' }
  ] },
  { name: 'AOP', items: [
    { name: '代理方式', desc: 'JDK 动态代理与 CGLIB；final 方法不生效。' },
    { name: '切点与通知', desc: '@Around/@Before/@After 的执行顺序。' },
    { name: '事务失效场景', desc: '同类内部调用、非 public、异常被吞。' }
  ] },
  { name: 'Web 层', items: [
    { name: 'Spring MVC 流程', desc: 'DispatcherServlet → HandlerMapping → 返回值处理。' },
    { name: '参数绑定与校验', desc: '@RequestBody、@Valid、全局异常处理。' },
    { name: '拦截器与过滤器', desc: '执行顺序与适用场景。' }
  ] },
  { name: '数据访问', items: [
    { name: '事务传播行为', desc: 'REQUIRED/REQUIRES_NEW/NESTED。' },
    { name: 'MyBatis 集成', desc: 'Mapper 代理、一级/二级缓存。' },
    { name: '连接池', desc: 'HikariCP 参数与监控。' }
  ] },
  { name: 'Boot 与运维', items: [
    { name: '自动装配原理', desc: 'spring.factories / AutoConfiguration.imports。' },
    { name: '配置优先级', desc: '命令行 > 环境变量 > 配置文件。' },
    { name: 'Actuator', desc: '健康检查、指标、线程与堆信息。' }
  ] }
] };

KB.DETAILS.mq = { groups: [
  { name: '核心概念', items: [
    { name: '生产-存储-消费', desc: '消息模型与投递语义。' },
    { name: '顺序消息', desc: '分区/队列内有序；全局有序的代价。' },
    { name: '幂等消费', desc: '至少一次投递下如何不重复处理。' },
    { name: '事务消息', desc: '本地事务与消息一致性。' }
  ] },
  { name: '可靠性与运维', items: [
    { name: '消息丢失', desc: '生产、存储、消费三段各自怎么丢。' },
    { name: '堆积处理', desc: '扩容消费者、临时转储。' },
    { name: '重试与死信', desc: '退避策略与人工补偿。' },
    { name: '选型', desc: 'Kafka/RabbitMQ/RocketMQ 的差异。' }
  ] }
] };

KB.DETAILS.cicd = { groups: [
  { name: '流水线', items: [
    { name: '提交即构建', desc: '触发条件、分支策略。' },
    { name: '测试阶段', desc: '单元测试、静态检查、许可证扫描。' },
    { name: '制品与版本', desc: '镜像 tag、语义化版本、可追溯。' },
    { name: '部署与回滚', desc: '灰度、蓝绿、一键回滚。' }
  ] },
  { name: '工程实践', items: [
    { name: '密钥管理', desc: 'CI 变量、Vault、不把密钥写进仓库。' },
    { name: '缓存与加速', desc: '依赖缓存、构建缓存。' },
    { name: '流水线即代码', desc: 'Jenkinsfile、GitHub Actions、GitLab CI。' }
  ] }
] };

KB.DETAILS.monitor = { groups: [
  { name: '指标体系', items: [
    { name: '四大黄金指标', desc: '延迟、流量、错误、饱和度。' },
    { name: 'USE 方法', desc: '使用率、饱和度、错误。' },
    { name: 'RED 方法', desc: '请求速率、错误、耗时。' }
  ] },
  { name: '采集与存储', items: [
    { name: 'Prometheus 模型', desc: '拉取、标签、时间序列。' },
    { name: 'Exporter', desc: 'node_exporter、mysqld_exporter。' },
    { name: '长期存储', desc: 'Thanos/VictoriaMetrics。' }
  ] },
  { name: '告警', items: [
    { name: '告警规则', desc: 'for、阈值与抖动。' },
    { name: '分级与抑制', desc: 'P0/P1/P2、告警风暴。' },
    { name: '值班与升级', desc: '响应时限与升级路径。' }
  ] }
] };

KB.DETAILS.logging = { groups: [
  { name: '日志规范', items: [
    { name: '结构化日志', desc: 'JSON 字段：时间、级别、traceId。' },
    { name: '级别使用', desc: 'ERROR 要可行动，别什么都打。' },
    { name: '采样与限流', desc: '高流量下避免日志成为瓶颈。' }
  ] },
  { name: '采集与检索', items: [
    { name: '采集链路', desc: '文件 → agent → 消息队列 → 存储。' },
    { name: 'ELK / Loki', desc: '索引与查询的取舍。' },
    { name: '日志轮转', desc: '按大小/时间切割与保留。' }
  ] },
  { name: '链路追踪', items: [
    { name: 'traceId 贯穿', desc: '入口生成、跨服务透传。' },
    { name: 'OpenTelemetry', desc: '统一埋点标准。' },
    { name: '排障用法', desc: '一个 traceId 串起全部日志。' }
  ] }
] };

KB.DETAILS.git = { groups: [
  { name: '基础操作', items: [
    { name: 'add / commit', desc: '暂存区与提交对象。' },
    { name: '分支与合并', desc: 'merge vs rebase 的区别。' },
    { name: '冲突解决', desc: '三栏合并与标记。' },
    { name: '撤销', desc: 'restore、reset、revert 的适用场景。' }
  ] },
  { name: '协作流程', items: [
    { name: '分支模型', desc: 'main/develop/feature/hotfix。' },
    { name: 'PR 与评审', desc: '小步提交、描述与检查清单。' },
    { name: '保护分支', desc: '禁止强推、必需评审与 CI。' }
  ] },
  { name: '进阶', items: [
    { name: 'cherry-pick', desc: '把单个提交挪到别的分支。' },
    { name: 'stash', desc: '临时保存工作区。' },
    { name: 'bisect', desc: '二分找引入 bug 的提交。' },
    { name: '钩子与 CI', desc: 'pre-commit 格式检查。' }
  ] }
] };

KB.DETAILS.rest = { groups: [
  { name: '设计', items: [
    { name: '资源与路径', desc: '名词化路径、层级关系。' },
    { name: '方法语义', desc: 'GET/POST/PUT/PATCH/DELETE 的幂等性。' },
    { name: '状态码', desc: '201/204/400/401/403/404/409/422/429。' },
    { name: '错误体', desc: '统一 code/message/details 结构。' }
  ] },
  { name: '演进与治理', items: [
    { name: '版本化', desc: '路径版本与兼容策略。' },
    { name: '分页与过滤', desc: '游标分页 vs 偏移分页。' },
    { name: '幂等与重试', desc: '幂等键与超时重试。' },
    { name: 'OpenAPI 文档', desc: '契约先行、自动生成客户端。' }
  ] }
] };

KB.DETAILS.sql = { groups: [
  { name: '查询', items: [
    { name: '基础查询', desc: 'SELECT/WHERE/ORDER/LIMIT。' },
    { name: 'JOIN', desc: '内、左、右、全连接。' },
    { name: '聚合', desc: 'COUNT/SUM/AVG/GROUP BY/HAVING。' },
    { name: '子查询与 CTE', desc: 'WITH 写法提升可读性。' },
    { name: '窗口函数', desc: '分组内排序与累计。' }
  ] },
  { name: '写入与事务', items: [
    { name: 'INSERT/UPDATE/DELETE', desc: '批量与条件更新。' },
    { name: '事务控制', desc: 'BEGIN/COMMIT/ROLLBACK。' },
    { name: '约束', desc: '主键、唯一、外键、非空。' }
  ] },
  { name: '性能', items: [
    { name: '执行计划', desc: 'EXPLAIN 阅读顺序。' },
    { name: '索引使用', desc: '让查询走索引的写法。' },
    { name: '慢查询定位', desc: '按耗时排序、找全表扫描。' }
  ] }
] };

KB.DETAILS.tx = { groups: [
  { name: '事务基础', items: [
    { name: 'ACID', desc: '四大特性的实现代价。' },
    { name: '隔离级别', desc: '脏读、不可重复读、幻读。' },
    { name: 'MVCC', desc: '版本链与快照读。' }
  ] },
  { name: '锁', items: [
    { name: '行锁与表锁', desc: '粒度与并发度。' },
    { name: '间隙锁', desc: '范围锁与幻读。' },
    { name: '死锁检测', desc: '等待图与回滚选择。' }
  ] }
] };

KB.DETAILS.index = { groups: [
  { name: '结构与原理', items: [
    { name: 'B+ 树', desc: '为什么适合磁盘。' },
    { name: '聚簇与二级索引', desc: '回表与覆盖。' },
    { name: '联合索引', desc: '最左前缀。' }
  ] },
  { name: '实践', items: [
    { name: '索引选择', desc: '区分度与选择性。' },
    { name: '失效场景', desc: '函数、隐式转换、模糊前导。' },
    { name: '监控', desc: '未使用索引与外键缺失。' }
  ] }
] };
