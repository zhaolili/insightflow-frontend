'use client'

import Link from 'next/link'
import { Domain } from '@/mock/domains'
import SparkLine from './SparkLine'
import SourcePie from './SourcePie'

interface DomainCardProps {
  domain: Domain
  isNew?: boolean
}

export default function DomainCard({ domain, isNew }: DomainCardProps) {
  return (
    <Link href={`/feed?domain=${domain.id}`} className="block">
      <div
        className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden ${isNew ? 'domain-card-highlight' : ''}`}
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${isNew ? `${domain.color}80` : 'var(--border)'}`,
          boxShadow: isNew
            ? `0 0 0 1px ${domain.color}40, 0 0 32px ${domain.color}25`
            : '0 4px 12px rgba(0,0,0,0.2)',
        }}
        onMouseOver={e => {
          if (isNew) return
          const el = e.currentTarget
          el.style.borderColor = `${domain.color}60`
          el.style.background = 'var(--bg-card-hover)'
          el.style.boxShadow = `0 8px 32px ${domain.color}20, 0 4px 12px rgba(0,0,0,0.4)`
          el.style.transform = 'translateY(-4px)'
        }}
        onMouseOut={e => {
          if (isNew) return
          const el = e.currentTarget
          el.style.borderColor = 'var(--border)'
          el.style.background = 'var(--bg-card)'
          el.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Ambient background glow */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${domain.color}15 0%, transparent 70%)`
          }}
        />

        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 ${isNew ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}
          style={{ 
            background: `linear-gradient(90deg, transparent, ${domain.color}, transparent)`,
            boxShadow: `0 0 ${isNew ? '14px' : '8px'} ${domain.color}`
          }}
        />

        {/* Header row */}
        <div className="relative flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div 
              className={`flex items-center justify-center w-7 h-7 rounded-lg transition-colors duration-300 ${isNew ? 'animate-pulse' : ''}`}
              style={{ 
                background: isNew ? 'rgba(210,153,34,0.2)' : `${domain.color}15`, 
                border: `1px solid ${isNew ? 'rgba(210,153,34,0.5)' : `${domain.color}30`}` 
              }}
            >
              <span className="text-[14px]">{domain.icon}</span>
            </div>
            <div className="text-[13px] font-bold text-[#E6EDF3] tracking-wide">{domain.name}</div>
          </div>
          <div
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-white shrink-0 shadow-sm"
            style={{ 
              background: 'linear-gradient(135deg, var(--danger), #ff7b72)',
              boxShadow: '0 2px 8px rgba(248,81,73,0.3)'
            }}
          >
            +{domain.todayCount}
          </div>
        </div>

        {/* Sparkline + source pie */}
        <div className="relative flex items-end justify-between mb-3 bg-black/20 rounded-lg p-2 border border-white/5">
          <SparkLine data={domain.weekTrend} direction={domain.trendDirection} width={80} height={28} />
          <SourcePie designated={domain.sourceRatio.designated} web={domain.sourceRatio.web} size={28} />
        </div>

        {/* Trend label */}
        <div className="relative flex items-center gap-2 mb-3">
          <span
            className="flex items-center gap-0.5 text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
            style={{ 
              color: domain.trendDirection === 'up' ? '#3FB950' : domain.trendDirection === 'down' ? '#F85149' : '#8B949E',
              background: domain.trendDirection === 'up' ? 'rgba(63,185,80,0.1)' : domain.trendDirection === 'down' ? 'rgba(248,81,73,0.1)' : 'rgba(139,148,158,0.1)'
            }}
          >
            {domain.trendDirection === 'up' ? '▲' : domain.trendDirection === 'down' ? '▼' : '—'}
            7天趋势
          </span>
          <span className="text-[10px] text-[#8B949E]">今日新增 <strong className="text-[#E6EDF3] font-mono">{domain.todayCount}</strong> 条</span>
        </div>

        {/* Recent 3 titles - always visible */}
        <div className="relative mb-3.5 space-y-2">
          {domain.recentTitles.slice(0, 3).map((title, i) => (
            <div key={i} className={`flex items-start gap-2 group/item ${isNew && i === 0 ? 'bg-[rgba(210,153,34,0.1)] -mx-2 px-2 py-1 rounded-md' : ''}`}>
              <span
                className={`shrink-0 w-1.5 h-1.5 rounded-full mt-[5px] transition-all duration-300 group-hover/item:scale-150 ${isNew && i === 0 ? 'animate-pulse' : ''}`}
                style={{ 
                  background: isNew && i === 0 ? '#D29922' : (i === 0 ? domain.color : 'var(--text-muted)'),
                  boxShadow: isNew && i === 0 ? '0 0 8px #D29922' : (i === 0 ? `0 0 6px ${domain.color}` : 'none')
                }}
              />
              <span
                className={`text-[11px] leading-snug overflow-hidden transition-colors duration-200 group-hover/item:text-white ${isNew && i === 0 ? 'font-bold text-[#E6EDF3]' : ''}`}
                style={{
                  color: isNew && i === 0 ? undefined : (i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)'),
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical' as const,
                }}
              >
                {title}
              </span>
            </div>
          ))}
        </div>

        {/* Keywords */}
        <div className="relative flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          {domain.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="text-[9px] px-1.5 py-0.5 rounded-sm font-medium tracking-wide"
              style={{
                background: `linear-gradient(to right, ${domain.color}15, transparent)`,
                color: `${domain.color}`,
                borderLeft: `2px solid ${domain.color}`,
              }}
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
