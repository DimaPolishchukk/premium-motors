import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black">
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-black/30 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Premium Auto
            </Link>
            <div className="space-x-4">
              <Link href="/">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Home
                </Button>
              </Link>
              <Link href="/catalog">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Catalog
                </Button>
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}

