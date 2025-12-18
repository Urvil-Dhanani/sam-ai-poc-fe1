"use client";

import type React from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SamLogo } from "@/components/sam-logo";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarNavProps {
  items: NavItem[];
  title: string;
}

export function SidebarNav({ items, title }: SidebarNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const LogoClick = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        router.push("/super-admin");
      } else {
        router.push("/");
      }
    }
  };

  return (
    <aside className="w-64 border-r border-sidebar-border bg-sidebar min-h-screen flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <span className="block">
          <SamLogo size="sm" animated={false} />
        </span>
        <p className="text-xs text-muted-foreground mt-2">{title}</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
