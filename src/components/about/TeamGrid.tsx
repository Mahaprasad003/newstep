'use client'

import React, { useEffect, useState } from 'react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { motion, AnimatePresence } from 'framer-motion'
import { TeamMember } from '@/lib/tina'

interface TeamGridProps {
  members: TeamMember[]
  selectedCategory: string
}

export default function TeamGrid({ members, selectedCategory }: TeamGridProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  if (members.length === 0) {
    return (
      <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-neutral-100">
        <p className="text-neutral-500 font-body text-lg">
          No team members found for {selectedCategory !== 'All' ? `"${selectedCategory}"` : 'this category'}.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      <AnimatePresence mode="popLayout">
        {members.map((member, idx) => (
          <motion.div
            key={member.id}
            layout
            initial={prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, ease: "easeOut", delay: idx * 0.05 }}
            className="flex flex-col group"
          >
            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] rounded-t-xl overflow-hidden shadow-sm border-x border-t border-neutral-100 bg-neutral-100/50">
              {member.headshot ? (
                <ImageWithFallback
                  src={member.headshot}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                  placeholderColor="bg-neutral-100"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-brand-blue-light text-brand-blue font-bold text-4xl">
                  {member.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Info Container */}
            <div className="flex flex-col bg-white p-6 border-x border-b border-neutral-100 rounded-b-2xl shadow-card transition-shadow duration-300 group-hover:shadow-card-hover group-hover:border-brand-blue/20">
              <span className="text-xs font-semibold px-2.5 py-1 mb-3 rounded-md bg-brand-blue-light/50 text-brand-blue w-fit">
                {member.category}
              </span>
              <h3 className="font-heading font-bold text-xl text-neutral-900 group-hover:text-brand-blue transition-colors">
                {member.name}
              </h3>
              <p className="font-body text-sm font-medium text-neutral-500 mt-1">
                {member.title}
              </p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
