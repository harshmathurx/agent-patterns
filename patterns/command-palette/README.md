# CommandPalette

A powerful command palette (⌘K menu) for quick navigation and actions.

## Features

- ⌨️ **Keyboard Navigation** - Arrow keys, Enter, and Escape
- 🔍 **Fuzzy Search** - Find commands by name, description, or keywords
- 🎯 **Command Groups** - Organize commands into categories
- ⏱️ **Recent Commands** - Show recently used commands
- ⚡ **Keyboard Shortcuts** - Display shortcut hints
- 🎨 **Icon Support** - Add icons to commands
- 💫 **Smooth Animations** - Fade and slide transitions
- 🎨 **Theme Compatible** - Works with all shadcn themes

## Usage

```tsx
import { CommandPalette } from "@/patterns/command-palette/component"

const commands = [
  {
    id: "new-dashboard",
    label: "Create Dashboard",
    description: "Start building a new dashboard",
    shortcut: "⌘N",
    group: "create",
    onSelect: () => console.log("Creating dashboard"),
  },
]

<CommandPalette
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  commands={commands}
/>
```

## Props

- `isOpen` - Whether the palette is open (required)
- `onClose` - Callback when palette is closed
- `commands` - Array of command objects (required)
- `groups` - Optional command groups
- `recentCommands` - Array of recent command IDs
- `placeholder` - Search input placeholder
- `className` - Additional CSS classes

## Integration

Perfect for:
- Quick command execution
- App-wide search
- Keyboard-first workflows
- Power user features

