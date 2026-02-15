"use client"

import { cn } from "@agent-patterns/core"

interface TimelineEvent {
  id: string
  title: string
  description?: string
  timestamp: string | Date
  icon?: React.ReactNode
  status?: "completed" | "in-progress" | "pending" | "cancelled"
  user?: string
}

interface TimelineProps {
  events: TimelineEvent[]
  orientation?: "vertical" | "horizontal"
  showTime?: boolean
  className?: string
}

export function Timeline({
  events,
  orientation = "vertical",
  showTime = true,
  className,
}: TimelineProps) {
  const statusColors = {
    completed: "border-green-500 bg-green-500",
    "in-progress": "border-blue-500 bg-blue-500 animate-pulse",
    pending: "border-gray-300 bg-gray-300",
    cancelled: "border-red-500 bg-red-500",
  }

  const formatTime = (timestamp: string | Date) => {
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp
    return date.toLocaleString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (orientation === "horizontal") {
    return (
      <div className={cn("overflow-x-auto", className)}>
        <div className="flex min-w-max gap-4 pb-4">
          {events.map((event, index) => (
            <div key={event.id} className="flex flex-col items-center">
              <div className="mb-2 flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2",
                    event.status ? statusColors[event.status] : "border-primary bg-primary"
                  )}
                >
                  {event.icon ? (
                    <div className="text-white">{event.icon}</div>
                  ) : (
                    <div className="h-3 w-3 rounded-full bg-white" />
                  )}
                </div>
                {index < events.length - 1 && (
                  <div className="h-0.5 w-32 bg-border" />
                )}
              </div>
              <div className="w-48 rounded-lg border border-border bg-card p-3">
                <h4 className="mb-1 text-sm font-semibold text-foreground">{event.title}</h4>
                {event.description && (
                  <p className="mb-2 text-xs text-muted-foreground">{event.description}</p>
                )}
                {showTime && (
                  <div className="text-xs text-muted-foreground">{formatTime(event.timestamp)}</div>
                )}
                {event.user && (
                  <div className="mt-2 text-xs text-muted-foreground">by {event.user}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          {/* Timeline Line */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2",
                event.status ? statusColors[event.status] : "border-primary bg-primary"
              )}
            >
              {event.icon ? (
                <div className="text-white">{event.icon}</div>
              ) : (
                <div className="h-3 w-3 rounded-full bg-white" />
              )}
            </div>
            {index < events.length - 1 && (
              <div className="h-full w-0.5 flex-1 bg-border" />
            )}
          </div>

          {/* Event Content */}
          <div className="flex-1 pb-8">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-2 flex items-start justify-between">
                <h4 className="text-sm font-semibold text-foreground">{event.title}</h4>
                {showTime && (
                  <div className="text-xs text-muted-foreground">{formatTime(event.timestamp)}</div>
                )}
              </div>
              {event.description && (
                <p className="mb-2 text-sm text-muted-foreground">{event.description}</p>
              )}
              {event.user && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-muted">
                    {event.user.charAt(0).toUpperCase()}
                  </div>
                  <span>{event.user}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

