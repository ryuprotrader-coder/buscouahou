"use client"

import { MapPin, Search, ChevronDown, Bell } from "lucide-react"

export function ClientHeader() {
  return (
    <header className="bg-white/85 backdrop-blur-xl pt-4 pb-4 px-4 shadow-sm border-b border-neutral-200/60">
      {/* Location Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-md shadow-brand-500/30">
              <span className="font-display font-black text-white text-sm leading-none">M</span>
            </div>
          </div>

          <div className="h-6 w-px bg-neutral-200" aria-hidden="true" />

          {/* Location Dropdown */}
          <button
            type="button"
            className="flex flex-col text-left group active:scale-95 transition-transform"
            aria-label="Alterar local de entrega"
          >
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest leading-none mb-0.5 flex items-center">
              <MapPin className="w-2.5 h-2.5 mr-1 text-brand-500" />
              Entregar em
            </span>
            <span className="flex items-center gap-1">
              <span className="text-xs font-display font-bold text-neutral-900 leading-tight">Ribeirão Branco</span>
              <ChevronDown className="w-3 h-3 text-neutral-400 group-hover:text-brand-500 transition-colors" />
            </span>
          </button>
        </div>

        <button
          type="button"
          className="relative w-10 h-10 rounded-full flex items-center justify-center bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors active:scale-95"
          aria-label="Notificações"
        >
          <Bell className="w-5 h-5" />
          <span
            className="absolute top-2.5 right-2.5 w-2 h-2 bg-brand-500 rounded-full border border-white"
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Hero Search */}
      <div className="relative">
        <label htmlFor="hero-search" className="sr-only">
          O que você procura?
        </label>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-brand-500" />
        </div>
        <input
          id="hero-search"
          type="search"
          placeholder="Buscar lojas, serviços ou produtos"
          className="w-full bg-neutral-100 border-none rounded-2xl py-3.5 pl-12 pr-4 text-neutral-900 text-sm font-medium placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
        />
      </div>
    </header>
  )
}
