'use client'

import { useState, useRef } from 'react'

interface ChatComposerProps {
  onSubmit: (question: string) => void
  isLoading: boolean
  placeholder?: string
}

export default function ChatComposer({ onSubmit, isLoading, placeholder }: ChatComposerProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!value.trim() || isLoading) return
    onSubmit(value.trim())
    setValue('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3 p-3 rounded-xl"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 0 20px rgba(88,166,255,0.05)',
      }}
    >
      {/* Voice placeholder icon (future) */}
      <button
        type="button"
        disabled
        className="p-2 rounded-lg mb-0.5 opacity-30 cursor-not-allowed"
        title="语音提问（敬请期待）"
        style={{ background: 'var(--bg-base)' }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B949E" strokeWidth="1.5">
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/>
          <path d="M19 10v2a7 7 0 01-14 0v-2"/>
          <line x1="12" y1="19" x2="12" y2="23"/>
          <line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      </button>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => { setValue(e.target.value); handleInput() }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || '输入问题，如：最近NVH技术有哪些新突破？（Shift+Enter换行）'}
        rows={1}
        className="flex-1 bg-transparent text-[13px] text-[#E6EDF3] placeholder-[#484F58] outline-none resize-none leading-relaxed"
        style={{ minHeight: '24px', maxHeight: '120px' }}
      />

      <button
        type="submit"
        disabled={!value.trim() || isLoading}
        className="p-2 rounded-lg mb-0.5 transition-all disabled:opacity-40"
        style={{
          background: value.trim() && !isLoading ? 'linear-gradient(135deg, #1f6feb, #58A6FF)' : 'var(--bg-elevated)',
          color: 'white',
        }}
        title="发送 (Enter)"
      >
        {isLoading ? (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
            <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        )}
      </button>
    </form>
  )
}
