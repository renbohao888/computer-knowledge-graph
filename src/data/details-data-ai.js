/* ============================================================
 * 节点内部详细拆解：数据 / AI / 数学与算法 / Python
 * ============================================================ */
window.KB = window.KB || {};
KB.DETAILS = KB.DETAILS || {};

KB.DETAILS['data-analysis'] = { groups: [
  { name: '统计基础', items: [
    { name: '描述统计', desc: '均值、中位数、分位数、方差。' },
    { name: '分布', desc: '正态、长尾、偏态；先看分布再算均值。' },
    { name: '假设检验', desc: 't 检验、卡方、p 值与置信区间。' },
    { name: 'A/B 实验', desc: '样本量、分流、显著性。' }
  ] },
  { name: '分析框架', items: [
    { name: '对比与拆解', desc: '同比环比、维度下钻。' },
    { name: '漏斗分析', desc: '转化率与流失点。' },
    { name: '留存与分层', desc: '同期群、用户分群。' },
    { name: '归因', desc: '多因素影响的归因方法。' }
  ] },
  { name: '工具', items: [
    { name: 'SQL 取数', desc: 'JOIN、窗口函数、口径统一。' },
    { name: 'pandas', desc: '读取、清洗、分组聚合。' },
    { name: 'Excel', desc: '透视表仍是沟通利器。' }
  ] },
  { name: '产出', items: [
    { name: '结论与建议', desc: '从数据到可执行动作。' },
    { name: '看板', desc: '核心指标与监控。' },
    { name: '数据故事', desc: '让非技术同事看懂。' }
  ] }
] };

KB.DETAILS['data-cleaning'] = { groups: [
  { name: '常见问题', items: [
    { name: '缺失值', desc: '删除、填充、插值；先判断缺失机制。' },
    { name: '异常值', desc: '3σ、IQR、业务规则。' },
    { name: '重复数据', desc: '主键与模糊去重。' },
    { name: '格式不一致', desc: '日期、单位、编码、大小写。' }
  ] },
  { name: '处理流程', items: [
    { name: '数据探查', desc: '分布、类型、空值率。' },
    { name: '标准化', desc: '口径统一与字段映射。' },
    { name: '校验规则', desc: '范围、枚举、外键完整性。' },
    { name: '留痕', desc: '清洗日志与可回溯。' }
  ] },
  { name: '工具', items: [
    { name: 'pandas / polars', desc: '向量化处理。' },
    { name: '正则与文本清洗', desc: '提取与规范化。' },
    { name: 'Great Expectations', desc: '数据质量断言。' }
  ] }
] };

KB.DETAILS['data-viz'] = { groups: [
  { name: '图表选择', items: [
    { name: '比较', desc: '柱状、条形、分组柱。' },
    { name: '趋势', desc: '折线、面积图。' },
    { name: '分布', desc: '直方图、箱线图、散点图。' },
    { name: '构成', desc: '堆叠柱、饼图慎用。' }
  ] },
  { name: '设计原则', items: [
    { name: '减少噪音', desc: '去掉不必要的网格与装饰。' },
    { name: '突出对比', desc: '颜色只用来表达信息。' },
    { name: '可读性', desc: '标签、单位、基线。' }
  ] },
  { name: '工具', items: [
    { name: 'ECharts / D3', desc: '交互与定制。' },
    { name: 'BI 工具', desc: 'Superset、Metabase、Tableau。' }
  ] }
] };

KB.DETAILS['data-modeling'] = { groups: [
  { name: '建模方法', items: [
    { name: '维度建模', desc: '事实表 + 维度表；星型与雪花。' },
    { name: '三范式', desc: '减少冗余与更新异常。' },
    { name: '宽表', desc: '查询性能与维护成本。' }
  ] },
  { name: '指标体系', items: [
    { name: '原子指标', desc: '不可再拆的基础度量。' },
    { name: '派生指标', desc: '比率、累计、同比环比。' },
    { name: '口径管理', desc: '同名不同义是数据事故源头。' }
  ] },
  { name: '分层', items: [
    { name: 'ODS', desc: '贴源层，保留原始数据。' },
    { name: 'DWD / DWS', desc: '明细与汇总。' },
    { name: 'ADS', desc: '面向应用的集市。' }
  ] }
] };

