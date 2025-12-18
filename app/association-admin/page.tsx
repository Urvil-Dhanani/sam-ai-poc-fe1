import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Gift, FileText, Mail, CheckCircle2, AlertCircle, Clock, Bot } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AssociationAdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Association Dashboard</h1>
        <p className="text-muted-foreground">Healthcare Inc. - Overview and quick actions</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Members"
          value="1,250"
          icon={<Users className="size-6 text-primary" />}
          trend={{ value: 5, label: "this month" }}
        />
        <StatCard
          title="Benefit"
          value={8}
          icon={<Gift className="size-6 text-accent" />}
          description="3 new this quarter"
        />
        <StatCard
          title="Documents"
          value={45}
          icon={<FileText className="size-6 text-chart-3" />}
          description="All indexed"
        />
        <StatCard
          title="Email Status"
          value="Active"
          icon={<Mail className="size-6 text-chart-4" />}
          description="SMTP configured"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="size-5 text-primary" />
              AI Knowledge Indexing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Overall Progress</span>
                  <span className="text-sm font-medium">94%</span>
                </div>
                <Progress value={94} className="h-2" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <CheckCircle2 className="size-5 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-xs text-muted-foreground">Processed</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <Clock className="size-5 text-chart-3 mx-auto mb-2" />
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 text-center">
                  <AlertCircle className="size-5 text-destructive mx-auto mb-2" />
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-xs text-muted-foreground">Errors</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Member Status Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-muted-foreground" />
                  <div>
                    <p className="font-medium">Not Contacted</p>
                    <p className="text-sm text-muted-foreground">Awaiting outreach</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">423</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">In Conversation</p>
                    <p className="text-sm text-muted-foreground">Active engagement</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">312</span>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <div className="size-3 rounded-full bg-accent" />
                  <div>
                    <p className="font-medium">Completed</p>
                    <p className="text-sm text-muted-foreground">Enrollment finished</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">515</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recent Email Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                member: "Alice Johnson",
                action: "Replied to benefit inquiry",
                time: "5 min ago",
                status: "in-conversation",
              },
              { member: "Bob Williams", action: "Follow-up #2 sent", time: "15 min ago", status: "not-contacted" },
              { member: "Carol Davis", action: "Completed enrollment", time: "1 hour ago", status: "completed" },
              { member: "David Martinez", action: "Initial email sent", time: "2 hours ago", status: "not-contacted" },
              {
                member: "Eva Thompson",
                action: "Asked about dental plan",
                time: "3 hours ago",
                status: "in-conversation",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`size-2 rounded-full ${
                      item.status === "completed"
                        ? "bg-accent"
                        : item.status === "in-conversation"
                          ? "bg-primary"
                          : "bg-muted-foreground"
                    }`}
                  />
                  <div>
                    <p className="font-medium text-sm">{item.member}</p>
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
