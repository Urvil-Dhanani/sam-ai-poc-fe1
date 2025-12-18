"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Target, Eye, FileText, Upload, Trash2 } from "lucide-react"
import { StatusBadge } from "@/components/data-table"

interface Document {
  id: string
  name: string
  uploadedAt: string
  status: string
  size: string
}

const documents: Document[] = [
  { id: "1", name: "About_Healthcare_Inc.pdf", uploadedAt: "Jan 15, 2024", status: "processed", size: "2.4 MB" },
  { id: "2", name: "Company_Overview_2024.docx", uploadedAt: "Feb 3, 2024", status: "processed", size: "1.8 MB" },
  { id: "3", name: "Mission_Statement.pdf", uploadedAt: "Mar 10, 2024", status: "pending", size: "512 KB" },
  { id: "4", name: "Annual_Report_2023.pdf", uploadedAt: "Mar 20, 2024", status: "error", size: "8.2 MB" },
]

export default function AssociationInfoPage() {
  const [isDragging, setIsDragging] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    // Handle file drop
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Association Information</h1>
        <p className="text-muted-foreground">Manage your organization details and documents</p>
      </div>

      <Tabs defaultValue="about" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="about">About / Mission / Vision</TabsTrigger>
          <TabsTrigger value="documents">Document Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle>About Us</CardTitle>
                  <CardDescription>Tell members about your association</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe your association, its history, and what makes it unique..."
                className="bg-input border-border min-h-32"
                defaultValue="Healthcare Inc. is a leading organization dedicated to providing comprehensive healthcare benefits to our members. Founded in 1985, we have grown to serve over 50,000 members across the nation."
              />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Target className="size-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle>Mission</CardTitle>
                    <CardDescription>Your organization's purpose</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What is your association's mission?"
                  className="bg-input border-border min-h-32"
                  defaultValue="To provide accessible, affordable, and comprehensive healthcare solutions that empower our members to live healthier lives."
                />
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                    <Eye className="size-5 text-chart-3" />
                  </div>
                  <div>
                    <CardTitle>Vision</CardTitle>
                    <CardDescription>Your aspirations for the future</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What is your association's vision?"
                  className="bg-input border-border min-h-32"
                  defaultValue="A world where every individual has access to quality healthcare, regardless of their background or financial status."
                />
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Upload className="size-5 text-primary" />
                </div>
                <div>
                  <CardTitle>Upload Documents</CardTitle>
                  <CardDescription>Upload documents for SAM AI to learn from</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
                <Upload className="size-12 text-muted-foreground mx-auto mb-4" />
                <p className="font-medium mb-1">Drag and drop files here</p>
                <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                <Button variant="secondary">
                  <FileText className="size-4 mr-2" />
                  Browse Files
                </Button>
                <p className="text-xs text-muted-foreground mt-4">Supported: PDF, DOCX, TXT (max 10MB each)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-3">
                      <FileText className="size-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {doc.size} • Uploaded {doc.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={doc.status} />
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
