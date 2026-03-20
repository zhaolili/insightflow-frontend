'use client'

interface SparkLineProps {
  data: number[]
  direction: 'up' | 'down' | 'flat'
  width?: number
  height?: number
  color?: string
}

export default function SparkLine({ data, direction, width = 80, height = 28, color: customColor }: SparkLineProps) {
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const padding = 2

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = padding + ((max - v) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const color = customColor || (direction === 'up' ? '#3FB950' : direction === 'down' ? '#F85149' : '#8B949E')
  const polyline = points.join(' ')

  // Fill area under line
  const lastPoint = points[points.length - 1]
  const firstX = padding
  const lastX = lastPoint.split(',')[0]
  const fillPath = `M ${firstX},${height} L ${polyline.replaceAll(',', ' L ')} L ${lastX},${height} Z`

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`grad-${direction}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#grad-${direction})`}/>
      <polyline
        points={polyline}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {/* Last data point dot */}
      <circle
        cx={lastPoint.split(',')[0]}
        cy={lastPoint.split(',')[1]}
        r="2.5"
        fill={color}
      />
    </svg>
  )
}
