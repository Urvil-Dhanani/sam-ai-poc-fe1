"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable, StatusBadge, type Column } from "@/components/data-table"
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Users,
  Search,
  Clock,
  XCircle,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Member {
  id: string
  name: string
  email: string
  phone: string
  status: string
  lastContact: string
}

interface ValidationResult {
  type: "error" | "warning" | "success"
  message: string
  count?: number
}

interface UploadHistory {
  id: string
  fileName: string
  uploadDate: string
  totalRecords: number
  successful: number
  failed: number
  duplicates: number
  status: "completed" | "processing" | "failed"
}

const members: Member[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "(555) 123-4567",
    status: "in-conversation",
    lastContact: "2 hours ago",
  },
  {
    id: "2",
    name: "Bob Williams",
    email: "bob@example.com",
    phone: "(555) 234-5678",
    status: "not-contacted",
    lastContact: "Never",
  },
  {
    id: "3",
    name: "Carol Davis",
    email: "carol@example.com",
    phone: "(555) 345-6789",
    status: "completed",
    lastContact: "1 day ago",
  },
  {
    id: "4",
    name: "David Martinez",
    email: "david@example.com",
    phone: "(555) 456-7890",
    status: "not-contacted",
    lastContact: "Never",
  },
  {
    id: "5",
    name: "Eva Thompson",
    email: "eva@example.com",
    phone: "(555) 567-8901",
    status: "in-conversation",
    lastContact: "5 hours ago",
  },
  {
    id: "6",
    name: "Frank Wilson",
    email: "frank@example.com",
    phone: "(555) 678-9012",
    status: "completed",
    lastContact: "3 days ago",
  },
]

const validationResults: ValidationResult[] = [
  { type: "success", message: "Valid rows ready for import", count: 245 },
  { type: "warning", message: "Duplicate emails found", count: 3 },
  { type: "error", message: "Invalid email format", count: 2 },
  { type: "error", message: "Missing required fields", count: 1 },
]

