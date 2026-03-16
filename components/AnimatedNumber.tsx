'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedNumber({ value, className, style }: AnimatedNumberProps) {
  const [display, setDisplay] = useState(value)
  const prevRef = useRef(value)
  const elRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const prev = prevRef.current
    if (prev === value) return
    prevRef.current = value

    const diff = value - prev
    const steps = Math.min(Math.abs(diff), 12)
    const duration = 600
    const stepTime = duration / steps

    let current = prev
    let step = 0
    const interval = setInterval(() => {
      step++
      current = Math.round(prev + (diff * step) / steps)
      setDisplay(current)
      if (step >= steps) {
        clearInterval(interval)
        setDisplay(value)
      }
    }, stepTime)

    if (elRef.current) {
      elRef.current.style.animation = 'none'
      void elRef.current.offsetHeight
      elRef.current.style.animation = 'stat-bump 0.5s ease-out'
    }

    return () => clearInterval(interval)
  }, [value])

  return (
    <span ref={elRef} className={className} style={style}>
      {display}
    </span>
  )
}
