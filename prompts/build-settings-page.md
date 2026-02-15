# Build Settings Page - Complete Prompt

Use this prompt to generate a complete settings/configuration page using Agent Patterns.

## Prompt

```
Build me a complete settings page using Agent Patterns. The settings page should include:

1. A Sidebar navigation with settings sections:
   - Profile
   - Account
   - Security
   - Notifications
   - Billing
   - API Keys
   - Team
   - Preferences
   - Each with appropriate icons

2. Main content area that changes based on selected section:

**Profile Section:**
- DetailCard showing current profile information (name, email, avatar, bio, role)
- Edit mode enabled
- AgentForm to update profile with fields: name, email, bio, avatar URL
- Save button that shows confirmation

**Account Section:**
- DetailCard with account details (plan, created date, account ID)
- StatsGrid showing account usage (API calls, storage, users, etc.)
- AgentForm to update account settings (company name, timezone, language)

**Security Section:**
- DetailCard showing security info (2FA status, last password change, active sessions)
- AgentForm to change password (current password, new password, confirm password)
- Button to enable 2FA
- DataTable showing active sessions with device, location, last active
- ConfirmDialog for "Revoke all sessions?"

**Notifications Section:**
- AgentForm with notification preferences:
  - Email notifications (toggle)
  - Push notifications (toggle)
  - Marketing emails (toggle)
  - Security alerts (checkbox, required)
  - Weekly digest (radio: Never, Weekly, Daily)
  - Notification types (checkboxes: Comments, Mentions, Updates)

**API Keys Section:**
- DataTable showing API keys with columns: Name, Key (masked), Created, Last Used, Actions
- Button to "Generate New Key"
- AgentForm modal to create new key (name, expiration, permissions)
- CodeBlock showing the newly generated key
- ConfirmDialog for "Revoke this API key?"

**Billing Section:**
- DetailCard showing current plan details and billing info
- MetricCard showing usage this month
- DataTable with invoice history (date, amount, status, download)

Use realistic data throughout.
Make the navigation sticky on the left.
Each section should feel complete and production-ready.
Include proper form validation and confirmation dialogs for destructive actions.
```

## Expected Output

The LLM should generate a complete React component that:

1. **Imports all necessary patterns**:
```typescript
import { Sidebar } from '@/patterns/sidebar/component'
import { DetailCard } from '@/patterns/detail-card/component'
import { AgentForm } from '@/patterns/agent-form/component'
import { DataTable } from '@/patterns/data-table/component'
import { StatsGrid } from '@/patterns/stats-grid/component'
import { MetricCard } from '@/patterns/metric-card/component'
import { CodeBlock } from '@/patterns/code-block/component'
import { ConfirmDialog } from '@/patterns/confirm-dialog/component'
```

2. **Implements section-based navigation**:
```typescript
const [activeSection, setActiveSection] = useState('profile')
const [showConfirm, setShowConfirm] = useState<string | null>(null)
const [showKeyModal, setShowKeyModal] = useState(false)
const [generatedKey, setGeneratedKey] = useState<string | null>(null)

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: <User /> },
  { id: 'account', label: 'Account', icon: <Building /> },
  { id: 'security', label: 'Security', icon: <Shield /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell /> },
  { id: 'api-keys', label: 'API Keys', icon: <Key /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard /> },
]
```

