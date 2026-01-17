"use client"

import { MetricCard } from "@agent-patterns/metric-card/component"
import { Chart } from "@agent-patterns/chart/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import type { Column } from "@agent-patterns/data-table/component"

export default function SalesDashboardPage() {
  const salesColumns: Column<{ product: string; revenue: string; units: number; growth: string }>[] = [
    { key: "product", header: "Product" },
    { key: "revenue", header: "Revenue" },
    { key: "units", header: "Units Sold" },
    { key: "growth", header: "Growth" },
  ]

  const salesData = [
    { product: "Product A", revenue: "$45,231", units: 1234, growth: "+20.1%" },
    { product: "Product B", revenue: "$32,456", units: 987, growth: "+15.3%" },
    { product: "Product C", revenue: "$28,901", units: 756, growth: "+8.7%" },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Sales Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Real-time sales metrics and insights</p>
      </div>

      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Total Revenue"
            value="$106,588"
            trend={{ value: 20.1, label: "vs last month", direction: "up" }}
          />
          <MetricCard
            label="Units Sold"
            value="2,977"
            trend={{ value: 12.5, label: "vs last month", direction: "up" }}
          />
          <MetricCard
            label="Avg Order Value"
            value="$35.82"
            trend={{ value: 5.4, label: "vs last month", direction: "up" }}
          />
          <MetricCard
            label="Conversion Rate"
            value="3.2%"
            trend={{ value: 2.1, label: "vs last month", direction: "up" }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Chart
            title="Revenue by Month"
            type="bar"
            data={[
              { label: "Jan", value: 45000 },
              { label: "Feb", value: 52000 },
              { label: "Mar", value: 48000 },
              { label: "Apr", value: 61000 },
              { label: "May", value: 55000 },
              { label: "Jun", value: 67000 },
            ]}
          />
          <Chart
            title="Product Distribution"
            type="pie"
            data={[
              { label: "Product A", value: 42 },
              { label: "Product B", value: 30 },
              { label: "Product C", value: 28 },
            ]}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <DataTable columns={salesColumns} data={salesData} />
          <InsightsList
            title="Key Insights"
            insights={[
              {
                id: "1",
                title: "Strong Growth",
                description: "Revenue increased by 20% compared to last month",
                type: "success",
              },
              {
                id: "2",
                title: "Product A Leading",
                description: "Product A accounts for 42% of total revenue",
                type: "info",
              },
              {
                id: "3",
                title: "Seasonal Trend",
                description: "June shows highest sales, likely due to seasonal factors",
                type: "info",
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}


