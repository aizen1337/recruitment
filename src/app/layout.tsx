import { NavigationStoreProvider } from '@/context/NavigationStoreProvider'
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
        <NavigationStoreProvider>
        {children}
        </NavigationStoreProvider>
        </body>
      </html>
    )
  }