/* ============================================================
 * 知识点：客户端 / 前端 / 移动端
 * 这里的节点会追加到 KB.NODES，字段说明见 nodes.js
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  { id:'html-css', name:'结构与样式 HTML/CSS', layer:'用户与客户端', domain:'研发效率', status:'待补充',
    tracks:['前端','语言'], before:['browser'],
    keywords:['html','css','布局','flex','grid','响应式','盒模型'],
    children:[
      { name:'盒模型与布局', desc:'margin/border/padding/content 与标准流。' },
      { name:'Flex 与 Grid', desc:'一维与二维布局的现代方案。' },
      { name:'响应式与媒体查询', desc:'断点、流式单位与移动优先。' },
      { name:'CSS 变量与预处理器', desc:'主题、复用与构建期能力。' },
      { name:'语义化与可访问性', desc:'标签语义、ARIA 与键盘可达。' }
    ],
    description:'结构与样式的语言：盒模型、Flex/Grid 与响应式，语义化决定可访问性和 SEO。' },

  { id:'frontend-framework', name:'前端框架', layer:'用户与客户端', domain:'研发效率', status:'待补充',
    tracks:['前端'], before:['html-css','js-ts'],
    keywords:['react','vue','angular','组件','状态管理','hooks','ssr'],
    children:[
      { name:'组件化', desc:'把界面拆成可复用的单元。' },
      { name:'状态管理', desc:'局部状态、全局状态与服务端状态。' },
      { name:'路由', desc:'前端路由与按页拆包。' },
      { name:'生命周期与 Hooks', desc:'副作用、依赖与渲染时机。' },
      { name:'服务端渲染 SSR', desc:'首屏与 SEO 的取舍。' }
    ],
    description:'React / Vue 这类组件化框架：组件、状态、路由与 SSR，复杂度主要在状态边界。' },

  { id:'build-tool', name:'前端构建', layer:'用户与客户端', domain:'交付运维', status:'模糊',
    tracks:['前端','工程'], before:['js-ts','git'],
    keywords:['vite','webpack','rollup','esbuild','打包','babel','拆包'],
    children:[
      { name:'打包与拆包', desc:'入口、chunk 拆分与按需加载。' },
      { name:'热更新 HMR', desc:'开发时局部替换模块。' },
      { name:'转译与 polyfill', desc:'目标浏览器与语法降级。' },
      { name:'资源指纹', desc:'hash 文件名与长期缓存。' },
      { name:'产物分析', desc:'体积、依赖与首屏关键路径。' }
    ],
    description:'把源码打包成浏览器高效加载的产物；拆包、缓存与构建速度直接影响体验和发布效率。' },

  { id:'fe-performance', name:'前端性能', layer:'用户与客户端', domain:'性能', status:'模糊',
    tracks:['前端'], before:['browser','build-tool'],
    keywords:['lcp','inp','cls','首屏','懒加载','性能指标','web vitals'],
    children:[
      { name:'首屏与懒加载', desc:'关键资源优先，非关键延后。' },
      { name:'图片与字体优化', desc:'格式、尺寸、预加载与字体回退。' },
      { name:'缓存与预加载', desc:'强缓存、预取与预连接。' },
      { name:'渲染阻塞', desc:'CSS/JS 阻塞与 defer/async。' },
      { name:'核心性能指标', desc:'LCP、INP、CLS 分别管什么。' }
    ],
    description:'首屏、交互延迟与布局抖动；LCP/INP/CLS 是三个核心指标，优化要先测量。' },

  { id:'cross-platform', name:'跨端开发', layer:'用户与客户端', domain:'研发效率', status:'模糊',
    tracks:['前端','移动端'], before:['frontend-framework','mobile'],
    keywords:['react native','flutter','小程序','taro','跨端','hybrid'],
    children:[
      { name:'小程序', desc:'双线程模型、分包与平台限制。' },
      { name:'React Native', desc:'JS 驱动原生组件的桥接。' },
      { name:'Flutter', desc:'自绘引擎与一致的渲染表现。' },
      { name:'混合 H5', desc:'WebView 容器与原生桥。' },
      { name:'原生桥接', desc:'JS 与原生通信、线程与性能。' }
    ],
    description:'一套代码跑多端：小程序、React Native、Flutter，代价是平台差异与性能损耗。' },

  { id:'ios', name:'iOS 系统', layer:'嵌入式与设备', domain:'交付运维', status:'模糊',
    tracks:['移动端','嵌入式'], before:['linux'],
    keywords:['swift','objective-c','uikit','swiftui','苹果','app store'],
    children:[
      { name:'Swift 与 Objective-C', desc:'现代语法与历史包袱并存。' },
      { name:'UIKit / SwiftUI', desc:'命令式与声明式两套 UI 体系。' },
      { name:'权限与沙盒', desc:'能力申请、隐私清单与沙盒目录。' },
      { name:'打包与上架', desc:'证书、描述文件与审核规则。' },
      { name:'推送与深链', desc:'APNs、Universal Links。' }
    ],
    description:'苹果的移动系统：Swift、UIKit/SwiftUI、沙盒权限与 App Store 审核。' }

]);
