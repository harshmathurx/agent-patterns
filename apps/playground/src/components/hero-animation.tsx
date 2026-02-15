"use client"

import { useState, useEffect } from "react"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { Chart } from "@agent-patterns/chart/component"
import { DataTable } from "@agent-patterns/data-table/component"
import type { Column } from "@agent-patterns/data-table/component"

export function HeroAnimation() {
  const [stage, setStage] = useState(0)
  const [promptText, setPromptText] = useState("")
  const fullPrompt = "Build me a revenue dashboard with key metrics, a sales chart, and a customer data table..."

  useEffect(() => {
    // Typewriter effect for prompt
    if (stage === 0 && promptText.length < fullPrompt.length) {
      const timer = setTimeout(() => {
        setPromptText(fullPrompt.slice(0, promptText.length + 1))
      }, 30)
      return () => clearTimeout(timer)
    } else if (stage === 0 && promptText.length === fullPrompt.length) {
      // Move to next stage after prompt is complete
      setTimeout(() => setStage(1), 500)
    }
  }, [stage, promptText, fullPrompt])

  useEffect(() => {
    if (stage > 0 && stage < 4) {
      const timer = setTimeout(() => {
        setStage(stage + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [stage])

  const sampleColumns: Column<{ name: string; revenue: string; status: string }>[] = [
    { key: "name", header: "Customer" },
    { key: "revenue", header: "Revenue" },
    { key: "status", header: "Status" },
  ]

  const sampleData = [
    { name: "Acme Corp", revenue: "$45,231", status: "Active" },
    { name: "TechStart Inc", revenue: "$32,450", status: "Active" },
    { name: "Global Solutions", revenue: "$28,100", status: "Active" },
  ]

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-background to-purple-500/5 p-8">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 -z-0 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -z-0 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl"></div>

      <div className="relative z-10 space-y-6">
        {/* Prompt Input Section */}
        <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            AI Prompt
          </div>
          <div className="min-h-[60px] font-mono text-sm text-foreground">
            {promptText}
            {stage === 0 && <span className="animate-pulse">|</span>}
          </div>
        </div>

        {/* Components Materializing */}
        <div className="space-y-4">
          {/* Metric Cards */}
          {stage >= 1 && (
            <div 
              className="grid gap-4 md:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-700"
            >
              <MetricCard
                label="Total Revenue"
                value="$105,781"
                trend={{ value: 23.5, label: "vs last month", direction: "up" }}
                size="sm"
              />
              <MetricCard
                label="Active Customers"
                value="2,847"
                trend={{ value: 12.3, label: "vs last month", direction: "up" }}
                size="sm"
              />
              <MetricCard
                label="Avg Deal Size"
                value="$37,142"
                trend={{ value: 5.1, label: "vs last month", direction: "up" }}
                size="sm"
              />
            </div>
          )}

          {/* Chart */}
          {stage >= 2 && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <Chart
                title="Monthly Sales"
                type="bar"
                data={[
                  { label: "Jan", value: 1200 },
                  { label: "Feb", value: 1900 },
                  { label: "Mar", value: 3000 },
                  { label: "Apr", value: 2780 },
                  { label: "May", value: 3200 },
                  { label: "Jun", value: 3500 },
                ]}
                height={250}
              />
            </div>
          )}

          {/* Data Table */}
          {stage >= 3 && (
            <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
              <DataTable columns={sampleColumns} data={sampleData} />
            </div>
          )}
        </div>

        {/* Completion Badge */}
        {stage >= 4 && (
          <div className="animate-in fade-in-0 duration-500 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Dashboard Generated!
            </div>
          </div>
        )}
      </div>

      {/* Replay Button */}
      {stage >= 4 && (
        <button
          onClick={() => {
            setStage(0)
            setPromptText("")
          }}
          className="absolute bottom-4 right-4 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
        >
          ↻ Replay
        </button>
      )}
    </div>
  )
}

