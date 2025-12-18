"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable, StatusBadge, type Column } from "@/components/data-table"
import { Search, Plus, History } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface AdminUser {
  id: string
  name: string
  email: string
  association: string
  status: string
  createdAt: string
}

interface AuditLog {
  id: string
  action: string
  timestamp: string
  details: string
}

const adminUsers: AdminUser[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@healthcareinc.com",
    association: "Healthcare Inc.",
    status: "active",
    createdAt: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@techworkers.org",
    association: "Tech Workers Union",
    status: "active",
    createdAt: "Feb 3, 2024",
  },
  {
    id: "3",
    name: "Mike Chen",
    email: "mike@edualliance.org",
    association: "Education Alliance",
    status: "disabled",
    createdAt: "Mar 20, 2024",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@retailunited.com",
    association: "Retail United",
    status: "active",
    createdAt: "Apr 5, 2024",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert@constructionpros.org",
    association: "Construction Pros",
    status: "active",
    createdAt: "May 12, 2024",
  },
]

const auditLogs: AuditLog[] = [
  {
    id: "1",
    action: "Admin Created",
    timestamp: "May 12, 2024 at 2:30 PM",
    details: "Robert Wilson added as admin for Construction Pros",
  },
  {
    id: "2",
    action: "Admin Disabled",
    timestamp: "Apr 28, 2024 at 11:15 AM",
    details: "Mike Chen disabled due to inactivity",
  },
  {
    id: "3",
    action: "Admin Created",
    timestamp: "Apr 5, 2024 at 9:00 AM",
    details: "Emily Davis added as admin for Retail United",
  },
  {
    id: "4",
    action: "Password Reset",
    timestamp: "Mar 22, 2024 at 3:45 PM",
    details: "Password reset requested for Sarah Johnson",
  },
]

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAuditLog, setShowAuditLog] = useState(false)

  const columns: Column<AdminUser>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "association", header: "Association" },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    { key: "createdAt", header: "Created" },
  ]

  const filteredUsers = adminUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.association.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Admin Users</h1>
          <p className="text-muted-foreground">Manage association admin accounts</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowAuditLog(true)}>
            <History className="size-4 mr-2" />
            Audit Log
          </Button>
          <Button>
            <Plus className="size-4 mr-2" />
            Add Admin
          </Button>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All Admin Users</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search admins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredUsers}
            actions={[
              { label: "Edit", onClick: (item) => console.log("Edit", item) },
              { label: "Reset Password", onClick: (item) => console.log("Reset", item) },
              { label: "Disable", onClick: (item) => console.log("Disable", item), variant: "destructive" },
              { label: "Delete", onClick: (item) => console.log("Delete", item), variant: "destructive" },
            ]}
          />
        </CardContent>
      </Card>

      <Sheet open={showAuditLog} onOpenChange={setShowAuditLog}>
        <SheetContent className="bg-card border-border w-[500px] sm:max-w-[500px]">
          <SheetHeader>
            <SheetTitle>Audit Log</SheetTitle>
            <SheetDescription>History of admin account changes</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {auditLogs.map((log) => (
              <div key={log.id} className="p-4 rounded-lg bg-secondary/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{log.action}</span>
                  <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                </div>
                <p className="text-sm text-muted-foreground">{log.details}</p>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
