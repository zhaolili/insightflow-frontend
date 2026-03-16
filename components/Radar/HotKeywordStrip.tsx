'use client'

import { DOMAINS } from '@/mock/domains'

interface KeywordEntry {
  keyword: string
  color: string
  domainShort: string
  heat: number
}

function getTopKeywords(): KeywordEntry[] {
  const pool: KeywordEntry[] = []

  DOMAINS.forEach((d, dIdx) => {
    const baseHeat = d.todayCount * 15
    d.keywords.slice(0, 2).forEach((kw, kIdx) => {
      pool.push({
        keyword: kw,
        color: d.color,
        domainShort: d.shortName,
        heat: baseHeat + (10 - kIdx) * 8 + dIdx * 3,
      })
    })
  })

  pool.sort((a, b) => b.heat - a.heat)
  return pool.slice(0, 10)
}

export default function HotKeywordStrip() {
  const keywords = getTopKeywords()
  // Duplicate for seamless marquee (need enough to cover 2x screen width)
  const marqueeItems = [...keywords, ...keywords, ...keywords, ...keywords]

  return (
    <div className="relative flex items-center overflow-hidden py-1.5 w-full">
      {/* Left fixed label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center pr-8 pl-4" style={{
        background: 'linear-gradient(90deg, var(--bg-card) 60%, transparent)'
      }}>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-[#D29922]/50 bg-[#D29922]/10 shadow-[0_0_15px_rgba(210,153,34,0.15)] relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(210,153,34,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[border-scan_3s_linear_infinite]" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#D29922" strokeWidth="2" className="relative z-10">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-[12px] font-bold tracking-widest text-[#D29922] relative z-10" style={{ textShadow: '0 0 8px rgba(210,153,34,0.5)' }}>
            实时热点
          </span>
        </div>
      </div>

      {/* Marquee container */}
      <div className="flex w-max animate-marquee pl-[140px]">
        {marqueeItems.map((kw, i) => (
          <div
            key={`${kw.keyword}-${i}`}
            className="relative flex items-center justify-center px-5 py-1.5 mx-2 group cursor-pointer"
          >
            {/* Skewed background */}
            <div 
              className="absolute inset-0 skew-x-[-15deg] border transition-all duration-300 group-hover:bg-opacity-30"
              style={{ 
                borderColor: `${kw.color}40`,
                background: `linear-gradient(90deg, ${kw.color}15, transparent)`,
                boxShadow: `inset 2px 0 0 ${kw.color}`
              }} 
            />
            
            {/* Content (un-skewed) */}
            <div className="relative flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: kw.color, boxShadow: `0 0 8px ${kw.color}` }} />
              <span className="text-[13px] font-bold text-[#E6EDF3] tracking-wide whitespace-nowrap" style={{ textShadow: '0 0 4px rgba(255,255,255,0.1)' }}>
                {kw.keyword}
              </span>
              <div className="flex items-center gap-1 bg-black/20 px-1.5 py-0.5 rounded">
                <span className="text-[11px] font-mono" style={{ color: kw.color }}>
                  {kw.heat}
                </span>
                {(i % keywords.length) < 3 && (
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={kw.color} strokeWidth="3">
                    <polyline points="18,15 12,9 6,15" />
                  </svg>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{
        background: 'linear-gradient(-90deg, var(--bg-card) 20%, transparent)'
      }} />
    </div>
  )
}
