export interface FeedItem {
  id: string
  domainId: string
  domainName: string
  title: string
  summary: string
  tags: string[]
  source: string
  sourceType: 'designated' | 'web'
  isAuthority: boolean
  publishedAt: string
  url: string
  techPoints: string[]
}

export const FEED_ITEMS: FeedItem[] = [
  {
    id: 'f001',
    domainId: 'adas',
    domainName: '智能驾驶/智能网联',
    title: 'L3级自动驾驶国标正式落地，量产车准入门槛及测试要求详解',
    summary: '工业和信息化部发布《智能网联汽车自动驾驶功能测试规程》，明确L3级别量产车须通过不少于5000小时实车测试，适用场景限定为高速公路及城市快速路，有效推动国内自动驾驶商业化进程。',
    tags: ['权威', 'L3', '政策法规', '量产应用'],
    source: '工业和信息化部官网',
    sourceType: 'designated',
    isAuthority: true,
    publishedAt: '2026-03-13T08:30:00Z',
    url: '#',
    techPoints: ['L3级别准入门槛确立', '测试里程要求≥5000小时', '适用场景：高速/城市快速路'],
  },
  {
    id: 'f002',
    domainId: 'embodied-ai',
    domainName: '具身智能领域',
    title: '特斯拉Optimus Gen3发布：端到端控制架构在汽车装配线的应用前景',
    summary: '特斯拉发布第三代人形机器人Optimus，采用神经网络端到端控制，操作精度达到人类水平的92%，在汽车零部件装配场景下效率提升40%，引发国内主机厂对人形机器人应用的广泛关注。',
    tags: ['热点', '人形机器人', '端到端', '制造业应用'],
    source: '36氪·汽车科技频道',
    sourceType: 'web',
    isAuthority: false,
    publishedAt: '2026-03-13T07:15:00Z',
    url: '#',
    techPoints: ['端到端神经网络控制', '操作精度达人类92%', '装配效率提升40%'],
  },
  {
    id: 'f003',
    domainId: 'ecu-sim',
    domainName: '电控仿真开发',
    title: 'HiL台架测试覆盖率提升至97%，自动代码生成效率对比研究',
    summary: '某OEM发布内部研究报告，对比dSPACE SCALEXIO与ETAS LABCAR两款HiL系统的测试覆盖率表现，通过引入自动化测试脚本生成工具，将软件功能测试覆盖率从82%提升至97%，开发周期缩短28%。',
    tags: ['技术报告', 'HiL测试', '工具链', '覆盖率'],
    source: '汽车技术·SAE China',
    sourceType: 'designated',
    isAuthority: true,
    publishedAt: '2026-03-13T06:45:00Z',
    url: '#',
    techPoints: ['覆盖率从82%提升至97%', '开发周期缩短28%', 'dSPACE vs ETAS对比'],
  },
  {
    id: 'f004',
    domainId: 'nvh',
    domainName: 'NVH技术',
    title: '某车型A柱造型优化实现高速工况降噪3.2dB新突破',
    summary: '研究人员通过拓扑优化方法改进A柱截面形状，结合主动式降噪系统，在高速行驶工况（120km/h）下实现车内噪声降低3.2dB(A)，超出行业平均改善幅度1.5倍，已在2026款旗舰车型量产应用。',
    tags: ['量产应用', 'NVH优化', 'A柱设计', '风噪'],
    source: '某技术论坛',
    sourceType: 'designated',
    isAuthority: false,
    publishedAt: '2026-03-13T05:30:00Z',
    url: '#',
    techPoints: ['高速降噪3.2dB(A)', '拓扑优化A柱截面', '已量产应用'],
  },
  {
    id: 'f005',
    domainId: 'wind-tunnel',
    domainName: '风洞测试技术',
    title: 'CFD仿真与实物风洞数据偏差控制在5%以内的工程实践',
    summary: '介绍一种改进的CFD仿真边界条件设置方法，通过引入风洞壁面干扰修正算法，将仿真结果与实测数据的偏差从原来的12%降低至4.8%，显著提高了虚拟开发阶段的气动预测精度。',
    tags: ['CFD仿真', '工程实践', '精度提升'],
    source: 'SAE International',
    sourceType: 'web',
    isAuthority: true,
    publishedAt: '2026-03-12T14:20:00Z',
    url: '#',
    techPoints: ['仿真偏差从12%降至4.8%', '壁面干扰修正算法', '虚拟开发效率提升'],
  },
  {
    id: 'f006',
    domainId: 'low-altitude',
    domainName: '低空飞行器测试',
    title: 'eVTOL适航认证标准草案发布，填补国内低空监管空白',
    summary: '民航局发布《电动垂直起降航空器适航审定标准》草案，首次对eVTOL飞行器的结构强度、动力系统冗余、航电安全等核心指标作出量化规定，预计2027年正式实施，为飞行汽车商业化奠定监管基础。',
    tags: ['权威', '政策法规', 'eVTOL', '适航认证'],
    source: '中国民用航空局',
    sourceType: 'designated',
    isAuthority: true,
    publishedAt: '2026-03-12T11:00:00Z',
    url: '#',
    techPoints: ['首个eVTOL量化适航标准', '2027年正式实施', '结构/动力/航电三维规定'],
  },
  {
    id: 'f007',
    domainId: 'anc',
    domainName: 'ANC主动降噪',
    title: 'ANC路噪消除技术在SUV车型的量产化落地实践',
    summary: '某Tier1供应商公布其第三代路噪主动消除系统（ARNC）的量产数据：在80-100km/h行驶区间，针对路面激励引起的车内轰鸣声，平均降噪效果达8.5dB，控制器延迟压缩至0.8ms。',
    tags: ['量产应用', 'ANC', '路噪消除', 'Tier1'],
    source: '汽车零部件技术期刊',
    sourceType: 'web',
    isAuthority: false,
    publishedAt: '2026-03-12T09:30:00Z',
    url: '#',
    techPoints: ['路噪降低8.5dB', '控制延迟0.8ms', '第三代ARNC系统'],
  },
  {
    id: 'f008',
    domainId: 'risk-level',
    domainName: '车辆风险等级开发',
    title: 'ISO 26262最新修订解读：ASIL-D级别软件安全分析方法演进',
    summary: 'ISO 26262:2026版正式发布，针对AI/ML功能在安全关键系统中的应用新增附录，要求ASIL-D系统中的机器学习模块必须通过形式化验证，并提出"安全包络"概念以限制神经网络决策范围。',
    tags: ['权威', '标准更新', 'ISO 26262', 'ASIL-D'],
    source: 'ISO官方网站',
    sourceType: 'designated',
    isAuthority: true,
    publishedAt: '2026-03-11T16:00:00Z',
    url: '#',
    techPoints: ['新增AI/ML安全附录', '形式化验证要求', '"安全包络"新概念'],
  },
  {
    id: 'f009',
    domainId: 'offroad',
    domainName: '科技越野属性开发',
    title: '地形识别算法在复杂越野路面的精度提升研究：融合多传感器方案',
    summary: '提出一种融合激光雷达点云、摄像头语义分割与IMU数据的地形识别算法，在沙地、泥泞、岩石三类典型越野地形的识别精度达到96.3%，较单一视觉方案提升14个百分点，响应时间≤80ms。',
    tags: ['技术研究', '地形识别', '多传感器融合', '越野'],
    source: '汽车工程学报',
    sourceType: 'web',
    isAuthority: true,
    publishedAt: '2026-03-11T10:00:00Z',
    url: '#',
    techPoints: ['识别精度96.3%', '响应时间≤80ms', '三传感器融合方案'],
  },
  {
    id: 'f010',
    domainId: 'adas',
    domainName: '智能驾驶/智能网联',
    title: 'V2X车路协同标准体系最新进展：C-V2X在高速场景应用',
    summary: '交通部发布《车路协同技术应用指南》，明确高速公路场景优先推进C-V2X部署，支持前向碰撞预警、紧急刹车提示等8类应用，与5G网络融合的RSU设备将于2026年底在全国1000个高速服务区完成覆盖。',
    tags: ['权威', 'V2X', '政策推进', 'C-V2X'],
    source: '交通运输部官网',
    sourceType: 'designated',
    isAuthority: true,
    publishedAt: '2026-03-10T15:00:00Z',
    url: '#',
    techPoints: ['高速优先推进C-V2X', '8类应用场景明确', '1000个服务区年底覆盖'],
  },
  {
    id: 'f011',
    domainId: 'embodied-ai',
    domainName: '具身智能领域',
    title: '多模态感知融合：视觉-触觉-语言三模态人形机器人控制综述',
    summary: '来自清华大学与比亚迪的联合研究，系统综述了近两年视觉-触觉-语言三模态融合在机器人控制中的最新进展，提出"意图-感知-执行"统一建模框架，在汽车内饰装配任务中验证了零样本泛化能力。',
    tags: ['学术研究', '多模态', '具身智能', '人形机器人'],
    source: '清华大学智能研究院',
    sourceType: 'web',
    isAuthority: true,
    publishedAt: '2026-03-10T09:00:00Z',
    url: '#',
    techPoints: ['三模态统一建模框架', '零样本泛化验证', '汽车装配场景应用'],
  },
  {
    id: 'f012',
    domainId: 'nvh',
    domainName: 'NVH技术',
    title: '新型声学包材料在纯电动平台的应用研究进展',
    summary: '针对纯电动车缺少发动机噪声掩蔽效应后高频路噪更突出的问题，研究了一种微孔泡沫与纳米碳纤维复合声学包材料，在1000-4000Hz频段吸声系数达0.92，重量较传统材料减轻35%。',
    tags: ['材料研究', 'NVH', '电动车', '声学包'],
    source: '中国汽车工程学会',
    sourceType: 'designated',
    isAuthority: false,
    publishedAt: '2026-03-09T14:30:00Z',
    url: '#',
    techPoints: ['吸声系数0.92', '重量减轻35%', '微孔泡沫+纳米碳纤维复合材料'],
  },
]

