/* ============================================================
 * 知识点：软件工程 / 架构 / 安全 / 图形与多媒体
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  { id:'architecture', name:'架构模式', layer:'应用层', domain:'可用性', status:'待补充',
    tracks:['后端','工程'], before:['spring','rest'],
    keywords:['分层架构','六边形','事件驱动','cqrs','架构设计'],
    children:[
      { name:'分层架构', desc:'接口层、应用层、领域层与基础设施层。' },
      { name:'六边形架构', desc:'端口与适配器，把外部依赖挡在核心之外。' },
      { name:'事件驱动', desc:'通过事件解耦生产者与消费者。' },
      { name:'CQRS', desc:'读写模型分离及其代价。' },
      { name:'单体与微服务', desc:'先模块化，再按需要拆分。' }
    ],
    description:'把系统切成合适的模块：分层、六边形、事件驱动；先想清楚边界，再决定拆不拆服务。' },

  { id:'ddd', name:'领域驱动设计', layer:'应用层', domain:'研发效率', status:'模糊',
    tracks:['后端','工程'], before:['architecture'],
    keywords:['领域驱动','聚合','限界上下文','实体','值对象','领域事件'],
    children:[
      { name:'限界上下文', desc:'业务边界与团队边界的对齐。' },
      { name:'聚合与实体', desc:'一致性边界与聚合根。' },
      { name:'值对象', desc:'用不可变对象表达概念。' },
      { name:'领域事件', desc:'业务事实的显式表达。' },
      { name:'防腐层', desc:'隔离外部模型对领域的侵蚀。' }
    ],
    description:'用业务语言划边界：限界上下文、聚合与领域事件，避免把业务写成贫血的 CRUD。' },

  { id:'test-strategy', name:'测试体系', layer:'应用层', domain:'研发效率', status:'待补充',
    tracks:['测试','工程'], before:['unit-test','api-test'],
    keywords:['测试金字塔','契约测试','回归','端到端','冒烟','测试策略'],
    children:[
      { name:'测试金字塔', desc:'单元多、接口中、端到端少。' },
      { name:'契约测试', desc:'服务之间的接口约定由双方共同验证。' },
      { name:'端到端测试', desc:'从用户视角跑通关键路径。' },
      { name:'回归与冒烟', desc:'改动之后的快速兜底。' },
      { name:'测试数据', desc:'造数、脱敏与隔离。' }
    ],
    description:'单元、接口、端到端怎么配比；金字塔失衡会让回归又慢又脆，接口层通常性价比最高。' },

  { id:'code-quality', name:'代码质量与重构', layer:'应用层', domain:'研发效率', status:'待补充',
    tracks:['工程','后端'], before:['git','codereview'],
    keywords:['重构','静态分析','lint','代码规范','坏味道','技术债'],
    children:[
      { name:'命名与结构', desc:'可读性从命名和函数长度开始。' },
      { name:'重复与耦合', desc:'DRY 的边界与过度抽象。' },
      { name:'静态分析', desc:'lint、类型检查与扫描规则。' },
      { name:'重构手法', desc:'小步、可回滚、测试保护。' },
      { name:'技术债', desc:'记录、评估与偿还节奏。' }
    ],
    description:'可读性、重复与耦合；静态分析和重构是控制技术债的日常手段，评审把它制度化。' },

  { id:'documentation', name:'技术文档', layer:'应用层', domain:'研发效率', status:'待补充',
    tracks:['工程'], before:['git'],
    keywords:['文档','readme','adr','注释','wiki','接口文档'],
    children:[
      { name:'README 与上手', desc:'新人十分钟能跑起来。' },
      { name:'设计文档 ADR', desc:'记录决策与取舍，而不只是结论。' },
      { name:'接口文档', desc:'契约、示例与错误码。' },
      { name:'变更记录', desc:'版本之间发生了什么。' },
      { name:'注释原则', desc:'解释为什么，不复述代码。' }
    ],
    description:'让陌生人能上手：README、设计决策记录、接口文档与变更日志，比口头传承可靠。' },

  { id:'web-security', name:'Web 安全', layer:'应用层', domain:'安全', status:'待补充',
    tracks:['安全','后端','前端'], before:['rest','html-css'],
    keywords:['owasp','xss','csrf','sql注入','ssrf','越权','上传'],
    children:[
      { name:'SQL 注入', desc:'参数化查询与最小权限。' },
      { name:'XSS', desc:'输出编码、CSP 与富文本清洗。' },
      { name:'CSRF', desc:'SameSite、Token 与来源校验。' },
      { name:'SSRF', desc:'内网地址与跳转校验。' },
      { name:'越权', desc:'水平与垂直权限校验。' },
      { name:'文件上传', desc:'类型、大小、存储与执行隔离。' }
    ],
    description:'OWASP Top 10 那一类问题：注入、XSS、CSRF、SSRF 与越权，大多源于把用户输入当成可信。' },

  { id:'threat-model', name:'威胁建模', layer:'应用层', domain:'安全', status:'模糊',
    tracks:['安全','工程'], before:['web-security'],
    keywords:['stride','威胁建模','攻击面','信任边界','风险'],
    children:[
      { name:'STRIDE', desc:'六类威胁与对应缓解。' },
      { name:'攻击面分析', desc:'入口、数据流与信任边界。' },
      { name:'信任边界', desc:'哪里开始不再信任上游输入。' },
      { name:'风险评级', desc:'可能性与影响，决定修不修。' }
    ],
    description:'在写代码前问"谁会怎么攻击"：STRIDE、信任边界与攻击面，比事后补洞便宜得多。' },

  { id:'graphics', name:'计算机图形学', layer:'应用层', domain:'性能', status:'模糊',
    tracks:['前端','算法'], before:['linear-algebra'],
    keywords:['图形学','渲染','着色器','光栅化','opengl','webgl','游戏引擎'],
    children:[
      { name:'光栅化', desc:'三角形如何变成像素。' },
      { name:'光照与材质', desc:'BRDF、阴影与环境光。' },
      { name:'着色器 GLSL', desc:'顶点与片元阶段的并行程序。' },
      { name:'纹理与采样', desc:'UV、过滤与 Mipmap。' },
      { name:'游戏引擎', desc:'场景图、资源管线与物理。' }
    ],
    description:'把三维场景画到屏幕上：光栅化、光照、着色器与纹理，游戏引擎是它的大型工程化。' },

  { id:'video', name:'音视频与编解码', layer:'应用层', domain:'性能', status:'模糊',
    tracks:['后端','移动端'], before:['tcpip'],
    keywords:['音视频','编解码','h264','av1','hls','dash','ffmpeg','转码'],
    children:[
      { name:'编码与封装', desc:'压缩算法与容器格式。' },
      { name:'H.264 / AV1', desc:'兼容性与压缩率的取舍。' },
      { name:'HLS 与 DASH', desc:'切片、清单与自适应码率。' },
      { name:'转码与切片', desc:'按分辨率与码率生成多档。' },
      { name:'播放器', desc:'缓冲、首帧与错误恢复。' }
    ],
    description:'采集、编码、传输、播放：H.264/AV1 与 HLS/DASH 是主流链路，延迟和带宽始终在权衡。' }

]);
