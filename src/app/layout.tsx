import type { Metadata, Viewport } from 'next'
import { Poppins, DM_Sans } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import PageWrapper from '@/components/layout/PageWrapper'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
})

import { getSiteSettings } from '@/lib/tina'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://newstepcareers.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1E6EB5',
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Newstep Careers — Career Counselling India',
    template: '%s | Newstep Careers',
  },
  description:
    'Professional career counselling for students and professionals across India. Psychometric testing, college admissions guidance, interview coaching, and personalised career planning.',
  keywords: [
    'career counselling',
    'career guidance India',
    'psychometric testing',
    'college admissions',
    'student career planning',
    'career counsellor Kolkata',
  ],
  authors: [{ name: 'Newstep Careers' }],
  creator: 'Newstep Careers',
  publisher: 'Newstep Careers',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Newstep Careers',
    title: 'Newstep Careers — Career Counselling India',
    description:
      'Professional career counselling for students and professionals. Psychometric testing, college admissions guidance, and more.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Newstep Careers — Helping You Find Your True Career Path',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newstep Careers — Career Counselling India',
    description:
      'Professional career counselling for students and professionals. Psychometric testing, college admissions guidance, and more.',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${dmSans.variable} flex flex-col min-h-screen bg-white text-neutral-900 font-body`}>
        <Navbar />
        <main className="flex-grow">
          <PageWrapper>{children}</PageWrapper>
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
