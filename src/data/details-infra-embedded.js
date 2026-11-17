/* ============================================================
 * 节点内部详细拆解：基础设施 / 嵌入式 / 硬件
 * ============================================================ */
window.KB = window.KB || {};
KB.DETAILS = KB.DETAILS || {};

KB.DETAILS.cloud = { groups: [
  { name: '计算', items: [
    { name: '虚拟机与规格', desc: 'vCPU/内存配比与超分。' },
    { name: '弹性伸缩', desc: '按指标自动增减实例。' },
    { name: '镜像与快照', desc: '快速复制环境。' }
  ] },
  { name: '网络', items: [
    { name: 'VPC 与子网', desc: '网段规划与路由表。' },
    { name: '安全组与 ACL', desc: '有状态与无状态过滤。' },
    { name: '负载均衡与 NAT', desc: '公网入口与出口网关。' }
  ] },
  { name: '存储与成本', items: [
    { name: '对象存储', desc: '桶、权限与生命周期。' },
    { name: '块存储', desc: '云盘性能等级。' },
    { name: '成本控制', desc: '按量/包年、闲置回收。' }
  ] }
] };

KB.DETAILS.cdn = { groups: [
  { name: '原理', items: [
    { name: '边缘节点', desc: '就近回源与加速。' },
    { name: '回源策略', desc: '回源协议、Host 与超时。' },
    { name: '调度', desc: 'DNS 与 Anycast。' }
  ] },
  { name: '缓存', items: [
    { name: '缓存键', desc: 'URL + 查询参数。' },
    { name: '刷新与预热', desc: '发布后强制更新。' },
    { name: '命中率', desc: '看缓存命中与回源量。' }
  ] },
  { name: '安全', items: [
    { name: '防盗链', desc: 'Referer 与签名 URL。' },
    { name: 'HTTPS 与 WAF', desc: '边缘证书与防护。' }
  ] }
] };

KB.DETAILS.lb = { groups: [
  { name: '层次', items: [
    { name: '四层负载', desc: '按 IP/端口转发，性能高。' },
    { name: '七层负载', desc: '按 URL/头路由，功能多。' },
    { name: '健康检查', desc: '剔除异常后端。' }
  ] },
  { name: '算法', items: [
    { name: '轮询与加权', desc: '按能力分配。' },
    { name: '最少连接', desc: '长连接更均衡。' },
    { name: '一致性哈希', desc: '缓存友好。' }
  ] },
  { name: '高可用', items: [
    { name: '主备与集群', desc: 'VIP 漂移。' },
    { name: '会话保持', desc: '粘性会话的代价。' }
  ] }
] };

KB.DETAILS.gateway = { groups: [
  { name: '职责', items: [
    { name: '统一入口', desc: '路由与协议转换。' },
    { name: '鉴权与限流', desc: '在入口做横切能力。' },
    { name: '可观测', desc: '统一日志与指标。' }
  ] },
  { name: '能力', items: [
    { name: '路由与灰度', desc: '按头/权重分流。' },
    { name: '熔断降级', desc: '保护后端。' },
    { name: '插件机制', desc: '可扩展的过滤器链。' }
  ] },
  { name: '选型', items: [
    { name: 'Nginx/OpenResty', desc: '性能与 Lua 扩展。' },
    { name: 'APISIX/Kong', desc: '云原生网关。' }
  ] }
] };

KB.DETAILS.session = { groups: [
  { name: '会话方式', items: [
    { name: 'Cookie + Session', desc: '服务端存储会话。' },
    { name: 'JWT', desc: '无状态令牌与撤销难题。' },
    { name: 'Opaque Token', desc: '随机串 + 服务端校验。' }
  ] },
  { name: '安全', items: [
    { name: 'Cookie 属性', desc: 'HttpOnly、Secure、SameSite。' },
    { name: '会话固定', desc: '登录后更换会话 ID。' },
    { name: '过期与续期', desc: '滑动过期与刷新令牌。' }
  ] },
  { name: '分布式', items: [
    { name: '共享存储', desc: 'Redis 存会话。' },
    { name: '单点登录', desc: 'SSO 与跨域。' }
  ] }
] };

