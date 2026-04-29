import Link from "next/link"
import {
  Pill,
  Newspaper,
  HeartPulse,
  Trophy,
  CalendarDays,
  Store,
  type LucideIcon,
} from "lucide-react"

interface QuickItem {
  href: string
  label: string
  description: string
  icon: LucideIcon
  tone: "brand" | "navy" | "rose" | "emerald" | "amber" | "sky"
}

const ITEMS: QuickItem[] = [
  {
    href: "/plantao",
    label: "Plantão",
    description: "Farmácia 24h",
    icon: Pill,
    tone: "brand",
  },
  {
    href: "/noticias?cat=prefeitura",
    label: "Prefeitura",
    description: "Comunicados",
    icon: Newspaper,
    tone: "navy",
  },
  {
    href: "/noticias?cat=saude",
    label: "Saúde",
    description: "UBS e campanhas",
    icon: HeartPulse,
    tone: "rose",
  },
  {
    href: "/noticias?cat=esporte",
    label: "Esportes",
    description: "Jogos e ligas",
    icon: Trophy,
    tone: "amber",
  },
  {
    href: "/eventos",
    label: "Eventos",
    description: "O que rola hoje",
    icon: CalendarDays,
    tone: "emerald",
  },
  {
    href: "/comercios",
    label: "Comércios",
    description: "Lojas locais",
    icon: Store,
    tone: "sky",
  },
]

const TONE_CLASSES: Record<QuickItem["tone"], { bg: string; ring: string; icon: string }> = {
  brand: { bg: "bg-brand-50", ring: "ring-brand-100", icon: "text-brand-500" },
  navy: { bg: "bg-navy-50", ring: "ring-navy-100", icon: "text-navy-700" },
  rose: { bg: "bg-rose-50", ring: "ring-rose-100", icon: "text-rose-500" },
  emerald: { bg: "bg-emerald-50", ring: "ring-emerald-100", icon: "text-emerald-600" },
  amber: { bg: "bg-amber-50", ring: "ring-amber-100", icon: "text-amber-600" },
  sky: { bg: "bg-sky-50", ring: "ring-sky-100", icon: "text-sky-600" },
}

export function QuickAccessGrid() {
  return (
    <section aria-labelledby="quick-access-title" className="px-4 pt-2 pb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 id="quick-access-title" className="text-base font-display font-bold text-navy-900">
          Acesso rápido
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {ITEMS.map(({ href, label, description, icon: Icon, tone }) => {
          const t = TONE_CLASSES[tone]
          return (
            <Link
              key={label}
              href={href}
              className="group flex flex-col items-center text-center bg-white rounded-2xl p-3 border border-navy-100 hover:border-navy-200 hover:-translate-y-0.5 transition-all shadow-sm"
            >
              <span
                className={`flex items-center justify-center w-12 h-12 rounded-2xl ${t.bg} ring-1 ${t.ring} mb-2 group-hover:scale-105 transition-transform`}
                aria-hidden="true"
              >
                <Icon className={`w-6 h-6 ${t.icon}`} strokeWidth={2.2} />
              </span>
              <span className="text-[12px] font-bold text-navy-900 leading-tight">{label}</span>
              <span className="text-[10px] text-navy-500 font-medium leading-tight mt-0.5">
                {description}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