KB.DETAILS.olap = { groups: [
  { name: '概念', items: [
    { name: '多维分析', desc: '维度、度量、切片与钻取。' },
    { name: '列式存储', desc: '按列压缩与向量化计算。' },
    { name: '预聚合', desc: 'Cube 与物化视图。' }
  ] },
  { name: '引擎', items: [
    { name: 'ClickHouse', desc: '高吞吐单表分析。' },
    { name: 'Doris / StarRocks', desc: 'MPP 与联邦查询。' },
    { name: 'Presto / Trino', desc: '跨源查询。' }
  ] },
  { name: '使用', items: [
    { name: '分区与分桶', desc: '按时间分区、按 key 分桶。' },
    { name: '查询优化', desc: '避免全表扫描与大 JOIN。' }
  ] }
] };

KB.DETAILS['data-lake'] = { groups: [
  { name: '概念', items: [
    { name: '数据湖', desc: '原始数据集中存储。' },
    { name: '湖仓一体', desc: '事务、Schema 与性能。' },
    { name: '表格式', desc: 'Iceberg/Hudi/Delta。' }
  ] },
  { name: '治理', items: [
    { name: '元数据', desc: 'Catalog 与血缘。' },
    { name: '小文件', desc: '合并与压缩。' },
    { name: '权限', desc: '行级/列级访问控制。' }
  ] }
] };

KB.DETAILS.etl = { groups: [
  { name: '链路', items: [
    { name: '抽取', desc: '全量与增量；CDC。' },
    { name: '转换', desc: '清洗、关联、聚合。' },
    { name: '加载', desc: '批量与流式写入。' }
  ] },
  { name: '调度与质量', items: [
    { name: '调度系统', desc: 'Airflow、DolphinScheduler。' },
    { name: '幂等与重跑', desc: '分区覆盖、事务写入。' },
    { name: '数据质量', desc: '行数、空值率、主键唯一。' }
  ] }
] };

KB.DETAILS['ml-basics'] = { groups: [
  { name: '任务类型', items: [
    { name: '监督学习', desc: '分类与回归。' },
    { name: '无监督', desc: '聚类、降维。' },
    { name: '强化学习', desc: '与环境交互的序贯决策。' }
  ] },
  { name: '训练', items: [
    { name: '损失函数', desc: 'MSE、交叉熵。' },
    { name: '梯度下降', desc: '学习率与收敛。' },
    { name: '过拟合', desc: '正则化、早停、数据增强。' },
    { name: '交叉验证', desc: 'K 折与时间序列切分。' }
  ] },
  { name: '评估', items: [
    { name: '分类指标', desc: '准确率、精确率、召回率、F1、AUC。' },
    { name: '回归指标', desc: 'MAE、RMSE、R²。' },
    { name: '数据泄漏', desc: '特征里混入未来信息。' }
  ] },
  { name: '常见模型', items: [
    { name: '线性模型', desc: '可解释的基线。' },
    { name: '树模型', desc: '随机森林、XGBoost/LightGBM。' },
    { name: '特征工程', desc: '编码、归一化、交叉特征。' }
  ] }
] };

KB.DETAILS['deep-learning'] = { groups: [
  { name: '基础', items: [
    { name: '反向传播', desc: '链式法则与计算图。' },
    { name: '优化器', desc: 'SGD、Adam、学习率调度。' },
    { name: '激活函数', desc: 'ReLU 与梯度消失。' },
    { name: '归一化', desc: 'BatchNorm/LayerNorm。' }
  ] },
  { name: '网络结构', items: [
    { name: 'CNN', desc: '卷积、池化、感受野。' },
    { name: 'RNN/LSTM', desc: '序列建模与长依赖。' },
    { name: 'Transformer', desc: '注意力取代循环。' }
  ] },
  { name: '训练工程', items: [
    { name: '数据管道', desc: '批处理、打乱、增强。' },
    { name: '混合精度', desc: 'FP16/BF16 与稳定性。' },
    { name: '分布式训练', desc: '数据并行、模型并行。' }
  ] }
] };

