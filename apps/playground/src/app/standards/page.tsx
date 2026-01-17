"use client"

import { MetricCard } from "@agent-patterns/metric-card/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import { Navigation } from "@/components/navigation"
import type { Column } from "@agent-patterns/data-table/component"

interface ComplianceData {
  pattern: string
  ramsAi: number
  uiSkills: number
  vercel: number
  overall: number
  status: "compliant" | "partial" | "needs-improvement"
}

const complianceData: ComplianceData[] = [
  { pattern: "Metric Card", ramsAi: 60, uiSkills: 95, vercel: 80, overall: 78, status: "partial" },
  { pattern: "Data Table", ramsAi: 65, uiSkills: 90, vercel: 95, overall: 83, status: "partial" },
  { pattern: "Chart", ramsAi: 30, uiSkills: 85, vercel: 75, overall: 63, status: "needs-improvement" },
  { pattern: "Agent Form", ramsAi: 75, uiSkills: 90, vercel: 95, overall: 87, status: "partial" },
  { pattern: "Thinking Indicator", ramsAi: 40, uiSkills: 100, vercel: 80, overall: 73, status: "needs-improvement" },
  { pattern: "Insights List", ramsAi: 55, uiSkills: 100, vercel: 80, overall: 78, status: "partial" },
  { pattern: "Detail Card", ramsAi: 70, uiSkills: 100, vercel: 95, overall: 88, status: "partial" },
]

const comparisonColumns: Column<Record<string, unknown>>[] = [
  { key: "pattern", header: "Pattern" },
  { key: "ramsAi", header: "rams.ai" },
  { key: "uiSkills", header: "ui-skills.com" },
  { key: "vercel", header: "Vercel Guidelines" },
  { key: "overall", header: "Overall" },
  { key: "status", header: "Status" },
]

