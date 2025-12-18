"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, FileText, AlertCircle, CheckCircle2, Clock } from "lucide-react"
import { DataTable, StatusBadge, type Column } from "@/components/data-table"

interface LogEntry {
  id: string
  action: string
  user: string
  timestamp: string
  status: string
}

const recentLogs: LogEntry[] = [
  { id: "1", action: "Association Created", user: "admin@sam.ai", timestamp: "2 minutes ago", status: "completed" },
  { id: "2", action: "Admin User Disabled", user: "admin@sam.ai", timestamp: "15 minutes ago", status: "completed" },
  { id: "3", action: "Document Processing", user: "system", timestamp: "1 hour ago", status: "pending" },
  { id: "4", action: "Index Failed", user: "system", timestamp: "2 hours ago", status: "error" },
]

const logColumns: Column<LogEntry>[] = [
  { key: "action", header: "Action" },
  { key: "user", header: "User" },
  { key: "timestamp", header: "Time" },
  { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
]

export default function SuperAdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage all associations and system operations.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Associations"
          value={24}
          icon={<Building2 className="size-6 text-primary" />}
          trend={{ value: 12, label: "this month" }}
        />
        <StatCard
          title="Active Admins"
          value={48}
          icon={<Users className="size-6 text-accent" />}
          trend={{ value: 8, label: "this week" }}
        />
        <StatCard
          title="Documents Processed"
          value="1,284"
          icon={<FileText className="size-6 text-chart-3" />}
          trend={{ value: 24, label: "today" }}
        />
        <StatCard
          title="Processing Errors"
          value={3}
          icon={<AlertCircle className="size-6 text-destructive" />}
          description="Requires attention"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Indexing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 text-accent" />
                  <div>
                    <p className="font-medium">Completed</p>
                    <p className="text-sm text-muted-foreground">1,245 documents indexed</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-accent">97%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <Clock className="size-5 text-chart-3" />
                  <div>
                    <p className="font-medium">In Progress</p>
                    <p className="text-sm text-muted-foreground">24 documents processing</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-chart-3">2%</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <AlertCircle className="size-5 text-destructive" />
                  <div>
                    <p className="font-medium">Failed</p>
                    <p className="text-sm text-muted-foreground">15 documents with errors</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-destructive">1%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={logColumns} data={recentLogs} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
