import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DataTable } from "../component"
import { dataTableSchema } from "../schema"

describe("DataTable", () => {
  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
  ]

  const data = [
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
  ]

  it("renders with required props", () => {
    render(<DataTable columns={columns} data={data} />)
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("John Doe")).toBeInTheDocument()
  })

  it("displays empty message when no data", () => {
    render(<DataTable columns={columns} data={[]} emptyMessage="No data" />)
    expect(screen.getByText("No data")).toBeInTheDocument()
  })

  it("validates schema", () => {
    const result = dataTableSchema.safeParse({
      columns,
      data,
    })
    expect(result.success).toBe(true)
  })
})


