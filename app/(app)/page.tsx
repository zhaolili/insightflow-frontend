import RadarGrid from '@/components/Radar/RadarGrid'
import FeedList from '@/components/Feed/FeedList'
import { DOMAINS } from '@/mock/domains'

export default function DashboardPage() {
  const totalToday = DOMAINS.reduce((s, d) => s + d.todayCount, 0)

  return (
    <div className="p-6 bg-grid min-h-full">
      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: '今日新增', value: totalToday, unit: '条', color: '#58A6FF' },
          { label: '监控领域', value: 9, unit: '个', color: '#3FB950' },
          { label: '活跃信源', value: 6, unit: '个', color: '#D29922' },
          { label: '权威资讯占比', value: '41', unit: '%', color: '#A371F7' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl px-5 py-4"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
            <div className="flex items-baseline gap-1">
              <span className="text-[28px] font-bold font-mono leading-none" style={{ color: stat.color }}>
                {stat.value}
              </span>
              <span className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>{stat.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main 2-column layout */}
      <div className="grid grid-cols-[1fr_340px] gap-6 items-start">
        {/* Left: Radar Grid */}
        <div>
          <RadarGrid />
        </div>

        {/* Right: Timeline Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 rounded-full bg-[#3FB950]" />
              <h2 className="text-[13px] font-semibold text-[#E6EDF3]">时间轴 Feed</h2>
            </div>
            <a href="/feed" className="text-[11px] text-[#58A6FF] hover:underline">查看全部 →</a>
          </div>
          <FeedList
            compact={true}
            maxItems={8}
            showFilters={false}
            autoRefresh={true}
          />
        </div>
      </div>
    </div>
  )
}
