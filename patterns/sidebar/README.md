# Sidebar

Collapsible navigation sidebar with nested items and badges.

## Features

- 🎯 **Collapsible** - Expand/collapse to save space
- 📁 **Nested Items** - Support for sub-navigation
- 🔢 **Badges** - Show counts and status indicators
- 🎨 **Icons** - Add icons to navigation items
- 👤 **Header/Footer** - Customizable branding and user info
- ✨ **Active States** - Visual feedback for current page
- ⌨️ **Keyboard Navigation** - Full keyboard support
- 🎨 **Theme Compatible** - Works with all shadcn themes

## Usage

```tsx
import { Sidebar } from "@/patterns/sidebar/component"

const items = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
    active: true,
  },
  {
    id: "projects",
    label: "Projects",
    badge: "12",
    children: [
      { id: "active", label: "Active" },
      { id: "archived", label: "Archived" },
    ],
  },
]

<Sidebar items={items} />
```

## Perfect For

- Application navigation
- Admin dashboards
- Multi-section apps
- Hierarchical menus
- Settings panels

