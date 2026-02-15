# Agent Patterns - Prompt Library

This directory contains prompts designed to make LLMs generate UI using Agent Patterns.

## 🎯 Quick Start

### Option 1: Use with Cursor

1. Copy [`system-prompt.md`](system-prompt.md)
2. Paste into `.cursorrules` in your project root
3. Ask Cursor to build UI → it will use Agent Patterns automatically

### Option 2: Use with Claude Projects

1. Create a new Claude Project
2. Add [`system-prompt.md`](system-prompt.md) to project knowledge
3. Chat with Claude about building UI → it will use Agent Patterns

### Option 3: Use with ChatGPT Custom Instructions

1. Open ChatGPT Settings → Custom Instructions
2. Paste [`system-prompt.md`](system-prompt.md) into "How would you like ChatGPT to respond?"
3. Start a new chat → ChatGPT will use Agent Patterns for UI generation

---

## 📚 Files in This Directory

### [`system-prompt.md`](system-prompt.md) ⭐ **START HERE**
**Purpose**: Master prompt that teaches LLMs about all 15 patterns

**What it contains**:
- Overview of all patterns with use cases
- Pattern selection guidelines
- Code generation rules
- Import path conventions
- Response format templates

**When to use**: 
- Add to Cursor rules (`.cursorrules`)
- Add to Claude project knowledge
- Add to ChatGPT custom instructions
- Reference when you want LLM to use Agent Patterns

---

### [`pattern-index.md`](pattern-index.md) 📖 **COMPLETE REFERENCE**
**Purpose**: Complete Zod schema reference for all 15 patterns

**What it contains**:
- Every pattern's complete Zod schema
- Detailed prop descriptions
- Usage examples for each pattern
- Import paths
- Quick pattern selection guide

**When to use**:
- Quick schema lookup
- Validate pattern props
- Check available options
- Copy exact schema into context

---

### Build Guides (Complete Examples)

These are prompts that generate complete application layouts:

#### [`build-dashboard.md`](build-dashboard.md)
**Generates**: Revenue/analytics dashboard
**Patterns used**: StatsGrid + Chart + DataTable + InsightsList
**Time to generate**: ~30 seconds
**Best for**: Executive dashboards, analytics views, KPI tracking

#### [`build-admin-panel.md`](build-admin-panel.md)
**Generates**: Complete admin panel with user management
**Patterns used**: Sidebar + DataTable + DetailCard + AgentForm + ConfirmDialog
**Time to generate**: ~45 seconds
**Best for**: Admin interfaces, user management, CRUD operations

#### [`build-analytics-view.md`](build-analytics-view.md)
**Generates**: Comprehensive analytics page with insights
**Patterns used**: StatsGrid + Chart (3 types) + InsightsList + DataTable + Timeline
**Time to generate**: ~45 seconds
**Best for**: Data analytics, performance tracking, business intelligence

#### [`build-chat-interface.md`](build-chat-interface.md)
**Generates**: AI chat interface
**Patterns used**: ChatMessage + StreamingIndicator + Sidebar + CommandPalette + CodeBlock
**Time to generate**: ~60 seconds
**Best for**: AI chatbots, support chat, conversational UIs

#### [`build-settings-page.md`](build-settings-page.md)
**Generates**: Settings/configuration page with multiple sections
**Patterns used**: Sidebar + DetailCard + AgentForm + DataTable + CodeBlock
**Time to generate**: ~60 seconds
**Best for**: User settings, app configuration, account management

---

## 🎨 How to Use These Prompts

### Method 1: Copy the Entire Prompt
```
1. Open a build-*.md file
2. Copy the entire "Prompt" section
3. Paste into your LLM chat
4. LLM generates complete component
5. Copy-paste into your codebase
```

### Method 2: Customize the Prompt
```
1. Open a build-*.md file
2. Read the "Prompt" section
3. Modify for your needs (change metrics, data, etc.)
4. Paste modified prompt into LLM
5. Get customized component
```

### Method 3: Learn the Pattern
```
1. Open a build-*.md file
2. Read the "Expected Output" section
3. See how patterns are combined
4. Use as template for your own layouts
```

---

## 💡 Examples

### Example 1: Generate a Dashboard
```
User: "I need a sales dashboard"
→ Uses build-dashboard.md as reference
→ LLM generates complete dashboard with stats, charts, table
→ Copy-paste into app
```

### Example 2: Generate Admin Panel
```
User: "Create a product management admin panel"
→ Uses build-admin-panel.md as template
→ LLM generates sidebar, product table, forms
→ Copy-paste into app
```

### Example 3: Generate Custom Layout
```
User: "Build a monitoring dashboard with alerts and logs"
→ LLM references system-prompt.md
→ Selects appropriate patterns: MetricCard, InsightsList, Timeline, DataTable
→ Generates custom layout
→ Copy-paste into app
```

---

## 🎯 Tips for Best Results

### 1. **Be Specific**
❌ Bad: "Build me a dashboard"
✅ Good: "Build me a sales dashboard with revenue metrics, monthly chart, and recent transactions table"

### 2. **Mention Patterns**
❌ Bad: "Show user data"
✅ Good: "Use DataTable to show user data with sorting and pagination"

### 3. **Request Realistic Data**
❌ Bad: "Add some data"
✅ Good: "Add 15 rows of realistic user data with names, emails, and roles"

### 4. **Use Build Guides as Templates**
Instead of asking from scratch, say:
"Use the build-dashboard.md approach but for an e-commerce store"

---

## 🔧 Customization

You can modify these prompts for your needs:

### Change the Tech Stack
Currently assumes: Next.js + React + TypeScript + Tailwind + shadcn/ui

To use with different stack:
1. Edit `system-prompt.md`
2. Update import paths
3. Adjust component conventions

### Add Custom Patterns
If you create your own patterns:
1. Add schema to `pattern-index.md`
2. Add pattern description to `system-prompt.md`
3. Create example in a new `build-*.md`

### Change Styling
The prompts generate shadcn/ui compatible code.

To change styling:
1. Update `system-prompt.md` code generation rules
2. Replace Tailwind classes with your preferred system
3. Update examples in build guides

---

## 📊 What Each File Does

| File | Purpose | Use Case |
|------|---------|----------|
| `system-prompt.md` | Teach LLM about all patterns | Add to Cursor/Claude/ChatGPT |
| `pattern-index.md` | Complete schema reference | Quick lookup, validation |
| `build-dashboard.md` | Generate dashboards | Revenue, analytics, KPIs |
| `build-admin-panel.md` | Generate admin UIs | User management, CRUD |
| `build-analytics-view.md` | Generate analytics pages | Data analysis, insights |
| `build-chat-interface.md` | Generate chat UIs | AI chatbots, support |
| `build-settings-page.md` | Generate settings pages | Configuration, preferences |

---

## 🚀 Next Steps

1. **Start with `system-prompt.md`** - Add it to your AI tool
2. **Try a build guide** - Generate a complete layout
3. **Reference `pattern-index.md`** - When you need schema details
4. **Customize prompts** - Adapt for your specific needs

---

## 💬 Need Help?

- **Issues**: [GitHub Issues](https://github.com/harshmathurx/agent-patterns/issues)
- **Discussions**: [GitHub Discussions](https://github.com/harshmathurx/agent-patterns/discussions)
- **Examples**: Check the build guides for working examples

---

**Remember**: These prompts cost nothing to use, work offline, and create zero lock-in. Once your LLM knows about Agent Patterns, it will naturally use them for any UI generation.

