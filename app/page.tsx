import Link from "next/link"
import { Building2, Users, Shield, Sparkles, Zap, ArrowRight, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SamLogo } from "@/components/sam-logo"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-40 right-1/4 w-72 h-72 bg-chart-3/15 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <SamLogo size="md" animated={false} />
          <nav className="flex items-center gap-6">
            <Link href="/login">
              <Button size="sm" className="gap-2">
                <Sparkles className="size-4" />
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-20 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-primary/25 rounded-full blur-[80px] animate-pulse pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <Zap className="size-4" />
              AI-Powered Platform
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text">
              Smart Association
              <br />
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Management
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
              AI-powered platform for managing associations, members, and benefit with intelligent document processing
              and automated follow-ups.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary" />
                Intelligent Document Processing
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-accent" />
                Automated Follow-ups
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-chart-3" />
                Real-time Analytics
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          {/* Glowing background for CTA */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-3xl" />

          <Card className="relative border-2 border-primary/20 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm shadow-2xl shadow-primary/10 overflow-hidden">
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-50 animate-pulse" />

            <CardContent className="relative p-12 md:p-16">
              <div className="text-center max-w-3xl mx-auto space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                  <Sparkles className="size-4" />
                  Start Your Journey
                </div>

                {/* Heading */}
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-bold text-balance">
                    Access Your{" "}
                    <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                      Benefits Platform
                    </span>
                  </h2>
                  <p className="text-lg text-muted-foreground text-pretty leading-relaxed">
                    Join thousands of members and administrators managing associations, benefits, and member experiences
                    with AI-powered intelligence. Login to access your personalized dashboard.
                  </p>
                </div>



                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Link href="/login" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full gap-3 text-base px-8 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                    >
                      <Sparkles className="size-5" />
                      Login to Dashboard
                      <ArrowRight className="size-5" />
                    </Button>
                  </Link>
                  {/* <Link href="/login" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full gap-3 text-base px-8 border-2 bg-transparent hover:bg-primary/5"
                    >
                      <UserPlus className="size-5" />
                      Create Account
                    </Button>
                  </Link> */}
                </div>

                {/* Trust indicators */}
                <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-sm text-muted-foreground border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-green-500" />
                    Secure Access
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    24/7 Support
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-purple-500" />
                    AI-Powered
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/50 pt-16">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              500+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Associations</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              50K+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              1M+
            </div>
            <div className="text-sm text-muted-foreground mt-1">Documents Processed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              99.9%
            </div>
            <div className="text-sm text-muted-foreground mt-1">Uptime</div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <SamLogo size="sm" animated={false} />
          <p className="text-sm text-muted-foreground">© 2025 SAM AI. Smart Association Management Platform.</p>
        </div>
      </footer>
    </div>
  )
}
