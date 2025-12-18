import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { LayoutDashboard, Building2, Users, Mail, Gift } from "lucide-react"

const navItems = [
  { title: "Dashboard", href: "/association-admin", icon: <LayoutDashboard className="size-4" /> },
  { title: "Association Info", href: "/association-admin/info", icon: <Building2 className="size-4" /> },
  { title: "Benefit", href: "/association-admin/programs", icon: <Gift className="size-4" /> },
  { title: "Members", href: "/association-admin/members", icon: <Users className="size-4" /> },
  { title: "Email Settings", href: "/association-admin/email", icon: <Mail className="size-4" /> },
]

export default function AssociationAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav items={navItems} title="Association Admin" />
      <main className="flex-1 bg-background">{children}</main>
    </div>
  )
}
