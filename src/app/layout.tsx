import './globals.css'
import type { Metadata } from 'next'
export const metadata: Metadata = {
    title: 'Zadanie rekrutacyjne',
    description: 'Maciej Kalata',
  }
export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" suppressHydrationWarning>
        <body>
          {/* Layout UI */}
        {children}
        </body>
      </html>
    )
  }