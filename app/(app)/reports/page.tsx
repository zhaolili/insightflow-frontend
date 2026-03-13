'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { MOCK_REPORTS, Report } from '@/mock/reports'
import ReportPreview from '@/components/Reports/ReportPreview'
import { Suspense } from 'react'

function ReportsContent() {
  const searchParams = useSearchParams()
  const isNewFromQA = searchParams.get('from') === 'qa' && searchParams.get('new') === '1'
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [generating, setGenerating] = useState(false)
  const [newReportId, setNewReportId] = useState<string | null>(null)

  useEffect(() => {
    if (isNewFromQA) {
      setGenerating(true)
      setTimeout(() => {
        const newReport: Report = {
          id: `r-${Date.now()}`,
          title: 'L3自动驾驶量产技术综述（基于情报问答生成）',
          abstract: '本报告由情报问答系统自动生成，基于本次对话引用的多条技术情报，综合分析L3级自动驾驶量产的技术现状、关键挑战与趋势研判。',
          generatedAt: new Date().toISOString(),
          status: 'ready',
          sourceCount: 4,
          domains: ['adas'],
          wordCount: 1820,
          sections: [
            {
              title: '1. 概述',
              content: '本报告由系统自动基于情报问答对话中引用的4条权威情报生成，围绕L3级自动驾驶量产关键问题进行综述。',
            },
            {
              title: '2. 技术现状综述',
              content: 'L3级自动驾驶国标正式落地，明确了5000小时实车测试要求，适用场景限定于高速公路及城市快速路。百度Apollo城市NOA接管频率同比下降62%，每1000公里接管次数降至0.8次，代表国内最高水平。',
            },
            {
              title: '3. 关键突破时间线',
              content: '• 2026Q1：L3国标正式发布\n• 2026Q4：预计首款L3量产车型上市\n• 2027-2028：城市快速路L3场景逐步开放',
            },
            {
              title: '4. 趋势研判',
              content: 'V2X基础设施完善将是L3推广的核心变量，交通部计划2026年底完成1000个高速服务区C-V2X覆盖，为L3量产提供网联支撑。',
            },
            {
              title: '5. 建议关注方向',
              content: '① 关注L3标准细则中EDR数据格式规范\n② 跟踪C-V2X RSU设备供应商竞争格局\n③ 重点关注ODD边界识别算法的安全性验证',
            },
          ],
        }
        setReports(prev => [newReport, ...prev])
        setNewReportId(newReport.id)
        setGenerating(false)
        setSelectedReport(newReport)
      }, 2200)
    }
  }, [isNewFromQA])

  const formatDate = (d: string) =>
    new Date(d).toLocaleString('zh-CN', { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  if (selectedReport) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-6 py-3 border-b flex items-center gap-3 shrink-0" style={{ borderColor: 'var(--border)' }}>
          <button
            onClick={() => setSelectedReport(null)}
            className="flex items-center gap-1.5 text-[12px] transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            返回报告列表
          </button>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <span className="text-[12px] text-[#E6EDF3] truncate max-w-[400px]">{selectedReport.title}</span>
        </div>
        <div className="flex-1 min-h-0">
          <ReportPreview report={selectedReport} onClose={() => setSelectedReport(null)} />
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-grid min-h-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-[18px] font-bold text-[#E6EDF3] mb-1">报告中心</h1>
          <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
            基于情报问答生成的分析报告，支持查看与导出
          </p>
        </div>
        <a
          href="/qa"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all"
          style={{
            background: 'rgba(88,166,255,0.1)',
            border: '1px solid rgba(88,166,255,0.25)',
            color: '#58A6FF',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
          前往情报问答生成报告
        </a>
      </div>

      {/* Generating indicator */}
      {generating && (
        <div
          className="mb-4 rounded-xl px-5 py-4 flex items-center gap-4"
          style={{ background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.2)' }}
        >
          <svg className="animate-spin w-5 h-5 shrink-0 text-[#58A6FF]" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
            <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          </svg>
          <div>
            <div className="text-[13px] font-semibold text-[#58A6FF]">报告生成中...</div>
            <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-secondary)' }}>
              正在基于情报问答对话整理结构化报告，预计 30 秒内完成
            </div>
          </div>
        </div>
      )}

      {/* Report list */}
      <div className="space-y-3">
        {reports.map((report) => (
          <div
            key={report.id}
            className="rounded-xl px-6 py-5 cursor-pointer transition-all"
            style={{
              background: report.id === newReportId ? 'rgba(63,185,80,0.05)' : 'var(--bg-card)',
              border: `1px solid ${report.id === newReportId ? 'rgba(63,185,80,0.3)' : 'var(--border)'}`,
            }}
            onClick={() => setSelectedReport(report)}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(88,166,255,0.25)'
              e.currentTarget.style.background = 'var(--bg-card-hover)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = report.id === newReportId ? 'rgba(63,185,80,0.3)' : 'var(--border)'
              e.currentTarget.style.background = report.id === newReportId ? 'rgba(63,185,80,0.05)' : 'var(--bg-card)'
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded font-semibold"
                    style={{ background: 'rgba(63,185,80,0.15)', color: '#3FB950' }}
                  >
                    {report.status === 'ready' ? '已完成' : '生成中'}
                  </span>
                  {report.id === newReportId && (
                    <span
                      className="text-[10px] px-2 py-0.5 rounded font-bold"
                      style={{ background: 'rgba(63,185,80,0.2)', color: '#3FB950' }}
                    >
                      NEW
                    </span>
                  )}
                  <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                    {formatDate(report.generatedAt)}
                  </span>
                </div>
                <h3 className="text-[14px] font-semibold text-[#E6EDF3] mb-1.5">{report.title}</h3>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {report.abstract}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>
                  引用 <span className="text-[#58A6FF] font-mono font-bold">{report.sourceCount}</span> 篇
                </div>
                <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  约 <span className="text-[#58A6FF] font-mono font-bold">{report.wordCount}</span> 字
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              {report.domains.map(d => (
                <span
                  key={d}
                  className="text-[10px] px-2 py-0.5 rounded"
                  style={{ background: 'var(--bg-base)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
                >
                  {d}
                </span>
              ))}
              <span className="ml-auto text-[11px]" style={{ color: '#58A6FF' }}>
                点击查看报告 →
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function ReportsPage() {
  return (
    <div className="h-full">
      <Suspense fallback={<div className="p-8 text-center text-[#8B949E] text-sm">加载中...</div>}>
        <ReportsContent />
      </Suspense>
    </div>
  )
}
