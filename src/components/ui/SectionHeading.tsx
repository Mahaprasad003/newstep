'use client'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  const isCenter = align === 'center'
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div className={cn('mb-12 md:mb-16', isCenter && 'text-center')}>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
        {title}
      </h2>
      <motion.div 
        className={cn(
          "h-1 bg-brand-green w-[60px] rounded mb-6",
          isCenter && "mx-auto"
        )}
        initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
        whileInView={prefersReducedMotion ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        style={{ transformOrigin: isCenter ? 'center' : 'left' }}
      />
      {subtitle && (
        <p className="text-lg font-body text-neutral-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}