/* ============================================================
 * 节点内部详细拆解：Web 安全 / 前端 / 浏览器
 * ============================================================ */
window.KB = window.KB || {};
KB.DETAILS = KB.DETAILS || {};

KB.DETAILS['web-security'] = { groups: [
  { name: '注入类', items: [
    { name: 'SQL 注入', desc: '拼接 SQL 的后果；预编译与最小权限。' },
    { name: '命令注入', desc: '把用户输入拼进 shell；参数化与白名单。' },
    { name: '模板注入 SSTI', desc: '模板引擎把输入当代码执行。' },
    { name: 'XPath / LDAP 注入', desc: '少见但同样致命。' }
  ] },
  { name: '浏览器侧', items: [
    { name: 'XSS', desc: '存储型、反射型、DOM 型；转义与 CSP。' },
    { name: 'CSRF', desc: '借用登录态发请求；SameSite 与 token。' },
    { name: '点击劫持', desc: 'iframe 覆盖；X-Frame-Options。' },
    { name: '开放重定向', desc: '跳转参数被利用做钓鱼。' },
    { name: 'CORS 配置错误', desc: 'Origin 反射 + 携带凭证。' }
  ] },
  { name: '服务端', items: [
    { name: 'SSRF', desc: '让服务器替你访问内网；元数据接口最危险。' },
    { name: '文件上传漏洞', desc: '类型校验、后缀绕过、上传目录不可执行。' },
    { name: '路径穿越', desc: '../../ 读到不该读的文件。' },
    { name: '反序列化', desc: '不可信数据反序列化执行代码。' },
    { name: '越权', desc: '水平/垂直越权；每个接口都要鉴权。' },
    { name: '认证绕过', desc: 'JWT 算法混淆、弱口令、会话固定。' }
  ] },
  { name: '防护与治理', items: [
    { name: '输入校验', desc: '白名单优先；服务端校验不能被绕过。' },
    { name: '输出编码', desc: '按上下文编码 HTML/JS/URL/SQL。' },
    { name: 'CSP 与安全头', desc: 'CSP、HSTS、X-Content-Type-Options。' },
    { name: 'WAF 规则', desc: '拦截常见 payload；误报调优。' },
    { name: '安全开发生命周期', desc: '威胁建模、代码审计、依赖扫描。' }
  ] },
  { name: '漏洞管理', items: [
    { name: 'CVE 与 CVSS', desc: '漏洞编号与评分。' },
    { name: '依赖漏洞', desc: 'SCA 扫描、SBOM。' },
    { name: '渗透测试', desc: '授权范围内的验证与报告。' },
    { name: '应急响应', desc: '隔离、取证、修复、复盘。' }
  ] }
] };

KB.DETAILS.cryptography = { groups: [
  { name: '对称加密', items: [
    { name: 'AES', desc: '分组密码；GCM 模式的认证加密。' },
    { name: 'ChaCha20', desc: '移动端友好的流密码。' },
    { name: '分组模式', desc: 'ECB 不安全；CBC 需要随机 IV。' }
  ] },
  { name: '非对称加密', items: [
    { name: 'RSA', desc: '大数分解；密钥长度与填充。' },
    { name: 'ECC', desc: '椭圆曲线；更短密钥同等安全。' },
    { name: '密钥交换', desc: 'DH/ECDHE 与前向保密。' }
  ] },
  { name: '哈希与 MAC', items: [
    { name: 'SHA-2 / SHA-3', desc: '摘要算法；不要用 MD5/SHA1 做安全用途。' },
    { name: 'HMAC', desc: '带密钥的完整性校验。' },
    { name: '加盐与慢哈希', desc: 'bcrypt/argon2 存密码。' }
  ] },
  { name: '签名与证书', items: [
    { name: '数字签名', desc: '私钥签、公钥验。' },
    { name: 'PKI 与证书链', desc: '根证书、中间证书、域名校验。' },
    { name: 'TLS 握手', desc: '密钥协商与证书验证顺序。' }
  ] },
  { name: '应用与坑', items: [
    { name: '随机数', desc: '必须用 CSPRNG。' },
    { name: '密钥管理', desc: 'KMS、轮换、不入库。' },
    { name: '常见误用', desc: '自创加密、固定 IV、ECB 模式。' }
  ] }
] };

