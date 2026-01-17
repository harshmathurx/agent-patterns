"use client"

import { useRenderToolCall } from "@copilotkit/react-core"
import { AgentForm, type AgentFormProps } from "./component"
import { agentFormSchema } from "./schema"

export function AgentFormExample() {
  useRenderToolCall({
    toolName: "render_agent_form",
    argumentsSchema: agentFormSchema,
    render: (props: AgentFormProps) => {
      return <AgentForm {...props} />
    },
  })

  return null
}

// Example usage with sample data:
export function AgentFormSample() {
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
      onSubmit={(data) => console.log("Form submitted:", data)}
    />
  )
}


