'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import FeedList from '@/components/Feed/FeedList'
import { DOMAINS } from '@/mock/domains'

export default function DisplayFeedPage() {
  const router = useRouter()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showExitHint, setShowExitHint] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    const hintTimer = setTimeout(() => setShowExitHint(false), 5000)
    return () => {
      clearInterval(timer)
      clearTimeout(hintTimer)
    }
  }, [])

  const timeStr = currentTime.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  return (
    <div className="h-full flex flex-col p-5">
      {/* 顶部信息栏 */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#58A6FF] to-[#1f6feb] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="white"/>
                <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.4"/>
              </svg>
            </div>
            <div>
              <div className="text-white font-bold text-sm leading-tight">InsightFlow</div>
              <div className="text-[#58A6FF] text-[9px] tracking-wider uppercase">实时情报监测</div>
            </div>
          </div>

          {/* 当前时间 */}
          <div className="text-[13px] font-mono text-[#8B949E] border-l border-[#30363D] pl-4">
            {timeStr}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* 系统状态 */}
          <div className="flex items-center gap-2 text-[11px]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" style={{ animation: 'pulse-glow 2s infinite' }} />
            <span style={{ color: 'var(--text-secondary)' }}>实时监控中 · 9大领域 · 今日采集 122 条</span>
          </div>

          {/* 退出大屏按钮 */}
          <button
            onClick={() => router.push('/feed')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all"
            style={{
              background: 'rgba(88,166,255,0.1)',
              border: '1px solid rgba(88,166,255,0.2)',
              color: '#58A6FF',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(88,166,255,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(88,166,255,0.1)'
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3v3a2 2 0 01-2 2H3m18 0h-3a2 2 0 01-2-2V3m0 18v-3a2 2 0 012-2h3M3 16h3a2 2 0 012 2v3"/>
            </svg>
            退出大屏
          </button>
        </div>
      </div>

      {/* 退出提示 */}
      {showExitHint && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-[11px] z-50 transition-opacity duration-500"
          style={{
            background: 'rgba(210,153,34,0.15)',
            border: '1px solid rgba(210,153,34,0.3)',
            color: '#D29922',
          }}
        >
          按 ESC 或点击右上角退出大屏模式
        </div>
      )}

      {/* Feed 流 - 大屏展示 */}
      <div className="flex-1 overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border)' }}>
        <div className="h-full overflow-y-auto p-4" style={{ background: 'var(--bg-card)' }}>
          {/* 简洁的过滤器 */}
          <div className="flex items-center gap-2 mb-4 sticky top-0 z-10 pb-3" style={{ background: 'var(--bg-card)' }}>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>领域筛选：</span>
            {DOMAINS.slice(0, 6).map(d => (
              <span
                key={d.id}
                className="px-2 py-1 rounded text-[10px]"
                style={{
                  background: `${d.color}15`,
                  color: d.color,
                  border: `1px solid ${d.color}30`,
                }}
              >
                {d.shortName}
              </span>
            ))}
            <span className="text-[10px] px-2 py-1 rounded" style={{ background: 'var(--bg-base)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>+3</span>
          </div>

          <FeedList showFilters={false} autoRefresh={true} />
        </div>
      </div>

      {/* 底部滚动提示 */}
      <div className="flex items-center justify-center gap-2 mt-3 text-[10px]" style={{ color: 'var(--text-muted)' }}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#58A6FF]" style={{ animation: 'pulse-glow 1.5s infinite' }} />
        <span>新资讯自动插入 · 滚动查看更多</span>
      </div>
    </div>
  )
}
