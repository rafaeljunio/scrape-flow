import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { AppProviders } from '@/components/providers/app-providers'
import ScreenSizeIndicator from '@/lib/screen-size-indicator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScreenSizeIndicator env={process.env.NODE_ENV} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