KB.DETAILS.ratelimit = { groups: [
  { name: '算法', items: [
    { name: '令牌桶', desc: '允许突发。' },
    { name: '漏桶', desc: '恒定速率。' },
    { name: '滑动窗口', desc: '更平滑的统计。' }
  ] },
  { name: '分布式', items: [
    { name: 'Redis 计数', desc: 'Lua 保证原子。' },
    { name: '网关限流', desc: '入口统一控制。' },
    { name: '单机限流', desc: 'Sentinel/Guava。' }
  ] },
  { name: '熔断降级', items: [
    { name: '熔断器状态', desc: '关闭、打开、半开。' },
    { name: '降级策略', desc: '兜底响应与排队。' }
  ] }
] };

KB.DETAILS.cicd = KB.DETAILS.cicd || { groups: [
  { name: '流水线', items: [
    { name: '提交即构建', desc: '触发条件与分支策略。' },
    { name: '测试与扫描', desc: '单测、静态检查、依赖漏洞。' },
    { name: '制品与版本', desc: '镜像 tag 与可追溯。' },
    { name: '发布与回滚', desc: '灰度、蓝绿、一键回滚。' }
  ] },
  { name: '工程', items: [
    { name: '密钥管理', desc: 'CI 变量与 Vault。' },
    { name: '缓存加速', desc: '依赖与构建缓存。' },
    { name: '流水线即代码', desc: 'Jenkinsfile、GitHub Actions。' }
  ] }
] };

KB.DETAILS.iac = { groups: [
  { name: '工具', items: [
    { name: 'Terraform', desc: '声明式资源编排。' },
    { name: 'Ansible', desc: '配置管理与批量执行。' },
    { name: 'Pulumi', desc: '用编程语言写基础设施。' }
  ] },
  { name: '状态与变更', items: [
    { name: 'state 文件', desc: '远端存储与锁。' },
    { name: 'plan/apply', desc: '先看差异再执行。' },
    { name: '漂移检测', desc: '手工改动怎么收敛。' }
  ] },
  { name: '实践', items: [
    { name: '模块化', desc: '复用与环境隔离。' },
    { name: 'Code Review', desc: '基础设施变更也要评审。' }
  ] }
] };

KB.DETAILS.alert = { groups: [
  { name: '告警设计', items: [
    { name: '分级', desc: 'P0 电话、P1 企微、P2 邮件。' },
    { name: '阈值与持续', desc: 'for 时长减少抖动。' },
    { name: '可行动性', desc: '每条告警都要有处理手册。' }
  ] },
  { name: '治理', items: [
    { name: '抑制与聚合', desc: '避免告警风暴。' },
    { name: '值班与升级', desc: '响应时限与交接。' },
    { name: '有效性复盘', desc: '误报率与漏报。' }
  ] }
] };

KB.DETAILS.backup = { groups: [
  { name: '策略', items: [
    { name: '全量与增量', desc: '周期与保留。' },
    { name: 'RPO/RTO', desc: '能丢多少、多久恢复。' },
    { name: '3-2-1 原则', desc: '三份、两种介质、一份异地。' }
  ] },
  { name: '演练', items: [
    { name: '恢复演练', desc: '没演练过的备份不算备份。' },
    { name: '校验', desc: '备份文件完整性。' },
    { name: '权限', desc: '备份泄露等于数据泄露。' }
  ] },
  { name: '对象', items: [
    { name: '数据库', desc: '物理与逻辑备份。' },
    { name: '文件与对象存储', desc: '版本与跨区复制。' }
  ] }
] };

KB.DETAILS.chaos = { groups: [
  { name: '实验', items: [
    { name: '故障注入', desc: '延迟、错误、断网、杀进程。' },
    { name: '爆炸半径', desc: '先小流量再扩大。' },
    { name: '稳态假设', desc: '定义什么是正常。' }
  ] },
  { name: '工具', items: [
    { name: 'Chaos Mesh', desc: 'K8s 上的混沌实验。' },
    { name: 'Litmus', desc: '工作流式实验。' }
  ] },
  { name: '实践', items: [
    { name: '演练计划', desc: '与业务低峰对齐。' },
    { name: '复盘改进', desc: '发现的问题排期修。' }
  ] }
] };

