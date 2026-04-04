'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const timelineEntries = [
  {
    year: '2024',
    title: 'Founded Newstep Careers',
    description: 'Launched a modernized, deeply empathetic counselling practice leveraging data-driven career mapping frameworks.',
  },
  {
    year: '2022',
    title: 'Lead Counsellor, Global Ed',
    description: 'Managed a portfolio of 500+ successful student transitions to Ivy League and Tier 1 universities globally.',
  },
  {
    year: '2019',
    title: 'Certified Career Counsellor (UCLA)',
    description: 'Earned an internationally recognized certification in advanced career psychology and psychometric analysis.',
  },
  {
    year: '2015',
    title: 'Corporate HR & Recruitment',
    description: 'Spent half a decade inside Fortune 500 recruiting teams understanding exactly what employers fundamentally look for.',
  },
]

export default function AboutTimeline() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div className="relative mt-20">
      {/* The Central Line (Centers physically on MD+, hugs the extremely left on mobile) */}
      <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-blue/20 transform md:-translate-x-1/2" />

      {/* Timeline Nodes */}
      <div className="space-y-12 md:space-y-24">
        {timelineEntries.map((node, index) => {
          const isEven = index % 2 === 0
          return (
            <motion.div 
              key={index}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={prefersReducedMotion ? undefined : { once: true, margin: "-10%" }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: "easeOut" }}
              className={cn(
                "relative flex flex-col md:flex-row items-start md:items-center w-full",
                isEven ? "md:flex-row-reverse" : ""
              )}
            >
              {/* The Dot Centerpiece */}
              <div className="absolute left-[39px] md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-brand-blue rounded-full border-4 border-neutral-50 shadow-sm z-10 mt-6 md:mt-0" />

              {/* Timeline Interactive Cards */}
              <div className={cn(
                "w-full md:w-1/2 pl-24 md:pl-0",
                isEven ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"
              )}>
                <div className={cn(
                  "bg-white p-8 rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 relative border border-neutral-100",
                  // Decorative triangle pointing to the line on desktop
                  isEven 
                    ? "md:after:content-[''] md:after:absolute md:after:top-1/2 md:after:-translate-y-1/2 md:after:right-[-10px] md:after:border-t-[10px] md:after:border-t-transparent md:after:border-b-[10px] md:after:border-b-transparent md:after:border-l-[10px] md:after:border-l-white"
                    : "md:after:content-[''] md:after:absolute md:after:top-1/2 md:after:-translate-y-1/2 md:after:left-[-10px] md:after:border-t-[10px] md:after:border-t-transparent md:after:border-b-[10px] md:after:border-b-transparent md:after:border-r-[10px] md:after:border-r-white"
                )}>
                  <span className="inline-block px-4 py-1.5 bg-brand-blue-light text-brand-blue font-bold text-sm rounded-full mb-4">
                    {node.year}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3">
                    {node.title}
                  </h3>
                  <p className="text-neutral-600 font-body leading-relaxed text-sm md:text-base">
                    {node.description}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
