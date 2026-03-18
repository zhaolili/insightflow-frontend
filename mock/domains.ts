export interface Domain {
  id: string
  name: string
  shortName: string
  icon: string
  todayCount: number
  weekTrend: number[]
  trendDirection: 'up' | 'down' | 'flat'
  latestTitle: string
  recentTitles: string[]
  sourceRatio: { designated: number; web: number }
  keywords: string[]
  color: string
}

export const DOMAINS: Domain[] = [
  {
    id: 'nvh',
    name: 'NVH技术',
    shortName: 'NVH',
    icon: '🔊',
    todayCount: 12,
    weekTrend: [8, 11, 9, 14, 10, 13, 12],
    trendDirection: 'up',
    latestTitle: '某车型A柱造型优化实现高速工况降噪3.2dB新突破',
    recentTitles: [
      '某车型A柱造型优化实现高速工况降噪3.2dB新突破',
      '新型声学包材料在纯电动平台的应用研究进展',
      '电动车电机高频电磁噪声抑制方案：SiC逆变器优化策略',
      '双层夹胶玻璃在风噪控制中的性价比边界分析',
    ],
    sourceRatio: { designated: 45, web: 55 },
    keywords: ['振动噪声', '声学包', '隔音材料', 'NVH优化'],
    color: '#58A6FF',
  },
  {
    id: 'anc',
    name: 'ANC主动降噪',
    shortName: 'ANC',
    icon: '🎵',
    todayCount: 7,
    weekTrend: [5, 6, 8, 7, 9, 8, 7],
    trendDirection: 'flat',
    latestTitle: 'ANC路噪消除技术在SUV车型的量产化落地实践',
    recentTitles: [
      'ANC路噪消除技术在SUV车型的量产化落地实践',
      '发动机主动降噪控制策略优化：延迟补偿新算法',
      '混动车型发动机启停振动控制：主动悬置+ANC协同策略',
      '多区域独立ANC系统：基于座椅声场分离的个性化降噪',
    ],
    sourceRatio: { designated: 60, web: 40 },
    keywords: ['路噪消除', '主动降噪', 'ANC算法', '发动机降噪'],
    color: '#3FB950',
  },
  {
    id: 'wind-tunnel',
    name: '风洞测试技术',
    shortName: '风洞',
    icon: '💨',
    todayCount: 15,
    weekTrend: [12, 10, 13, 15, 14, 16, 15],
    trendDirection: 'up',
    latestTitle: 'CFD仿真与实物风洞数据偏差控制在5%以内的工程实践',
    recentTitles: [
      'CFD仿真与实物风洞数据偏差控制在5%以内的工程实践',
      '新能源车型气动噪声优化：主动进气格栅对Cd值影响分析',
      '主动进气格栅对新能源车续航影响的定量研究',
      '轮胎气动噪声贡献量分解：花纹与空腔的独立影响研究',
    ],
    sourceRatio: { designated: 35, web: 65 },
    keywords: ['CFD仿真', '气动噪声', '风阻系数', '风洞实验'],
    color: '#D29922',
  },
  {
    id: 'low-altitude',
    name: '低空飞行器测试',
    shortName: '低空',
    icon: '🚁',
    todayCount: 9,
    weekTrend: [6, 7, 8, 10, 9, 11, 9],
    trendDirection: 'up',
    latestTitle: 'eVTOL适航认证标准草案发布，填补国内低空监管空白',
    recentTitles: [
      'eVTOL适航认证标准草案发布，填补国内低空监管空白',
      '飞行汽车跨域测试规范：陆空一体化安全评估框架',
      'eVTOL电池热失控传播抑制：航空级安全标准研究进展',
    ],
    sourceRatio: { designated: 55, web: 45 },
    keywords: ['eVTOL', '飞行汽车', '适航认证', '低空监管'],
    color: '#A371F7',
  },
  {
    id: 'ecu-sim',
    name: '电控仿真开发',
    shortName: '电控',
    icon: '💻',
    todayCount: 18,
    weekTrend: [15, 17, 16, 19, 18, 20, 18],
    trendDirection: 'up',
    latestTitle: 'HiL台架测试覆盖率提升至97%，自动代码生成效率对比研究',
    recentTitles: [
      'HiL台架测试覆盖率提升至97%，自动代码生成效率对比研究',
      'SOA架构下域控制器通信仿真：DDS与SOME/IP性能对比',
      '基于数字孪生的OTA升级预验证平台开发实践',
    ],
    sourceRatio: { designated: 70, web: 30 },
    keywords: ['HiL测试', '模型在环', '自动代码生成', 'AUTOSAR'],
    color: '#58A6FF',
  },
  {
    id: 'risk-level',
    name: '车辆风险等级开发',
    shortName: '风险等级',
    icon: '🛡️',
    todayCount: 6,
    weekTrend: [8, 7, 6, 5, 7, 6, 6],
    trendDirection: 'down',
    latestTitle: 'ISO 26262最新修订解读：ASIL-D级别软件安全分析方法演进',
    recentTitles: [
      'ISO 26262最新修订解读：ASIL-D级别软件安全分析方法演进',
      '功能安全与预期功能安全（SOTIF）融合开发框架研究',
      '预期功能安全（SOTIF）与功能安全融合开发实践指南',
    ],
    sourceRatio: { designated: 80, web: 20 },
    keywords: ['功能安全', 'ASIL等级', '风险评估', 'ISO 26262'],
    color: '#F85149',
  },
  {
    id: 'offroad',
    name: '科技越野属性开发',
    shortName: '越野',
    icon: '🏔️',
    todayCount: 11,
    weekTrend: [9, 10, 12, 11, 13, 12, 11],
    trendDirection: 'flat',
    latestTitle: '地形识别算法在复杂越野路面的精度提升研究：融合多传感器方案',
    recentTitles: [
      '地形识别算法在复杂越野路面的精度提升研究：融合多传感器方案',
      '智能蠕行模式在岩石攀爬场景的轮胎打滑控制算法优化',
      '越野场景下车身姿态估计：融合IMU与悬架位移传感器方案',
    ],
    sourceRatio: { designated: 40, web: 60 },
    keywords: ['越野模式', '地形识别', '差速锁控制', '扭矩矢量'],
    color: '#3FB950',
  },
  {
    id: 'adas',
    name: '智能驾驶/智能网联',
    shortName: '智驾',
    icon: '🚗',
    todayCount: 24,
    weekTrend: [18, 20, 22, 21, 25, 23, 24],
    trendDirection: 'up',
    latestTitle: 'L3级自动驾驶国标正式落地，量产车准入门槛及测试要求详解',
    recentTitles: [
      'L3级自动驾驶国标正式落地，量产车准入门槛及测试要求详解',
      'V2X车路协同标准体系最新进展：C-V2X在高速场景应用',
      '城市NOA无图方案技术对比：轻地图重感知路线进展',
      '占用网络（Occupancy Network）在复杂停车场场景的量产优化',
    ],
    sourceRatio: { designated: 50, web: 50 },
    keywords: ['L2+/L3', 'V2X', '高精地图', '自动驾驶'],
    color: '#58A6FF',
  },
  {
    id: 'embodied-ai',
    name: '具身智能领域',
    shortName: '具身AI',
    icon: '🤖',
    todayCount: 20,
    weekTrend: [14, 16, 18, 19, 21, 20, 20],
    trendDirection: 'up',
    latestTitle: '特斯拉Optimus Gen3发布：端到端控制架构在汽车装配线的应用前景',
    recentTitles: [
      '特斯拉Optimus Gen3发布：端到端控制架构在汽车装配线的应用前景',
      '多模态感知融合：视觉-触觉-语言三模态人形机器人控制综述',
      '灵巧手触觉反馈精度突破：0.1N级力控在精密装配中的应用',
    ],
    sourceRatio: { designated: 30, web: 70 },
    keywords: ['人形机器人', '端到端控制', '多模态感知', '具身智能'],
    color: '#A371F7',
  },
]

export function getDomainById(id: string): Domain | undefined {
  return DOMAINS.find(d => d.id === id)
}
