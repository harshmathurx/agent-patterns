# Build Chat Interface - Complete Prompt

Use this prompt to generate a complete AI chat interface using Agent Patterns.

## Prompt

```
Build me a complete AI chat interface using Agent Patterns. The interface should include:

1. A full-screen layout with:
   - A Sidebar on the left showing:
     * App logo and name at top
     * "New Chat" button
     * List of recent conversations (10+ chats with titles and timestamps)
     * Settings button at bottom
   - Main chat area on the right

2. In the main chat area:
   - Header with conversation title and a CommandPalette trigger button (⌘K)
   - Chat messages list showing a realistic conversation:
     * 10-15 messages alternating between user and assistant
     * Conversation about "analyzing sales data and generating insights"
     * Include system messages for important events
     * Show timestamps on messages
     * The last assistant message should be streaming (isStreaming: true)
   - A StreamingIndicator showing "AI is typing..." when assistant is responding
   - Input area at bottom with:
     * Multi-line textarea for user input
     * Send button
     * File attachment button
     * Stop generation button (when streaming)

3. A CommandPalette that opens with ⌘K showing:
   - Common AI commands: "Summarize conversation", "Export chat", "Change model"
   - Quick actions: "Clear history", "New chat", "Settings"
   - Recent commands
   - Groups: Actions, History, Settings

4. When streaming a response, show:
   - StreamingIndicator with progress steps:
     * "Analyzing request..." (completed)
     * "Generating response..." (active)
     * "Formatting output..." (pending)
   - Token counter showing tokens used/remaining
   - Stop button to cancel generation

5. A ConfirmDialog for:
   - "Clear conversation history?"
   - "Delete this chat?"

Use realistic chat messages - actual questions about data analysis and thoughtful AI responses.
Include code blocks in some messages using CodeBlock pattern.
Make it look like a professional AI assistant interface (ChatGPT, Claude-style).
```

## Expected Output

The LLM should generate a complete React component that:

1. **Imports all necessary patterns**:
```typescript
import { ChatMessage } from '@/patterns/chat-message/component'
import { StreamingIndicator } from '@/patterns/streaming-indicator/component'
import { Sidebar } from '@/patterns/sidebar/component'
import { CommandPalette } from '@/patterns/command-palette/component'
import { CodeBlock } from '@/patterns/code-block/component'
import { ConfirmDialog } from '@/patterns/confirm-dialog/component'
```

2. **Implements state management**:
```typescript
const [messages, setMessages] = useState<ChatMessage[]>(conversationHistory)
const [inputValue, setInputValue] = useState('')
const [isStreaming, setIsStreaming] = useState(false)
const [showCommandPalette, setShowCommandPalette] = useState(false)
const [showConfirm, setShowConfirm] = useState(false)
const [tokenCount, setTokenCount] = useState(0)
```

3. **Contains realistic conversation data**:
```typescript
const conversationHistory = [
  {
    role: 'user' as const,
    content: 'Can you analyze my sales data from last quarter and identify the top trends?',
    avatar: 'JD',
    timestamp: '10:32 AM',
    status: 'sent' as const,
  },
  {
    role: 'assistant' as const,
    content: 'I\'ll analyze your sales data for Q4 2023. Let me break this down into key trends...\n\n**Top 3 Trends:**\n\n1. **Mobile Sales Growth**: 42% increase in mobile transactions\n2. **Geographic Expansion**: West region outperformed by 28%\n3. **Product Category Shift**: Electronics sales up 35%\n\nWould you like me to dive deeper into any of these trends?',
    avatar: 'AI',
    timestamp: '10:33 AM',
    status: 'sent' as const,
  },
  {
    role: 'user' as const,
    content: 'Yes, can you show me the code to visualize the geographic data?',
    avatar: 'JD',
    timestamp: '10:35 AM',
    status: 'sent' as const,
  },
  {
    role: 'assistant' as const,
    content: 'Here\'s a React component using Recharts to visualize your geographic sales data:',
    avatar: 'AI',
    timestamp: '10:35 AM',
    status: 'sent' as const,
    actions: [
      { label: 'Copy Code', onClick: () => {} },
      { label: 'Run in Sandbox', onClick: () => {} },
    ],
  },
  {
    role: 'system' as const,
    content: 'Code block generated successfully',
    timestamp: '10:35 AM',
  },
  {
    role: 'user' as const,
    content: 'This is great! Can you also create a summary report I can share with my team?',
    avatar: 'JD',
    timestamp: '10:38 AM',
    status: 'sent' as const,
  },
  {
    role: 'assistant' as const,
    content: 'I\'ll create a comprehensive executive summary of your Q4 sales performance...',
    avatar: 'AI',
    timestamp: '10:38 AM',
    isStreaming: true,
  },
]

const recentChats = [
  { 
    id: '1', 
    title: 'Q4 Sales Analysis', 
    timestamp: '2 hours ago',
    active: true 
  },
  { 
    id: '2', 
    title: 'Marketing Campaign Ideas', 
    timestamp: 'Yesterday' 
  },
  { 
    id: '3', 
    title: 'Customer Segmentation Strategy', 
    timestamp: '2 days ago' 
  },
  // ... more chats
]

const commands = [
  {
    id: 'summarize',
    label: 'Summarize conversation',
    description: 'Get a summary of this chat',
    group: 'actions',
    shortcut: '⌘S',
    onSelect: () => {},
  },
  {
    id: 'export',
    label: 'Export chat',
    description: 'Download as markdown or PDF',
    group: 'actions',
    shortcut: '⌘E',
    onSelect: () => {},
  },
  {
    id: 'model',
    label: 'Change model',
    description: 'Switch between GPT-4, Claude, etc.',
    group: 'actions',
    onSelect: () => {},
  },
  // ... more commands
]

const streamingSteps = [
  { label: 'Analyzing request...', status: 'completed' as const },
  { label: 'Generating response...', status: 'active' as const },
  { label: 'Formatting output...', status: 'pending' as const },
]
```

