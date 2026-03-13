'use client'

interface SourcePieProps {
  designated: number
  web: number
  size?: number
}

export default function SourcePie({ designated, web, size = 28 }: SourcePieProps) {
  const total = designated + web
  const ratio = designated / total
  const angle = ratio * 360
  const r = (size / 2) - 2
  const cx = size / 2
  const cy = size / 2

  const toRad = (deg: number) => (deg - 90) * (Math.PI / 180)
  const x1 = cx + r * Math.cos(toRad(0))
  const y1 = cy + r * Math.sin(toRad(0))
  const x2 = cx + r * Math.cos(toRad(angle))
  const y2 = cy + r * Math.sin(toRad(angle))
  const largeArc = angle > 180 ? 1 : 0

  const arcPath = angle >= 360
    ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
    : `M ${cx} ${cy - r} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${cx} ${cy} Z`

  return (
    <div className="flex items-center gap-1.5">
      <svg width={size} height={size}>
        <circle cx={cx} cy={cy} r={r} fill="#30363D"/>
        <path d={arcPath} fill="#58A6FF" opacity="0.8"/>
      </svg>
      <div className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-1">
          <span style={{ color: '#58A6FF' }}>■</span>
          <span>{designated}%</span>
        </div>
        <div className="flex items-center gap-1">
          <span style={{ color: '#30363D' }}>■</span>
          <span>{web}%</span>
        </div>
      </div>
    </div>
  )
}
