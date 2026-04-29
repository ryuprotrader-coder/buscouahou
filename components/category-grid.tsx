import { ShoppingBag, Pill, Wrench, Gift, Coffee, Scissors, Car, Store } from "lucide-react"

const CATEGORIES = [
  { id: "1", name: "Restaurantes", Icon: Coffee, color: "bg-orange-100 text-brand-500" },
  { id: "2", name: "Mercado", Icon: ShoppingBag, color: "bg-blue-100 text-blue-600" },
  { id: "3", name: "Farmácia", Icon: Pill, color: "bg-green-100 text-green-600" },
  { id: "4", name: "Serviços", Icon: Wrench, color: "bg-slate-100 text-slate-600" },
  { id: "5", name: "Presentes", Icon: Gift, color: "bg-pink-100 text-pink-600" },
  { id: "6", name: "Beleza", Icon: Scissors, color: "bg-fuchsia-100 text-fuchsia-600" },
  { id: "7", name: "Automotivo", Icon: Car, color: "bg-zinc-100 text-zinc-600" },
  { id: "8", name: "Lojas", Icon: Store, color: "bg-teal-100 text-teal-600" },
] as const

export function CategoryGrid() {
  return (
    <section aria-labelledby="categories-title" className="py-6 px-4">
      <h2 id="categories-title" className="sr-only">
        Categorias
      </h2>
      <ul className="grid grid-cols-4 gap-y-6 gap-x-2">
        {CATEGORIES.map((cat) => {
          const { Icon } = cat
          return (
            <li key={cat.id}>
              <button
                type="button"
                className="flex flex-col items-center group focus:outline-none w-full active:scale-95 transition-transform"
                aria-label={cat.name}
              >
                <span
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-2 shadow-sm transition-transform duration-200 group-hover:scale-105 ${cat.color}`}
                >
                  <Icon className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-semibold text-navy-800 text-center tracking-tight">
                  {cat.name}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
