"use client"

import { Search } from "lucide-react"
import { useState } from "react"
import { appSettings } from "@/lib/mock-data"

export function CityHero() {
  const [query, setQuery] = useState("")

  return (
    <section
      aria-labelledby="city-hero-title"
      className="relative px-4 pt-5 pb-6 bg-gradient-to-b from-navy-50 to-white"
    >
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-[11px] font-bold text-brand-500 uppercase tracking-widest">
          Olá, vizinho
        </span>
        <h1
          id="city-hero-title"
          className="text-[28px] font-display font-black text-navy-900 leading-[1.05] text-balance"
        >
          Buscou, <span className="text-brand-500">Achou.</span>
        </h1>
        <p className="text-sm text-navy-500 font-medium leading-snug text-pretty">
          {appSettings.city_slogan}.
        </p>
      </div>

      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="relative animate-fade-in-up animate-delay-100"
      >
        <label htmlFor="city-search" className="sr-only">
          Buscar na cidade
        </label>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-brand-500" strokeWidth={2.5} />
        </div>
        <input
          id="city-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busque por farmácia, evento, saúde, esporte, comércio..."
          className="w-full bg-white border border-navy-100 rounded-2xl py-3.5 pl-12 pr-4 text-navy-900 text-sm font-medium placeholder:text-navy-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all"
        />
      </form>
    </section>
  )
}
