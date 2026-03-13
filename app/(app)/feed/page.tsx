import FeedList from '@/components/Feed/FeedList'

interface PageProps {
  searchParams: Promise<{ domain?: string }>
}

export default async function FeedPage({ searchParams }: PageProps) {
  const params = await searchParams
  const domainId = params.domain

  return (
    <div className="p-6 bg-grid min-h-full">
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#E6EDF3] mb-1">资讯 Feed 流</h1>
        <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
          实时汇聚 9 个技术领域的最新情报，自动插入，支持领域筛选与权威过滤
        </p>
      </div>
      <FeedList initialDomainId={domainId} showFilters={true} autoRefresh={true} />
    </div>
  )
}
