# Build Analytics View - Complete Prompt

Use this prompt to generate a comprehensive analytics page with insights using Agent Patterns.

## Prompt

```
Build me a comprehensive analytics page using Agent Patterns. The page should include:

1. A page header with:
   - Title "Analytics Overview"
   - Date range selector (last 7 days, 30 days, 90 days, custom)
   - Export button

2. A StatsGrid with 6 key performance metrics:
   - Total Views, Unique Visitors, Bounce Rate, Avg Session Duration, Conversions, Revenue
   - Each with trend indicators and comparison to previous period

3. Three charts in a 2-column grid:
   - Large area chart (full width) showing daily traffic for the past 30 days
   - Bar chart showing top 5 traffic sources
   - Pie chart showing device distribution (Desktop, Mobile, Tablet)

4. An InsightsList showing 5-6 AI-generated insights:
   - Mix of all types (info, warning, success, error)
   - Priority badges (high, medium, low)
   - Specific, actionable insights about the data
   - Each with 1-2 action buttons

5. A DataTable showing "Top Pages" with:
   - Columns: Page Path, Views, Unique Visitors, Avg Time, Bounce Rate, Conversions
   - At least 15 rows with realistic URLs
   - Sorting enabled on all columns
   - Pagination with 10 rows per page

6. A Timeline showing recent important events:
   - Campaign launches, feature releases, incidents, milestones
   - Last 2 weeks of events
   - Status indicators (completed, in-progress, etc.)

Use realistic analytics data - actual page paths, traffic numbers, percentages.
Make it professional and data-driven with insights that sound like they came from an AI analyst.
Use proper formatting for numbers (1.2K, 45.3%, $12.5K, etc.).
```

## Expected Output

The LLM should generate a complete React component that:

1. **Imports all necessary patterns**:
```typescript
import { StatsGrid } from '@/patterns/stats-grid/component'
import { Chart } from '@/patterns/chart/component'
import { InsightsList } from '@/patterns/insights-list/component'
import { DataTable } from '@/patterns/data-table/component'
import { Timeline } from '@/patterns/timeline/component'
```

2. **Contains comprehensive analytics data**:
```typescript
const performanceStats = [
  {
    id: '1',
    label: 'Total Views',
    value: '1.24M',
    change: 18.2,
    changeLabel: 'vs last period',
    trend: 'up' as const,
    color: 'success' as const,
  },
  {
    id: '2',
    label: 'Unique Visitors',
    value: '847K',
    change: 12.5,
    changeLabel: 'vs last period',
    trend: 'up' as const,
    color: 'success' as const,
  },
  {
    id: '3',
    label: 'Bounce Rate',
    value: '42.3%',
    change: -5.1,
    changeLabel: 'vs last period',
    trend: 'down' as const,
    color: 'success' as const, // Down is good for bounce rate
  },
  // ... more stats
]

const trafficData = [
  { label: 'Jan 15', value: 28450 },
  { label: 'Jan 16', value: 31200 },
  { label: 'Jan 17', value: 29800 },
  // ... 30 days of data
]

const trafficSources = [
  { label: 'Organic Search', value: 45230 },
  { label: 'Direct', value: 28940 },
  { label: 'Social Media', value: 18650 },
  { label: 'Referral', value: 12340 },
  { label: 'Email', value: 8920 },
]

const deviceDistribution = [
  { label: 'Desktop', value: 52, color: 'hsl(var(--primary))' },
  { label: 'Mobile', value: 38, color: 'hsl(var(--secondary))' },
  { label: 'Tablet', value: 10, color: 'hsl(var(--muted))' },
]

const insights = [
  {
    id: '1',
    title: 'Traffic spike detected on mobile devices',
    description: 'Mobile traffic increased by 34% in the last 3 days, primarily from organic search. This correlates with improved mobile page load times after recent optimization.',
    type: 'success' as const,
    priority: 'high' as const,
    actions: [
      { label: 'View Mobile Analytics', onClick: () => {} },
      { label: 'Export Report', onClick: () => {} },
    ],
  },
  {
    id: '2',
    title: 'High bounce rate on product pages',
    description: 'Product category pages show 58% bounce rate, 12% higher than site average. Users are leaving without viewing product details.',
    type: 'warning' as const,
    priority: 'high' as const,
    actions: [
      { label: 'View Problem Pages', onClick: () => {} },
      { label: 'A/B Test Suggestions', onClick: () => {} },
    ],
  },
  {
    id: '3',
    title: 'Conversion rate improving',
    description: 'Overall conversion rate reached 3.2%, up from 2.8% last month. Checkout flow optimization is showing positive results.',
    type: 'success' as const,
    priority: 'medium' as const,
    actions: [
      { label: 'View Funnel', onClick: () => {} },
    ],
  },
  // ... more insights
]

const topPages = [
  {
    path: '/products/wireless-headphones',
    views: 124500,
    uniqueVisitors: 98200,
    avgTime: '3:24',
    bounceRate: '38.2%',
    conversions: 2847,
  },
  {
    path: '/blog/best-productivity-apps-2024',
    views: 89300,
    uniqueVisitors: 76400,
    avgTime: '5:12',
    bounceRate: '42.8%',
    conversions: 1243,
  },
  // ... 15+ pages
]

const recentEvents = [
  {
    id: '1',
    title: 'Summer Campaign Launch',
    description: 'Launched summer sale campaign across all channels',
    timestamp: '2024-02-14T10:00:00',
    status: 'completed' as const,
    user: 'Marketing Team',
  },
  {
    id: '2',
    title: 'Mobile App Update',
    description: 'Released v2.1 with performance improvements',
    timestamp: '2024-02-12T14:30:00',
    status: 'completed' as const,
    user: 'Product Team',
  },
  // ... more events
]
```

