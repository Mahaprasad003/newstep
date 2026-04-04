'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { useEffect, useState } from 'react'

export default function HeroSection({ 
  tagline = "Helping You Find Your True Career Path",
  heroSubtext = "Personalised career counselling for students and professionals across India."
}: { 
  tagline?: string, 
  heroSubtext?: string 
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const scrollToServices = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const services = document.getElementById('services')
    if (services) {
      services.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const noAnimation = prefersReducedMotion

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2850"
          alt="Career counselling session" 
          fill
          priority
          className="object-cover"
          unoptimized
          placeholderColor="bg-brand-navy"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 to-brand-blue/70 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.h1 
          className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-white max-w-4xl tracking-tight mb-6"
          initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {tagline}
        </motion.h1>
        
        <motion.p 
          className="text-lg sm:text-xl font-body text-white/90 max-w-2xl mb-10"
          initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: noAnimation ? 0 : 0.15 }}
        >
          {heroSubtext}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={noAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: noAnimation ? 0 : 0.3 }}
        >
          <Link 
            href="/contact"
            className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-white text-brand-blue font-heading font-semibold text-[0.95rem] hover:bg-brand-blue-light active:scale-95 transition-all shadow-lg"
          >
            Book a Free Session
          </Link>
          <a 
            href="#services"
            onClick={scrollToServices}
            className="inline-flex justify-center items-center px-8 py-3.5 rounded-full bg-transparent text-white border border-white font-heading font-semibold text-[0.95rem] hover:bg-white/10 active:scale-95 transition-all"
          >
            Learn More
          </a>
        </motion.div>
      </div>

      {!noAnimation && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 opacity-70">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-white" />
          </motion.div>
        </div>
      )}
    </section>
  )
}