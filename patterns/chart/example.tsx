import React from "react"
import { Chart } from "./component"

// Sample data sets
const salesData = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 3000 },
  { label: "Apr", value: 2780 },
  { label: "May", value: 3890 },
  { label: "Jun", value: 4390 },
]

const revenueData = [
  { label: "Product A", value: 45 },
  { label: "Product B", value: 30 },
  { label: "Product C", value: 25 },
]

const trafficData = [
  { label: "Mon", value: 2400 },
  { label: "Tue", value: 1398 },
  { label: "Wed", value: 9800 },
  { label: "Thu", value: 3908 },
  { label: "Fri", value: 4800 },
  { label: "Sat", value: 3800 },
  { label: "Sun", value: 4300 },
]

// Example 1: Bar Chart
export function BarChartExample() {
  return (
    <Chart
      title="Monthly Sales"
      type="bar"
      data={salesData}
      showLegend={false}
      showGrid
    />
  )
}

// Example 2: Line Chart
export function LineChartExample() {
  return (
    <Chart
      title="Website Traffic"
      type="line"
      data={trafficData}
      showLegend={false}
      showGrid
    />
  )
}

// Example 3: Area Chart
export function AreaChartExample() {
  return (
    <Chart
      title="Revenue Growth"
      type="area"
      data={salesData}
      showLegend={false}
      showGrid
    />
  )
}

// Example 4: Pie Chart
export function PieChartExample() {
  return (
    <Chart
      title="Revenue Distribution"
      type="pie"
      data={revenueData}
      showLegend
    />
  )
}

// Example 5: Donut Chart
export function DonutChartExample() {
  return (
    <Chart
      title="Market Share"
      type="donut"
      data={revenueData}
      showLegend
    />
  )
}

// Example 6: Custom Colors
export function CustomColorsChartExample() {
  const customData = [
    { label: "Q1", value: 4000, color: "#22c55e" },
    { label: "Q2", value: 3000, color: "#3b82f6" },
    { label: "Q3", value: 2000, color: "#f59e0b" },
    { label: "Q4", value: 2780, color: "#ef4444" },
  ]

  return (
    <Chart
      title="Quarterly Performance"
      type="bar"
      data={customData}
      showLegend={false}
      showGrid
    />
  )
}

// Example 7: Multiple Charts in Grid
export function MultipleChartsExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Chart
        title="Sales Trend"
        type="line"
        data={salesData}
        showLegend={false}
      />
      <Chart
        title="Revenue Split"
        type="donut"
        data={revenueData}
        showLegend
      />
      <Chart
        title="Monthly Performance"
        type="area"
        data={salesData}
        showLegend={false}
      />
      <Chart
        title="Category Comparison"
        type="bar"
        data={revenueData}
        showLegend={false}
      />
    </div>
  )
}

export default BarChartExample
