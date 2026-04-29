// Tipos preparados para futuras tabelas do Supabase.
// Mantemos snake_case nos campos para alinhar 1:1 com colunas SQL.

export type CityPostCategory = "prefeitura" | "saude" | "esporte" | "educacao" | "cultura"

export interface CityPost {
  id: string
  title: string
  summary: string
  category: CityPostCategory
  source: string
  published_at: string // ISO date
  cover_image?: string | null
  is_featured?: boolean
}

export interface PharmacyDuty {
  id: string
  pharmacy_name: string
  duty_start: string // ISO datetime
  duty_end: string // ISO datetime
  address: string
  neighborhood?: string
  notes?: string | null
  updated_at: string // ISO date
  phone_display?: string // só exibição, sem botão de WhatsApp na beta
}

export type CityEventCategory = "cultural" | "esportivo" | "religioso" | "educacional" | "publico"

export interface CityEvent {
  id: string
  name: string
  date: string // ISO date
  time?: string // HH:mm
  location: string
  category: CityEventCategory
  description: string
  cover_image?: string | null
}

export type BusinessLeadStatus = "novo" | "contatado" | "convertido" | "descartado"

export interface BusinessLead {
  id: string
  business_name: string
  contact_name: string
  phone: string
  email?: string
  category: string
  message?: string
  created_at: string // ISO date
  status: BusinessLeadStatus
}

export interface AppSettings {
  city_name: string
  city_slogan: string
  beta_label: string
  contact_email: string
  contact_phone: string
  next_update_at: string // ISO date
}

export type CommerceCategorySlug =
  | "restaurantes"
  | "mercados"
  | "farmacias"
  | "barbearias"
  | "lojas"
  | "servicos"

export interface CommerceCategory {
  slug: CommerceCategorySlug
  name: string
  description: string
  status: "em-breve" | "cadastros-abertos"
  estimated_count: number
}