KB.DETAILS.transformer = { groups: [
  { name: '注意力', items: [
    { name: 'Self-Attention', desc: 'QKV 与缩放点积。' },
    { name: '多头注意力', desc: '不同子空间的表示。' },
    { name: '位置编码', desc: '绝对与旋转位置编码。' }
  ] },
  { name: '结构', items: [
    { name: 'Encoder/Decoder', desc: '掩码与交叉注意力。' },
    { name: '残差与归一化', desc: 'Pre-LN 与 Post-LN。' },
    { name: '前馈网络', desc: 'FFN 的扩展比。' }
  ] },
  { name: '变体', items: [
    { name: 'GPT 系', desc: 'Decoder-only 自回归。' },
    { name: 'BERT 系', desc: 'Encoder 双向预训练。' },
    { name: '高效注意力', desc: '稀疏、线性与 FlashAttention。' }
  ] }
] };

KB.DETAILS.llm = { groups: [
  { name: '训练阶段', items: [
    { name: '预训练', desc: '下一 token 预测与规模定律。' },
    { name: '指令微调 SFT', desc: '让模型学会听指令。' },
    { name: '对齐 RLHF/DPO', desc: '有用、无害、诚实。' }
  ] },
  { name: '推理', items: [
    { name: '采样策略', desc: 'temperature、top-p、top-k。' },
    { name: '上下文窗口', desc: '长文本与注意力成本。' },
    { name: 'KV Cache', desc: '用显存换速度。' }
  ] },
  { name: '能力与局限', items: [
    { name: '幻觉', desc: '为什么一本正经地编造。' },
    { name: '工具调用', desc: 'Function Calling 与结构化输出。' },
    { name: '评测', desc: '基准与人工评估。' }
  ] },
  { name: '工程', items: [
    { name: '提示工程', desc: '角色、约束、示例、分解。' },
    { name: '上下文管理', desc: '摘要、检索、压缩。' },
    { name: '安全', desc: '提示注入与越狱防护。' }
  ] }
] };

KB.DETAILS.finetune = { groups: [
  { name: '方法', items: [
    { name: '全参微调', desc: '成本高、效果上限高。' },
    { name: 'LoRA/QLoRA', desc: '低秩适配，显存友好。' },
    { name: '指令数据构造', desc: '质量比数量重要。' }
  ] },
  { name: '对齐', items: [
    { name: 'RLHF', desc: '奖励模型 + PPO。' },
    { name: 'DPO', desc: '直接偏好优化。' },
    { name: '安全对齐', desc: '拒答与边界。' }
  ] },
  { name: '落地', items: [
    { name: '数据清洗', desc: '去重、去污染。' },
    { name: '评测回归', desc: '防止通用能力退化。' }
  ] }
] };

KB.DETAILS.rag = { groups: [
  { name: '链路', items: [
    { name: '文档解析', desc: 'PDF/HTML/表格的结构化。' },
    { name: '切分策略', desc: '按语义与长度；重叠窗口。' },
    { name: '向量化', desc: 'Embedding 模型选择。' },
    { name: '检索', desc: '向量、关键词与混合检索。' },
    { name: '重排', desc: 'Cross-encoder 精排。' }
  ] },
  { name: '生成', items: [
    { name: '上下文拼装', desc: '引用与去重。' },
    { name: '引用与溯源', desc: '答案要能指回原文。' },
    { name: '拒答', desc: '检索不到就不要编。' }
  ] },
  { name: '工程', items: [
    { name: '向量库', desc: 'pgvector、Milvus、Qdrant。' },
    { name: '增量更新', desc: '文档变更后的重建。' },
    { name: '评测', desc: '召回率与答案正确率。' }
  ] }
] };

