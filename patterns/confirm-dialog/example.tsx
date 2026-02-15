"use client"

import { useState } from "react"
import { ConfirmDialog } from "./component"

export default function ConfirmDialogExample() {
  const [defaultOpen, setDefaultOpen] = useState(false)
  const [destructiveOpen, setDestructiveOpen] = useState(false)
  const [warningOpen, setWarningOpen] = useState(false)

  return (
    <div className="space-y-8 rounded-lg border border-border bg-background p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">Default Variant</h3>
        <button
          onClick={() => setDefaultOpen(true)}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Open Default Dialog
        </button>
        <ConfirmDialog
          open={defaultOpen}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action? This will make changes to your account."
          confirmLabel="Continue"
          cancelLabel="Go Back"
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          onConfirm={() => {
            console.log("Confirmed!")
            setDefaultOpen(false)
          }}
          onCancel={() => setDefaultOpen(false)}
        />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Destructive Variant</h3>
        <button
          onClick={() => setDestructiveOpen(true)}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          Delete Item
        </button>
        <ConfirmDialog
          open={destructiveOpen}
          title="Delete Item"
          description="This action cannot be undone. This will permanently delete the item and remove all associated data."
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="destructive"
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
          onConfirm={() => {
            console.log("Deleted!")
            setDestructiveOpen(false)
          }}
          onCancel={() => setDestructiveOpen(false)}
        />
      </div>

      <div className="border-t border-border pt-8">
        <h3 className="mb-4 text-lg font-semibold text-foreground">Warning Variant</h3>
        <button
          onClick={() => setWarningOpen(true)}
          className="rounded-lg bg-yellow-600 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-700"
        >
          Publish Changes
        </button>
        <ConfirmDialog
          open={warningOpen}
          title="Publish Changes"
          description="You are about to publish these changes to production. Make sure you have reviewed everything carefully."
          confirmLabel="Publish"
          cancelLabel="Review Again"
          variant="warning"
          icon={
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
          onConfirm={() => {
            console.log("Published!")
            setWarningOpen(false)
          }}
          onCancel={() => setWarningOpen(false)}
        />
      </div>
    </div>
  )
}

