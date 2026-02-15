import { DetailCard } from "./component"

// Example 1: Basic detail card
export function BasicDetailCardExample() {
  return (
    <DetailCard
      title="User Details"
      description="Information about the user account"
      fields={[
        { label: "Name", value: "John Doe" },
        { label: "Email", value: "john@example.com" },
        { label: "Role", value: "Administrator" },
        { label: "Status", value: "Active" },
        { label: "Created", value: "Jan 15, 2024" },
        { label: "Last Login", value: "2 hours ago" },
      ]}
    />
  )
}

// Example 2: With copyable fields
export function CopyableDetailCardExample() {
  return (
    <DetailCard
      title="API Configuration"
      description="API keys and endpoints"
      fields={[
        { label: "API Key", value: "sk_live_abc123xyz789", copyable: true },
        { label: "Secret Key", value: "sk_secret_def456uvw012", copyable: true },
        { label: "Webhook URL", value: "https://api.example.com/webhook", copyable: true, span: 2 },
        { label: "Environment", value: "Production" },
        { label: "Region", value: "US-East-1" },
      ]}
    />
  )
}

// Example 3: With badges
export function BadgesDetailCardExample() {
  return (
    <DetailCard
      title="Order #12345"
      description="Order information and status"
      fields={[
        { label: "Customer", value: "Jane Smith" },
        { label: "Email", value: "jane@example.com", copyable: true },
        {
          label: "Status",
          value: "Shipped",
          badge: { text: "On Track", variant: "success" },
        },
        {
          label: "Payment",
          value: "Completed",
          badge: { text: "Paid", variant: "success" },
        },
        { label: "Order Date", value: "Feb 10, 2024" },
        { label: "Total", value: "$299.99" },
        { label: "Tracking #", value: "TRK987654321", copyable: true, span: 2 },
      ]}
    />
  )
}

// Example 4: Editable card
export function EditableDetailCardExample() {
  return (
    <DetailCard
      title="Profile Settings"
      description="Edit your personal information"
      editable
      onEdit={(values) => {
        console.log("Updated values:", values)
        alert(`Profile updated!\n${JSON.stringify(values, null, 2)}`)
      }}
      fields={[
        { label: "Full Name", value: "John Doe" },
        { label: "Email", value: "john@example.com" },
        { label: "Phone", value: "+1 (555) 123-4567" },
        { label: "Company", value: "Acme Inc." },
        { label: "Job Title", value: "Product Manager" },
        { label: "Location", value: "San Francisco, CA" },
        { label: "Bio", value: "Passionate about building great products.", span: 2 },
      ]}
    />
  )
}

// Example 5: With custom actions
export function ActionsDetailCardExample() {
  return (
    <DetailCard
      title="Subscription Details"
      description="Manage your subscription"
      actions={
        <div className="flex gap-2">
          <button className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
            Cancel
          </button>
          <button className="rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Upgrade
          </button>
        </div>
      }
      fields={[
        { label: "Plan", value: "Professional", badge: { text: "Active", variant: "success" } },
        { label: "Price", value: "$49/month" },
        { label: "Billing Date", value: "1st of each month" },
        { label: "Next Billing", value: "Mar 1, 2024" },
        { label: "Payment Method", value: "•••• 4242" },
        { label: "Status", value: "Auto-renew enabled", badge: { text: "Active", variant: "success" } },
      ]}
    />
  )
}

// Example 6: Loading state
export function LoadingDetailCardExample() {
  return (
    <DetailCard
      title="User Details"
      description="Information about the user account"
      loading
      fields={[
        { label: "Name", value: "" },
        { label: "Email", value: "" },
        { label: "Role", value: "" },
        { label: "Status", value: "" },
      ]}
    />
  )
}

// Example 7: Full-featured card
export function FullFeaturedDetailCardExample() {
  return (
    <DetailCard
      title="Transaction #TXN-98765"
      description="Complete transaction details"
      editable
      onEdit={(values) => console.log("Updated:", values)}
      actions={
        <div className="flex gap-2">
          <button className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
            Refund
          </button>
          <button className="rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted">
            Receipt
          </button>
        </div>
      }
      fields={[
        { label: "Customer", value: "Alice Johnson" },
        { label: "Email", value: "alice@example.com", copyable: true },
        {
          label: "Status",
          value: "Completed",
          badge: { text: "Success", variant: "success" },
        },
        { label: "Amount", value: "$1,234.56" },
        { label: "Currency", value: "USD" },
        { label: "Payment Method", value: "Visa •••• 8901" },
        { label: "Date", value: "Feb 15, 2024, 3:45 PM" },
        {
          label: "Risk Score",
          value: "Low",
          badge: { text: "Safe", variant: "success" },
        },
        { label: "Transaction ID", value: "txn_abc123xyz789", copyable: true, span: 2 },
        { label: "Description", value: "Payment for Professional Plan subscription", span: 2 },
      ]}
    />
  )
}

// Example 8: Multiple cards in a grid
export function MultipleCardsExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <DetailCard
        title="Personal Info"
        fields={[
          { label: "Name", value: "John Doe" },
          { label: "Email", value: "john@example.com", copyable: true },
          { label: "Phone", value: "+1 (555) 123-4567" },
          { label: "Location", value: "San Francisco, CA" },
        ]}
      />
      <DetailCard
        title="Account Status"
        fields={[
          { label: "Status", value: "Active", badge: { text: "Verified", variant: "success" } },
          { label: "Member Since", value: "Jan 2023" },
          { label: "Last Login", value: "2 hours ago" },
          { label: "Total Orders", value: "47" },
        ]}
      />
    </div>
  )
}

export default BasicDetailCardExample