KB.DETAILS.tls = { groups: [
  { name: '握手', items: [
    { name: 'TLS 1.2 握手', desc: 'ClientHello → ServerHello → 证书 → 密钥交换。' },
    { name: 'TLS 1.3', desc: '1-RTT/0-RTT、移除弱算法。' },
    { name: 'SNI', desc: '一个 IP 多个域名。' }
  ] },
  { name: '证书', items: [
    { name: '证书链', desc: '服务器必须下发中间证书。' },
    { name: 'Let’s Encrypt', desc: 'ACME 自动签发与续期。' },
    { name: '常见报错', desc: '过期、域名不匹配、链不完整。' }
  ] },
  { name: '配置', items: [
    { name: '协议与套件', desc: '禁用 SSLv3/TLS1.0/1.1。' },
    { name: 'HSTS', desc: '强制 HTTPS 与 preload。' },
    { name: 'OCSP stapling', desc: '减少证书状态查询延迟。' }
  ] },
  { name: '排障', items: [
    { name: 'openssl s_client', desc: '看握手与证书链。' },
    { name: 'curl -v', desc: '确认实际协商的协议版本。' }
  ] }
] };

KB.DETAILS.authn = { groups: [
  { name: '凭据', items: [
    { name: '密码存储', desc: '加盐慢哈希；绝不存明文。' },
    { name: 'MFA', desc: 'TOTP、短信、硬件密钥。' },
    { name: 'WebAuthn', desc: '无密码登录与公钥凭据。' }
  ] },
  { name: '协议', items: [
    { name: 'OAuth 2.0', desc: '授权码模式与 PKCE。' },
    { name: 'OIDC', desc: '在 OAuth 上加身份层。' },
    { name: 'SAML', desc: '企业 SSO 常见协议。' },
    { name: 'JWT', desc: '结构、签名、过期与撤销难题。' }
  ] },
  { name: '会话', items: [
    { name: 'Cookie 属性', desc: 'HttpOnly、Secure、SameSite。' },
    { name: '会话固定与注销', desc: '登录后换 session id。' },
    { name: '刷新令牌', desc: '短期 access + 长期 refresh。' }
  ] }
] };

KB.DETAILS.authz = { groups: [
  { name: '模型', items: [
    { name: 'RBAC', desc: '角色 → 权限；最常见的模型。' },
    { name: 'ABAC', desc: '按属性与策略判断。' },
    { name: 'ReBAC', desc: '关系型授权（谁拥有、谁共享）。' }
  ] },
  { name: '实现', items: [
    { name: '接口级鉴权', desc: '每个入口都要校验，不能只在前端。' },
    { name: '数据级鉴权', desc: '只能看自己的数据；防水平越权。' },
    { name: '策略引擎', desc: 'OPA/Casbin 集中管理规则。' }
  ] },
  { name: '常见坑', items: [
    { name: 'IDOR', desc: '改 URL 里的 id 就能看别人的数据。' },
    { name: '管理员接口暴露', desc: '内网接口也要鉴权。' },
    { name: '权限缓存', desc: '回收权限后缓存未失效。' }
  ] }
] };

KB.DETAILS.waf = { groups: [
  { name: '防护能力', items: [
    { name: '规则拦截', desc: 'SQLi/XSS/RCE 特征匹配。' },
    { name: 'CC 防护', desc: '频率限制与人机校验。' },
    { name: 'Bot 管理', desc: '爬虫与自动化流量识别。' }
  ] },
  { name: '部署与调优', items: [
    { name: '部署形态', desc: '云 WAF、反向代理、SDK。' },
    { name: '误杀处理', desc: '白名单、规则例外、灰度。' },
    { name: '日志与告警', desc: '攻击日志接入 SIEM。' }
  ] },
  { name: 'DDoS', items: [
    { name: '流量型', desc: '带宽打满；清洗中心引流。' },
    { name: '应用层', desc: '慢连接、海量请求。' },
    { name: '应急流程', desc: '切高防、限流、封禁。' }
  ] }
] };

KB.DETAILS['threat-model'] = { groups: [
  { name: '方法', items: [
    { name: 'STRIDE', desc: '六类威胁的检查清单。' },
    { name: '攻击树', desc: '从目标反推攻击路径。' },
    { name: '数据流图', desc: '标出信任边界与数据存储。' }
  ] },
  { name: '落地', items: [
    { name: '资产与入口', desc: '先列清楚有哪些入口。' },
    { name: '风险排序', desc: '可能性 × 影响。' },
    { name: '缓解措施', desc: '每个威胁对应控制项。' }
  ] }
] };

