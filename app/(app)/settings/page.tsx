export default function SettingsPage() {
  return (
    <div className="p-6 bg-grid min-h-full">
      <div className="mb-6">
        <h1 className="text-[18px] font-bold text-[#E6EDF3] mb-1">系统设置</h1>
        <p className="text-[12px]" style={{ color: 'var(--text-secondary)' }}>
          展示偏好、数据范围与账号信息配置
        </p>
      </div>

      <div className="max-w-2xl space-y-4">
        {[
          { label: '默认时间范围', value: '最近 7 天', note: '影响趋势图与热度计算的默认窗口' },
          { label: '展示密度', value: '标准（默认）', note: '紧凑 / 标准 / 宽松' },
          { label: '新资讯高亮时长', value: '3 秒', note: '新资讯插入时黄边框渐隐持续时间' },
          { label: '实时更新默认开关', value: '开启', note: '首页与 Feed 流的自动插入功能' },
          { label: '账号', value: 'admin', note: '当前登录账号（Demo 固定）' },
          { label: '版本', value: 'v1.0 Demo', note: '企业技术情报系统' },
        ].map(item => (
          <div
            key={item.label}
            className="rounded-xl px-6 py-4 flex items-center justify-between"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div>
              <div className="text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>{item.label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{item.note}</div>
            </div>
            <div
              className="text-[12px] font-mono px-3 py-1.5 rounded-lg"
              style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: '#58A6FF' }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
