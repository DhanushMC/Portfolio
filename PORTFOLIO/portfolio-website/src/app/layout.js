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
  title: 'Dhanush M C - Portfolio',
  description: 'Software Developer & AI Enthusiast passionate about building innovative solutions with cutting-edge technology.',
  keywords: 'Dhanush MC, Software Developer, AI, Machine Learning, React, Python, Oracle Cloud',
  authors: [{ name: 'Dhanush M C' }],
  openGraph: {
    title: 'Dhanush M C - Portfolio',
    description: 'Software Developer & AI Enthusiast passionate about building innovative solutions with cutting-edge technology.',
    url: 'https://dhanush-portfolio.vercel.app',
    siteName: 'Dhanush M C Portfolio',
    images: [
      {
        url: '/assets/profile/Profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Dhanush M C',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dhanush M C - Portfolio',
    description: 'Software Developer & AI Enthusiast passionate about building innovative solutions with cutting-edge technology.',
    images: ['/assets/profile/Profile.jpg'],
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
