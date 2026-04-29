import { Pencil, MapPin, Clock } from "lucide-react"
import { AdminSectionHeader } from "@/components/admin/admin-section-header"
import { pharmacyDutyToday, upcomingPharmacyDuty } from "@/lib/mock-data"
import type { PharmacyDuty } from "@/lib/types"

function formatRange(d: PharmacyDuty) {
  const start = new Date(d.duty_start).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
  const end = new Date(d.duty_end).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
  return `${start} → ${end}`
}

export default function AdminPlantaoPage() {
  const all = [pharmacyDutyToday, ...upcomingPharmacyDuty]

  return (
    <div>
      <AdminSectionHeader
        title="Farmácia de plantão"
        description="Defina a escala diária visível no app público."
        ctaLabel="Agendar plantão"
      />

      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-navy-100">
          {all.map((duty, idx) => (
            <li key={duty.id} className="px-4 py-4 flex items-start gap-3">
              <div className="flex flex-col items-center justify-center w-12 flex-shrink-0 bg-brand-50 ring-1 ring-brand-100 rounded-xl py-1.5">
                <span className="text-[9px] font-bold text-brand-600 uppercase tracking-widest leading-none">
                  {new Date(duty.duty_start)
                    .toLocaleDateString("pt-BR", { month: "short" })
                    .replace(".", "")}
                </span>
                <span className="text-base font-display font-black text-brand-700 leading-none mt-0.5">
                  {new Date(duty.duty_start).toLocaleDateString("pt-BR", { day: "2-digit" })}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {idx === 0 ? (
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                      Hoje
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-navy-50 text-navy-500 ring-1 ring-navy-100">
                      Agendado
                    </span>
                  )}
                  <span className="text-[10px] text-navy-400 font-medium">{formatRange(duty)}</span>
                </div>
                <h3 className="text-sm font-bold text-navy-900 leading-tight">{duty.pharmacy_name}</h3>
                <p className="flex items-center gap-1.5 text-[11px] text-navy-500 mt-1">
                  <MapPin className="w-3 h-3" strokeWidth={2.5} />
                  <span className="truncate">{duty.address}</span>
                </p>
                {duty.notes ? (
                  <p className="flex items-start gap-1.5 text-[11px] text-navy-500 mt-1 leading-snug">
                    <Clock className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                    <span className="line-clamp-1">{duty.notes}</span>
                  </p>
                ) : null}
              </div>
              <button
                type="button"
                aria-label={`Editar plantão de ${duty.pharmacy_name}`}
                className="w-9 h-9 rounded-lg bg-navy-50 hover:bg-navy-100 flex items-center justify-center text-navy-700 transition-colors flex-shrink-0"
              >
                <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
