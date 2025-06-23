'use client'

import { useState, useEffect, useRef } from 'react'
import { Briefcase, Calendar, MapPin, ExternalLink, X, Award, Building, FileText, Eye } from 'lucide-react'
import experienceData from '@/data/experience.json'

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedExperience, setSelectedExperience] = useState(null)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
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

  const openModal = (experience) => {
    setSelectedExperience(experience)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedExperience(null)
    document.body.style.overflow = 'auto'
  }

  const openCertificate = (certificatePath, companyName) => {
    setSelectedCertificate({ path: certificatePath, company: companyName })
    document.body.style.overflow = 'hidden'
  }

  const closeCertificate = () => {
    setSelectedCertificate(null)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (selectedCertificate) {
          closeCertificate()
        } else {
          closeModal()
        }
      }
    }

    if (selectedExperience || selectedCertificate) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedExperience, selectedCertificate])

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Professional Corporate Background */}
      <div className="absolute inset-0">
        {/* Corporate grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(rgba(79, 70, 229, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79, 70, 229, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Professional geometric elements */}
        <div className="absolute top-32 left-20 w-40 h-40 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/10 dark:to-blue-900/10 rounded-lg opacity-30 blur-3xl transform rotate-45"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg opacity-30 blur-3xl transform -rotate-12"></div>
        <div className="absolute bottom-40 left-32 w-48 h-48 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/10 dark:to-indigo-900/10 rounded-lg opacity-25 blur-3xl transform rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Work <span className="text-indigo-600 dark:text-indigo-400">Experience</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional journey through internships and hands-on experience in AI security and automation
            </p>
          </div>

          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-blue-500 to-purple-500 transform md:-translate-x-1/2"></div>

            <div className="space-y-12">
              {experienceData.positions.map((position, index) => (
                <div 
                  key={position.id}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full transform md:-translate-x-1/2 z-10 shadow-lg"></div>

                  {/* Experience Card */}
                  <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <div 
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600"
                      onClick={() => openModal(position)}
                    >
                      {/* Company & Role */}
                      <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300">
                            {position.role}
                          </h3>
                          <div className="flex items-center space-x-3 mt-3">
                            {/* Company Logo */}
                            {position.logo && (
                              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm border border-gray-200 dark:border-gray-600">
                                <img 
                                  src={position.logo} 
                                  alt={`${position.company} logo`}
                                  className="w-full h-full object-contain p-1"
                                />
                              </div>
                            )}
                            <div className="flex items-center space-x-2">
                              <Building className="w-4 h-4 text-indigo-600" />
                              {position.companyUrl ? (
                                <a 
                                  href={position.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="company-link text-indigo-600 dark:text-indigo-400 font-semibold"
                                >
                                  <span>{position.company}</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              ) : (
                                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                                  {position.company}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full relative">
                          <span className="font-medium">{position.type}</span>
                          {/* Certificate Indicator */}
                          {position.certificate && (
                            <div className="flex items-center space-x-1">
                              <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                              <FileText className="w-3 h-3 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Duration & Location */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{position.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                          <span>{position.location}</span>
                          {position.workType && (
                            <>
                              <span>•</span>
                              <span className="font-medium">{position.workType}</span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {position.summary}
                      </p>

                      {/* Key Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {position.details.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-600"
                          >
                            {tech}
                          </span>
                        ))}
                        {position.details.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                            +{position.details.technologies.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* View Details & Certificate */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Click card for full details
                        </span>
                        
                        <div className="flex items-center space-x-3">
                          {/* Certificate Button - Medium Size */}
                          {position.certificate && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                openCertificate(position.certificate, position.company)
                              }}
                              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            >
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">Certificate</span>
                            </button>
                          )}
                          
                          <ExternalLink className="w-4 h-4 text-indigo-600 hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Volunteering Section */}
          {experienceData.volunteering && experienceData.volunteering.length > 0 && (
            <div className="mt-20">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center">
                <Award className="w-8 h-8 mr-3 text-indigo-600" />
                Volunteering & Community
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {experienceData.volunteering.map((volunteer, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-xl transition-all duration-300"
                  >
                    <h4 className="font-bold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300 mb-2">
                      {volunteer.organization}
                    </h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-2">
                      {volunteer.role}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      {volunteer.duration}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {volunteer.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Experience Detail Modal */}
      {selectedExperience && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-overlay absolute inset-0" onClick={closeModal}></div>
          
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedExperience.role}
                </h2>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mt-3">
                  <div className="flex items-center space-x-2">
                    {/* Company Logo in Modal */}
                    {selectedExperience.logo && (
                      <div className="w-8 h-8 rounded-md overflow-hidden flex-shrink-0 bg-white shadow-sm border border-gray-200 dark:border-gray-600">
                        <img 
                          src={selectedExperience.logo} 
                          alt={`${selectedExperience.company} logo`}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>
                    )}
                    <Building className="w-4 h-4" />
                    {selectedExperience.companyUrl ? (
                      <a 
                        href={selectedExperience.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="company-link text-indigo-600 dark:text-indigo-400"
                      >
                        <span>{selectedExperience.company}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span>{selectedExperience.company}</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedExperience.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedExperience.location}</span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Summary */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Role Overview
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedExperience.summary}
                </p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Responsibilities
                </h3>
                <ul className="space-y-3">
                  {selectedExperience.details.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {responsibility}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Key Achievements
                </h3>
                <ul className="space-y-3">
                  {selectedExperience.details.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Award className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {achievement}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Technologies & Tools Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedExperience.details.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg font-medium border border-indigo-200 dark:border-indigo-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Viewer Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-overlay absolute inset-0" onClick={closeCertificate}></div>
          
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center space-x-3">
                <FileText className="w-6 h-6 text-green-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Internship Completion Certificate
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedCertificate.company}
                  </p>
                </div>
              </div>
              
              <button
                onClick={closeCertificate}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Certificate Image */}
            <div className="p-6">
              <div className="relative bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden">
                <img
                  src={selectedCertificate.path}
                  alt={`${selectedCertificate.company} Internship Certificate`}
                  className="w-full h-auto object-contain max-h-[70vh]"
                  style={{ maxHeight: '70vh' }}
                />
              </div>
              
              {/* Download Button */}
              <div className="mt-6 flex justify-center">
                <a
                  href={selectedCertificate.path}
                  download={`${selectedCertificate.company.replace(/[^a-zA-Z0-9]/g, '_')}_Certificate.jpeg`}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <FileText className="w-5 h-5" />
                  <span>Download Certificate</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
