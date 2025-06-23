'use client'

import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import personalData from '@/data/personal.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ]

  const socialLinks = [
    {
      icon: Github,
      href: personalData.social.github,
      label: 'GitHub',
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      href: personalData.social.linkedin,
      label: 'LinkedIn', 
      color: 'hover:text-blue-600'
    },
    {
      icon: Mail,
      href: `mailto:${personalData.email}`,
      label: 'Email',
      color: 'hover:text-red-500'
    }
  ]

  const handleQuickLinkClick = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                {personalData.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md leading-relaxed">
                {personalData.tagline}
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110`}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleQuickLinkClick(link.href)}
                      className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Contact Info
              </h4>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <p className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-primary-600" />
                  <a 
                    href={`mailto:${personalData.email}`}
                    className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                  >
                    {personalData.email}
                  </a>
                </p>
                {personalData.phone && (
                  <p className="flex items-center">
                    <span className="w-4 h-4 mr-2 text-primary-600">📞</span>
                    <a 
                      href={`tel:${personalData.phone}`}
                      className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                    >
                      {personalData.phone}
                    </a>
                  </p>
                )}
                <p className="flex items-start">
                  <span className="w-4 h-4 mr-2 mt-0.5 text-primary-600">📍</span>
                  <span>{personalData.location}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Copyright - Simplified */}
            <div className="flex items-center text-gray-600 dark:text-gray-300">
              <span>© {currentYear} {personalData.name}</span>
            </div>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 group"
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
