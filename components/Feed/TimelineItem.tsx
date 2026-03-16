'use client'

import { FeedItem } from '@/mock/feed'
import { DOMAINS } from '@/mock/domains'

interface TimelineItemProps {
  item: FeedItem & { isNew?: boolean }
  isNew?: boolean
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 1) return '刚刚'
  if (diffMins < 60) return `${diffMins}分钟前`

  return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
}

export default function TimelineItem({ item, isNew }: TimelineItemProps) {
  const domain = DOMAINS.find(d => d.id === item.domainId)
  const nodeColor = domain?.color || '#58A6FF'

  return (
    <div
      className={`relative pl-7 pr-2 py-2.5 transition-all duration-500 ${isNew ? 'timeline-item-new' : ''}`}
      style={{
        animation: isNew ? 'timeline-slide-in 0.5s ease-out' : undefined,
      }}
    >
      {/* Node */}
      <div
        className="absolute left-[3px] top-[14px] w-[10px] h-[10px] rounded-full border-2 z-10 transition-all duration-300"
        style={{
          borderColor: nodeColor,
          background: isNew ? nodeColor : 'var(--bg-base)',
          boxShadow: isNew ? `0 0 8px ${nodeColor}80, 0 0 16px ${nodeColor}40` : 'none',
        }}
      />

      {/* Outer ring for authority items */}
      {item.isAuthority && (
        <div
          className="absolute left-[0px] top-[11px] w-[16px] h-[16px] rounded-full border z-[9]"
          style={{
            borderColor: `${nodeColor}50`,
            animation: isNew ? 'pulse-glow 1.5s infinite' : undefined,
          }}
        />
      )}

      {/* Content */}
      <div className="group">
        {/* Time + domain badge row */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-mono shrink-0" style={{ color: 'var(--text-muted)' }}>
            {formatTime(item.publishedAt)}
          </span>
          <span
            className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
            style={{
              color: nodeColor,
              background: `${nodeColor}15`,
            }}
          >
            {domain?.shortName || item.domainName}
          </span>
          {item.isAuthority && (
            <span
              className="text-[9px] font-bold px-1 py-0.5 rounded shrink-0"
              style={{ background: 'rgba(88,166,255,0.12)', color: '#58A6FF' }}
            >
              权威
            </span>
          )}
          {isNew && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"
              style={{
                background: 'rgba(210,153,34,0.2)',
                color: '#D29922',
                animation: 'pulse-glow 1.5s infinite',
              }}
            >
              LIVE
            </span>
          )}
        </div>

        {/* Title */}
        <div
          className="text-[12px] leading-snug font-medium overflow-hidden transition-colors"
          style={{
            color: isNew ? 'var(--text-primary)' : 'var(--text-secondary)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
          }}
        >
          {item.title}
        </div>

        {/* Source */}
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="inline-block w-1 h-1 rounded-full"
            style={{ background: item.sourceType === 'designated' ? '#58A6FF' : '#484F58' }}
          />
          <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
            {item.source}
          </span>
        </div>
      </div>
    </div>
  )
}
