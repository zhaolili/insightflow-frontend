'use client'

import { useState, useCallback } from 'react'
import RadarGrid from '@/components/Radar/RadarGrid'
import FeedList from '@/components/Feed/FeedList'
import AnimatedNumber from '@/components/AnimatedNumber'
import HotKeywordStrip from '@/components/Radar/HotKeywordStrip'
import { DOMAINS } from '@/mock/domains'
import { FeedItem } from '@/mock/feed'

export default function DashboardPage() {
  const totalToday = DOMAINS.reduce((s, d) => s + d.todayCount, 0)
  const [highlightEvent, setHighlightEvent] = useState<{ domainId: string; ts: number } | null>(null)
  const [todayExtra, setTodayExtra] = useState(0)

  const handleNewItem = useCallback((item: FeedItem) => {
    // 先清除再设置，保证即使连续同领域也能触发动画
    setHighlightEvent(null)
    requestAnimationFrame(() => {
      setHighlightEvent({ domainId: item.domainId, ts: Date.now() })
    })
    setTodayExtra(prev => prev + 1)
    setTimeout(() => setHighlightEvent(null), 4000)
  }, [])

  return (
    <div className="h-full flex flex-col p-6 bg-grid">
      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {/* Today count - animated */}
        <div
          className="rounded-xl px-5 py-4"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
        >
          <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>今日新增</div>
          <div className="flex items-baseline gap-1">
            <AnimatedNumber
              value={totalToday + todayExtra}
              className="text-[28px] font-bold font-mono leading-none"
              style={{ color: '#58A6FF' }}
            />
            <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>条</span>
          </div>
        </div>
        {/* Static stats */}
        {[
          { label: '监控领域', value: 9, unit: '个', color: '#3FB950' },
          { label: '活跃信源', value: 6, unit: '个', color: '#D29922' },
          { label: '权威资讯占比', value: '41', unit: '%', color: '#A371F7' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl px-5 py-4"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold font-mono leading-none" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Hot keywords strip */}
      <div
        className="rounded-lg py-1.5 mb-5 overflow-hidden"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <HotKeywordStrip />
      </div>

      {/* Main 2-column layout */}
      <div className="flex-1 grid grid-cols-[1fr_340px] gap-6 min-h-0">
        {/* Left: Radar Grid */}
        <div className="overflow-y-auto pr-2 custom-scrollbar">
          <RadarGrid highlightDomainId={highlightEvent?.domainId ?? null} highlightKey={highlightEvent?.ts ?? 0} />
        </div>

        {/* Right: Timeline Feed */}
        <div className="flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-4 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#3FB950]" />
              <h2 className="text-[13px] font-semibold text-[#E6EDF3]">时间轴 Feed</h2>
              <div
                className="w-1.5 h-1.5 rounded-full bg-[#3FB950]"
                style={{ animation: 'pulse-glow 1.5s infinite' }}
              />
            </div>
            <a href="/feed" className="text-[11px] text-[#58A6FF] hover:underline">查看全部 →</a>
          </div>

          {/* Timeline container with fade edges */}
          <div className="relative flex-1 min-h-0">
            <div className="timeline-fade-top" />
            <div className="h-full overflow-y-auto pr-1 timeline-scroll">
              <FeedList
                compact={true}
                maxItems={10}
                showFilters={false}
                autoRefresh={true}
                displayMode="timeline"
                onNewItem={handleNewItem}
              />
            </div>
            <div className="timeline-fade-bottom" />
          </div>
        </div>
      </div>
    </div>
  )
}
