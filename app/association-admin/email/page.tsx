"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Server,
  Lock,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Eye,
  EyeOff,
  Settings2,
  Zap,
  Info,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function EmailSettingsPage() {
  const [isTesting, setIsTesting] = useState(false)
  const [testResult, setTestResult] = useState<"success" | "error" | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "checking">("connected")

  const handleTestEmail = async () => {
    setIsTesting(true)
    setTestResult(null)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsTesting(false)
    setTestResult("success")
  }

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="size-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
              <Mail className="size-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Email Settings</h1>
              <p className="text-muted-foreground mt-1">
                Configure SMTP settings for member outreach and notifications
              </p>
            </div>
          </div>
        </div>

        {/* Connection Status Banner */}
        <div
          className={cn(
            "mb-6 p-4 rounded-xl flex items-center justify-between",
            connectionStatus === "connected"
              ? "bg-accent/10 border border-accent/20"
              : "bg-destructive/10 border border-destructive/20",
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "size-3 rounded-full animate-pulse",
                connectionStatus === "connected" ? "bg-accent" : "bg-destructive",
              )}
            />
            <span className={cn("font-medium", connectionStatus === "connected" ? "text-accent" : "text-destructive")}>
              {connectionStatus === "connected" ? "SMTP Connection Active" : "SMTP Disconnected"}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">Last verified: 2 hours ago</span>
        </div>

        <Tabs defaultValue="smtp" className="space-y-6">
          <TabsList className="bg-secondary/50 p-1">
            <TabsTrigger value="smtp" className="data-[state=active]:bg-background">
              <Server className="size-4 mr-2" />
              SMTP Server
            </TabsTrigger>
            <TabsTrigger value="sender" className="data-[state=active]:bg-background">
              <Mail className="size-4 mr-2" />
              Sender Info
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-background">
              <Settings2 className="size-4 mr-2" />
              Advanced
            </TabsTrigger>
          </TabsList>

          <TabsContent value="smtp" className="space-y-6">
            <Card className="bg-card border-border overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Server className="size-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">SMTP Configuration</CardTitle>
                    <CardDescription>Server settings for sending emails to your members</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Quick Setup Presets */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Quick Setup</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {["Gmail", "Outlook", "SendGrid", "Custom"].map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        className={cn(
                          "p-3 rounded-xl border text-sm font-medium transition-all",
                          provider === "Custom"
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-secondary/50 border-border hover:border-primary/50",
                        )}
                      >
                        {provider}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="smtpHost" className="text-sm font-medium">
                      SMTP Host <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="smtpHost"
                      placeholder="smtp.example.com"
                      className="bg-input border-border h-11"
                      defaultValue="smtp.healthcare-inc.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort" className="text-sm font-medium">
                      Port <span className="text-destructive">*</span>
                    </Label>
                    <Select defaultValue="587">
                      <SelectTrigger className="bg-input border-border h-11">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25 (SMTP)</SelectItem>
                        <SelectItem value="465">465 (SSL)</SelectItem>
                        <SelectItem value="587">587 (TLS)</SelectItem>
                        <SelectItem value="2525">2525 (Alternative)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername" className="text-sm font-medium">
                      Username <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="smtpUsername"
                      placeholder="your@email.com"
                      className="bg-input border-border h-11"
                      defaultValue="sam@healthcare-inc.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword" className="text-sm font-medium">
                      Password <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="smtpPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••"
                        className="bg-input border-border h-11 pr-20"
                        defaultValue="secretpassword123"
                      />
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-8"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                        </Button>
                        <Lock className="size-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                  <div className="flex items-center gap-3">
                    <Shield className="size-5 text-accent" />
                    <div>
                      <p className="font-medium text-sm">Use TLS Encryption</p>
                      <p className="text-xs text-muted-foreground">Secure connection for email delivery</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sender" className="space-y-6">
            <Card className="bg-card border-border overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-accent via-accent/60 to-transparent" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Mail className="size-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Sender Information</CardTitle>
                    <CardDescription>How your emails will appear to members</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fromName" className="text-sm font-medium">
                      From Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fromName"
                      placeholder="Your Organization"
                      className="bg-input border-border h-11"
                      defaultValue="SAM - Healthcare Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fromEmail" className="text-sm font-medium">
                      From Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="fromEmail"
                      type="email"
                      placeholder="noreply@example.com"
                      className="bg-input border-border h-11"
                      defaultValue="benefits@healthcare-inc.com"
                    />
                  </div>
                </div>

                {/* Email Preview */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Email Preview</Label>
                  <div className="p-4 rounded-xl bg-secondary/30 border border-border">
                    <div className="flex items-center gap-3 pb-3 border-b border-border">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">SAM - Healthcare Inc.</p>
                        <p className="text-xs text-muted-foreground">benefits@healthcare-inc.com</p>
                      </div>
                    </div>
                    <div className="pt-3">
                      <p className="text-sm font-medium">Subject: Your Benefits Update</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        This is how your emails will appear in member inboxes...
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="bg-card border-border overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-chart-4 via-chart-4/60 to-transparent" />
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-xl bg-chart-4/10 flex items-center justify-center">
                    <Zap className="size-6 text-chart-4" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Advanced Settings</CardTitle>
                    <CardDescription>Fine-tune your email delivery configuration</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                  <div>
                    <p className="font-medium text-sm">Rate Limiting</p>
                    <p className="text-xs text-muted-foreground">Limit emails sent per hour to avoid spam filters</p>
                  </div>
                  <Select defaultValue="100">
                    <SelectTrigger className="w-32 bg-input border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">50/hour</SelectItem>
                      <SelectItem value="100">100/hour</SelectItem>
                      <SelectItem value="200">200/hour</SelectItem>
                      <SelectItem value="500">500/hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                  <div>
                    <p className="font-medium text-sm">Retry Failed Emails</p>
                    <p className="text-xs text-muted-foreground">Automatically retry sending failed emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                  <div>
                    <p className="font-medium text-sm">Track Opens & Clicks</p>
                    <p className="text-xs text-muted-foreground">Monitor email engagement metrics</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 border border-border">
                  <div>
                    <p className="font-medium text-sm">Bounce Handling</p>
                    <p className="text-xs text-muted-foreground">Automatically manage bounced emails</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Test Connection Card */}
        <Card className="bg-card border-border overflow-hidden mt-6">
          <div className="h-1 bg-gradient-to-r from-chart-3 via-chart-3/60 to-transparent" />
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-xl bg-chart-3/10 flex items-center justify-center">
                <Send className="size-6 text-chart-3" />
              </div>
              <div>
                <CardTitle className="text-xl">Test Connection</CardTitle>
                <CardDescription>Send a test email to verify your settings are working correctly</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email to receive test"
                className="bg-input border-border h-11 flex-1"
              />
              <Button variant="secondary" onClick={handleTestEmail} disabled={isTesting} className="px-6">
                {isTesting ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="size-4 mr-2" />
                    Send Test
                  </>
                )}
              </Button>
            </div>
            {testResult && (
              <div
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl",
                  testResult === "success"
                    ? "bg-accent/10 border border-accent/20"
                    : "bg-destructive/10 border border-destructive/20",
                )}
              >
                {testResult === "success" ? (
                  <>
                    <CheckCircle2 className="size-5 text-accent" />
                    <div>
                      <p className="font-medium text-accent">Test email sent successfully!</p>
                      <p className="text-sm text-muted-foreground">Check your inbox for the test message</p>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertCircle className="size-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">Failed to send test email</p>
                      <p className="text-sm text-muted-foreground">Please verify your SMTP settings and try again</p>
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end mt-6 pt-6 border-t border-border">
          <div className="flex gap-3">
            <Button variant="outline">Reset to Default</Button>
            <Button onClick={handleSave} disabled={isSaving} className="px-8">
              {isSaving ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Settings"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
