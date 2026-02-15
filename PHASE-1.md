# Phase 1: Make the Patterns Actually Good

**Goal:** Someone copies a pattern and it actually works in production

**Status:** ✅ Complete

---

## 1.1 DataTable → Real Table

**Current state:** Basic table with no interactivity
**Target state:** Production-ready table with sort, filter, pagination, selection

### Features to Add:
- [ ] **Client-side sorting** — Click column headers to sort
- [ ] **Search/filter input** — Filter rows by text search
- [ ] **Pagination** — 10/25/50/100 rows per page
- [ ] **Row selection** — Checkboxes with select all
- [ ] **Loading state** — Skeleton rows while loading
- [ ] Keep zero-dependency (no tanstack-table)

### Files to Update:
- `patterns/data-table/component.tsx`
- `patterns/data-table/schema.ts`
- `patterns/data-table/example.tsx`

---

## 1.2 Chart → Use Recharts

**Current state:** Raw SVG charts (limited, hard to maintain)
**Target state:** Recharts-based charts (industry standard)

### Features to Add:
- [ ] Replace SVG with **Recharts** components
- [ ] Support: `bar`, `line`, `area`, `pie`, `donut`
- [ ] **ResponsiveContainer** for proper sizing
- [ ] **Tooltip on hover** with formatted data
- [ ] Keep Zod schema simple (LLMs know Recharts)

### Files to Update:
- `patterns/chart/component.tsx`
- `patterns/chart/schema.ts`
- `patterns/chart/example.tsx`
- `patterns/chart/package.json` (add recharts)

---

## 1.3 AgentForm → Real Form with Validation

**Current state:** Basic form inputs, no validation
**Target state:** Production form with Zod validation

### Features to Add:
- [ ] **Zod validation** — Use the schema for validation
- [ ] **Error states** — Per-field error messages
- [ ] **Loading/submitting state** — Disable while submitting
- [ ] **New field types:** `date`, `password`, `radio`, `toggle`, `file`
- [ ] **Success/error feedback** after submission

### Files to Update:
- `patterns/agent-form/component.tsx`
- `patterns/agent-form/schema.ts`
- `patterns/agent-form/example.tsx`

### Pitch:
"Your LLM generates the Zod schema → the form validates itself"

---

## 1.4 MetricCard → Polish

**Current state:** Simple card with trend
**Target state:** Polished metric card with visual enhancements

### Features to Add:
- [ ] **Sparkline** mini-chart (tiny SVG, no deps)
- [ ] **Loading skeleton** variant
- [ ] **Comparison mode** (show vs previous period)
- [ ] **Different sizes** (sm, md, lg)

### Files to Update:
- `patterns/metric-card/component.tsx`
- `patterns/metric-card/schema.ts`
- `patterns/metric-card/example.tsx`

---

## 1.5 ThinkingIndicator → StreamingIndicator

**Current state:** Simple loading states
**Target state:** Comprehensive streaming/loading indicator

### Features to Add:
- [ ] Rename to `StreamingIndicator`
- [ ] **Streaming text variant** (typewriter effect)
- [ ] **Progress variant** with steps
- [ ] **Token counter** display option
- [ ] **Pulse/dots/spinner variants** (keep existing)

### Files to Update:
- Rename `patterns/thinking-indicator/` → `patterns/streaming-indicator/`
- `patterns/streaming-indicator/component.tsx`
- `patterns/streaming-indicator/schema.ts`
- `patterns/streaming-indicator/example.tsx`

---

## 1.6 InsightsList → Polish

**Current state:** Basic list of insights
**Target state:** Interactive insights list

### Features to Add:
- [ ] **Collapsible details** (expand/collapse)
- [ ] **Action buttons** per insight
- [ ] **Priority sorting** (high/medium/low)
- [ ] **Filter by type** (info/warning/success/error)

### Files to Update:
- `patterns/insights-list/component.tsx`
- `patterns/insights-list/schema.ts`
- `patterns/insights-list/example.tsx`

---

## 1.7 DetailCard → Polish

**Current state:** Basic detail view
**Target state:** Interactive detail card

### Features to Add:
- [ ] **Edit mode** (inline editing of fields)
- [ ] **Copy value button** per field
- [ ] **Status badges** (active/inactive/pending)
- [ ] **Loading skeleton** variant

### Files to Update:
- `patterns/detail-card/component.tsx`
- `patterns/detail-card/schema.ts`
- `patterns/detail-card/example.tsx`

---

## Completion Criteria

- [x] All 7 patterns upgraded to production quality
- [x] Each pattern has comprehensive examples
- [x] Schemas updated with new features
- [x] All patterns tested in playground
- [x] Zero new dependencies except Recharts for Chart pattern

---

## Summary of Changes

### 1.1 DataTable ✅
- Added client-side sorting (click column headers)
- Added search/filter functionality
- Added pagination (10/25/50 rows per page)
- Added row selection with checkboxes
- Added loading skeleton state
- Zero dependencies (no tanstack-table)

### 1.2 Chart ✅
- Migrated to Recharts (industry standard)
- Supports: bar, line, area, pie, donut
- Added responsive container
- Added hover tooltips with formatting
- Simplified Zod schema

### 1.3 AgentForm ✅
- Added Zod validation (schema-driven)
- Added per-field error states
- Added loading/submitting states
- Added new field types: date, password, radio, toggle, file
- Success/error feedback after submission

### 1.4 MetricCard ✅
- Added sparkline mini-charts (SVG, no deps)
- Added loading skeleton variant
- Added comparison mode (vs previous period)
- Added size variants (sm, md, lg)

### 1.5 StreamingIndicator (renamed from ThinkingIndicator) ✅
- Renamed for broader use case
- Added streaming text variant (typewriter)
- Added progress variant with steps
- Added token counter display
- Kept existing variants (dots, pulse, spinner)

### 1.6 InsightsList ✅
- Added collapsible details (expand/collapse)
- Added action buttons per insight
- Added priority sorting (high/medium/low)
- Added type filters (info/warning/success/error)

### 1.7 DetailCard ✅
- Added edit mode (inline editing)
- Added copy value buttons
- Added status badges (default/success/warning/error)
- Added loading skeleton variant

