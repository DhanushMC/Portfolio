import './globals.css'
import '../styles/responsive.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export const metadata = {
  title: 'Dhanush M C - Portfolio | AI Engineering Student',
  description: 'B.Tech Student - Artificial Intelligence | AI & Technology Enthusiast. Passionate AI Developer | Building Innovative Solutions Across Multiple Domains',
  keywords: 'Dhanush MC, AI Engineering, Computer Vision, NLP, Machine Learning, React, Python, Oracle Cloud, B.Tech AI',
  authors: [{ name: 'Dhanush M C' }],
  metadataBase: new URL('https://mcdhanush-portfolio.vercel.app'),
  openGraph: {
    title: 'Dhanush M C - AI Engineering Student',
    description: 'B.Tech Student - Artificial Intelligence | AI & Technology Enthusiast. Passionate AI Developer | Building Innovative Solutions Across Multiple Domains',
    url: 'https://mcdhanush-portfolio.vercel.app',
    siteName: 'Dhanush M C Portfolio',
    images: [
      {
        url: '/assets/profile/Profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhanush M C - AI Engineering Student',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanush M C - AI Engineering Student',
    description: 'B.Tech Student - Artificial Intelligence | AI & Technology Enthusiast. Passionate AI Developer | Building Innovative Solutions Across Multiple Domains',
    images: ['https://mcdhanush-portfolio.vercel.app/assets/profile/Profile.jpg'],
    creator: '@DhanushMC',
  },
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
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
