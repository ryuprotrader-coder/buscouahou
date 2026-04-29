"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Newspaper, Pill, CalendarDays, Store } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Início", icon: Home },
  { href: "/noticias", label: "Notícias", icon: Newspaper },
  { href: "/plantao", label: "Plantão", icon: Pill },
  { href: "/eventos", label: "Eventos", icon: CalendarDays },
  { href: "/comercios", label: "Comércios", icon: Store },
] as const

export function ClientBottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Navegação principal"
      className="absolute bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-navy-100"
    >
      <ul className="flex justify-around items-stretch px-1 pt-1.5 pb-[max(env(safe-area-inset-bottom),0.5rem)]">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href)

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className="relative flex flex-col items-center justify-center w-full gap-1 py-1 focus:outline-none"
              >
                <span className="relative flex items-center justify-center w-12 h-7">
                  {isActive && (
                    <span className="absolute inset-0 bg-brand-500/15 rounded-full" aria-hidden="true" />
                  )}
                  <Icon
                    className={cn(
                      "w-[22px] h-[22px] z-10 transition-colors duration-300",
                      isActive ? "text-brand-500" : "text-navy-400",
                    )}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </span>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors duration-300",
                    isActive ? "text-brand-500" : "text-navy-500",
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
