import type {
  AppSettings,
  BusinessLead,
  CityEvent,
  CityPost,
  CommerceCategory,
  PharmacyDuty,
} from "./types"

export const appSettings: AppSettings = {
  city_name: "Ribeirão Branco",
  city_slogan: "Tudo da cidade em um só lugar",
  beta_label: "Beta Pública",
  contact_email: "contato@buscouachou.app",
  contact_phone: "(15) 99999-0000",
  next_update_at: new Date().toISOString(),
}

export const cityPosts: CityPost[] = [
  {
    id: "p1",
    title: "Prefeitura inicia recapeamento da Av. Brasil",
    summary:
      "Obra começa nesta segunda e deve durar 15 dias. Trecho entre Rua das Flores e Praça Central terá tráfego desviado.",
    category: "prefeitura",
    source: "Prefeitura Municipal",
    published_at: "2026-04-28T08:30:00Z",
    cover_image:
      "https://images.unsplash.com/photo-1597007030739-6d2e7172ee9c?auto=format&fit=crop&w=800&q=80",
    is_featured: true,
  },
  {
    id: "p2",
    title: "UBS Central amplia horário de vacinação",
    summary:
      "A partir desta semana, vacinação contra gripe acontece de segunda a sábado, das 7h às 17h, sem necessidade de agendamento.",
    category: "saude",
    source: "Secretaria de Saúde",
    published_at: "2026-04-27T14:00:00Z",
    cover_image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p3",
    title: "Campeonato Municipal de Futebol abre inscrições",
    summary:
      "Equipes amadoras podem se inscrever até 15 de maio na Secretaria de Esportes. Disputas começam em junho no Estádio Municipal.",
    category: "esporte",
    source: "Secretaria de Esportes",
    published_at: "2026-04-26T10:15:00Z",
    cover_image:
      "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p4",
    title: "Matrículas abertas para ensino fundamental 2026",
    summary:
      "Pais e responsáveis podem matricular alunos em todas as escolas da rede municipal pelo portal da prefeitura ou presencialmente.",
    category: "educacao",
    source: "Secretaria de Educação",
    published_at: "2026-04-25T09:00:00Z",
    cover_image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p5",
    title: "Festival de Inverno terá programação cultural gratuita",
    summary:
      "Música, teatro e gastronomia ocupam o Centro Cultural entre 5 e 12 de julho. Mais de 30 atrações confirmadas.",
    category: "cultura",
    source: "Secretaria de Cultura",
    published_at: "2026-04-24T16:45:00Z",
    cover_image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "p6",
    title: "Mutirão de limpeza acontece neste sábado",
    summary:
      "Voluntários se reúnem às 8h na Praça Central para ação conjunta com a Secretaria de Meio Ambiente.",
    category: "prefeitura",
    source: "Prefeitura Municipal",
    published_at: "2026-04-23T11:20:00Z",
  },
]

export const pharmacyDutyToday: PharmacyDuty = {
  id: "ph-2026-04-29",
  pharmacy_name: "Drogaria São Bento",
  duty_start: "2026-04-29T08:00:00Z",
  duty_end: "2026-04-30T08:00:00Z",
  address: "Rua XV de Novembro, 245 — Centro",
  neighborhood: "Centro",
  notes: "Atendimento 24 horas. Aceita receitas digitais e medicamentos controlados mediante prescrição.",
  updated_at: "2026-04-29T07:00:00Z",
  phone_display: "(15) 3266-1234",
}

export const upcomingPharmacyDuty: PharmacyDuty[] = [
  {
    id: "ph-2026-04-30",
    pharmacy_name: "Farmácia Popular",
    duty_start: "2026-04-30T08:00:00Z",
    duty_end: "2026-05-01T08:00:00Z",
    address: "Av. Brasil, 1.180 — Jardim América",
    neighborhood: "Jardim América",
    notes: "Atendimento 24 horas.",
    updated_at: "2026-04-29T07:00:00Z",
    phone_display: "(15) 3266-2345",
  },
  {
    id: "ph-2026-05-01",
    pharmacy_name: "Drogaria Vida Nova",
    duty_start: "2026-05-01T08:00:00Z",
    duty_end: "2026-05-02T08:00:00Z",
    address: "Rua das Acácias, 89 — Bairro Alto",
    neighborhood: "Bairro Alto",
    notes: "Atendimento 24 horas.",
    updated_at: "2026-04-29T07:00:00Z",
    phone_display: "(15) 3266-3456",
  },
]

