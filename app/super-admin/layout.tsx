import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { LayoutDashboard, Building2, Users, Bot } from "lucide-react"

const navItems = [
  { title: "Dashboard", href: "/super-admin", icon: <LayoutDashboard className="size-4" /> },
  { title: "Associations", href: "/super-admin/associations", icon: <Building2 className="size-4" /> },
  { title: "Create Association", href: "/super-admin/associations/new", icon: <Building2 className="size-4" /> },
  { title: "Admin Users", href: "/super-admin/admins", icon: <Users className="size-4" /> },
  { title: "AI System", href: "/super-admin/ai-system", icon: <Bot className="size-4" /> },
]

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav items={navItems} title="Super Admin" />
      <main className="flex-1 bg-background">{children}</main>
    </div>
  )
}
