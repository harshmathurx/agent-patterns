"use client"

import { useRenderToolCall } from "@copilotkit/react-core"
import { ThinkingIndicator, type ThinkingIndicatorProps } from "./component"
import { thinkingIndicatorSchema } from "./schema"

export function ThinkingIndicatorExample() {
  useRenderToolCall({
    toolName: "render_thinking_indicator",
    argumentsSchema: thinkingIndicatorSchema,
    render: (props: ThinkingIndicatorProps) => {
      return <ThinkingIndicator {...props} />
    },
  })

  return null
}

// Example usage:
export function ThinkingIndicatorSample() {
  return (
    <div className="space-y-4">
      <ThinkingIndicator message="Processing your request..." variant="dots" />
      <ThinkingIndicator message="Analyzing data..." variant="pulse" />
      <ThinkingIndicator message="Loading..." variant="spinner" />
    </div>
  )
}

