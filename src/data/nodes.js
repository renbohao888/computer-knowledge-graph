/* ============================================================
 * 知识点数据：nodes
 * ------------------------------------------------------------
 * id        唯一标识，连线用它引用
 * name      显示名
 * layer     所属层（必须在 config.js 的 LAYERS 里）
 * domain    问题域
 * status    已掌握 / 待补充 / 模糊
 * tracks    学习方向（可多个，必须在 TRACKS 里）
 * before    学习前置的 id 数组；"学完之后"由反向引用自动算出
 * keywords  搜索别名（可选）：俗称、英文、缩写、常见写法
 * children  细分知识点（可选）：[{ name, desc }]，把一个点拆成可学的小块
 * ------------------------------------------------------------
 * 改完运行：node scripts/validate.mjs
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = [
    /* —— 用户与客户端 —— */
    { id:'browser', name:'浏览器运行时', layer:'用户与客户端', domain:'性能', status:'待补充', tracks:['前端'], before:['tcpip','http-cache'],
      keywords:['dom','cssom','渲染管线','事件循环','同源策略','v8','前端'],
      children:[
        { name:'渲染管线', desc:'解析、样式、布局、绘制、合成。' },
        { name:'事件循环', desc:'宏任务、微任务与渲染时机。' },
        { name:'同源策略', desc:'CORS 与跨域方案。' },
        { name:'浏览器存储', desc:'Cookie、localStorage、IndexedDB。' },
        { name:'性能指标', desc:'LCP、INP、CLS。' }
      ],
      description:'从 URL 到像素的完整链路：HTML 解析、CSSOM、JS 引擎与渲染管线。前端性能问题大多能在这条链路上定位。' },
    { id:'spa', name:'单页应用 SPA', layer:'用户与客户端', domain:'研发效率', status:'待补充', tracks:['前端'], before:['browser','rest'],
      keywords:['react','vue','前端框架','路由'],
      description:'前端路由、状态管理与组件化，把界面拆成可组合的模块；与后端之间只剩一层 API 契约。' },
    { id:'mobile', name:'移动端 / 小程序', layer:'用户与客户端', domain:'研发效率', status:'待补充', tracks:['前端','移动端'], before:['spa','rest'],
      keywords:['app','小程序','h5'],
      description:'同一套后端服务多种终端：原生、H5、小程序。差异在登录态、网络环境与发布节奏。' },
    { id:'http-cache', name:'HTTP 缓存', layer:'用户与客户端', domain:'性能', status:'待补充', tracks:['前端'], before:['tcpip'],
      keywords:['cache-control','etag','强缓存','协商缓存','304','浏览器缓存'],
      children:[
        { name:'强缓存', desc:'Cache-Control 与 Expires，不发请求。' },
        { name:'协商缓存', desc:'ETag / Last-Modified 与 304。' },
        { name:'缓存层级', desc:'浏览器、CDN、反向代理各自的缓存。' },
        { name:'缓存失效', desc:'刷新、版本号与 hash 文件名。' }
      ],
      description:'强缓存与协商缓存（Cache-Control / ETag），决定一个请求是否真的到达服务器。' },
    { id:'websocket', name:'WebSocket 长连接', layer:'用户与客户端', domain:'网络通信', status:'待补充', tracks:['后端','前端','网络'], before:['tcpip','tls'],
      keywords:['长连接','推送','心跳','ws'],
      description:'全双工长连接，用于推送、协作与行情；心跳、断线重连和代理超时是主要坑位。' },

    /* —— 接入层 —— */
    { id:'dns', name:'DNS 解析', layer:'接入层', domain:'可用性', status:'待补充', tracks:['运维','网络'], before:['tcpip'],
      keywords:['域名','解析','cname','ttl','a记录'],
      description:'域名到 IP 的第一跳。TTL、CNAME、多线路解析决定流量去向，也决定故障切换有多快。' },
    { id:'cdn', name:'CDN 分发', layer:'接入层', domain:'性能', status:'待补充', tracks:['前端','运维','网络'], before:['dns','http-cache'],
      keywords:['内容分发','缓存节点','回源','边缘节点'],
      description:'把静态资源放到离用户最近的节点；回源策略、缓存刷新与命中率是三个关键指标。' },
    { id:'lb', name:'负载均衡', layer:'接入层', domain:'可用性', status:'待补充', tracks:['运维','网络'], before:['dns','tcpip'],
      keywords:['负载','upstream','健康检查','四层','七层'],
      description:'四层/七层流量分发与健康检查，决定一台机器挂掉时用户是否感知。' },
    { id:'waf', name:'WAF / DDoS 防护', layer:'接入层', domain:'安全', status:'模糊', tracks:['运维','安全'], before:['tls','lb'],
      keywords:['防火墙','ddos','注入','cc攻击'],
      description:'在入口拦截注入、爬虫与洪水攻击，是安全体系的第一道闸门。' },
    { id:'tls', name:'TLS 与证书', layer:'接入层', domain:'安全', status:'待补充', tracks:['运维','安全','网络'], before:['tcpip'],
      keywords:['https','证书','ca','sni','握手','mtls','加密','openssl'],
      children:[
        { name:'握手流程', desc:'ClientHello 到 Finished 的完整往返。' },
        { name:'证书链', desc:'根证书、中间证书与信任锚。' },
        { name:'SNI', desc:'一个 IP 多个域名时怎么选证书。' },
        { name:'会话复用', desc:'Session ID 与 Session Ticket。' },
        { name:'双向认证 mTLS', desc:'服务间互信的常见做法。' }
      ],
      description:'HTTPS 的加密与身份校验；证书链、SNI、到期时间是线上最常见的故障源之一。' },
    { id:'nginx', name:'反向代理 Nginx', layer:'接入层', domain:'可用性', status:'已掌握', tracks:['后端','运维','网络'], before:['tcpip','lb'],
      keywords:['反向代理','upstream','静态资源','502'],
      description:'静态资源、反向代理、灰度与限速的常驻地；配置一处写错，全站 502。' },

    /* —— 网关与认证 —— */
    { id:'gateway', name:'API 网关', layer:'网关与认证', domain:'可用性', status:'待补充', tracks:['后端','运维'], before:['nginx','rest'],
      keywords:['api gateway','路由','鉴权','限流','kong','spring cloud gateway','网关'],
      children:[
        { name:'路由转发', desc:'按路径、域名、Header 分流。' },
        { name:'统一鉴权', desc:'在入口校验 token，下游信任。' },
        { name:'限流熔断', desc:'按用户、接口、集群维度。' },
        { name:'协议转换', desc:'HTTP 到 gRPC、内外网隔离。' },
        { name:'灰度发布', desc:'按标签或比例导流。' }
      ],
      description:'统一入口：路由、鉴权、限流、协议转换，让内部服务不必各自处理横切关注点。' },
    { id:'authn', name:'认证', layer:'网关与认证', domain:'安全', status:'待补充', tracks:['后端','安全'], before:['tls','session'],
      keywords:['jwt','oauth2','oidc','单点登录','sso','登录','认证'],
      children:[
        { name:'密码与会话', desc:'加盐哈希与会话固定攻击。' },
        { name:'JWT 结构', desc:'Header.Payload.Signature 与不可撤销性。' },
        { name:'OAuth2 流程', desc:'授权码模式与 PKCE。' },
        { name:'OIDC', desc:'在 OAuth2 上补一层身份。' },
        { name:'单点登录 SSO', desc:'跨域会话与票据。' }
      ],
      description:'证明你是谁：密码、短信、OAuth2 / OIDC，以及 JWT 的签名与过期策略。' },
    { id:'authz', name:'授权', layer:'网关与认证', domain:'安全', status:'待补充', tracks:['后端','安全'], before:['authn','session'],
      keywords:['rbac','abac','权限','越权','鉴权'],
      children:[
        { name:'RBAC', desc:'角色与权限点的映射。' },
        { name:'ABAC', desc:'按属性动态判断。' },
        { name:'权限点设计', desc:'接口级与数据级权限。' },
        { name:'越权漏洞', desc:'水平越权与垂直越权。' }
      ],
      description:'证明你能做什么：RBAC / ABAC 模型、权限点设计，以及越权漏洞的成因。' },
    { id:'session', name:'会话与 Token', layer:'网关与认证', domain:'安全', status:'待补充', tracks:['后端','安全'], before:['tls','redis'],
      keywords:['登录态','cookie','token','刷新令牌'],
      description:'登录态怎么存：服务端 Session、无状态 JWT、刷新令牌，以及如何让用户立刻下线。' },
    { id:'ratelimit', name:'限流与熔断', layer:'网关与认证', domain:'可用性', status:'模糊', tracks:['后端','运维'], before:['gateway','redis'],
      keywords:['限流','熔断','令牌桶','滑动窗口','降级'],
      description:'保护系统不被自己压垮：令牌桶、滑动窗口、排队、降级与熔断。' },
    { id:'secrets', name:'密钥与配置', layer:'网关与认证', domain:'安全', status:'模糊', tracks:['运维','安全'], before:['tls'],
      keywords:['密钥','配置中心','环境变量','vault'],
      description:'数据库密码和 API Key 不能写进代码；配置分层、密钥轮换与环境隔离。' },

    /* —— 应用层 —— */
    { id:'java', name:'Java 语言与并发', layer:'应用层', domain:'研发效率', status:'已掌握', tracks:['后端','语言'], before:['process','mem'],
      keywords:['jdk','jre','juc','注解','annotation','泛型','集合','反射','lambda','stream','面向对象'],
      children:[
        { name:'注解 Annotation', desc:'@Override、@Transactional 这类元数据，框架靠它做声明式编程。' },
        { name:'泛型', desc:'编译期类型检查与类型擦除，集合安全的基础。' },
        { name:'集合框架', desc:'List、Map、Set 的底层结构与复杂度取舍。' },
        { name:'并发包 JUC', desc:'线程池、锁、原子类与并发容器。' },
        { name:'反射', desc:'运行时读取类信息，框架与 ORM 的底层机制。' },
        { name:'Lambda 与 Stream', desc:'函数式写法与惰性求值的集合处理。' },
        { name:'类加载', desc:'双亲委派、类加载器隔离与热部署。' }
      ],
      description:'集合、泛型、JUC 并发包与内存模型，是读懂框架源码的地基。' },
    { id:'spring', name:'Spring Boot', layer:'应用层', domain:'研发效率', status:'已掌握', tracks:['后端'], before:['java','orm'],
      keywords:['springboot','spring boot','ioc','aop','自动装配','starter','bean','切面'],
      children:[
        { name:'IoC 容器', desc:'对象由容器创建和注入，依赖关系从代码移到配置。' },
        { name:'AOP 切面', desc:'把日志、事务、权限这类横切逻辑抽出来。' },
        { name:'自动装配', desc:'starter 与条件注解，让依赖即配置。' },
        { name:'事务管理', desc:'@Transactional 的传播行为与失效场景。' },
        { name:'Spring MVC', desc:'路由、参数绑定与统一异常处理。' },
        { name:'Spring Security', desc:'过滤器链、认证授权与 CSRF。' }
      ],
      description:'IoC、AOP、自动装配与 MVC，把业务代码组织成可维护的分层结构。' },
    { id:'python', name:'Python 服务', layer:'应用层', domain:'研发效率', status:'已掌握', tracks:['后端','数据','语言'], before:['process'],
      description:'脚本、数据处理与 Web 服务（FastAPI / Flask）；异步模型与 GIL 是绕不开的话题。' },
    { id:'rest', name:'REST 与 API 契约', layer:'应用层', domain:'研发效率', status:'已掌握', tracks:['后端','前端'], before:['tcpip'],
      keywords:['api','http','restful','幂等','状态码','接口'],
      children:[
        { name:'资源建模', desc:'用名词表达资源，用方法表达动作。' },
        { name:'状态码', desc:'2xx / 3xx / 4xx / 5xx 的语义。' },
        { name:'幂等设计', desc:'重试安全与幂等键。' },
        { name:'版本管理', desc:'URL 版本与 Header 版本。' },
        { name:'分页与错误模型', desc:'游标分页与统一错误结构。' }
      ],
      description:'资源建模、状态码、版本与幂等设计；接口契约是前后端和服务之间的边界。' },
    { id:'orm', name:'ORM / MyBatis', layer:'应用层', domain:'研发效率', status:'已掌握', tracks:['后端'], before:['java','mysql'],
      keywords:['mybatis','jpa','n+1','懒加载'],
      description:'对象与表的映射、懒加载与 N+1 查询；生成的 SQL 质量直接决定数据库压力。' },
    { id:'async', name:'异步与线程池', layer:'应用层', domain:'性能', status:'模糊', tracks:['后端'], before:['process','java'],
      keywords:['线程池','队列','拒绝策略','异步'],
      description:'用队列与线程池削峰解耦；池大小、拒绝策略、上下文传递都是调优点。' },
    { id:'microservice', name:'微服务拆分', layer:'应用层', domain:'可用性', status:'待补充', tracks:['后端'], before:['spring','rest'],
      keywords:['微服务','服务拆分','分布式事务'],
      description:'按业务边界拆服务；代价是分布式事务、链路追踪和成倍增加的运维复杂度。' },
    { id:'appcache', name:'应用缓存模式', layer:'应用层', domain:'性能', status:'待补充', tracks:['后端'], before:['redis','mysql'],
      keywords:['cache aside','缓存雪崩','击穿','穿透'],
      description:'Cache-Aside、读写穿透，以及缓存雪崩、击穿、穿透；一致性策略都在这一层。' },
    { id:'unit-test', name:'单元测试', layer:'应用层', domain:'研发效率', status:'待补充', tracks:['测试'], before:['java','python'],
      keywords:['单测','tdd','断言','覆盖率'],
      description:'针对函数与类的最小验证，TDD 的起点；覆盖率不等于质量，断言质量才是。' },
    { id:'api-test', name:'接口测试', layer:'应用层', domain:'研发效率', status:'待补充', tracks:['测试'], before:['rest','codereview'],
      keywords:['接口测试','契约','自动化回归'],
      description:'在接口层验证契约与边界条件，比 UI 测试稳定，也比单元测试更接近真实调用。' },
    { id:'perf-test', name:'性能压测', layer:'应用层', domain:'性能', status:'模糊', tracks:['测试'], before:['monitor','tcpip'],
      keywords:['压测','jmeter','k6','容量'],
      description:'用压测找吞吐与延迟的拐点：压测模型、JMeter / k6、容量评估与瓶颈定位。' },

    /* —— 中间件 —— */
    { id:'redis', name:'Redis', layer:'中间件', domain:'性能', status:'待补充', tracks:['后端','数据'], before:['mem','tcpip'],
      keywords:['缓存','setnx','rdb','aof','哨兵','cluster','淘汰','分布式锁','缓存穿透'],
      children:[
        { name:'数据结构', desc:'String、Hash、List、Set、ZSet 的适用场景。' },
        { name:'RDB 与 AOF', desc:'两种持久化的取舍与混合模式。' },
        { name:'过期与淘汰', desc:'TTL、惰性删除与 LRU/LFU 策略。' },
        { name:'主从与哨兵', desc:'故障转移与脑裂。' },
        { name:'Cluster 分片', desc:'16384 个槽与 MOVED 重定向。' },
        { name:'缓存穿透击穿雪崩', desc:'三种失效模式与对应解法。' }
      ],
      description:'内存数据结构服务：缓存、计数、分布式锁、排行榜；持久化与淘汰策略要懂。' },
    { id:'mq', name:'消息队列', layer:'中间件', domain:'可用性', status:'待补充', tracks:['后端'], before:['tcpip','fs'],
      keywords:['kafka','rabbitmq','rocketmq','消息','积压','死信','幂等','削峰','解耦'],
      children:[
        { name:'投递语义', desc:'至多一次、至少一次、恰好一次。' },
        { name:'顺序消息', desc:'分区内有序与全局有序的代价。' },
        { name:'消息积压', desc:'消费者扩容与临时转存。' },
        { name:'死信队列', desc:'重试失败后的兜底处理。' },
        { name:'事务消息', desc:'本地事务与消息发送的一致性。' }
      ],
      description:'异步解耦、削峰填谷；投递语义（至少一次 / 恰好一次）与积压处理是关键。' },
    { id:'lock', name:'分布式锁', layer:'中间件', domain:'一致性', status:'模糊', tracks:['后端'], before:['redis'],
      keywords:['setnx','redlock','zk','zookeeper','续期','看门狗','互斥'],
      children:[
        { name:'SETNX', desc:'最基础的互斥，过期时间必须设置。' },
        { name:'Redlock', desc:'多节点投票，争议与适用边界。' },
        { name:'锁续期', desc:'看门狗机制与业务超时。' },
        { name:'锁超时与误删', desc:'校验持有者，避免删掉别人的锁。' }
      ],
      description:'跨进程互斥：Redis SETNX、Redlock、ZooKeeper；锁超时与续期是难点。' },
    { id:'scheduler', name:'定时任务调度', layer:'中间件', domain:'可用性', status:'已掌握', tracks:['后端'], before:['spring','lock'],
      keywords:['cron','定时','quartz','幂等'],
      description:'cron、分布式调度与任务幂等；多实例部署时要防止同一个任务被重复执行。' },
    { id:'es', name:'Elasticsearch', layer:'中间件', domain:'可观测性', status:'模糊', tracks:['运维','数据'], before:['fs','index'],
      keywords:['elasticsearch','倒排索引','日志检索','分片'],
      description:'倒排索引与聚合查询，既做全文检索也做日志检索；分片与映射设计决定性能上限。' },
    { id:'rpc', name:'RPC 服务调用', layer:'中间件', domain:'网络通信', status:'待补充', tracks:['后端','网络'], before:['tcpip','rest'],
      keywords:['dubbo','grpc','序列化','服务发现'],
      description:'服务间高效调用：序列化、超时重试、负载均衡与服务发现。' },

    /* —— 数据层 —— */
    { id:'mysql', name:'MySQL', layer:'数据层', domain:'一致性', status:'已掌握', tracks:['后端','数据'], before:['fs','mem','index'],
      keywords:['innodb','b+树','b+tree','mvcc','慢查询','explain','数据库','关系型'],
      children:[
        { name:'B+ 树索引', desc:'InnoDB 的索引结构，范围查询快的原因。' },
        { name:'MVCC', desc:'多版本并发控制，读不加锁的实现。' },
        { name:'锁机制', desc:'行锁、间隙锁与死锁检测。' },
        { name:'慢查询与 EXPLAIN', desc:'定位全表扫描与回表。' },
        { name:'主从延迟', desc:'读写分离后读到旧数据的根因。' },
        { name:'分区表', desc:'按范围或哈希切分，缓解单表过大。' }
      ],
      description:'关系型存储的中枢：InnoDB 的 B+ 树索引、事务与锁，以及它们如何共同保证正确性。' },
    { id:'index', name:'索引与执行计划', layer:'数据层', domain:'性能', status:'模糊', tracks:['后端','数据'], before:['mem','fs'],
      keywords:['b+树','联合索引','最左前缀','覆盖索引','回表','explain','索引失效'],
      children:[
        { name:'B+ 树', desc:'节点存多个键，叶子串成链表，适合范围扫描。' },
        { name:'联合索引与最左前缀', desc:'(a,b,c) 能命中哪些查询。' },
        { name:'回表与覆盖索引', desc:'二级索引查主键再回聚簇索引的代价。' },
        { name:'执行计划 EXPLAIN', desc:'type、rows、Extra 怎么读。' },
        { name:'索引失效', desc:'函数、隐式转换、前导模糊匹配。' }
      ],
      description:'读 EXPLAIN、联合索引最左前缀、回表与覆盖索引；慢查询的第一现场。' },
    { id:'tx', name:'事务与隔离级别', layer:'数据层', domain:'一致性', status:'模糊', tracks:['后端','数据'], before:['mysql','lock'],
      keywords:['acid','隔离级别','mvcc','幻读','脏读','不可重复读'],
      children:[
        { name:'ACID', desc:'原子性、一致性、隔离性、持久性各保证什么。' },
        { name:'隔离级别', desc:'读未提交到串行化，各自解决什么问题。' },
        { name:'MVCC', desc:'快照读与当前读的区别。' },
        { name:'幻读与间隙锁', desc:'范围查询下的并发写入。' },
        { name:'长事务', desc:'回滚段膨胀、锁等待与连接占用。' }
      ],
      description:'ACID、MVCC、四种隔离级别与幻读；长事务是线上隐患。' },
    { id:'repl', name:'主从复制', layer:'数据层', domain:'可用性', status:'待补充', tracks:['运维','数据'], before:['mysql','fs'],
      keywords:['主从','读写分离','binlog','延迟'],
      description:'binlog 复制与读写分离；主从延迟会直接变成读到旧数据的线上问题。' },
    { id:'shard', name:'分库分表', layer:'数据层', domain:'性能', status:'模糊', tracks:['后端','数据'], before:['mysql','repl'],
      keywords:['分库分表','水平拆分','路由','扩容'],
      description:'数据量超过单机之后的水平拆分；路由、跨库查询与扩容是主要成本。' },
    { id:'nosql', name:'NoSQL 文档库', layer:'数据层', domain:'性能', status:'模糊', tracks:['数据'], before:['mysql'],
      keywords:['mongodb','文档数据库','最终一致'],
      description:'MongoDB 等文档存储；灵活的 schema 换来的是事务与一致性上的取舍。' },
    { id:'backup', name:'备份与恢复', layer:'数据层', domain:'可用性', status:'待补充', tracks:['运维','数据'], before:['fs','repl'],
      keywords:['备份','恢复','rpo','rto'],
      description:'备份不等于可恢复：定期演练、异地副本，以及 RPO / RTO 这两个必须说清楚的指标。' },

    /* —— 运行时与 OS —— */
    { id:'linux', name:'Linux 基础', layer:'运行时与OS', domain:'交付运维', status:'待补充', tracks:['运维'], before:[],
      keywords:['ubuntu','centos','systemd','权限','chmod','进程','top','shell'],
      children:[
        { name:'权限模型', desc:'rwx、umask、SUID 与 sudo。' },
        { name:'systemd', desc:'unit 文件、开机自启与日志。' },
        { name:'进程与信号', desc:'kill、SIGTERM 与优雅退出。' },
        { name:'网络命令', desc:'ss、iptables、tcpdump。' },
        { name:'包管理', desc:'apt 与 yum 的依赖解析。' },
        { name:'cron', desc:'定时任务与日志排查。' }
      ],
      description:'进程、权限、文件、systemd 和常用排查命令（top / ss / df / tail），一切运行时的底座。' },
    { id:'process', name:'进程 / 线程 / 协程', layer:'运行时与OS', domain:'性能', status:'模糊', tracks:['后端','运维'], before:['linux'],
      keywords:['进程','线程','协程','上下文切换'],
      description:'并发模型的最小单位；上下文切换与调度决定服务的吞吐上限。' },
    { id:'mem', name:'内存管理', layer:'运行时与OS', domain:'性能', status:'模糊', tracks:['后端','运维'], before:['linux'],
      keywords:['虚拟内存','页表','oom','泄漏'],
      description:'虚拟内存、页表、缺页与 OOM；内存泄漏和 GC 抖动往往在这里显形。' },
    { id:'fs', name:'文件系统与 IO', layer:'运行时与OS', domain:'可用性', status:'模糊', tracks:['运维'], before:['linux'],
      keywords:['文件系统','inode','页缓存','fsync'],
      description:'inode、页缓存、顺序写与 fsync；数据库和容器的持久化最终都落在这里。' },
    { id:'tcpip', name:'TCP/IP 与 Socket', layer:'运行时与OS', domain:'网络通信', status:'待补充', tracks:['后端','运维','网络'], before:['linux'],
      keywords:['三次握手','四次挥手','time_wait','粘包','拥塞控制','nagle','socket','tcp','udp'],
      children:[
        { name:'三次握手', desc:'为什么不是两次，SYN 队列与半连接。' },
        { name:'四次挥手与 TIME_WAIT', desc:'主动关闭方的等待与端口耗尽。' },
        { name:'拥塞控制', desc:'慢启动、拥塞避免与快速重传。' },
        { name:'粘包与拆包', desc:'TCP 是字节流，边界要自己定。' },
        { name:'Socket 编程', desc:'阻塞、非阻塞与 IO 多路复用。' }
      ],
      description:'三次握手、TIME_WAIT、粘包与背压；描述网络问题时的通用语言。' },
    { id:'jvm', name:'JVM 与 GC', layer:'运行时与OS', domain:'性能', status:'模糊', tracks:['后端'], before:['java','mem'],
      keywords:['垃圾回收','gc','类加载','堆','oom'],
      description:'类加载、堆与栈、GC 算法与调优；OOM 和 Full GC 是 Java 服务的常客。' },
    { id:'docker', name:'容器 Docker', layer:'运行时与OS', domain:'交付运维', status:'已掌握', tracks:['运维'], before:['linux','fs','tcpip'],
      keywords:['镜像','容器','dockerfile','namespace','cgroup','compose'],
      children:[
        { name:'镜像分层', desc:'每条指令一层，复用与缓存。' },
        { name:'Dockerfile', desc:'多阶段构建与最小镜像。' },
        { name:'网络模式', desc:'bridge、host、none 与自定义网络。' },
        { name:'数据卷', desc:'volume 与 bind mount 的区别。' },
        { name:'构建缓存', desc:'为什么改一行代码要重装依赖。' }
      ],
      description:'镜像分层、namespace 与 cgroups 隔离；构建缓存和镜像体积直接影响发布速度。' },
    { id:'k8s', name:'Kubernetes 编排', layer:'运行时与OS', domain:'交付运维', status:'待补充', tracks:['运维'], before:['docker','tcpip'],
      keywords:['kubernetes','pod','deployment','service','ingress','hpa','探针','编排','k8s'],
      children:[
        { name:'Pod 与 Deployment', desc:'最小调度单元与副本管理。' },
        { name:'Service', desc:'ClusterIP、NodePort、LoadBalancer。' },
        { name:'Ingress', desc:'七层入口与证书。' },
        { name:'健康探针', desc:'liveness 与 readiness 的区别。' },
        { name:'HPA 弹性伸缩', desc:'按 CPU 或自定义指标扩缩容。' },
        { name:'ConfigMap 与 Secret', desc:'配置与密钥的注入方式。' }
      ],
      description:'容器编排：调度、探针、滚动更新与弹性伸缩，是运维自动化的分水岭。' },

    /* —— 基础设施 —— */
    { id:'cloud', name:'云服务器与 VPC', layer:'基础设施', domain:'可用性', status:'待补充', tracks:['运维'], before:[],
      keywords:['ec2','vpc','安全组','可用区'],
      description:'计算、网络、存储与安全组；多可用区部署是可用性的物理基础。' },
    { id:'cicd', name:'CI/CD 流水线', layer:'基础设施', domain:'交付运维', status:'已掌握', tracks:['运维','测试'], before:['git','docker'],
      keywords:['ci','cd','ci cd','ci/cd','持续集成','持续交付','持续部署','pipeline','流水线','jenkins','gitlab ci','github actions','自动发布'],
      children:[
        { name:'持续集成 CI', desc:'每次提交自动构建并跑测试，尽早发现回归。' },
        { name:'持续交付 CD', desc:'主分支随时可发布，发布动作仍由人确认。' },
        { name:'持续部署', desc:'通过自动化把变更直接送上生产，依赖监控与回滚。' },
        { name:'流水线编排', desc:'构建、测试、镜像、部署的串并行与产物传递。' },
        { name:'制品与版本', desc:'镜像仓库、语义化版本与可追溯的构建产物。' },
        { name:'灰度与回滚', desc:'按流量比例切流，出问题能一键退回上一个版本。' }
      ],
      description:'从提交到发布的自动化流水线：构建、测试、镜像、灰度与回滚。' },
    { id:'git', name:'Git 与分支模型', layer:'基础设施', domain:'研发效率', status:'已掌握', tracks:['后端','前端'], before:[],
      keywords:['分支','merge','rebase','cherry-pick','gitflow','hook','版本控制'],
      children:[
        { name:'分支模型', desc:'GitFlow、trunk-based 与发布分支。' },
        { name:'merge 与 rebase', desc:'历史形状与冲突处理。' },
        { name:'cherry-pick', desc:'把单个提交搬到另一条分支。' },
        { name:'冲突解决', desc:'三方合并与 ours / theirs。' },
        { name:'Git Hooks', desc:'提交前检查与自动化。' }
      ],
      description:'分支模型、合并与变基、rebase 与 cherry-pick；团队协作的基本契约。' },
    { id:'codereview', name:'代码评审', layer:'基础设施', domain:'研发效率', status:'已掌握', tracks:['后端','测试'], before:['git'],
      keywords:['代码评审','cr','pull request'],
      description:'变更评审是成本最低的缺陷拦截点；评审清单比个人经验更可靠。' },
    { id:'monitor', name:'指标监控', layer:'基础设施', domain:'可观测性', status:'待补充', tracks:['运维','测试'], before:['linux','spring'],
      keywords:['prometheus','grafana','指标','promql','告警','监控'],
      children:[
        { name:'指标类型', desc:'Counter、Gauge、Histogram。' },
        { name:'PromQL', desc:'rate、sum by、直方图分位数。' },
        { name:'采集与导出器', desc:'node_exporter 与应用埋点。' },
        { name:'告警规则', desc:'for 持续时间与抑制。' },
        { name:'看板', desc:'RED 与 USE 两种视角。' }
      ],
      description:'RED / USE 指标、Prometheus 采集与告警规则；先看见问题，才谈得上修复。' },
    { id:'logging', name:'日志与链路追踪', layer:'基础设施', domain:'可观测性', status:'待补充', tracks:['后端','运维'], before:['linux','spring'],
      keywords:['日志','traceid','elk','链路追踪','采样','filebeat'],
      children:[
        { name:'结构化日志', desc:'JSON 字段与可检索性。' },
        { name:'TraceID 链路', desc:'跨服务串联一次请求。' },
        { name:'日志采集', desc:'Filebeat、Fluent Bit 与缓冲。' },
        { name:'采样策略', desc:'按比例或按错误采样。' },
        { name:'日志检索', desc:'ES 索引与保留周期。' }
      ],
      description:'结构化日志、TraceID 串联、采样策略；排查跨服务问题时几乎唯一的线索。' },
    { id:'alert', name:'告警与值班', layer:'基础设施', domain:'可观测性', status:'模糊', tracks:['运维'], before:['monitor','logging'],
      keywords:['告警','值班','slo','错误预算'],
      description:'告警分级、抑制与升级，避免告警疲劳；SLO 与错误预算决定该不该把人叫起来。' },
    { id:'iac', name:'IaC 自动化配置', layer:'基础设施', domain:'交付运维', status:'模糊', tracks:['运维'], before:['cloud','k8s'],
      keywords:['terraform','ansible','基础设施即代码'],
      description:'用代码描述基础设施（Terraform / Ansible），让环境可复制、可回滚、可评审。' },

    /* —— 编程语言（按使用位置摆放） —— */
    { id:'js-ts', name:'JavaScript / TypeScript', layer:'用户与客户端', domain:'研发效率', status:'待补充', tracks:['前端','语言','移动端'], before:['browser'],
      keywords:['javascript','typescript','js','ts','前端语言'],
      description:'浏览器、Node 与小程序共用的语言；类型系统、异步模型和运行时差异是主要门槛。' },
    { id:'c-cpp', name:'C / C++', layer:'应用层', domain:'性能', status:'待补充', tracks:['后端','语言','嵌入式'], before:['mem','process'],
      keywords:['c','cpp','c++','指针','内存'],
      description:'贴近内存的语言，操作系统、嵌入式和高性能组件的通用底座；指针与生命周期是核心。' },
    { id:'go', name:'Go', layer:'应用层', domain:'研发效率', status:'模糊', tracks:['后端','语言'], before:['process','java'],
      keywords:['golang','goroutine','协程'],
      description:'为并发与部署而设计：goroutine、channel 与静态二进制，云原生工具链的主力语言。' },
    { id:'rust', name:'Rust', layer:'应用层', domain:'研发效率', status:'模糊', tracks:['后端','语言'], before:['c-cpp','mem'],
      keywords:['所有权','借用检查','cargo'],
      description:'用所有权和借用检查在编译期消灭内存错误；学习曲线陡，系统级场景回报高。' },
    { id:'sql', name:'SQL', layer:'数据层', domain:'一致性', status:'待补充', tracks:['数据','后端','语言'], before:['mysql'],
      keywords:['select','join','group by','窗口函数','查询'],
      children:[
        { name:'连接 JOIN', desc:'内连接、外连接与笛卡尔积。' },
        { name:'聚合与分组', desc:'GROUP BY 与 HAVING。' },
        { name:'窗口函数', desc:'排名、累计与分区。' },
        { name:'子查询', desc:'相关子查询与 EXISTS。' },
        { name:'执行计划', desc:'扫描方式与代价估算。' }
      ],
      description:'声明式查询语言：连接、聚合、窗口函数，以及为什么这么写会走索引。' },
    { id:'asm', name:'汇编语言', layer:'运行时与OS', domain:'性能', status:'模糊', tracks:['语言','嵌入式','硬件'], before:['isa'],
      keywords:['assembly','反汇编','指令'],
      description:'与指令集一一对应；读反汇编、看崩溃现场、写启动代码时用得上。' },

    /* —— 网络协议 —— */
    { id:'ethernet-wifi', name:'以太网与 Wi-Fi', layer:'接入层', domain:'网络通信', status:'待补充', tracks:['网络','硬件'], before:[],
      description:'链路层与物理层：帧、MAC、CSMA/CA、无线频段与漫游，是把比特送出去的第一段路。' },
    { id:'http2-quic', name:'HTTP/2 与 HTTP/3', layer:'接入层', domain:'网络通信', status:'模糊', tracks:['网络','前端','后端'], before:['tls','rest'],
      keywords:['http2','http3','quic','多路复用'],
      description:'多路复用、头部压缩与 QUIC 上的 0-RTT；HTTP/3 用 UDP 绕开队头阻塞。' },
    { id:'mqtt', name:'MQTT / CoAP', layer:'中间件', domain:'可用性', status:'模糊', tracks:['嵌入式','网络','后端'], before:['mq','tcpip'],
      keywords:['物联网','发布订阅','qos','iot'],
      description:'物联网的轻量消息协议：发布订阅、QoS 等级与断线重连，适合弱网和低功耗设备。' },

    /* —— 嵌入式与设备 —— */
    { id:'mcu', name:'单片机 / MCU', layer:'嵌入式与设备', domain:'性能', status:'模糊', tracks:['嵌入式','硬件'], before:['c-cpp'],
      keywords:['stm32','esp32','gpio','中断','时钟','单片机'],
      children:[
        { name:'处理器核', desc:'ARM Cortex-M 与主频。' },
        { name:'GPIO', desc:'电平、上下拉与复用功能。' },
        { name:'中断', desc:'中断向量表与优先级。' },
        { name:'时钟与低功耗', desc:'PLL、睡眠模式与唤醒。' },
        { name:'外设', desc:'定时器、ADC 与串口。' }
      ],
      description:'把处理器核、存储和外设集成到一颗芯片；STM32、ESP32 是最常见的入门板。' },
    { id:'rtos', name:'RTOS 与实时性', layer:'嵌入式与设备', domain:'可用性', status:'模糊', tracks:['嵌入式'], before:['mcu','process'],
      keywords:['freertos','rt-thread','实时','优先级反转','看门狗'],
      children:[
        { name:'任务调度', desc:'优先级抢占与时间片。' },
        { name:'优先级反转', desc:'互斥量与优先级继承。' },
        { name:'信号量与互斥', desc:'同步与资源保护。' },
        { name:'看门狗', desc:'喂狗与异常复位。' },
        { name:'中断延迟', desc:'实时性的关键指标。' }
      ],
      description:'抢占式调度、优先级反转与确定性时延；FreeRTOS / RT-Thread 是常见选择。' },
    { id:'io-bus', name:'总线与接口', layer:'嵌入式与设备', domain:'网络通信', status:'模糊', tracks:['嵌入式','硬件'], before:['mcu'],
      keywords:['i2c','spi','uart','gpio','时序','总线'],
      children:[
        { name:'I2C', desc:'两根线、地址寻址与时钟拉伸。' },
        { name:'SPI', desc:'四根线、全双工与片选。' },
        { name:'UART', desc:'波特率、起始位与校验。' },
        { name:'GPIO', desc:'通用输入输出的电气特性。' },
        { name:'时序与电平', desc:'上拉电阻、3.3V 与 5V。' }
      ],
      description:'芯片与外设之间的方言：I2C、SPI、UART 的速率、时序、上拉电阻与地址冲突。' },
    { id:'sensor', name:'传感器与执行器', layer:'嵌入式与设备', domain:'可用性', status:'模糊', tracks:['嵌入式','硬件'], before:['io-bus'],
      keywords:['adc','采样','滤波','标定'],
      description:'把物理量变成电信号（或反过来）；采样率、滤波与标定决定数据质量。' },
    { id:'firmware', name:'固件与烧录', layer:'嵌入式与设备', domain:'交付运维', status:'待补充', tracks:['嵌入式'], before:['mcu','c-cpp'],
      keywords:['bootloader','ota','烧录','固件'],
      description:'Bootloader、OTA 升级与变砖风险；量产还要考虑产测、序列号与回滚。' },
    { id:'android', name:'Android 系统', layer:'嵌入式与设备', domain:'交付运维', status:'模糊', tracks:['移动端','嵌入式'], before:['linux'],
      keywords:['安卓','art','apk','应用框架'],
      description:'基于 Linux 内核的移动系统：应用框架、ART 运行时、权限模型与碎片化适配。' },

    /* —— 硬件与外设 —— */
    { id:'cpu', name:'CPU 与流水线', layer:'硬件与外设', domain:'性能', status:'模糊', tracks:['硬件'], before:['isa'],
      keywords:['流水线','乱序','分支预测','缓存','多核','主频','处理器'],
      children:[
        { name:'指令流水线', desc:'取指、译码、执行、写回。' },
        { name:'乱序执行', desc:'依赖分析与重排序缓冲。' },
        { name:'分支预测', desc:'预测失败时的流水线冲刷。' },
        { name:'缓存层级', desc:'L1 / L2 / L3 与命中率。' },
        { name:'多核与超线程', desc:'物理核、逻辑核与并行度。' }
      ],
      description:'取指-译码-执行、流水线与乱序、缓存层级；性能优化的物理边界。' },
    { id:'gpu', name:'GPU 与并行计算', layer:'硬件与外设', domain:'性能', status:'模糊', tracks:['硬件'], before:['cpu'],
      keywords:['cuda','显存','张量','渲染','并行计算','显卡'],
      children:[
        { name:'流处理器', desc:'大量 SIMT 核心并行执行。' },
        { name:'显存与带宽', desc:'为什么显存比算力更容易成为瓶颈。' },
        { name:'CUDA', desc:'线程块、网格与共享内存。' },
        { name:'渲染管线', desc:'顶点、光栅化、片元。' },
        { name:'张量核心', desc:'矩阵乘加与混合精度。' }
      ],
      description:'大量简单核心加高带宽显存；图形渲染与通用计算（CUDA）两条主线。' },
    { id:'dram-ssd', name:'内存与存储', layer:'硬件与外设', domain:'性能', status:'待补充', tracks:['硬件'], before:['cpu'],
      keywords:['ddr','ssd','nand','内存条','硬盘'],
      description:'DDR 内存条、SSD 主控与 NAND、机械硬盘；容量之外还有延迟、寿命与接口。' },
    { id:'motherboard', name:'主板与总线', layer:'硬件与外设', domain:'可用性', status:'模糊', tracks:['硬件'], before:['cpu','dram-ssd'],
      keywords:['pcie','usb','芯片组','插槽'],
      description:'PCIe、USB、芯片组与供电；插槽规格和兼容性是装机的第一道门槛。' },
    { id:'power-cooling', name:'电源与散热', layer:'硬件与外设', domain:'可用性', status:'模糊', tracks:['硬件'], before:['motherboard'],
      keywords:['电源','散热','风道','80plus'],
      description:'功率预算、80PLUS 认证、风道与噪声；高负载降频往往来自散热而不是芯片。' },
    { id:'pc-build', name:'装机与选型', layer:'硬件与外设', domain:'交付运维', status:'待补充', tracks:['硬件'], before:['motherboard','power-cooling'],
      keywords:['装机','配置单','兼容性'],
      description:'按用途配预算：CPU、显卡、内存、存储怎么取舍，接口与尺寸怎么不打架。' },

    /* —— 芯片与制造 —— */
    { id:'isa', name:'指令集与微架构', layer:'芯片与制造', domain:'性能', status:'模糊', tracks:['硬件','嵌入式'], before:[],
      keywords:['x86','arm','riscv','指令集','汇编','微架构'],
      children:[
        { name:'x86', desc:'复杂指令集与向后兼容。' },
        { name:'ARM', desc:'精简指令集与移动端生态。' },
        { name:'RISC-V', desc:'开源指令集与可扩展性。' },
        { name:'寻址方式', desc:'寄存器、立即数与内存寻址。' },
        { name:'寄存器模型', desc:'通用寄存器与调用约定。' }
      ],
      description:'x86、ARM、RISC-V 的指令编码与执行模型，软件兼容性的根。' },
    { id:'eda', name:'EDA 与芯片设计', layer:'芯片与制造', domain:'研发效率', status:'模糊', tracks:['硬件'], before:['isa'],
      keywords:['芯片设计','综合','布局布线','流片'],
      description:'用代码 / 原理图描述电路，综合、布局布线与时序收敛；流片前唯一的验证机会。' },
    { id:'semi', name:'半导体工艺与制程', layer:'芯片与制造', domain:'性能', status:'模糊', tracks:['硬件'], before:[],
      keywords:['光刻','制程','nm','良率','晶圆','半导体'],
      children:[
        { name:'光刻', desc:'光源波长与分辨率极限。' },
        { name:'制程节点', desc:'7nm、5nm 到底代表什么。' },
        { name:'良率', desc:'缺陷密度与成本。' },
        { name:'晶圆制造', desc:'从设计到流片的流程。' }
      ],
      description:'光刻、制程节点与良率；从设计到晶圆，是算力供给的物理上限。' },
    { id:'package', name:'封装与测试', layer:'芯片与制造', domain:'可用性', status:'模糊', tracks:['硬件'], before:['semi'],
      keywords:['封装','测试','良率','引脚'],
      description:'从晶圆切割到封装、引脚与散热；测试覆盖率和良率直接决定成本。' }
  ];
