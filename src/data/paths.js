/* ============================================================
 * 学习链路：从一个目标出发，按顺序给出完整的学习步骤
 * ------------------------------------------------------------
 * 每一步：
 *   { phase:'阶段名', node:'节点id', title:'这一步学什么', note:'怎么做 / 做到什么程度' }
 *   { phase:'阶段名', task:true, title:'动手任务', note:'...' }   // 不在图里的实操步骤
 * phase 相同的步骤会被归到一个阶段标题下。
 * node 必须是 nodes*.js 里存在的 id；task 步骤没有节点。
 * ============================================================ */
window.KB = window.KB || {};
KB.PATHS = [

  {
    id: 'security',
    name: '网络安全',
    level: '零基础 → 能独立做安全加固与应急',
    desc: '从 Linux 和网络基础开始，先把实验环境搭起来，再按"防御 → 攻击 → 运营"的顺序推进。安全不是背漏洞，是理解系统怎么被攻破的。',
    steps: [
      { phase: '一、打地基', node: 'linux', title: 'Linux 基础', note: '文件系统、权限、进程、服务、日志。安全工具的 90% 跑在 Linux 上。' },
      { phase: '一、打地基', node: 'shell', title: 'Shell 与脚本', note: '会写管道和循环，能批量处理日志、自动化排查。' },
      { phase: '一、打地基', task: true, title: '装虚拟机，搭实验环境', note: 'VMware / VirtualBox 装 Ubuntu + Kali，配好仅主机网络；所有攻防练习只在虚拟机里做。' },
      { phase: '二、懂网络', node: 'osi-model', title: '网络分层模型', note: '知道每一层能出什么事，排障时先定位层。' },
      { phase: '二、懂网络', node: 'tcpip', title: 'TCP/IP 与 Socket', note: '三次握手、端口、连接状态；会看 ss / netstat。' },
      { phase: '二、懂网络', node: 'network-debug', title: '抓包与网络排查', note: 'Wireshark 抓一次登录流量，tcpdump 在服务器上抓包。' },
      { phase: '二、懂网络', node: 'http2-quic', title: 'HTTP 协议', note: '请求/响应、Cookie、缓存、CORS；安全漏洞大多发生在这一层。' },
      { phase: '三、Web 攻防', node: 'web-security', title: 'Web 安全', note: 'OWASP Top 10 逐条过：SQL 注入、XSS、CSRF、SSRF、文件上传。' },
      { phase: '三、Web 攻防', node: 'threat-model', title: '威胁建模', note: '拿到一个系统，先画数据流、列信任边界、找攻击面。' },
      { phase: '三、Web 攻防', node: 'pentest', title: '渗透测试与漏洞管理', note: '在授权范围内做：信息收集 → 漏洞验证 → 报告 → 修复复测。' },
      { phase: '四、密码与身份', node: 'cryptography', title: '密码学', note: '对称/非对称、哈希、签名、PKI；知道每种算法的适用边界。' },
      { phase: '四、密码与身份', node: 'tls', title: 'TLS 与证书', note: '握手过程、证书链、常见配置错误；用 openssl 亲手验一次。' },
      { phase: '四、密码与身份', node: 'authn', title: '认证', note: '密码存储、MFA、OAuth2 / OIDC、JWT 的坑。' },
      { phase: '四、密码与身份', node: 'authz', title: '授权', note: 'RBAC / ABAC、越权漏洞（水平/垂直）怎么产生。' },
      { phase: '五、防护与运营', node: 'waf', title: 'WAF / DDoS 防护', note: '规则怎么配、误杀怎么调；DDoS 的分层清洗思路。' },
      { phase: '五、防护与运营', node: 'supply-chain', title: '供应链安全', note: '依赖投毒、镜像签名、SBOM；CI 里怎么卡住。' },
      { phase: '五、防护与运营', node: 'incident', title: '故障响应与复盘', note: '安全事件按应急流程走：隔离、取证、恢复、复盘。' }
    ]
  },

  {
    id: 'backend',
    name: '后端开发',
    level: '零基础 → 能独立交付一个线上服务',
    desc: '语言只是入口。真正决定水平的是：数据结构、数据库、并发、网络，以及把服务部署上线并盯住它的能力。',
    steps: [
      { phase: '一、编程底子', node: 'data-structures', title: '数据结构', note: '数组/链表/哈希/树/堆，知道每种结构适合什么场景。' },
      { phase: '一、编程底子', node: 'algorithms', title: '算法设计', note: '排序、二分、递归、动态规划；刷 100 题左右形成手感。' },
      { phase: '一、编程底子', node: 'git', title: 'Git 与分支模型', note: '每天提交，学会分支、合并、冲突处理。' },
      { phase: '二、系统与网络', node: 'linux', title: 'Linux 基础', note: '服务器就是 Linux；会看日志、查进程、改配置。' },
      { phase: '二、系统与网络', node: 'tcpip', title: 'TCP/IP 与 Socket', note: '连接怎么建立、为什么会有 TIME_WAIT。' },
      { phase: '二、系统与网络', node: 'http2-quic', title: 'HTTP 协议', note: '状态码、头部、缓存、长连接；用 curl 调一遍自己的接口。' },
      { phase: '三、语言与框架', node: 'java', title: 'Java 语言与并发', note: '集合、泛型、JUC、JVM 内存模型；也可以换 Go，但并发要学透。' },
      { phase: '三、语言与框架', node: 'spring', title: 'Spring Boot', note: 'IoC、AOP、事务、自动装配；能独立写一个 CRUD 服务。' },
      { phase: '三、语言与框架', node: 'rest', title: 'REST 与 API 契约', note: '接口设计、错误码、版本化、OpenAPI 文档。' },
      { phase: '四、数据', node: 'sql', title: 'SQL', note: 'JOIN、聚合、子查询；先会写，再谈优化。' },
      { phase: '四、数据', node: 'mysql', title: 'MySQL', note: '索引、事务隔离、锁、主从；用 explain 看执行计划。' },
      { phase: '四、数据', node: 'redis', title: 'Redis', note: '缓存穿透/击穿/雪崩、持久化、分布式锁的正确用法。' },
      { phase: '四、数据', node: 'mq', title: '消息队列', note: '削峰、解耦、顺序与幂等；至少跑通一次生产-消费。' },
      { phase: '五、上线', node: 'docker', title: '容器 Docker', note: '镜像、容器、网络、卷；把自己的服务打成镜像。' },
      { phase: '五、上线', node: 'k8s', title: 'Kubernetes 编排', note: 'Pod / Deployment / Service / Ingress；先会用再懂原理。' },
      { phase: '五、上线', node: 'cicd', title: 'CI/CD 流水线', note: '提交即构建、测试、部署；流水线挂了要能自己修。' },
      { phase: '五、上线', node: 'monitor', title: '指标监控', note: 'QPS、延迟、错误率、资源水位；告警要能叫醒人。' },
      { phase: '五、上线', node: 'logging', title: '日志与链路追踪', note: '结构化日志、traceId 串起一次请求。' }
    ]
  },

  {
    id: 'frontend',
    name: '前端开发',
    level: '零基础 → 能独立做完整 Web 应用',
    desc: '从页面结构和样式开始，到框架、工程化、性能与安全。前端的天花板在浏览器原理和工程能力，不在背 API。',
    steps: [
      { phase: '一、基础', node: 'html-css', title: 'HTML / CSS', note: '语义化标签、盒模型、Flex/Grid、响应式；手写 5 个页面。' },
      { phase: '一、基础', node: 'js-ts', title: 'JavaScript / TypeScript', note: '作用域、闭包、原型、异步；TS 的类型要能用起来。' },
      { phase: '一、基础', node: 'browser', title: '浏览器运行时', note: '渲染流程、事件循环、存储、同源策略。' },
      { phase: '二、与后端打交道', node: 'http2-quic', title: 'HTTP 协议', note: '请求方法、状态码、缓存头、跨域。' },
      { phase: '二、与后端打交道', node: 'http-cache', title: 'HTTP 缓存', note: '强缓存 / 协商缓存，发版后用户为什么还看到旧页面。' },
      { phase: '二、与后端打交道', node: 'rest', title: 'REST 与 API 契约', note: '和 backend 对齐接口，处理错误与加载态。' },
      { phase: '三、框架与工程化', node: 'frontend-framework', title: '前端框架', note: '组件、状态、路由；选一个（Vue / React）做透。' },
      { phase: '三、框架与工程化', node: 'build-tool', title: '前端构建', note: 'Vite / Webpack、分包、环境变量、构建产物分析。' },
      { phase: '三、框架与工程化', node: 'fe-performance', title: '前端性能', note: 'LCP / INP / CLS，图片、字体、懒加载逐项优化。' },
      { phase: '四、交付', node: 'spa', title: '单页应用 SPA', note: '路由、鉴权、部署到静态托管或 CDN。' },
      { phase: '四、交付', node: 'nginx', title: '反向代理 Nginx', note: '静态托管、history 路由回退、gzip、HTTPS。' },
      { phase: '四、交付', node: 'cdn', title: 'CDN 分发', note: '缓存策略、刷新、回源。' },
      { phase: '五、进阶', node: 'web-security', title: 'Web 安全', note: 'XSS、CSRF、点击劫持、CSP；前端也是攻击面。' },
      { phase: '五、进阶', node: 'cross-platform', title: '跨端开发', note: '小程序 / React Native / Flutter，按业务选型。' }
    ]
  },

  {
    id: 'data-ai',
    name: '数据分析与 AI',
    level: '零基础 → 能做数据分析并落地一个 AI 应用',
    desc: '数学打底、Python 工具链、数据全流程，最后到大模型应用。每一层都用真实数据集练，不要只看课。',
    steps: [
      { phase: '一、数学', node: 'probability', title: '概率论与统计', note: '分布、期望、假设检验；A/B 测试的地基。' },
      { phase: '一、数学', node: 'linear-algebra', title: '线性代数', note: '向量、矩阵、特征值；理解模型在算什么。' },
      { phase: '一、数学', node: 'calculus', title: '微积分与梯度', note: '导数、链式法则、梯度下降。' },
      { phase: '二、工具', node: 'python', title: 'Python 服务', note: '语法、函数、类、虚拟环境；pandas / numpy 上手。' },
      { phase: '二、工具', node: 'sql', title: 'SQL', note: '取数是一切的开始；JOIN 和窗口函数要熟。' },
      { phase: '三、数据全流程', node: 'data-cleaning', title: '数据清洗', note: '缺失值、异常值、去重、口径统一。' },
      { phase: '三、数据全流程', node: 'data-analysis', title: '数据分析', note: '描述统计、分组对比、归因；写出一份能落地的结论。' },
      { phase: '三、数据全流程', node: 'data-viz', title: '数据可视化', note: '图表选型、故事线；别用饼图堆数据。' },
      { phase: '三、数据全流程', node: 'data-modeling', title: '数据建模', note: '维度建模、事实表/维度表、指标体系。' },
      { phase: '三、数据全流程', node: 'olap', title: '数据仓库与 OLAP', note: '分层建模、ClickHouse / Doris 之类引擎的取舍。' },
      { phase: '四、机器学习', node: 'ml-basics', title: '机器学习基础', note: '监督/无监督、过拟合、交叉验证。' },
      { phase: '四、机器学习', node: 'deep-learning', title: '深度学习', note: '反向传播、优化器、训练技巧。' },
      { phase: '四、机器学习', node: 'transformer', title: 'Transformer 与注意力', note: '读一遍 Attention Is All You Need，手写一个 mini 实现。' },
      { phase: '五、大模型应用', node: 'llm', title: '大语言模型', note: '预训练/微调/对齐，能力边界与幻觉。' },
      { phase: '五、大模型应用', node: 'rag', title: 'RAG 与向量检索', note: '切分、embedding、召回、重排；做一个能回答文档问题的机器人。' },
      { phase: '五、大模型应用', node: 'agent', title: 'Agent 与工具调用', note: '规划、工具、记忆；做一个能查数据并写报告的小助手。' },
      { phase: '五、大模型应用', node: 'inference', title: '推理与部署', note: '批处理、KV Cache、量化；把模型跑起来并压测。' }
    ]
  },

  {
    id: 'embedded',
    name: '嵌入式开发',
    level: '零基础 → 能独立做一块板子上的完整项目',
    desc: '从 C 和电路开始，点亮一颗 LED，再到 RTOS、驱动、Linux 和物联网接入。嵌入式最忌跳步，硬件不会骗人。',
    steps: [
      { phase: '一、底子', node: 'c-cpp', title: 'C / C++', note: '指针、内存、结构体、位操作；嵌入式的通用语。' },
      { phase: '一、底子', node: 'pcb', title: 'PCB 与电路基础', note: '电阻电容、上拉下拉、看原理图；会用万用表和示波器。' },
      { phase: '二、单片机', node: 'mcu', title: '单片机 / MCU', note: 'STM32 / ESP32：GPIO、定时器、中断、串口。' },
      { phase: '二、单片机', node: 'io-bus', title: '总线与接口', note: 'I2C、SPI、UART、CAN；用逻辑分析仪抓一次时序。' },
      { phase: '二、单片机', node: 'sensor', title: '传感器与执行器', note: '读温湿度、驱动电机；把模拟量变成可用数据。' },
      { phase: '二、单片机', node: 'firmware', title: '固件与烧录', note: '交叉编译、烧录、串口调试、版本管理。' },
      { phase: '三、系统', node: 'rtos', title: 'RTOS 与实时性', note: '任务、优先级、信号量；中断延迟为什么要在意。' },
      { phase: '三、系统', node: 'driver', title: '驱动与内核模块', note: '字符设备、设备树；在 Linux 板上写一个驱动。' },
      { phase: '三、系统', node: 'linux', title: 'Linux 基础', note: '交叉编译环境、shell、系统服务。' },
      { phase: '四、联网与产品', node: 'mqtt', title: 'MQTT / CoAP', note: '设备上云、主题设计、断线重连。' },
      { phase: '四、联网与产品', node: 'sbc', title: '树莓派与单板机', note: '用树莓派做一个网关或个人项目，打通端到云。' },
      { phase: '四、联网与产品', node: 'power-cooling', title: '电源与散热', note: '功耗预算、供电设计、散热；产品化绕不开。' }
    ]
  },

  {
    id: 'sre',
    name: '运维 / SRE',
    level: '零基础 → 能独立值守一套线上系统',
    desc: '从 Linux 和网络排障开始，把服务容器化、上云、自动化，最后落到监控告警和故障处理。SRE 的价值在"出事时"。',
    steps: [
      { phase: '一、底子', node: 'linux', title: 'Linux 基础', note: '进程、内存、磁盘、网络、systemd；每天在服务器上操作。' },
      { phase: '一、底子', node: 'shell', title: 'Shell 与脚本', note: '把重复操作写成脚本，能自动巡检。' },
      { phase: '一、底子', node: 'tcpip', title: 'TCP/IP 与 Socket', note: '连接状态、端口占用、DNS 解析链路。' },
      { phase: '一、底子', node: 'network-debug', title: '抓包与网络排查', note: 'ping / traceroute / tcpdump / ss，按层排查。' },
      { phase: '二、把服务跑起来', node: 'nginx', title: '反向代理 Nginx', note: '虚拟主机、转发、HTTPS、限流。' },
      { phase: '二、把服务跑起来', node: 'docker', title: '容器 Docker', note: '镜像构建、网络、卷、资源限制。' },
      { phase: '二、把服务跑起来', node: 'k8s', title: 'Kubernetes 编排', note: '部署、滚动更新、探针、资源配额。' },
      { phase: '三、自动化', node: 'cicd', title: 'CI/CD 流水线', note: '构建、测试、发布、回滚一条龙。' },
      { phase: '三、自动化', node: 'iac', title: 'IaC 自动化配置', note: 'Terraform / Ansible；机器和配置都要可复现。' },
      { phase: '三、自动化', node: 'cloud', title: '云服务器与 VPC', note: '网络规划、安全组、对象存储、成本。' },
      { phase: '四、可观测', node: 'monitor', title: '指标监控', note: '四大黄金指标、Prometheus、看板。' },
      { phase: '四、可观测', node: 'logging', title: '日志与链路追踪', note: '集中日志、traceId、检索与关联。' },
      { phase: '四、可观测', node: 'alert', title: '告警与值班', note: '分级、抑制、升级；告警疲劳比没告警更危险。' },
      { phase: '五、守住系统', node: 'backup', title: '备份与恢复', note: '备份要定期做恢复演练，不然等于没有。' },
      { phase: '五、守住系统', node: 'incident', title: '故障响应与复盘', note: '定级、止损、沟通、复盘改进项。' },
      { phase: '五、守住系统', node: 'chaos', title: '混沌工程', note: '主动注入故障，验证系统的容错假设。' },
      { phase: '五、守住系统', node: 'cost', title: '成本优化', note: '资源利用率、弹性伸缩、账单分析。' }
    ]
  }

];
