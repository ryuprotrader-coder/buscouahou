import { AdminSectionHeader } from "@/components/admin/admin-section-header"
import { appSettings } from "@/lib/mock-data"

export default function AdminConfiguracoesPage() {
  return (
    <div>
      <AdminSectionHeader
        title="Configurações da cidade"
        description="Identidade pública da beta."
      />

      <form className="bg-white rounded-2xl border border-navy-100 shadow-sm p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Nome da cidade" name="city_name" defaultValue={appSettings.city_name} />
        <Field label="Slogan" name="city_slogan" defaultValue={appSettings.city_slogan} />
        <Field label="Selo da beta" name="beta_label" defaultValue={appSettings.beta_label} />
        <Field
          label="E-mail de contato"
          name="contact_email"
          type="email"
          defaultValue={appSettings.contact_email}
        />
        <Field
          label="Telefone de contato"
          name="contact_phone"
          defaultValue={appSettings.contact_phone}
        />

        <div className="sm:col-span-2 flex justify-end pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-sm rounded-xl px-5 py-2.5 shadow-sm hover:shadow-md transition-shadow"
          >
            Salvar alterações
          </button>
        </div>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
}: {
  label: string
  name: string
  type?: string
  defaultValue?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-bold text-navy-700 uppercase tracking-widest">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className="bg-navy-50/60 border border-navy-100 rounded-xl px-3 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 focus:bg-white transition-all"
      />
    </label>
  )
}
