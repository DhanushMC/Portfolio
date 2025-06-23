'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Github, ExternalLink, X, Calendar, Tag, Code, Rocket } from 'lucide-react'
import projectsData from '@/data/projects.json'

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [filter, setFilter] = useState('all')
  const sectionRef = useRef(null)

  const categories = ['all', ...new Set([...projectsData.featured, ...projectsData.other].map(project => project.category))]

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

  const openModal = (project) => {
    setSelectedProject(project)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = 'auto'
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedProject])

  const allProjects = [...projectsData.featured, ...projectsData.other]
  const filteredProjects = filter === 'all' 
    ? allProjects
    : allProjects.filter(project => project.category === filter)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-600'
      case 'active': return 'bg-blue-600'
      case 'in development': return 'bg-yellow-600'
      case 'ongoing': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-white dark:bg-gray-800"
    >
      {/* Professional Innovation Background */}
      <div className="absolute inset-0">
        {/* Hexagonal pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.06]" style={{
          backgroundImage: `
            radial-gradient(circle at 20px 20px, rgba(99, 102, 241, 0.15) 2px, transparent 2px),
            radial-gradient(circle at 60px 60px, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px, 40px 40px'
        }}></div>
        
        {/* Professional geometric shapes */}
        <div className="absolute top-20 left-20 w-52 h-52 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/8 dark:to-indigo-900/8 rounded-2xl opacity-40 blur-3xl transform rotate-45"></div>
        <div className="absolute top-60 right-20 w-44 h-44 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/8 dark:to-purple-900/8 rounded-2xl opacity-35 blur-3xl transform -rotate-12"></div>
        <div className="absolute bottom-32 left-32 w-60 h-60 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/8 dark:to-cyan-900/8 rounded-2xl opacity-30 blur-3xl transform rotate-12"></div>
        <div className="absolute bottom-20 right-40 w-36 h-36 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/8 dark:to-blue-900/8 rounded-2xl opacity-35 blur-3xl transform -rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              My <span className="text-purple-600 dark:text-purple-400">Projects</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Innovative projects showcasing expertise in AI security, machine learning, and data science
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-600 group"
                onClick={() => openModal(project)}
              >
                {/* Project Image/Preview */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-4xl text-gray-400 dark:text-gray-500">
                        {project.category === 'AI Security' && <Code className="w-16 h-16" />}
                        {project.category === 'Machine Learning' && <Code className="w-16 h-16" />}
                        {project.category === 'Data Science' && <Code className="w-16 h-16" />}
                        {project.category === 'Healthcare AI' && <Code className="w-16 h-16" />}
                        {project.category === 'Academic Systems' && <Code className="w-16 h-16" />}
                        {project.category === 'Research' && <Code className="w-16 h-16" />}
                        {!['AI Security', 'Machine Learning', 'Data Science', 'Healthcare AI', 'Academic Systems', 'Research'].includes(project.category) && <Code className="w-16 h-16" />}
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 ${getStatusColor(project.status)} text-white text-xs font-semibold rounded-full shadow-lg`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Links Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {project.links?.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                    )}
                    
                    {project.links?.live && project.links.live !== '#' && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-3 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-all duration-300"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                      {project.title}
                    </h3>
                    
                    <div className="flex items-center space-x-1 ml-2">
                      <Tag className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium border border-gray-200 dark:border-gray-500"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 rounded-lg text-xs">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Code className="w-4 h-4 mr-1" />
                      Click to explore
                    </span>
                    <ExternalLink className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Projects Summary */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-purple-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Rocket className="w-10 h-10 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{projectsData.featured.length}</div>
              <div className="text-sm opacity-90">Featured Projects</div>
            </div>
            
            <div className="text-center p-6 bg-indigo-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Tag className="w-10 h-10 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{categories.length - 1}</div>
              <div className="text-sm opacity-90">Categories</div>
            </div>
            
            <div className="text-center p-6 bg-blue-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Code className="w-10 h-10 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{allProjects.filter(p => p.status === 'Active' || p.status === 'Ongoing').length}</div>
              <div className="text-sm opacity-90">Active Projects</div>
            </div>
            
            <div className="text-center p-6 bg-cyan-600 rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300">
              <Github className="w-10 h-10 mx-auto mb-3" />
              <div className="text-2xl font-bold mb-1">{allProjects.filter(p => p.links?.github).length}</div>
              <div className="text-sm opacity-90">Open Source</div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="modal-overlay absolute inset-0" onClick={closeModal}></div>
          
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between rounded-t-2xl">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedProject.title}
                </h2>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`px-3 py-1 ${getStatusColor(selectedProject.status)} text-white text-sm font-semibold rounded-full`}>
                    {selectedProject.status}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full">
                    {selectedProject.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {selectedProject.links?.github && (
                  <a
                    href={selectedProject.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
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
            <div className="p-6 space-y-8">
              {/* Project Image */}
              {selectedProject.image && (
                <div className="relative h-64 md:h-80 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Overview */}
              {selectedProject.details && (
                <>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Project Overview
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedProject.details.overview}
                    </p>
                  </div>

                  {/* Features */}
                  {selectedProject.details.features && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Key Features
                      </h3>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {selectedProject.details.features.map((feature, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Challenges */}
                  {selectedProject.details.challenges && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Challenges Overcome
                      </h3>
                      <ul className="space-y-3">
                        {selectedProject.details.challenges.map((challenge, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 dark:text-gray-300">{challenge}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {selectedProject.details.technologies && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Technologies Used
                      </h3>
                      <div className="space-y-4">
                        {Object.entries(selectedProject.details.technologies).map(([category, techs]) => (
                          <div key={category}>
                            <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{category}:</h4>
                            <div className="flex flex-wrap gap-2">
                              {techs.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* All Technologies (for projects without detailed breakdown) */}
              {!selectedProject.details && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-medium border border-purple-200 dark:border-purple-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
