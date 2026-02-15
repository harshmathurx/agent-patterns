"use client"

import { KanbanBoard } from "./component"

export default function KanbanBoardExample() {
  const columns = [
    { id: "todo", title: "To Do", color: "#94a3b8", limit: 5 },
    { id: "in-progress", title: "In Progress", color: "#3b82f6", limit: 3 },
    { id: "review", title: "Review", color: "#f59e0b" },
    { id: "done", title: "Done", color: "#10b981" },
  ]

  const cards = [
    {
      id: "1",
      columnId: "todo",
      title: "Design new landing page",
      description: "Create mockups for the new landing page design",
      labels: ["design", "high-priority"],
      assignee: "Alice",
      priority: "high" as const,
    },
    {
      id: "2",
      columnId: "todo",
      title: "Fix login bug",
      description: "Users cannot log in with Google OAuth",
      labels: ["bug", "auth"],
      assignee: "Bob",
      priority: "urgent" as const,
    },
    {
      id: "3",
      columnId: "in-progress",
      title: "Implement dark mode",
      description: "Add dark mode support across all pages",
      labels: ["feature", "ui"],
      assignee: "Charlie",
      priority: "medium" as const,
    },
    {
      id: "4",
      columnId: "in-progress",
      title: "Update API documentation",
      description: "Document all new endpoints from v2",
      labels: ["docs"],
      assignee: "Diana",
      priority: "low" as const,
    },
    {
      id: "5",
      columnId: "review",
      title: "Add user profile page",
      description: "New page for user profile management",
      labels: ["feature", "ui"],
      assignee: "Eve",
      priority: "medium" as const,
    },
    {
      id: "6",
      columnId: "done",
      title: "Setup CI/CD pipeline",
      description: "Configure GitHub Actions for automated testing",
      labels: ["devops"],
      assignee: "Frank",
      priority: "high" as const,
    },
  ]

  return (
    <div className="space-y-4 rounded-lg border border-border bg-background p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Kanban Board Example</h3>

      <div className="rounded-lg border border-blue-200 bg-blue-50/80 p-3 dark:border-blue-800 dark:bg-blue-950/80">
        <p className="text-xs text-blue-950 dark:text-blue-50">
          <strong className="font-semibold">Try it:</strong> Drag and drop cards between columns!
          The "In Progress" column has a WIP limit of 3 cards.
        </p>
      </div>

      <KanbanBoard
        columns={columns}
        cards={cards}
        onCardMove={(cardId, from, to) => {
          console.log(`Card ${cardId} moved from ${from} to ${to}`)
        }}
        onCardClick={(card) => {
          alert(`Clicked: ${card.title}`)
        }}
      />
    </div>
  )
}

