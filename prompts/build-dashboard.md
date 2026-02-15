# Build Dashboard - Complete Prompt

Use this prompt to generate a complete analytics/revenue dashboard using Agent Patterns.

## Prompt

```
Build me a complete revenue dashboard using Agent Patterns. The dashboard should show:

1. A StatsGrid at the top with 4 key metrics:
   - Total Revenue (with upward trend)
   - Active Users (with trend indicator)
   - Conversion Rate (with comparison)
   - Average Order Value (with sparkline)

2. Two Charts side-by-side:
   - A bar chart showing monthly revenue for the last 6 months
   - A line chart showing user growth over the same period

3. A DataTable showing recent transactions with:
   - Columns: ID, Customer, Amount, Status, Date
   - At least 15 rows of data
   - Enable sorting, searching, and pagination (10 rows per page)
   - Row selection enabled

4. An InsightsList showing 3-4 AI-generated insights about the data:
   - Mix of info, success, and warning types
   - Each with a relevant action button
   - Enable priority sorting

Use realistic data - actual customer names, dollar amounts, dates from the last month.
Make it responsive and production-ready.
Use a professional color scheme with proper spacing.
```

## Expected Output

The LLM should generate a complete React component that:

1. **Imports all necessary patterns**:
```typescript
import { StatsGrid } from '@/patterns/stats-grid/component'
import { Chart } from '@/patterns/chart/component'
import { DataTable } from '@/patterns/data-table/component'
import { InsightsList } from '@/patterns/insights-list/component'
```

2. **Contains realistic data** (not Lorem ipsum):
```typescript
const statsData = [
  {
    id: '1',
    label: 'Total Revenue',
    value: '$847,392',
    change: 14.2,
    changeLabel: 'vs last month',
    trend: 'up' as const,
    color: 'success' as const,
  },
  // ... more stats
]

const revenueData = [
  { label: 'Jan', value: 125000 },
  { label: 'Feb', value: 132000 },
  { label: 'Mar', value: 148000 },
  // ... more months
]

const transactions = [
  { 
    id: 'TXN-001', 
    customer: 'Acme Corp', 
    amount: '$12,450', 
    status: 'Completed', 
    date: '2024-02-15' 
  },
  // ... 15+ rows
]

const insights = [
  {
    id: '1',
    title: 'Revenue growth accelerating',
    description: 'Monthly revenue increased by 14.2% compared to last month, indicating strong market demand.',
    type: 'success' as const,
    priority: 'high' as const,
    actions: [
      { label: 'View Details', onClick: () => console.log('View details') }
    ]
  },
  // ... more insights
]
```

3. **Implements proper layout**:
```typescript
export default function RevenueDashboard() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Revenue Dashboard</h1>
          <p className="text-muted-foreground">Track your revenue, users, and performance metrics</p>
        </div>

        {/* Stats Grid */}
        <StatsGrid 
          stats={statsData} 
          columns={4} 
          showDividers={true}
        />

        {/* Charts Row */}
        <div className="grid md:grid-cols-2 gap-6">
          <Chart
            title="Monthly Revenue"
            type="bar"
            data={revenueData}
            showLegend={false}
          />
          <Chart
            title="User Growth"
            type="line"
            data={userGrowthData}
            showLegend={false}
          />
        </div>

        {/* Data Table */}
        <DataTable
          columns={transactionColumns}
          data={transactions}
          searchable={true}
          pagination={true}
          pageSize={10}
          selectable={true}
          onSelectionChange={(selected) => console.log('Selected:', selected)}
        />

        {/* Insights */}
        <InsightsList
          insights={insights}
          sortByPriority={true}
          showFilters={true}
        />
      </div>
    </div>
  )
}
```

4. **Is production-ready** with:
   - Proper TypeScript types
   - Responsive design (md: breakpoints)
   - Realistic data with variety
   - Proper spacing and layout
   - Clean, professional styling
   - Working callbacks and handlers

## Variations

You can modify this prompt for different dashboard types:

- **Sales Dashboard**: Focus on deals, pipeline, conversion metrics
- **E-commerce Dashboard**: Focus on products, orders, inventory
- **Analytics Dashboard**: Focus on traffic, engagement, user behavior  
- **Operations Dashboard**: Focus on tasks, tickets, system health
- **Marketing Dashboard**: Focus on campaigns, leads, ROI

Simply replace the metrics, chart data, and table columns to match your use case.

