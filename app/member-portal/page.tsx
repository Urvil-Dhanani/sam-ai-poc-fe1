"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2, User, Shield, CheckCircle2 } from "lucide-react"
import { SamLogo } from "@/components/sam-logo"

export default function MemberPortalPage() {
  const [email, setEmail] = useState("")
  const [memberId, setMemberId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const router = useRouter()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsVerifying(false)
    setIsVerified(true)
    setTimeout(() => {
      router.push("/member-portal/dashboard")
    }, 500)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card border-border text-center">
          <CardContent className="pt-8 pb-8">
            <div className="size-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="size-8 text-accent" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Verification Successful</h2>
            <p className="text-muted-foreground">Redirecting to your member portal...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <SamLogo size="sm" animated={false} />
          <span className="text-muted-foreground">| Member Portal</span>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16 flex items-center justify-center">
        <Card className="w-full max-w-md bg-card border-border">
          <CardHeader className="text-center">
            <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="size-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Member Verification</CardTitle>
            <CardDescription>
              Please verify your identity to access your benefits information and chat with SAM AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-input border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="memberId">Member ID</Label>
                <Input
                  id="memberId"
                  placeholder="e.g., MEM-12345"
                  value={memberId}
                  onChange={(e) => setMemberId(e.target.value)}
                  className="bg-input border-border"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isVerifying}>
                {isVerifying ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <User className="size-4 mr-2" />
                    Verify & Continue
                  </>
                )}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Your information is secure and will only be used to verify your membership.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
