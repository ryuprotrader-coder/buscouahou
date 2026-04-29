import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { categoryLabels, cityPosts } from "@/lib/mock-data"

function formatRelative(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

export function CityFeed() {
  const latest = cityPosts.slice(0, 4)

  return (
    <section aria-labelledby="city-feed-title" className="px-4 pb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 id="city-feed-title" className="text-base font-display font-bold text-navy-900">
          Últimas informações da cidade
        </h2>
        <Link
          href="/noticias"
          className="text-xs font-semibold text-brand-500 hover:text-brand-600 inline-flex items-center gap-1"
        >
          Ver tudo
          <ArrowRight className="w-3 h-3" strokeWidth={2.5} />
        </Link>
      </div>

      <ul className="flex flex-col gap-3">
        {latest.map((post) => (
          <li key={post.id}>
            <Link
              href={`/noticias#${post.id}`}
              className="flex gap-3 bg-white rounded-2xl p-3 border border-navy-100 hover:border-navy-200 hover:-translate-y-0.5 transition-all shadow-sm"
            >
              {post.cover_image ? (
                <img
                  src={post.cover_image || "/placeholder.svg"}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover bg-navy-50 flex-shrink-0"
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-20 h-20 rounded-xl bg-gradient-to-br from-navy-50 to-navy-100 flex-shrink-0"
                  aria-hidden="true"
                />
              )}
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-bold text-brand-500 uppercase tracking-widest">
                    {categoryLabels[post.category]}
                  </span>
                  <span className="text-[9px] text-navy-400 font-medium" aria-hidden="true">
                    •
                  </span>
                  <span className="text-[9px] text-navy-500 font-medium">
                    {formatRelative(post.published_at)}
                  </span>
                </div>
                <h3 className="text-[13px] font-bold text-navy-900 leading-tight mb-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[11px] text-navy-500 leading-snug line-clamp-2">{post.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