3. **Contains realistic data for each section**:
```typescript
// Profile Data
const profileData = {
  name: 'Sarah Johnson',
  email: 'sarah.johnson@company.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
  bio: 'Product Manager at Tech Corp. Passionate about building great products.',
  role: 'Admin',
  timezone: 'America/New_York',
  joined: 'January 15, 2023',
}

// Account Stats
const accountStats = [
  { 
    id: '1', 
    label: 'API Calls', 
    value: '12.4K', 
    change: 8, 
    changeLabel: 'this month',
    trend: 'up' as const 
  },
  { 
    id: '2', 
    label: 'Storage Used', 
    value: '4.2 GB', 
    change: 12, 
    changeLabel: 'vs last month',
    trend: 'up' as const 
  },
  { 
    id: '3', 
    label: 'Team Members', 
    value: '12', 
    change: 2, 
    changeLabel: 'new this month',
    trend: 'up' as const 
  },
]

// Security Data
const activeSessions = [
  {
    id: '1',
    device: 'Chrome on MacBook Pro',
    location: 'New York, US',
    ipAddress: '192.168.1.1',
    lastActive: '5 minutes ago',
    current: true,
  },
  {
    id: '2',
    device: 'Safari on iPhone 14',
    location: 'New York, US',
    ipAddress: '192.168.1.2',
    lastActive: '2 hours ago',
    current: false,
  },
  // ... more sessions
]

// API Keys
const apiKeys = [
  {
    id: '1',
    name: 'Production API',
    key: 'sk_prod_••••••••••••••1234',
    created: '2024-01-15',
    lastUsed: '2 minutes ago',
    status: 'active',
  },
  {
    id: '2',
    name: 'Development API',
    key: 'sk_dev_••••••••••••••5678',
    created: '2024-01-10',
    lastUsed: '3 days ago',
    status: 'active',
  },
  // ... more keys
]

// Billing Data
const invoices = [
  {
    id: 'INV-001',
    date: '2024-02-01',
    amount: '$99.00',
    status: 'Paid',
    description: 'Pro Plan - Monthly',
  },
  {
    id: 'INV-002',
    date: '2024-01-01',
    amount: '$99.00',
    status: 'Paid',
    description: 'Pro Plan - Monthly',
  },
  // ... more invoices
]
```

