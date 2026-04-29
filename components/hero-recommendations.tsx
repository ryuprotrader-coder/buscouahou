import { Flame, Star, MapPin, Eye, TrendingUp } from "lucide-react"

const RECOMMENDATIONS = [
  {
    id: "rec1",
    type: "PROMO",
    title: "Pizza Bella Massa",
    highlight: "30% OFF Hoje",
    context: "Você pediu pizza na última sexta",
    socialProof: "12 pessoas vendo agora",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    overlay: "from-brand-500/90 to-brand-600/90",
    iconBg: "bg-white/20",
    Icon: Flame,
    trending: true,
  },
  {
    id: "rec2",
    type: "TOP",
    title: "Padaria Central",
    highlight: "Mais bem avaliado",
    context: "Líder em cafés da manhã",
    socialProof: "3 pedidos nos últimos 10 min",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    overlay: "from-amber-500/90 to-amber-600/90",
    iconBg: "bg-white/20",
    Icon: Star,
    trending: false,
  },
  {
    id: "rec3",
    type: "NEARBY",
    title: "Farmácia Vida",
    highlight: "A apenas 400m",
    context: "Entrega rápida disponível",
    socialProof: "Nova na plataforma",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&q=80",
    overlay: "from-blue-500/90 to-blue-600/90",
    iconBg: "bg-white/20",
    Icon: MapPin,
    trending: false,
  },
] as const

export function HeroRecommendations() {
  return (
    <section className="pt-2 pb-6" aria-labelledby="hero-rec-title">
      <div className="px-4 mb-4 flex items-end justify-between">
        <div>
          <span className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1 block">Para você</span>
          <h2 id="hero-rec-title" className="text-2xl font-display font-black text-neutral-900 leading-none text-balance">
            Ribeirão Branco
          </h2>
        </div>
      </div>

      <ul className="flex overflow-x-auto snap-x snap-mandatory px-4 pb-4 gap-4 no-scrollbar">
        {RECOMMENDATIONS.map((item) => {
          const { Icon } = item
          return (
            <li
              key={item.id}
              className="flex-shrink-0 snap-center w-72 h-44 rounded-3xl overflow-hidden relative group shadow-lg border border-white/10 cursor-pointer transition-transform active:scale-[0.98] hover:-translate-y-0.5"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${item.overlay} mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between z-10 text-white">
                <div className="flex justify-between items-start">
                  <div className={`${item.iconBg} backdrop-blur-md rounded-full p-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {item.trending && (
                    <div className="bg-white text-neutral-900 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-full flex items-center shadow-sm">
                      <TrendingUp className="w-3 h-3 mr-1 text-brand-500" />
                      Em alta
                    </div>
                  )}
                </div>

                <div>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider block mb-0.5">
                    {item.context}
                  </span>
                  <h3 className="text-xl font-display font-bold leading-none mb-1 drop-shadow-sm">{item.title}</h3>
                  <p className="font-bold text-brand-300 text-sm mb-3">{item.highlight}</p>

                  {/* Social Proof Bar */}
                  <div className="bg-black/30 backdrop-blur-md rounded-xl p-2 flex items-center gap-2 border border-white/10">
                    <div className="w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center shrink-0">
                      <Eye className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-[10px] font-medium leading-tight text-white/90">{item.socialProof}</span>
                  </div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
