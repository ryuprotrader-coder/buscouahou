import HomePage from "../page"

// Rota legada `/client` herdada do projeto Astro original.
// Mantemos um espelho para a URL ainda funcionar enquanto o preview do v0
// fica em cache nessa rota.
export default function ClientLegacyPage() {
  return <HomePage />
}
