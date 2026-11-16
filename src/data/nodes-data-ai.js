/* ============================================================
 * 知识点：AI / 数据 / 数学与算法
 * ============================================================ */
window.KB = window.KB || {};
window.KB.NODES = (window.KB.NODES || []).concat([

  /* ---------- AI 与智能应用 ---------- */
  { id:'ml-basics', name:'机器学习基础', layer:'AI 与智能应用', domain:'研发效率', status:'模糊',
    tracks:['AI','数据','算法'], before:['python','probability'],
    keywords:['机器学习','监督学习','无监督','过拟合','特征','交叉验证'],
    children:[
      { name:'监督与无监督', desc:'有标签分类回归 vs 聚类降维。' },
      { name:'特征工程', desc:'把业务信息变成模型能吃的样子。' },
      { name:'损失函数', desc:'优化目标决定了模型学什么。' },
      { name:'过拟合与正则', desc:'模型复杂度与泛化能力。' },
      { name:'交叉验证', desc:'小数据下更稳的评估方式。' },
      { name:'评估指标', desc:'准确率、召回、AUC 的适用场景。' }
    ],
    description:'从数据里学规律：监督/无监督、损失函数与过拟合，先把问题翻译成可学习的目标。' },

  { id:'deep-learning', name:'深度学习', layer:'AI 与智能应用', domain:'性能', status:'模糊',
    tracks:['AI'], before:['ml-basics','linear-algebra','gpu'],
    keywords:['神经网络','反向传播','pytorch','tensorflow','训练','梯度下降'],
    children:[
      { name:'神经网络', desc:'层、激活函数与参数。' },
      { name:'反向传播', desc:'链式法则逐层求梯度。' },
      { name:'优化器', desc:'SGD、Adam 与学习率调度。' },
      { name:'正则与 Dropout', desc:'抑制过拟合。' },
      { name:'PyTorch / TensorFlow', desc:'张量、自动微分与分布式训练。' }
    ],
    description:'多层网络自动学特征；反向传播、优化器与正则化是训练三件套，算力决定能走多远。' },

  { id:'cnn-rnn', name:'CNN 与 RNN', layer:'AI 与智能应用', domain:'性能', status:'模糊',
    tracks:['AI'], before:['deep-learning'],
    keywords:['卷积','池化','循环网络','lstm','序列','感受野'],
    children:[
      { name:'卷积 CNN', desc:'局部连接、权值共享与感受野。' },
      { name:'池化', desc:'降采样与平移不变性。' },
      { name:'RNN / LSTM', desc:'序列建模与长依赖问题。' },
      { name:'序列到序列', desc:'编码器-解码器结构。' }
    ],
    description:'图像用卷积、序列用循环；理解感受野与长依赖，才能判断什么时候该换成 Transformer。' },

  { id:'transformer', name:'Transformer 与注意力', layer:'AI 与智能应用', domain:'性能', status:'模糊',
    tracks:['AI'], before:['deep-learning'],
    keywords:['注意力','self-attention','多头','位置编码','kv cache','transformer'],
    children:[
      { name:'自注意力', desc:'每个位置看所有位置，复杂度 O(n²)。' },
      { name:'多头注意力', desc:'不同子空间捕捉不同关系。' },
      { name:'位置编码', desc:'注意力本身不含顺序信息。' },
      { name:'残差与 LayerNorm', desc:'深层网络的稳定器。' },
      { name:'KV Cache', desc:'推理时缓存历史键值，换速度吃显存。' }
    ],
    description:'自注意力取代循环结构，是今天所有大模型的骨架；KV Cache 直接决定推理显存和吞吐。' },

  { id:'llm', name:'大语言模型', layer:'AI 与智能应用', domain:'研发效率', status:'待补充',
    tracks:['AI','后端'], before:['transformer'],
    keywords:['大模型','gpt','llama','预训练','上下文','幻觉','token'],
    children:[
      { name:'预训练', desc:'海量语料上的下一个 token 预测。' },
      { name:'指令微调 SFT', desc:'把基座模型变成会听指令的助手。' },
      { name:'RLHF 与对齐', desc:'用人类偏好调整输出倾向。' },
      { name:'上下文窗口', desc:'能看多长、记住多少。' },
      { name:'幻觉与评测', desc:'不知道时会编，需要外部事实约束。' },
      { name:'量化与蒸馏', desc:'用小模型和低精度换成本。' }
    ],
    description:'预训练 + 微调 + 对齐；上下文窗口、幻觉与成本是应用侧绕不开的现实约束。' },

  { id:'finetune', name:'微调与对齐', layer:'AI 与智能应用', domain:'研发效率', status:'模糊',
    tracks:['AI','后端'], before:['llm'],
    keywords:['微调','lora','qlora','sft','rlhf','dpo','蒸馏','对齐'],
    children:[
      { name:'全量微调', desc:'成本高，适合数据充足且任务差异大。' },
      { name:'LoRA / QLoRA', desc:'低秩适配，单卡也能微调。' },
      { name:'指令数据', desc:'数据质量比数量更重要。' },
      { name:'RLHF / DPO', desc:'偏好对齐的两代做法。' },
      { name:'蒸馏', desc:'把大模型能力迁移到小模型。' }
    ],
    description:'用少量数据把通用模型变成领域模型；LoRA 让单卡微调成为可能，数据质量决定上限。' },

  { id:'rag', name:'RAG 与向量检索', layer:'AI 与智能应用', domain:'研发效率', status:'待补充',
    tracks:['AI','后端','数据'], before:['llm','information-retrieval'],
    keywords:['检索增强','embedding','向量库','切分','召回','rerank','rag'],
    children:[
      { name:'文本切分', desc:'块大小、重叠与语义边界。' },
      { name:'向量化 Embedding', desc:'把文本映射到语义空间。' },
      { name:'向量库', desc:'近似最近邻检索与索引结构。' },
      { name:'混合检索', desc:'关键词与向量的互补。' },
      { name:'重排与引用', desc:'rerank 与答案溯源。' }
    ],
    description:'把私有知识切块、向量化、检索后塞进上下文；切分方式与召回率决定效果上限。' },

  { id:'agent', name:'Agent 与工具调用', layer:'AI 与智能应用', domain:'研发效率', status:'待补充',
    tracks:['AI','后端'], before:['llm','rest'],
    keywords:['智能体','工具调用','function calling','mcp','规划','react'],
    children:[
      { name:'工具调用', desc:'模型输出结构化参数，由程序执行。' },
      { name:'ReAct 与规划', desc:'思考、行动、观察的循环。' },
      { name:'多轮记忆', desc:'短期上下文与长期记忆分层。' },
      { name:'权限与沙箱', desc:'工具最小权限与执行隔离。' },
      { name:'MCP 协议', desc:'把工具和上下文标准化接入。' }
    ],
    description:'让模型规划步骤并调用工具；循环控制、权限与可观测性是落地难点，不是"套个壳"。' },

  { id:'inference', name:'推理与部署', layer:'AI 与智能应用', domain:'性能', status:'模糊',
    tracks:['AI','运维','后端'], before:['llm','docker'],
    keywords:['推理','vllm','tensorrt','量化','批处理','吞吐','延迟'],
    children:[
      { name:'批处理与吞吐', desc:'连续批处理把 GPU 填满。' },
      { name:'KV Cache', desc:'显存换速度，长度决定成本。' },
      { name:'量化 INT8/FP16', desc:'精度与速度的权衡。' },
      { name:'张量并行', desc:'多卡切分模型。' },
      { name:'vLLM / TensorRT', desc:'主流推理引擎的取舍。' }
    ],
    description:'把模型跑起来：批处理、KV Cache、量化与张量并行，吞吐和延迟要一起看，不能只看单条。' },

  { id:'multimodal', name:'多模态', layer:'AI 与智能应用', domain:'性能', status:'模糊',
    tracks:['AI'], before:['transformer'],
    keywords:['多模态','视觉语言','图文','语音识别','视频生成','clip'],
    children:[
      { name:'图文对齐 CLIP', desc:'用对比学习把图像和文本放到同一空间。' },
      { name:'视觉语言模型', desc:'看图回答与文档理解。' },
      { name:'语音识别', desc:'声学特征到文本。' },
      { name:'视频生成', desc:'时空一致性是主要难点。' }
    ],
    description:'文本之外：图像、语音、视频的统一表示与生成，评测比纯文本更难。' },

  { id:'rl', name:'强化学习', layer:'AI 与智能应用', domain:'性能', status:'模糊',
    tracks:['AI','算法'], before:['probability','ml-basics'],
    keywords:['强化学习','奖励','策略','q-learning','ppo','探索'],
    children:[
      { name:'马尔可夫决策', desc:'状态、动作、奖励与转移。' },
      { name:'Q-Learning', desc:'值函数与贝尔曼方程。' },
      { name:'策略梯度', desc:'直接优化策略。' },
      { name:'PPO', desc:'稳定训练的主流算法。' }
    ],
    description:'通过试错学策略：奖励设计、探索与训练稳定性是主要难点，对齐大模型也用它。' },

  { id:'ai-eval', name:'评测与 AI 安全', layer:'AI 与智能应用', domain:'可观测性', status:'模糊',
    tracks:['AI','测试'], before:['llm'],
    keywords:['评测','benchmark','红队','幻觉','对齐','越狱'],
    children:[
      { name:'基准测试', desc:'公开榜单与自建任务集。' },
      { name:'人工评测', desc:'成对比较与标注一致性。' },
      { name:'红队测试', desc:'越狱、注入与有害输出。' },
      { name:'幻觉检测', desc:'事实核查与引用验证。' },
      { name:'线上监控', desc:'延迟、成本与失败率。' }
    ],
    description:'模型好不好不能靠感觉：基准、人工评测与红队，线上还要盯幻觉、成本和越狱尝试。' },

  /* ---------- 数据 ---------- */
  { id:'data-modeling', name:'数据建模', layer:'数据层', domain:'一致性', status:'待补充',
    tracks:['数据'], before:['mysql'],
    keywords:['范式','er图','星型模型','宽表','维度建模'],
    children:[
      { name:'三范式', desc:'减少冗余与更新异常。' },
      { name:'ER 建模', desc:'实体、关系与基数。' },
      { name:'维度建模', desc:'事实表与维度表，服务分析。' },
      { name:'宽表与反范式', desc:'用冗余换查询性能。' }
    ],
    description:'表怎么设计：范式减少冗余，维度建模服务分析，宽表用冗余换查询性能。' },

  { id:'olap', name:'数据仓库与 OLAP', layer:'数据层', domain:'性能', status:'模糊',
    tracks:['数据'], before:['data-modeling','data-analysis'],
    keywords:['数据仓库','olap','多维分析','物化视图','clickhouse','列式'],
    children:[
      { name:'数仓分层', desc:'ODS、DWD、DWS 与 ADS。' },
      { name:'星型与雪花', desc:'维度模型的两种组织方式。' },
      { name:'列式存储', desc:'按列压缩与向量化执行。' },
      { name:'物化视图', desc:'预聚合换查询延迟。' },
      { name:'ClickHouse', desc:'高吞吐分析引擎的代表。' }
    ],
    description:'面向分析而不是交易：列存、预聚合与多维查询，和 OLTP 是两套设计思路。' },

  { id:'data-lake', name:'数据湖与湖仓', layer:'数据层', domain:'可用性', status:'模糊',
    tracks:['数据','运维'], before:['object-storage'],
    keywords:['数据湖','湖仓','iceberg','hudi','parquet','delta'],
    children:[
      { name:'原始层与清洗层', desc:'先原样落地，再分层加工。' },
      { name:'Parquet 文件格式', desc:'列式、压缩与谓词下推。' },
      { name:'Iceberg 表格式', desc:'快照、事务与时间旅行。' },
      { name:'湖仓一体', desc:'用表格式把数仓能力加到湖上。' }
    ],
    description:'先存下来再算：对象存储 + 开放表格式，湖仓一体是当前主流的数据底座。' },

  { id:'etl', name:'ETL 与数据管道', layer:'数据层', domain:'交付运维', status:'待补充',
    tracks:['数据'], before:['sql','data-lake'],
    keywords:['etl','elt','数据管道','airflow','调度','增量'],
    children:[
      { name:'抽取 Extract', desc:'全量与增量、CDC。' },
      { name:'转换 Transform', desc:'清洗、关联与聚合。' },
      { name:'加载 Load', desc:'幂等写入与分区覆盖。' },
      { name:'调度编排', desc:'依赖、重试与补数。' },
      { name:'增量与全量', desc:'成本与一致性的取舍。' }
    ],
    description:'把数据从源搬到仓：抽取、转换、加载，调度与增量策略决定时效性和成本。' },

  { id:'data-cleaning', name:'数据清洗', layer:'数据层', domain:'一致性', status:'待补充',
    tracks:['数据'], before:['sql'],
    keywords:['数据清洗','缺失值','去重','异常值','标准化','数据质量'],
    children:[
      { name:'缺失值处理', desc:'删除、填充与模型补全。' },
      { name:'去重与主键', desc:'业务主键与指纹去重。' },
      { name:'异常值检测', desc:'分布、规则与人工复核。' },
      { name:'格式标准化', desc:'单位、时区、编码与枚举。' },
      { name:'数据校验', desc:'空值率、范围与一致性断言。' }
    ],
    description:'脏数据不处理，后面全是错的：缺失、重复、异常与格式统一，要有可回归的校验规则。' },

  { id:'data-analysis', name:'数据分析', layer:'数据层', domain:'研发效率', status:'待补充',
    tracks:['数据'], before:['probability','sql'],
    keywords:['数据分析','ab测试','描述统计','假设检验','指标','归因'],
    children:[
      { name:'描述统计', desc:'分布、均值、分位数。' },
      { name:'假设检验', desc:'显著性、p 值与样本量。' },
      { name:'AB 实验', desc:'分流、指标与干扰因素。' },
      { name:'指标体系', desc:'北极星指标与拆解。' },
      { name:'归因分析', desc:'相关不等于因果。' }
    ],
    description:'从数据里得出结论：描述统计、假设检验与 AB 实验，先问"样本够不够、指标对不对"。' },

  { id:'data-viz', name:'数据可视化', layer:'数据层', domain:'可观测性', status:'待补充',
    tracks:['数据','前端'], before:['data-analysis'],
    keywords:['可视化','图表','bi','仪表盘','d3','echarts'],
    children:[
      { name:'图表选型', desc:'比较、趋势、分布与关系。' },
      { name:'仪表盘', desc:'一屏说清关键指标。' },
      { name:'交互式探索', desc:'下钻、筛选与联动。' },
      { name:'色彩与可读性', desc:'不误导比好看更重要。' }
    ],
    description:'让数据可读：图表选型、仪表盘与交互探索；比"好看"更重要的是不误导。' },

  { id:'data-governance', name:'数据治理', layer:'数据层', domain:'安全', status:'模糊',
    tracks:['数据','安全'], before:['data-modeling'],
    keywords:['数据治理','元数据','数据血缘','数据质量','权限','脱敏'],
    children:[
      { name:'元数据管理', desc:'表、字段、口径与负责人。' },
      { name:'数据血缘', desc:'一个指标从哪里来。' },
      { name:'质量规则', desc:'监控空值、波动与一致性。' },
      { name:'权限与脱敏', desc:'最小可见与敏感字段处理。' },
      { name:'生命周期', desc:'热、温、冷与归档。' }
    ],
    description:'数据资产要有账本：元数据、血缘、质量与权限，否则没人敢用、也没人敢删。' },

  { id:'information-retrieval', name:'信息检索', layer:'数据层', domain:'性能', status:'模糊',
    tracks:['数据','算法'], before:['data-structures'],
    keywords:['信息检索','倒排索引','bm25','向量检索','召回','排序'],
    children:[
      { name:'倒排索引', desc:'词到文档的映射。' },
      { name:'TF-IDF / BM25', desc:'经典相关性打分。' },
      { name:'向量检索', desc:'语义相似与 ANN 索引。' },
      { name:'召回与排序', desc:'两阶段架构。' },
      { name:'评估指标', desc:'召回率、MRR 与 NDCG。' }
    ],
    description:'从海量文本里找相关：倒排索引、BM25 与向量检索，召回和排序分开优化。' },

  { id:'knowledge-graph', name:'知识图谱', layer:'数据层', domain:'一致性', status:'模糊',
    tracks:['数据','AI','算法'], before:['graph-algorithms'],
    keywords:['知识图谱','rdf','本体','sparql','neo4j','实体关系'],
    children:[
      { name:'实体与关系', desc:'三元组与图结构。' },
      { name:'RDF 与本体', desc:'用标准词汇描述领域。' },
      { name:'SPARQL', desc:'图上的查询语言。' },
      { name:'图数据库', desc:'存储与遍历的工程实现。' },
      { name:'知识抽取', desc:'从文本里抽实体和关系。' }
    ],
    description:'把知识表示成实体和关系：本体、图查询与抽取，适合强关系、可解释的场景。' },

  { id:'object-storage', name:'对象存储', layer:'数据层', domain:'可用性', status:'待补充',
    tracks:['数据','运维'], before:['cloud'],
    keywords:['对象存储','s3','oss','分片上传','生命周期','预签名'],
    children:[
      { name:'Bucket 与对象', desc:'扁平命名空间与元数据。' },
      { name:'分片上传', desc:'大文件断点续传。' },
      { name:'预签名 URL', desc:'临时授权，不暴露密钥。' },
      { name:'生命周期与归档', desc:'冷热分层与成本。' }
    ],
    description:'存图片、视频、备份和大文件：桶、分片上传、预签名与生命周期，是数据湖的底座。' },

  /* ---------- 数学与算法基础 ---------- */
  { id:'discrete-math', name:'离散数学', layer:'数学与算法基础', domain:'研发效率', status:'模糊',
    tracks:['算法','语言'], before:[],
    keywords:['离散数学','集合','图论','逻辑','组合'],
    children:[
      { name:'集合与关系', desc:'等价关系、偏序与映射。' },
      { name:'图论', desc:'顶点、边、连通与树。' },
      { name:'命题逻辑', desc:'真值、推理与证明。' },
      { name:'组合计数', desc:'排列组合与鸽巢原理。' }
    ],
    description:'计算机的数学语言：集合、图、逻辑与计数，算法正确性证明的基础。' },

  { id:'linear-algebra', name:'线性代数', layer:'数学与算法基础', domain:'性能', status:'模糊',
    tracks:['算法','AI'], before:[],
    keywords:['线性代数','矩阵','向量','特征值','svd','张量'],
    children:[
      { name:'向量与矩阵', desc:'线性组合、秩与逆。' },
      { name:'线性变换', desc:'旋转、缩放与投影。' },
      { name:'特征值与 SVD', desc:'降维与矩阵分解。' },
      { name:'张量', desc:'高维数组与广播。' }
    ],
    description:'向量、矩阵与线性变换；深度学习和图形学的共同语言，也是性能优化的数学基础。' },

  { id:'probability', name:'概率论与统计', layer:'数学与算法基础', domain:'研发效率', status:'模糊',
    tracks:['算法','AI','数据'], before:[],
    keywords:['概率','统计','分布','贝叶斯','假设检验','期望'],
    children:[
      { name:'随机变量与分布', desc:'常见分布与适用场景。' },
      { name:'期望与方差', desc:'不确定性的度量。' },
      { name:'贝叶斯定理', desc:'先验、似然与后验。' },
      { name:'假设检验', desc:'显著性、p 值与置信区间。' },
      { name:'最大似然', desc:'参数估计的基本方法。' }
    ],
    description:'不确定性下的推理：分布、期望、贝叶斯与假设检验，是数据分析与机器学习的共同地基。' },

  { id:'calculus', name:'微积分与梯度', layer:'数学与算法基础', domain:'性能', status:'模糊',
    tracks:['算法','AI'], before:[],
    keywords:['微积分','导数','梯度','优化','链式法则','凸优化'],
    children:[
      { name:'极限与导数', desc:'变化率与切线。' },
      { name:'偏导与梯度', desc:'多变量下的最速方向。' },
      { name:'链式法则', desc:'反向传播的数学来源。' },
      { name:'凸优化', desc:'局部最优即全局最优的条件。' }
    ],
    description:'变化率与最优解：导数、梯度与链式法则，是梯度下降和反向传播的数学基础。' },

  { id:'data-structures', name:'数据结构', layer:'数学与算法基础', domain:'性能', status:'待补充',
    tracks:['算法','后端'], before:[],
    keywords:['数据结构','数组','链表','树','哈希表','堆','图'],
    children:[
      { name:'数组与链表', desc:'随机访问 vs 插入删除。' },
      { name:'栈与队列', desc:'后进先出与先进先出。' },
      { name:'哈希表', desc:'哈希函数、冲突与扩容。' },
      { name:'树与堆', desc:'二叉搜索树、平衡树与优先队列。' },
      { name:'图', desc:'邻接表与邻接矩阵。' }
    ],
    description:'数据的组织方式：数组、链表、哈希、树与图，直接决定每种操作的复杂度。' },

  { id:'algorithms', name:'算法设计', layer:'数学与算法基础', domain:'性能', status:'待补充',
    tracks:['算法','后端'], before:['data-structures','complexity'],
    keywords:['算法','排序','动态规划','贪心','分治','回溯','递归'],
    children:[
      { name:'排序与查找', desc:'比较排序、二分与哈希查找。' },
      { name:'递归与分治', desc:'拆成同类子问题。' },
      { name:'动态规划', desc:'状态、转移与重叠子问题。' },
      { name:'贪心', desc:'局部最优何时等于全局最优。' },
      { name:'回溯', desc:'枚举与剪枝。' }
    ],
    description:'解决问题的套路：排序、分治、动态规划与回溯，先想清楚复杂度和边界再写代码。' },

  { id:'complexity', name:'算法复杂度', layer:'数学与算法基础', domain:'性能', status:'待补充',
    tracks:['算法'], before:['discrete-math'],
    keywords:['复杂度','大o','时间复杂度','空间复杂度','摊还'],
    children:[
      { name:'大 O 记号', desc:'忽略常数看增长阶。' },
      { name:'时间复杂度', desc:'最好、最坏与平均。' },
      { name:'空间复杂度', desc:'递归栈与辅助结构。' },
      { name:'摊还分析', desc:'偶发高成本操作的平均代价。' }
    ],
    description:'算法好不好先看增长阶：大 O、时间与空间、摊还分析，是性能判断的第一把尺子。' },

  { id:'graph-algorithms', name:'图算法', layer:'数学与算法基础', domain:'性能', status:'模糊',
    tracks:['算法'], before:['data-structures'],
    keywords:['最短路','dijkstra','最小生成树','拓扑排序','dfs','bfs','并查集'],
    children:[
      { name:'遍历 DFS / BFS', desc:'深度与广度优先。' },
      { name:'最短路', desc:'Dijkstra、Bellman-Ford 与 Floyd。' },
      { name:'最小生成树', desc:'Prim 与 Kruskal。' },
      { name:'拓扑排序', desc:'依赖关系与环检测。' },
      { name:'并查集', desc:'连通性与路径压缩。' }
    ],
    description:'图上的经典问题：遍历、最短路、最小生成树与拓扑排序，调度和依赖分析都靠它们。' },

  { id:'computability', name:'计算理论', layer:'数学与算法基础', domain:'研发效率', status:'模糊',
    tracks:['算法'], before:['discrete-math'],
    keywords:['计算理论','自动机','图灵机','可计算性','p np'],
    children:[
      { name:'有限自动机', desc:'正则语言与状态机。' },
      { name:'图灵机', desc:'可计算性的形式定义。' },
      { name:'可计算性', desc:'停机问题与不可判定。' },
      { name:'P 与 NP', desc:'难解问题的边界。' }
    ],
    description:'什么问题能算、要算多久：自动机、图灵机与 P/NP，决定了哪些问题值得优化、哪些要换思路。' },

  { id:'information-theory', name:'信息论', layer:'数学与算法基础', domain:'性能', status:'模糊',
    tracks:['算法','网络'], before:['probability'],
    keywords:['信息论','熵','编码','压缩','香农','信道'],
    children:[
      { name:'信息熵', desc:'不确定性与信息量。' },
      { name:'信源编码', desc:'无损压缩的极限。' },
      { name:'信道容量', desc:'可靠传输的上限。' },
      { name:'压缩算法', desc:'哈夫曼、算术编码与字典压缩。' }
    ],
    description:'信息的度量与极限：熵、编码与压缩，是通信、存储和视频编码的理论边界。' },

  { id:'cryptography', name:'密码学', layer:'数学与算法基础', domain:'安全', status:'待补充',
    tracks:['安全','算法'], before:['discrete-math'],
    keywords:['密码学','对称加密','非对称','rsa','哈希','签名','aes'],
    children:[
      { name:'对称加密 AES', desc:'同一把密钥加解密。' },
      { name:'非对称 RSA/ECC', desc:'公钥加密与密钥交换。' },
      { name:'哈希与 HMAC', desc:'完整性校验与消息认证。' },
      { name:'数字签名', desc:'不可否认与身份绑定。' },
      { name:'密钥交换', desc:'在公开信道上协商密钥。' }
    ],
    description:'保密、完整与身份：对称/非对称加密、哈希与签名，是 TLS、证书和密钥管理的地基。' }

]);
