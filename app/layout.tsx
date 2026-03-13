import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InsightFlow · 企业技术情报系统',
  description: '中汽研企业技术情报系统 - 垂直技术情报监测与智能分析平台',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
