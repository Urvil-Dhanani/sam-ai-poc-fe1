"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable, StatusBadge, type Column } from "@/components/data-table"
import { Search, Plus } from "lucide-react"

interface Association {
  id: string
  name: string
  adminEmail: string
  memberCount: number
  documentCount: number
  status: string
  createdAt: string
}

const associations: Association[] = [
  {
    id: "1",
    name: "AAP (American Pediatrics Association)",
    adminEmail: "john@aap.org",
    memberCount: 1250,
    documentCount: 45,
    status: "active",
    createdAt: "Jan 15, 2024",
  },
  {
    id: "2",
    name: "AAA",
    adminEmail: "sarah@aaa.com",
    memberCount: 3400,
    documentCount: 89,
    status: "active",
    createdAt: "Feb 3, 2024",
  },
  {
    id: "3",
    name: "NCMA",
    adminEmail: "mike@ncma.org",
    memberCount: 890,
    documentCount: 32,
    status: "pending",
    createdAt: "Mar 20, 2024",
  },
  {
    id: "4",
    name: "Retail United",
    adminEmail: "emily@retailunited.com",
    memberCount: 2100,
    documentCount: 67,
    status: "active",
    createdAt: "Apr 5, 2024",
  },
  {
    id: "5",
    name: "Construction Pros",
    adminEmail: "robert@constructionpros.org",
    memberCount: 560,
    documentCount: 23,
    status: "active",
    createdAt: "May 12, 2024",
  },
]

export default function AssociationsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const columns: Column<Association>[] = [
    { key: "name", header: "Association Name" },
    { key: "adminEmail", header: "Admin Email" },
    { key: "memberCount", header: "Members", render: (item) => item.memberCount.toLocaleString() },
    { key: "documentCount", header: "Documents" },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    { key: "createdAt", header: "Created" },
  ]

  const filteredAssociations = associations.filter(
    (assoc) =>
      assoc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assoc.adminEmail.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Associations</h1>
          <p className="text-muted-foreground">Manage all registered associations</p>
        </div>
        <Link href="/super-admin/associations/new">
          <Button>
            <Plus className="size-4 mr-2" />
            New Association
          </Button>
        </Link>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">All Associations</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search associations..."
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
            data={filteredAssociations}
            actions={[
              { label: "View Details", onClick: (item) => console.log("View", item) },
              { label: "Edit", onClick: (item) => console.log("Edit", item) },
              { label: "Delete", onClick: (item) => console.log("Delete", item), variant: "destructive" },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  )
}