KB.DETAILS.pentest = { groups: [
  { name: '流程', items: [
    { name: '信息收集', desc: '域名、端口、指纹、泄露信息。' },
    { name: '漏洞验证', desc: 'PoC 与影响范围。' },
    { name: '报告与复测', desc: '复现步骤、修复建议、复测确认。' }
  ] },
  { name: '工具', items: [
    { name: '扫描器', desc: 'Nmap、Nessus、 nuclei。' },
    { name: 'Web 测试', desc: 'Burp Suite 代理与重放。' },
    { name: '权限提升', desc: '主机与容器逃逸思路。' }
  ] },
  { name: '规范', items: [
    { name: '授权范围', desc: '书面授权与时间窗口。' },
    { name: '数据保护', desc: '不带走业务数据。' },
    { name: '漏洞管理', desc: '分级、修复 SLA、复测闭环。' }
  ] }
] };

KB.DETAILS.secrets = { groups: [
  { name: '存储', items: [
    { name: 'KMS / Vault', desc: '集中管理与审计。' },
    { name: '环境变量', desc: '比写进代码好，但仍可能泄露。' },
    { name: '密钥轮换', desc: '定期换、可回滚。' }
  ] },
  { name: '使用', items: [
    { name: '最小权限', desc: '每个服务独立凭据。' },
    { name: '不落日志', desc: '脱敏与审计。' },
    { name: '配置中心', desc: '灰度下发与版本。' }
  ] },
  { name: '泄露应急', items: [
    { name: '扫描仓库', desc: 'gitleaks/trufflehog。' },
    { name: '立即吊销', desc: '先止血再排查。' },
    { name: '复盘', desc: '入口、影响面、改进项。' }
  ] }
] };

KB.DETAILS.browser = { groups: [
  { name: '渲染', items: [
    { name: '关键渲染路径', desc: 'HTML → DOM、CSS → CSSOM、布局、绘制、合成。' },
    { name: '重排与重绘', desc: '改几何属性 vs 改颜色。' },
    { name: '合成层', desc: 'transform/opacity 走 GPU。' }
  ] },
  { name: 'JS 运行时', items: [
    { name: '事件循环', desc: '宏任务、微任务与渲染时机。' },
    { name: '内存与 GC', desc: '闭包与泄漏。' },
    { name: 'Web Worker', desc: '把重计算挪出主线程。' }
  ] },
  { name: '存储', items: [
    { name: 'Cookie', desc: '自动携带、容量小。' },
    { name: 'localStorage / sessionStorage', desc: '同步 API、容量与作用域。' },
    { name: 'IndexedDB', desc: '异步、大容量结构化数据。' }
  ] },
  { name: '安全边界', items: [
    { name: '同源策略', desc: '脚本能读什么。' },
    { name: '沙箱与站点隔离', desc: '进程隔离。' },
    { name: 'CSP', desc: '限制资源加载与内联脚本。' }
  ] }
] };

KB.DETAILS['js-ts'] = { groups: [
  { name: '语言核心', items: [
    { name: '作用域与闭包', desc: '词法作用域、变量提升、闭包捕获。' },
    { name: '原型与继承', desc: '原型链、class 语法糖。' },
    { name: 'this 指向', desc: '调用方式决定 this；箭头函数例外。' },
    { name: '异步', desc: '回调 → Promise → async/await。' },
    { name: '模块', desc: 'ESM 与 CommonJS 的差异。' }
  ] },
  { name: 'TypeScript', items: [
    { name: '类型基础', desc: 'interface/type、联合与交叉。' },
    { name: '泛型', desc: '约束与推断。' },
    { name: '类型收窄', desc: 'typeof、in、判别联合。' },
    { name: '工具类型', desc: 'Partial/Pick/Omit/Record。' },
    { name: '严格模式', desc: 'strictNullChecks 与 any 的代价。' }
  ] },
  { name: '工程实践', items: [
    { name: '错误处理', desc: 'Promise 拒绝与全局兜底。' },
    { name: '性能', desc: '防抖节流、虚拟列表、避免强制同步布局。' },
    { name: '测试', desc: 'Vitest/Jest 与 DOM 测试。' },
    { name: '构建产物', desc: 'tree-shaking 与体积分析。' }
  ] }
] };

