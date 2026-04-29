import { PhoneFrame } from "@/components/phone-frame"
import { PageHeader } from "@/components/page-header"
import { CommerceShowcase } from "@/components/commerce/commerce-showcase"

export const metadata = {
  title: "Comércios da cidade — Buscou, Achou",
  description: "Vitrine de categorias comerciais que estão chegando ao Buscou, Achou.",
}

export default function ComerciosPage() {
  return (
    <PhoneFrame
      withDefaultHeader={false}
      customHeader={<PageHeader title="Comércios" subtitle="Cadastros abrindo na cidade" />}
    >
      <CommerceShowcase />
    </PhoneFrame>
  )
}
