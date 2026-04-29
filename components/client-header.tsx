"use client"

import { MapPin, Search, ChevronDown, Bell } from "lucide-react"

export function ClientHeader() {
  return (
    <header className="bg-white/90 backdrop-blur-xl pt-4 pb-4 px-4 shadow-sm border-b border-navy-100">
      {/* Location Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Brand Logo */}
          <div className="flex items-center">
            <img
              src="/logo-buscou-achou.jpeg"
              alt="Buscou, Achou — Simples assim"
              width={44}
              height={44}
              className="w-11 h-11 rounded-xl object-cover ring-1 ring-navy-100 shadow-sm"
            />
          </div>

          <div className="h-8 w-px bg-navy-100" aria-hidden="true" />

          {/* Location Dropdown */}
          <button
            type="button"
            className="flex flex-col text-left group active:scale-95 transition-transform"
            aria-label="Alterar local de entrega"
          >
            <span className="text-[9px] text-navy-500 font-bold uppercase tracking-widest leading-none mb-0.5 flex items-center">
              <MapPin className="w-2.5 h-2.5 mr-1 text-brand-500" />
              Entregar em
            </span>
            <span className="flex items-center gap-1">
              <span className="text-xs font-display font-bold text-navy-900 leading-tight">Ribeirão Branco</span>
              <ChevronDown className="w-3 h-3 text-navy-400 group-hover:text-brand-500 transition-colors" />
            </span>
          </button>
        </div>

        <button
          type="button"
          className="relative w-10 h-10 rounded-full flex items-center justify-center bg-navy-50 text-navy-700 hover:bg-navy-100 transition-colors active:scale-95"
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
          placeholder="Buscou? Achou! Comece por aqui..."
          className="w-full bg-navy-50 border border-navy-100 rounded-2xl py-3.5 pl-12 pr-4 text-navy-900 text-sm font-medium placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500/40 transition-all"
        />
      </div>
    </header>
  )
}
