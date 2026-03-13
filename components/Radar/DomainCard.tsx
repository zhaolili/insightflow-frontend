'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Domain } from '@/mock/domains'
import SparkLine from './SparkLine'
import SourcePie from './SourcePie'

interface DomainCardProps {
  domain: Domain
  isNew?: boolean
}

export default function DomainCard({ domain, isNew }: DomainCardProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <Link href={`/feed?domain=${domain.id}`} className="block">
      <div
        className={`relative p-4 rounded-xl cursor-pointer transition-all duration-200 group overflow-hidden ${isNew ? 'feed-highlight' : ''}`}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onMouseOver={e => {
          const el = e.currentTarget
          el.style.borderColor = `${domain.color}40`
          el.style.boxShadow = `0 0 20px ${domain.color}15, 0 1px 3px rgba(0,0,0,0.4)`
        }}
        onMouseOut={e => {
          const el = e.currentTarget
          el.style.borderColor = 'var(--border)'
          el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.4)'
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-xl opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)` }}
        />

        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base">{domain.icon}</span>
            <div>
              <div className="text-[12px] font-semibold text-[#E6EDF3] leading-tight">{domain.name}</div>
            </div>
          </div>
          {/* Today badge */}
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white shrink-0"
            style={{ background: 'var(--danger)' }}
          >
            +{domain.todayCount}
          </div>
        </div>

        {/* Sparkline + source pie */}
        <div className="flex items-end justify-between mb-3">
          <SparkLine data={domain.weekTrend} direction={domain.trendDirection} width={80} height={28} />
          <SourcePie designated={domain.sourceRatio.designated} web={domain.sourceRatio.web} size={28} />
        </div>

        {/* Trend label */}
        <div className="flex items-center gap-1.5 mb-2">
          <span
            className="text-[10px] font-mono"
            style={{ color: domain.trendDirection === 'up' ? '#3FB950' : domain.trendDirection === 'down' ? '#F85149' : '#8B949E' }}
          >
            {domain.trendDirection === 'up' ? '▲' : domain.trendDirection === 'down' ? '▼' : '—'}
            &nbsp;7天趋势
          </span>
          <span className="text-[10px] text-[#484F58]">今日{domain.todayCount}条</span>
        </div>

        {/* Latest title */}
        <div
          className="text-[11px] leading-relaxed overflow-hidden"
          style={{
            color: 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {domain.latestTitle}
        </div>

        {/* Hover tooltip with recent titles */}
        {showTooltip && (
          <div
            className="absolute left-0 right-0 bottom-full mb-2 z-50 rounded-lg p-3 text-[11px]"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            }}
          >
            <div className="text-[10px] font-semibold text-[#8B949E] mb-2 uppercase tracking-wide">最近3条</div>
            {domain.recentTitles.map((t, i) => (
              <div key={i} className="flex items-start gap-2 mb-1.5 last:mb-0">
                <span className="text-[#484F58] shrink-0 mt-0.5">{i + 1}.</span>
                <span className="text-[#E6EDF3] leading-relaxed">{t}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
