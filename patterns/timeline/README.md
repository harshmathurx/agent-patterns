# Timeline

Event and activity timeline component with vertical and horizontal layouts.

## Features

- ⏱️ **Event History** - Display chronological events
- 📊 **Status Indicators** - Completed, in-progress, pending, cancelled
- 👥 **User Attribution** - Show who performed each action
- 🔄 **Two Orientations** - Vertical and horizontal layouts
- ⏰ **Timestamps** - Formatted date/time display
- 🎨 **Custom Icons** - Add icons to events
- 🎨 **Theme Compatible** - Works with all shadcn themes

## Usage

```tsx
import { Timeline } from "@/patterns/timeline/component"

const events = [
  {
    id: "1",
    title: "Task Completed",
    description: "Feature implementation finished",
    timestamp: new Date(),
    status: "completed",
    user: "John Doe",
  },
]

<Timeline events={events} />
```

## Perfect For

- Activity feeds
- Project milestones
- Order tracking
- Audit logs
- Status updates

