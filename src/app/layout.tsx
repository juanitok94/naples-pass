import type { Metadata } from 'next'
import { Playfair_Display, Crimson_Pro, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
})

const ibmMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-mono',
  display: 'swap',
})

// OG image: Bailey Rapp via Unsplash, free commercial use
export const metadata: Metadata = {
  metadataBase: new URL('https://naples-pass.vercel.app'),
  title: 'Naples, Florida — A Strolling Guide',
  description: 'Ten stops across Fifth Avenue South and Third Street South. Coffee, tea, pastries, books, and a diner on the bay. Built by Peachy Kean DevOps.',
  openGraph: {
    title: 'Naples, Florida — A Strolling Guide',
    description: 'Ten stops across Fifth Avenue South and Third Street South. Coffee, tea, pastries, books, and a diner on the bay.',
    images: [{ url: '/opengraph-image.jpg', width: 1200, height: 630, alt: 'Naples, Florida' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naples, Florida — A Strolling Guide',
    description: 'Ten stops across Fifth Avenue South and Third Street South. Coffee, tea, pastries, books, and a diner on the bay.',
    images: ['/opengraph-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${crimson.variable} ${ibmMono.variable}`}>
        {children}
      </body>
    </html>
  )
}