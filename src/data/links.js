/* ============================================================
 * 知识点数据：links
 * source / target 必须是 nodes 里的 id；relation 是关系短语
 * 关系会显示在 3D 连线中间，所以请用"动词 + 名词"的短句
 * ============================================================ */
window.KB = window.KB || {};
window.KB.LINKS = [
    /* 客户端 → 接入 */
    { source:'browser', target:'spa', relation:'承载渲染' },
    { source:'browser', target:'http-cache', relation:'使用缓存' },
    { source:'browser', target:'websocket', relation:'建立长连' },
    { source:'http-cache', target:'cdn', relation:'命中与回源' },
    { source:'spa', target:'rest', relation:'发起请求' },
    { source:'mobile', target:'rest', relation:'复用契约' },
    { source:'mobile', target:'cdn', relation:'下载资源' },
    { source:'websocket', target:'tls', relation:'WSS 加密' },

    /* 接入层内部 */
    { source:'dns', target:'lb', relation:'解析入口' },
    { source:'dns', target:'cdn', relation:'CNAME 指向' },
    { source:'cdn', target:'nginx', relation:'静态回源' },
    { source:'lb', target:'nginx', relation:'分发流量' },
    { source:'waf', target:'lb', relation:'清洗流量' },
    { source:'waf', target:'tls', relation:'解密后检测' },
    { source:'tls', target:'nginx', relation:'终止加密' },
    { source:'nginx', target:'gateway', relation:'转发请求' },
    { source:'tls', target:'secrets', relation:'读取证书' },

    /* 网关与认证 */
    { source:'gateway', target:'spring', relation:'路由转发' },
    { source:'gateway', target:'authn', relation:'委托认证' },
    { source:'gateway', target:'ratelimit', relation:'执行限流' },
    { source:'authn', target:'authz', relation:'认证后授权' },
    { source:'authn', target:'secrets', relation:'校验签名' },
    { source:'authz', target:'session', relation:'读取角色' },
    { source:'session', target:'redis', relation:'存储会话' },
    { source:'ratelimit', target:'redis', relation:'计数窗口' },

    /* 应用层 */
    { source:'java', target:'spring', relation:'语言支撑' },
    { source:'spring', target:'orm', relation:'数据访问' },
    { source:'orm', target:'mysql', relation:'执行 SQL' },
    { source:'spring', target:'mq', relation:'发布事件' },
    { source:'spring', target:'async', relation:'派发任务' },
    { source:'async', target:'process', relation:'线程调度' },
    { source:'python', target:'rest', relation:'实现接口' },
    { source:'python', target:'mq', relation:'消费消息' },
    { source:'microservice', target:'spring', relation:'服务实现' },
    { source:'microservice', target:'rpc', relation:'服务间调用' },
    { source:'rpc', target:'tcpip', relation:'基于长连接' },
    { source:'appcache', target:'redis', relation:'缓存读写' },
    { source:'appcache', target:'mysql', relation:'未命中回源' },
    { source:'unit-test', target:'java', relation:'验证逻辑' },
    { source:'unit-test', target:'cicd', relation:'门禁检查' },
    { source:'api-test', target:'rest', relation:'验证契约' },
    { source:'api-test', target:'cicd', relation:'自动化回归' },
    { source:'perf-test', target:'monitor', relation:'压测观测' },
    { source:'perf-test', target:'tcpip', relation:'连接与吞吐' },

    /* 中间件 */
    { source:'mq', target:'fs', relation:'消息落盘' },
    { source:'lock', target:'redis', relation:'实现互斥' },
    { source:'lock', target:'tx', relation:'跨事务协调' },
    { source:'scheduler', target:'mq', relation:'投递定时任务' },
    { source:'scheduler', target:'lock', relation:'防止重复执行' },
    { source:'mq', target:'es', relation:'日志管道' },

    /* 数据层 */
    { source:'mysql', target:'index', relation:'使用索引' },
    { source:'mysql', target:'tx', relation:'保证一致性' },
    { source:'mysql', target:'repl', relation:'复制同步' },
    { source:'repl', target:'backup', relation:'提供备份源' },
    { source:'shard', target:'mysql', relation:'水平切分' },
    { source:'shard', target:'orm', relation:'分片路由' },
    { source:'nosql', target:'es', relation:'文档检索' },
    { source:'nosql', target:'shard', relation:'水平分片' },

    /* 运行时与 OS */
    { source:'linux', target:'process', relation:'调度进程' },
    { source:'linux', target:'fs', relation:'提供文件系统' },
    { source:'linux', target:'tcpip', relation:'网络栈' },
    { source:'process', target:'mem', relation:'分配内存' },
    { source:'docker', target:'linux', relation:'依赖内核隔离' },
    { source:'k8s', target:'docker', relation:'编排容器' },
    { source:'jvm', target:'mem', relation:'堆内存管理' },
    { source:'jvm', target:'docker', relation:'运行于容器' },
    { source:'java', target:'jvm', relation:'编译运行' },
    { source:'fs', target:'backup', relation:'文件级备份' },

    /* 基础设施 */
    { source:'cloud', target:'linux', relation:'提供计算资源' },
    { source:'k8s', target:'cloud', relation:'部署在云上' },
    { source:'backup', target:'cloud', relation:'归档到对象存储' },
    { source:'cicd', target:'docker', relation:'构建镜像' },
    { source:'git', target:'cicd', relation:'触发流水线' },
    { source:'codereview', target:'git', relation:'评审变更' },
    { source:'codereview', target:'cicd', relation:'通过后合入' },
    { source:'monitor', target:'jvm', relation:'采集 JVM 指标' },
    { source:'logging', target:'es', relation:'写入日志' },
    { source:'logging', target:'monitor', relation:'关联分析' },
    { source:'alert', target:'monitor', relation:'告警规则触发' },
    { source:'alert', target:'logging', relation:'异常日志告警' },
    { source:'iac', target:'cloud', relation:'声明式建资源' },
    { source:'iac', target:'k8s', relation:'声明部署清单' },
    { source:'cicd', target:'k8s', relation:'发布部署' },
    { source:'index', target:'mem', relation:'页缓存加速' },

    /* 编程语言 */
    { source:'js-ts', target:'browser', relation:'运行环境' },
    { source:'js-ts', target:'spa', relation:'开发语言' },
    { source:'c-cpp', target:'mem', relation:'直接管理内存' },
    { source:'c-cpp', target:'process', relation:'系统调用' },
    { source:'c-cpp', target:'mcu', relation:'固件开发' },
    { source:'go', target:'process', relation:'协程调度' },
    { source:'go', target:'microservice', relation:'服务开发' },
    { source:'rust', target:'mem', relation:'所有权与借用' },
    { source:'rust', target:'c-cpp', relation:'替代场景' },
    { source:'sql', target:'mysql', relation:'查询语言' },
    { source:'sql', target:'index', relation:'走索引' },
    { source:'asm', target:'isa', relation:'对应指令集' },
    { source:'asm', target:'process', relation:'调用约定' },

    /* 网络协议 */
    { source:'ethernet-wifi', target:'tcpip', relation:'承载 IP' },
    { source:'ethernet-wifi', target:'motherboard', relation:'网卡接口' },
    { source:'http2-quic', target:'tls', relation:'基于 TLS / QUIC' },
    { source:'http2-quic', target:'rest', relation:'传输协议' },
    { source:'http2-quic', target:'tcpip', relation:'传输层' },
    { source:'mqtt', target:'mq', relation:'轻量消息' },

    /* 嵌入式与设备 */
    { source:'mcu', target:'cpu', relation:'内置处理器核' },
    { source:'mcu', target:'io-bus', relation:'外设接口' },
    { source:'mcu', target:'firmware', relation:'运行固件' },
    { source:'rtos', target:'process', relation:'任务调度' },
    { source:'rtos', target:'mcu', relation:'运行于 MCU' },
    { source:'io-bus', target:'sensor', relation:'读取传感器' },
    { source:'sensor', target:'mqtt', relation:'数据上报' },
    { source:'firmware', target:'rtos', relation:'引导启动' },
    { source:'android', target:'linux', relation:'基于内核' },
    { source:'android', target:'mobile', relation:'承载应用' },

    /* 硬件与外设 */
    { source:'cpu', target:'isa', relation:'实现指令集' },
    { source:'cpu', target:'mem', relation:'缓存访问内存' },
    { source:'gpu', target:'cpu', relation:'协同计算' },
    { source:'gpu', target:'dram-ssd', relation:'显存与带宽' },
    { source:'dram-ssd', target:'mem', relation:'物理载体' },
    { source:'dram-ssd', target:'fs', relation:'块设备' },
    { source:'motherboard', target:'cpu', relation:'承载 CPU' },
    { source:'motherboard', target:'dram-ssd', relation:'连接内存硬盘' },
    { source:'power-cooling', target:'motherboard', relation:'为整机供电' },
    { source:'power-cooling', target:'cpu', relation:'压制功耗' },
    { source:'pc-build', target:'motherboard', relation:'选主板' },
    { source:'pc-build', target:'power-cooling', relation:'配电源散热' },

    /* 芯片与制造 */
    { source:'eda', target:'isa', relation:'实现指令集' },
    { source:'eda', target:'semi', relation:'面向制程设计' },
    { source:'semi', target:'package', relation:'前道到后道' },
    { source:'package', target:'motherboard', relation:'焊接到主板' }
  ];