KB.DETAILS.agent = { groups: [
  { name: '组成', items: [
    { name: '规划', desc: '任务分解与步骤编排。' },
    { name: '工具', desc: '搜索、代码执行、数据库查询。' },
    { name: '记忆', desc: '短期上下文与长期存储。' }
  ] },
  { name: '模式', items: [
    { name: 'ReAct', desc: '思考-行动-观察循环。' },
    { name: '多智能体', desc: '分工与协作。' },
    { name: '工作流编排', desc: '确定性流程 + LLM 节点。' }
  ] },
  { name: '工程', items: [
    { name: '工具定义', desc: '参数 Schema 与错误处理。' },
    { name: '权限与沙箱', desc: '危险操作要审批。' },
    { name: '可观测', desc: '每一步的输入输出留痕。' }
  ] }
] };

KB.DETAILS.inference = { groups: [
  { name: '性能指标', items: [
    { name: '首 token 延迟', desc: 'TTFT 与排队。' },
    { name: '吞吐', desc: 'tokens/s 与批处理。' },
    { name: '显存占用', desc: '权重 + KV Cache。' }
  ] },
  { name: '优化', items: [
    { name: '量化', desc: 'INT8/FP16 的精度取舍。' },
    { name: '批处理', desc: '连续批处理与调度。' },
    { name: 'KV Cache 优化', desc: 'PagedAttention。' },
    { name: '张量并行', desc: '多卡切分模型。' }
  ] },
  { name: '部署', items: [
    { name: '推理引擎', desc: 'vLLM、TensorRT-LLM。' },
    { name: '服务化', desc: 'OpenAI 兼容接口与限流。' },
    { name: '监控', desc: '延迟、错误率、显存。' }
  ] }
] };

KB.DETAILS.multimodal = { groups: [
  { name: '模态', items: [
    { name: '图像理解', desc: '视觉编码器 + 对齐层。' },
    { name: '语音', desc: 'ASR 与 TTS。' },
    { name: '视频', desc: '抽帧与时序建模。' }
  ] },
  { name: '应用', items: [
    { name: '文档理解', desc: '图表与版面。' },
    { name: '多模态检索', desc: '文本搜图、图搜图。' },
    { name: '生成', desc: '文生图与视频生成。' }
  ] }
] };

KB.DETAILS.rl = { groups: [
  { name: '基础', items: [
    { name: 'MDP', desc: '状态、动作、奖励、转移。' },
    { name: '价值函数', desc: 'V 与 Q。' },
    { name: '策略梯度', desc: 'REINFORCE 与方差缩减。' }
  ] },
  { name: '算法', items: [
    { name: 'Q-Learning / DQN', desc: '值函数近似。' },
    { name: 'PPO', desc: '稳定的策略优化。' },
    { name: 'RLHF 中的应用', desc: '奖励模型与偏好。' }
  ] },
  { name: '落地难点', items: [
    { name: '奖励设计', desc: '奖励黑客。' },
    { name: '样本效率', desc: '仿真环境与离线数据。' }
  ] }
] };

KB.DETAILS['ai-eval'] = { groups: [
  { name: '评测方法', items: [
    { name: '基准集', desc: '知识、推理、代码、多语言。' },
    { name: '人工评估', desc: '标注规范与一致性。' },
    { name: 'A/B 与线上指标', desc: '真实用户反馈。' }
  ] },
  { name: '安全', items: [
    { name: '越狱与注入', desc: '红队测试。' },
    { name: '偏见与毒性', desc: '数据集与输出审查。' },
    { name: '数据隐私', desc: '训练数据与推理日志。' }
  ] }
] };

