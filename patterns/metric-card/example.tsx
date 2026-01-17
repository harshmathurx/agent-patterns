"use client"

import { useRenderToolCall } from "@copilotkit/react-core"
import { MetricCard, type MetricCardProps } from "./component"
import { metricCardSchema } from "./schema"

export function MetricCardExample() {
  useRenderToolCall({
    toolName: "render_metric_card",
    argumentsSchema: metricCardSchema,
    render: (props: MetricCardProps) => {
      return <MetricCard {...props} />
    },
  })

  return null
}

// Example usage with sample data:
export function MetricCardSample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <MetricCard
        label="Total Revenue"
        value="$45,231"
        trend={{
          value: 20.1,
          label: "vs last month",
          direction: "up",
        }}
      />
      <MetricCard
        label="Active Users"
        value={2350}
        trend={{
          value: 12.5,
          label: "vs last month",
          direction: "up",
        }}
      />
      <MetricCard
        label="Conversion Rate"
        value="3.2%"
        trend={{
          value: 5.4,
          label: "vs last month",
          direction: "down",
        }}
      />
    </div>
  )
}