KB.DETAILS.incident = { groups: [
  { name: '响应', items: [
    { name: '定级与拉群', desc: '影响面决定级别。' },
    { name: '止损优先', desc: '先恢复再找根因。' },
    { name: '沟通', desc: '固定节奏同步进展。' }
  ] },
  { name: '复盘', items: [
    { name: '时间线', desc: '客观记录每个动作。' },
    { name: '根因与诱因', desc: '直接原因和系统性原因。' },
    { name: '改进项', desc: '负责人与截止时间。' }
  ] },
  { name: '沉淀', items: [
    { name: '故障库', desc: '同类问题可检索。' },
    { name: '演练', desc: '把改进项变成预案。' }
  ] }
] };

KB.DETAILS.cost = { groups: [
  { name: '成本构成', items: [
    { name: '计算', desc: '实例规格与利用率。' },
    { name: '存储与流量', desc: '冷热分层与带宽。' },
    { name: '闲置资源', desc: '未挂载磁盘、空负载。' }
  ] },
  { name: '优化', items: [
    { name: '规格降配', desc: '按实际负载选型。' },
    { name: '弹性伸缩', desc: '错峰关停。' },
    { name: '预留与折扣', desc: '包年与节省计划。' }
  ] },
  { name: '治理', items: [
    { name: '标签与分账', desc: '按团队/项目归集。' },
    { name: '预算告警', desc: '超支提前发现。' }
  ] }
] };

KB.DETAILS['supply-chain'] = { groups: [
  { name: '风险', items: [
    { name: '依赖投毒', desc: '同名包与恶意版本。' },
    { name: '依赖混淆', desc: '私服包名被公网抢注。' },
    { name: '构建环境', desc: 'CI 机器被入侵。' }
  ] },
  { name: '防护', items: [
    { name: '依赖锁定', desc: 'lock 文件与校验和。' },
    { name: '镜像签名', desc: 'cosign 验证来源。' },
    { name: 'SBOM', desc: '软件物料清单。' }
  ] },
  { name: '流程', items: [
    { name: 'SCA 扫描', desc: '漏洞与许可证。' },
    { name: '私有仓库', desc: '代理与缓存公网依赖。' }
  ] }
] };

/* ---------------- 嵌入式 ---------------- */
KB.DETAILS.mcu = { groups: [
  { name: '内核与外设', items: [
    { name: 'GPIO', desc: '输入输出与上下拉。' },
    { name: '定时器与 PWM', desc: '延时、捕获、调光调速。' },
    { name: '中断与 NVIC', desc: '优先级与嵌套。' },
    { name: 'ADC/DAC', desc: '模拟量采集与输出。' },
    { name: 'DMA', desc: '不占 CPU 的数据搬运。' }
  ] },
  { name: '开发流程', items: [
    { name: '工具链', desc: 'Keil、PlatformIO、arm-none-eabi。' },
    { name: '调试', desc: 'SWD、串口打印、逻辑分析仪。' },
    { name: '启动流程', desc: '复位向量、启动文件、时钟树。' }
  ] },
  { name: '常见平台', items: [
    { name: 'STM32', desc: 'HAL 库与 CubeMX。' },
    { name: 'ESP32', desc: 'Wi-Fi/BLE 与 Arduino 生态。' },
    { name: '低功耗', desc: '睡眠模式与唤醒源。' }
  ] }
] };

KB.DETAILS.rtos = { groups: [
  { name: '调度', items: [
    { name: '任务与优先级', desc: '抢占式调度。' },
    { name: '时间片', desc: '同优先级轮转。' },
    { name: '上下文切换', desc: '开销与栈大小。' }
  ] },
  { name: '同步', items: [
    { name: '信号量', desc: '资源计数与同步。' },
    { name: '互斥锁与优先级反转', desc: '优先级继承。' },
    { name: '消息队列', desc: '任务间通信。' }
  ] },
  { name: '实时性', items: [
    { name: '中断延迟', desc: '关中断时间要短。' },
    { name: '看门狗', desc: '任务卡死的兜底。' }
  ] }
] };

