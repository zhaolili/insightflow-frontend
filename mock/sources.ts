export interface MonitorSource {
  id: string
  name: string
  url: string
  loginType: 'none' | 'account' | 'cookie' | 'manual'
  status: 'active' | 'error' | 'expired' | 'pending'
  frequency: 'hourly' | '6h' | 'daily'
  lastCrawled: string
  crawlCount: number
  domains: string[]
  notes?: string
}

export const MONITOR_SOURCES: MonitorSource[] = [
  {
    id: 's001',
    name: 'SAE International 期刊',
    url: 'https://www.sae.org/publications/technical-papers',
    loginType: 'account',
    status: 'active',
    frequency: 'daily',
    lastCrawled: '2026-03-13T06:00:00Z',
    crawlCount: 1247,
    domains: ['nvh', 'anc', 'wind-tunnel', 'ecu-sim'],
    notes: '需账号密码，已配置自动登录',
  },
  {
    id: 's002',
    name: '工业和信息化部官网',
    url: 'https://www.miit.gov.cn/jgsj/qcj',
    loginType: 'none',
    status: 'active',
    frequency: 'hourly',
    lastCrawled: '2026-03-13T08:00:00Z',
    crawlCount: 892,
    domains: ['adas', 'risk-level', 'low-altitude'],
  },
  {
    id: 's003',
    name: '中国汽车工程学会',
    url: 'https://www.sae-china.org/research',
    loginType: 'none',
    status: 'active',
    frequency: '6h',
    lastCrawled: '2026-03-13T04:00:00Z',
    crawlCount: 534,
    domains: ['nvh', 'adas', 'offroad', 'ecu-sim'],
  },
  {
    id: 's004',
    name: '汽车技术研究中心内网',
    url: 'http://intranet.catarc.ac.cn/tech',
    loginType: 'cookie',
    status: 'expired',
    frequency: 'daily',
    lastCrawled: '2026-03-10T12:00:00Z',
    crawlCount: 312,
    domains: ['nvh', 'wind-tunnel', 'ecu-sim', 'risk-level'],
    notes: 'Cookie已过期，需手动更新',
  },
  {
    id: 's005',
    name: '民航局适航司',
    url: 'https://www.caac.gov.cn/XXGK/XXGK/BZGF',
    loginType: 'none',
    status: 'active',
    frequency: 'daily',
    lastCrawled: '2026-03-12T20:00:00Z',
    crawlCount: 89,
    domains: ['low-altitude'],
  },
  {
    id: 's006',
    name: 'IEEE Xplore 汽车技术',
    url: 'https://ieeexplore.ieee.org/xpl/vehicular',
    loginType: 'account',
    status: 'active',
    frequency: 'daily',
    lastCrawled: '2026-03-13T05:00:00Z',
    crawlCount: 2103,
    domains: ['adas', 'embodied-ai', 'ecu-sim'],
  },
  {
    id: 's007',
    name: '某供应商技术论坛（会员）',
    url: 'https://forum.supplier-tech.cn',
    loginType: 'manual',
    status: 'pending',
    frequency: '6h',
    lastCrawled: '2026-03-11T09:00:00Z',
    crawlCount: 0,
    domains: ['nvh', 'anc'],
    notes: '需短信验证码，等待人工更新Cookie',
  },
]
