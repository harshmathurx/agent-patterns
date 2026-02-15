import { MetricCard } from "./component"

// Example 1: Basic Metric Card
export function BasicMetricCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard label="Total Revenue" value="$45,231" />
      <MetricCard label="Active Users" value={1254} />
      <MetricCard label="Conversion Rate" value="3.2%" />
    </div>
  )
}

// Example 2: Metric Cards with Trends
export function MetricCardsWithTrendsExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        label="Total Revenue"
        value="$45,231"
        trend={{ value: 20.1, label: "vs last month", direction: "up" }}
      />
      <MetricCard
        label="Active Users"
        value={1254}
        trend={{ value: -5.3, label: "vs last week", direction: "down" }}
      />
      <MetricCard
        label="Conversion Rate"
        value="3.2%"
        trend={{ value: 0, label: "vs yesterday", direction: "neutral" }}
      />
    </div>
  )
}

// Example 3: Metric Cards with Sparklines
export function MetricCardsWithSparklinesExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <MetricCard
        label="Revenue Trend"
        value="$45,231"
        trend={{ value: 12.5, label: "vs last month", direction: "up" }}
        sparkline={[30, 35, 32, 38, 42, 45, 48]}
      />
      <MetricCard
        label="User Growth"
        value={1254}
        trend={{ value: -3.2, label: "vs last week", direction: "down" }}
        sparkline={[100, 105, 98, 95, 92, 88, 85]}
      />
    </div>
  )
}

// Example 4: Metric Cards with Comparison
export function MetricCardsWithComparisonExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        label="This Month"
        value="$45,231"
        comparison={{ value: "$38,120", label: "last month" }}
        trend={{ value: 18.7, label: "vs last month", direction: "up" }}
      />
      <MetricCard
        label="This Week"
        value={1254}
        comparison={{ value: 1180, label: "last week" }}
        trend={{ value: 6.3, label: "vs last week", direction: "up" }}
      />
      <MetricCard
        label="Today"
        value="3.2%"
        comparison={{ value: "3.5%", label: "yesterday" }}
        trend={{ value: -8.6, label: "vs yesterday", direction: "down" }}
      />
    </div>
  )
}

// Example 5: Different Sizes
export function MetricCardSizesExample() {
  return (
    <div className="space-y-4">
      <MetricCard
        label="Small Card"
        value="$1,234"
        trend={{ value: 5.2, label: "vs last month", direction: "up" }}
        size="sm"
      />
      <MetricCard
        label="Medium Card (Default)"
        value="$45,231"
        trend={{ value: 12.5, label: "vs last month", direction: "up" }}
        size="md"
      />
      <MetricCard
        label="Large Card"
        value="$987,654"
        trend={{ value: 25.3, label: "vs last month", direction: "up" }}
        sparkline={[30, 35, 32, 38, 42, 45, 48]}
        size="lg"
      />
    </div>
  )
}

// Example 6: Loading State
export function MetricCardLoadingExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard label="Revenue" value="$0" loading={true} />
      <MetricCard label="Users" value={0} loading={true} sparkline={[]} />
      <MetricCard label="Rate" value="0%" loading={true} />
    </div>
  )
}

// Example 7: Full-Featured Dashboard
export function FullDashboardExample() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Revenue Dashboard</h2>
      
      {/* Primary metrics with sparklines */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total Revenue"
          value="$45,231"
          trend={{ value: 20.1, label: "vs last month", direction: "up" }}
          sparkline={[35, 38, 40, 42, 43, 44, 45]}
        />
        <MetricCard
          label="Active Users"
          value={1254}
          trend={{ value: 12.5, label: "vs last month", direction: "up" }}
          sparkline={[95, 98, 100, 105, 108, 115, 125]}
        />
        <MetricCard
          label="Conversion Rate"
          value="3.24%"
          trend={{ value: -2.1, label: "vs last month", direction: "down" }}
          sparkline={[3.5, 3.4, 3.35, 3.3, 3.28, 3.26, 3.24]}
        />
        <MetricCard
          label="Avg Order Value"
          value="$159"
          trend={{ value: 8.3, label: "vs last month", direction: "up" }}
          sparkline={[145, 148, 150, 152, 155, 157, 159]}
        />
      </div>

      {/* Secondary metrics with comparisons */}
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Monthly Recurring Revenue"
          value="$12,450"
          comparison={{ value: "$11,200", label: "last month" }}
          trend={{ value: 11.2, label: "vs last month", direction: "up" }}
        />
        <MetricCard
          label="Customer Lifetime Value"
          value="$2,340"
          comparison={{ value: "$2,180", label: "last quarter" }}
          trend={{ value: 7.3, label: "vs last quarter", direction: "up" }}
        />
        <MetricCard
          label="Churn Rate"
          value="2.1%"
          comparison={{ value: "2.5%", label: "last month" }}
          trend={{ value: -16.0, label: "vs last month", direction: "down" }}
        />
      </div>
    </div>
  )
}

export default MetricCardsWithTrendsExample
