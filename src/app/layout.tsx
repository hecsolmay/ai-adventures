import type { Metadata } from 'next'

import { Cinzel } from 'next/font/google'
import localFont from 'next/font/local'

import Footer from '@/components/common/footer'
import Navbar from '@/components/common/navbar'
import Providers from '@/providers'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-cinzel'
})

export const metadata: Metadata = {
  title: 'AI Adventures',
  description:
    'AI Adventures es una plataforma que busca fomentar la interacción entre los usuarios y los modelos de IA para generar contenido personalizado y creativo.',
  manifest: '/manifest.json'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} overflow-x-hidden scroll-smooth antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
