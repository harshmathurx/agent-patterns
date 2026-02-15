"use client"

import { useState, useEffect } from "react"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { Chart } from "@agent-patterns/chart/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import type { Column } from "@agent-patterns/data-table/component"

interface Scenario {
  id: string
  name: string
  prompt: string
  description: string
}

const scenarios: Scenario[] = [
  {
    id: "sales-dashboard",
    name: "Sales Dashboard",
    prompt: "Build a sales dashboard with revenue metrics, monthly sales chart, and top customers table",
    description: "MetricCards + Chart + DataTable"
  },
  {
    id: "user-management",
    name: "User Management",
    prompt: "Create a user management panel with customer list, detail view, and edit form",
    description: "DataTable + DetailCard + AgentForm"
  },
  {
    id: "analytics-insights",
    name: "Analytics Insights",
    prompt: "Show me analytics insights with performance metrics, trend chart, and key findings",
    description: "Chart + InsightsList + MetricCard"
  },
]

export function AIDemoZeroTokens() {
  const [selectedScenario, setSelectedScenario] = useState<string>(scenarios[0].id)
  const [stage, setStage] = useState(0)
  const [promptText, setPromptText] = useState("")
  const [showByokInput, setShowByokInput] = useState(false)

  const scenario = scenarios.find(s => s.id === selectedScenario)!

  useEffect(() => {
    // Reset when scenario changes
    setStage(0)
    setPromptText("")
  }, [selectedScenario])

  useEffect(() => {
    // Typewriter effect
    if (stage === 0 && promptText.length < scenario.prompt.length) {
      const timer = setTimeout(() => {
        setPromptText(scenario.prompt.slice(0, promptText.length + 1))
      }, 30)
      return () => clearTimeout(timer)
    } else if (stage === 0 && promptText.length === scenario.prompt.length) {
      setTimeout(() => setStage(1), 800)
    }
  }, [stage, promptText, scenario.prompt])

  useEffect(() => {
    if (stage > 0 && stage < 3) {
      const timer = setTimeout(() => {
        setStage(stage + 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [stage])

  const renderScenarioUI = () => {
    switch (selectedScenario) {
      case "sales-dashboard":
        return (
          <div className="space-y-4">
            {stage >= 1 && (
              <div className="grid gap-4 md:grid-cols-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <MetricCard label="Total Revenue" value="$145,231" trend={{ value: 23.5, label: "vs last month", direction: "up" }} size="sm" />
                <MetricCard label="New Customers" value="1,847" trend={{ value: 12.3, label: "vs last month", direction: "up" }} size="sm" />
                <MetricCard label="Conversion Rate" value="3.42%" trend={{ value: 5.1, label: "vs last month", direction: "up" }} size="sm" />
              </div>
            )}
            {stage >= 2 && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <Chart
                  title="Monthly Sales"
                  type="bar"
                  data={[
                    { label: "Jan", value: 45231 },
                    { label: "Feb", value: 52450 },
                    { label: "Mar", value: 48100 },
                    { label: "Apr", value: 61234 },
                    { label: "May", value: 58932 },
                    { label: "Jun", value: 65100 },
                  ]}
                  height={250}
                />
              </div>
            )}
            {stage >= 3 && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <DataTable
                  columns={[
                    { key: "customer", header: "Customer" },
                    { key: "revenue", header: "Revenue" },
                    { key: "status", header: "Status" },
                  ] as Column<any>[]}
                  data={[
                    { customer: "Acme Corp", revenue: "$45,231", status: "Active" },
                    { customer: "TechStart Inc", revenue: "$32,450", status: "Active" },
                    { customer: "Global Solutions", revenue: "$28,100", status: "Active" },
                  ]}
                />
              </div>
            )}
          </div>
        )

      case "user-management":
        return (
          <div className="grid gap-4 lg:grid-cols-2">
            {stage >= 1 && (
              <div className="animate-in fade-in-0 slide-in-from-left-4 duration-700">
                <DataTable
                  columns={[
                    { key: "name", header: "Name" },
                    { key: "email", header: "Email" },
                    { key: "role", header: "Role" },
                  ] as Column<any>[]}
                  data={[
                    { name: "John Doe", email: "john@example.com", role: "Admin" },
                    { name: "Jane Smith", email: "jane@example.com", role: "User" },
                    { name: "Bob Johnson", email: "bob@example.com", role: "User" },
                  ]}
                />
              </div>
            )}
            {stage >= 2 && (
              <div className="space-y-4 animate-in fade-in-0 slide-in-from-right-4 duration-700">
                <DetailCard
                  title="User Details"
                  description="Selected user information"
                  fields={[
                    { label: "Name", value: "John Doe" },
                    { label: "Email", value: "john@example.com" },
                    { label: "Role", value: "Admin" },
                    { label: "Status", value: "Active" },
                  ]}
                />
              </div>
            )}
            {stage >= 3 && (
              <div className="lg:col-span-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <AgentForm
                  title="Edit User"
                  description="Update user information"
                  fields={[
                    { name: "name", label: "Name", type: "text", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "role", label: "Role", type: "select", options: [
                      { label: "Admin", value: "admin" },
                      { label: "User", value: "user" },
                    ]}
                  ]}
                  onSubmit={() => {}}
                />
              </div>
            )}
          </div>
        )

      case "analytics-insights":
        return (
          <div className="space-y-4">
            {stage >= 1 && (
              <div className="grid gap-4 md:grid-cols-2 animate-in fade-in-0 slide-in-from-top-4 duration-700">
                <MetricCard label="Page Views" value="245,832" trend={{ value: 18.2, label: "vs last week", direction: "up" }} size="sm" />
                <MetricCard label="Avg Session" value="4m 32s" trend={{ value: 8.7, label: "vs last week", direction: "up" }} size="sm" />
              </div>
            )}
            {stage >= 2 && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <Chart
                  title="Traffic Trend"
                  type="line"
                  data={[
                    { label: "Mon", value: 3200 },
                    { label: "Tue", value: 3800 },
                    { label: "Wed", value: 3500 },
                    { label: "Thu", value: 4200 },
                    { label: "Fri", value: 4800 },
                    { label: "Sat", value: 3100 },
                    { label: "Sun", value: 2900 },
                  ]}
                  height={250}
                />
              </div>
            )}
            {stage >= 3 && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                <InsightsList
                  title="Key Insights"
                  insights={[
                    { id: "1", title: "Traffic Spike on Thursday", description: "Page views increased 32% on Thursday, likely due to email campaign", type: "success", priority: "high" },
                    { id: "2", title: "Bounce Rate Increased", description: "Bounce rate up 5% this week, investigate landing pages", type: "warning", priority: "medium" },
                    { id: "3", title: "Mobile Traffic Growing", description: "Mobile traffic now accounts for 65% of total visits", type: "info", priority: "low" },
                  ]}
                />
              </div>
            )}
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
          AI-Ready Demo
        </h2>
        <p className="text-lg text-muted-foreground">
          Watch pre-built scenarios come to life. Zero tokens, pure animation.
        </p>
      </div>

      {/* Scenario Selector */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedScenario(s.id)}
            className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
              selectedScenario === s.id
                ? "border-primary bg-primary text-primary-foreground shadow-md"
                : "border-border bg-card text-foreground hover:border-primary/50"
            }`}
          >
            <div className="font-semibold">{s.name}</div>
            <div className="text-xs opacity-80">{s.description}</div>
          </button>
        ))}
      </div>

      {/* Split Screen Demo */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Chat Interface */}
        <div className="rounded-xl border-2 border-border bg-card p-6">
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <h3 className="font-semibold text-foreground">AI Prompt</h3>
            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
              Simulated
            </span>
          </div>

          <div className="min-h-[200px] space-y-4">
            <div className="rounded-lg border border-muted bg-muted/30 p-4">
              <div className="mb-1 text-xs font-semibold text-muted-foreground">User</div>
              <div className="font-mono text-sm text-foreground">
                {promptText}
                {stage === 0 && <span className="animate-pulse">|</span>}
              </div>
            </div>

            {stage >= 1 && (
              <div className="animate-in fade-in-0 slide-in-from-bottom-2 duration-500 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="mb-1 flex items-center gap-2">
                  <div className="text-xs font-semibold text-foreground">AI Assistant</div>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></div>
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary delay-150"></div>
                    <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary delay-300"></div>
                  </div>
                </div>
                <div className="text-sm text-foreground">
                  {stage === 1 && "Analyzing your request..."}
                  {stage === 2 && "Generating components..."}
                  {stage >= 3 && "✓ Dashboard generated successfully!"}
                </div>
              </div>
            )}
          </div>

          {/* Replay Button */}
          {stage >= 3 && (
            <button
              onClick={() => {
                setStage(0)
                setPromptText("")
              }}
              className="mt-4 w-full rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              ↻ Replay Animation
            </button>
          )}
        </div>

        {/* Right: Rendered UI */}
        <div className="rounded-xl border-2 border-border bg-background p-6">
          <div className="mb-4 border-b border-border pb-3">
            <h3 className="font-semibold text-foreground">Generated UI</h3>
          </div>

          <div className="min-h-[400px]">
            {renderScenarioUI()}
          </div>
        </div>
      </div>

      {/* BYOK Section */}
      <div className="mt-8 rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-foreground">
              Want to try it live?
            </h3>
            <p className="text-sm text-muted-foreground">
              Bring your own OpenAI, Anthropic, or other LLM API key to generate real UIs. 
              Your key stays in your browser, we never see it.
            </p>
          </div>
          <button
            onClick={() => setShowByokInput(!showByokInput)}
            className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {showByokInput ? "Hide BYOK" : "Try Live"}
          </button>
        </div>

        {showByokInput && (
          <div className="mt-4 animate-in fade-in-0 slide-in-from-top-2 duration-300 space-y-3">
            <input
              type="password"
              placeholder="Enter your API key (stored locally only)"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              Start Live Generation
            </button>
            <p className="text-xs text-muted-foreground">
              🔒 Your API key is stored only in your browser's local storage and never sent to our servers.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

