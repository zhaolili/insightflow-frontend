'use client'

import { useActionState } from 'react'
import { loginAction } from './actions'

const initialState = { error: '' }

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error: string }, formData: FormData) => {
      const result = await loginAction(formData)
      return result || { error: '' }
    },
    initialState
  )

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/login-bg.png)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1117]/85 via-[#0D1117]/70 to-[#0a1628]/80" />
      {/* Cover bottom-right icon on background image */}
      <div
        className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, #0a1628 50%, #0a1628 100%)',
        }}
      />
      {/* Scan line animation */}
      <div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#58A6FF]/30 to-transparent pointer-events-none"
        style={{ animation: 'scan-line 6s linear infinite', top: 0 }}
      />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-[400px] mx-4">
        {/* Logo & title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#58A6FF] to-[#1f6feb] flex items-center justify-center shadow-lg">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="white"/>
                <circle cx="12" cy="12" r="7" stroke="white" strokeWidth="1.5" fill="none" strokeDasharray="3 2"/>
                <circle cx="12" cy="12" r="11" stroke="white" strokeWidth="1" fill="none" strokeOpacity="0.4" strokeDasharray="2 3"/>
                <line x1="12" y1="1" x2="12" y2="4" stroke="white" strokeWidth="1.5"/>
                <line x1="12" y1="20" x2="12" y2="23" stroke="white" strokeWidth="1.5"/>
                <line x1="1" y1="12" x2="4" y2="12" stroke="white" strokeWidth="1.5"/>
                <line x1="20" y1="12" x2="23" y2="12" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="text-left">
              <div className="text-white font-bold text-lg leading-tight tracking-wide">InsightFlow</div>
              <div className="text-[#58A6FF] text-[10px] tracking-[0.2em] uppercase font-medium">企业技术情报系统</div>
            </div>
          </div>
          <p className="text-[#8B949E] text-sm">中汽研 · 智能情报工作台</p>
        </div>

        {/* Form card */}
        <div
          className="rounded-xl p-8 border"
          style={{
            background: 'rgba(22, 27, 34, 0.85)',
            backdropFilter: 'blur(20px)',
            borderColor: 'rgba(88, 166, 255, 0.2)',
            boxShadow: '0 0 40px rgba(88,166,255,0.08), 0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <h2 className="text-[#E6EDF3] text-base font-semibold mb-6">账号登录</h2>

          <form action={formAction} className="space-y-4">
            <div>
              <label className="block text-[#8B949E] text-xs mb-2 tracking-wide">用户名</label>
              <input
                name="username"
                type="text"
                autoComplete="username"
                placeholder="请输入用户名"
                className="w-full px-4 py-3 rounded-lg text-sm text-[#E6EDF3] placeholder-[#484F58] outline-none transition-all"
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid #30363D',
                }}
                onFocus={e => e.target.style.borderColor = '#58A6FF'}
                onBlur={e => e.target.style.borderColor = '#30363D'}
              />
            </div>
            <div>
              <label className="block text-[#8B949E] text-xs mb-2 tracking-wide">密码</label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="请输入密码"
                className="w-full px-4 py-3 rounded-lg text-sm text-[#E6EDF3] placeholder-[#484F58] outline-none transition-all"
                style={{
                  background: 'rgba(13,17,23,0.8)',
                  border: '1px solid #30363D',
                }}
                onFocus={e => e.target.style.borderColor = '#58A6FF'}
                onBlur={e => e.target.style.borderColor = '#30363D'}
              />
            </div>

            {state?.error && (
              <div className="flex items-center gap-2 text-[#F85149] text-xs bg-[#F85149]/10 rounded-lg px-3 py-2 border border-[#F85149]/20">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 3.25a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 7a.875.875 0 110-1.75.875.875 0 010 1.75z"/>
                </svg>
                {state.error}
              </div>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all mt-2 disabled:opacity-60"
              style={{
                background: isPending
                  ? 'rgba(88,166,255,0.5)'
                  : 'linear-gradient(135deg, #1f6feb 0%, #58A6FF 100%)',
                boxShadow: '0 0 20px rgba(88,166,255,0.2)',
              }}
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3"/>
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                  登录中...
                </span>
              ) : '登 录'}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-[#21262D] flex items-center justify-between text-[10px] text-[#484F58]">
            <span>Demo 账号：admin</span>
            <span>Demo 密码：InsightFlow2026</span>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[#484F58] text-[11px] mt-6">
          © 2026 中国汽车技术研究中心 · 企业技术情报系统 v1.0
        </p>
      </div>
    </div>
  )
}
