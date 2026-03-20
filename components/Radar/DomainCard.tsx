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
  // 统一的高级科技强调色
  const ACCENT_COLOR = '#00F0FF' 
  const ACCENT_MUTED = 'rgba(0, 240, 255, 0.15)'

  return (
    <Link href={`/feed?domain=${domain.id}`} className="block">
      <div
        className={`relative p-5 rounded-xl cursor-pointer group overflow-hidden bg-[#0A0A0A] ${isNew ? 'domain-card-highlight' : ''}`}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.06)',
          // 默认状态下极弱的阴影，显得稳重
          boxShadow: 'inset 0 0 20px rgba(255, 255, 255, 0.01)',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        onMouseOver={e => {
          if (isNew) return
          const el = e.currentTarget
          // Hover 时不再位移，而是增强边框和内发光，体现科技感
          el.style.border = `1px solid rgba(0, 240, 255, 0.3)`
          el.style.boxShadow = `inset 0 0 30px ${ACCENT_MUTED}, 0 8px 32px rgba(0, 0, 0, 0.5)`
        }}
        onMouseOut={e => {
          if (isNew) return
          const el = e.currentTarget
          el.style.border = '1px solid rgba(255, 255, 255, 0.06)'
          el.style.boxShadow = 'inset 0 0 20px rgba(255, 255, 255, 0.01)'
        }}
      >
        {/* 高级动效：Hover 时的扫光效果 (Shimmer) */}
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.03)] to-transparent group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

        {/* 顶部极简强调线 (替代原来的渐变线) */}
        <div className={`absolute top-0 left-4 right-4 h-[1px] transition-colors duration-500 ${isNew ? 'bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent' : 'bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.1)] to-transparent group-hover:via-[#00F0FF]'}`} />

        {/* Header 区域 */}
        <div className="relative flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`text-[16px] transition-all duration-300 ${isNew ? 'grayscale-0 opacity-100' : 'opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}>
              {domain.icon}
            </div>
            <div className="text-[14px] font-medium text-white tracking-wider">
              {domain.name}
            </div>
          </div>
          
          {/* 去掉大红大紫的背景，改为极简的数字展示 */}
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5">
              {isNew && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse shadow-[0_0_8px_#00F0FF]" />
              )}
              <span className="text-[18px] font-mono font-light text-[#00F0FF] leading-none">
                {domain.todayCount}
              </span>
            </div>
            <span className="text-[9px] text-white/30 uppercase tracking-widest mt-1">Today</span>
          </div>
        </div>

        {/* 数据图表区：降低饱和度，融入暗黑背景 */}
        <div className="relative flex items-end justify-between mb-4 p-3 bg-white/[0.02] rounded-lg border border-white/[0.03]">
          <div className={`transition-opacity duration-300 ${isNew ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
            <SparkLine data={domain.weekTrend} direction={domain.trendDirection} width={80} height={28} color={ACCENT_COLOR} />
          </div>
          <div className={`transition-opacity duration-300 ${isNew ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>
            <SourcePie designated={domain.sourceRatio.designated} web={domain.sourceRatio.web} size={28} color={ACCENT_COLOR} />
          </div>
        </div>

        {/* 文章列表：强化排版，弱化圆点 */}
        <div className="relative mb-4 space-y-2.5">
          {domain.recentTitles.slice(0, 3).map((title, i) => (
            <div key={i} className="flex items-start gap-2.5 group/item">
              <span className={`font-mono text-[10px] mt-[3px] transition-colors ${isNew && i === 0 ? 'text-[#00F0FF]' : 'text-white/20 group-hover/item:text-[#00F0FF]'}`}>
                0{i + 1}
              </span>
              <span className={`text-[12px] leading-relaxed line-clamp-1 transition-colors ${isNew && i === 0 ? 'text-white font-medium' : 'text-white/60 group-hover/item:text-white'}`}>
                {title}
              </span>
            </div>
          ))}
        </div>

        {/* 关键词：改为极简线框风格 */}
        <div className="relative flex flex-wrap gap-2 pt-3 border-t border-white/[0.04]">
          {domain.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className="text-[10px] px-2 py-1 rounded border border-white/10 text-white/40 group-hover:border-[#00F0FF]/30 group-hover:text-[#00F0FF]/80 transition-colors"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
