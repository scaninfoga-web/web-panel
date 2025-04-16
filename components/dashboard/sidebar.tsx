"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Bookmark,
  Clock,
  FileText,
  LayoutDashboard,
  Monitor,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarLinks = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    title: "Bookmarks",
    icon: Bookmark,
    href: "/dashboard/bookmarks",
  },
  {
    title: "History",
    icon: Clock,
    href: "/dashboard/history",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/dashboard/reports",
  },
  {
    title: "Monitor",
    icon: Monitor,
    href: "/dashboard/monitor",
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-800 bg-gray-900/50 pt-16 backdrop-blur-sm">
      <div className="flex h-full flex-col px-3 py-4">
        <nav className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className="block"
              >
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 hover:bg-gray-800/50",
                    isActive && "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.title}
                </Button>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
