import Link from "next/link"
import { ChevronLeft, Plus } from "lucide-react"

interface AdminSectionHeaderProps {
  title: string
  description?: string
  ctaLabel?: string
}

export function AdminSectionHeader({ title, description, ctaLabel }: AdminSectionHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-6">
      <div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-1 text-[11px] font-bold text-navy-500 hover:text-navy-900 uppercase tracking-widest mb-1.5 transition-colors"
        >
          <ChevronLeft className="w-3 h-3" strokeWidth={2.5} />
          Voltar ao painel
        </Link>
        <h1 className="text-xl sm:text-2xl font-display font-black text-navy-900 leading-tight">
          {title}
        </h1>
        {description ? (
          <p className="text-sm text-navy-500 font-medium mt-1">{description}</p>
        ) : null}
      </div>

      {ctaLabel ? (
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-sm rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          {ctaLabel}
        </button>
      ) : null}
    </div>
  )
}
