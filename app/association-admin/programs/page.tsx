"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Gift, Plus, FileText, Edit2, Trash2, Upload } from "lucide-react"

interface Program {
  id: string
  name: string
  description: string
  documentCount: number
}

const programs: Program[] = [
  {
    id: "1",
    name: "Lowes",
    description: "Exclusive discounts and benefits at Lowes home improvement stores for members and their families.",
    documentCount: 12,
  },
  {
    id: "2",
    name: "Home Depot",
    description: "Special pricing and perks at Home Depot locations with access to a nationwide network of stores.",
    documentCount: 8,
  },
  {
    id: "3",
    name: "800-Flowers",
    description: "Exclusive discounts on flowers, gifts, and gourmet treats for all occasions.",
    documentCount: 15,
  },
  {
    id: "4",
    name: "Avis Car Rental",
    description: "Discounted car rentals and upgrades at Avis locations nationwide for business and leisure travel.",
    documentCount: 6,
  },
  {
    id: "5",
    name: "AMC Movie Ticket",
    description: "Discounted movie tickets and concessions at AMC Theatres locations for members and their families.",
    documentCount: 9,
  },
]

export default function BenefitProgramsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProgram, setEditingProgram] = useState<Program | null>(null)

  const openAddDialog = () => {
    setEditingProgram(null)
    setIsDialogOpen(true)
  }

  const openEditDialog = (program: Program) => {
    setEditingProgram(program)
    setIsDialogOpen(true)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Benefits</h1>
          <p className="text-muted-foreground">Manage your benefits and their documentation</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <Plus className="size-4 mr-2" />
              Add Benefit
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProgram ? "Edit Program" : "Add New Program"}</DialogTitle>
              <DialogDescription>
                {editingProgram
                  ? "Update the program details and documents"
                  : "Create a new benefit program for your members"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="programName">Program Name</Label>
                <Input
                  id="programName"
                  placeholder="e.g., Dental Coverage"
                  className="bg-input border-border"
                  defaultValue={editingProgram?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="programDescription">Description</Label>
                <Textarea
                  id="programDescription"
                  placeholder="Describe what this program offers..."
                  className="bg-input border-border min-h-24"
                  defaultValue={editingProgram?.description}
                />
              </div>
              <div className="space-y-2">
                <Label>Program Documents</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="size-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Drag and drop files or click to browse</p>
                  <Button variant="secondary" size="sm">
                    <FileText className="size-4 mr-2" />
                    Upload Documents
                  </Button>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  {editingProgram ? "Save Changes" : "Create Program"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <Card key={program.id} className="bg-card border-border hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gift className="size-5 text-primary" />
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="size-8" onClick={() => openEditDialog(program)}>
                    <Edit2 className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="size-8 text-muted-foreground hover:text-destructive">
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="mt-4">{program.name}</CardTitle>
              <CardDescription className="line-clamp-2">{program.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="size-4" />
                <span>{program.documentCount} documents</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