KB.DETAILS.driver = { groups: [
  { name: 'Linux 驱动', items: [
    { name: '字符设备', desc: 'open/read/write/ioctl。' },
    { name: '设备树', desc: '硬件描述与匹配。' },
    { name: '中断处理', desc: '上半部与下半部。' }
  ] },
  { name: '调试', items: [
    { name: 'printk 与 dmesg', desc: '内核日志。' },
    { name: 'ftrace', desc: '函数跟踪。' },
    { name: '权限与安全', desc: '最小权限与签名模块。' }
  ] }
] };

KB.DETAILS.sensor = { groups: [
  { name: '类型', items: [
    { name: '温湿度', desc: 'DHT、SHT 系列。' },
    { name: 'imu', desc: '加速度计、陀螺仪。' },
    { name: '光照与距离', desc: '光敏、超声波、ToF。' }
  ] },
  { name: '接口与处理', items: [
    { name: 'I2C/SPI 读取', desc: '寄存器读写时序。' },
    { name: '校准', desc: '零点与温漂。' },
    { name: '滤波', desc: '滑动平均与卡尔曼。' }
  ] }
] };

KB.DETAILS['io-bus'] = { groups: [
  { name: '板级总线', items: [
    { name: 'I2C', desc: '两线、地址寻址、上拉电阻。' },
    { name: 'SPI', desc: '四线、全双工、片选。' },
    { name: 'UART', desc: '波特率、校验、流控。' }
  ] },
  { name: '工业与车载', items: [
    { name: 'CAN', desc: '差分总线、仲裁与帧。' },
    { name: 'RS485', desc: '长距离多点通信。' },
    { name: 'Modbus', desc: '寄存器读写协议。' }
  ] },
  { name: '调试', items: [
    { name: '逻辑分析仪', desc: '抓时序看波形。' },
    { name: '示波器', desc: '信号完整性与噪声。' }
  ] }
] };

KB.DETAILS.firmware = { groups: [
  { name: '构建', items: [
    { name: '交叉编译', desc: '目标架构工具链。' },
    { name: '链接脚本', desc: '内存布局与段。' },
    { name: '固件组成', desc: 'bootloader + 应用 + 参数区。' }
  ] },
  { name: '烧录', items: [
    { name: 'SWD/JTAG', desc: '调试与下载。' },
    { name: '串口 ISP', desc: '量产烧录。' },
    { name: '版本管理', desc: '固件版本与回滚。' }
  ] },
  { name: 'OTA', items: [
    { name: 'A/B 分区', desc: '升级失败可回退。' },
    { name: '签名校验', desc: '防止刷入非法固件。' }
  ] }
] };

KB.DETAILS.sbc = { groups: [
  { name: '树莓派', items: [
    { name: '型号与接口', desc: 'GPIO、USB、HDMI、CSI。' },
    { name: '系统安装', desc: 'Raspberry Pi OS 与 headless 配置。' },
    { name: '远程访问', desc: 'SSH 与 VNC。' }
  ] },
  { name: '系统', items: [
    { name: 'Linux 基础', desc: '与服务器一致的操作。' },
    { name: 'GPIO 编程', desc: 'Python/ C 控制外设。' },
    { name: '容器', desc: 'ARM 镜像与资源限制。' }
  ] },
  { name: '项目', items: [
    { name: '家庭网关', desc: '软路由与内网穿透。' },
    { name: '边缘采集', desc: '传感器数据上云。' }
  ] }
] };

KB.DETAILS.mqtt = { groups: [
  { name: '模型', items: [
    { name: '发布订阅', desc: '主题与通配符。' },
    { name: 'Broker', desc: 'EMQX、Mosquitto。' },
    { name: '会话', desc: 'clean session 与离线消息。' }
  ] },
  { name: 'QoS', items: [
    { name: 'QoS 0/1/2', desc: '至多一次、至少一次、恰好一次。' },
    { name: '保留消息', desc: '新订阅者立即拿到状态。' },
    { name: '遗嘱消息', desc: '设备掉线通知。' }
  ] },
  { name: '安全与运维', items: [
    { name: '认证', desc: '用户名密码、证书。' },
    { name: 'TLS', desc: '加密与双向认证。' }
  ] }
] };

