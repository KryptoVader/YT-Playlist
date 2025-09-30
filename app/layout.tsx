import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThemeToggle from '@/components/ThemeToggle'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  title: 'YouTube Playlist Duration Calculator - Free Tool',
  description: 'Calculate the total watch time of any YouTube playlist instantly. Get duration breakdown in days, hours, minutes, and seconds. 100% free, no signup required.',
  keywords: ['YouTube', 'playlist', 'duration', 'calculator', 'watch time', 'total time'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeToggle />
        {children}
      </body>
    </html>
  )
}
