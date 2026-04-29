import type { Metadata, Viewport } from "next"
import { Inter, Sora } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Buscou, Achou — Tudo da cidade em um só lugar",
  description:
    "A beta pública do Buscou, Achou reúne notícias, farmácia de plantão, eventos, saúde, esportes e comércios da sua cidade em um só lugar.",
  applicationName: "Buscou, Achou",
  keywords: ["cidade", "notícias", "farmácia plantão", "eventos", "comércio local", "Ribeirão Branco"],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0f1a39",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${sora.variable} bg-navy-50`}>
      <body className="bg-navy-50 text-neutral-900 antialiased overflow-x-hidden">{children}</body>
    </html>
  )
}
