# StatsGrid

Responsive grid for displaying KPIs and metrics with trends.

## Features

- 📊 **KPI Display** - Show key performance indicators
- 📈 **Trend Indicators** - Up, down, neutral with visual cues
- 🎨 **Color Coding** - Success, warning, danger themes
- 🔢 **Change Tracking** - Percentage changes with labels
- 🎯 **Icons** - Add visual context to metrics
- 📱 **Responsive** - 1-6 column layouts
- 🎨 **Theme Compatible** - Works with all shadcn themes

## Usage

```tsx
import { StatsGrid } from "@/patterns/stats-grid/component"

const stats = [
  {
    id: "users",
    label: "Total Users",
    value: "12,345",
    change: 12.5,
    trend: "up",
    color: "success",
  },
]

<StatsGrid stats={stats} columns={3} />
```

## Perfect For

- Dashboard headers
- KPI summaries
- Analytics overviews
- Performance metrics
- Business intelligence