3. **Implements complete layout**:
```typescript
export default function AnalyticsView() {
  const [dateRange, setDateRange] = useState('30d')

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Analytics Overview</h1>
            <p className="text-muted-foreground">
              Comprehensive insights into your performance
            </p>
          </div>
          <div className="flex gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectOption value="7d">Last 7 days</SelectOption>
              <SelectOption value="30d">Last 30 days</SelectOption>
              <SelectOption value="90d">Last 90 days</SelectOption>
              <SelectOption value="custom">Custom range</SelectOption>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Performance Stats */}
        <StatsGrid 
          stats={performanceStats} 
          columns={3} 
          showDividers={true}
        />

        {/* Charts Section */}
        <div className="space-y-6">
          {/* Main Traffic Chart - Full Width */}
          <Chart
            title="Daily Traffic Trend"
            type="area"
            data={trafficData}
            showLegend={false}
            showGrid={true}
          />

          {/* Secondary Charts - 2 Column */}
          <div className="grid md:grid-cols-2 gap-6">
            <Chart
              title="Top Traffic Sources"
              type="bar"
              data={trafficSources}
              showLegend={false}
            />
            <Chart
              title="Device Distribution"
              type="donut"
              data={deviceDistribution}
              showLegend={true}
            />
          </div>
        </div>

        {/* AI Insights */}
        <InsightsList
          insights={insights}
          sortByPriority={true}
          showFilters={true}
        />

        {/* Top Pages Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Pages</h2>
          <DataTable
            columns={topPagesColumns}
            data={topPages}
            searchable={true}
            pagination={true}
            pageSize={10}
          />
        </div>

        {/* Recent Events Timeline */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          <Timeline
            events={recentEvents}
            orientation="vertical"
            showTime={true}
          />
        </div>
      </div>
    </div>
  )
}
```

4. **Is production-ready** with:
   - Realistic analytics metrics and trends
   - Proper number formatting (K, M, %, time formats)
   - AI-generated insights that sound professional
   - Actionable recommendations with context
   - Complete data visualization mix
   - Responsive grid layouts
   - Professional analytics dashboard styling
   - Date range selection capability
   - Export functionality hook

## Variations

You can modify this prompt for different analytics types:

- **Marketing Analytics**: Campaign performance, ROI, lead attribution
- **Product Analytics**: Feature usage, user flows, engagement metrics
- **Sales Analytics**: Pipeline, deals, revenue forecasting
- **Content Analytics**: Article performance, engagement, SEO metrics
- **E-commerce Analytics**: Orders, revenue, cart abandonment, product performance

Simply replace the metrics, charts, and insights to match your analytics domain.

