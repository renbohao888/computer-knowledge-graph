/* ============================================================
 * 节点内部详细拆解：补齐剩余节点
 * ============================================================ */
window.KB = window.KB || {};
KB.DETAILS = KB.DETAILS || {};

KB.DETAILS['pc-build'] = { groups: [
  { name: '选型', items: [
    { name: '需求与预算', desc: '办公、游戏、开发机的侧重点。' },
    { name: 'CPU 与主板', desc: '插槽、芯片组、供电。' },
    { name: '显卡与电源', desc: '功耗匹配与接口。' },
    { name: '内存与硬盘', desc: '双通道、容量与速度。' }
  ] },
  { name: '装机', items: [
    { name: '装配顺序', desc: '先板外点亮，再进机箱。' },
    { name: '风道与理线', desc: '进风出风与温度。' },
    { name: '点亮排障', desc: '最小系统法。' }
  ] },
  { name: '系统', items: [
    { name: 'BIOS 设置', desc: '启动顺序、XMP、虚拟化。' },
    { name: '驱动与稳定性', desc: '烤机与温度监控。' }
  ] }
] };

KB.DETAILS['build-tool'] = { groups: [
  { name: '核心能力', items: [
    { name: '模块解析', desc: 'ESM/CommonJS 与依赖图。' },
    { name: '转换与压缩', desc: 'Babel/ESBuild 与 minify。' },
    { name: '代码分割', desc: '动态 import 与 chunk。' }
  ] },
  { name: '工具', items: [
    { name: 'Vite', desc: '开发期原生 ESM、生产用 Rollup。' },
    { name: 'Webpack', desc: '生态成熟、配置复杂。' },
    { name: '构建分析', desc: '产物体积与依赖来源。' }
  ] },
  { name: '实践', items: [
    { name: '环境变量', desc: '开发/生产差异。' },
    { name: '缓存与增量', desc: '构建缓存与 CI。' }
  ] }
] };

KB.DETAILS['cross-platform'] = { groups: [
  { name: '方案', items: [
    { name: 'React Native', desc: 'JS 驱动原生组件。' },
    { name: 'Flutter', desc: '自绘引擎、一致性好。' },
    { name: '小程序/快应用', desc: '平台受限、流量入口。' }
  ] },
  { name: '工程', items: [
    { name: '原生桥接', desc: '能力扩展与性能。' },
    { name: '多端适配', desc: '布局、交互与权限。' },
    { name: '热更新与发布', desc: '合规与灰度。' }
  ] }
] };

KB.DETAILS['cnn-rnn'] = { groups: [
  { name: 'CNN', items: [
    { name: '卷积与池化', desc: '局部感受野与下采样。' },
    { name: '经典网络', desc: 'ResNet、MobileNet。' },
    { name: '应用', desc: '图像分类、检测、分割。' }
  ] },
  { name: 'RNN', items: [
    { name: '循环结构', desc: '隐状态与序列。' },
    { name: 'LSTM/GRU', desc: '门控与长依赖。' },
    { name: '应用', desc: '时序预测、语音。' }
  ] },
  { name: '演进', items: [
    { name: '注意力取代循环', desc: 'Transformer 的动机。' },
    { name: '混合结构', desc: 'CNN + Transformer。' }
  ] }
] };

KB.DETAILS['data-governance'] = { groups: [
  { name: '治理对象', items: [
    { name: '元数据', desc: '表、字段、血缘。' },
    { name: '数据质量', desc: '完整性、准确性、及时性。' },
    { name: '安全与权限', desc: '分级分类与脱敏。' }
  ] },
  { name: '机制', items: [
    { name: '数据标准', desc: '命名与口径。' },
    { name: '责任人与流程', desc: 'Owner 与变更审批。' },
    { name: '审计', desc: '访问日志与合规。' }
  ] }
] };

KB.DETAILS['object-storage'] = { groups: [
  { name: '模型', items: [
    { name: '桶与对象', desc: '扁平命名空间与 key。' },
    { name: '一致性', desc: '读写后一致性。' },
    { name: '版本与生命周期', desc: '历史版本与归档。' }
  ] },
  { name: '访问', items: [
    { name: '权限策略', desc: '桶策略与临时凭证。' },
    { name: '签名 URL', desc: '限时访问。' },
    { name: 'CDN 回源', desc: '静态资源加速。' }
  ] }
] };

