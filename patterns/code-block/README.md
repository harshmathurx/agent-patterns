# CodeBlock

Syntax-highlighted code display with copy and collapse features.

## Features

- 🎨 **Language Support** - Visual indicators for different languages
- 📋 **Copy Button** - One-click code copying
- 🔢 **Line Numbers** - Optional line numbering
- ✨ **Line Highlighting** - Emphasize specific lines
- 📁 **Filename Display** - Show file context
- 🔽 **Collapsible** - Save space with collapse option
- 📏 **Max Height** - Scrollable for long code
- 🎨 **Theme Compatible** - Works with all shadcn themes

## Usage

```tsx
import { CodeBlock } from "@/patterns/code-block/component"

<CodeBlock
  code="const greeting = 'Hello World'"
  language="typescript"
  filename="hello.ts"
  highlightLines={[1]}
  showLineNumbers
  copyable
/>
```

## Perfect For

- Documentation
- Code snippets
- Tutorial content
- API examples
- Error messages

