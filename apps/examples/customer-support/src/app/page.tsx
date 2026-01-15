"use client"

import { useState } from "react"
import { MetricCard } from "@agent-patterns/metric-card/component"
import { DataTable } from "@agent-patterns/data-table/component"
import { AgentForm } from "@agent-patterns/agent-form/component"
import { ThinkingIndicator } from "@agent-patterns/thinking-indicator/component"
import { InsightsList } from "@agent-patterns/insights-list/component"
import { DetailCard } from "@agent-patterns/detail-card/component"
import type { Column } from "@agent-patterns/data-table/component"

export default function CustomerSupportPage() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<{ id: string; customer: string; issue: string; status: string } | null>(null)

  const ticketColumns: Column<{ id: string; customer: string; issue: string; status: string; priority: string }>[] = [
    { key: "id", header: "Ticket ID" },
    { key: "customer", header: "Customer" },
    { key: "issue", header: "Issue" },
    { key: "status", header: "Status" },
    { key: "priority", header: "Priority" },
  ]

  const tickets = [
    { id: "#1234", customer: "John Doe", issue: "Payment issue", status: "Open", priority: "High" },
    { id: "#1235", customer: "Jane Smith", issue: "Account access", status: "In Progress", priority: "Medium" },
    { id: "#1236", customer: "Bob Johnson", issue: "Feature request", status: "Resolved", priority: "Low" },
  ]

  const handleFormSubmit = (data: Record<string, unknown>) => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      alert("Ticket created successfully!")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Customer Support Dashboard</h1>
        <p className="mt-2 text-muted-foreground">Manage customer tickets and support requests</p>
      </div>

      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-4">
          <MetricCard
            label="Open Tickets"
            value={12}
            trend={{ value: 5, label: "vs last week", direction: "down" }}
          />
          <MetricCard
            label="Avg Response Time"
            value="2.5h"
            trend={{ value: 15, label: "vs last week", direction: "down" }}
          />
          <MetricCard
            label="Resolved Today"
            value={8}
            trend={{ value: 20, label: "vs yesterday", direction: "up" }}
          />
          <MetricCard
            label="Satisfaction"
            value="4.8/5"
            trend={{ value: 0.2, label: "vs last week", direction: "up" }}
          />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <DataTable
              columns={ticketColumns}
              data={tickets}
            />
          </div>
          <div>
            {selectedTicket ? (
              <DetailCard
                title="Ticket Details"
                fields={[
                  { label: "Ticket ID", value: selectedTicket.id },
                  { label: "Customer", value: selectedTicket.customer },
                  { label: "Issue", value: selectedTicket.issue },
                  { label: "Status", value: selectedTicket.status },
                ]}
              />
            ) : (
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm text-muted-foreground">Select a ticket to view details</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <AgentForm
            title="Create Support Ticket"
            description="Fill out the form to create a new support ticket"
            fields={[
              {
                name: "customerName",
                label: "Customer Name",
                type: "text",
                placeholder: "Enter customer name",
                required: true,
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "Enter email address",
                required: true,
              },
              {
                name: "issueType",
                label: "Issue Type",
                type: "select",
                options: [
                  { label: "Technical", value: "technical" },
                  { label: "Billing", value: "billing" },
                  { label: "Account", value: "account" },
                ],
                required: true,
              },
              {
                name: "description",
                label: "Description",
                type: "textarea",
                placeholder: "Describe the issue",
                required: true,
              },
            ]}
            onSubmit={handleFormSubmit}
          />
          <div className="space-y-4">
            {isProcessing && <ThinkingIndicator message="Creating ticket..." variant="dots" />}
            <InsightsList
              title="Support Insights"
              insights={[
                {
                  id: "1",
                  title: "Response Time Improved",
                  description: "Average response time decreased by 15% this week",
                  type: "success",
                },
                {
                  id: "2",
                  title: "High Priority Tickets",
                  description: "3 high priority tickets require immediate attention",
                  type: "warning",
                },
                {
                  id: "3",
                  title: "Customer Satisfaction",
                  description: "Satisfaction rating remains high at 4.8/5",
                  type: "info",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

