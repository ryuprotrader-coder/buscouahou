import { Phone, Mail } from "lucide-react"
import { AdminSectionHeader } from "@/components/admin/admin-section-header"
import { businessLeads } from "@/lib/mock-data"
import type { BusinessLeadStatus } from "@/lib/types"

const STATUS_LABEL: Record<BusinessLeadStatus, string> = {
  novo: "Novo",
  contatado: "Em contato",
  convertido: "Convertido",
  descartado: "Descartado",
}

const STATUS_TONE: Record<BusinessLeadStatus, string> = {
  novo: "bg-brand-50 text-brand-600 ring-brand-100",
  contatado: "bg-amber-50 text-amber-700 ring-amber-100",
  convertido: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  descartado: "bg-navy-50 text-navy-500 ring-navy-100",
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export default function AdminLeadsPage() {
  return (
    <div>
      <AdminSectionHeader
        title="Leads de comerciantes"
        description="Empresas que pediram para aparecer no Buscou, Achou."
      />

      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-navy-100">
          {businessLeads.map((lead) => (
            <li key={lead.id} className="px-4 py-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-navy-900 leading-tight truncate">
                    {lead.business_name}
                  </h3>
                  <p className="text-[11px] text-navy-500 font-medium">
                    {lead.contact_name} · {lead.category}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ring-1 flex-shrink-0 ${STATUS_TONE[lead.status]}`}
                >
                  {STATUS_LABEL[lead.status]}
                </span>
              </div>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-navy-600 mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-navy-400" strokeWidth={2.5} />
                  {lead.phone}
                </span>
                {lead.email ? (
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="w-3 h-3 text-navy-400" strokeWidth={2.5} />
                    {lead.email}
                  </span>
                ) : null}
                <span className="text-navy-400">Recebido em {formatDate(lead.created_at)}</span>
              </div>

              {lead.message ? (
                <p className="text-[12px] text-navy-600 leading-snug bg-navy-50/60 rounded-lg p-2.5 border border-navy-100">
                  {lead.message}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
