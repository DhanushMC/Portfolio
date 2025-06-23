'use client'

import { useState, useEffect, useRef } from 'react'
import { Rocket, Calculator, Code, Link, Trophy, Users, Gamepad2, Video, Dumbbell, Search, Zap, Shield, MessageCircle, Mail, Phone, MapPin, Github, Linkedin, X } from 'lucide-react'
import skillsData from '@/data/skills.json'
import personalData from '@/data/personal.json'

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('technical')
  const [showContactModal, setShowContactModal] = useState(false)
  const sectionRef = useRef(null)

  const beyondTechIcons = {
    'Competitive Programming': Trophy,
    'Open Source Development': Code,
    'Photography': Search, // Using Search as placeholder
    'Athletics': Dumbbell,
    'Frisbee': Users, // Using Users as placeholder
    'Video Editing': Video,
    'Badminton': Dumbbell,
    'Exploring New Technologies': Search,
    'LLM Fine-tuning': Zap,
    'AI Safety Research': Shield,
    'Research & Academic': Search,
    'Professional Skills': Users
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const openContactModal = () => {
    setShowContactModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closeContactModal = () => {
    setShowContactModal(false)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeContactModal()
      }
    }

    if (showContactModal) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showContactModal])

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personalData.email,
      href: `mailto:${personalData.email}`,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalData.phone,
      href: `tel:${personalData.phone}`,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      borderColor: 'border-green-200 dark:border-green-800'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalData.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalData.location)}`,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: personalData.social.github,
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personalData.social.linkedin,
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-blue-600'
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${personalData.email}`,
      color: 'text-gray-600 dark:text-gray-400',
      hoverColor: 'hover:text-red-600'
    }
  ]

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950/30"
    >
      {/* Modern Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '6s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-2 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveSection('technical')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeSection === 'technical'
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Rocket className="w-5 h-5" />
                    <span>Technical Expertise</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveSection('beyond')}
                  className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    activeSection === 'beyond'
                      ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Beyond Technology</span>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Skills Section */}
          {activeSection === 'technical' && (
            <div className="animate-fadeIn">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  {skillsData.technicalSkills.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  {skillsData.technicalSkills.subtitle}
                </p>
              </div>

              {/* Technical Skills Grid */}
              <div className="grid lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {skillsData.technicalSkills.categories.map((category, index) => (
                  <div 
                    key={index}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-blue-600/50 group"
                  >
                    {/* Category Header */}
                    <div className="flex items-center mb-8">
                      <div className="text-4xl mr-4 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {category.name}
                      </h3>
                    </div>

                    {/* Skills Pills */}
                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default"
                          style={{
                            animationDelay: `${skillIndex * 100}ms`
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Beyond Technology Section */}
          {activeSection === 'beyond' && (
            <div className="animate-fadeIn">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  {skillsData.beyondTechnology.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  {skillsData.beyondTechnology.subtitle}
                </p>
              </div>

              {/* Beyond Tech Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {skillsData.beyondTechnology.categories.map((category, index) => {
                  const IconComponent = beyondTechIcons[category.name] || Users
                  const colors = [
                    'from-yellow-400 to-orange-500',
                    'from-purple-400 to-pink-500', 
                    'from-green-400 to-blue-500',
                    'from-red-400 to-pink-500',
                    'from-blue-400 to-indigo-500',
                    'from-indigo-400 to-purple-500',
                    'from-orange-400 to-red-500',
                    'from-teal-400 to-cyan-500'
                  ]
                  
                  return (
                    <div 
                      key={index}
                      className="group relative"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${colors[index % colors.length]} rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300`}></div>
                      <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300/50 dark:hover:border-purple-600/50 hover:transform hover:-translate-y-2">
                        
                        {/* Icon */}
                        <div className={`w-16 h-16 bg-gradient-to-r ${colors[index % colors.length]} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <span className="text-2xl">{category.icon}</span>
                        </div>

                        {/* Content */}
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Bottom CTA Section - Enhanced with Contact Button */}
          <div className="mt-20 text-center">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50 max-w-4xl mx-auto">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                I'm passionate about leveraging technology to solve complex problems and drive innovation.
                <br />
                Let's discuss how my experience can contribute to your next project.
              </p>
              
              {/* Contact Button */}
              <button
                onClick={openContactModal}
                className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <MessageCircle className="w-5 h-5" />
                  <span>Let's Connect</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal - Similar to the design you showed */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="modal-overlay absolute inset-0" onClick={closeContactModal}></div>
          
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[95vh] overflow-hidden text-white">
            {/* Modal Header */}
            <div className="sticky top-0 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-8 h-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">
                  Let's Connect
                </h3>
              </div>
              <button
                onClick={closeContactModal}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-300"
              >
                <X className="w-6 h-6 text-slate-400 hover:text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <p className="text-slate-300 leading-relaxed">
                Whether you have a project in mind, want to collaborate on AI security research, or just want to say hello, I'd love to hear from you. Feel free to reach out through any of the channels below.
              </p>

              {/* Contact Methods */}
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.label === 'Location' ? '_blank' : undefined}
                    rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-4 p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-all duration-300 border border-slate-600 hover:border-slate-500 group"
                  >
                    <div className={`p-3 bg-slate-800 rounded-lg ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                        {item.label}
                      </p>
                      <p className="text-slate-300 text-sm">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Media Section */}
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Connect on Social Media
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-slate-700/50 hover:bg-slate-600 rounded-xl text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                      title={social.label}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}
