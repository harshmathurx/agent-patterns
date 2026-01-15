import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MetricCard } from "../component"
import { metricCardSchema } from "../schema"

describe("MetricCard", () => {
  it("renders with required props", () => {
    render(<MetricCard label="Revenue" value={1000} />)
    expect(screen.getByText("Revenue")).toBeInTheDocument()
    expect(screen.getByText("1000")).toBeInTheDocument()
  })

  it("renders with trend information", () => {
    render(
      <MetricCard
        label="Revenue"
        value={1000}
        trend={{ value: 20.1, label: "vs last month", direction: "up" }}
      />
    )
    expect(screen.getByText("vs last month")).toBeInTheDocument()
  })

  it("validates schema", () => {
    const result = metricCardSchema.safeParse({
      label: "Revenue",
      value: 1000,
    })
    expect(result.success).toBe(true)
  })

  it("validates schema with trend", () => {
    const result = metricCardSchema.safeParse({
      label: "Revenue",
      value: 1000,
      trend: {
        value: 20.1,
        label: "vs last month",
        direction: "up",
      },
    })
    expect(result.success).toBe(true)
  })
})

