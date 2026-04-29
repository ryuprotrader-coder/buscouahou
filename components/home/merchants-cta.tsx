import Link from "next/link"
import { Sparkles, Megaphone, ArrowRight } from "lucide-react"

export function MerchantsCta() {
  return (
    <section aria-labelledby="merchants-cta-title" className="px-4 pb-8">
      <div className="rounded-3xl border border-navy-100 bg-navy-50/60 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-brand-500" strokeWidth={2.5} />
          <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">
            Em breve
          </span>
        </div>
        <h2
          id="merchants-cta-title"
          className="text-lg font-display font-bold text-navy-900 leading-tight mb-1.5 text-balance"
        >
          Empresas locais no Buscou, Achou
        </h2>
        <p className="text-[13px] text-navy-600 font-medium leading-snug mb-4">
          Estamos abrindo cadastros para mercados, restaurantes, farmácias, barbearias, lojas e
          prestadores de serviço da cidade.
        </p>

        <Link
          href="/comercios#cta"
          className="group flex items-center justify-between gap-3 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow"
        >
          <span className="flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
              <Megaphone className="w-5 h-5" strokeWidth={2.2} />
            </span>
            <span className="flex flex-col text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                Comerciante
              </span>
              <span className="text-sm font-bold leading-tight">
                Quer sua empresa aparecendo aqui?
              </span>
            </span>
          </span>
          <ArrowRight
            className="w-5 h-5 flex-shrink-0 group-hover:translate-x-0.5 transition-transform"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </section>
  )
}
