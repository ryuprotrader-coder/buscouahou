import { ClientHeader } from "@/components/client-header"
import { ClientBottomNav } from "@/components/client-bottom-nav"
import { HeroRecommendations } from "@/components/hero-recommendations"
import { CategoryGrid } from "@/components/category-grid"
import { LocalPromotionsList } from "@/components/local-promotions-list"
import { FeaturedStoresList } from "@/components/featured-stores-list"
import { MapPreview } from "@/components/map-preview"

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-navy-100 flex justify-center">
      {/* Phone-frame container */}
      <div className="flex flex-col h-[100dvh] w-full max-w-md relative bg-white shadow-2xl xl:border-x xl:border-navy-100">
        {/* Sticky header */}
        <div className="absolute top-0 inset-x-0 z-30">
          <ClientHeader />
        </div>

        {/* Scrollable content */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative w-full pt-[140px] pb-[90px] bg-white">
          <div className="animate-fade-in-up animate-delay-100">
            <HeroRecommendations />
          </div>
          <div className="animate-fade-in-up animate-delay-200">
            <CategoryGrid />
          </div>
          <div className="animate-fade-in-up animate-delay-300">
            <LocalPromotionsList />
          </div>
          <div className="animate-fade-in-up animate-delay-400">
            <FeaturedStoresList title="Lojas Populares Perto de Você" />
          </div>
          <div className="animate-fade-in-up animate-delay-500">
            <MapPreview />
          </div>
          <div className="animate-fade-in-up animate-delay-500">
            <FeaturedStoresList title="Novidades na Região" />
          </div>
        </main>

        {/* Bottom nav */}
        <ClientBottomNav />
      </div>
    </div>
  )
}
