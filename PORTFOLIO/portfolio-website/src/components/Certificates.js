'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Award, Download, X, ExternalLink, Calendar, CheckCircle, Medal, Eye, FileText } from 'lucide-react'
import certificatesData from '@/data/certificates.json'

export default function Certificates() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [filter, setFilter] = useState('all')
  const [viewMode, setViewMode] = useState('image') // 'image' or 'pdf'
  const sectionRef = useRef(null)

  const providers = ['all', ...certificatesData.categories.map(cat => cat.provider)]

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

  const openModal = (certificate) => {
    setSelectedCertificate(certificate)
    setViewMode(certificate.image ? 'image' : 'pdf')
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedCertificate(null)
    setViewMode('image')
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedCertificate) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedCertificate])

  const handleDownload = (certificate, e) => {
    e.stopPropagation()
    if (certificate.pdf) {
      const link = document.createElement('a')
      link.href = certificate.pdf
      link.download = `${certificate.title.replace(/[^a-z0-9]/gi, '_')}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const openInNewTab = (certificate, e) => {
    e.stopPropagation()
    if (certificate.pdf) {
      window.open(certificate.pdf, '_blank')
    } else if (certificate.image) {
      window.open(certificate.image, '_blank')
    }
  }

  const getProviderColor = (provider) => {
    const colors = {
      'Oracle': 'bg-red-600',
      'Coursera': 'bg-blue-600',
      'Infosys': 'bg-green-600',
      'Events & Competitions': 'bg-purple-600'
    }
    return colors[provider] || 'bg-gray-600'
  }

  const filteredCategories = filter === 'all' 
    ? certificatesData.categories 
    : certificatesData.categories.filter(cat => cat.provider === filter)

  const totalCertificates = certificatesData.categories.reduce((total, cat) => total + cat.certificates.length, 0)

  return (
    <section 
      id="certificates" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Professional Achievement Background */}
      <div className="absolute inset-0">
        {/* Diamond pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(217, 119, 6, 0.1) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(217, 119, 6, 0.1) 1px, transparent 1px),
            linear-gradient(45deg, transparent 10px, rgba(217, 119, 6, 0.05) 10px, rgba(217, 119, 6, 0.05) 20px, transparent 20px)
          `,
          backgroundSize: '30px 30px, 30px 30px, 60px 60px'
        }}></div>
        
        {/* Professional geometric elements */}
        <div className="absolute top-20 left-16 w-48 h-48 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-3xl opacity-30 blur-3xl transform rotate-12"></div>
        <div className="absolute top-60 right-20 w-40 h-40 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/10 dark:to-amber-900/10 rounded-3xl opacity-25 blur-3xl transform -rotate-45"></div>
        <div className="absolute bottom-40 left-20 w-56 h-56 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 rounded-3xl opacity-30 blur-3xl transform rotate-45"></div>
        <div className="absolute bottom-20 right-32 w-44 h-44 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 rounded-3xl opacity-25 blur-3xl transform -rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <span className="text-amber-600 dark:text-amber-400">Certifications</span> & Achievements
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional certifications and achievements that validate expertise and commitment to continuous learning
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {providers.map((provider) => (
              <button
                key={provider}
                onClick={() => setFilter(provider)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === provider
                    ? 'bg-amber-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
                }`}
              >
                {provider.charAt(0).toUpperCase() + provider.slice(1)}
              </button>
            ))}
          </div>

          {/* Certificates by Provider */}
          <div className="space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                {/* Provider Header */}
                <div className="flex items-center mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className={`w-16 h-16 ${getProviderColor(category.provider)} rounded-xl flex items-center justify-center mr-6 shadow-lg`}>
                    <Medal className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.provider}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 flex items-center mt-1">
                      <Award className="w-4 h-4 mr-2 text-amber-600" />
                      {category.certificates.length} certificate{category.certificates.length !== 1 ? 's' : ''} earned
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                      {category.certificates.length}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Achievements</div>
                  </div>
                </div>

                {/* Certificates Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.certificates.map((certificate, certIndex) => (
                    <div 
                      key={certificate.id}
                      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600 group"
                      onClick={() => openModal(certificate)}
                    >
                      {/* Certificate Image/Preview */}
                      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 overflow-hidden">
                        {certificate.image ? (
                          <Image
                            src={certificate.image}
                            alt={certificate.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Award className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        
                        {/* Action Buttons Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              openModal(certificate)
                            }}
                            className="flex items-center space-x-2 px-4 py-2 bg-white/90 text-gray-800 rounded-lg hover:bg-white transition-all duration-300 text-sm font-medium"
                          >
                            <Eye className="w-4 h-4" />
                            <span>Click to expand</span>
                          </button>
                        </div>

                        {/* Certificate Provider Badge */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 ${getProviderColor(category.provider)} text-white text-xs font-semibold rounded-full shadow-lg`}>
                            {category.provider}
                          </span>
                        </div>

                        {/* Evidence & Certificates Label */}
                        <div className="absolute bottom-4 left-4">
                          <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                            Evidence & Certificates
                          </span>
                        </div>
                      </div>

                      {/* Certificate Content */}
                      <div className="p-6">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                          {certificate.title}
                        </h4>
                        
                        <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-amber-600" />
                            <span>{certificate.issueDate}</span>
                          </div>
                          {certificate.credentialId && (
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                              <span className="text-xs">Verified</span>
                            </div>
                          )}
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">
                          {certificate.description}
                        </p>

                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {certificate.skills.slice(0, 3).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-3 py-1 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg text-xs font-medium border border-amber-200 dark:border-amber-700"
                            >
                              {skill}
                            </span>
                          ))}
                          {certificate.skills.length > 3 && (
                            <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg text-xs font-medium">
                              +{certificate.skills.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* View Details */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Click to view details
                          </span>
                          <ExternalLink className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certificates Summary */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-amber-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Award className="w-10 h-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{totalCertificates}</div>
              <div className="text-sm opacity-90">Total Certificates</div>
            </div>
            
            <div className="text-center p-6 bg-orange-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Medal className="w-10 h-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{certificatesData.categories.length}</div>
              <div className="text-sm opacity-90">Providers</div>
            </div>
            
            <div className="text-center p-6 bg-red-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <CheckCircle className="w-10 h-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">
                {certificatesData.categories.flatMap(cat => cat.certificates).flatMap(cert => cert.skills).length}
              </div>
              <div className="text-sm opacity-90">Skills Covered</div>
            </div>
            
            <div className="text-center p-6 bg-yellow-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Calendar className="w-10 h-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">2024</div>
              <div className="text-sm opacity-90">Latest Year</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Certificate Detail Modal with PDF/Image Viewer */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-overlay absolute inset-0 bg-black/70" onClick={closeModal}></div>
          
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl z-10">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedCertificate.title}
                </h2>
                <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mt-2">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedCertificate.issueDate}</span>
                  </div>
                  {selectedCertificate.credentialId && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Credential ID: {selectedCertificate.credentialId}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                {selectedCertificate.image && selectedCertificate.pdf && (
                  <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('image')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                        viewMode === 'image'
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      Image
                    </button>
                    <button
                      onClick={() => setViewMode('pdf')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all duration-200 ${
                        viewMode === 'pdf'
                          ? 'bg-amber-600 text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                      }`}
                    >
                      PDF
                    </button>
                  </div>
                )}

                {selectedCertificate.pdf && (
                  <button
                    onClick={(e) => handleDownload(selectedCertificate, e)}
                    className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors duration-300"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                )}

                {(selectedCertificate.pdf || selectedCertificate.image) && (
                  <button
                    onClick={(e) => openInNewTab(selectedCertificate, e)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in New Tab</span>
                  </button>
                )}
                
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col lg:flex-row h-full max-h-[calc(95vh-80px)]">
              {/* Certificate/PDF Viewer */}
              <div className="flex-1 bg-gray-50 dark:bg-gray-900 p-4">
                {viewMode === 'pdf' && selectedCertificate.pdf ? (
                  <div className="w-full h-full min-h-[600px] bg-white rounded-lg overflow-hidden shadow-inner">
                    <iframe
                      src={selectedCertificate.pdf}
                      className="w-full h-full border-0"
                      title={`${selectedCertificate.title} PDF`}
                    />
                  </div>
                ) : selectedCertificate.image ? (
                  <div className="relative w-full h-full min-h-[600px] bg-white rounded-lg overflow-hidden shadow-inner">
                    <Image
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      fill
                      className="object-contain p-4"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full min-h-[600px] bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">Certificate preview not available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Certificate Details Sidebar */}
              <div className="lg:w-96 p-6 overflow-y-auto">
                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    About This Certification
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    {selectedCertificate.description}
                  </p>
                </div>

                {/* Skills Covered */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Skills & Technologies
                  </h3>
                  <div className="space-y-2">
                    {selectedCertificate.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 rounded-lg border border-amber-200 dark:border-amber-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="font-medium text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Validation Info */}
                {(selectedCertificate.validUntil || selectedCertificate.credentialId) && (
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                      Certification Details
                    </h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {selectedCertificate.validUntil && (
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span>Valid Until: {selectedCertificate.validUntil}</span>
                        </div>
                      )}
                      {selectedCertificate.credentialId && (
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-orange-600" />
                          <span>Credential ID: {selectedCertificate.credentialId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
