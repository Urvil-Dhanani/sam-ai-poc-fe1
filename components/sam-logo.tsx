"use client"

import { cn } from "@/lib/utils"

interface SamLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  animated?: boolean
  className?: string
}

export function SamLogo({ size = "md", showText = true, animated = true, className }: SamLogoProps) {
  const sizeClasses = {
    sm: "size-8",
    md: "size-10",
    lg: "size-14",
    xl: "size-20",
  }

  const iconSizes = {
    sm: "size-4",
    md: "size-5",
    lg: "size-7",
    xl: "size-10",
  }

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  const orbitSizes = {
    sm: "size-10",
    md: "size-12",
    lg: "size-16",
    xl: "size-24",
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        {/* Outer glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl bg-gradient-to-r from-primary via-accent to-primary opacity-50 blur-md",
            animated && "animate-pulse",
            sizeClasses[size],
          )}
        />

        {/* Main logo container */}
        <div
          className={cn(
            "relative rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30",
            sizeClasses[size],
          )}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-transparent via-white/10 to-white/20" />

          {/* AI Brain/Circuit icon */}
          <svg viewBox="0 0 24 24" fill="none" className={cn("relative z-10 text-primary-foreground", iconSizes[size])}>
            {/* Central brain/processor shape */}
            <rect
              x="7"
              y="7"
              width="10"
              height="10"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="currentColor"
              fillOpacity="0.2"
            />

            {/* Neural connection dots */}
            <circle cx="12" cy="12" r="1.5" fill="currentColor" />

            {/* Top connections */}
            <line x1="10" y1="7" x2="10" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="7" x2="14" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="10" cy="3.5" r="1" fill="currentColor" />
            <circle cx="14" cy="3.5" r="1" fill="currentColor" />

            {/* Bottom connections */}
            <line x1="10" y1="17" x2="10" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="14" y1="17" x2="14" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="10" cy="20.5" r="1" fill="currentColor" />
            <circle cx="14" cy="20.5" r="1" fill="currentColor" />

            {/* Left connections */}
            <line x1="7" y1="10" x2="4" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="7" y1="14" x2="4" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="3.5" cy="10" r="1" fill="currentColor" />
            <circle cx="3.5" cy="14" r="1" fill="currentColor" />

            {/* Right connections */}
            <line x1="17" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="17" y1="14" x2="20" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20.5" cy="10" r="1" fill="currentColor" />
            <circle cx="20.5" cy="14" r="1" fill="currentColor" />
          </svg>

          {/* Orbiting particle effect */}
          {animated && (
            <div
              className={cn("absolute rounded-full border border-primary/30 animate-spin", orbitSizes[size])}
              style={{ animationDuration: "8s" }}
            >
              <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 size-1.5 rounded-full bg-accent shadow-sm shadow-accent" />
            </div>
          )}
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={cn(
              "font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
              textSizes[size],
            )}
          >
            SAM AI
          </span>
        </div>
      )}
    </div>
  )
}
