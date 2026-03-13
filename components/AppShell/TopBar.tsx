'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface TopBarProps {
  title?: string
  subtitle?: string
}

export default function TopBar({ title, subtitle }: TopBarProps) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')

  const now = new Date()
  const timeStr = now.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return
    router.push(`/qa?q=${encodeURIComponent(inputValue.trim())}`)
    setInputValue('')
  }

  return (
    <header
      className="flex items-center gap-4 px-6 h-[60px] shrink-0"
      style={{
        background: 'rgba(22,27,34,0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      {/* Page title */}
      <div className="shrink-0">
        {title && (
          <div className="flex items-center gap-2">
            <h1 className="text-[14px] font-semibold text-[#E6EDF3]">{title}</h1>
            {subtitle && <span className="text-[12px] text-[#8B949E]">/ {subtitle}</span>}
          </div>
        )}
      </div>

      {/* Global QA search bar */}
      <form onSubmit={handleSearch} className="flex-1 max-w-[600px] mx-auto">
        <div
          className="flex items-center gap-3 px-4 h-9 rounded-lg transition-all"
          style={{
            background: 'rgba(13,17,23,0.8)',
            border: '1px solid var(--border-subtle)',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'rgba(88,166,255,0.4)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="向情报库提问，如：最近有哪些智能驾驶新动态？"
            className="flex-1 bg-transparent text-[13px] text-[#E6EDF3] placeholder-[#484F58] outline-none"
          />
          {inputValue && (
            <kbd className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262D] text-[#8B949E] font-mono shrink-0">
              Enter
            </kbd>
          )}
        </div>
      </form>

      {/* Right side */}
      <div className="flex items-center gap-4 shrink-0 ml-auto">
        {/* Time display */}
        <div className="text-[11px] font-mono text-[#484F58] hidden md:block">
          {timeStr}
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full bg-[#3FB950]"
            style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
          />
          <span className="text-[11px] text-[#8B949E] hidden lg:block">实时监控中</span>
        </div>

        {/* User avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white cursor-pointer"
          style={{ background: 'linear-gradient(135deg, #1f6feb, #58A6FF)' }}
          title="admin"
        >
          A
        </div>
      </div>
    </header>
  )
}
