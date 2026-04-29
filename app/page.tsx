import { PhoneFrame } from "@/components/phone-frame"
import { CityHero } from "@/components/home/city-hero"
import { QuickAccessGrid } from "@/components/home/quick-access-grid"
import { PharmacyDutyHighlight } from "@/components/home/pharmacy-duty-highlight"
import { CityFeed } from "@/components/home/city-feed"
import { MerchantsCta } from "@/components/home/merchants-cta"

export default function HomePage() {
  return (
    <PhoneFrame>
      <div className="animate-fade-in-up animate-delay-100">
        <CityHero />
      </div>
      <div className="animate-fade-in-up animate-delay-200">
        <QuickAccessGrid />
      </div>
      <div className="animate-fade-in-up animate-delay-300">
        <PharmacyDutyHighlight />
      </div>
      <div className="animate-fade-in-up animate-delay-400">
        <CityFeed />
      </div>
      <div className="animate-fade-in-up animate-delay-500">
        <MerchantsCta />
      </div>
    </PhoneFrame>
  )
}
