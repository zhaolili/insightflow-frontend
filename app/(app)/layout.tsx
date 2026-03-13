import SideNav from '@/components/AppShell/SideNav'
import TopBar from '@/components/AppShell/TopBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-grid" style={{ background: 'var(--bg-base)' }}>
      <SideNav />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}
