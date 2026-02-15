import { StatsGrid } from "./component"

export default function StatsGridExample() {
  const stats = [
    {
      id: "users",
      label: "Total Users",
      value: "12,345",
      change: 12.5,
      changeLabel: "vs last month",
      trend: "up" as const,
      color: "success" as const,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      id: "revenue",
      label: "Revenue",
      value: "$54,321",
      change: 8.2,
      changeLabel: "vs last month",
      trend: "up" as const,
      color: "success" as const,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: "conversion",
      label: "Conversion Rate",
      value: "3.24%",
      change: -2.1,
      changeLabel: "vs last month",
      trend: "down" as const,
      color: "warning" as const,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      id: "churn",
      label: "Churn Rate",
      value: "1.2%",
      change: 0.5,
      changeLabel: "vs last month",
      trend: "down" as const,
      color: "danger" as const,
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-8 rounded-lg border border-border bg-background p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Standard Grid (3 columns)</h3>
        <StatsGrid stats={stats} />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Compact Grid (4 columns)</h3>
        <StatsGrid stats={stats} columns={4} />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Wide Grid (2 columns)</h3>
        <StatsGrid stats={stats.slice(0, 2)} columns={2} />
      </div>
    </div>
  )
}

