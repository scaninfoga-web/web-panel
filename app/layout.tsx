import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Scaninfoga App',
  description: 'Created by Khailendra',
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