/* ---------------- 硬件 ---------------- */
KB.DETAILS.cpu = { groups: [
  { name: '流水线', items: [
    { name: '五级流水', desc: '取指、译码、执行、访存、写回。' },
    { name: '冒险', desc: '数据、控制、结构冒险。' },
    { name: '乱序执行', desc: '重排序与寄存器重命名。' }
  ] },
  { name: '缓存', items: [
    { name: 'L1/L2/L3', desc: '容量与延迟层级。' },
    { name: '缓存一致性', desc: 'MESI 协议。' },
    { name: '伪共享', desc: '同一缓存行被多核写。' }
  ] },
  { name: '性能', items: [
    { name: '分支预测', desc: '预测失败的开销。' },
    { name: 'SIMD', desc: '向量指令。' },
    { name: '超线程', desc: '逻辑核与物理核。' }
  ] }
] };

KB.DETAILS.gpu = { groups: [
  { name: '架构', items: [
    { name: 'SM/CU', desc: '流多处理器与计算单元。' },
    { name: '显存层次', desc: '寄存器、共享内存、全局内存。' },
    { name: '带宽', desc: '显存位宽与频率。' }
  ] },
  { name: '并行', items: [
    { name: 'CUDA/OpenCL', desc: '线程块与网格。' },
    { name: '占用率', desc: '资源限制与调度。' },
    { name: '张量核心', desc: '矩阵运算加速。' }
  ] },
  { name: '图形管线', items: [
    { name: '顶点与片元', desc: '可编程阶段。' },
    { name: '光栅化', desc: '三角形到像素。' }
  ] }
] };

KB.DETAILS['dram-ssd'] = { groups: [
  { name: '内存', items: [
    { name: 'DDR 代际', desc: 'DDR4/DDR5 与频率。' },
    { name: '时序', desc: 'CL 与带宽的取舍。' },
    { name: 'ECC', desc: '纠错与可靠性。' }
  ] },
  { name: 'SSD', items: [
    { name: 'NAND 类型', desc: 'SLC/MLC/TLC/QLC。' },
    { name: '主控与缓存', desc: 'DRAM 缓存与掉速。' },
    { name: '接口', desc: 'SATA 与 NVMe。' }
  ] },
  { name: '性能', items: [
    { name: 'IOPS 与延迟', desc: '随机与顺序。' },
    { name: '寿命', desc: 'TBW 与写入放大。' }
  ] }
] };

KB.DETAILS.motherboard = { groups: [
  { name: '组成', items: [
    { name: '芯片组', desc: '决定接口与扩展。' },
    { name: '供电', desc: 'VRM 与相数。' },
    { name: 'BIOS/UEFI', desc: '启动与设置。' }
  ] },
  { name: '接口', items: [
    { name: 'PCIe', desc: '通道数与版本。' },
    { name: 'M.2 / SATA', desc: '存储接口。' },
    { name: '内存插槽', desc: '双通道与插法。' }
  ] },
  { name: '选型', items: [
    { name: '板型', desc: 'ATX/M-ATX/ITX。' },
    { name: '兼容性', desc: 'CPU 插槽与 BIOS 支持。' }
  ] }
] };

KB.DETAILS['power-cooling'] = { groups: [
  { name: '供电', items: [
    { name: '功率预算', desc: '整机峰值功耗。' },
    { name: '电源效率', desc: '80 PLUS 认证。' },
    { name: '接口', desc: 'CPU/GPU 供电线。' }
  ] },
  { name: '散热', items: [
    { name: '风冷与水冷', desc: '散热能力与维护。' },
    { name: '风道', desc: '进风出风与正压。' },
    { name: '硅脂与接触', desc: '安装压力。' }
  ] },
  { name: '噪音与稳定', items: [
    { name: '风扇曲线', desc: '温度与转速。' },
    { name: '温度墙', desc: '降频保护。' }
  ] }
] };

KB.DETAILS.pcb = { groups: [
  { name: '设计', items: [
    { name: '原理图', desc: '网络标号与封装。' },
    { name: '布线', desc: '线宽、阻抗、差分。' },
    { name: '层叠', desc: '双层与多层板。' }
  ] },
  { name: '元件', items: [
    { name: '被动元件', desc: '电阻、电容、电感。' },
    { name: '封装', desc: '0402/0603、QFN、BGA。' },
    { name: '上拉下拉', desc: '数字接口的默认电平。' }
  ] },
  { name: '制造', items: [
    { name: '打样', desc: 'Gerber 与工艺参数。' },
    { name: '焊接', desc: '手焊与回流焊。' }
  ] }
] };

