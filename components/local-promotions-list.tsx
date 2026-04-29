import { Zap } from "lucide-react"

const PROMOTIONS = [
  {
    id: "1",
    store: "Pizzaria Bella Massa",
    deal: "50% OFF",
    description: "Em toda linha clássica",
    color: "from-brand-500 to-brand-600",
  },
  {
    id: "2",
    store: "Mercado Central",
    deal: "Frete Grátis",
    description: "Compras acima de R$ 50",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "3",
    store: "Farmácia Vida & Saúde",
    deal: "Leve 3, Pague 2",
    description: "Suplementos vitais",
    color: "from-emerald-500 to-emerald-600",
  },
] as const

export function LocalPromotionsList() {
  return (
    <section aria-labelledby="promotions-title" className="py-2 px-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center" aria-hidden="true">
          <Zap className="w-3.5 h-3.5 text-red-500 fill-red-500" />
        </span>
        <h2 id="promotions-title" className="text-lg font-display font-bold text-navy-900">
          Ofertas da Cidade
        </h2>
      </div>

      <ul className="flex flex-col gap-3">
        {PROMOTIONS.map((promo) => (
          <li key={promo.id}>
            <button
              type="button"
              className={`w-full relative overflow-hidden rounded-2xl p-4 bg-gradient-to-r ${promo.color} text-white shadow-lg active:scale-[0.98] transition-transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500/40 flex justify-between items-center group`}
            >
              <span
                className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"
                aria-hidden="true"
              />

              <span className="relative z-10 flex flex-col items-start text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1">{promo.store}</span>
                <span className="text-xl font-display font-bold leading-tight drop-shadow-sm">{promo.deal}</span>
                <span className="text-xs font-medium text-white/90 mt-0.5">{promo.description}</span>
              </span>

              <span className="relative z-10 bg-white text-navy-900 font-bold text-[10px] px-3 py-2 rounded-xl group-hover:bg-navy-50 transition-colors shadow-sm uppercase tracking-wider">
                Aproveitar
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
