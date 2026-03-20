'use client'

import { useState, useEffect, useRef } from 'react'
import { FeedItem, FEED_ITEMS, NEW_ARRIVAL_POOL } from '@/mock/feed'
import { DOMAINS } from '@/mock/domains'
import FeedCard from './FeedCard'
import TimelineItem from './TimelineItem'

interface FeedListProps {
  initialDomainId?: string
  compact?: boolean
  maxItems?: number
  showFilters?: boolean
  autoRefresh?: boolean
  displayMode?: 'list' | 'timeline'
  onNewItem?: (item: FeedItem) => void
}

export default function FeedList({
  initialDomainId,
  compact = false,
  maxItems,
  showFilters = true,
  autoRefresh = true,
  displayMode = 'list',
  onNewItem,
}: FeedListProps) {
  const [items, setItems] = useState<(FeedItem & { isNew?: boolean })[]>(() => {
    const sorted = [...FEED_ITEMS].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    return sorted
  })
  const [selectedDomain, setSelectedDomain] = useState(initialDomainId || 'all')
  const [authorityOnly, setAuthorityOnly] = useState(false)
  const [newPoolIdx, setNewPoolIdx] = useState(0)
  const [liveEnabled, setLiveEnabled] = useState(autoRefresh)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onNewItemRef = useRef(onNewItem)
  const displayModeRef = useRef(displayMode)
  onNewItemRef.current = onNewItem
  displayModeRef.current = displayMode

  useEffect(() => {
    if (!liveEnabled) return
    timerRef.current = setInterval(() => {
      const nextItem = NEW_ARRIVAL_POOL[newPoolIdx % NEW_ARRIVAL_POOL.length]
      const newFeedItem: FeedItem & { isNew: boolean } = {
        ...nextItem,
        id: `new-${Date.now()}`,
        publishedAt: new Date().toISOString(),
        isNew: true,
      }
      setItems(prev => [newFeedItem, ...prev])
      setNewPoolIdx(i => i + 1)
      onNewItemRef.current?.(newFeedItem)

      // Auto scroll to top when new item arrives in list mode
      if (displayModeRef.current === 'list') {
        const container = document.querySelector('.feed-scroll-container')
        if (container) {
          container.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }

      setTimeout(() => {
        setItems(prev =>
          prev.map(item => item.id === newFeedItem.id ? { ...item, isNew: false } : item)
        )
      }, 5000)
    }, 6000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [liveEnabled, newPoolIdx])

  const filtered = items
    .filter(item => selectedDomain === 'all' || item.domainId === selectedDomain)
    .filter(item => !authorityOnly || item.isAuthority)
    .slice(0, maxItems)

  if (displayMode === 'timeline') {
    return (
      <div className="relative">
        {/* Timeline main line */}
        <div
          className="absolute left-[7px] top-0 bottom-0 w-[1px]"
          style={{ background: 'linear-gradient(to bottom, rgba(0, 240, 255, 0.5), rgba(255, 255, 255, 0.1), transparent)' }}
        />
        <div className="space-y-0">
          {filtered.map((item) => (
            <TimelineItem key={item.id} item={item} isNew={item.isNew} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {showFilters && (
        <div className="flex items-center gap-3 mb-4 flex-wrap">
          {/* Domain filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setSelectedDomain('all')}
              className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all"
              style={{
                background: selectedDomain === 'all' ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                color: selectedDomain === 'all' ? '#00F0FF' : 'rgba(255, 255, 255, 0.5)',
                border: `1px solid ${selectedDomain === 'all' ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
              }}
            >
              全部
            </button>
            {DOMAINS.map(d => (
              <button
                key={d.id}
                onClick={() => setSelectedDomain(d.id)}
                className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:border-[#00F0FF]/30 hover:text-[#00F0FF]/80"
                style={{
                  background: selectedDomain === d.id ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
                  color: selectedDomain === d.id ? '#00F0FF' : 'rgba(255, 255, 255, 0.5)',
                  border: `1px solid ${selectedDomain === d.id ? 'rgba(0, 240, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
                }}
              >
                {d.shortName}
              </button>
            ))}
          </div>

          {/* Authority filter */}
          <label className="flex items-center gap-2 cursor-pointer ml-auto group">
            <div
              className="relative w-8 h-4 rounded-full transition-colors border border-white/10"
              style={{ background: authorityOnly ? 'rgba(0, 240, 255, 0.2)' : 'transparent' }}
              onClick={() => setAuthorityOnly(!authorityOnly)}
            >
              <div
                className="absolute top-[1px] w-3 h-3 rounded-full transition-all"
                style={{ 
                  background: authorityOnly ? '#00F0FF' : 'rgba(255, 255, 255, 0.3)',
                  transform: authorityOnly ? 'translateX(16px)' : 'translateX(2px)',
                  boxShadow: authorityOnly ? '0 0 8px rgba(0, 240, 255, 0.5)' : 'none'
                }}
              />
            </div>
            <span className="text-[11px] text-white/50 group-hover:text-white/80 transition-colors">仅权威来源</span>
          </label>

          {/* Live toggle */}
          <button
            onClick={() => setLiveEnabled(!liveEnabled)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] transition-all"
            style={{
              background: liveEnabled ? 'rgba(0, 240, 255, 0.05)' : 'transparent',
              color: liveEnabled ? '#00F0FF' : 'rgba(255, 255, 255, 0.4)',
              border: `1px solid ${liveEnabled ? 'rgba(0, 240, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
            }}
          >
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: liveEnabled ? '#00F0FF' : 'rgba(255, 255, 255, 0.2)',
                boxShadow: liveEnabled ? '0 0 6px #00F0FF' : 'none',
                animation: liveEnabled ? 'pulse-glow 1.5s infinite' : 'none',
              }}
            />
            {liveEnabled ? '实时更新中' : '已暂停'}
          </button>
        </div>
      )}

      {/* Feed count */}
      <div className="text-[11px] mb-4 text-white/40 uppercase tracking-widest font-mono">
        显示 <span className="text-[#00F0FF] font-bold">{filtered.length}</span> 条资讯
        {selectedDomain !== 'all' && (
          <span> · {DOMAINS.find(d => d.id === selectedDomain)?.name}</span>
        )}
      </div>

      {/* Feed items */}
      <div className="space-y-4 pb-24">
        {filtered.map((item) => (
          <FeedCard key={item.id} item={item} isNew={item.isNew} compact={compact} />
        ))}
      </div>
    </div>
  )
}
