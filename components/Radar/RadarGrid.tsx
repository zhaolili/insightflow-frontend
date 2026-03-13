'use client'

import { DOMAINS } from '@/mock/domains'
import DomainCard from './DomainCard'

export default function RadarGrid() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 rounded-full bg-[#58A6FF]" />
          <h2 className="text-[13px] font-semibold text-[#E6EDF3]">九宫格监控面板</h2>
          <span className="text-[11px] text-[#484F58]">— 9个技术领域实时态势</span>
        </div>
        <div className="text-[11px] text-[#484F58] font-mono">
          今日总计 <span className="text-[#58A6FF] font-bold">122</span> 条
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {DOMAINS.map((domain) => (
          <DomainCard key={domain.id} domain={domain} />
        ))}
      </div>
    </div>
  )
}
