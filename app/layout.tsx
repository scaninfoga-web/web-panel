import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import axios from 'axios'
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: 'Scaninfoga App',
  description: 'Created by Khailendra',
}

axios.defaults.baseURL = "http://localhost:8000"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
              <Toaster position="top-right" richColors />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
