"use client"

import { Home, PlaySquare, ShoppingBag, User } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const TABS = [
  { id: "home", label: "Início", icon: Home, href: "/" },
  { id: "promocoes", label: "Promo", icon: PlaySquare, href: "/promocoes" },
  { id: "pedidos", label: "Pedidos", icon: ShoppingBag, href: "/pedidos" },
  { id: "perfil", label: "Perfil", icon: User, href: "/perfil" },
] as const

export function ClientBottomNav() {
  const [activeId, setActiveId] = useState<(typeof TABS)[number]["id"]>("home")

  return (
    <nav
      aria-label="Navegação principal"
      className="absolute bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-navy-100"
    >
      <ul className="flex justify-around items-center h-[70px] px-2">
        {TABS.map((tab) => {
          const isActive = activeId === tab.id
          const Icon = tab.icon

          return (
            <li key={tab.id} className="flex-1">
              <button
                type="button"
                onClick={() => setActiveId(tab.id)}
                className="relative flex flex-col items-center justify-center w-full h-[70px] gap-1 focus:outline-none"
                aria-current={isActive ? "page" : undefined}
              >
                <span className="relative flex items-center justify-center w-10 h-10">
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-brand-500/15 rounded-full transition-all"
                      aria-hidden="true"
                    />
                  )}
                  <Icon
                    className={cn(
                      "w-6 h-6 z-10 transition-colors duration-300",
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
                  {tab.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
