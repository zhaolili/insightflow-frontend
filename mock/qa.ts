import { FEED_ITEMS, FeedItem } from './feed'

export interface QAMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  evidence?: FeedItem[]
  timestamp: string
  suggestedQuestions?: string[]
}

export interface QASession {
  id: string
  title: string
  createdAt: string
  messages: QAMessage[]
}

export const QA_SUGGESTIONS = [
  '最近一周NVH技术有哪些新突破？',
  '智能驾驶L3级别量产的核心技术挑战是什么？',
  'eVTOL适航认证标准与传统航空器有哪些差异？',
  '具身智能在汽车制造中的应用现状如何？',
  'ANC路噪消除技术的最新量产进展是什么？',
  '风洞测试与CFD仿真的偏差如何控制？',
]

export const MOCK_QA_SESSIONS: QASession[] = [
  {
    id: 'qa001',
    title: 'L3自动驾驶量产技术分析',
    createdAt: '2026-03-13T09:00:00Z',
    messages: [
      {
        id: 'm001',
        role: 'user',
        content: 'L3级自动驾驶国标落地后，量产车的核心技术挑战是什么？',
        timestamp: '2026-03-13T09:00:00Z',
      },
      {
        id: 'm002',
        role: 'assistant',
        content: `根据已监控到的最新情报，L3级自动驾驶国标正式落地后，量产车面临以下核心技术挑战：

**1. 测试里程验证成本高**
新标准要求不少于5000小时实车测试，折算约60万公里，主机厂需在封闭测试场与开放道路之间合理分配测试资源，成本压力显著。

**2. ODD（操作设计域）边界管理**
当前标准将L3适用场景限定于高速公路及城市快速路，如何精确识别并在超出ODD范围时实现安全降级，是系统设计的核心难题。

**3. 责任归属的法律与技术对齐**
L3级别在自动驾驶激活时责任主体转移至系统，要求事件记录（EDR）数据符合法律证据标准，行车数据的存储格式和时效性均有严格要求。

**4. 网联依赖与网络安全**
L3量产普遍依赖V2X与高精地图辅助，如何在网络信号弱区域保持安全降级，并防范网络攻击，是监管重点关注的方向。`,
        evidence: [FEED_ITEMS[0], FEED_ITEMS[9]],
        timestamp: '2026-03-13T09:00:05Z',
        suggestedQuestions: [
          'V2X在高速场景的部署进展如何？',
          'L3测试里程要求对主机厂的影响有多大？',
          '国内L3量产车型何时能上市？',
        ],
      },
    ],
  },
]

// Mock QA response generator
export function generateMockAnswer(question: string): { content: string; evidence: FeedItem[]; suggestions: string[] } {
  const q = question.toLowerCase()

  if (q.includes('nvh') || q.includes('噪声') || q.includes('降噪')) {
    return {
      content: `根据本系统监控到的最新NVH技术情报，综合分析如下：

**近期主要进展**
1. **A柱造型优化**：拓扑优化方法结合主动降噪，实现高速工况（120km/h）降噪3.2dB(A)，已在2026款旗舰车型量产。
2. **新型声学包材料**：微孔泡沫与纳米碳纤维复合材料在1000-4000Hz吸声系数达0.92，重量减轻35%，专门针对纯电动车高频路噪问题。
3. **主被动融合方案**：多家OEM正在评估ANC与被动隔音融合方案的成本效益，以应对电动车NVH新挑战。

**趋势判断**
纯电动化推进使传统发动机噪声掩蔽效应消失，NVH优化重点正从低频振动转向中高频路噪与风噪，轻量化材料与主动控制技术的融合是主要方向。`,
      evidence: [FEED_ITEMS[3], FEED_ITEMS[11]],
      suggestions: ['NVH与ANC技术如何协同优化？', '电动车NVH最大挑战是什么？', '声学包材料国产化进展如何？'],
    }
  }

  if (q.includes('具身') || q.includes('机器人') || q.includes('人形')) {
    return {
      content: `根据情报库中的具身智能相关资讯，综合分析如下：

**产业动态**
- **特斯拉Optimus Gen3**：采用端到端神经网络控制，操作精度达人类的92%，汽车零部件装配效率提升40%。
- **宇树科技G1**：完成汽车焊装线实地测试，焊接精度误差<0.2mm，预计2027年Q1量产验证。

**技术路线**
清华大学与比亚迪联合研究提出"视觉-触觉-语言"三模态统一建模框架，实现零样本泛化，是目前最受关注的技术路线。

**对汽车行业的影响**
具身智能机器人在整车制造（焊装、涂装、总装）的替代潜力巨大，预计2028年前在重复性高精度作业场景实现规模应用。`,
      evidence: [FEED_ITEMS[1], FEED_ITEMS[10]],
      suggestions: ['具身智能机器人量产时间表如何？', '与传统工业机械臂相比优势是什么？', '国内具身智能头部企业有哪些？'],
    }
  }

  if (q.includes('evtol') || q.includes('低空') || q.includes('飞行')) {
    return {
      content: `关于低空飞行器测试与适航认证的最新情报摘要：

**政策里程碑**
民航局发布《电动垂直起降航空器适航审定标准》草案，首次量化规定eVTOL的结构强度、动力系统冗余、航电安全三大核心指标，预计2027年正式实施。

**核心差异（vs传统航空器）**
| 维度 | 传统适航 | eVTOL新标准 |
|------|---------|-------------|
| 动力冗余 | 双发备份 | 分布式多旋翼冗余 |
| 认证周期 | 8-12年 | 目标3-5年 |
| 噪声标准 | ICAO Annex 16 | 待制定城市场景专项标准 |

**产业机会**
飞行汽车跨域测试规范的建立，将为陆空一体化安全评估提供标准化框架，相关检测机构市场需求增长。`,
      evidence: [FEED_ITEMS[5]],
      suggestions: ['飞行汽车与eVTOL的技术区别？', '国内低空经济政策支持力度如何？', '适航认证最快多久能完成？'],
    }
  }

  // Default response
  return {
    content: `您的问题已由情报问答引擎检索分析。基于当前已扫描的${FEED_ITEMS.length}条技术情报，暂未找到高度匹配的专项内容。

**建议尝试以下方式获得更精准的回答：**
1. 使用更具体的技术术语，例如具体的标准编号、技术方案名称
2. 缩小技术领域范围，聚焦单一领域进行提问
3. 指定时间范围，如"2026年以来"

**当前覆盖最丰富的领域：**
- 智能驾驶/智能网联（187条/周）
- 电控仿真开发（134条/周）
- 具身智能（156条/周）`,
    evidence: [],
    suggestions: QA_SUGGESTIONS.slice(0, 3),
  }
}
