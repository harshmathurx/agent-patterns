"use client"

import { useRenderToolCall } from "@copilotkit/react-core"
import { InsightsList, type InsightsListProps } from "./component"
import { insightsListSchema } from "./schema"

export function InsightsListExample() {
  useRenderToolCall({
    toolName: "render_insights_list",
    argumentsSchema: insightsListSchema,
    render: (props: InsightsListProps) => {
      return <InsightsList {...props} />
    },
  })

  return null
}

// Example usage with sample data:
export function InsightsListSample() {
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
}


