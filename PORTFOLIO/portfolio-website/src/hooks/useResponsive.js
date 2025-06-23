'use client'

import { useState, useEffect } from 'react'

const breakpoints = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
  '3xl': 1920,
  '4xl': 2560,
}

export function useResponsive() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  })

  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg')

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth
      const height = window.innerHeight
      
      setScreenSize({ width, height })

      // Determine current breakpoint
      if (width >= breakpoints['4xl']) {
        setCurrentBreakpoint('4xl')
      } else if (width >= breakpoints['3xl']) {
        setCurrentBreakpoint('3xl')
      } else if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl')
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl')
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg')
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md')
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm')
      } else {
        setCurrentBreakpoint('xs')
      }
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = screenSize.width < breakpoints.md
  const isTablet = screenSize.width >= breakpoints.md && screenSize.width < breakpoints.lg
  const isDesktop = screenSize.width >= breakpoints.lg
  const isLargeScreen = screenSize.width >= breakpoints.xl
  const isUltraWide = screenSize.width >= breakpoints['3xl']
  const is4K = screenSize.width >= breakpoints['4xl']

  const getResponsiveValue = (values) => {
    const breakpointOrder = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
    const currentIndex = breakpointOrder.indexOf(currentBreakpoint)
    
    // Find the appropriate value for current breakpoint or fallback to smaller
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i]
      if (values[bp] !== undefined) {
        return values[bp]
      }
    }
    
    // Fallback to the first available value
    return Object.values(values)[0]
  }

  const getResponsiveClasses = (baseClasses, responsiveClasses = {}) => {
    let classes = baseClasses
    
    Object.entries(responsiveClasses).forEach(([bp, cls]) => {
      if (screenSize.width >= breakpoints[bp]) {
        classes += ` ${cls}`
      }
    })
    
    return classes
  }

  return {
    screenSize,
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isLargeScreen,
    isUltraWide,
    is4K,
    breakpoints,
    getResponsiveValue,
    getResponsiveClasses,
  }
}

export default useResponsive
