import { Timeline } from "./component"

export default function TimelineExample() {
  const events = [
    {
      id: "1",
      title: "Project Started",
      description: "Initial project kickoff meeting completed",
      timestamp: new Date("2024-01-15T10:00:00"),
      status: "completed" as const,
      user: "Alice Johnson",
    },
    {
      id: "2",
      title: "Design Phase",
      description: "UI/UX designs approved by stakeholders",
      timestamp: new Date("2024-01-20T14:30:00"),
      status: "completed" as const,
      user: "Bob Smith",
    },
    {
      id: "3",
      title: "Development",
      description: "Backend API development in progress",
      timestamp: new Date("2024-02-01T09:00:00"),
      status: "in-progress" as const,
      user: "Charlie Brown",
    },
    {
      id: "4",
      title: "Testing",
      description: "QA testing phase scheduled",
      timestamp: new Date("2024-02-15T10:00:00"),
      status: "pending" as const,
      user: "Diana Prince",
    },
  ]

  return (
    <div className="space-y-8 rounded-lg border border-border bg-background p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Vertical Timeline</h3>
        <Timeline events={events} />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Horizontal Timeline</h3>
        <Timeline events={events} orientation="horizontal" />
      </div>
    </div>
  )
}

