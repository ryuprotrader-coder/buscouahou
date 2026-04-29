"use client"

import { useMemo, useState } from "react"
import { categoryLabels, cityPosts } from "@/lib/mock-data"
import type { CityPostCategory } from "@/lib/types"
import { cn } from "@/lib/utils"

const FILTERS: { value: CityPostCategory | "todas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "prefeitura", label: "Prefeitura" },
  { value: "saude", label: "Saúde" },
  { value: "esporte", label: "Esporte" },
  { value: "educacao", label: "Educação" },
  { value: "cultura", label: "Cultura" },
]

const CATEGORY_TONE: Record<CityPostCategory, string> = {
  prefeitura: "bg-navy-50 text-navy-700 ring-navy-100",
  saude: "bg-rose-50 text-rose-600 ring-rose-100",
  esporte: "bg-amber-50 text-amber-700 ring-amber-100",
  educacao: "bg-sky-50 text-sky-700 ring-sky-100",
  cultura: "bg-emerald-50 text-emerald-700 ring-emerald-100",
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
  })
}

export function NewsList() {
  const [filter, setFilter] = useState<CityPostCategory | "todas">("todas")

  const visible = useMemo(
    () => (filter === "todas" ? cityPosts : cityPosts.filter((p) => p.category === filter)),
    [filter],
  )

  return (
    <div className="px-4 pt-4 pb-6">
      <div
        role="tablist"
        aria-label="Filtrar notícias por categoria"
        className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-3 mb-2"
      >
        {FILTERS.map((f) => {
          const isActive = filter === f.value
          return (
            <button
              key={f.value}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => setFilter(f.value)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                isActive
                  ? "bg-navy-900 text-white border-navy-900 shadow-sm"
                  : "bg-white text-navy-600 border-navy-100 hover:border-navy-200",
              )}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {visible.length === 0 ? (
        <p className="text-center text-sm text-navy-500 font-medium py-12">
          Nenhuma notícia nesta categoria por enquanto.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {visible.map((post) => (
            <li key={post.id} id={post.id}>
              <article className="bg-white rounded-2xl overflow-hidden border border-navy-100 shadow-sm">
                {post.cover_image ? (
                  <img
                    src={post.cover_image || "/placeholder.svg"}
                    alt=""
                    className="w-full h-36 object-cover bg-navy-50"
                    loading="lazy"
                  />
                ) : null}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ring-1",
                        CATEGORY_TONE[post.category],
                      )}
                    >
                      {categoryLabels[post.category]}
                    </span>
                    <span className="text-[10px] text-navy-400 font-medium">
                      {formatDate(post.published_at)}
                    </span>
                  </div>
                  <h2 className="text-base font-display font-bold text-navy-900 leading-tight mb-1.5 text-balance">
                    {post.title}
                  </h2>
                  <p className="text-[13px] text-navy-600 leading-snug mb-3 text-pretty">
                    {post.summary}
                  </p>
                  <p className="text-[11px] text-navy-400 font-medium">Fonte: {post.source}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
