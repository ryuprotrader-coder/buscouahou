import { Clock, MapPin } from "lucide-react"
import { cityEvents, eventCategoryLabels } from "@/lib/mock-data"
import type { CityEventCategory } from "@/lib/types"
import { cn } from "@/lib/utils"

const TONE: Record<CityEventCategory, string> = {
  cultural: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  esportivo: "bg-amber-50 text-amber-700 ring-amber-100",
  religioso: "bg-sky-50 text-sky-700 ring-sky-100",
  educacional: "bg-rose-50 text-rose-600 ring-rose-100",
  publico: "bg-navy-50 text-navy-700 ring-navy-100",
}

function formatDay(iso: string) {
  const d = new Date(iso)
  return {
    day: d.toLocaleDateString("pt-BR", { day: "2-digit" }),
    month: d.toLocaleDateString("pt-BR", { month: "short" }).replace(".", ""),
    weekday: d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
  }
}

export function EventsList() {
  return (
    <div className="px-4 pt-4 pb-6">
      <ul className="flex flex-col gap-3">
        {cityEvents.map((event) => {
          const d = formatDay(event.date)
          return (
            <li key={event.id}>
              <article className="bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-sm">
                {event.cover_image ? (
                  <img
                    src={event.cover_image || "/placeholder.svg"}
                    alt=""
                    className="w-full h-32 object-cover bg-navy-50"
                    loading="lazy"
                  />
                ) : null}
                <div className="p-4 flex gap-4">
                  <div className="flex flex-col items-center justify-center w-14 flex-shrink-0 bg-gradient-to-b from-brand-50 to-brand-100 rounded-2xl py-2 ring-1 ring-brand-100">
                    <span className="text-[9px] font-bold text-brand-600 uppercase tracking-widest leading-none">
                      {d.weekday}
                    </span>
                    <span className="text-2xl font-display font-black text-brand-700 leading-none mt-1">
                      {d.day}
                    </span>
                    <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest mt-1">
                      {d.month}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      className={cn(
                        "inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ring-1 mb-2",
                        TONE[event.category],
                      )}
                    >
                      {eventCategoryLabels[event.category]}
                    </span>
                    <h2 className="text-base font-display font-bold text-navy-900 leading-tight mb-1.5 text-balance">
                      {event.name}
                    </h2>
                    <p className="text-[12px] text-navy-600 leading-snug mb-2.5 text-pretty">
                      {event.description}
                    </p>

                    <div className="flex flex-col gap-1 text-[11px] text-navy-500 font-medium">
                      {event.time ? (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="w-3 h-3 text-navy-400" strokeWidth={2.5} />
                          {event.time}
                        </span>
                      ) : null}
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-navy-400" strokeWidth={2.5} />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
