import { PhoneFrame } from "@/components/phone-frame"
import { PageHeader } from "@/components/page-header"
import { NewsList } from "@/components/news/news-list"

export const metadata = {
  title: "Notícias da cidade — Buscou, Achou",
  description: "Últimas notícias e comunicados públicos da cidade.",
}

export default function NoticiasPage() {
  return (
    <PhoneFrame
      withDefaultHeader={false}
      customHeader={<PageHeader title="Notícias" subtitle="Comunicados e informações públicas" />}
    >
      <NewsList />
    </PhoneFrame>
  )
}
