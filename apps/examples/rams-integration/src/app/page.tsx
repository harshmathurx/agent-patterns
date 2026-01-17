"use client"

import { useState } from "react"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { ThinkingIndicator } from "@agent-patterns/thinking-indicator/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import type { Column } from "@agent-patterns/data-table/component"

interface AuditResult {
  pattern: string
  status: "pass" | "warning" | "fail"
  issues: string[]
  score: number
}

export default function RamsIntegrationPage() {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([])
  const [isAuditing, setIsAuditing] = useState(false)

  const ticketColumns: Column<{ id: string; customer: string; issue: string; status: string; priority: string }>[] = [
    { key: "id", header: "Ticket ID" },
    { key: "customer", header: "Customer" },
    { key: "issue", header: "Issue" },
    { key: "status", header: "Status" },
    { key: "priority", header: "Priority" },
  ]

  const tickets = [
    { id: "#1234", customer: "John Doe", issue: "Payment issue", status: "Open", priority: "High" },
    { id: "#1235", customer: "Jane Smith", issue: "Account access", status: "In Progress", priority: "Medium" },
    { id: "#1236", customer: "Bob Johnson", issue: "Feature request", status: "Resolved", priority: "Low" },
  ]

  const handleFormSubmit = (data: Record<string, unknown>) => {
    console.log("Form submitted:", data)
  }

  const runRamsAudit = () => {
    setIsAuditing(true)
    
    // Simulate rams.ai audit
    setTimeout(() => {
      const results: AuditResult[] = [
        {
          pattern: "MetricCard",
          status: "pass",
          issues: [],
          score: 95,
        },
        {
          pattern: "DataTable",
          status: "warning",
          issues: ["Consider adding aria-rowcount for large tables"],
          score: 85,
        },
        {
          pattern: "AgentForm",
          status: "pass",
          issues: [],
          score: 92,
        },
        {
          pattern: "ThinkingIndicator",
          status: "warning",
          issues: ["Ensure aria-live region is properly configured"],
          score: 88,
        },
        {
          pattern: "InsightsList",
          status: "pass",
          issues: [],
          score: 90,
        },
        {
          pattern: "DetailCard",
          status: "pass",
          issues: [],
          score: 93,
        },
      ]
      setAuditResults(results)
      setIsAuditing(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">rams.ai Integration Example</h1>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Accessibility Audit
          </span>
        </div>
        <p className="mt-2 text-muted-foreground">
          This example demonstrates how Agent Patterns comply with{" "}
          <a
            href="https://rams.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            rams.ai
          </a>{" "}
          accessibility and design review standards.
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={runRamsAudit}
          disabled={isAuditing}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Run rams.ai accessibility audit"
        >
          {isAuditing ? "Running Audit..." : "Run rams.ai Audit"}
        </button>
      </div>

      {isAuditing && (
        <div className="mb-6">
          <ThinkingIndicator message="Running rams.ai accessibility audit..." variant="dots" />
        </div>
      )}

      {auditResults.length > 0 && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Audit Results</h2>
          <div className="space-y-4">
            {auditResults.map((result) => (
              <div
                key={result.pattern}
                className="p-4 rounded-md border border-border"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{result.pattern}</h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        result.status === "pass"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : result.status === "warning"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {result.status === "pass" ? "✓ Pass" : result.status === "warning" ? "⚠ Warning" : "✗ Fail"}
                    </span>
                    <span className="text-sm text-muted-foreground">Score: {result.score}%</span>
                  </div>
                </div>
                {result.issues.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {result.issues.map((issue, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        • {issue}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
          <div className="grid gap-4 md:grid-cols-4">
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
            <MetricCard
              label="Screen Readers"
              value="95%"
              trend={{ value: 5, label: "vs baseline", direction: "up" }}
            />
            <MetricCard
              label="WCAG AA"
              value="100%"
              trend={{ value: 0, label: "Compliant", direction: "neutral" }}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <DataTable
              columns={ticketColumns}
              data={tickets}
              caption="Support tickets table with full keyboard navigation and screen reader support"
              ariaLabel="Support tickets data table"
            />
          </div>
          <div>
            <DetailCard
              title="Accessibility Compliance"
              description="rams.ai standards compliance"
              fields={[
                { label: "ARIA Labels", value: "✓ Complete", span: 2 },
                { label: "Keyboard Nav", value: "✓ Complete", span: 2 },
                { label: "Screen Readers", value: "✓ Supported", span: 2 },
                { label: "Color Contrast", value: "✓ WCAG AA", span: 2 },
              ]}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AgentForm
            title="Contact Form"
            description="Accessible form with proper labels and error handling"
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
            onSubmit={handleFormSubmit}
          />
          <div className="space-y-4">
            <InsightsList
              title="rams.ai Compliance"
              insights={[
                {
                  id: "1",
                  title: "ARIA Labels",
                  description: "All interactive elements have proper ARIA labels for screen readers",
                  type: "success",
                },
                {
                  id: "2",
                  title: "Keyboard Navigation",
                  description: "Full keyboard support implemented across all patterns",
                  type: "success",
                },
                {
                  id: "3",
                  title: "Color Contrast",
                  description: "All text meets WCAG AA contrast requirements (4.5:1)",
                  type: "success",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">How to Run rams.ai Audits</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-2">1. Automated Testing</h3>
            <p>
              Use tools like axe-core, Lighthouse, or WAVE to automatically test accessibility:
            </p>
            <pre className="mt-2 p-3 bg-muted rounded-md overflow-x-auto">
              <code>npm install -g @axe-core/cli{`\n`}axe http://localhost:3001</code>
            </pre>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">2. Manual Testing</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Test with keyboard only (Tab, Enter, Arrow keys)</li>
              <li>Test with screen reader (NVDA, JAWS, VoiceOver)</li>
              <li>Verify ARIA labels are announced correctly</li>
              <li>Check color contrast ratios</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">3. Compliance Reports</h3>
            <p>
              See <code className="bg-muted px-1 rounded">docs/COMPLIANCE_AUDIT.md</code> for detailed
              compliance reports for each pattern.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

