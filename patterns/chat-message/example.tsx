import React from "react"
import { ChatMessage } from "./component"

export default function ChatMessageExample() {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Chat Message Examples</h3>

      <div className="space-y-1">
        <ChatMessage
          role="user"
          content="Hello! Can you help me analyze this data?"
          timestamp={new Date()}
          status="sent"
        />

        <ChatMessage
          role="assistant"
          content="Of course! I'd be happy to help you analyze your data. Could you share more details about what you're looking for?"
          timestamp={new Date()}
        />

        <ChatMessage
          role="user"
          content="I need to understand the sales trends from Q4."
          timestamp={new Date()}
          status="sent"
        />

        <ChatMessage
          role="assistant"
          content="Analyzing Q4 sales data..."
          timestamp={new Date()}
          isStreaming={true}
        />
      </div>

      <div className="mt-8 border-t border-border pt-4">
        <h4 className="mb-3 text-sm font-semibold text-foreground">With Actions</h4>
        <ChatMessage
          role="assistant"
          content="I found 3 insights in your sales data. Would you like me to create a dashboard?"
          timestamp={new Date()}
          actions={[
            { label: "Create Dashboard", onClick: () => alert("Creating dashboard...") },
            { label: "Show Details", onClick: () => alert("Showing details...") },
            { label: "Export Data", onClick: () => alert("Exporting...") },
          ]}
        />
      </div>

      <div className="mt-8 border-t border-border pt-4">
        <h4 className="mb-3 text-sm font-semibold text-foreground">System Message</h4>
        <ChatMessage role="system" content="Chat session started" />
      </div>

      <div className="mt-8 border-t border-border pt-4">
        <h4 className="mb-3 text-sm font-semibold text-foreground">Error State</h4>
        <ChatMessage
          role="user"
          content="Can you process this request?"
          timestamp={new Date()}
          status="error"
        />
      </div>
    </div>
  )
}

