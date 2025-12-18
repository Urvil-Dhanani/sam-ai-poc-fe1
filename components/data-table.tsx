"use client"

import type React from "react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export interface Column<T> {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  actions?: {
    label: string
    onClick: (item: T) => void
    variant?: "default" | "destructive"
  }[]
}

export function DataTable<T extends { id: string | number }>({ columns, data, actions }: DataTableProps<T>) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-secondary/50 hover:bg-secondary/50">
            {columns.map((column) => (
              <TableHead key={String(column.key)} className="text-muted-foreground">
                {column.header}
              </TableHead>
            ))}
            {actions && <TableHead className="w-12"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id} className="border-border">
              {columns.map((column) => (
                <TableCell key={`${item.id}-${String(column.key)}`}>
                  {column.render ? column.render(item) : String(item[column.key as keyof T] ?? "")}
                </TableCell>
              ))}
              {actions && (
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {actions.map((action) => (
                        <DropdownMenuItem
                          key={action.label}
                          onClick={() => action.onClick(item)}
                          className={action.variant === "destructive" ? "text-destructive" : ""}
                        >
                          {action.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, { className: string; label: string }> = {
    active: { className: "bg-accent/20 text-accent border-accent/30", label: "Active" },
    disabled: { className: "bg-muted text-muted-foreground border-border", label: "Disabled" },
    pending: { className: "bg-chart-3/20 text-chart-3 border-chart-3/30", label: "Pending" },
    processed: { className: "bg-accent/20 text-accent border-accent/30", label: "Processed" },
    error: { className: "bg-destructive/20 text-destructive border-destructive/30", label: "Error" },
    "not-contacted": { className: "bg-muted text-muted-foreground border-border", label: "Not Contacted" },
    "in-conversation": { className: "bg-primary/20 text-primary border-primary/30", label: "In Conversation" },
    completed: { className: "bg-accent/20 text-accent border-accent/30", label: "Completed" },
  }

  const variant = variants[status.toLowerCase()] || variants.pending

  return (
    <Badge variant="outline" className={variant.className}>
      {variant.label}
    </Badge>
  )
}
