import type { ReactNode } from "react"
import { ClientHeader } from "@/components/client-header"
import { ClientBottomNav } from "@/components/client-bottom-nav"
import { cn } from "@/lib/utils"

interface PhoneFrameProps {
  children: ReactNode
  /** Use false em páginas que precisam de header customizado (ex: páginas com voltar) */
  withDefaultHeader?: boolean
  customHeader?: ReactNode
  className?: string
}

/**
 * Frame mobile compartilhado por todas as telas da beta.
 * Renderiza header sticky no topo, área scrollável central e bottom nav fixo.
 */
export function PhoneFrame({
  children,
  withDefaultHeader = true,
  customHeader,
  className,
}: PhoneFrameProps) {
  return (
    <div className="min-h-[100dvh] bg-navy-100 flex justify-center">
      <div className="flex flex-col h-[100dvh] w-full max-w-md relative bg-white shadow-2xl xl:border-x xl:border-navy-100">
        <div className="absolute top-0 inset-x-0 z-30">
          {customHeader ?? (withDefaultHeader ? <ClientHeader /> : null)}
        </div>

        <main
          className={cn(
            "flex-1 overflow-y-auto no-scrollbar relative w-full bg-white",
            customHeader ? "pt-[64px]" : withDefaultHeader ? "pt-[78px]" : "pt-0",
            "pb-[88px]",
            className,
          )}
        >
          {children}
        </main>

        <ClientBottomNav />
      </div>
    </div>
  )
}