KB.DETAILS.isa = { groups: [
  { name: '指令集', items: [
    { name: 'CISC 与 RISC', desc: 'x86 与 ARM 的取舍。' },
    { name: 'RISC-V', desc: '开源指令集与扩展。' },
    { name: 'SIMD 扩展', desc: 'AVX、NEON。' }
  ] },
  { name: '微架构', items: [
    { name: '超标量', desc: '并行发射多条指令。' },
    { name: '预测与预取', desc: '隐藏访存延迟。' },
    { name: '大小核', desc: '能效与性能调度。' }
  ] },
  { name: '生态', items: [
    { name: '编译器', desc: '指令选择与优化。' },
    { name: '二进制兼容', desc: 'ABI 与移植成本。' }
  ] }
] };

KB.DETAILS.eda = { groups: [
  { name: '流程', items: [
    { name: 'RTL 设计', desc: 'Verilog/VHDL 描述电路。' },
    { name: '综合', desc: 'RTL 到门级网表。' },
    { name: '布局布线', desc: '物理实现与时钟树。' }
  ] },
  { name: '验证', items: [
    { name: '仿真', desc: '功能验证。' },
    { name: '形式验证', desc: '数学证明等价性。' },
    { name: '时序分析', desc: '建立/保持时间。' }
  ] },
  { name: '工具', items: [
    { name: '商业套件', desc: 'Synopsys/Cadence/Siemens。' },
    { name: '开源工具', desc: 'Yosys、OpenROAD。' }
  ] }
] };

KB.DETAILS.semi = { groups: [
  { name: '工艺', items: [
    { name: '光刻', desc: 'DUV/EUV 与波长。' },
    { name: '刻蚀与沉积', desc: '薄膜与图形转移。' },
    { name: '制程节点', desc: '7nm/5nm 的含义。' }
  ] },
  { name: '良率', items: [
    { name: '晶圆', desc: '尺寸与每片die数。' },
    { name: '缺陷与良率', desc: '影响成本。' },
    { name: '封测', desc: '后道工序。' }
  ] }
] };

KB.DETAILS.package = { groups: [
  { name: '封装', items: [
    { name: 'QFN/BGA', desc: '引脚与焊球。' },
    { name: '先进封装', desc: '2.5D/3D 与 chiplet。' },
    { name: '散热', desc: '封装热阻。' }
  ] },
  { name: '测试', items: [
    { name: '晶圆测试', desc: 'CP 与良率筛选。' },
    { name: '成品测试', desc: 'FT 与老化。' }
  ] }
] };

KB.DETAILS.npu = { groups: [
  { name: '架构', items: [
    { name: '矩阵引擎', desc: 'MAC 阵列。' },
    { name: '量化支持', desc: 'INT8/INT4。' },
    { name: '片上缓存', desc: '减少访存。' }
  ] },
  { name: '软件', items: [
    { name: '算子库', desc: '卷积与注意力的高效实现。' },
    { name: '编译工具链', desc: '模型转换与图优化。' },
    { name: '框架对接', desc: 'ONNX、TensorRT。' }
  ] },
  { name: '应用', items: [
    { name: '端侧推理', desc: '手机与摄像头。' },
    { name: '边缘盒子', desc: '低功耗场景。' }
  ] }
] };

KB.DETAILS.fpga = { groups: [
  { name: '原理', items: [
    { name: 'LUT 与触发器', desc: '可编程逻辑单元。' },
    { name: '布线资源', desc: '互连决定性能。' },
    { name: 'IP 核', desc: '复用成熟模块。' }
  ] },
  { name: '开发', items: [
    { name: 'HDL', desc: 'Verilog/VHDL。' },
    { name: '时序约束', desc: '时钟与 IO 约束。' },
    { name: '仿真与上板', desc: '波形验证。' }
  ] },
  { name: '应用', items: [
    { name: '原型验证', desc: '芯片流片前验证。' },
    { name: '加速卡', desc: '网络与信号处理。' }
  ] }
] };