export const cityEvents: CityEvent[] = [
  {
    id: "e1",
    name: "Feira do Produtor Rural",
    date: "2026-05-04",
    time: "07:00",
    location: "Praça Central",
    category: "publico",
    description:
      "Encontro semanal com produtores locais oferecendo frutas, verduras, queijos e artesanato direto da roça.",
    cover_image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "e2",
    name: "Show da Banda Municipal",
    date: "2026-05-10",
    time: "20:00",
    location: "Coreto da Praça da Matriz",
    category: "cultural",
    description:
      "Apresentação especial em comemoração aos 120 anos da cidade, com clássicos da MPB e composições autorais.",
    cover_image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "e3",
    name: "Corrida da Cidade — 5 km",
    date: "2026-05-18",
    time: "06:30",
    location: "Largada na Av. Brasil",
    category: "esportivo",
    description:
      "Inscrições gratuitas na Secretaria de Esportes. Categorias masculina e feminina, com premiação para os 3 primeiros.",
    cover_image:
      "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "e4",
    name: "Festa do Padroeiro",
    date: "2026-06-08",
    time: "18:00",
    location: "Igreja Matriz e Praça Central",
    category: "religioso",
    description:
      "Celebração tradicional com novena, missa solene, quermesse e shows após a missa. Comidas típicas e barracas.",
  },
  {
    id: "e5",
    name: "Feira de Profissões",
    date: "2026-06-14",
    time: "09:00",
    location: "Escola Municipal Anita Garibaldi",
    category: "educacional",
    description:
      "Estudantes do ensino médio conhecem mais de 20 profissões com palestrantes da região e oficinas práticas.",
  },
]

export const commerceCategories: CommerceCategory[] = [
  {
    slug: "restaurantes",
    name: "Restaurantes",
    description: "Pratos do dia, marmitex, lanches e jantares",
    status: "em-breve",
    estimated_count: 18,
  },
  {
    slug: "mercados",
    name: "Mercados",
    description: "Mercadinhos de bairro e supermercados",
    status: "em-breve",
    estimated_count: 12,
  },
  {
    slug: "farmacias",
    name: "Farmácias",
    description: "Drogarias, manipulação e plantão 24h",
    status: "cadastros-abertos",
    estimated_count: 7,
  },
  {
    slug: "barbearias",
    name: "Barbearias e Salões",
    description: "Cortes, barba, manicure e estética",
    status: "cadastros-abertos",
    estimated_count: 14,
  },
  {
    slug: "lojas",
    name: "Lojas",
    description: "Roupas, calçados, presentes e variedades",
    status: "em-breve",
    estimated_count: 22,
  },
  {
    slug: "servicos",
    name: "Prestadores de Serviço",
    description: "Eletricistas, encanadores, pedreiros, diaristas",
    status: "cadastros-abertos",
    estimated_count: 35,
  },
]

export const businessLeads: BusinessLead[] = [
  {
    id: "l1",
    business_name: "Padaria Pão Quente",
    contact_name: "Maria Aparecida",
    phone: "(15) 99888-1234",
    email: "padaria@email.com",
    category: "Restaurantes",
    message: "Tenho interesse em divulgar nossa padaria e os pratos do dia.",
    created_at: "2026-04-28T10:30:00Z",
    status: "novo",
  },
  {
    id: "l2",
    business_name: "Mercadinho do João",
    contact_name: "João Silva",
    phone: "(15) 99777-2345",
    category: "Mercados",
    message: "Como funciona o cadastro? Quero aparecer no app.",
    created_at: "2026-04-27T15:45:00Z",
    status: "contatado",
  },
  {
    id: "l3",
    business_name: "Barbearia Estilo",
    contact_name: "Carlos Santos",
    phone: "(15) 99666-3456",
    email: "carlos@barbearia.com",
    category: "Barbearias e Salões",
    message: "Aceito ser parceiro do app. Já trabalho com agendamento online.",
    created_at: "2026-04-25T09:15:00Z",
    status: "convertido",
  },
  {
    id: "l4",
    business_name: "Eletricista do Zé",
    contact_name: "José Carlos",
    phone: "(15) 99555-4567",
    category: "Prestadores de Serviço",
    created_at: "2026-04-22T18:20:00Z",
    status: "novo",
  },
]

export const categoryLabels: Record<CityPost["category"], string> = {
  prefeitura: "Prefeitura",
  saude: "Saúde",
  esporte: "Esporte",
  educacao: "Educação",
  cultura: "Cultura",
}

export const eventCategoryLabels: Record<CityEvent["category"], string> = {
  cultural: "Cultural",
  esportivo: "Esportivo",
  religioso: "Religioso",
  educacional: "Educacional",
  publico: "Público",
}
