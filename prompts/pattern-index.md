# Agent Patterns - Complete Schema Index

This document contains all Zod schemas for every pattern in the Agent Patterns library. Use this as a quick reference when generating UI components.

## Table of Contents

1. [MetricCard](#metriccard)
2. [Chart](#chart)
3. [DataTable](#datatable)
4. [AgentForm](#agentform)
5. [DetailCard](#detailcard)
6. [InsightsList](#insightslist)
7. [StreamingIndicator](#streamingindicator)
8. [ChatMessage](#chatmessage)
9. [CommandPalette](#commandpalette)
10. [KanbanBoard](#kanbanboard)
11. [Timeline](#timeline)
12. [Sidebar](#sidebar)
13. [StatsGrid](#statsgrid)
14. [ConfirmDialog](#confirmdialog)
15. [CodeBlock](#codeblock)

---

## MetricCard

**Purpose**: Display key performance indicators with trends and comparisons

**Import**: `import { metricCardSchema, type MetricCardProps } from '@/patterns/metric-card/schema'`

**Schema**:
```typescript
z.object({
  label: z.string()
    .describe("Display label for the metric (e.g., 'Total Revenue', 'Active Users')"),
  
  value: z.union([z.string(), z.number()])
    .describe("The metric value to display (e.g., '$45,231' or 1250)"),
  
  trend: z.object({
    value: z.number()
      .describe("Percentage change value (can be positive, negative, or zero)"),
    label: z.string()
      .describe("Trend time period description (e.g., 'vs last month', 'from yesterday')"),
    direction: z.enum(["up", "down", "neutral"])
      .describe("Trend direction: 'up' (green with ↑), 'down' (red with ↓), 'neutral' (gray with →)")
  }).optional(),
  
  icon: z.any().optional()
    .describe("Optional React icon component displayed in the top-right corner"),
  
  sparkline: z.array(z.number()).optional()
    .describe("Array of numbers for mini line chart. Example: [10, 15, 13, 18, 20, 25]"),
  
  loading: z.boolean().default(false)
    .describe("Show loading skeleton state"),
  
  comparison: z.object({
    value: z.union([z.string(), z.number()])
      .describe("Comparison metric value"),
    label: z.string()
      .describe("Comparison time period label (e.g., 'last month', 'last year')")
  }).optional(),
  
  size: z.enum(["sm", "md", "lg"]).default("md")
    .describe("Card size: 'sm' (compact), 'md' (standard), 'lg' (large)"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  label: "Total Revenue",
  value: "$45,231",
  trend: { value: 12.5, direction: "up", label: "vs last month" },
  sparkline: [10, 15, 13, 18, 20, 25]
}
```

---

## Chart

**Purpose**: Data visualization using Recharts library

**Import**: `import { chartSchema, type ChartProps } from '@/patterns/chart/schema'`

**Schema**:
```typescript
z.object({
  title: z.string().optional()
    .describe("Title displayed above the chart"),
  
  data: z.array(z.object({
    label: z.string()
      .describe("Label for this data point (e.g., month name, category)"),
    value: z.number()
      .describe("Numeric value for this data point"),
    color: z.string().optional()
      .describe("Custom color. Use CSS color or HSL variables like 'hsl(var(--primary))'")
  })).min(1),
  
  type: z.enum(["bar", "line", "area", "pie", "donut"]).default("bar")
    .describe("Chart type: bar (comparisons), line (trends), area (cumulative), pie/donut (proportions)"),
  
  showLegend: z.boolean().default(true),
  
  showGrid: z.boolean().default(true)
    .describe("Display grid lines (for bar/line/area only)"),
  
  colors: z.array(z.string()).optional()
    .describe("Array of colors for chart elements. Use HSL variables or direct colors"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  title: "Monthly Revenue",
  type: "bar",
  data: [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1900 },
    { label: "Mar", value: 1500 }
  ],
  showLegend: false
}
```

---

## DataTable

**Purpose**: Advanced data tables with sorting, filtering, pagination, and selection

**Import**: `import { dataTableSchema, type DataTableProps } from '@/patterns/data-table/schema'`

**Schema**:
```typescript
z.object({
  columns: z.array(z.object({
    key: z.string()
      .describe("Column identifier matching data object keys"),
    header: z.string()
      .describe("Display text in column header"),
    accessor: z.function().args(z.record(z.any())).returns(z.any()).optional()
      .describe("Function to transform row data before display"),
    className: z.string().optional(),
    sortable: z.boolean().optional().default(true)
      .describe("Whether column can be sorted. Click header to sort")
  })),
  
  data: z.array(z.record(z.any()))
    .describe("Array of data objects. Keys should match column 'key' values"),
  
  emptyMessage: z.string().optional().default("No data available"),
  
  caption: z.string().optional()
    .describe("Accessible caption describing table purpose"),
  
  ariaLabel: z.string().optional(),
  
  searchable: z.boolean().optional().default(false)
    .describe("Enable search/filter across all columns"),
  
  searchPlaceholder: z.string().optional().default("Search..."),
  
  pagination: z.boolean().optional().default(false),
  
  pageSize: z.number().optional().default(10)
    .describe("Rows per page. Common: 10, 25, 50, 100"),
  
  selectable: z.boolean().optional().default(false)
    .describe("Enable row selection with checkboxes and select-all"),
  
  onSelectionChange: z.function().args(z.array(z.record(z.any()))).returns(z.void()).optional()
    .describe("Callback when selection changes. Receives array of selected rows"),
  
  loading: z.boolean().optional().default(false)
    .describe("Show loading skeleton with animated placeholder rows"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  columns: [
    { key: "id", header: "ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" }
  ],
  data: [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ],
  searchable: true,
  pagination: true,
  pageSize: 10,
  selectable: true
}
```

---

## AgentForm

**Purpose**: Forms with Zod validation and multiple field types

**Import**: `import { agentFormSchema, type AgentFormProps } from '@/patterns/agent-form/schema'`

**Schema**:
```typescript
z.object({
  title: z.string().optional(),
  
  description: z.string().optional(),
  
  fields: z.array(z.object({
    name: z.string()
      .describe("Unique field identifier used as key in form data"),
    label: z.string(),
    type: z.enum([
      "text", "email", "number", "textarea", "select", 
      "checkbox", "date", "password", "radio", "toggle", "file"
    ]),
    placeholder: z.string().optional(),
    required: z.boolean().optional().default(false)
      .describe("Shows asterisk (*) and validates on submit"),
    options: z.array(z.object({
      label: z.string(),
      value: z.string()
    })).optional()
      .describe("Required for 'select' and 'radio' types"),
    defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
    validation: z.any().optional()
      .describe("Optional Zod schema for field-level validation"),
    description: z.string().optional()
      .describe("Helper text shown below field")
  })).min(1),
  
  onSubmit: z.function().args(z.record(z.any())).returns(z.union([z.void(), z.promise(z.void())])).optional()
    .describe("Callback called with valid form data"),
  
  submitLabel: z.string().default("Submit"),
  
  schema: z.any().optional()
    .describe("Zod schema for form-level validation. LLMs can generate both fields AND validation!"),
  
  showValidationErrors: z.boolean().default(true),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  title: "User Registration",
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "role", label: "Role", type: "select", 
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" }
      ]
    }
  ],
  submitLabel: "Register",
  onSubmit: (data) => console.log(data)
}
```

---

## DetailCard

**Purpose**: Display detailed entity information in a grid layout

**Import**: `import { detailCardSchema, type DetailCardProps } from '@/patterns/detail-card/schema'`

**Schema**:
```typescript
z.object({
  title: z.string().optional(),
  
  description: z.string().optional(),
  
  fields: z.array(z.object({
    label: z.string()
      .describe("Field label (e.g., 'Email', 'Created Date')"),
    value: z.any()
      .describe("Value to display. Can be string, number, or React element"),
    span: z.enum([1, 2]).optional().default(1)
      .describe("Column span: 1 (single) or 2 (full width)"),
    copyable: z.boolean().optional().default(false)
      .describe("Show copy button next to value (string values only)"),
    badge: z.object({
      text: z.string(),
      variant: z.enum(["default", "success", "warning", "error"])
        .describe("default (gray), success (green), warning (yellow), error (red)")
    }).optional()
  })).min(1),
  
  actions: z.any().optional()
    .describe("React node for action buttons in header"),
  
  editable: z.boolean().default(false)
    .describe("Enable edit mode with Edit button. Allows inline editing of string values"),
  
  onEdit: z.function().args(z.record(z.any())).returns(z.void()).optional()
    .describe("Callback when Save clicked in edit mode"),
  
  loading: z.boolean().default(false),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  title: "User Details",
  fields: [
    { label: "Name", value: "John Doe" },
    { label: "Email", value: "john@example.com", copyable: true },
    { label: "Status", value: "Active", badge: { text: "Active", variant: "success" } },
    { label: "Bio", value: "Software engineer", span: 2 }
  ],
  editable: true,
  onEdit: (data) => console.log("Updated:", data)
}
```

---

## InsightsList

**Purpose**: Display AI-generated insights with priorities and actions

**Import**: `import { insightsListSchema, type InsightsListProps } from '@/patterns/insights-list/schema'`

**Schema**:
```typescript
z.object({
  insights: z.array(z.object({
    id: z.string(),
    title: z.string()
      .describe("Insight headline"),
    description: z.string()
      .describe("Detailed explanation"),
    type: z.enum(["info", "warning", "success", "error"]).optional().default("info")
      .describe("info (blue), warning (yellow), success (green), error (red)"),
    icon: z.any().optional()
      .describe("Custom icon. Uses default based on type if not provided"),
    priority: z.enum(["high", "medium", "low"]).optional()
      .describe("Priority badge. Use with sortByPriority for automatic sorting"),
    collapsible: z.boolean().optional().default(false)
      .describe("Can be collapsed/expanded for long descriptions"),
    actions: z.array(z.object({
      label: z.string(),
      onClick: z.function().returns(z.void())
    })).optional()
      .describe("Action buttons below description")
  })),
  
  emptyMessage: z.string().default("No insights available"),
  
  showFilters: z.boolean().default(false)
    .describe("Show filter buttons: All, Info, Warnings, Success, Errors"),
  
  sortByPriority: z.boolean().default(false)
    .describe("Auto-sort: high → medium → low"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  insights: [
    {
      id: "1",
      title: "Revenue growth accelerating",
      description: "Monthly revenue increased by 14.2%",
      type: "success",
      priority: "high",
      actions: [
        { label: "View Details", onClick: () => {} }
      ]
    }
  ],
  sortByPriority: true,
  showFilters: true
}
```

---

## StreamingIndicator

**Purpose**: Show processing states, LLM streaming, progress

**Import**: `import { streamingIndicatorSchema, type StreamingIndicatorProps } from '@/patterns/streaming-indicator/schema'`

**Schema**:
```typescript
z.object({
  message: z.string().optional()
    .describe("Message next to indicator (e.g., 'Analyzing data...', 'Generating response...')"),
  
  variant: z.enum(["dots", "pulse", "spinner", "typing", "progress"]).default("dots")
    .describe(
      "dots: bouncing dots (general loading)\n" +
      "pulse: pulsing circles (processing)\n" +
      "spinner: rotating spinner (traditional)\n" +
      "typing: 'AI is typing...' (chat/LLM)\n" +
      "progress: step-by-step with checkmarks (requires 'steps')"
    ),
  
  steps: z.array(z.object({
    label: z.string()
      .describe("Step description (e.g., 'Analyzing...', 'Generating...')"),
    status: z.enum(["pending", "active", "completed"])
      .describe("pending (gray circle), active (spinning), completed (green checkmark)")
  })).optional()
    .describe("Array of steps for 'progress' variant"),
  
  tokenCount: z.number().optional()
    .describe("Number of tokens processed/generated by LLM"),
  
  showTokenCounter: z.boolean().default(false)
    .describe("Show token counter (only if tokenCount provided)"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  variant: "progress",
  steps: [
    { label: "Analyzing request...", status: "completed" },
    { label: "Generating response...", status: "active" },
    { label: "Formatting output...", status: "pending" }
  ],
  tokenCount: 1247,
  showTokenCounter: true
}
```

---

## ChatMessage

**Purpose**: Chat message bubbles with streaming and actions

**Import**: `import { chatMessageSchema, type ChatMessage } from '@/patterns/chat-message/schema'`

**Schema**:
```typescript
z.object({
  role: z.enum(["user", "assistant", "system"])
    .describe("user (human), assistant (AI), system (notifications)"),
  
  content: z.string()
    .describe("Message text content"),
  
  avatar: z.string().optional()
    .describe("URL or initials for avatar"),
  
  timestamp: z.union([z.string(), z.date()]).optional(),
  
  isStreaming: z.boolean().optional()
    .describe("Show typewriter effect for streaming"),
  
  status: z.enum(["sending", "sent", "error"]).optional()
    .describe("Message delivery status"),
  
  actions: z.array(z.object({
    label: z.string(),
    onClick: z.function().optional()
  })).optional()
    .describe("Action buttons below message"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  role: "assistant",
  content: "I can help you analyze that data. Here's what I found...",
  avatar: "AI",
  timestamp: "10:32 AM",
  actions: [
    { label: "Copy", onClick: () => {} },
    { label: "Export", onClick: () => {} }
  ]
}
```

---

## CommandPalette

**Purpose**: ⌘K command menu for quick actions

**Import**: `import { commandPaletteSchema, type CommandPalette } from '@/patterns/command-palette/schema'`

**Schema**:
```typescript
z.object({
  isOpen: z.boolean(),
  
  onClose: z.function().optional(),
  
  placeholder: z.string().optional()
    .describe("Search input placeholder"),
  
  commands: z.array(z.object({
    id: z.string(),
    label: z.string()
      .describe("Command display name"),
    description: z.string().optional(),
    icon: z.any().optional(),
    keywords: z.array(z.string()).optional()
      .describe("Keywords for search"),
    shortcut: z.string().optional()
      .describe("Keyboard shortcut display (e.g., '⌘K')"),
    onSelect: z.function().optional(),
    group: z.string().optional()
      .describe("Command group/category")
  })),
  
  groups: z.array(z.object({
    id: z.string(),
    label: z.string()
  })).optional()
    .describe("Command groups for organization"),
  
  recentCommands: z.array(z.string()).optional()
    .describe("Recently used command IDs"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  isOpen: true,
  onClose: () => {},
  commands: [
    {
      id: "new",
      label: "New Document",
      description: "Create a new document",
      shortcut: "⌘N",
      group: "actions",
      onSelect: () => {}
    }
  ]
}
```

---

## KanbanBoard

**Purpose**: Drag-and-drop kanban boards

**Import**: `import { kanbanBoardSchema, type KanbanBoard } from '@/patterns/kanban-board/schema'`

**Schema**:
```typescript
z.object({
  columns: z.array(z.object({
    id: z.string(),
    title: z.string(),
    color: z.string().optional()
      .describe("Column color accent"),
    limit: z.number().optional()
      .describe("WIP limit for column")
  })),
  
  cards: z.array(z.object({
    id: z.string(),
    columnId: z.string()
      .describe("Current column ID"),
    title: z.string(),
    description: z.string().optional(),
    labels: z.array(z.string()).optional()
      .describe("Card labels/tags"),
    assignee: z.string().optional()
      .describe("Assigned user name or avatar"),
    priority: z.enum(["low", "medium", "high", "urgent"]).optional()
  })),
  
  onCardMove: z.function().optional()
    .describe("Callback when card moved between columns"),
  
  onCardClick: z.function().optional(),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  columns: [
    { id: "todo", title: "To Do" },
    { id: "progress", title: "In Progress", limit: 3 },
    { id: "done", title: "Done" }
  ],
  cards: [
    {
      id: "1",
      columnId: "todo",
      title: "Design landing page",
      priority: "high",
      assignee: "John"
    }
  ],
  onCardMove: (cardId, newColumnId) => {}
}
```

---

## Timeline

**Purpose**: Event feeds and activity logs

**Import**: `import { timelineSchema, type Timeline } from '@/patterns/timeline/schema'`

**Schema**:
```typescript
z.object({
  events: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string().optional(),
    timestamp: z.union([z.string(), z.date()]),
    icon: z.any().optional(),
    status: z.enum(["completed", "in-progress", "pending", "cancelled"]).optional(),
    user: z.string().optional()
      .describe("User associated with event")
  })),
  
  orientation: z.enum(["vertical", "horizontal"]).default("vertical"),
  
  showTime: z.boolean().default(true),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  events: [
    {
      id: "1",
      title: "Project started",
      description: "Kickoff meeting completed",
      timestamp: "2024-02-15T10:00:00",
      status: "completed",
      user: "Sarah Johnson"
    }
  ],
  orientation: "vertical",
  showTime: true
}
```

---

## Sidebar

**Purpose**: Navigation sidebar with nested items

**Import**: `import { sidebarSchema, type Sidebar } from '@/patterns/sidebar/schema'`

**Schema**:
```typescript
z.object({
  items: z.array(z.object({
    id: z.string(),
    label: z.string(),
    icon: z.any().optional(),
    href: z.string().optional()
      .describe("Navigation link"),
    badge: z.string().optional()
      .describe("Badge text (count, status, etc)"),
    children: z.array(z.any()).optional()
      .describe("Nested sub-items"),
    active: z.boolean().optional()
  })),
  
  header: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    logo: z.any().optional()
  }).optional(),
  
  footer: z.any().optional()
    .describe("Footer content component"),
  
  collapsible: z.boolean().default(true),
  
  defaultCollapsed: z.boolean().default(false),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  header: {
    title: "My App",
    subtitle: "Dashboard",
    logo: <Logo />
  },
  items: [
    {
      id: "home",
      label: "Home",
      icon: <Home />,
      href: "/",
      active: true
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings />,
      children: [
        { id: "profile", label: "Profile", href: "/settings/profile" }
      ]
    }
  ],
  collapsible: true
}
```

---

## StatsGrid

**Purpose**: Responsive grid of statistics

**Import**: `import { statsGridSchema, type StatsGrid } from '@/patterns/stats-grid/schema'`

**Schema**:
```typescript
z.object({
  stats: z.array(z.object({
    id: z.string(),
    label: z.string(),
    value: z.union([z.string(), z.number()]),
    change: z.number().optional()
      .describe("Percentage change (e.g., 12.5 for +12.5%)"),
    changeLabel: z.string().optional()
      .describe("Change description (e.g., 'vs last month')"),
    icon: z.any().optional(),
    trend: z.enum(["up", "down", "neutral"]).optional(),
    color: z.enum(["default", "success", "warning", "danger"]).optional()
  })),
  
  columns: z.number().min(1).max(6).default(3)
    .describe("Number of columns in grid"),
  
  showDividers: z.boolean().default(true),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  stats: [
    {
      id: "1",
      label: "Total Users",
      value: "12.5K",
      change: 12,
      changeLabel: "vs last month",
      trend: "up",
      color: "success"
    }
  ],
  columns: 4,
  showDividers: true
}
```

---

## ConfirmDialog

**Purpose**: Confirmation modals for important actions

**Import**: `import { confirmDialogSchema, type ConfirmDialog } from '@/patterns/confirm-dialog/schema'`

**Schema**:
```typescript
z.object({
  title: z.string(),
  
  description: z.string()
    .describe("Dialog description/message"),
  
  confirmLabel: z.string().default("Confirm"),
  
  cancelLabel: z.string().default("Cancel"),
  
  variant: z.enum(["default", "destructive", "warning"]).default("default")
    .describe("Dialog visual style"),
  
  icon: z.any().optional(),
  
  open: z.boolean().default(false),
  
  onConfirm: z.function().optional(),
  
  onCancel: z.function().optional(),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  open: true,
  title: "Delete User",
  description: "Are you sure you want to delete this user? This action cannot be undone.",
  variant: "destructive",
  confirmLabel: "Delete",
  cancelLabel: "Cancel",
  onConfirm: () => console.log("Confirmed"),
  onCancel: () => console.log("Cancelled")
}
```

---

## CodeBlock

**Purpose**: Syntax-highlighted code display

**Import**: `import { codeBlockSchema, type CodeBlock } from '@/patterns/code-block/schema'`

**Schema**:
```typescript
z.object({
  code: z.string()
    .describe("Code content to display"),
  
  language: z.string().default("typescript")
    .describe("Programming language for syntax highlighting"),
  
  filename: z.string().optional()
    .describe("Optional filename to display"),
  
  showLineNumbers: z.boolean().default(true),
  
  highlightLines: z.array(z.number()).optional()
    .describe("Line numbers to highlight (1-based)"),
  
  startLineNumber: z.number().default(1)
    .describe("Starting line number"),
  
  copyable: z.boolean().default(true)
    .describe("Show copy button"),
  
  collapsible: z.boolean().default(false)
    .describe("Code block can be collapsed"),
  
  maxHeight: z.string().optional()
    .describe("Maximum height (e.g., '400px')"),
  
  className: z.string().optional()
})
```

**Example**:
```typescript
{
  code: "const greeting = 'Hello, World!';\nconsole.log(greeting);",
  language: "typescript",
  filename: "example.ts",
  showLineNumbers: true,
  copyable: true,
  highlightLines: [2]
}
```

---

## Usage Notes

1. **All patterns use Tailwind CSS** and follow shadcn/ui design principles
2. **Import paths** use `@/patterns/[pattern-name]/component` and `@/patterns/[pattern-name]/schema`
3. **Zod validation** is built-in - use `.parse()` to validate props
4. **TypeScript types** are exported from each schema file
5. **Icons** can be any React component (lucide-react recommended)
6. **Functions** should be properly typed with arguments and return values
7. **Responsive design** is built into all patterns - use Tailwind responsive classes

## Quick Pattern Selection

- **Displaying metrics?** → MetricCard, StatsGrid
- **Visualizing data?** → Chart (5 types available)
- **Managing lists/tables?** → DataTable
- **User input?** → AgentForm
- **Showing details?** → DetailCard
- **AI insights?** → InsightsList, StreamingIndicator
- **Chat interface?** → ChatMessage, StreamingIndicator
- **Navigation?** → Sidebar, CommandPalette
- **Project management?** → KanbanBoard, Timeline
- **Code display?** → CodeBlock
- **Confirmations?** → ConfirmDialog

