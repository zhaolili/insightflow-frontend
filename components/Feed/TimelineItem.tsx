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
  const ACCENT_COLOR = '#00F0FF'

  return (
    <div
      className={`relative pl-7 pr-2 py-3 transition-all duration-500 group ${isNew ? 'bg-[#00F0FF]/5 rounded-lg' : ''}`}
      style={{
        animation: isNew ? 'timeline-slide-in 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : undefined,
      }}
    >
      {/* Node */}
      <div
        className="absolute left-[3px] top-[18px] w-[10px] h-[10px] rounded-full border-[1.5px] z-10 transition-all duration-300"
        style={{
          borderColor: isNew ? ACCENT_COLOR : 'rgba(255, 255, 255, 0.3)',
          background: isNew ? ACCENT_COLOR : '#0A0A0A',
          boxShadow: isNew ? `0 0 12px ${ACCENT_COLOR}` : 'none',
        }}
      />

      {/* Outer ring for authority items */}
      {item.isAuthority && (
        <div
          className="absolute left-[0px] top-[15px] w-[16px] h-[16px] rounded-full border z-[9] transition-colors"
          style={{
            borderColor: isNew ? `rgba(0, 240, 255, 0.4)` : 'rgba(255, 255, 255, 0.1)',
            animation: isNew ? 'pulse-glow 1.5s infinite' : undefined,
          }}
        />
      )}

      {/* Content */}
      <div className="group">
        {/* Time + domain badge row */}
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono shrink-0 text-white/30 uppercase tracking-widest">
            {formatTime(item.publishedAt)}
          </span>
          <span
            className="text-[9px] font-medium px-1.5 py-0.5 rounded-full shrink-0 border border-white/10 text-white/50"
          >
            {domain?.shortName || item.domainName}
          </span>
          {item.isAuthority && (
            <span
              className="text-[9px] font-medium px-1.5 py-0.5 rounded shrink-0 border border-[#00F0FF]/30 text-[#00F0FF]"
            >
              权威
            </span>
          )}
          {isNew && (
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 bg-[#00F0FF]/10 border border-[#00F0FF]/50 text-[#00F0FF]"
              style={{
                animation: 'pulse-glow 1.5s infinite',
              }}
            >
              LIVE
            </span>
          )}
        </div>

        {/* Title */}
        <div
          className="text-[13px] leading-relaxed font-medium overflow-hidden transition-colors group-hover:text-white"
          style={{
            color: isNew ? '#F3F4F6' : 'rgba(255, 255, 255, 0.6)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
          }}
        >
          {item.title}
        </div>

        {/* Source */}
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ 
              background: item.sourceType === 'designated' ? ACCENT_COLOR : 'rgba(255, 255, 255, 0.2)',
              boxShadow: item.sourceType === 'designated' ? `0 0 6px ${ACCENT_COLOR}` : 'none'
            }}
          />
          <span className="text-[10px] text-white/30 font-mono tracking-wider uppercase">
            {item.source}
          </span>
        </div>
      </div>
    </div>
  )
}
