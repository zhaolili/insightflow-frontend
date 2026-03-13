'use client'

import { QAMessage } from '@/mock/qa'
import EvidenceStrip from './EvidenceStrip'

interface ChatThreadProps {
  messages: QAMessage[]
  isLoading?: boolean
}

function MarkdownText({ content }: { content: string }) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []

  lines.forEach((line, idx) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <div key={idx} className="font-semibold text-[#E6EDF3] mt-3 mb-1 first:mt-0">
          {line.slice(2, -2)}
        </div>
      )
    } else if (line.startsWith('• ') || line.startsWith('① ') || line.startsWith('② ') || line.startsWith('③ ') || line.startsWith('④ ')) {
      elements.push(
        <div key={idx} className="flex items-start gap-2 ml-2 mb-0.5">
          <span style={{ color: '#58A6FF' }}>›</span>
          <span>{line.replace(/^[•①②③④]\s/, '')}</span>
        </div>
      )
    } else if (line.startsWith('| ')) {
      // Table row
      const cols = line.split('|').filter(c => c.trim() && c.trim() !== '---')
      if (cols.length > 1) {
        elements.push(
          <div key={idx} className="flex gap-0 text-[11px] border-b" style={{ borderColor: 'var(--border)' }}>
            {cols.map((col, ci) => (
              <div
                key={ci}
                className="flex-1 px-3 py-1.5"
                style={{
                  color: idx === 0 ? '#58A6FF' : 'var(--text-secondary)',
                  background: idx === 0 ? 'rgba(88,166,255,0.06)' : 'transparent',
                }}
              >
                {col.trim()}
              </div>
            ))}
          </div>
        )
      }
    } else if (line.trim()) {
      elements.push(
        <p key={idx} className="leading-relaxed mb-1 last:mb-0">
          {line}
        </p>
      )
    }
  })

  return <>{elements}</>
}

export default function ChatThread({ messages, isLoading }: ChatThreadProps) {
  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {msg.role === 'assistant' && (
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mr-3 mt-0.5"
              style={{ background: 'linear-gradient(135deg, #1f6feb, #58A6FF)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="white"/>
                <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
              </svg>
            </div>
          )}

          <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : ''}`}>
            {msg.role === 'user' ? (
              <div
                className="rounded-xl rounded-tr-sm px-4 py-3 text-[13px]"
                style={{
                  background: 'rgba(88,166,255,0.15)',
                  border: '1px solid rgba(88,166,255,0.25)',
                  color: '#E6EDF3',
                }}
              >
                {msg.content}
              </div>
            ) : (
              <div
                className="rounded-xl rounded-tl-sm px-4 py-4 text-[12px]"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.7',
                }}
              >
                <MarkdownText content={msg.content} />

                {msg.evidence && msg.evidence.length > 0 && (
                  <EvidenceStrip items={msg.evidence} />
                )}

                {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                  <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                    <div className="text-[10px] text-[#484F58] mb-2 uppercase tracking-wide font-semibold">建议追问</div>
                    <div className="flex flex-col gap-1.5">
                      {msg.suggestedQuestions.map((sq, i) => (
                        <a
                          key={i}
                          href={`/qa?q=${encodeURIComponent(sq)}`}
                          className="text-[11px] px-3 py-1.5 rounded-lg transition-all flex items-center gap-2"
                          style={{
                            background: 'rgba(88,166,255,0.06)',
                            border: '1px solid rgba(88,166,255,0.15)',
                            color: '#58A6FF',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(88,166,255,0.12)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(88,166,255,0.06)')}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9 18 15 12 9 6"/>
                          </svg>
                          {sq}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="text-[10px] font-mono mt-1 px-1" style={{ color: 'var(--text-muted)' }}>
              {new Date(msg.timestamp).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          {msg.role === 'user' && (
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ml-3 mt-0.5 text-[11px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #30363D, #484F58)' }}
            >
              A
            </div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mr-3 mt-0.5"
            style={{ background: 'linear-gradient(135deg, #1f6feb, #58A6FF)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" fill="white"/>
              <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
            </svg>
          </div>
          <div
            className="rounded-xl rounded-tl-sm px-5 py-4"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div className="flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-[#58A6FF]"
                  style={{
                    animation: `dot-bounce 1.4s ease-in-out ${i * 0.16}s infinite`,
                  }}
                />
              ))}
              <span className="text-[11px] ml-2" style={{ color: 'var(--text-muted)' }}>
                正在检索情报库...
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
