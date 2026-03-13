// 大屏展示布局 - 无侧边栏、无顶部栏
export default function DisplayLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      {children}
    </div>
  )
}
