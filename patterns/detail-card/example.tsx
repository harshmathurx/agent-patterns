"use client"

import { useRenderToolCall } from "@copilotkit/react-core"
import { DetailCard, type DetailCardProps } from "./component"
import { detailCardSchema } from "./schema"

export function DetailCardExample() {
  useRenderToolCall({
    toolName: "render_detail_card",
    argumentsSchema: detailCardSchema,
    render: (props: DetailCardProps) => {
      return <DetailCard {...props} />
    },
  })

  return null
}

// Example usage with sample data:
export function DetailCardSample() {
  return (
    <DetailCard
      title="User Details"
      description="Information about the selected user"
      fields={[
        { label: "Name", value: "John Doe" },
        { label: "Email", value: "john@example.com" },
        { label: "Role", value: "Admin" },
        { label: "Status", value: "Active" },
        { label: "Bio", value: "Software engineer with 5 years of experience", span: 2 },
      ]}
    />
  )
}