KB.DETAILS.python = { groups: [
  { name: '语言基础', items: [
    { name: '数据类型', desc: 'list/dict/set/tuple 与可变性。' },
    { name: '函数与作用域', desc: '默认参数陷阱、闭包。' },
    { name: '面向对象', desc: '类、继承、魔术方法。' },
    { name: '异常处理', desc: 'try/except/finally 与自定义异常。' },
    { name: '迭代器与生成器', desc: '惰性求值与内存。' }
  ] },
  { name: '工程', items: [
    { name: '虚拟环境', desc: 'venv/uv 与依赖锁定。' },
    { name: '类型注解', desc: 'typing 与 mypy。' },
    { name: '测试', desc: 'pytest 与 fixture。' },
    { name: '打包', desc: 'pyproject.toml 与发布。' }
  ] },
  { name: '常用库', items: [
    { name: 'requests / httpx', desc: 'HTTP 客户端与异步。' },
    { name: 'pandas / numpy', desc: '数据处理。' },
    { name: 'FastAPI / Flask', desc: 'Web 服务。' },
    { name: 'asyncio', desc: '协程与事件循环。' }
  ] }
] };

KB.DETAILS.algorithms = { groups: [
  { name: '基础算法', items: [
    { name: '排序', desc: '快排、归并、堆排的复杂度与稳定性。' },
    { name: '二分查找', desc: '边界条件与旋转数组。' },
    { name: '双指针与滑动窗口', desc: '子数组/子串问题。' },
    { name: '递归与回溯', desc: '排列组合与剪枝。' }
  ] },
  { name: '进阶', items: [
    { name: '动态规划', desc: '状态定义、转移与空间优化。' },
    { name: '贪心', desc: '何时贪心是对的。' },
    { name: '图算法', desc: 'BFS/DFS、最短路、拓扑排序。' },
    { name: '并查集', desc: '连通性与路径压缩。' }
  ] },
  { name: '方法', items: [
    { name: '复杂度分析', desc: '时间与空间上界。' },
    { name: '刷题方法', desc: '按题型归纳，不背题解。' }
  ] }
] };

KB.DETAILS['data-structures'] = { groups: [
  { name: '线性结构', items: [
    { name: '数组', desc: '随机访问与扩容。' },
    { name: '链表', desc: '插入删除与缓存不友好。' },
    { name: '栈与队列', desc: '单调栈、双端队列。' }
  ] },
  { name: '树与堆', items: [
    { name: '二叉树', desc: '遍历与递归。' },
    { name: '平衡树', desc: 'AVL、红黑树与 B 树。' },
    { name: '堆', desc: '优先队列与 Top-K。' },
    { name: 'Trie', desc: '前缀匹配与自动补全。' }
  ] },
  { name: '哈希与图', items: [
    { name: '哈希表', desc: '冲突处理与扩容。' },
    { name: '图表示', desc: '邻接表与邻接矩阵。' },
    { name: '跳表', desc: 'Redis ZSet 的底层之一。' }
  ] }
] };

KB.DETAILS.complexity = { groups: [
  { name: '分析', items: [
    { name: '大 O 记号', desc: '上界与忽略常数。' },
    { name: '常见量级', desc: 'O(1)/O(log n)/O(n)/O(n log n)/O(n²)。' },
    { name: '空间复杂度和摊还分析', desc: '动态数组扩容为什么是 O(1) 摊还。' }
  ] },
  { name: '取舍', items: [
    { name: '时间换空间', desc: '缓存与预计算。' },
    { name: '空间换时间', desc: '哈希与索引。' }
  ] }
] };

KB.DETAILS['graph-algorithms'] = { groups: [
  { name: '遍历', items: [
    { name: 'BFS', desc: '层序与最短无权路径。' },
    { name: 'DFS', desc: '连通分量与回溯。' }
  ] },
  { name: '最短路', items: [
    { name: 'Dijkstra', desc: '非负权单源最短路。' },
    { name: 'Bellman-Ford', desc: '负权与负环检测。' },
    { name: 'Floyd', desc: '多源最短路。' }
  ] },
  { name: '其他', items: [
    { name: '拓扑排序', desc: '依赖关系与任务调度。' },
    { name: '最小生成树', desc: 'Kruskal 与 Prim。' },
    { name: '强连通分量', desc: 'Tarjan 算法。' }
  ] }
] };