export function getFeedByDomain(domainId: string): FeedItem[] {
  return FEED_ITEMS.filter(f => f.domainId === domainId)
}

export function getLatestFeed(limit = 20): FeedItem[] {
  return [...FEED_ITEMS]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit)
}

export function getAuthorityFeed(): FeedItem[] {
  return FEED_ITEMS.filter(f => f.isAuthority)
}

// Extra items for "new arrival" simulation
export const NEW_ARRIVAL_POOL: Omit<FeedItem, 'id'>[] = [
  {
    domainId: 'adas',
    domainName: '智能驾驶/智能网联',
    title: '百度Apollo发布城市NOA最新测试报告：接管频率同比下降62%',
    summary: '百度Apollo公布2026年Q1城市领航辅助驾驶测试数据，在北京、上海、广州三城市测试里程超过200万公里，每1000公里接管次数降至0.8次，复杂路口通过成功率达到98.7%。',
    tags: ['测试数据', 'NOA', '城市驾驶', '百度Apollo'],
    source: '百度Apollo官方',
    sourceType: 'web',
    isAuthority: false,
    publishedAt: new Date().toISOString(),
    url: '#',
    techPoints: ['接管频率下降62%', '接管率0.8次/1000km', '复杂路口成功率98.7%'],
  },
  {
    domainId: 'embodied-ai',
    domainName: '具身智能领域',
    title: '宇树科技G1机器人完成汽车焊装线实地测试，焊接精度误差<0.2mm',
    summary: '宇树科技与某合资主机厂合作，完成G1人形机器人在白车身焊装工序的实地测试，6轴操作精度优于0.2mm，可替代人工完成20类焊点质检作业，预计2027年Q1进入量产验证阶段。',
    tags: ['产业动态', '宇树科技', '汽车制造', '焊接机器人'],
    source: '宇树科技',
    sourceType: 'web',
    isAuthority: false,
    publishedAt: new Date().toISOString(),
    url: '#',
    techPoints: ['焊接精度<0.2mm', '20类焊点质检', '2027Q1量产验证'],
  },
]
