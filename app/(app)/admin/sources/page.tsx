'use client'

import { useState } from 'react'
import { MONITOR_SOURCES, MonitorSource } from '@/mock/sources'

const STATUS_CONFIG = {
  active: { label: '运行中', color: '#3FB950', bg: 'rgba(63,185,80,0.12)' },
  error: { label: '错误', color: '#F85149', bg: 'rgba(248,81,73,0.12)' },
  expired: { label: '已过期', color: '#D29922', bg: 'rgba(210,153,34,0.12)' },
  pending: { label: '待配置', color: '#8B949E', bg: 'rgba(139,148,158,0.12)' },
}

const FREQ_CONFIG = {
  hourly: '每小时',
  '6h': '每6小时',
  daily: '每天',
}

const LOGIN_CONFIG = {
  none: '无需登录',
  account: '账号密码',
  cookie: 'Cookie导入',
  manual: '人工辅助',
}

export default function SourcesPage() {
  const [sources, setSources] = useState<MonitorSource[]>(MONITOR_SOURCES)
  const [showModal, setShowModal] = useState(false)
  const [editSource, setEditSource] = useState<MonitorSource | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    loginType: 'none' as MonitorSource['loginType'],
    frequency: 'daily' as MonitorSource['frequency'],
    notes: '',
  })

  const handleAdd = () => {
    setEditSource(null)
    setFormData({ name: '', url: '', loginType: 'none', frequency: 'daily', notes: '' })
    setShowModal(true)
  }

  const handleEdit = (source: MonitorSource) => {
    setEditSource(source)
    setFormData({
      name: source.name,
      url: source.url,
      loginType: source.loginType,
      frequency: source.frequency,
      notes: source.notes || '',
    })
    setShowModal(true)
  }

  const handleSave = () => {
    if (editSource) {
      setSources(prev => prev.map(s => s.id === editSource.id ? { ...s, ...formData } : s))
    } else {
      const newSource: MonitorSource = {
        ...formData,
        id: `s-${Date.now()}`,
        status: 'pending',
        lastCrawled: '-',
        crawlCount: 0,
        domains: [],
      }
      setSources(prev => [...prev, newSource])
    }
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setSources(prev => prev.filter(s => s.id !== id))
  }

  const handleRefreshCookie = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, status: 'active', notes: 'Cookie已手动更新' } : s))
  }

  return (
    <div className="p-6 bg-grid min-h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#E6EDF3] mb-1">信源管理</h1>
          <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
            管理定向监控的指定网址，配置登录态与爬取频率
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
          style={{
            background: 'linear-gradient(135deg, #1f6feb, #58A6FF)',
            color: 'white',
            boxShadow: '0 0 20px rgba(88,166,255,0.2)',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          添加信源
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: '信源总数', value: sources.length, color: '#58A6FF' },
          { label: '运行中', value: sources.filter(s => s.status === 'active').length, color: '#3FB950' },
          { label: '需处理', value: sources.filter(s => s.status === 'expired' || s.status === 'error').length, color: '#F85149' },
          { label: '今日采集', value: sources.reduce((s, src) => s + src.crawlCount, 0), color: '#D29922' },
        ].map(stat => (
          <div key={stat.label} className="rounded-xl px-4 py-3" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            <div className="text-[22px] font-bold font-mono" style={{ color: stat.color }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full">
          <thead>
            <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border)' }}>
              {['信源名称', '网址', '登录方式', '爬取频率', '上次采集', '采集总量', '状态', '操作'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sources.map((source, i) => {
              const st = STATUS_CONFIG[source.status]
              return (
                <tr
                  key={source.id}
                  style={{
                    background: i % 2 === 0 ? 'var(--bg-base)' : 'rgba(22,27,34,0.5)',
                    borderBottom: '1px solid var(--border)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.background = i % 2 === 0 ? 'var(--bg-base)' : 'rgba(22,27,34,0.5)')}
                >
                  <td className="px-4 py-3">
                    <div className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{source.name}</div>
                    {source.notes && (
                      <div className="text-[10px] mt-0.5" style={{ color: source.status === 'expired' ? '#D29922' : 'var(--text-muted)' }}>
                        {source.notes}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 max-w-[200px]">
                    <div className="text-[11px] font-mono truncate" style={{ color: 'var(--text-secondary)' }}>
                      {source.url}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded"
                      style={{
                        background: source.loginType !== 'none' ? 'rgba(88,166,255,0.12)' : 'var(--bg-elevated)',
                        color: source.loginType !== 'none' ? '#58A6FF' : 'var(--text-muted)',
                      }}
                    >
                      {LOGIN_CONFIG[source.loginType]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                    {FREQ_CONFIG[source.frequency]}
                  </td>
                  <td className="px-4 py-3 text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    {source.lastCrawled === '-' ? '-' : new Date(source.lastCrawled).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-4 py-3 text-[13px] font-mono font-bold" style={{ color: '#58A6FF' }}>
                    {source.crawlCount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[11px] font-semibold px-2 py-1 rounded-full" style={{ background: st.bg, color: st.color }}>
                      {st.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(source)} className="text-[11px] transition-colors" style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#58A6FF')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                        编辑
                      </button>
                      {source.status === 'expired' && (
                        <button onClick={() => handleRefreshCookie(source.id)} className="text-[11px] transition-colors" style={{ color: 'var(--text-muted)' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#D29922')}
                          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                          更新Cookie
                        </button>
                      )}
                      <button onClick={() => handleDelete(source.id)} className="text-[11px] transition-colors" style={{ color: 'var(--text-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#F85149')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}>
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div
            className="relative w-full max-w-[500px] rounded-2xl p-6"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
          >
            <h3 className="text-[15px] font-bold text-[#E6EDF3] mb-5">{editSource ? '编辑信源' : '添加信源'}</h3>
            <div className="space-y-4">
              {[
                { label: '信源名称', key: 'name', type: 'text', placeholder: '例：SAE International 期刊' },
                { label: '监控网址', key: 'url', type: 'text', placeholder: 'https://...' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-[11px] mb-1.5" style={{ color: 'var(--text-secondary)' }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={(formData as Record<string, string>)[field.key]}
                    onChange={e => setFormData(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none transition-all"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] mb-1.5" style={{ color: 'var(--text-secondary)' }}>登录方式</label>
                  <select
                    value={formData.loginType}
                    onChange={e => setFormData(prev => ({ ...prev, loginType: e.target.value as MonitorSource['loginType'] }))}
                    className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    <option value="none">无需登录</option>
                    <option value="account">账号密码</option>
                    <option value="cookie">Cookie导入</option>
                    <option value="manual">人工辅助</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] mb-1.5" style={{ color: 'var(--text-secondary)' }}>爬取频率</label>
                  <select
                    value={formData.frequency}
                    onChange={e => setFormData(prev => ({ ...prev, frequency: e.target.value as MonitorSource['frequency'] }))}
                    className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    <option value="hourly">每小时</option>
                    <option value="6h">每6小时</option>
                    <option value="daily">每天</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] mb-1.5" style={{ color: 'var(--text-secondary)' }}>备注</label>
                <input
                  value={formData.notes}
                  onChange={e => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="可选"
                  className="w-full px-3 py-2.5 rounded-lg text-[13px] outline-none"
                  style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all"
                style={{ background: 'linear-gradient(135deg, #1f6feb, #58A6FF)' }}>
                保存
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
