'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Certificates from '@/components/Certificates'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ThemeProvider from '@/components/ThemeProvider'

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navigation />
        <main className="w-full">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