const uploadHistory: UploadHistory[] = [
  {
    id: "1",
    fileName: "members_january_2024.csv",
    uploadDate: "Jan 15, 2024 at 10:30 AM",
    totalRecords: 250,
    successful: 245,
    failed: 2,
    duplicates: 3,
    status: "completed",
  },
  {
    id: "2",
    fileName: "new_members_batch2.csv",
    uploadDate: "Jan 12, 2024 at 3:15 PM",
    totalRecords: 150,
    successful: 148,
    failed: 0,
    duplicates: 2,
    status: "completed",
  },
  {
    id: "3",
    fileName: "member_update_dec.csv",
    uploadDate: "Dec 28, 2023 at 9:00 AM",
    totalRecords: 500,
    successful: 485,
    failed: 8,
    duplicates: 7,
    status: "completed",
  },
  {
    id: "4",
    fileName: "healthcare_members.csv",
    uploadDate: "Dec 15, 2023 at 2:45 PM",
    totalRecords: 320,
    successful: 315,
    failed: 1,
    duplicates: 4,
    status: "completed",
  },
  {
    id: "5",
    fileName: "association_import.csv",
    uploadDate: "Dec 10, 2023 at 11:20 AM",
    totalRecords: 75,
    successful: 0,
    failed: 75,
    duplicates: 0,
    status: "failed",
  },
]

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showUploadResults, setShowUploadResults] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const columns: Column<Member>[] = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Phone" },
    { key: "status", header: "Status", render: (item) => <StatusBadge status={item.status} /> },
    { key: "lastContact", header: "Last Contact" },
  ]

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setShowUploadResults(true)
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Member Management</h1>
        <p className="text-muted-foreground">Upload and manage your association members</p>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="list">Member List</TabsTrigger>
          <TabsTrigger value="upload">Upload Members</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="size-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>All Members</CardTitle>
                    <CardDescription>{members.length} members total</CardDescription>
                  </div>
                </div>
                <div className="relative w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search members..."
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
                data={filteredMembers}
                actions={[
                  {
                    label: "View Thread",
                    onClick: (item) => setSelectedMember(item),
                  },
                  { label: "Send Follow-up", onClick: (item) => console.log("Follow-up", item) },
                  { label: "Mark Complete", onClick: (item) => console.log("Complete", item) },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Upload className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Upload CSV</CardTitle>
                  <CardDescription>Import members from a CSV file</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="mb-4 bg-transparent">
                <Download className="size-4 mr-2" />
                Download Sample CSV
              </Button>

              <div
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-border"
                }`}
              >
                <FileSpreadsheet className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium mb-1">Drag and drop your CSV file here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <Button variant="secondary" onClick={() => setShowUploadResults(true)}>
                  Browse Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {showUploadResults && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Validation Results</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {validationResults.map((result, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-4 rounded-lg ${
                      result.type === "success"
                        ? "bg-accent/10"
                        : result.type === "warning"
                          ? "bg-chart-3/10"
                          : "bg-destructive/10"
                    }`}
                  >
                    {result.type === "success" ? (
                      <CheckCircle2 className="size-5 text-accent" />
                    ) : result.type === "warning" ? (
                      <AlertCircle className="size-5 text-chart-3" />
                    ) : (
                      <AlertCircle className="size-5 text-destructive" />
                    )}
                    <span className="flex-1">{result.message}</span>
                    {result.count !== undefined && <span className="font-bold">{result.count}</span>}
                  </div>
                ))}
                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" onClick={() => setShowUploadResults(false)}>
                    Cancel
                  </Button>
                  <Button>Import {validationResults[0].count} Members</Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Clock className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Upload History</CardTitle>
                  <CardDescription>Recent CSV uploads and their results</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead>File Name</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">Successful</TableHead>
                    <TableHead className="text-center">Failed</TableHead>
                    <TableHead className="text-center">Duplicates</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadHistory.map((upload) => (
                    <TableRow key={upload.id} className="border-border">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <FileSpreadsheet className="size-4 text-muted-foreground" />
                          {upload.fileName}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{upload.uploadDate}</TableCell>
                      <TableCell className="text-center font-medium">{upload.totalRecords}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <CheckCircle2 className="size-4 text-accent" />
                          <span className="text-accent font-medium">{upload.successful}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <XCircle className="size-4 text-destructive" />
                          <span
                            className={upload.failed > 0 ? "text-destructive font-medium" : "text-muted-foreground"}
                          >
                            {upload.failed}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <AlertCircle className="size-4 text-chart-3" />
                          <span
                            className={upload.duplicates > 0 ? "text-chart-3 font-medium" : "text-muted-foreground"}
                          >
                            {upload.duplicates}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant={
                            upload.status === "completed"
                              ? "default"
                              : upload.status === "processing"
                                ? "secondary"
                                : "destructive"
                          }
                          className={upload.status === "completed" ? "bg-accent/20 text-accent hover:bg-accent/30" : ""}
                        >
                          {upload.status === "completed"
                            ? "Completed"
                            : upload.status === "processing"
                              ? "Processing"
                              : "Failed"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <SheetContent className="bg-card border-border w-[600px] sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>{selectedMember?.name}</SheetTitle>
            <SheetDescription>{selectedMember?.email}</SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2">
              <StatusBadge status={selectedMember?.status || ""} />
              <span className="text-sm text-muted-foreground">Last contact: {selectedMember?.lastContact}</span>
            </div>
            <div className="border-t border-border pt-4">
              <h4 className="font-medium mb-4">Email Thread</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">SAM AI</span>
                    <span className="text-xs text-muted-foreground">Jan 15, 2024 at 9:00 AM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Hello! I'm reaching out to let you know about the dental benefits available to you through
                    Healthcare Inc. Would you like to learn more about your coverage options?
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{selectedMember?.name}</span>
                    <span className="text-xs text-muted-foreground">Jan 15, 2024 at 2:30 PM</span>
                  </div>
                  <p className="text-sm">
                    Yes, I'd love to know more! Especially about orthodontic coverage for my kids.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">SAM AI</span>
                    <span className="text-xs text-muted-foreground">Jan 15, 2024 at 2:32 PM</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Great question! Your dental plan includes orthodontic coverage for dependents up to age 26. The plan
                    covers 50% of orthodontic treatment costs up to a lifetime maximum of $2,000 per person.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
