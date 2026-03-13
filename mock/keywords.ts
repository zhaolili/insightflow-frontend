export interface KeywordConfig {
  id: string
  domainId: string
  domainName: string
  primary: string
  synonyms: string[]
  excludes: string[]
  weight: number
  matchCount7d: number
}

export const KEYWORD_CONFIGS: KeywordConfig[] = [
  {
    id: 'k001',
    domainId: 'nvh',
    domainName: 'NVH技术',
    primary: 'NVH技术',
    synonyms: ['振动噪声', '声学包', '隔音材料', 'Noise Vibration Harshness', '声振粗糙度', 'NVH优化'],
    excludes: ['家用隔音', '建筑隔音', '工厂噪声'],
    weight: 8,
    matchCount7d: 87,
  },
  {
    id: 'k002',
    domainId: 'anc',
    domainName: 'ANC主动降噪',
    primary: 'ANC主动降噪技术',
    synonyms: ['主动噪声控制', '路噪消除', '发动机主动降噪', 'Active Noise Cancellation', 'ARNC'],
    excludes: ['耳机降噪', '家用降噪'],
    weight: 7,
    matchCount7d: 52,
  },
  {
    id: 'k003',
    domainId: 'wind-tunnel',
    domainName: '风洞测试技术',
    primary: '风洞测试技术',
    synonyms: ['CFD仿真', '气动噪声', '风阻系数', '整车气动', '风洞实验', 'Cd值', '气候风洞'],
    excludes: ['航空风洞', '建筑风洞'],
    weight: 8,
    matchCount7d: 103,
  },
  {
    id: 'k004',
    domainId: 'low-altitude',
    domainName: '低空飞行器测试',
    primary: '低空飞行器测试技术',
    synonyms: ['eVTOL', '飞行汽车', '适航认证', '低空监管', '无人驾驶航空器', 'UAM'],
    excludes: ['无人机农业', '军用无人机'],
    weight: 6,
    matchCount7d: 68,
  },
  {
    id: 'k005',
    domainId: 'ecu-sim',
    domainName: '电控仿真开发',
    primary: '电控仿真开发技术',
    synonyms: ['HiL测试', '模型在环', '软件在环', 'AUTOSAR', '自动代码生成', 'dSPACE', 'MiL', 'SiL'],
    excludes: ['电路仿真', 'PCB仿真'],
    weight: 9,
    matchCount7d: 134,
  },
  {
    id: 'k006',
    domainId: 'risk-level',
    domainName: '车辆风险等级开发',
    primary: '车辆风险等级开发技术',
    synonyms: ['功能安全', 'ASIL等级', '风险评估', 'ISO 26262', 'SOTIF', '预期功能安全'],
    excludes: ['金融风险', '企业风险管理'],
    weight: 7,
    matchCount7d: 46,
  },
  {
    id: 'k007',
    domainId: 'offroad',
    domainName: '科技越野属性开发',
    primary: '科技越野属性开发技术',
    synonyms: ['越野模式', '地形识别', '差速锁控制', '扭矩矢量', '通过性', '攀爬能力'],
    excludes: ['赛车越野', '摩托车越野'],
    weight: 6,
    matchCount7d: 79,
  },
  {
    id: 'k008',
    domainId: 'adas',
    domainName: '智能驾驶/智能网联',
    primary: '智能驾驶',
    synonyms: ['L2+', 'L3', 'L4', 'V2X', '高精地图', 'NOA', '自动驾驶', '辅助驾驶', 'C-V2X', '车路协同'],
    excludes: ['无人机自主飞行', '无人船'],
    weight: 10,
    matchCount7d: 187,
  },
  {
    id: 'k009',
    domainId: 'embodied-ai',
    domainName: '具身智能领域',
    primary: '具身智能',
    synonyms: ['人形机器人', '端到端控制', '多模态感知', 'Embodied AI', '机器人操作', '灵巧手'],
    excludes: ['扫地机器人', '工业机械臂'],
    weight: 9,
    matchCount7d: 156,
  },
]
