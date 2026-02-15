# ChatMessage

A chat message component for building conversational interfaces with AI agents.

## Features

- 👥 **Multiple Roles** - User, assistant, and system message types
- 💬 **Chat Bubbles** - Clean, familiar chat interface
- ⚡ **Streaming Support** - Typewriter effect for AI responses
- 🖼️ **Avatars** - Support for images or initials
- ⏰ **Timestamps** - Display message time
- ✅ **Status Indicators** - Sending, sent, and error states
- 🎯 **Action Buttons** - Add interactive buttons below messages
- 🎨 **Theme Compatible** - Works with all shadcn themes

## Usage

```tsx
import { ChatMessage } from "@/patterns/chat-message/component"

<ChatMessage
  role="assistant"
  content="I can help you with that!"
  timestamp={new Date()}
  isStreaming={false}
/>
```

## Props

- `role` - "user" | "assistant" | "system"
- `content` - Message text
- `avatar` - URL or initials
- `timestamp` - Date or formatted string
- `isStreaming` - Enable typewriter effect
- `status` - "sending" | "sent" | "error"
- `actions` - Array of action buttons
- `className` - Additional CSS classes

## Examples

See `example.tsx` for complete examples including streaming messages, action buttons, and different states.

## Integration

Perfect for:
- AI chat interfaces
- Customer support bots
- Conversational UIs
- Agent interactions

