"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Database, FileText, Clock, CheckCircle2, AlertCircle, RefreshCw, Mail, Users } from "lucide-react"

const processingStats = {
  totalDocuments: 1247,
  processed: 1189,
  pending: 42,
  failed: 16,
}

const recentDocuments = [
  { id: "1", name: "Dental_Coverage_2024.pdf", association: "Healthcare Inc.", status: "completed", time: "2 min ago" },
  {
    id: "2",
    name: "Vision_Benefits_Guide.pdf",
    association: "Healthcare Inc.",
    status: "processing",
    time: "5 min ago",
  },
  {
    id: "3",
    name: "Life_Insurance_Terms.pdf",
    association: "TechWorkers Union",
    status: "completed",
    time: "12 min ago",
  },
  { id: "4", name: "Retirement_Plan_FAQ.pdf", association: "TechWorkers Union", status: "failed", time: "15 min ago" },
  {
    id: "5",
    name: "Mental_Health_Resources.pdf",
    association: "Educators Assoc.",
    status: "completed",
    time: "20 min ago",
  },
]

const followUpSchedules = [
  { id: "1", association: "Healthcare Inc.", type: "New Member Welcome", interval: "Immediate", active: true },
  { id: "2", association: "Healthcare Inc.", type: "Benefits Reminder", interval: "7 days", active: true },
  { id: "3", association: "TechWorkers Union", type: "Engagement Check", interval: "30 days", active: true },
  { id: "4", association: "Educators Assoc.", type: "Renewal Notice", interval: "60 days", active: false },
]

export default function AISystemPage() {
  const completionRate = Math.round((processingStats.processed / processingStats.totalDocuments) * 100)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">AI System</h1>
          <p className="text-muted-foreground">Monitor AI processing, knowledge indexing, and automations</p>
        </div>
        <Button>
          <RefreshCw className="size-4 mr-2" />
          Refresh Status
        </Button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Total Documents</CardDescription>
            <CardTitle className="text-3xl">{processingStats.totalDocuments.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Database className="size-4" />
              <span>In knowledge base</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Processed</CardDescription>
            <CardTitle className="text-3xl text-accent">{processingStats.processed.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-accent">
              <CheckCircle2 className="size-4" />
              <span>{completionRate}% complete</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl text-chart-4">{processingStats.pending}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-chart-4">
              <Clock className="size-4" />
              <span>In queue</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Failed</CardDescription>
            <CardTitle className="text-3xl text-destructive">{processingStats.failed}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="size-4" />
              <span>Need attention</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="knowledge" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="knowledge">Knowledge Processing</TabsTrigger>
          <TabsTrigger value="followups">Follow-Up Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="knowledge">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="size-5" />
                Document Processing Pipeline
              </CardTitle>
              <CardDescription>Recent document processing activity across all associations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.association}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">{doc.time}</span>
                      <Badge
                        variant={
                          doc.status === "completed"
                            ? "default"
                            : doc.status === "processing"
                              ? "secondary"
                              : "destructive"
                        }
                        className={doc.status === "completed" ? "bg-accent text-accent-foreground" : ""}
                      >
                        {doc.status === "processing" && <RefreshCw className="size-3 mr-1 animate-spin" />}
                        {doc.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="followups">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="size-5" />
                Follow-Up Schedules
              </CardTitle>
              <CardDescription>Automated email follow-up configurations by association</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {followUpSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                        <Users className="size-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="font-medium">{schedule.type}</p>
                        <p className="text-sm text-muted-foreground">{schedule.association}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{schedule.interval}</Badge>
                      <Badge variant={schedule.active ? "default" : "secondary"}>
                        {schedule.active ? "Active" : "Paused"}
                      </Badge>
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
