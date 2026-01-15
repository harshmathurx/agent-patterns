"use client"

import { useState, useEffect } from "react"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { Chart } from "@agent-patterns/chart/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { ThinkingIndicator } from "@agent-patterns/thinking-indicator/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import type { Column } from "@agent-patterns/data-table/component"
import { themes, type ThemeName } from "./themes"
import { ThemeCustomizer } from "@/components/ThemeCustomizer"

const patterns = [
  { id: "metric-card", name: "Metric Card" },
  { id: "data-table", name: "Data Table" },
  { id: "chart", name: "Chart" },
  { id: "agent-form", name: "Agent Form" },
  { id: "thinking-indicator", name: "Thinking Indicator" },
  { id: "insights-list", name: "Insights List" },
  { id: "detail-card", name: "Detail Card" },
]

export default function PlaygroundPage() {
  const [selectedPattern, setSelectedPattern] = useState("metric-card")
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>("default")

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement
    const theme = themes[selectedTheme]
    Object.entries(theme.css).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
  }, [selectedTheme])

  const renderPattern = () => {
    switch (selectedPattern) {
      case "metric-card":
        return (
          <div className="grid gap-4 md:grid-cols-3">
            <MetricCard
              label="Total Revenue"
              value="$45,231"
              trend={{ value: 20.1, label: "vs last month", direction: "up" }}
            />
            <MetricCard
              label="Active Users"
              value={2350}
              trend={{ value: 12.5, label: "vs last month", direction: "up" }}
            />
            <MetricCard
              label="Conversion Rate"
              value="3.2%"
              trend={{ value: 5.4, label: "vs last month", direction: "down" }}
            />
          </div>
        )
      case "data-table": {
        const columns: Column<{ name: string; email: string; role: string }>[] = [
          { key: "name", header: "Name" },
          { key: "email", header: "Email" },
          { key: "role", header: "Role" },
        ]
        const data = [
          { name: "John Doe", email: "john@example.com", role: "Admin" },
          { name: "Jane Smith", email: "jane@example.com", role: "User" },
          { name: "Bob Johnson", email: "bob@example.com", role: "User" },
        ]
        return <DataTable columns={columns} data={data} />
      }
      case "chart":
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <Chart
              title="Sales by Month"
              type="bar"
              data={[
                { label: "Jan", value: 1200 },
                { label: "Feb", value: 1900 },
                { label: "Mar", value: 3000 },
                { label: "Apr", value: 2780 },
              ]}
            />
            <Chart
              title="Revenue Distribution"
              type="pie"
              data={[
                { label: "Product A", value: 45 },
                { label: "Product B", value: 30 },
                { label: "Product C", value: 25 },
              ]}
            />
          </div>
        )
      case "agent-form":
        return (
          <AgentForm
            title="Contact Form"
            description="Please fill out the form below"
            fields={[
              {
                name: "name",
                label: "Name",
                type: "text",
                placeholder: "Enter your name",
                required: true,
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Enter your email",
                required: true,
              },
              {
                name: "message",
                label: "Message",
                type: "textarea",
                placeholder: "Enter your message",
                required: true,
              },
            ]}
            onSubmit={(data) => {
              console.log("Form submitted:", data)
              alert("Form submitted! Check console.")
            }}
          />
        )
      case "thinking-indicator":
        return (
          <div className="space-y-4">
            <ThinkingIndicator message="Processing your request..." variant="dots" />
            <ThinkingIndicator message="Analyzing data..." variant="pulse" />
            <ThinkingIndicator message="Loading..." variant="spinner" />
          </div>
        )
      case "insights-list":
        return (
          <InsightsList
            title="Key Insights"
            insights={[
              {
                id: "1",
                title: "Revenue Growth",
                description: "Revenue increased by 20% compared to last quarter",
                type: "success",
              },
              {
                id: "2",
                title: "User Engagement",
                description: "Active users decreased slightly this month",
                type: "warning",
              },
              {
                id: "3",
                title: "System Status",
                description: "All systems operating normally",
                type: "info",
              },
            ]}
          />
        )
      case "detail-card":
        return (
          <DetailCard
            title="User Details"
            description="Information about the selected user"
            fields={[
              { label: "Name", value: "John Doe" },
              { label: "Email", value: "john@example.com" },
              { label: "Role", value: "Admin" },
              { label: "Status", value: "Active" },
              {
                label: "Bio",
                value: "Software engineer with 5 years of experience",
                span: 2,
              },
            ]}
          />
        )
      default:
        return null
    }
  }

  const getCodePreview = () => {
    switch (selectedPattern) {
      case "metric-card":
        return `<MetricCard
  label="Total Revenue"
  value="$45,231"
  trend={{
    value: 20.1,
    label: "vs last month",
    direction: "up"
  }}
/>`
      case "data-table":
        return `const columns = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" }
]

const data = [
  { name: "John Doe", email: "john@example.com" }
]

<DataTable columns={columns} data={data} />`
      case "chart":
        return `<Chart
  title="Sales by Month"
  type="bar"
  data={[
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1900 }
  ]}
/>`
      case "agent-form":
        return `<AgentForm
  title="Contact Form"
  description="Please fill out the form below"
  fields={[
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      required: true
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      required: true
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Enter your message",
      required: true
    }
  ]}
  onSubmit={(data) => console.log(data)}
/>`
      case "thinking-indicator":
        return `<ThinkingIndicator
  message="Processing your request..."
  variant="dots"
/>

// Variants: "dots" | "pulse" | "spinner"`
      case "insights-list":
        return `<InsightsList
  title="Key Insights"
  insights={[
    {
      id: "1",
      title: "Revenue Growth",
      description: "Revenue increased by 20%",
      type: "success"
    },
    {
      id: "2",
      title: "User Engagement",
      description: "Active users decreased",
      type: "warning"
    }
  ]}
/>

// Types: "info" | "warning" | "success" | "error"`
      case "detail-card":
        return `<DetailCard
  title="User Details"
  description="Information about the user"
  fields={[
    { label: "Name", value: "John Doe" },
    { label: "Email", value: "john@example.com" },
    { label: "Role", value: "Admin" },
    { label: "Bio", value: "Software engineer", span: 2 }
  ]}
/>`
      default:
        return "// Select a pattern to see code"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Agent Patterns Playground</h1>
              <p className="text-sm text-muted-foreground">
                Interactive playground for exploring Agent Patterns
              </p>
            </div>
            <div className="flex items-center gap-4">
              <label htmlFor="theme-select" className="text-sm font-medium text-foreground">
                Theme:
              </label>
              <select
                id="theme-select"
                value={selectedTheme}
                onChange={(e) => {
                  const theme = themes[e.target.value as ThemeName]
                  setSelectedTheme(e.target.value as ThemeName)
                  Object.entries(theme.css).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value)
                  })
                }}
                className="rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {Object.entries(themes).map(([key, theme]) => (
                  <option key={key} value={key}>
                    {theme.name}
                  </option>
                ))}
              </select>
              <ThemeCustomizer
                selectedTheme={selectedTheme}
                onThemeChange={(theme) => {
                  setSelectedTheme(theme)
                  const themeData = themes[theme]
                  Object.entries(themeData.css).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value)
                  })
                }}
                onCustomThemeChange={(css) => {
                  Object.entries(css).forEach(([key, value]) => {
                    document.documentElement.style.setProperty(key, value)
                  })
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 lg:grid-cols-4">
          <aside className="lg:col-span-1">
            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="mb-4 text-lg font-semibold text-foreground">Patterns</h2>
              <nav className="space-y-2">
                {patterns.map((pattern) => (
                  <button
                    key={pattern.id}
                    onClick={() => {
                      setSelectedPattern(pattern.id)
                    }}
                    className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      selectedPattern === pattern.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {pattern.name}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  {patterns.find((p) => p.id === selectedPattern)?.name}
                </h2>
                <div className="space-y-4">{renderPattern()}</div>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="mb-4 text-xl font-semibold text-foreground">Code Preview</h2>
                <pre className="overflow-x-auto rounded-md bg-muted p-4 text-sm">
                  <code>{getCodePreview()}</code>
                </pre>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

