import { Loader2 } from "lucide-react"
import { SamLogo } from "@/components/sam-logo"

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-6 flex justify-center">
          <SamLogo size="xl" showText={false} animated={true} />
          <div className="absolute -bottom-2 -right-2 size-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
            <Loader2 className="size-4 text-primary animate-spin" />
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">Loading Your Portal</h2>
        <p className="text-muted-foreground text-sm">Preparing your personalized dashboard...</p>
        <div className="flex justify-center gap-1 mt-6">
          <span className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="size-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="size-2 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}
