"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import NewLandingPage from "./landing"
import OldPlaygroundPage from "./page-old"

function PageContent() {
  const searchParams = useSearchParams()
  const view = searchParams.get("view")

  // If view=playground, show the old detailed playground
  // Otherwise, show the new landing page
  if (view === "playground") {
    return <OldPlaygroundPage />
  }

  return <NewLandingPage />
}

export default function Page() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <PageContent />
    </Suspense>
  )
}

