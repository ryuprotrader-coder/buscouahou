import Link from "next/link"
import { Pill, MapPin, Clock, ArrowRight } from "lucide-react"
import { pharmacyDutyToday } from "@/lib/mock-data"

function formatDutyWindow(start: string, end: string) {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  return `${fmt(start)} de hoje até ${fmt(end)} de amanhã`
}

export function PharmacyDutyHighlight() {
  const duty = pharmacyDutyToday

  return (
    <section aria-labelledby="duty-highlight-title" className="px-4 pb-6">
      <Link
        href="/plantao"
        className="group block relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-700 to-brand-600 p-5 shadow-lg shadow-navy-900/10"
      >
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-brand-500/30 rounded-full blur-2xl" aria-hidden="true" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm">
              <Pill className="w-5 h-5 text-white" strokeWidth={2.2} />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-brand-200 uppercase tracking-widest leading-none">
                Farmácia de Plantão
              </span>
              <span className="text-[11px] text-white/80 font-medium mt-0.5">Hoje, 24 horas</span>
            </div>
          </div>

          <h2
            id="duty-highlight-title"
            className="text-xl font-display font-black text-white leading-tight mb-2 text-balance"
          >
            {duty.pharmacy_name}
          </h2>

          <div className="space-y-1.5 mb-4">
            <p className="flex items-start gap-2 text-[13px] text-white/90 font-medium leading-snug">
              <MapPin className="w-4 h-4 mt-0.5 text-white/70 flex-shrink-0" strokeWidth={2.2} />
              <span>{duty.address}</span>
            </p>
            <p className="flex items-start gap-2 text-[13px] text-white/90 font-medium leading-snug">
              <Clock className="w-4 h-4 mt-0.5 text-white/70 flex-shrink-0" strokeWidth={2.2} />
              <span>{formatDutyWindow(duty.duty_start, duty.duty_end)}</span>
            </p>
          </div>

          <span className="inline-flex items-center gap-2 bg-white text-navy-900 font-bold text-xs px-4 py-2 rounded-full shadow-md group-hover:bg-navy-50 group-hover:gap-3 transition-all">
            Ver detalhes
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
        </div>
      </Link>
    </section>
  )
}
