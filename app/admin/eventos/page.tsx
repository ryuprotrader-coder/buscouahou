import { Pencil, Trash2, MapPin, Clock } from "lucide-react"
import { AdminSectionHeader } from "@/components/admin/admin-section-header"
import { cityEvents, eventCategoryLabels } from "@/lib/mock-data"

export default function AdminEventosPage() {
  return (
    <div>
      <AdminSectionHeader
        title="Eventos da cidade"
        description="Adicione novos eventos ou atualize os já cadastrados."
        ctaLabel="Novo evento"
      />

      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-navy-100">
          {cityEvents.map((event) => {
            const date = new Date(event.date)
            return (
              <li key={event.id} className="px-4 py-4 flex items-start gap-3">
                <div className="flex flex-col items-center justify-center w-12 flex-shrink-0 bg-navy-50 ring-1 ring-navy-100 rounded-xl py-1.5">
                  <span className="text-[9px] font-bold text-navy-500 uppercase tracking-widest leading-none">
                    {date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
                  </span>
                  <span className="text-base font-display font-black text-navy-900 leading-none mt-0.5">
                    {date.toLocaleDateString("pt-BR", { day: "2-digit" })}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">
                      {eventCategoryLabels[event.category]}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-navy-900 leading-tight">{event.name}</h3>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-[11px] text-navy-500">
                    {event.time ? (
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" strokeWidth={2.5} />
                        {event.time}
                      </span>
                    ) : null}
                    <span className="inline-flex items-center gap-1 truncate">
                      <MapPin className="w-3 h-3 flex-shrink-0" strokeWidth={2.5} />
                      <span className="truncate">{event.location}</span>
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    type="button"
                    aria-label={`Editar ${event.name}`}
                    className="w-9 h-9 rounded-lg bg-navy-50 hover:bg-navy-100 flex items-center justify-center text-navy-700 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    aria-label={`Excluir ${event.name}`}
                    className="w-9 h-9 rounded-lg bg-rose-50 hover:bg-rose-100 flex items-center justify-center text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
