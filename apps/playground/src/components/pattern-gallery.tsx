"use client"

import Link from "next/link"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { Chart } from "@agent-patterns/chart/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { StreamingIndicator } from "@agent-patterns/streaming-indicator/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import type { Column } from "@agent-patterns/data-table/component"

interface Pattern {
  id: string
  name: string
  description: string
  category: string
}

const patterns: Pattern[] = [
  { id: "metric-card", name: "Metric Card", description: "Display KPIs with trends and sparklines", category: "Metrics" },
  { id: "data-table", name: "Data Table", description: "Interactive table with sorting, filtering, and pagination", category: "Data" },
  { id: "chart", name: "Chart", description: "Bar, line, area, pie, and donut visualizations with Recharts", category: "Charts" },
  { id: "agent-form", name: "Agent Form", description: "Dynamic forms with Zod validation", category: "Forms" },
  { id: "streaming-indicator", name: "Streaming Indicator", description: "Loading states with typewriter and progress variants", category: "Feedback" },
  { id: "insights-list", name: "Insights List", description: "AI-generated insights with collapsible details", category: "Content" },
  { id: "detail-card", name: "Detail Card", description: "Structured detail views with edit mode", category: "Content" },
]

interface PatternGalleryProps {
  selectedPattern?: string
  onPatternSelect?: (patternId: string) => void
}

export function PatternGallery({ selectedPattern, onPatternSelect }: PatternGalleryProps) {
  const renderMiniPreview = (patternId: string) => {
    const scale = "scale-[0.7] origin-top-left"
    
    switch (patternId) {
      case "metric-card":
        return (
          <div className={scale}>
            <MetricCard
              label="Revenue"
              value="$45,231"
              trend={{ value: 20.1, label: "vs last month", direction: "up" }}
              size="sm"
            />
          </div>
        )
      case "data-table": {
        const cols: Column<{ name: string; status: string }>[] = [
          { key: "name", header: "Name" },
          { key: "status", header: "Status" },
        ]
        return (
          <div className={scale}>
            <DataTable 
              columns={cols} 
              data={[
                { name: "John Doe", status: "Active" },
                { name: "Jane Smith", status: "Active" },
              ]} 
            />
          </div>
        )
      }
      case "chart":
        return (
          <div className={scale}>
            <Chart
              title="Sales"
              type="bar"
              data={[
                { label: "Jan", value: 1200 },
                { label: "Feb", value: 1900 },
                { label: "Mar", value: 3000 },
              ]}
            />
          </div>
        )
      case "agent-form":
        return (
          <div className={scale}>
            <AgentForm
              title="Contact Form"
              fields={[
                { name: "name", label: "Name", type: "text", required: true },
                { name: "email", label: "Email", type: "email", required: true },
              ]}
              onSubmit={() => {}}
            />
          </div>
        )
      case "streaming-indicator":
        return (
          <div className={`${scale} space-y-2`}>
            <StreamingIndicator variant="dots" message="Processing..." />
            <StreamingIndicator variant="typing" message="Generating response..." />
          </div>
        )
      case "insights-list":
        return (
          <div className={scale}>
            <InsightsList
              insights={[
                { id: "1", title: "Revenue Growth", description: "Revenue increased by 20%", type: "success" },
                { id: "2", title: "User Engagement", description: "Active users decreased", type: "warning" },
              ]}
            />
          </div>
        )
      case "detail-card":
        return (
          <div className={scale}>
            <DetailCard
              title="User Details"
              fields={[
                { label: "Name", value: "John Doe" },
                { label: "Email", value: "john@example.com" },
                { label: "Role", value: "Admin" },
              ]}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold tracking-tight text-foreground">
          Pattern Library
        </h2>
        <p className="text-lg text-muted-foreground">
          Production-ready components with live previews. Click to explore.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {patterns.map((pattern) => (
          <Link
            key={pattern.id}
            href={`/?pattern=${pattern.id}`}
            onClick={(e) => {
              if (onPatternSelect) {
                e.preventDefault()
                onPatternSelect(pattern.id)
              }
            }}
            className={`group relative overflow-hidden rounded-xl border-2 bg-card transition-all hover:shadow-lg ${
              selectedPattern === pattern.id
                ? "border-primary shadow-md"
                : "border-border hover:border-primary/50"
            }`}
          >
            {/* Category Badge */}
            <div className="absolute right-3 top-3 z-10 rounded-full border border-border bg-background/80 px-2 py-1 text-xs font-medium text-foreground backdrop-blur-sm">
              {pattern.category}
            </div>

            {/* Live Mini Preview */}
            <div className="relative h-48 overflow-hidden border-b border-border bg-gradient-to-br from-background via-muted/30 to-muted/50 p-4">
              <div className="pointer-events-none h-full w-full overflow-hidden">
                {renderMiniPreview(pattern.id)}
              </div>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/0 opacity-0 transition-all group-hover:bg-background/90 group-hover:opacity-100">
                <div className="rounded-full border border-primary bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
                  View Pattern →
                </div>
              </div>
            </div>

            {/* Pattern Info */}
            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {pattern.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {pattern.description}
              </p>

              {/* Compliance Badges */}
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
                  <span>✓</span>
                  <span>A11y</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 dark:border-blue-800 dark:bg-blue-950/50 dark:text-blue-400">
                  LLM-Ready
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-200 bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-700 dark:border-purple-800 dark:bg-purple-950/50 dark:text-purple-400">
                  Zod Schema
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

