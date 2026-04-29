"use client"

import { useState } from "react"
import { CheckCircle2, Send } from "lucide-react"
import { commerceCategories } from "@/lib/mock-data"

interface FormState {
  business_name: string
  contact_name: string
  phone: string
  category: string
  message: string
}

const INITIAL: FormState = {
  business_name: "",
  contact_name: "",
  phone: "",
  category: "",
  message: "",
}

export function MerchantLeadForm() {
  const [data, setData] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Mock: na versão Supabase este insert vai para business_leads
    console.log("[v0] Lead enviado:", data)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-5 flex items-start gap-3">
        <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-white ring-1 ring-emerald-100 flex-shrink-0">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" strokeWidth={2.5} />
        </span>
        <div className="flex-1">
          <h4 className="text-sm font-display font-bold text-emerald-900 mb-1">
            Recebemos seu cadastro
          </h4>
          <p className="text-[12px] text-emerald-800 leading-snug">
            Em breve nossa equipe vai entrar em contato no telefone informado para conhecer seu
            comércio e ativar sua presença no Buscou, Achou.
          </p>
        </div>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-navy-100 bg-navy-50/60 p-5 flex flex-col gap-3"
    >
      <Field label="Nome do comércio" htmlFor="business_name">
        <input
          id="business_name"
          required
          value={data.business_name}
          onChange={(e) => update("business_name", e.target.value)}
          placeholder="Ex.: Padaria Pão Quente"
          className="w-full bg-white border border-navy-100 rounded-xl px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40"
        />
      </Field>

      <Field label="Seu nome" htmlFor="contact_name">
        <input
          id="contact_name"
          required
          value={data.contact_name}
          onChange={(e) => update("contact_name", e.target.value)}
          placeholder="Como podemos te chamar?"
          className="w-full bg-white border border-navy-100 rounded-xl px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40"
        />
      </Field>

      <Field label="Telefone / WhatsApp" htmlFor="phone">
        <input
          id="phone"
          required
          inputMode="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          placeholder="(15) 99999-0000"
          className="w-full bg-white border border-navy-100 rounded-xl px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40"
        />
      </Field>

      <Field label="Categoria" htmlFor="category">
        <select
          id="category"
          required
          value={data.category}
          onChange={(e) => update("category", e.target.value)}
          className="w-full bg-white border border-navy-100 rounded-xl px-3 py-2.5 text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40"
        >
          <option value="" disabled>
            Selecione uma categoria
          </option>
          {commerceCategories.map((c) => (
            <option key={c.slug} value={c.name}>
              {c.name}
            </option>
          ))}
          <option value="Outro">Outro</option>
        </select>
      </Field>

      <Field label="Mensagem (opcional)" htmlFor="message">
        <textarea
          id="message"
          rows={3}
          value={data.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Conte um pouco sobre o seu comércio"
          className="w-full bg-white border border-navy-100 rounded-xl px-3 py-2.5 text-sm text-navy-900 placeholder:text-navy-400 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40"
        />
      </Field>

      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white font-bold text-sm rounded-xl py-3 shadow-md hover:shadow-lg transition-shadow active:scale-[0.99]"
      >
        <Send className="w-4 h-4" strokeWidth={2.5} />
        Quero aparecer no Buscou, Achou
      </button>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[11px] font-bold text-navy-700 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  )
}
