import React from "react"
import { AdminSidebar, AdminMobileNav } from "@/components/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar />
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
      <AdminMobileNav />
    </div>
  )
}