KB.DETAILS.computability = { groups: [
  { name: '基础', items: [
    { name: '图灵机', desc: '可计算的定义。' },
    { name: '可判定与可识别', desc: '停机问题。' },
    { name: '归约', desc: '问题之间的难度关系。' }
  ] },
  { name: '复杂度', items: [
    { name: 'P 与 NP', desc: '验证与求解。' },
    { name: 'NP 完全', desc: 'SAT 与经典问题。' }
  ] }
] };

KB.DETAILS.registry = { groups: [
  { name: '机制', items: [
    { name: '服务注册', desc: '启动上报与心跳。' },
    { name: '健康检查', desc: '剔除不健康实例。' },
    { name: '服务发现', desc: '客户端/服务端发现。' }
  ] },
  { name: '实现', items: [
    { name: 'Nacos/Eureka', desc: 'AP 与 CP 的取舍。' },
    { name: 'Consul/etcd', desc: '强一致与 KV。' }
  ] }
] };

KB.DETAILS['config-center'] = { groups: [
  { name: '能力', items: [
    { name: '集中管理', desc: '多环境多租户。' },
    { name: '动态推送', desc: '不重启生效。' },
    { name: '版本与回滚', desc: '变更可追溯。' }
  ] },
  { name: '安全', items: [
    { name: '敏感配置', desc: '加密与权限。' },
    { name: '灰度发布', desc: '按实例/标签下发。' }
  ] }
] };

KB.DETAILS['distributed-tx'] = { groups: [
  { name: '方案', items: [
    { name: '2PC/3PC', desc: '强一致但阻塞。' },
    { name: 'TCC', desc: '业务补偿。' },
    { name: '本地消息表', desc: '最终一致。' },
    { name: 'Saga', desc: '长事务与补偿。' }
  ] },
  { name: '选型', items: [
    { name: '一致性要求', desc: '强一致还是最终一致。' },
    { name: '幂等与重试', desc: '补偿接口必须幂等。' }
  ] }
] };

KB.DETAILS.consensus = { groups: [
  { name: '算法', items: [
    { name: 'Paxos', desc: '多数派与提案。' },
    { name: 'Raft', desc: '选主、日志复制、安全性。' },
    { name: 'ZAB', desc: 'ZooKeeper 的广播协议。' }
  ] },
  { name: '工程', items: [
    { name: 'etcd/Consul', desc: '基于 Raft 的 KV。' },
    { name: '脑裂与多数派', desc: '为什么是奇数节点。' }
  ] }
] };

KB.DETAILS.compiler = { groups: [
  { name: '前端', items: [
    { name: '词法分析', desc: 'token 化。' },
    { name: '语法分析', desc: 'AST 与文法。' },
    { name: '语义分析', desc: '类型检查与符号表。' }
  ] },
  { name: '中后端', items: [
    { name: '中间表示', desc: 'IR 与优化。' },
    { name: '代码生成', desc: '寄存器分配与指令选择。' },
    { name: '链接', desc: '符号解析与重定位。' }
  ] }
] };

KB.DETAILS.interpreter = { groups: [
  { name: '执行模型', items: [
    { name: 'AST 解释', desc: '直接遍历语法树。' },
    { name: '字节码', desc: '虚拟机执行。' },
    { name: 'JIT', desc: '热点编译与去优化。' }
  ] },
  { name: '运行时', items: [
    { name: '垃圾回收', desc: '托管内存。' },
    { name: '内联缓存', desc: '动态类型优化。' }
  ] }
] };

KB.DETAILS.concurrency = { groups: [
  { name: '基础', items: [
    { name: '竞态条件', desc: '执行顺序影响结果。' },
    { name: '原子性与可见性', desc: '锁与内存屏障。' },
    { name: '死锁与活锁', desc: '四个必要条件。' }
  ] },
  { name: '工具', items: [
    { name: '互斥锁与读写锁', desc: '粒度与吞吐。' },
    { name: '无锁结构', desc: 'CAS 与 ABA。' },
    { name: '协程与调度', desc: '用户态并发。' }
  ] }
] };

KB.DETAILS.syscall = { groups: [
  { name: '机制', items: [
    { name: '用户态与内核态', desc: '特权级切换。' },
    { name: '系统调用入口', desc: 'syscall 指令与号表。' },
    { name: '中断与异常', desc: '硬中断、软中断、缺页。' }
  ] },
  { name: '常见调用', items: [
    { name: '文件与 IO', desc: 'open/read/write/epoll。' },
    { name: '进程', desc: 'fork/exec/wait。' },
    { name: '内存', desc: 'mmap/brk。' }
  ] },
  { name: '观测', items: [
    { name: 'strace', desc: '跟踪系统调用。' },
    { name: '上下文切换开销', desc: 'vmstat cs 列。' }
  ] }
] };
