'use client'

import { useState } from 'react'
import { FeedItem } from '@/mock/feed'
import { DOMAINS } from '@/mock/domains'

interface FeedCardProps {
  item: FeedItem
  isNew?: boolean
  compact?: boolean
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}分钟前`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}小时前`
  return `${Math.floor(hours / 24)}天前`
}

export default function FeedCard({ item, isNew, compact }: FeedCardProps) {
  const [showActions, setShowActions] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const domain = DOMAINS.find(d => d.id === item.domainId)
  
  const ACCENT_COLOR = '#00F0FF'

  return (
    <div
      className={`relative rounded-xl px-6 py-5 transition-all duration-300 group overflow-hidden bg-[#0A0A0A] ${isNew ? 'feed-highlight feed-card-enter' : ''}`}
      style={{
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.01)',
      }}
      onMouseEnter={e => {
        setShowActions(true)
        e.currentTarget.style.border = `1px solid rgba(0, 240, 255, 0.3)`
        e.currentTarget.style.boxShadow = `inset 0 0 30px rgba(0, 240, 255, 0.05), 0 8px 32px rgba(0, 0, 0, 0.5)`
      }}
      onMouseLeave={e => {
        setShowActions(false)
        e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.06)'
        e.currentTarget.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.01)'
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${ACCENT_COLOR}, transparent)` }}
      />
      
      {/* Top row: domain + time + authority badge */}
      <div className="flex items-center gap-3 mb-3">
        <span className="text-base opacity-70 grayscale group-hover:grayscale-0 transition-all">{domain?.icon || '📄'}</span>
        <span className="text-[12px] font-medium text-white/80 tracking-wide">
          {item.domainName}
        </span>
        {item.isAuthority && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded border border-[#00F0FF]/30 text-[#00F0FF]">
            权威发布
          </span>
        )}
        {isNew && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#00F0FF]/50 bg-[#00F0FF]/10 text-[#00F0FF] animate-pulse">
            NEW
          </span>
        )}
        <span className="ml-auto text-[11px] font-mono uppercase tracking-widest text-white/30">
          {timeAgo(item.publishedAt)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[16px] font-medium mb-3 leading-snug cursor-pointer transition-colors text-[#F3F4F6] group-hover:text-[#00F0FF]"
      >
        {item.title}
      </h3>

      {/* Summary */}
      {!compact && (
        <p className="text-[13px] leading-relaxed mb-4 text-white/50 group-hover:text-white/70 transition-colors">
          {item.summary}
        </p>
      )}

      {/* Tech points */}
      {!compact && item.techPoints.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-5">
          {item.techPoints.map((pt, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-md border border-white/10 text-white/60 bg-white/[0.02]"
            >
              <span className="w-1 h-1 rounded-full bg-[#00F0FF]/50" />
              {pt}
            </span>
          ))}
        </div>
      )}

      {/* Tags + source */}
      <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-white/[0.04]">
        {item.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-1 rounded border border-white/10 text-white/40 bg-transparent"
          >
            #{tag}
          </span>
        ))}
        <span className="ml-auto text-[11px] flex items-center gap-1.5 text-white/30 uppercase font-mono tracking-wider">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ 
              background: item.sourceType === 'designated' ? ACCENT_COLOR : '#484F58',
              boxShadow: item.sourceType === 'designated' ? `0 0 6px ${ACCENT_COLOR}` : 'none'
            }}
          />
          {item.source}
        </span>
      </div>

      {/* Hover action buttons */}
      <div
        className={`absolute right-5 top-5 flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition-all duration-300 backdrop-blur-md ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        style={{
          background: 'rgba(10, 10, 10, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
          <button
            onClick={e => { e.preventDefault(); setBookmarked(!bookmarked) }}
            className="p-1.5 rounded-md transition-colors text-white/40 hover:text-[#00F0FF]"
            title="收藏"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
            </svg>
          </button>
          <a
            href={`/qa?q=${encodeURIComponent('基于文章：' + item.title + '，生成情报摘要报告')}`}
            className="p-1.5 rounded-md transition-colors text-white/40 hover:text-[#00F0FF]"
            title="生成报告"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
            </svg>
          </a>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md transition-colors text-white/40 hover:text-[#00F0FF]"
            title="查看原文"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
  )
}
