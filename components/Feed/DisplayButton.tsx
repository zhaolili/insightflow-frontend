'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function DisplayButton() {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href="/display/feed"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all duration-200"
      style={{
        color: hovered ? '#79BAFF' : '#58A6FF',
        transform: hovered ? 'translateY(-1px)' : 'translateY(0)',
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        style={{ transition: 'transform 0.2s', transform: hovered ? 'scale(1.15)' : 'scale(1)' }}
      >
        <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/>
      </svg>
      大屏展示
    </Link>
  )
}
