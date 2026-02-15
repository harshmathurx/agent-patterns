# Build Admin Panel - Complete Prompt

Use this prompt to generate a complete admin panel with user management using Agent Patterns.

## Prompt

```
Build me a complete admin panel for user management using Agent Patterns. The admin panel should include:

1. A Sidebar navigation with:
   - Logo and app name at the top
   - Navigation items: Dashboard, Users, Settings, Reports, Analytics
   - User section at the bottom (avatar + name)
   - Collapsible functionality

2. Main content area with:
   - Page header with title "User Management" and an "Add User" button
   - A StatsGrid showing 4 user-related metrics (Total Users, Active Today, New This Month, Churned)
   - A DataTable with user data including:
     * Columns: Avatar, Name, Email, Role, Status, Last Active, Actions
     * At least 20 users with realistic data
     * Sorting, filtering, pagination (10 per page)
     * Row selection with bulk action button
   - When clicking a user row, show a DetailCard in a modal/side panel with:
     * User profile information
     * Edit mode enabled
     * Account status badge
     * Created/updated timestamps
     * Action buttons (Reset Password, Deactivate Account)

3. An "Add User" AgentForm that appears in a modal/side panel with:
   - Fields: Name, Email, Role (select), Status (toggle), Password
   - Proper Zod validation
   - Submit handler that logs the data

4. A ConfirmDialog for destructive actions like:
   - "Are you sure you want to deactivate this user?"
   - "Delete 5 selected users?"

Use realistic data - actual names, emails, roles (Admin, Editor, Viewer).
Make it production-ready with proper TypeScript types and responsive design.
Use a clean, professional admin panel aesthetic.
```

## Expected Output

The LLM should generate a complete React component that:

1. **Imports all necessary patterns**:
```typescript
import { Sidebar } from '@/patterns/sidebar/component'
import { StatsGrid } from '@/patterns/stats-grid/component'
import { DataTable } from '@/patterns/data-table/component'
import { DetailCard } from '@/patterns/detail-card/component'
import { AgentForm } from '@/patterns/agent-form/component'
import { ConfirmDialog } from '@/patterns/confirm-dialog/component'
```

2. **Implements state management**:
```typescript
const [selectedUser, setSelectedUser] = useState<User | null>(null)
const [showAddUserForm, setShowAddUserForm] = useState(false)
const [showConfirmDialog, setShowConfirmDialog] = useState(false)
const [selectedRows, setSelectedRows] = useState<User[]>([])
```

3. **Contains realistic data**:
```typescript
const users = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'Admin',
    status: 'active',
    lastActive: '2 hours ago',
    created: '2023-01-15',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Editor',
    status: 'active',
    lastActive: '5 minutes ago',
    created: '2023-03-22',
  },
  // ... 20+ users
]

const userStats = [
  { 
    id: '1', 
    label: 'Total Users', 
    value: '2,847', 
    change: 12, 
    changeLabel: 'vs last month',
    trend: 'up' as const 
  },
  { 
    id: '2', 
    label: 'Active Today', 
    value: '1,423', 
    change: -3, 
    changeLabel: 'vs yesterday',
    trend: 'down' as const 
  },
  // ... more stats
]
```

4. **Implements complete layout**:
```typescript
export default function AdminPanel() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [confirmAction, setConfirmAction] = useState<'deactivate' | 'delete' | null>(null)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        header={{ title: 'Admin Portal', logo: <Logo /> }}
        items={navigationItems}
        footer={<UserProfile />}
        collapsible={true}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">User Management</h1>
              <p className="text-muted-foreground">Manage users and permissions</p>
            </div>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Stats */}
          <StatsGrid stats={userStats} columns={4} />

          {/* User Table */}
          <DataTable
            columns={userColumns}
            data={users}
            searchable={true}
            pagination={true}
            pageSize={10}
            selectable={true}
            onSelectionChange={setSelectedRows}
          />

          {/* Bulk Actions */}
          {selectedRows.length > 0 && (
            <div className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-lg shadow-lg p-4">
              <p>{selectedRows.length} users selected</p>
              <Button variant="destructive" onClick={() => setConfirmAction('delete')}>
                Delete Selected
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Detail Panel */}
      {selectedUser && (
        <div className="fixed inset-y-0 right-0 w-96 bg-background border-l shadow-lg overflow-y-auto">
          <DetailCard
            title="User Details"
            fields={getUserDetailFields(selectedUser)}
            editable={true}
            onEdit={(data) => console.log('Update user:', data)}
            actions={
              <Button 
                variant="destructive" 
                onClick={() => setConfirmAction('deactivate')}
              >
                Deactivate
              </Button>
            }
          />
        </div>
      )}

      {/* Add User Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-background rounded-lg p-6 max-w-md w-full">
            <AgentForm
              title="Add New User"
              fields={addUserFields}
              schema={userSchema}
              submitLabel="Create User"
              onSubmit={(data) => {
                console.log('New user:', data)
                setShowAddForm(false)
              }}
            />
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        open={confirmAction !== null}
        title={confirmAction === 'delete' ? 'Delete Users' : 'Deactivate User'}
        description={
          confirmAction === 'delete'
            ? `Are you sure you want to delete ${selectedRows.length} user(s)?`
            : 'Are you sure you want to deactivate this user account?'
        }
        variant="destructive"
        onConfirm={() => {
          console.log('Action confirmed:', confirmAction)
          setConfirmAction(null)
        }}
        onCancel={() => setConfirmAction(null)}
      />
    </div>
  )
}
```

5. **Is production-ready** with:
   - Complete CRUD operations structure
   - State management for modals/panels
   - Form validation with Zod
   - Confirmation dialogs for destructive actions
   - Bulk operations support
   - Responsive sidebar layout
   - Professional admin UI styling
   - Proper TypeScript types throughout

## Variations

You can modify this prompt for different admin panel types:

- **E-commerce Admin**: Product management, orders, inventory
- **CMS Admin**: Content management, posts, pages, media
- **SaaS Admin**: Tenant management, subscriptions, billing
- **Support Admin**: Ticket management, customers, conversations
- **Analytics Admin**: Reports, dashboards, data exports

Simply replace the data model and business logic to match your domain.

