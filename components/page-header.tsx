import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  backHref?: string
}

export function PageHeader({ title, subtitle, backHref = "/" }: PageHeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-xl px-4 py-3 border-b border-navy-100 shadow-sm flex items-center gap-3">
      <Link
        href={backHref}
        aria-label="Voltar"
        className="flex items-center justify-center w-9 h-9 rounded-full bg-navy-50 hover:bg-navy-100 transition-colors flex-shrink-0"
      >
        <ArrowLeft className="w-4 h-4 text-navy-700" strokeWidth={2.5} />
      </Link>
      <div className="flex flex-col min-w-0">
        <h1 className="text-base font-display font-bold text-navy-900 leading-tight truncate">
          {title}
        </h1>
        {subtitle ? (
          <p className="text-[11px] text-navy-500 font-medium leading-tight truncate">{subtitle}</p>
        ) : null}
      </div>
    </header>
  )
}
