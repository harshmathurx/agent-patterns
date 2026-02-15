# ConfirmDialog

Modal dialog for confirming critical user actions.

## Features

- ⚠️ **Action Confirmation** - Prevent accidental actions
- 🎨 **Three Variants** - Default, destructive, warning
- 🔄 **Loading States** - Show progress during async operations
- 🎯 **Icons** - Add visual context
- ⌨️ **Keyboard Support** - ESC to cancel
- 🎭 **Backdrop** - Blur and dim background
- 🎨 **Theme Compatible** - Works with all shadcn themes
- ♿ **Accessible** - ARIA labels and roles

## Usage

```tsx
import { ConfirmDialog } from "@/patterns/confirm-dialog/component"

<ConfirmDialog
  open={open}
  title="Delete Item"
  description="This action cannot be undone."
  variant="destructive"
  onConfirm={() => console.log("Deleted")}
  onCancel={() => setOpen(false)}
/>
```

## Perfect For

- Delete confirmations
- Publish/deploy actions
- Irreversible operations
- Critical state changes
- Data loss warnings

