'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  id?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  scale?: boolean
}

export default function AnimatedSection({ 
  children, 
  className, 
  id, 
  delay = 0,
  direction = 'up',
  scale = false
}: AnimatedSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const x = direction === 'left' ? -40 : direction === 'right' ? 40 : 0
  const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0
  
  const initial = { 
    opacity: 0, 
    x, 
    y,
    scale: scale ? 0.9 : 1
  }

  if (prefersReducedMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    )
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay }}
    >
      {children}
    </motion.section>
  )
}