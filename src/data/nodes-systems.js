/* ============================================================
 * 知识点：网络 / 中间件扩展 / 运行时扩展 / 基础设施扩展 / 嵌入式与硬件扩展
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  /* ---------- 网络 ---------- */
  { id:'osi-model', name:'网络分层模型', layer:'接入层', domain:'网络通信', status:'待补充',
    tracks:['网络'], before:['tcpip'],
    keywords:['osi','七层','四层','分层模型','tcp/ip','封装'],
    children:[
      { name:'OSI 七层', desc:'物理到应用的分层职责。' },
      { name:'TCP/IP 四层', desc:'实际使用的简化模型。' },
      { name:'封装与解封装', desc:'每层加头、逐层解包。' }
    ],
    description:'把网络拆成层：OSI 七层与 TCP/IP 四层，排障时先判断问题出在哪一层。' },

  { id:'ip-routing', name:'IP 与路由', layer:'接入层', domain:'网络通信', status:'模糊',
    tracks:['网络','运维'], before:['tcpip'],
    keywords:['ip','路由','子网','nat','bgp','cidr','网关地址'],
    children:[
      { name:'IP 与子网', desc:'地址、掩码与网段划分。' },
      { name:'路由表', desc:'最长前缀匹配与下一跳。' },
      { name:'NAT', desc:'私网地址与端口映射。' },
      { name:'BGP', desc:'跨自治域的路由宣告。' }
    ],
    description:'包怎么找到路：IP、子网、路由表与 NAT，跨机房还要靠 BGP 宣告。' },

  { id:'network-debug', name:'抓包与网络排查', layer:'运行时与OS', domain:'可观测性', status:'待补充',
    tracks:['网络','运维'], before:['tcpip','linux'],
    keywords:['抓包','tcpdump','wireshark','ss','ping','mtr','丢包'],
    children:[
      { name:'ping 与 mtr', desc:'连通性与路径质量。' },
      { name:'tcpdump', desc:'命令行抓包与过滤表达式。' },
      { name:'Wireshark', desc:'协议解析与流分析。' },
      { name:'ss / netstat', desc:'连接、端口与队列。' },
      { name:'延迟与丢包', desc:'从链路、拥塞到应用层。' }
    ],
    description:'网络问题靠证据：ping、mtr、tcpdump 与 ss，先定位在哪一跳，再改配置。' },

  /* ---------- 中间件扩展 ---------- */
  { id:'registry', name:'服务注册与发现', layer:'中间件', domain:'可用性', status:'待补充',
    tracks:['后端','运维'], before:['microservice'],
    keywords:['注册中心','服务发现','consul','nacos','etcd','健康检查'],
    children:[
      { name:'服务注册', desc:'实例上线登记地址与元数据。' },
      { name:'健康检查', desc:'摘除不健康实例。' },
      { name:'服务发现', desc:'客户端或网关如何找到实例。' }
    ],
    description:'服务实例在哪：注册、健康检查与发现，是微服务调用链的第一块地基。' },

  { id:'config-center', name:'配置中心', layer:'中间件', domain:'交付运维', status:'模糊',
    tracks:['后端','运维'], before:['spring','secrets'],
    keywords:['配置中心','nacos','apollo','热更新','灰度配置','配置分层'],
    children:[
      { name:'配置分层', desc:'环境、应用与实例级覆盖。' },
      { name:'热更新', desc:'不重启生效与回滚。' },
      { name:'灰度配置', desc:'按人群或实例推送。' },
      { name:'加密配置', desc:'敏感项仍然单独管理。' }
    ],
    description:'配置不重启就能改：分层、热更新与灰度；但密钥仍然交给专门的密钥管理。' },

  { id:'distributed-tx', name:'分布式事务', layer:'中间件', domain:'一致性', status:'模糊',
    tracks:['后端','数据'], before:['tx','mq','consensus'],
    keywords:['分布式事务','2pc','tcc','saga','最终一致','本地消息表'],
    children:[
      { name:'2PC / 3PC', desc:'协调者与参与者，阻塞代价高。' },
      { name:'TCC', desc:'Try-Confirm-Cancel 三段式。' },
      { name:'Saga', desc:'长事务拆成可补偿步骤。' },
      { name:'本地消息表', desc:'业务与消息同库，靠重试达成最终一致。' }
    ],
    description:'跨服务跨库的原子性：2PC、TCC、Saga 与本地消息表，多数业务场景选最终一致。' },

  { id:'consensus', name:'共识算法', layer:'中间件', domain:'一致性', status:'模糊',
    tracks:['后端','算法'], before:['algorithms'],
    keywords:['共识','raft','paxos','选主','日志复制','法定人数'],
    children:[
      { name:'Raft', desc:'选主、日志复制与安全性。' },
      { name:'Paxos', desc:'理论基础与工程变体。' },
      { name:'法定人数', desc:'多数派与脑裂避免。' }
    ],
    description:'多个节点如何达成一致：选主、日志复制与多数派，etcd、ZooKeeper 都建在它上面。' },

  /* ---------- 运行时扩展 ---------- */
  { id:'compiler', name:'编译原理', layer:'运行时与OS', domain:'性能', status:'模糊',
    tracks:['语言','后端'], before:['data-structures','asm'],
    keywords:['编译原理','词法','语法','ast','代码生成','优化'],
    children:[
      { name:'词法分析', desc:'源码到 token 流。' },
      { name:'语法分析 AST', desc:'文法、递归下降与语法树。' },
      { name:'语义分析', desc:'类型检查与符号表。' },
      { name:'中间表示', desc:'IR 与优化遍。' },
      { name:'优化与代码生成', desc:'指令选择、寄存器分配。' }
    ],
    description:'把源码变成机器码：词法、语法、语义、优化与代码生成，读源码和写 DSL 都要它。' },

  { id:'interpreter', name:'解释器与 JIT', layer:'运行时与OS', domain:'性能', status:'模糊',
    tracks:['语言'], before:['compiler'],
    keywords:['解释器','字节码','jit','vm','python 解释器','栈式虚拟机'],
    children:[
      { name:'字节码', desc:'平台无关的中间指令。' },
      { name:'栈式虚拟机', desc:'求值栈与指令分发。' },
      { name:'JIT 编译', desc:'热点代码编译成本地机器码。' },
      { name:'GC 接入', desc:'运行时管理对象生命周期。' }
    ],
    description:'边解释边执行：字节码、栈式 VM 与 JIT，Python 和 Java 都在这条路上，只是比重不同。' },

  { id:'concurrency', name:'并发与同步', layer:'运行时与OS', domain:'性能', status:'待补充',
    tracks:['后端','语言'], before:['process','java'],
    keywords:['并发','锁','信号量','无锁','cas','死锁','内存模型'],
    children:[
      { name:'互斥与锁', desc:'临界区与锁粒度。' },
      { name:'信号量', desc:'计数信号量与条件变量。' },
      { name:'CAS 与无锁', desc:'原子操作与 ABA 问题。' },
      { name:'死锁', desc:'四个必要条件与排查。' },
      { name:'内存模型', desc:'可见性、有序性与 happens-before。' }
    ],
    description:'同时做多件事：锁、信号量、CAS 与内存模型，先分清是在竞争还是在协作。' },

  { id:'syscall', name:'系统调用与中断', layer:'运行时与OS', domain:'性能', status:'模糊',
    tracks:['后端','嵌入式'], before:['linux','c-cpp'],
    keywords:['系统调用','中断','用户态','内核态','epoll','上下文切换'],
    children:[
      { name:'系统调用', desc:'read/write/fork 的进入与返回。' },
      { name:'中断与异常', desc:'硬件事件与陷阱。' },
      { name:'用户态与内核态', desc:'特权级与切换成本。' },
      { name:'IO 多路复用', desc:'select/poll/epoll。' }
    ],
    description:'用户程序怎么请求内核：系统调用、中断与 IO 多路复用，性能问题常在这里现形。' },

  { id:'driver', name:'驱动与内核模块', layer:'嵌入式与设备', domain:'交付运维', status:'模糊',
    tracks:['嵌入式','硬件'], before:['linux','c-cpp'],
    keywords:['驱动','内核模块','设备树','字符设备','中断处理'],
    children:[
      { name:'字符设备', desc:'按字节流访问的设备。' },
      { name:'块设备', desc:'按块读写的存储设备。' },
      { name:'设备树', desc:'描述硬件连接关系。' },
      { name:'中断处理', desc:'上半部与下半部。' }
    ],
    description:'让内核认识硬件：字符/块设备、设备树与中断处理，嵌入式 Linux 的核心工作。' },

  { id:'virtualization', name:'虚拟化', layer:'运行时与OS', domain:'可用性', status:'模糊',
    tracks:['运维','硬件'], before:['linux','mem'],
    keywords:['虚拟化','hypervisor','kvm','vmware','容器与虚拟机'],
    children:[
      { name:'全虚拟化', desc:'无需改客户机的指令模拟。' },
      { name:'半虚拟化', desc:'客户机配合的 IO 路径。' },
      { name:'硬件辅助虚拟化', desc:'VT-x / AMD-V。' },
      { name:'容器与虚拟机', desc:'隔离级别与资源开销的取舍。' }
    ],
    description:'一台机器跑多个系统：Hypervisor、硬件辅助与容器化，隔离和开销是永恒的天平。' },

  { id:'shell', name:'Shell 与脚本', layer:'运行时与OS', domain:'交付运维', status:'待补充',
    tracks:['运维','语言'], before:['linux'],
    keywords:['shell','bash','脚本','管道','awk','sed','重定向'],
    children:[
      { name:'变量与流程', desc:'条件、循环与函数。' },
      { name:'管道与重定向', desc:'把命令串成流水线。' },
      { name:'awk / sed', desc:'文本处理两件套。' },
      { name:'定时脚本', desc:'cron 与环境变量陷阱。' }
    ],
    description:'把命令串起来：管道、重定向与脚本，是运维自动化和排查的第一件工具。' },

  /* ---------- 基础设施扩展 ---------- */
  { id:'supply-chain', name:'供应链安全', layer:'基础设施', domain:'安全', status:'模糊',
    tracks:['安全','运维'], before:['git','docker'],
    keywords:['供应链安全','依赖漏洞','sbom','cve','镜像签名','构建隔离'],
    children:[
      { name:'依赖漏洞', desc:'传递依赖与版本锁定。' },
      { name:'SBOM', desc:'软件物料清单与可追溯。' },
      { name:'镜像签名', desc:'来源校验与准入。' },
      { name:'构建隔离', desc:'防投毒与最小权限。' }
    ],
    description:'你用的每个依赖都可能是入口：漏洞扫描、SBOM 与制品签名，是 2026 年的基本要求。' },

  { id:'pentest', name:'渗透测试与漏洞管理', layer:'基础设施', domain:'安全', status:'模糊',
    tracks:['安全','测试'], before:['web-security','network-debug'],
    keywords:['渗透测试','漏洞扫描','burp','nmap','红队','修复'],
    children:[
      { name:'信息收集', desc:'资产、端口与指纹。' },
      { name:'漏洞扫描', desc:'自动化扫描与误报。' },
      { name:'手工验证', desc:'利用链与影响评估。' },
      { name:'报告与修复', desc:'优先级与复测闭环。' }
    ],
    description:'站在攻击者角度找问题：侦察、扫描、验证与修复闭环，目标是把洞补上而不是交报告。' },

  { id:'chaos', name:'混沌工程', layer:'基础设施', domain:'可用性', status:'模糊',
    tracks:['运维','测试'], before:['k8s','monitor'],
    keywords:['混沌工程','故障演练','chaos mesh','注入','爆炸半径'],
    children:[
      { name:'故障注入', desc:'延迟、宕机与网络分区。' },
      { name:'演练计划', desc:'假设、范围与停止条件。' },
      { name:'爆炸半径', desc:'先小范围再扩大。' },
      { name:'复盘', desc:'发现的问题要修。' }
    ],
    description:'主动制造故障：注入延迟、宕机与网络分区，验证系统真的扛得住，而不是以为扛得住。' },

  { id:'incident', name:'故障响应与复盘', layer:'基础设施', domain:'可用性', status:'待补充',
    tracks:['运维'], before:['monitor','logging'],
    keywords:['故障响应','值班','复盘','on-call','rca','止损'],
    children:[
      { name:'值班与升级', desc:'一线判断与升级路径。' },
      { name:'故障定位', desc:'从指标、日志到变更。' },
      { name:'止损与回滚', desc:'先恢复，再找根因。' },
      { name:'复盘 RCA', desc:'对事不对人，产出改进项。' }
    ],
    description:'出事之后：止损优先、定位其次、复盘最后；流程比英雄主义可靠，复盘要落到改进项。' },

  { id:'cost', name:'成本优化', layer:'基础设施', domain:'交付运维', status:'模糊',
    tracks:['运维'], before:['cloud'],
    keywords:['成本优化','finops','预算','资源利用率','弹性'],
    children:[
      { name:'资源规格', desc:'按实际负载选型。' },
      { name:'弹性伸缩', desc:'峰谷差异与冷启动。' },
      { name:'存储分层', desc:'热温冷与归档。' },
      { name:'成本归因', desc:'按团队、服务、环境拆分。' }
    ],
    description:'云账单也是设计出来的：规格、弹性与存储分层，按团队归因才谈得上优化。' },

  /* ---------- 嵌入式与硬件扩展 ---------- */
  { id:'sbc', name:'树莓派与单板机', layer:'嵌入式与设备', domain:'交付运维', status:'待补充',
    tracks:['嵌入式','硬件','AI'], before:['linux','mcu'],
    keywords:['树莓派','raspberry pi','单板机','sbc','jetson','gpio','40pin'],
    children:[
      { name:'GPIO 与 40Pin', desc:'引脚复用与电平。' },
      { name:'系统镜像与烧录', desc:'SD 卡、系统与首次启动。' },
      { name:'摄像头与显示', desc:'CSI/DSI 与多媒体管线。' },
      { name:'功耗与散热', desc:'持续负载下的降频。' },
      { name:'Jetson 与边缘算力', desc:'带 GPU/NPU 的边缘推理。' }
    ],
    description:'信用卡大小的完整电脑：Linux + GPIO，Jetson 这类还带 GPU/NPU，是边缘 AI 的常见载体。' },

  { id:'npu', name:'AI 加速器', layer:'硬件与外设', domain:'性能', status:'模糊',
    tracks:['硬件','AI'], before:['cpu'],
    keywords:['npu','tpu','加速器','算力','tops','昇腾'],
    children:[
      { name:'算力 TOPS', desc:'整数与浮点算力的口径。' },
      { name:'显存带宽', desc:'喂不满算力的常见瓶颈。' },
      { name:'软件栈 CANN / CUDA', desc:'算子库与框架适配。' },
      { name:'端侧 NPU', desc:'手机与边缘设备的低功耗推理。' }
    ],
    description:'为矩阵运算定制的加速器（NPU/TPU）；算力、带宽与软件栈三者缺一，芯片就只是个数字。' },

  { id:'fpga', name:'FPGA 与可编程逻辑', layer:'硬件与外设', domain:'性能', status:'模糊',
    tracks:['硬件','嵌入式'], before:['isa'],
    keywords:['fpga','可编程逻辑','verilog','vhdl','硬件加速'],
    children:[
      { name:'逻辑单元', desc:'查找表、触发器与布线。' },
      { name:'HDL 语言', desc:'Verilog / VHDL 描述电路。' },
      { name:'时序约束', desc:'时钟、建立与保持时间。' },
      { name:'硬件加速', desc:'低延迟与专用流水线。' }
    ],
    description:'用硬件描述语言"画"电路：可重构、低延迟，适合专用加速和原型验证。' },

  { id:'pcb', name:'PCB 与电路基础', layer:'硬件与外设', domain:'可用性', status:'模糊',
    tracks:['硬件','嵌入式'], before:[],
    keywords:['pcb','电路','原理图','布线','焊接','电源','地'],
    children:[
      { name:'原理图', desc:'元件、网络与电气连接。' },
      { name:'布线', desc:'层叠、阻抗与信号完整性。' },
      { name:'电源与地', desc:'去耦、纹波与地平面。' },
      { name:'焊接与调试', desc:'万用表、示波器与虚焊。' }
    ],
    description:'把芯片连成板子：原理图、布线、电源与地，是硬件项目的第一道门槛。' },

  { id:'peripheral', name:'显示与外设', layer:'硬件与外设', domain:'可用性', status:'待补充',
    tracks:['硬件'], before:['motherboard'],
    keywords:['显示器','键鼠','usb','hdmi','外设','音频'],
    children:[
      { name:'显示与 HDMI', desc:'分辨率、刷新率与接口版本。' },
      { name:'USB 设备', desc:'协议版本、供电与枚举。' },
      { name:'键鼠与输入', desc:'轮询率、延迟与手感。' },
      { name:'音频设备', desc:'采样率、延迟与接口。' }
    ],
    description:'人怎么和机器打交道：显示、USB、键鼠与音频，接口和供电经常是坑。' }

]);
