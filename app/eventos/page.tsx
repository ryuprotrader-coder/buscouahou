import { PhoneFrame } from "@/components/phone-frame"
import { PageHeader } from "@/components/page-header"
import { EventsList } from "@/components/events/events-list"

export const metadata = {
  title: "Eventos da cidade — Buscou, Achou",
  description: "Calendário de eventos públicos, culturais, esportivos e religiosos da cidade.",
}

export default function EventosPage() {
  return (
    <PhoneFrame
      withDefaultHeader={false}
      customHeader={<PageHeader title="Eventos" subtitle="O que acontece na cidade" />}
    >
      <EventsList />
    </PhoneFrame>
  )
}