KB.DETAILS.probability = { groups: [
  { name: '基础', items: [
    { name: '条件概率与贝叶斯', desc: '先验、似然、后验。' },
    { name: '随机变量', desc: '期望、方差、协方差。' },
    { name: '常见分布', desc: '伯努利、二项、泊松、正态。' }
  ] },
  { name: '统计推断', items: [
    { name: '大数定律与中心极限定理', desc: '为什么均值近似正态。' },
    { name: '假设检验', desc: '显著性水平与功效。' },
    { name: '置信区间', desc: '估计的不确定性。' }
  ] }
] };

KB.DETAILS['linear-algebra'] = { groups: [
  { name: '向量与矩阵', items: [
    { name: '向量运算', desc: '点积、范数、夹角。' },
    { name: '矩阵乘法', desc: '形状与计算复杂度。' },
    { name: '秩与可逆', desc: '线性相关与行列式。' }
  ] },
  { name: '分解与应用', items: [
    { name: '特征值与特征向量', desc: 'PCA 与稳定性。' },
    { name: 'SVD', desc: '降维与推荐。' },
    { name: '最小二乘', desc: '线性回归的几何解释。' }
  ] }
] };

KB.DETAILS.calculus = { groups: [
  { name: '微分', items: [
    { name: '导数与偏导', desc: '变化率与梯度。' },
    { name: '链式法则', desc: '反向传播的基础。' },
    { name: '泰勒展开', desc: '局部近似。' }
  ] },
  { name: '优化', items: [
    { name: '梯度下降', desc: '学习率与鞍点。' },
    { name: '凸优化', desc: '局部最优即全局最优的条件。' }
  ] }
] };

KB.DETAILS['discrete-math'] = { groups: [
  { name: '基础', items: [
    { name: '集合与关系', desc: '笛卡尔积、等价关系。' },
    { name: '逻辑与证明', desc: '命题逻辑、归纳法、反证法。' },
    { name: '组合计数', desc: '排列组合、容斥原理。' }
  ] },
  { name: '图论', items: [
    { name: '图的基本概念', desc: '度、路径、连通性。' },
    { name: '树与生成树', desc: '性质与计数。' }
  ] }
] };

KB.DETAILS['information-theory'] = { groups: [
  { name: '核心概念', items: [
    { name: '信息熵', desc: '不确定性的度量。' },
    { name: '互信息', desc: '变量之间的相关信息。' },
    { name: '交叉熵与 KL 散度', desc: '损失函数里的常客。' }
  ] },
  { name: '编码', items: [
    { name: '霍夫曼编码', desc: '变长编码与最优性。' },
    { name: '信道容量', desc: '可靠传输的上限。' }
  ] }
] };

KB.DETAILS['knowledge-graph'] = { groups: [
  { name: '构建', items: [
    { name: '实体与关系抽取', desc: '从文本到三元组。' },
    { name: '本体设计', desc: '概念层级与约束。' },
    { name: '实体对齐', desc: '同一实体的消歧。' }
  ] },
  { name: '存储与查询', items: [
    { name: '图数据库', desc: 'Neo4j 与属性图。' },
    { name: 'SPARQL', desc: 'RDF 查询。' },
    { name: '图嵌入', desc: 'TransE、Node2Vec。' }
  ] },
  { name: '应用', items: [
    { name: '检索增强', desc: '知识图谱 + RAG。' },
    { name: '风控与推荐', desc: '关系网络分析。' }
  ] }
] };

KB.DETAILS['information-retrieval'] = { groups: [
  { name: '基础', items: [
    { name: '倒排索引', desc: '词项 → 文档列表。' },
    { name: 'TF-IDF 与 BM25', desc: '相关性打分。' },
    { name: '分词', desc: '中文分词与停用词。' }
  ] },
  { name: '向量检索', items: [
    { name: 'Embedding', desc: '语义向量。' },
    { name: 'ANN', desc: 'HNSW、IVF 近似最近邻。' },
    { name: '混合检索', desc: '关键词 + 向量融合。' }
  ] },
  { name: '评估', items: [
    { name: '召回率与准确率', desc: '检索质量的度量。' },
    { name: 'NDCG', desc: '排序质量。' }
  ] }
] };
