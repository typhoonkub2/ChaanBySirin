import type React from "react"
import type { Metadata } from "next"
import { Prompt } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const prompt = Prompt({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin", "thai"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Chaan Massage by Sirin - นวดผ่อนคลายโดยผู้เชี่ยวชาญ",
  description: "บริการนวดแผนไทย นวดน้ำมันอโรมา และนวดเพื่อสุขภาพโดยผู้เชี่ยวชาญ จองคิวออนไลน์ได้ทันที",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={prompt.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'