4. **Implements complete settings layout**:
```typescript
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [showConfirm, setShowConfirm] = useState<string | null>(null)
  const [showKeyModal, setShowKeyModal] = useState(false)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Profile</h1>
              <p className="text-muted-foreground">
                Manage your personal information
              </p>
            </div>

            <DetailCard
              title="Profile Information"
              fields={[
                { label: 'Name', value: profileData.name },
                { label: 'Email', value: profileData.email },
                { label: 'Role', value: profileData.role, badge: { text: 'Admin', variant: 'default' } },
                { label: 'Joined', value: profileData.joined },
                { label: 'Bio', value: profileData.bio, span: 2 },
              ]}
              editable={true}
              onEdit={(data) => console.log('Update profile:', data)}
            />

            <AgentForm
              title="Update Profile"
              fields={[
                { name: 'name', label: 'Name', type: 'text', defaultValue: profileData.name, required: true },
                { name: 'email', label: 'Email', type: 'email', defaultValue: profileData.email, required: true },
                { name: 'bio', label: 'Bio', type: 'textarea', defaultValue: profileData.bio },
                { 
                  name: 'timezone', 
                  label: 'Timezone', 
                  type: 'select',
                  options: [
                    { label: 'Eastern Time', value: 'America/New_York' },
                    { label: 'Pacific Time', value: 'America/Los_Angeles' },
                    { label: 'Central European', value: 'Europe/Paris' },
                  ],
                  defaultValue: 'America/New_York',
                },
              ]}
              submitLabel="Save Changes"
              onSubmit={(data) => console.log('Profile updated:', data)}
            />
          </div>
        )

      case 'account':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Account</h1>
              <p className="text-muted-foreground">
                Manage your account settings and usage
              </p>
            </div>

            <DetailCard
              title="Account Details"
              fields={[
                { label: 'Account ID', value: 'acc_1234567890', copyable: true },
                { label: 'Plan', value: 'Pro Plan', badge: { text: 'Active', variant: 'success' } },
                { label: 'Created', value: 'January 15, 2023' },
              ]}
            />

            <div>
              <h2 className="text-xl font-semibold mb-4">Usage This Month</h2>
              <StatsGrid stats={accountStats} columns={3} />
            </div>
          </div>
        )

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Security</h1>
              <p className="text-muted-foreground">
                Manage your security settings and active sessions
              </p>
            </div>

            <DetailCard
              title="Security Status"
              fields={[
                { label: '2FA Status', value: 'Enabled', badge: { text: 'Active', variant: 'success' } },
                { label: 'Last Password Change', value: '30 days ago' },
                { label: 'Active Sessions', value: activeSessions.length.toString() },
              ]}
            />

            <AgentForm
              title="Change Password"
              description="Choose a strong password that you haven't used before"
              fields={[
                { name: 'current', label: 'Current Password', type: 'password', required: true },
                { name: 'new', label: 'New Password', type: 'password', required: true },
                { name: 'confirm', label: 'Confirm Password', type: 'password', required: true },
              ]}
              submitLabel="Update Password"
              onSubmit={(data) => console.log('Password updated:', data)}
            />

            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Active Sessions</h2>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => setShowConfirm('revoke-sessions')}
                >
                  Revoke All
                </Button>
              </div>
              <DataTable
                columns={sessionColumns}
                data={activeSessions}
                pageSize={5}
              />
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Notifications</h1>
              <p className="text-muted-foreground">
                Configure how you receive notifications
              </p>
            </div>

            <AgentForm
              title="Notification Preferences"
              fields={[
                { name: 'email', label: 'Email Notifications', type: 'toggle', defaultValue: true },
                { name: 'push', label: 'Push Notifications', type: 'toggle', defaultValue: true },
                { name: 'marketing', label: 'Marketing Emails', type: 'toggle', defaultValue: false },
                { name: 'security', label: 'Security Alerts', type: 'checkbox', defaultValue: true, required: true },
                {
                  name: 'digest',
                  label: 'Digest Frequency',
                  type: 'radio',
                  options: [
                    { label: 'Never', value: 'never' },
                    { label: 'Daily', value: 'daily' },
                    { label: 'Weekly', value: 'weekly' },
                  ],
                  defaultValue: 'weekly',
                },
              ]}
              submitLabel="Save Preferences"
              onSubmit={(data) => console.log('Notifications updated:', data)}
            />
          </div>
        )

      case 'api-keys':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold">API Keys</h1>
                <p className="text-muted-foreground">
                  Manage your API keys for integrations
                </p>
              </div>
              <Button onClick={() => setShowKeyModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Generate New Key
              </Button>
            </div>

            <DataTable
              columns={apiKeyColumns}
              data={apiKeys}
              pageSize={10}
            />

            {generatedKey && (
              <div className="p-4 border rounded-lg bg-muted/50">
                <h3 className="font-semibold mb-2">Your New API Key</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Save this key securely. You won't be able to see it again.
                </p>
                <CodeBlock
                  code={generatedKey}
                  language="text"
                  copyable={true}
                  showLineNumbers={false}
                />
              </div>
            )}
          </div>
        )

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Billing</h1>
              <p className="text-muted-foreground">
                Manage your subscription and billing
              </p>
            </div>

            <DetailCard
              title="Current Plan"
              fields={[
                { label: 'Plan', value: 'Pro Plan' },
                { label: 'Billing Cycle', value: 'Monthly' },
                { label: 'Next Billing Date', value: 'March 1, 2024' },
                { label: 'Amount', value: '$99.00/month' },
              ]}
              actions={
                <Button variant="outline">Upgrade Plan</Button>
              }
            />

            <MetricCard
              label="Usage This Month"
              value="$87.50"
              trend={{ value: 12, direction: 'up', label: 'vs last month' }}
            />

            <div>
              <h2 className="text-xl font-semibold mb-4">Invoice History</h2>
              <DataTable
                columns={invoiceColumns}
                data={invoices}
                pagination={true}
                pageSize={10}
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Settings Sidebar */}
      <div className="w-64 border-r sticky top-0 h-screen">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Settings</h2>
          <nav className="space-y-1">
            {settingsSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted'
                )}
              >
                {section.icon}
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          {renderSection()}
        </div>
      </main>

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={showConfirm !== null}
        title={
          showConfirm === 'revoke-sessions'
            ? 'Revoke All Sessions'
            : 'Revoke API Key'
        }
        description={
          showConfirm === 'revoke-sessions'
            ? 'Are you sure you want to revoke all active sessions? You will be logged out.'
            : 'Are you sure you want to revoke this API key? Applications using this key will stop working.'
        }
        variant="destructive"
        onConfirm={() => {
          console.log('Action confirmed:', showConfirm)
          setShowConfirm(null)
        }}
        onCancel={() => setShowConfirm(null)}
      />
    </div>
  )
}
```

5. **Is production-ready** with:
   - Complete settings sections
   - Section-based navigation with sticky sidebar
   - Realistic data for all sections
   - Form validation
   - Confirmation dialogs for destructive actions
   - Secure key display with masking
   - Proper TypeScript types
   - Responsive design
   - Professional settings page styling
   - State management for modals and sections

## Variations

You can modify this prompt for different settings page types:

- **SaaS App Settings**: Add workspace, integrations, webhooks sections
- **E-commerce Settings**: Add payment methods, shipping, tax settings
- **Developer Tools**: Add deployment, environments, logs sections
- **Team Settings**: Add roles, permissions, invitations sections

Simply add or modify sections to match your application's configuration needs.

