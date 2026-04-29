import { PhoneFrame } from "@/components/phone-frame"
import { PageHeader } from "@/components/page-header"
import { PharmacyDutyDetails } from "@/components/pharmacy/pharmacy-duty-details"

export const metadata = {
  title: "Farmácia de Plantão — Buscou, Achou",
  description: "Veja qual é a farmácia de plantão hoje na cidade.",
}

export default function PlantaoPage() {
  return (
    <PhoneFrame
      withDefaultHeader={false}
      customHeader={<PageHeader title="Farmácia de Plantão" subtitle="Atualizado diariamente" />}
    >
      <PharmacyDutyDetails />
    </PhoneFrame>
  )
}
