import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Footer } from "../components/footer"
import { Providers } from "../components/providers"
import FloatingNav from '@/components/Navbar'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Esolution Lighting | Luxury Lighting Solutions",
  description: "Discover our curated collection of luxury lighting solutions for your home and business.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <FloatingNav />
        <Providers>
          <main className="pt-24">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