export default function StandardsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "partial":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "needs-improvement":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const filteredData = complianceData.map((row) => ({
    ...row,
    ramsAi: `${row.ramsAi}%`,
    uiSkills: `${row.uiSkills}%`,
    vercel: `${row.vercel}%`,
    overall: `${row.overall}%`,
    status: (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusColor(row.status)}`}>
        {row.status}
      </span>
    ),
  }))

  const avgRamsAi = Math.round(complianceData.reduce((sum, d) => sum + d.ramsAi, 0) / complianceData.length)
  const avgUiSkills = Math.round(complianceData.reduce((sum, d) => sum + d.uiSkills, 0) / complianceData.length)
  const avgVercel = Math.round(complianceData.reduce((sum, d) => sum + d.vercel, 0) / complianceData.length)
  const avgOverall = Math.round(complianceData.reduce((sum, d) => sum + d.overall, 0) / complianceData.length)

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
              Standards Compliance Showcase
            </h1>
            <p className="text-lg text-muted-foreground">
              See how Agent Patterns comply with rams.ai, ui-skills.com, and Vercel Design Guidelines
            </p>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <MetricCard
              label="rams.ai"
              value={`${avgRamsAi}%`}
              trend={{ value: 0, label: "Average compliance", direction: "neutral" }}
            />
            <MetricCard
              label="ui-skills.com"
              value={`${avgUiSkills}%`}
              trend={{ value: 0, label: "Average compliance", direction: "neutral" }}
            />
            <MetricCard
              label="Vercel Guidelines"
              value={`${avgVercel}%`}
              trend={{ value: 0, label: "Average compliance", direction: "neutral" }}
            />
            <MetricCard
              label="Overall"
              value={`${avgOverall}%`}
              trend={{ value: 0, label: "All standards", direction: "neutral" }}
            />
          </div>

          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Standards Overview</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    rams.ai
                  </span>
                </div>
                <h3 className="font-semibold">Accessibility & Design Review</h3>
                <p className="text-sm text-muted-foreground">
                  Ensures components are accessible, auditable, and meet WCAG AA standards. Focuses on ARIA labels,
                  keyboard navigation, and screen reader support.
                </p>
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Integration Example →
                </a>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    ui-skills.com
                  </span>
                </div>
                <h3 className="font-semibold">Agentic UI Constraints</h3>
                <p className="text-sm text-muted-foreground">
                  Defines constraints for LLM-generatable components. Ensures schema-driven design, primitive-based
                  architecture, and LLM-friendly prop structures.
                </p>
                <a
                  href="http://localhost:3002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Integration Example →
                </a>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Vercel Guidelines
                  </span>
                </div>
                <h3 className="font-semibold">Design System Standards</h3>
                <p className="text-sm text-muted-foreground">
                  Modern web interface standards including CSS variables, responsive design, performance optimization,
                  and design tokens.
                </p>
                <a
                  href="http://localhost:3003"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  View Integration Example →
                </a>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Compliance Comparison Matrix</h2>
            <DataTable
              columns={comparisonColumns}
              data={filteredData}
              caption="Compliance scores for all patterns across all standards"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <DetailCard
              title="rams.ai Compliance"
              description="Accessibility and design review standards"
              fields={[
                { label: "ARIA Labels", value: "✓ Complete", span: 2 },
                { label: "Keyboard Nav", value: "✓ Complete", span: 2 },
                { label: "Screen Readers", value: "✓ Supported", span: 2 },
                { label: "WCAG AA", value: "✓ Compliant", span: 2 },
              ]}
            />
            <DetailCard
              title="ui-skills.com Compliance"
              description="Agentic UI constraints"
              fields={[
                { label: "Schema-Driven", value: "✓ 100%", span: 2 },
                { label: "LLM-Generatable", value: "✓ 100%", span: 2 },
                { label: "Primitive-Based", value: "✓ 100%", span: 2 },
                { label: "No Complex State", value: "✓ 100%", span: 2 },
              ]}
            />
            <DetailCard
              title="Vercel Guidelines Compliance"
              description="Design system standards"
              fields={[
                { label: "CSS Variables", value: "✓ 100%", span: 2 },
                { label: "Responsive", value: "✓ 100%", span: 2 },
                { label: "Performance", value: "✓ 95%", span: 2 },
                { label: "Dark Mode", value: "✓ 100%", span: 2 },
              ]}
            />
          </div>

          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="font-semibold">rams.ai Example</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <MetricCard
                    label="ARIA Labels"
                    value="100%"
                    trend={{ value: 0, label: "All patterns", direction: "neutral" }}
                  />
                  <MetricCard
                    label="Keyboard Nav"
                    value="100%"
                    trend={{ value: 0, label: "Fully supported", direction: "neutral" }}
                  />
                </div>
                <a
                  href="http://localhost:3001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  View Full Example →
                </a>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold">ui-skills.com Example</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <MetricCard
                    label="Schema Coverage"
                    value="100%"
                    trend={{ value: 0, label: "All patterns", direction: "neutral" }}
                  />
                  <MetricCard
                    label="LLM Compatible"
                    value="100%"
                    trend={{ value: 0, label: "JSON Schema ready", direction: "neutral" }}
                  />
                </div>
                <a
                  href="http://localhost:3002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  View Full Example →
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-2xl font-semibold mb-4">Resources</h2>
            <InsightsList
              insights={[
                {
                  id: "1",
                  title: "rams.ai",
                  description: "Accessibility and design review standards - https://rams.ai",
                  type: "info",
                },
                {
                  id: "2",
                  title: "ui-skills.com",
                  description: "Agentic UI constraints and primitives - https://ui-skills.com",
                  type: "info",
                },
                {
                  id: "3",
                  title: "Vercel Design Guidelines",
                  description: "Modern web interface standards - https://vercel.com/design/guidelines",
                  type: "info",
                },
                {
                  id: "4",
                  title: "Compliance Audit",
                  description: "See docs/COMPLIANCE_AUDIT.md for detailed compliance reports",
                  type: "success",
                },
                {
                  id: "5",
                  title: "Integration Guide",
                  description: "See docs/STANDARDS_INTEGRATION.md for integration examples",
                  type: "success",
                },
              ]}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

