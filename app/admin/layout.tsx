import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Admin Beta — Buscou, Achou",
  description: "Painel administrativo para gerenciar conteúdo da beta da cidade.",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-navy-50">
      <header className="bg-white border-b border-navy-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/logo-buscou-achou.jpeg"
              alt="Buscou, Achou"
              width={36}
              height={36}
              className="w-9 h-9 rounded-lg object-cover ring-1 ring-navy-100 flex-shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest leading-none">
                Admin Beta
              </span>
              <span className="text-sm font-display font-bold text-navy-900 truncate">
                Buscou, Achou
              </span>
            </div>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-600 hover:text-navy-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" strokeWidth={2.5} />
            Voltar ao app
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
    </div>
  )
}
