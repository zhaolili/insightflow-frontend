'use client'

import { FeedItem } from '@/mock/feed'
import { DOMAINS } from '@/mock/domains'

interface EvidenceStripProps {
  items: FeedItem[]
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 24) return `${hours}小时前`
  return `${Math.floor(hours / 24)}天前`
}

export default function EvidenceStrip({ items }: EvidenceStripProps) {
  if (!items.length) return null

  return (
    <div className="mt-3">
      <div
        className="text-[10px] font-semibold tracking-wider uppercase mb-2 flex items-center gap-1.5"
        style={{ color: 'var(--text-muted)' }}
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
        </svg>
        引用情报来源 ({items.length})
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => {
          const domain = DOMAINS.find(d => d.id === item.domainId)
          return (
            <div
              key={item.id}
              className="rounded-lg px-3 py-2.5 flex items-start gap-3"
              style={{
                background: 'rgba(13,17,23,0.6)',
                border: '1px solid var(--border)',
              }}
            >
              <span className="text-sm shrink-0 mt-0.5">{domain?.icon || '📄'}</span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium leading-snug text-[#E6EDF3] truncate">
                  {item.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-[9px] px-1.5 py-0.5 rounded"
                    style={{
                      color: domain?.color || '#58A6FF',
                      background: `${domain?.color || '#58A6FF'}18`,
                    }}
                  >
                    {item.domainName}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    {item.source}
                  </span>
                  <span className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    {timeAgo(item.publishedAt)}
                  </span>
                </div>
              </div>
              {item.isAuthority && (
                <span
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0"
                  style={{ background: 'rgba(88,166,255,0.15)', color: '#58A6FF' }}
                >
                  权威
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
