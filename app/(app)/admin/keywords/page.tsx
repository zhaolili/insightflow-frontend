'use client'

import { useState } from 'react'
import { KEYWORD_CONFIGS, KeywordConfig } from '@/mock/keywords'

export default function KeywordsPage() {
  const [keywords, setKeywords] = useState<KeywordConfig[]>(KEYWORD_CONFIGS)
  const [selectedKw, setSelectedKw] = useState<KeywordConfig>(KEYWORD_CONFIGS[0])
  const [editMode, setEditMode] = useState(false)
  const [newSynonym, setNewSynonym] = useState('')
  const [newExclude, setNewExclude] = useState('')

  const updateKw = (updater: (kw: KeywordConfig) => KeywordConfig) => {
    setKeywords(prev => prev.map(k => k.id === selectedKw.id ? updater(k) : k))
    setSelectedKw(prev => updater(prev))
  }

  const addSynonym = () => {
    if (!newSynonym.trim()) return
    updateKw(k => ({ ...k, synonyms: [...k.synonyms, newSynonym.trim()] }))
    setNewSynonym('')
  }

  const removeSynonym = (s: string) => updateKw(k => ({ ...k, synonyms: k.synonyms.filter(x => x !== s) }))

  const addExclude = () => {
    if (!newExclude.trim()) return
    updateKw(k => ({ ...k, excludes: [...k.excludes, newExclude.trim()] }))
    setNewExclude('')
  }

  const removeExclude = (s: string) => updateKw(k => ({ ...k, excludes: k.excludes.filter(x => x !== s) }))

  return (
    <div className="p-6 bg-grid min-h-full">
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#E6EDF3] mb-1">关键词管理</h1>
        <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
          为 9 个主关键词配置同义词库、排除词和权重，影响情报排序与热度计算
        </p>
      </div>

      <div className="grid grid-cols-[240px_1fr] gap-6">
        {/* Left: keyword list */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          <div className="px-4 py-3 border-b" style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}>
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
              9个监控领域
            </span>
          </div>
          {keywords.map(kw => (
            <button
              key={kw.id}
              onClick={() => { setSelectedKw(kw); setEditMode(false) }}
              className="w-full px-4 py-3 text-left border-b flex items-center justify-between transition-all"
              style={{
                borderColor: 'var(--border)',
                background: selectedKw.id === kw.id ? 'rgba(88,166,255,0.08)' : 'var(--bg-base)',
                borderRight: selectedKw.id === kw.id ? '2px solid #58A6FF' : '2px solid transparent',
              }}
            >
              <div>
                <div className="text-[12px] font-semibold" style={{ color: selectedKw.id === kw.id ? '#58A6FF' : 'var(--text-primary)' }}>
                  {kw.domainName}
                </div>
                <div className="text-[10px] mt-0.5 font-mono" style={{ color: 'var(--text-muted)' }}>
                  {kw.matchCount7d}条/7天
                </div>
              </div>
              <div
                className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded"
                style={{ background: 'rgba(88,166,255,0.12)', color: '#58A6FF' }}
              >
                {kw.weight}
              </div>
            </button>
          ))}
        </div>

        {/* Right: keyword detail */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
          {/* Header */}
          <div
            className="px-6 py-4 border-b flex items-center justify-between"
            style={{ background: 'var(--bg-card)', borderColor: 'var(--border)' }}
          >
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[14px] font-bold" style={{ color: 'var(--text-primary)' }}>
                  {selectedKw.domainName}
                </h2>
                <span
                  className="text-[11px] px-2 py-0.5 rounded font-mono font-bold"
                  style={{ background: 'rgba(88,166,255,0.12)', color: '#58A6FF' }}
                >
                  权重 {selectedKw.weight}/10
                </span>
              </div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                主关键词：{selectedKw.primary}
              </div>
            </div>
            <button
              onClick={() => setEditMode(!editMode)}
              className="px-4 py-2 rounded-lg text-[12px] font-semibold transition-all"
              style={{
                background: editMode ? 'rgba(63,185,80,0.12)' : 'var(--bg-elevated)',
                border: `1px solid ${editMode ? 'rgba(63,185,80,0.3)' : 'var(--border-subtle)'}`,
                color: editMode ? '#3FB950' : 'var(--text-secondary)',
              }}
            >
              {editMode ? '✓ 完成编辑' : '编辑'}
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Weight slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-[12px] font-semibold" style={{ color: 'var(--text-primary)' }}>权重设置</div>
                <div className="text-[13px] font-bold font-mono" style={{ color: '#58A6FF' }}>
                  {selectedKw.weight} / 10
                </div>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={selectedKw.weight}
                disabled={!editMode}
                onChange={e => updateKw(k => ({ ...k, weight: Number(e.target.value) }))}
                className="w-full"
                style={{ accentColor: '#58A6FF', opacity: editMode ? 1 : 0.5 }}
              />
              <div className="flex justify-between text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>
                <span>低优先级</span>
                <span>高优先级</span>
              </div>
            </div>

            {/* Synonyms */}
            <div>
              <div className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                同义词库 <span className="font-normal text-[11px]" style={{ color: 'var(--text-muted)' }}>({selectedKw.synonyms.length}个)</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedKw.synonyms.map(s => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px]"
                    style={{ background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.2)', color: '#58A6FF' }}
                  >
                    {s}
                    {editMode && (
                      <button onClick={() => removeSynonym(s)} className="opacity-60 hover:opacity-100 transition-opacity">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editMode && (
                <div className="flex items-center gap-2">
                  <input
                    value={newSynonym}
                    onChange={e => setNewSynonym(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSynonym()}
                    placeholder="添加同义词..."
                    className="flex-1 px-3 py-2 rounded-lg text-[12px] outline-none"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                  <button onClick={addSynonym} className="px-3 py-2 rounded-lg text-[12px] font-semibold"
                    style={{ background: 'rgba(88,166,255,0.15)', color: '#58A6FF' }}>
                    + 添加
                  </button>
                </div>
              )}
            </div>

            {/* Excludes */}
            <div>
              <div className="text-[12px] font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                排除词 <span className="font-normal text-[11px]" style={{ color: 'var(--text-muted)' }}>({selectedKw.excludes.length}个 · 过滤无关内容)</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedKw.excludes.map(s => (
                  <span
                    key={s}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px]"
                    style={{ background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)', color: '#F85149' }}
                  >
                    {s}
                    {editMode && (
                      <button onClick={() => removeExclude(s)} className="opacity-60 hover:opacity-100 transition-opacity">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    )}
                  </span>
                ))}
              </div>
              {editMode && (
                <div className="flex items-center gap-2">
                  <input
                    value={newExclude}
                    onChange={e => setNewExclude(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addExclude()}
                    placeholder="添加排除词..."
                    className="flex-1 px-3 py-2 rounded-lg text-[12px] outline-none"
                    style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
                  />
                  <button onClick={addExclude} className="px-3 py-2 rounded-lg text-[12px] font-semibold"
                    style={{ background: 'rgba(248,81,73,0.1)', color: '#F85149' }}>
                    + 添加
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div
              className="rounded-xl px-5 py-4 flex items-center gap-6"
              style={{ background: 'var(--bg-base)', border: '1px solid var(--border)' }}
            >
              <div>
                <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>7天匹配</div>
                <div className="text-[20px] font-bold font-mono" style={{ color: '#58A6FF' }}>
                  {selectedKw.matchCount7d}
                </div>
              </div>
              <div className="w-px h-10" style={{ background: 'var(--border)' }} />
              <div>
                <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>同义词数</div>
                <div className="text-[20px] font-bold font-mono" style={{ color: '#3FB950' }}>
                  {selectedKw.synonyms.length}
                </div>
              </div>
              <div className="w-px h-10" style={{ background: 'var(--border)' }} />
              <div>
                <div className="text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>排除词数</div>
                <div className="text-[20px] font-bold font-mono" style={{ color: '#F85149' }}>
                  {selectedKw.excludes.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
