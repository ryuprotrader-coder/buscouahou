import Link from "next/link"
import {
  Newspaper,
  Pill,
  CalendarDays,
  Users,
  Settings,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import {
  appSettings,
  businessLeads,
  cityEvents,
  cityPosts,
  upcomingPharmacyDuty,
} from "@/lib/mock-data"

interface AdminCard {
  href: string
  title: string
  description: string
  icon: LucideIcon
  metric: string
  metricLabel: string
}

export default function AdminDashboardPage() {
  const cards: AdminCard[] = [
    {
      href: "/admin/noticias",
      title: "Gerenciar notícias",
      description: "Comunicados, prefeitura, saúde, esporte, educação e cultura.",
      icon: Newspaper,
      metric: String(cityPosts.length),
      metricLabel: "publicadas",
    },
    {
      href: "/admin/plantao",
      title: "Farmácia de plantão",
      description: "Atualizar a escala diária e os próximos plantões.",
      icon: Pill,
      metric: String(upcomingPharmacyDuty.length + 1),
      metricLabel: "agendados",
    },
    {
      href: "/admin/eventos",
      title: "Gerenciar eventos",
      description: "Calendário público de eventos da cidade.",
      icon: CalendarDays,
      metric: String(cityEvents.length),
      metricLabel: "no calendário",
    },
    {
      href: "/admin/leads",
      title: "Leads de comerciantes",
      description: "Empresas interessadas em entrar no app.",
      icon: Users,
      metric: String(businessLeads.filter((l) => l.status === "novo").length),
      metricLabel: "novos",
    },
    {
      href: "/admin/configuracoes",
      title: "Configurações da cidade",
      description: "Nome da cidade, slogan, contato e identidade da beta.",
      icon: Settings,
      metric: appSettings.city_name,
      metricLabel: "cidade ativa",
    },
  ]

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <span className="text-[11px] font-bold text-brand-500 uppercase tracking-widest">
          Painel
        </span>
        <h1 className="text-2xl sm:text-3xl font-display font-black text-navy-900 mt-1 leading-tight">
          Olá, gestor
        </h1>
        <p className="text-sm text-navy-500 font-medium mt-1">
          Atualize as informações que aparecem no app público da cidade.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-white rounded-2xl border border-navy-100 p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-navy-50 ring-1 ring-navy-100">
                <card.icon className="w-5 h-5 text-navy-700" strokeWidth={2.2} />
              </span>
              <div className="text-right">
                <span className="block text-xl font-display font-black text-navy-900 leading-none">
                  {card.metric}
                </span>
                <span className="text-[10px] font-bold text-navy-400 uppercase tracking-widest">
                  {card.metricLabel}
                </span>
              </div>
            </div>
            <h2 className="text-base font-display font-bold text-navy-900 mb-1.5">
              {card.title}
            </h2>
            <p className="text-[12px] text-navy-500 leading-snug mb-4 text-pretty">
              {card.description}
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-500 mt-auto group-hover:gap-2.5 transition-all">
              Abrir
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
