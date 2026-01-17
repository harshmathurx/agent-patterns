"use client"

import { useState } from "react"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { ThinkingIndicator } from "@agent-patterns/thinking-indicator/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import { metricCardSchema } from "@agent-patterns/metric-card/schema"
import { dataTableSchema } from "@agent-patterns/data-table/schema"
import { agentFormSchema } from "@agent-patterns/agent-form/schema"
import type { Column } from "@agent-patterns/data-table/component"
import { z } from "zod"

interface ConstraintCheck {
  constraint: string
  status: "pass" | "fail"
  description: string
}

export default function UiSkillsIntegrationPage() {
  const [constraintChecks, setConstraintChecks] = useState<ConstraintCheck[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [llmGeneratedData, setLlmGeneratedData] = useState<string>("")

  const ticketColumns: Column<{ id: string; customer: string; issue: string; status: string }>[] = [
    { key: "id", header: "Ticket ID" },
    { key: "customer", header: "Customer" },
    { key: "issue", header: "Issue" },
    { key: "status", header: "Status" },
  ]

  const tickets = [
    { id: "#1234", customer: "John Doe", issue: "Payment issue", status: "Open" },
    { id: "#1235", customer: "Jane Smith", issue: "Account access", status: "In Progress" },
  ]

  const handleFormSubmit = (data: Record<string, unknown>) => {
    console.log("Form submitted:", data)
  }

  const validateConstraints = () => {
    setIsValidating(true)

    // Simulate ui-skills.com constraint validation
    setTimeout(() => {
      const checks: ConstraintCheck[] = [
        {
          constraint: "Schema-Driven",
          status: "pass",
          description: "All patterns have Zod schemas with .describe() for LLM understanding",
        },
        {
          constraint: "LLM-Generatable",
          status: "pass",
          description: "Props are clearly defined and typed, no complex structures",
        },
        {
          constraint: "Primitive-Based",
          status: "pass",
          description: "Components use simple, composable primitives",
        },
        {
          constraint: "No Complex State",
          status: "pass",
          description: "Minimal state management, predictable behavior",
        },
        {
          constraint: "JSON Schema Compatible",
          status: "pass",
          description: "All schemas can be converted to JSON Schema for LLM tools",
        },
      ]
      setConstraintChecks(checks)
      setIsValidating(false)
    }, 1500)
  }

  const generateWithLLM = () => {
    // Simulate LLM generating component props from schema
    const exampleData = {
      label: "Revenue",
      value: 125000,
      trend: {
        value: 12.5,
        label: "vs last month",
        direction: "up" as const,
      },
    }

    // Validate against schema
    const result = metricCardSchema.safeParse(exampleData)
    
    if (result.success) {
      setLlmGeneratedData(JSON.stringify(result.data, null, 2))
    } else {
      setLlmGeneratedData(`Validation Error: ${result.error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-foreground">ui-skills.com Integration Example</h1>
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Agentic UI Constraints
          </span>
        </div>
        <p className="mt-2 text-muted-foreground">
          This example demonstrates how Agent Patterns follow{" "}
          <a
            href="https://ui-skills.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            ui-skills.com
          </a>{" "}
          constraints for LLM-generatable agentic UI components.
        </p>
      </div>

      <div className="mb-6 flex gap-4">
        <button
          onClick={validateConstraints}
          disabled={isValidating}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? "Validating..." : "Validate Constraints"}
        </button>
        <button
          onClick={generateWithLLM}
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
        >
          Simulate LLM Generation
        </button>
      </div>

      {isValidating && (
        <div className="mb-6">
          <ThinkingIndicator message="Validating ui-skills.com constraints..." variant="dots" />
        </div>
      )}

      {constraintChecks.length > 0 && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Constraint Validation Results</h2>
          <div className="space-y-3">
            {constraintChecks.map((check, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-md border border-border"
              >
                <span
                  className={`mt-1 px-2 py-1 text-xs font-semibold rounded ${
                    check.status === "pass"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  }`}
                >
                  {check.status === "pass" ? "✓" : "✗"}
                </span>
                <div className="flex-1">
                  <h3 className="font-semibold">{check.constraint}</h3>
                  <p className="text-sm text-muted-foreground">{check.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {llmGeneratedData && (
        <div className="mb-8 rounded-lg border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">LLM-Generated Data (Validated)</h2>
          <pre className="p-4 bg-muted rounded-md overflow-x-auto text-sm">
            <code>{llmGeneratedData}</code>
          </pre>
        </div>
      )}

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Schema-Driven Components</h2>
          <div className="grid gap-4 md:grid-cols-4">
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
            <MetricCard
              label="Type Safety"
              value="100%"
              trend={{ value: 0, label: "Zod validated", direction: "neutral" }}
            />
            <MetricCard
              label="Primitives"
              value="100%"
              trend={{ value: 0, label: "Simple & composable", direction: "neutral" }}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <DataTable
              columns={ticketColumns}
              data={tickets}
              caption="Data table with schema-driven column definitions"
            />
          </div>
          <div>
            <DetailCard
              title="ui-skills.com Compliance"
              description="Constraint validation results"
              fields={[
                { label: "Schema-Driven", value: "✓ Pass", span: 2 },
                { label: "LLM-Generatable", value: "✓ Pass", span: 2 },
                { label: "Primitive-Based", value: "✓ Pass", span: 2 },
                { label: "No Complex State", value: "✓ Pass", span: 2 },
              ]}
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AgentForm
            title="Schema-Validated Form"
            description="Form fields defined by Zod schema, LLM can generate valid props"
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
                name: "category",
                label: "Category",
                type: "select",
                options: [
                  { label: "Technical", value: "technical" },
                  { label: "Billing", value: "billing" },
                  { label: "Support", value: "support" },
                ],
                required: true,
              },
            ]}
            onSubmit={handleFormSubmit}
          />
          <div className="space-y-4">
            <InsightsList
              title="ui-skills.com Constraints"
              insights={[
                {
                  id: "1",
                  title: "Schema-Driven",
                  description: "Every pattern has a Zod schema with .describe() for LLM understanding",
                  type: "success",
                },
                {
                  id: "2",
                  title: "LLM-Generatable",
                  description: "Props are clearly defined, typed, and can be generated from schema alone",
                  type: "success",
                },
                {
                  id: "3",
                  title: "Primitive-Based",
                  description: "Components use simple, composable primitives, no complex abstractions",
                  type: "success",
                },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-12 rounded-lg border border-border bg-card p-6">
        <h2 className="text-xl font-semibold mb-4">How to Use with LLMs</h2>
        <div className="space-y-4 text-sm text-muted-foreground">
          <div>
            <h3 className="font-semibold text-foreground mb-2">1. Schema Export</h3>
            <p>All patterns export Zod schemas that can be used with LLM tools:</p>
            <pre className="mt-2 p-3 bg-muted rounded-md overflow-x-auto">
              <code>{`import { metricCardSchema } from "@agent-patterns/metric-card/schema"

// Use with CopilotKit or similar
useRenderToolCall({
  toolName: "render_metric_card",
  argumentsSchema: metricCardSchema,
  render: (props) => <MetricCard {...props} />
})`}</code>
            </pre>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">2. JSON Schema Conversion</h3>
            <p>Zod schemas can be converted to JSON Schema for LLM tool definitions:</p>
            <pre className="mt-2 p-3 bg-muted rounded-md overflow-x-auto">
              <code>{`import { zodToJsonSchema } from "zod-to-json-schema"

const jsonSchema = zodToJsonSchema(metricCardSchema)
// Use jsonSchema in LLM tool definitions`}</code>
            </pre>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-2">3. Constraint Validation</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>All props are describable in schemas</li>
              <li>No complex state management in components</li>
              <li>Clear prop interfaces</li>
              <li>Minimal dependencies</li>
              <li>Uses standard HTML primitives</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

