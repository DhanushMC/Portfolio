'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react'
import personalData from '@/data/personal.json'

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear status when user starts typing
    if (formStatus.type) {
      setFormStatus({ type: '', message: '' })
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your name' })
      return false
    }
    if (!formData.email.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your email' })
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus({ type: 'error', message: 'Please enter a valid email address' })
      return false
    }
    if (!formData.subject.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter a subject' })
      return false
    }
    if (!formData.message.trim()) {
      setFormStatus({ type: 'error', message: 'Please enter your message' })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate form submission (replace with actual form handling)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For now, we'll create a mailto link as fallback
      const subject = encodeURIComponent(formData.subject)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoLink = `mailto:${personalData.email}?subject=${subject}&body=${body}`
      
      window.open(mailtoLink, '_blank')
      
      setFormStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!' 
      })
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })
      
    } catch (error) {
      setFormStatus({ 
        type: 'error', 
        message: 'Sorry, there was an error sending your message. Please try again or contact me directly.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: personalData.email,
      href: `mailto:${personalData.email}`,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: personalData.phone,
      href: `tel:${personalData.phone}`,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: personalData.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(personalData.location)}`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    }
  ]

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: personalData.social.github,
      color: 'hover:text-gray-900 dark:hover:text-white',
      bgColor: 'hover:bg-gray-100 dark:hover:bg-gray-800'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personalData.social.linkedin,
      color: 'hover:text-blue-600',
      bgColor: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
    },
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${personalData.email}`,
      color: 'hover:text-red-600',
      bgColor: 'hover:bg-red-50 dark:hover:bg-red-900/20'
    }
  ]

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-white dark:bg-gray-800"
    >
      {/* Professional Communication Background */}
      <div className="absolute inset-0">
        {/* Wave pattern */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.08]" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(59, 130, 246, 0.2) 2px, transparent 2px),
            radial-gradient(circle at 75px 75px, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}></div>
        
        {/* Professional communication elements */}
        <div className="absolute top-20 left-20 w-44 h-44 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/8 dark:to-blue-900/8 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-60 right-32 w-52 h-52 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/8 dark:to-indigo-900/8 rounded-full opacity-25 blur-3xl"></div>
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/8 dark:to-purple-900/8 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/8 dark:to-pink-900/8 rounded-full opacity-25 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get In <span className="text-blue-600 dark:text-blue-400">Touch</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Always open to discussing new opportunities, interesting projects, or having a chat about technology
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-3 text-blue-600" />
                  Let's Connect
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Whether you have a project in mind, want to collaborate on AI security research, or just want to say hello, 
                  I'd love to hear from you. Feel free to reach out through any of the channels below.
                </p>

                {/* Contact Details */}
                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.label === 'Location' ? '_blank' : undefined}
                      rel={item.label === 'Location' ? 'noopener noreferrer' : undefined}
                      className={`flex items-center space-x-4 p-4 ${item.bgColor} rounded-xl hover:scale-[1.02] transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 group`}
                    >
                      <div className={`p-3 bg-white dark:bg-gray-800 rounded-lg ${item.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {item.label}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Connect on Social Media
                  </h4>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 bg-gray-100 dark:bg-gray-600 rounded-xl text-gray-600 dark:text-gray-400 ${social.color} ${social.bgColor} transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl`}
                        title={social.label}
                      >
                        <social.icon className="w-6 h-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Send className="w-6 h-6 mr-3 text-blue-600" />
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                    placeholder="AI Security Discussion / Collaboration / General Inquiry"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="6"
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-600 text-gray-900 dark:text-white transition-all duration-300 resize-none hover:border-blue-400 dark:hover:border-blue-500"
                    placeholder="Tell me about your project, idea, or just say hello..."
                    required
                  ></textarea>
                </div>

                {/* Status Message */}
                {formStatus.message && (
                  <div className={`flex items-center space-x-3 p-4 rounded-lg ${
                    formStatus.type === 'success' 
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800' 
                      : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                  }`}>
                    {formStatus.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{formStatus.message}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center space-x-3 px-6 py-4 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isSubmitting
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner w-5 h-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  * Required fields. Your information will be kept confidential.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
