'use client'

import { Report } from '@/mock/reports'
import { useState, useRef } from 'react'

interface ReportPreviewProps {
  report: Report
  onClose?: () => void
}

export default function ReportPreview({ report, onClose }: ReportPreviewProps) {
  const [activeSection, setActiveSection] = useState(0)
  const [exportClicked, setExportClicked] = useState<'pdf' | 'word' | null>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleExport = (type: 'pdf' | 'word') => {
    setExportClicked(type)
    setTimeout(() => setExportClicked(null), 2000)
  }

  const handleSectionClick = (index: number) => {
    setActiveSection(index)
    const element = document.getElementById(`section-${index}`)
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="flex h-full">
      {/* Left: TOC */}
      <div
        className="w-[200px] shrink-0 border-r px-3 py-5 overflow-y-auto"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
          报告目录
        </div>
        {report.sections.map((sec, i) => (
          <button
            key={i}
            onClick={() => handleSectionClick(i)}
            className="w-full text-left px-3 py-2 rounded-lg text-[11px] mb-0.5 transition-all"
            style={{
              background: activeSection === i ? 'rgba(88,166,255,0.1)' : 'transparent',
              color: activeSection === i ? '#58A6FF' : 'var(--text-secondary)',
              borderRight: activeSection === i ? '2px solid #58A6FF' : '2px solid transparent',
            }}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Right: Content */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Report header */}
        <div
          className="px-8 py-5 border-b"
          style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[10px] px-2 py-0.5 rounded font-semibold"
                  style={{ background: 'rgba(63,185,80,0.15)', color: '#3FB950' }}
                >
                  已生成
                </span>
                <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                  {new Date(report.generatedAt).toLocaleString('zh-CN')}
                </span>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  · 引用{report.sourceCount}篇情报 · 约{report.wordCount}字
                </span>
              </div>
              <h2 className="text-[16px] font-bold text-[#E6EDF3] leading-snug">{report.title}</h2>
              <p className="text-[12px] mt-2 leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>
                {report.abstract}
              </p>
            </div>

            {/* Export buttons */}
            <div className="flex flex-col gap-2 shrink-0">
              <button
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  background: exportClicked === 'pdf' ? 'rgba(248,81,73,0.15)' : 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: exportClicked === 'pdf' ? '#F85149' : 'var(--text-secondary)',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                </svg>
                {exportClicked === 'pdf' ? '功能 Demo 中' : '导出 PDF'}
              </button>
              <button
                onClick={() => handleExport('word')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all"
                style={{
                  background: exportClicked === 'word' ? 'rgba(88,166,255,0.15)' : 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  color: exportClicked === 'word' ? '#58A6FF' : 'var(--text-secondary)',
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                  <polyline points="14,2 14,8 20,8"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                  <line x1="9" y1="17" x2="13" y2="17"/>
                </svg>
                {exportClicked === 'word' ? '功能 Demo 中' : '导出 Word'}
              </button>
            </div>
          </div>
        </div>

        {/* Section content */}
        <div ref={contentRef} className="flex-1 overflow-y-auto px-8 py-6">
          {report.sections.map((sec, i) => (
            <div
              key={i}
              id={`section-${i}`}
              className="mb-8"
              style={{ display: activeSection === i || activeSection === -1 ? 'block' : 'block' }}
            >
              <h3
                className="text-[14px] font-bold mb-3 flex items-center gap-2"
                style={{ color: '#58A6FF' }}
              >
                <div className="w-0.5 h-5 rounded-full" style={{ background: '#58A6FF' }} />
                {sec.title}
              </h3>
              <div
                className="text-[13px] leading-[1.8] whitespace-pre-line rounded-lg p-4"
                style={{
                  color: 'var(--text-secondary)',
                  background: i === activeSection ? 'rgba(88,166,255,0.03)' : 'transparent',
                  border: i === activeSection ? '1px solid rgba(88,166,255,0.1)' : '1px solid transparent',
                }}
              >
                {sec.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
