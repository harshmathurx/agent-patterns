"use client"

import { useRenderToolCall } from "@copilotkit/react-core"
import { Chart, type ChartProps } from "./component"
import { chartSchema } from "./schema"

export function ChartExample() {
  useRenderToolCall({
    toolName: "render_chart",
    argumentsSchema: chartSchema,
    render: (props: ChartProps) => {
      return <Chart {...props} />
    },
  })

  return null
}

// Example usage with sample data:
export function ChartSample() {
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
}

