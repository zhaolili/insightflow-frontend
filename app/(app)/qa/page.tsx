'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import ChatThread from '@/components/QA/ChatThread'
import ChatComposer from '@/components/QA/ChatComposer'
import { QAMessage, QA_SUGGESTIONS, generateMockAnswer } from '@/mock/qa'
import { Suspense } from 'react'

function QAPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [messages, setMessages] = useState<QAMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState(() => `qa-${Date.now()}`)
  const bottomRef = useRef<HTMLDivElement>(null)

  const handleQuestion = async (question: string) => {
    const userMsg: QAMessage = {
      id: `${sessionId}-${Date.now()}-u`,
      role: 'user',
      content: question,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, userMsg])
    setIsLoading(true)

    // Simulate AI response delay
    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800))

    const { content, evidence, suggestions } = generateMockAnswer(question)
    const assistantMsg: QAMessage = {
      id: `${sessionId}-${Date.now()}-a`,
      role: 'assistant',
      content,
      evidence,
      suggestedQuestions: suggestions,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, assistantMsg])
    setIsLoading(false)
  }

  const handleGenerateReport = () => {
    router.push('/reports?from=qa&new=1')
  }

  // Auto-submit from URL query
  useEffect(() => {
    const q = searchParams.get('q')
    if (q && messages.length === 0) {
      handleQuestion(q)
    }
  }, [])

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex h-full">
      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-h-0">
        {messages.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
              style={{ background: 'linear-gradient(135deg, #1f6feb 0%, #58A6FF 100%)', boxShadow: '0 0 40px rgba(88,166,255,0.3)' }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="white"/>
                <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.4"/>
              </svg>
            </div>
            <h2 className="text-[20px] font-bold text-[#E6EDF3] mb-2">情报问答</h2>
            <p className="text-[13px] text-center max-w-md mb-8" style={{ color: 'var(--text-secondary)' }}>
              基于已采集的 9 大技术领域情报库，以自然语言提问获取精准分析
            </p>

            {/* Suggestions */}
            <div className="w-full max-w-2xl">
              <div className="text-[11px] text-center mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                你可以这样问
              </div>
              <div className="grid grid-cols-2 gap-2">
                {QA_SUGGESTIONS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuestion(s)}
                    className="text-left px-4 py-3 rounded-xl text-[12px] transition-all"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(88,166,255,0.3)'
                      e.currentTarget.style.color = 'var(--text-primary)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.color = 'var(--text-secondary)'
                    }}
                  >
                    <span className="text-[#58A6FF] mr-2">›</span>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Message thread */
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <ChatThread messages={messages} isLoading={isLoading} />
            <div ref={bottomRef} />

            {/* Generate report button */}
            {messages.length >= 2 && !isLoading && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleGenerateReport}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all"
                  style={{
                    background: 'rgba(63,185,80,0.12)',
                    border: '1px solid rgba(63,185,80,0.3)',
                    color: '#3FB950',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(63,185,80,0.2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(63,185,80,0.12)')}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                    <polyline points="14,2 14,8 20,8"/>
                    <line x1="9" y1="13" x2="15" y2="13"/>
                    <line x1="9" y1="17" x2="13" y2="17"/>
                  </svg>
                  基于此次对话生成报告
                </button>
              </div>
            )}
          </div>
        )}

        {/* Composer */}
        <div className="px-6 pb-6 pt-2 shrink-0">
          <ChatComposer onSubmit={handleQuestion} isLoading={isLoading} />
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              基于 9 大领域情报库 · {new Date().toLocaleDateString('zh-CN')} 数据
            </span>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
              Shift+Enter 换行 · Enter 发送
            </span>
          </div>
        </div>
      </div>

      {/* Right sidebar: session info */}
      <div
        className="w-[220px] shrink-0 border-l px-4 py-5 overflow-y-auto hidden lg:block"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
          当前会话
        </div>
        <div className="text-[11px] mb-4" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {new Date().toLocaleString('zh-CN', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="1.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
            </svg>
            {messages.filter(m => m.role === 'user').length} 条问题
          </div>
        </div>

        {messages.length > 0 && (
          <button
            onClick={() => setMessages([])}
            className="w-full px-3 py-2 rounded-lg text-[11px] transition-all mb-4"
            style={{
              background: 'var(--bg-base)',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--danger)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            清除对话
          </button>
        )}

        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2 mt-4" style={{ color: 'var(--text-muted)' }}>
          推荐问题
        </div>
        <div className="space-y-1.5">
          {QA_SUGGESTIONS.slice(0, 4).map((s, i) => (
            <button
              key={i}
              onClick={() => handleQuestion(s)}
              className="w-full text-left px-2.5 py-2 rounded-lg text-[11px] transition-all"
              style={{
                background: 'var(--bg-base)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <span className="text-[#484F58] mr-1">›</span>{s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function QAPage() {
  return (
    <div className="h-full flex flex-col" style={{ background: 'var(--bg-base)' }}>
      {/* Header */}
      <div
        className="px-6 py-4 border-b flex items-center justify-between shrink-0"
        style={{ borderColor: 'var(--border)', background: 'var(--bg-card)' }}
      >
        <div>
          <h1 className="text-[15px] font-bold text-[#E6EDF3]">情报问答</h1>
          <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
            向已采集的情报库提问，获取 AI 分析与引用来源
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950]" style={{ animation: 'pulse-glow 2s infinite' }}/>
          <span className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>
            情报库已更新至今日 08:00
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <Suspense fallback={<div className="p-8 text-center text-[#8B949E] text-sm">加载中...</div>}>
          <QAPageContent />
        </Suspense>
      </div>
    </div>
  )
}
