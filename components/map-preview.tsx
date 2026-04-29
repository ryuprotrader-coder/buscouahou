import { Map } from "lucide-react"

export function MapPreview() {
  return (
    <section aria-labelledby="map-title" className="px-4 mb-2 relative z-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="map-title" className="text-lg font-display font-bold text-navy-900">
          Olhe as lojas na sua região
        </h2>
      </div>
      <button
        type="button"
        className="block w-full relative h-32 rounded-3xl overflow-hidden group shadow-md focus:outline-none focus:ring-2 focus:ring-brand-500/50"
        aria-label="Ver mapa da cidade"
      >
        <span
          className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/13/2986/4665.png')] bg-cover bg-center opacity-80 group-hover:opacity-100 transition-opacity"
          aria-hidden="true"
        />
        <span
          className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-4"
          aria-hidden="true"
        >
          <span className="bg-white text-navy-900 font-bold px-5 py-2.5 rounded-full flex items-center gap-2 shadow-lg group-hover:scale-105 transition-transform active:scale-95">
            <Map className="w-5 h-5 text-brand-500" />
            <span className="text-sm">Ver Mapa da Cidade</span>
          </span>
        </span>
      </button>
    </section>
  )
}
