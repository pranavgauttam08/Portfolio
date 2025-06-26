import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import type { Metadata } from "next"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Pranav Gauttam | 3D Portfolio",
  description: "Hi, I'm Pranav Gauttam — Explore My Work in 3D",
  keywords: "3D portfolio, WebGL, Three.js, React, developer, interactive, CSE, TIET",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className={cn("min-h-screen bg-gray-900 text-white antialiased font-inter")}>{children}</body>
    </html>
  )
}
