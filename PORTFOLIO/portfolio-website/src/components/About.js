'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { GraduationCap, Award, BookOpen, MapPin, Users, Brain, X, ExternalLink } from 'lucide-react'
import personalData from '@/data/personal.json'
import educationData from '@/data/education.json'

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [showBannerModal, setShowBannerModal] = useState(false)
  const sectionRef = useRef(null)

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

  const openBannerModal = () => {
    setShowBannerModal(true)
    document.body.style.overflow = 'hidden'
  }

  const closeBannerModal = () => {
    setShowBannerModal(false)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeBannerModal()
      }
    }

    if (showBannerModal) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [showBannerModal])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-white dark:bg-gray-800"
    >
      {/* Professional Abstract Background */}
      <div className="absolute inset-0">
        {/* Subtle diagonal lines */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.08]" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/5 dark:to-indigo-900/5 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/5 dark:to-blue-900/5 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/5 dark:to-cyan-900/5 rounded-full opacity-25 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-2 xs:px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-8 xs:mb-12 sm:mb-16">
            <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 dark:text-white mb-2 xs:mb-3 sm:mb-4">
              About <span className="text-blue-600 dark:text-blue-400">Me</span>
            </h2>
            <p className="text-base xs:text-lg sm:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2">
              Get to know more about my journey, education, and passion for AI security
            </p>
          </div>

          {/* LinkedIn Banner Section - Enhanced responsiveness */}
          <div className="mb-8 xs:mb-12 sm:mb-16">
            <div 
              className="relative w-full rounded-lg xs:rounded-xl overflow-hidden shadow-xl xs:shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-2xl xs:hover:shadow-3xl transition-all duration-300 group"
              onClick={openBannerModal}
            >
              {/* Click indicator */}
              <div className="absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 z-10 bg-black/50 text-white px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-2 h-2 xs:w-3 xs:h-3" />
                <span className="hidden xs:inline">Click to view full banner</span>
                <span className="xs:hidden">View</span>
              </div>
              
              {/* Banner Container - Enhanced responsive sizing */}
              <div className="relative w-full h-32 xs:h-40 sm:h-48 md:h-64 lg:h-80 xl:h-96 2xl:h-[400px] 3xl:h-[450px] overflow-hidden">
                <Image
                  src={personalData.linkedinBanner}
                  alt="Professional LinkedIn Banner"
                  fill
                  className="object-contain object-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
                  priority
                  sizes="(max-width: 320px) 100vw, (max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
                
                {/* Professional overlay - Only on bottom for better banner visibility */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent h-16 xs:h-20 sm:h-24 md:h-32"></div>
                
                {/* Profile info overlay - Enhanced responsiveness */}
                <div className="absolute bottom-0 left-0 right-0 p-2 xs:p-3 sm:p-4 md:p-6 text-white">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 xs:mb-2">
                        {personalData.name}
                      </h3>
                      <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl opacity-90 mb-1 xs:mb-2 leading-tight">
                        {personalData.title}
                      </p>
                      <div className="flex items-center opacity-80">
                        <MapPin className="w-2 h-2 xs:w-3 xs:h-3 sm:w-4 sm:h-4 mr-1 xs:mr-2" />
                        <span className="text-xs xs:text-sm">{personalData.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-2 xs:mt-3 sm:mt-0 flex space-x-3 xs:space-x-4 sm:space-x-6">
                      <div className="text-center">
                        <div className="text-sm xs:text-base sm:text-lg md:text-2xl font-bold">3+</div>
                        <div className="text-xs opacity-80">Years Study</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm xs:text-base sm:text-lg md:text-2xl font-bold">2</div>
                        <div className="text-xs opacity-80">Internships</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm xs:text-base sm:text-lg md:text-2xl font-bold">10+</div>
                        <div className="text-xs opacity-80">Certifications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Personal Info - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Brain className="w-6 h-6 mr-3 text-blue-600" />
                  My Journey
                </h3>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p className="leading-relaxed">
                    {personalData.aboutMe.introduction}
                  </p>
                  
                  <p className="leading-relaxed">
                    {personalData.aboutMe.goals}
                  </p>
                </div>

                {/* Interests */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                    Areas of Expertise
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {personalData.aboutMe.interests.map((interest, index) => (
                      <div
                        key={index}
                        className="flex items-center p-3 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-500 hover:border-blue-300 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm font-medium">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education - Now under Personal Info */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <GraduationCap className="w-6 h-6 mr-3 text-blue-600" />
                  Education
                </h3>
                
                <div className="space-y-6">
                  {educationData.degrees.map((degree, index) => (
                    <div 
                      key={degree.id}
                      className="relative pl-8 pb-6 border-l-2 border-blue-200 dark:border-blue-800 hover:border-blue-400 dark:hover:border-blue-600 transition-colors duration-300"
                    >
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full shadow-lg"></div>
                      
                      <div className="space-y-2">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {degree.degree}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium">
                          {degree.field}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {degree.institution} • {degree.location}
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                            {degree.duration}
                          </span>
                          <span className="font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                            {degree.grade}
                          </span>
                        </div>
                        
                        {degree.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 leading-relaxed bg-white dark:bg-gray-600 p-3 rounded-lg border border-gray-200 dark:border-gray-500">
                            {degree.description}
                          </p>
                        )}

                        {degree.achievements && degree.achievements.length > 0 && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                              <Award className="w-4 h-4 mr-1 text-yellow-600" />
                              Key Achievements:
                            </p>
                            <div className="space-y-1">
                              {degree.achievements.slice(0, 2).map((achievement, idx) => (
                                <div key={idx} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  <span>{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Achievements - Now in sidebar, no empty space */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 border border-gray-200 dark:border-gray-600 shadow-lg sticky top-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-blue-600" />
                  Key Achievements
                </h3>
                
                <div className="space-y-4">
                  {educationData.achievements.map((achievement, index) => (
                    <div key={index} className="p-4 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 group">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
                            {achievement.title}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 text-xs leading-relaxed">
                            {achievement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Additional Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Stats
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">3+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Years Study</div>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">2</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Internships</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">10+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Certificates</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">4+</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">Projects</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn Banner Modal - Enhanced for better full display */}
      {showBannerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="modal-overlay absolute inset-0" onClick={closeBannerModal}></div>
          
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Professional LinkedIn Banner
              </h3>
              <button
                onClick={closeBannerModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Full Banner Display - Optimized for complete visibility */}
            <div className="relative w-full overflow-hidden">
              <div className="relative w-full" style={{ minHeight: '400px', maxHeight: '600px' }}>
                <Image
                  src={personalData.linkedinBanner}
                  alt="Professional LinkedIn Banner - Full View"
                  fill
                  className="object-contain object-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
                  sizes="90vw"
                  priority
                />
              </div>
              
              {/* Minimal overlay for modal */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-transparent to-transparent h-24"></div>
              
              {/* Profile info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between">
                  <div>
                    <h4 className="text-3xl md:text-4xl font-bold mb-3">
                      {personalData.name}
                    </h4>
                    <p className="text-xl md:text-2xl opacity-90 mb-3">
                      {personalData.title}
                    </p>
                    <div className="flex items-center opacity-80">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span className="text-lg">{personalData.location}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 md:mt-0 flex space-x-8">
                    <div className="text-center">
                      <div className="text-3xl font-bold">3+</div>
                      <div className="text-sm opacity-80">Years Study</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">2</div>
                      <div className="text-sm opacity-80">Internships</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold">10+</div>
                      <div className="text-sm opacity-80">Certifications</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                This is my professional LinkedIn banner showcasing my journey in AI and technology.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
