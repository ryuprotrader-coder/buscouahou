import {
  UtensilsCrossed,
  ShoppingBasket,
  Pill,
  Scissors,
  ShoppingBag,
  Wrench,
  Sparkles,
  type LucideIcon,
} from "lucide-react"
import { commerceCategories } from "@/lib/mock-data"
import type { CommerceCategorySlug } from "@/lib/types"
import { MerchantLeadForm } from "./merchant-lead-form"

const ICONS: Record<CommerceCategorySlug, LucideIcon> = {
  restaurantes: UtensilsCrossed,
  mercados: ShoppingBasket,
  farmacias: Pill,
  barbearias: Scissors,
  lojas: ShoppingBag,
  servicos: Wrench,
}

export function CommerceShowcase() {
  return (
    <div className="px-4 pt-4 pb-6">
      <section aria-labelledby="commerce-intro-title" className="mb-6">
        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-brand-500 uppercase tracking-widest mb-2">
          <Sparkles className="w-3.5 h-3.5" strokeWidth={2.5} />
          Beta da cidade
        </span>
        <h2
          id="commerce-intro-title"
          className="text-xl font-display font-black text-navy-900 leading-tight mb-2 text-balance"
        >
          As lojas locais estão chegando
        </h2>
        <p className="text-[13px] text-navy-600 leading-snug text-pretty">
          Estamos preparando a vitrine completa dos comércios da cidade. Confira as categorias e
          venha fazer parte.
        </p>
      </section>

      <section aria-labelledby="commerce-categories-title" className="mb-6">
        <h3
          id="commerce-categories-title"
          className="text-sm font-display font-bold text-navy-900 mb-3"
        >
          Categorias
        </h3>
        <ul className="grid grid-cols-2 gap-3">
          {commerceCategories.map((cat) => {
            const Icon = ICONS[cat.slug]
            const isOpen = cat.status === "cadastros-abertos"
            return (
              <li key={cat.slug}>
                <article className="h-full bg-white rounded-2xl border border-navy-100 p-3.5 flex flex-col shadow-sm">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-navy-50 ring-1 ring-navy-100">
                      <Icon className="w-5 h-5 text-navy-700" strokeWidth={2.2} />
                    </span>
                    <span
                      className={
                        isOpen
                          ? "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                          : "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-navy-50 text-navy-500 ring-1 ring-navy-100"
                      }
                    >
                      {isOpen ? "Cadastrando" : "Em breve"}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-navy-900 leading-tight mb-0.5">
                    {cat.name}
                  </h4>
                  <p className="text-[11px] text-navy-500 leading-snug mb-2 line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mt-auto">
                    +{cat.estimated_count} mapeados
                  </span>
                </article>
              </li>
            )
          })}
        </ul>
      </section>

      <section id="cta" aria-labelledby="commerce-cta-title" className="scroll-mt-20">
        <h3
          id="commerce-cta-title"
          className="text-sm font-display font-bold text-navy-900 mb-3"
        >
          Quer aparecer aqui?
        </h3>
        <MerchantLeadForm />
      </section>
    </div>
  )
}
