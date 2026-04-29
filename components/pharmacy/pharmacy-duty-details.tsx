import { Pill, MapPin, Clock, Info, RefreshCcw } from "lucide-react"
import { pharmacyDutyToday, upcomingPharmacyDuty } from "@/lib/mock-data"
import type { PharmacyDuty } from "@/lib/types"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
}

function formatUpdated(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function PharmacyDutyDetails() {
  const duty = pharmacyDutyToday

  return (
    <div className="px-4 pt-4 pb-6">
      <section
        aria-labelledby="duty-today-title"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 via-navy-700 to-brand-600 p-6 shadow-lg shadow-navy-900/10 mb-5"
      >
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full blur-2xl" aria-hidden="true" />

        <div className="relative">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm">
              <Pill className="w-5 h-5 text-white" strokeWidth={2.2} />
            </span>
            <div>
              <span className="block text-[10px] font-bold text-brand-200 uppercase tracking-widest leading-none">
                Plantão de hoje
              </span>
              <span className="block text-[11px] text-white/80 font-medium mt-0.5 capitalize">
                {formatDate(duty.duty_start)}
              </span>
            </div>
          </div>

          <h2
            id="duty-today-title"
            className="text-2xl font-display font-black text-white leading-tight mb-3 text-balance"
          >
            {duty.pharmacy_name}
          </h2>

          <dl className="space-y-2.5 text-white/95">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 mt-0.5 text-white/70 flex-shrink-0" strokeWidth={2.2} />
              <div>
                <dt className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-0.5">
                  Endereço
                </dt>
                <dd className="text-[13px] font-medium leading-snug">{duty.address}</dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 mt-0.5 text-white/70 flex-shrink-0" strokeWidth={2.2} />
              <div>
                <dt className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-0.5">
                  Horário
                </dt>
                <dd className="text-[13px] font-medium leading-snug">
                  Das {formatTime(duty.duty_start)} de hoje até {formatTime(duty.duty_end)} de
                  amanhã
                </dd>
              </div>
            </div>

            {duty.notes ? (
              <div className="flex items-start gap-2.5">
                <Info className="w-4 h-4 mt-0.5 text-white/70 flex-shrink-0" strokeWidth={2.2} />
                <div>
                  <dt className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-0.5">
                    Observação
                  </dt>
                  <dd className="text-[13px] font-medium leading-snug">{duty.notes}</dd>
                </div>
              </div>
            ) : null}
          </dl>

          <div className="mt-5 flex items-center gap-2 text-white/70 text-[10px] font-medium">
            <RefreshCcw className="w-3 h-3" strokeWidth={2.5} />
            <span>Atualizado em {formatUpdated(duty.updated_at)}</span>
          </div>
        </div>
      </section>

      <section aria-labelledby="duty-upcoming-title">
        <h3
          id="duty-upcoming-title"
          className="text-sm font-display font-bold text-navy-900 mb-3 px-1"
        >
          Próximos plantões
        </h3>
        <ul className="flex flex-col gap-2.5">
          {upcomingPharmacyDuty.map((d) => (
            <li key={d.id}>
              <UpcomingDutyCard duty={d} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function UpcomingDutyCard({ duty }: { duty: PharmacyDuty }) {
  return (
    <article className="bg-white rounded-2xl border border-navy-100 p-3.5 flex items-center gap-3 shadow-sm">
      <span className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-navy-50 ring-1 ring-navy-100 flex-shrink-0">
        <span className="text-[9px] font-bold text-navy-500 uppercase tracking-widest leading-none">
          {new Date(duty.duty_start).toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
        </span>
        <span className="text-base font-display font-black text-navy-900 leading-none mt-0.5">
          {new Date(duty.duty_start).toLocaleDateString("pt-BR", { day: "2-digit" })}
        </span>
      </span>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-navy-900 leading-tight truncate">
          {duty.pharmacy_name}
        </h4>
        <p className="text-[11px] text-navy-500 font-medium leading-snug truncate">
          {duty.address}
        </p>
      </div>
    </article>
  )
}
