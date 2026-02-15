# KanbanBoard

A drag-and-drop Kanban board for task and project management.

## Features

- 🎯 **Drag & Drop** - Move cards between columns
- 🏷️ **Labels & Tags** - Categorize cards
- 👤 **Assignees** - Track who's working on what
- 🚦 **Priority Levels** - Low, medium, high, urgent
- ⚠️ **WIP Limits** - Set work-in-progress limits per column
- 🎨 **Column Colors** - Visual column differentiation
- 📱 **Responsive** - Horizontal scroll on mobile
- 🎨 **Theme Compatible** - Works with all shadcn themes

## Usage

```tsx
import { KanbanBoard } from "@/patterns/kanban-board/component"

const columns = [
  { id: "todo", title: "To Do", color: "#94a3b8" },
  { id: "in-progress", title: "In Progress", limit: 3 },
  { id: "done", title: "Done" },
]

const cards = [
  {
    id: "1",
    columnId: "todo",
    title: "Task title",
    description: "Task description",
    priority: "high",
  },
]

<KanbanBoard
  columns={columns}
  cards={cards}
  onCardMove={(cardId, from, to) => console.log("Card moved")}
/>
```

## Perfect For

- Project management
- Sprint planning
- Workflow visualization
- Task tracking

