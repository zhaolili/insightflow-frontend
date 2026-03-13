'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logoutAction } from '@/app/login/actions'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
  badge?: number
}

function RadarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="12" r="5" strokeDasharray="3 2"/>
      <circle cx="12" cy="12" r="10" strokeDasharray="2 3" strokeOpacity="0.5"/>
      <line x1="12" y1="2" x2="12" y2="5"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="2" y1="12" x2="5" y2="12"/>
      <line x1="19" y1="12" x2="22" y2="12"/>
    </svg>
  )
}

function FeedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="3" rx="1.5"/>
      <rect x="3" y="10.5" width="14" height="3" rx="1.5"/>
      <rect x="3" y="17" width="10" height="3" rx="1.5"/>
    </svg>
  )
}

function QAIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none"/>
      <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function ReportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
      <line x1="9" y1="13" x2="15" y2="13"/>
      <line x1="9" y1="17" x2="13" y2="17"/>
    </svg>
  )
}

function SourceIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
    </svg>
  )
}

function KeywordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
    </svg>
  )
}

const navGroups = [
  {
    label: '情报中心',
    items: [
      { href: '/', label: '技术雷达驾驶舱', icon: <RadarIcon /> },
      { href: '/feed', label: '资讯 Feed 流', icon: <FeedIcon />, badge: 3 },
    ],
  },
  {
    label: '智能分析',
    items: [
      { href: '/qa', label: '情报问答', icon: <QAIcon /> },
      { href: '/reports', label: '报告中心', icon: <ReportIcon /> },
    ],
  },
  {
    label: '系统配置',
    items: [
      { href: '/admin/sources', label: '信源管理', icon: <SourceIcon /> },
      { href: '/admin/keywords', label: '关键词管理', icon: <KeywordIcon /> },
      { href: '/settings', label: '系统设置', icon: <SettingsIcon /> },
    ],
  },
]

export default function SideNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className="flex flex-col h-full w-[200px] shrink-0"
      style={{
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#1f6feb] to-[#58A6FF] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="white"/>
            <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
            <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.4"/>
          </svg>
        </div>
        <div>
          <div className="text-[13px] font-bold text-[#E6EDF3] leading-tight">InsightFlow</div>
          <div className="text-[9px] text-[#58A6FF] tracking-[0.15em] uppercase">企业技术情报系统</div>
        </div>
      </div>

      {/* Nav groups */}
      <nav className="flex-1 overflow-y-auto py-2 px-2">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-4">
            <div
              className="px-2 py-1.5 text-[10px] font-semibold tracking-[0.12em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              {group.label}
            </div>
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-all mb-0.5 relative group"
                style={{
                  color: isActive(item.href) ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive(item.href) ? 'rgba(88,166,255,0.1)' : 'transparent',
                  borderRight: isActive(item.href) ? '2px solid var(--accent)' : '2px solid transparent',
                }}
              >
                <span style={{ opacity: isActive(item.href) ? 1 : 0.7 }}>{item.icon}</span>
                <span className="flex-1 font-medium">{item.label}</span>
                {item.badge && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                    style={{ background: 'var(--danger)', color: 'white' }}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* System status */}
      <div className="px-3 py-2 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" style={{ animation: 'pulse-glow 2s infinite' }}/>
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>系统运行中</span>
        </div>
        <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
          今日采集 <span className="text-[#58A6FF] font-mono font-bold">122</span> 条
        </div>
      </div>

      {/* Logout */}
      <form action={logoutAction}>
        <button
          type="submit"
          className="w-full flex items-center gap-2.5 px-4 py-3 text-[12px] transition-all border-t"
          style={{
            color: 'var(--text-muted)',
            borderColor: 'var(--border)',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          退出登录
        </button>
      </form>
    </aside>
  )
}
