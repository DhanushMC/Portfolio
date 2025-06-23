'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Github, Linkedin, Mail, MapPin, ChevronDown, Download } from 'lucide-react'
import personalData from '@/data/personal.json'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleDownloadResume = () => {
    const link = document.createElement('a')
    link.href = '/assets/resume.pdf'
    link.download = 'Dhanush_MC_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section id="home" className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white dark:bg-gray-900">
      {/* Simple gradient background instead of LinkedIn banner */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/80 to-indigo-50/50 dark:from-gray-900/90 dark:via-gray-800/95 dark:to-indigo-950/90"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        <div className="absolute top-1/4 left-1/4 w-8 h-8 xs:w-12 xs:h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 xl:w-24 xl:h-24 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 xl:w-32 xl:h-32 2xl:w-40 2xl:h-40 bg-secondary-200 dark:bg-secondary-800 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/3 left-1/6 w-6 h-6 xs:w-8 xs:h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 xl:w-20 xl:h-20 bg-accent-200 dark:bg-accent-800 rounded-full opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Profile Image */}
          <div className="mb-4 xs:mb-6 sm:mb-8 flex justify-center">
            <div className="relative w-24 h-24 xs:w-32 xs:h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 2xl:w-72 2xl:h-72">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-secondary-500 to-accent-500 rounded-full animate-glow" style={{animationDuration: '8s'}}></div>
              <div className="absolute inset-1 xs:inset-2 bg-white dark:bg-gray-900 rounded-full"></div>
              <Image
                src={personalData.profileImage}
                alt={personalData.name}
                fill
                className="absolute inset-2 xs:inset-3 sm:inset-4 rounded-full object-cover border-1 xs:border-2 border-white dark:border-gray-700"
                priority
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6 max-w-4xl mx-auto">
            <div>
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl 3xl:text-9xl font-bold text-gray-900 dark:text-white mb-2 xs:mb-3 sm:mb-4 leading-tight">
                <span className="block">Hi, I'm</span>
                <span className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent animate-pulse-slow">
                  {personalData.name}
                </span>
              </h1>
              
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-gray-600 dark:text-gray-300 mb-2 xs:mb-3 font-medium px-2">
                {personalData.title}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-1 xs:gap-2 text-gray-500 dark:text-gray-400 mb-3 xs:mb-4 sm:mb-6">
                <MapPin className="w-3 h-3 xs:w-4 xs:h-4 text-primary-600" />
                <span className="text-xs xs:text-sm sm:text-base">{personalData.location}</span>
              </div>
            </div>

            <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 xs:px-4">
              {personalData.tagline}
            </p>

            {/* Social Links */}
            <div className="flex justify-center space-x-2 xs:space-x-3 sm:space-x-4 md:space-x-6 pt-4 xs:pt-6 sm:pt-8">
              <a
                href={personalData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 xs:p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              >
                <Github className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              </a>
              
              <a
                href={personalData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2 xs:p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600"
              >
                <Linkedin className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              </a>
              
              <a
                href={`mailto:${personalData.email}`}
                className="group p-2 xs:p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-accent-600"
              >
                <Mail className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center pt-4 xs:pt-6 sm:pt-8 px-2 xs:px-4">
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-medium py-2 xs:py-3 px-4 xs:px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs xs:text-sm sm:text-base lg:text-lg"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={handleDownloadResume}
                className="group relative overflow-hidden bg-transparent border-2 border-primary-600 text-primary-600 hover:text-white font-medium py-2 xs:py-3 px-4 xs:px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs xs:text-sm sm:text-base lg:text-lg"
              >
                <span className="relative z-10 flex items-center justify-center space-x-1 xs:space-x-2">
                  <Download className="w-3 h-3 xs:w-4 xs:h-4" />
                  <span>Download Resume</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative overflow-hidden bg-transparent border-2 border-accent-600 text-accent-600 hover:text-white font-medium py-2 xs:py-3 px-4 xs:px-6 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-xs xs:text-sm sm:text-base lg:text-lg"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 xs:bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
          <button
            onClick={scrollToAbout}
            className="animate-bounce p-1 xs:p-2 text-gray-400 hover:text-primary-600 transition-colors duration-300"
          >
            <ChevronDown className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
