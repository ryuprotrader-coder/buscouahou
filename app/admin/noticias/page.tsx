import { Pencil, Trash2 } from "lucide-react"
import { AdminSectionHeader } from "@/components/admin/admin-section-header"
import { categoryLabels, cityPosts } from "@/lib/mock-data"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })
}

export default function AdminNoticiasPage() {
  return (
    <div>
      <AdminSectionHeader
        title="Gerenciar notícias"
        description="Adicione, edite ou remova comunicados públicos."
        ctaLabel="Nova notícia"
      />

      <div className="bg-white rounded-2xl border border-navy-100 shadow-sm overflow-hidden">
        <ul className="divide-y divide-navy-100">
          {cityPosts.map((post) => (
            <li
              key={post.id}
              className="px-4 py-3.5 flex items-center gap-3 hover:bg-navy-50/40 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-brand-500 uppercase tracking-widest">
                    {categoryLabels[post.category]}
                  </span>
                  <span className="text-[10px] text-navy-400 font-medium">
                    {formatDate(post.published_at)}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-navy-900 leading-tight truncate">
                  {post.title}
                </h3>
                <p className="text-[11px] text-navy-500 leading-snug truncate">{post.summary}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  type="button"
                  aria-label={`Editar ${post.title}`}
                  className="w-9 h-9 rounded-lg bg-navy-50 hover:bg-navy-100 flex items-center justify-center text-navy-700 transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  aria-label={`Excluir ${post.title}`}
                  className="w-9 h-9 rounded-lg bg-rose-50 hover:bg-rose-100 flex items-center justify-center text-rose-600 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
