import { Star, MapPin } from "lucide-react"

const FEATURED_STORES = [
  {
    id: "1",
    name: "Pizzaria Bella Massa",
    category: "Restaurante",
    rating: 4.8,
    distance: "1.2km",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    deliveryTime: "30-45 min",
    deliveryFee: "Grátis",
  },
  {
    id: "2",
    name: "Farmácia Vida & Saúde",
    category: "Saúde",
    rating: 4.9,
    distance: "0.8km",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&w=400&q=80",
    deliveryTime: "15-25 min",
    deliveryFee: "R$ 4,90",
  },
  {
    id: "3",
    name: "Mercado Central",
    category: "Mercado",
    rating: 4.7,
    distance: "2.5km",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80",
    deliveryTime: "Hoje",
    deliveryFee: "R$ 7,90",
  },
  {
    id: "4",
    name: "Padaria Central",
    category: "Café & Padaria",
    rating: 4.9,
    distance: "0.5km",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    deliveryTime: "20-30 min",
    deliveryFee: "Grátis",
  },
] as const

interface FeaturedStoresListProps {
  title: string
}

export function FeaturedStoresList({ title }: FeaturedStoresListProps) {
  return (
    <section aria-label={title} className="py-4">
      <div className="px-4 mb-4 flex items-center justify-between">
        <h2 className="text-lg font-display font-bold text-navy-900 text-balance">{title}</h2>
        <button
          type="button"
          className="text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
        >
          Ver todos
        </button>
      </div>

      <ul className="flex overflow-x-auto snap-x snap-mandatory px-4 pb-6 gap-3 no-scrollbar">
        {FEATURED_STORES.map((store) => (
          <li
            key={store.id}
            className="flex-shrink-0 snap-start w-64 group bg-white border border-navy-100 shadow-sm rounded-2xl overflow-hidden transition-transform hover:-translate-y-0.5"
          >
            {/* Store Image */}
            <div className="relative w-full h-32 overflow-hidden bg-navy-50">
              <img
                src={store.image || "/placeholder.svg"}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-sm">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-bold text-navy-900">{store.rating}</span>
              </div>
            </div>

            {/* Store Info */}
            <div className="p-3 flex flex-col">
              <span className="text-[10px] text-navy-500 font-bold uppercase tracking-wide mb-1">
                {store.category}
              </span>
              <h3 className="font-bold text-sm text-navy-900 leading-tight mb-2 truncate group-hover:text-brand-500 transition-colors">
                {store.name}
              </h3>

              <div className="flex items-center text-xs text-navy-500 gap-3 mb-3 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{store.distance}</span>
                </span>
                <span aria-hidden="true">•</span>
                <span>{store.deliveryTime}</span>
              </div>

              <div className="w-full pt-2 border-t border-navy-100 flex justify-between items-center">
                <span className="text-[10px] font-semibold text-emerald-600">{store.deliveryFee}</span>
                <button
                  type="button"
                  className="text-[10px] font-bold text-brand-500 hover:text-brand-600 transition-colors bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg active:scale-95"
                >
                  Ver Loja
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
