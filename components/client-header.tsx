"use client"

import { MapPin, ChevronDown, Bell } from "lucide-react"
import { appSettings } from "@/lib/mock-data"

export function ClientHeader() {
  return (
    <header className="bg-white/95 backdrop-blur-xl pt-4 pb-3 px-4 shadow-sm border-b border-navy-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src="/logo-buscou-achou.jpeg"
            alt="Buscou, Achou"
            width={42}
            height={42}
            className="w-[42px] h-[42px] rounded-xl object-cover ring-1 ring-navy-100 shadow-sm flex-shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest leading-none">
              {appSettings.beta_label}
            </span>
            <button
              type="button"
              className="flex items-center gap-1 mt-1 text-left group active:scale-95 transition-transform"
              aria-label="Trocar cidade"
            >
              <MapPin className="w-3.5 h-3.5 text-navy-600 flex-shrink-0" strokeWidth={2.5} />
              <span className="text-sm font-display font-bold text-navy-900 truncate">
                {appSettings.city_name}
              </span>
              <ChevronDown
                className="w-3.5 h-3.5 text-navy-400 group-hover:text-navy-700 transition-colors flex-shrink-0"
                strokeWidth={2.5}
              />
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Notificações"
          className="relative w-10 h-10 rounded-full bg-navy-50 hover:bg-navy-100 flex items-center justify-center transition-colors active:scale-95 flex-shrink-0"
        >
          <Bell className="w-5 h-5 text-navy-700" strokeWidth={2.2} />
          <span
            className="absolute top-2 right-2 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-white"
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
  )
}