KB.DETAILS.peripheral = { groups: [
  { name: '显示', items: [
    { name: '接口', desc: 'HDMI、DP、Type-C。' },
    { name: '分辨率与刷新率', desc: '带宽计算。' },
    { name: '色彩', desc: '色域与色深。' }
  ] },
  { name: '输入设备', items: [
    { name: '键鼠', desc: '轮询率与延迟。' },
    { name: '触控', desc: '采样与手势。' }
  ] },
  { name: '外设总线', items: [
    { name: 'USB', desc: '版本、供电与协议。' },
    { name: '雷电/PCIe', desc: '高速外接。' }
  ] }
] };

KB.DETAILS.android = { groups: [
  { name: '系统', items: [
    { name: 'Linux 内核', desc: '驱动与电源管理。' },
    { name: 'HAL 与框架', desc: '硬件抽象。' },
    { name: '应用沙箱', desc: '权限与隔离。' }
  ] },
  { name: '开发', items: [
    { name: 'Kotlin/Java', desc: '语言与协程。' },
    { name: 'Jetpack', desc: 'Compose、ViewModel、Room。' },
    { name: '性能', desc: '启动、内存、卡顿。' }
  ] },
  { name: '发布', items: [
    { name: '签名与上架', desc: 'Play/国内商店。' },
    { name: '适配', desc: '碎片化与机型测试。' }
  ] }
] };

KB.DETAILS.ios = { groups: [
  { name: '系统', items: [
    { name: 'Darwin/XNU', desc: '内核与沙箱。' },
    { name: '应用生命周期', desc: '前后台与挂起。' },
    { name: '权限模型', desc: '隐私授权。' }
  ] },
  { name: '开发', items: [
    { name: 'Swift/SwiftUI', desc: '现代 UI 框架。' },
    { name: '内存管理', desc: 'ARC 与循环引用。' },
    { name: '性能', desc: '启动与渲染。' }
  ] },
  { name: '发布', items: [
    { name: '签名与证书', desc: '描述文件。' },
    { name: 'App Store 审核', desc: '常见拒绝原因。' }
  ] }
] };

KB.DETAILS.graphics = { groups: [
  { name: '渲染管线', items: [
    { name: '光栅化', desc: '三角形到像素。' },
    { name: '着色器', desc: '顶点与片元可编程。' },
    { name: '纹理与采样', desc: '过滤与 mipmap。' }
  ] },
  { name: '光照', items: [
    { name: '光照模型', desc: 'Lambert、Phong、PBR。' },
    { name: '阴影', desc: '阴影贴图。' },
    { name: '全局光照', desc: '光追与烘焙。' }
  ] },
  { name: '引擎', items: [
    { name: '场景图', desc: '层级变换。' },
    { name: 'WebGL/WebGPU', desc: '浏览器 3D。' }
  ] }
] };

KB.DETAILS.video = { groups: [
  { name: '编码', items: [
    { name: 'H.264/H.265', desc: '压缩效率与兼容性。' },
    { name: 'AV1', desc: '开源与免版税。' },
    { name: '码率控制', desc: 'CBR/VBR/CRF。' }
  ] },
  { name: '容器与传输', items: [
    { name: 'MP4/FLV/HLS', desc: '封装与切片。' },
    { name: '直播协议', desc: 'RTMP、WebRTC、SRT。' }
  ] },
  { name: '处理', items: [
    { name: '转码', desc: 'ffmpeg 流水线。' },
    { name: '音画同步', desc: '时间戳与缓冲。' }
  ] }
] };

KB.DETAILS['ethernet-wifi'] = { groups: [
  { name: '以太网', items: [
    { name: '帧结构', desc: 'MAC 地址与 MTU。' },
    { name: '交换机', desc: 'VLAN 与生成树。' },
    { name: '速率与双工', desc: '千兆/万兆、自协商。' }
  ] },
  { name: 'Wi-Fi', items: [
    { name: '频段与信道', desc: '2.4G/5G/6G。' },
    { name: '协议代际', desc: 'Wi-Fi 5/6/7。' },
    { name: '干扰与漫游', desc: '信道规划与 802.11r。' }
  ] },
  { name: '排障', items: [
    { name: '链路质量', desc: '丢包、重传、信号强度。' },
    { name: '抓包位置', desc: '有线侧与无线侧对照。' }
  ] }
] };