KB.DETAILS['html-css'] = { groups: [
  { name: 'HTML', items: [
    { name: '语义化标签', desc: 'header/nav/main/section/footer。' },
    { name: '表单与可访问性', desc: 'label、aria、键盘操作。' },
    { name: '元信息', desc: 'viewport、SEO、Open Graph。' }
  ] },
  { name: 'CSS 布局', items: [
    { name: '盒模型', desc: 'content-box 与 border-box。' },
    { name: 'Flex', desc: '主轴交叉轴、flex-grow/shrink。' },
    { name: 'Grid', desc: '二维布局与命名区域。' },
    { name: '定位与层叠', desc: 'position、z-index、层叠上下文。' },
    { name: '响应式', desc: '媒体查询、容器查询、clamp。' }
  ] },
  { name: '视觉与动效', items: [
    { name: '变量与主题', desc: 'CSS 自定义属性。' },
    { name: '过渡与动画', desc: 'transition、keyframes、prefers-reduced-motion。' },
    { name: '性能', desc: '避免布局抖动；will-change 适度用。' }
  ] }
] };

KB.DETAILS['frontend-framework'] = { groups: [
  { name: '组件模型', items: [
    { name: '声明式渲染', desc: '状态 → UI，不手工操作 DOM。' },
    { name: '组件通信', desc: 'props、事件、上下文/依赖注入。' },
    { name: '生命周期', desc: '挂载、更新、卸载与副作用清理。' }
  ] },
  { name: '状态管理', items: [
    { name: '本地状态', desc: '组件内状态与派生状态。' },
    { name: '全局状态', desc: 'Redux/Pinia/Zustand 的取舍。' },
    { name: '服务端状态', desc: '缓存、失效与重试。' }
  ] },
  { name: '路由与渲染', items: [
    { name: '路由', desc: 'history 模式与懒加载。' },
    { name: 'SSR/SSG', desc: '首屏与 SEO 的取舍。' },
    { name: '水合', desc: '服务端 HTML 与客户端状态对齐。' }
  ] },
  { name: '工程化', items: [
    { name: '构建工具', desc: 'Vite 的按需编译。' },
    { name: '代码分割', desc: '路由级与组件级。' },
    { name: '组件库', desc: '设计系统与主题。' }
  ] }
] };

KB.DETAILS['fe-performance'] = { groups: [
  { name: '指标', items: [
    { name: 'LCP', desc: '最大内容绘制；图片与字体优化。' },
    { name: 'INP', desc: '交互响应；拆分长任务。' },
    { name: 'CLS', desc: '布局偏移；给媒体预留尺寸。' }
  ] },
  { name: '优化手段', items: [
    { name: '资源加载', desc: 'preload/prefetch、字体子集化。' },
    { name: '图片', desc: 'WebP/AVIF、响应式尺寸、懒加载。' },
    { name: '缓存', desc: '强缓存 + 内容哈希。' },
    { name: '代码', desc: 'tree-shaking、按需引入。' }
  ] },
  { name: '度量', items: [
    { name: 'Lighthouse', desc: '实验室数据。' },
    { name: 'RUM', desc: '真实用户监控。' },
    { name: '性能预算', desc: '把体积与指标写进 CI。' }
  ] }
] };

KB.DETAILS['http-cache'] = { groups: [
  { name: '缓存规则', items: [
    { name: '强缓存', desc: 'Cache-Control/Expires。' },
    { name: '协商缓存', desc: 'ETag/Last-Modified。' },
    { name: '缓存位置', desc: '浏览器内存、磁盘、CDN。' }
  ] },
  { name: '实践', items: [
    { name: '内容哈希', desc: '文件名带 hash 才能长缓存。' },
    { name: 'HTML 不缓存', desc: '入口文件要能及时更新。' },
    { name: 'CDN 刷新', desc: '预热与刷新策略。' }
  ] }
] };

KB.DETAILS.spa = { groups: [
  { name: '核心机制', items: [
    { name: '前端路由', desc: 'history.pushState 与 popstate。' },
    { name: '按需加载', desc: '路由级代码分割。' },
    { name: '状态保持', desc: '刷新后的状态恢复。' }
  ] },
  { name: '部署', items: [
    { name: 'history 回退', desc: 'Nginx try_files 到 index.html。' },
    { name: '静态托管', desc: '对象存储 + CDN。' },
    { name: '鉴权', desc: '登录态与路由守卫。' }
  ] }
] };