4. **Implements complete chat layout**:
```typescript
export default function ChatInterface() {
  const [messages, setMessages] = useState(conversationHistory)
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [confirmAction, setConfirmAction] = useState<'clear' | 'delete' | null>(null)
  const [tokenCount, setTokenCount] = useState(1247)

  useEffect(() => {
    // Handle ⌘K shortcut
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowCommandPalette(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      role: 'user' as const,
      content: input,
      avatar: 'JD',
      timestamp: new Date().toLocaleTimeString(),
      status: 'sent' as const,
    }
    
    setMessages([...messages, userMessage])
    setInput('')
    setIsStreaming(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        role: 'assistant' as const,
        content: 'Processing your request...',
        avatar: 'AI',
        timestamp: new Date().toLocaleTimeString(),
        isStreaming: true,
      }
      setMessages(prev => [...prev, aiMessage])
    }, 500)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        header={{
          title: 'AI Assistant',
          subtitle: 'Powered by Agent Patterns',
        }}
        items={[
          {
            id: 'new',
            label: 'New Chat',
            icon: <Plus />,
            onClick: () => setMessages([]),
          },
          ...recentChats.map(chat => ({
            id: chat.id,
            label: chat.title,
            badge: chat.timestamp,
            active: chat.active,
          })),
        ]}
        footer={
          <Button variant="ghost" onClick={() => {}}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        }
        collapsible={true}
        className="w-64"
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b p-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Q4 Sales Analysis</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCommandPalette(true)}
          >
            <Command className="w-4 h-4 mr-2" />
            ⌘K
          </Button>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, i) => (
            <ChatMessage key={i} {...message} />
          ))}

          {/* Streaming Indicator */}
          {isStreaming && (
            <StreamingIndicator
              variant="progress"
              steps={streamingSteps}
              tokenCount={tokenCount}
              showTokenCounter={true}
            />
          )}
        </div>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                placeholder="Ask me anything..."
                className="flex-1 min-h-[60px] max-h-[200px] resize-none rounded-lg border p-3"
                disabled={isStreaming}
              />
              <div className="flex flex-col gap-2">
                <Button size="sm" variant="ghost">
                  <Paperclip className="w-4 h-4" />
                </Button>
                {isStreaming ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setIsStreaming(false)}
                  >
                    <Square className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    onClick={handleSend}
                    disabled={!input.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Press Enter to send, Shift+Enter for new line, ⌘K for commands
            </div>
          </div>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        commands={commands}
        placeholder="Search commands..."
      />

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmAction !== null}
        title={confirmAction === 'clear' ? 'Clear History' : 'Delete Chat'}
        description={
          confirmAction === 'clear'
            ? 'Are you sure you want to clear this conversation? This action cannot be undone.'
            : 'Are you sure you want to delete this chat? This action cannot be undone.'
        }
        variant="destructive"
        onConfirm={() => {
          if (confirmAction === 'clear') {
            setMessages([])
          }
          setConfirmAction(null)
        }}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  )
}
```

5. **Is production-ready** with:
   - Complete chat state management
   - Keyboard shortcuts (⌘K, Enter, Shift+Enter)
   - Streaming message simulation
   - Token counting
   - Stop generation functionality
   - Recent chats sidebar
   - Command palette integration
   - Professional chat UI styling
   - Message status indicators
   - Code block rendering support
   - Confirmation dialogs for destructive actions
   - Responsive layout
   - Accessibility features

## Variations

You can modify this prompt for different chat interface types:

- **Customer Support Chat**: Add agent info, ticket linking, canned responses
- **Code Assistant Chat**: Add code execution, file tree, terminal integration
- **Documentation Chat**: Add document search, citation links, source references
- **Team Chat**: Add mentions, channels, thread replies, reactions

Simply adjust the sidebar items, commands, and message content to match your use case.

