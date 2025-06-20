import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Bineta's Birthday !!!",
  description: 'Crée par Bakar SECK',
  generator: 'Bakar SECK',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
