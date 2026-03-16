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

  return (
    <div
      className={`relative rounded-xl px-5 py-4 transition-all duration-300 group overflow-hidden ${isNew ? 'feed-highlight feed-card-enter' : ''}`}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={e => {
        setShowActions(true)
        e.currentTarget.style.borderColor = domain?.color ? `${domain.color}50` : 'var(--border-subtle)'
        e.currentTarget.style.background = 'var(--bg-card-hover)'
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = domain?.color ? `0 8px 24px ${domain.color}15` : '0 8px 24px rgba(0,0,0,0.4)'
      }}
      onMouseLeave={e => {
        setShowActions(false)
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.background = 'var(--bg-card)'
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${domain?.color || 'var(--accent)'}, transparent)` }}
      />
      {/* Top row: domain + time + authority badge */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-base">{domain?.icon || '📄'}</span>
        <span
          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            color: domain?.color || '#58A6FF',
            background: `${domain?.color || '#58A6FF'}18`,
          }}
        >
          {item.domainName}
        </span>
        {item.isAuthority && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(88,166,255,0.15)', color: '#58A6FF' }}
          >
            权威
          </span>
        )}
        {isNew && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(210,153,34,0.2)', color: '#D29922' }}
          >
            NEW
          </span>
        )}
        <span className="ml-auto text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
          {timeAgo(item.publishedAt)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-[14px] font-bold mb-2.5 leading-snug cursor-pointer transition-colors"
        style={{ color: 'var(--text-primary)' }}
        onMouseEnter={e => (e.currentTarget.style.color = domain?.color || '#58A6FF')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-primary)')}
      >
        {item.title}
      </h3>

      {/* Summary */}
      {!compact && (
        <p
          className="text-[12px] leading-relaxed mb-3.5 opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--text-secondary)' }}
        >
          {item.summary}
        </p>
      )}

      {/* Tech points */}
      {!compact && item.techPoints.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {item.techPoints.map((pt, i) => (
            <span
              key={i}
              className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-md"
              style={{
                background: domain?.color ? `${domain.color}10` : 'rgba(88,166,255,0.08)',
                border: `1px solid ${domain?.color ? `${domain.color}25` : 'rgba(88,166,255,0.15)'}`,
                color: domain?.color || '#58A6FF',
              }}
            >
              <span className="w-1 h-1 rounded-full" style={{ background: domain?.color || '#58A6FF' }} />
              {pt}
            </span>
          ))}
        </div>
      )}

      {/* Tags + source */}
      <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-[var(--border-subtle)]">
        {item.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-muted)]"
          >
            #{tag}
          </span>
        ))}
        <span className="ml-auto text-[11px] flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ 
              background: item.sourceType === 'designated' ? (domain?.color || '#58A6FF') : '#8B949E',
              boxShadow: item.sourceType === 'designated' ? `0 0 4px ${domain?.color || '#58A6FF'}` : 'none'
            }}
          />
          {item.source}
        </span>
      </div>

      {/* Hover action buttons */}
      <div
        className={`absolute right-4 top-4 flex items-center gap-1 rounded-lg px-2 py-1.5 transition-all duration-300 ${showActions ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
        style={{
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-subtle)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        }}
      >
          <button
            onClick={e => { e.preventDefault(); setBookmarked(!bookmarked) }}
            className="p-1.5 rounded-md transition-colors text-[#8B949E] hover:text-[#58A6FF]"
            title="收藏"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={bookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
            </svg>
          </button>
          <a
            href={`/qa?q=${encodeURIComponent('基于文章：' + item.title + '，生成情报摘要报告')}`}
            className="p-1.5 rounded-md transition-colors text-[#8B949E] hover:text-[#3FB950]"
            title="生成报告"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="9" y1="13" x2="15" y2="13"/>
            </svg>
          </a>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-md transition-colors text-[#8B949E] hover:text-[#D29922]"
            title="查看原文"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
              <polyline points="15,3 21,3 21,9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
  )
}
