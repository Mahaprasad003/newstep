'use client'

import React, { useState, useMemo } from 'react'
import { TeamMember } from '@/lib/tina'
import CategorySidebar from '@/components/blog/CategorySidebar'
import TeamGrid from './TeamGrid'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface TeamClientProps {
  members: TeamMember[]
}

export default function TeamClient({ members }: TeamClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  // Derive categories and counts dynamically from CMS data
  const { categories, memberCounts } = useMemo(() => {
    const counts: Record<string, number> = {}
    members.forEach((member) => {
      // Handle edge cases where category might be missing or empty
      const cat = member.category?.trim() || 'General'
      counts[cat] = (counts[cat] || 0) + 1
    })
    return {
      categories: Object.keys(counts).sort(),
      memberCounts: counts
    }
  }, [members])

  // Filter members
  const filteredMembers = useMemo(() => {
    if (selectedCategory === 'All') return members
    return members.filter(member => member.category?.trim() === selectedCategory)
  }, [members, selectedCategory])

  return (
    <section className="py-20 md:py-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* We can provide an optional intro above the team grid */}
        <div className="mb-12 md:mb-16 max-w-2xl">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-brand-navy mb-4">
              Our Team
            </h2>
            <p className="text-lg font-body text-neutral-600 leading-relaxed">
              Meet the dedicated professionals combining psychometric research with deep empathy to guide you.
            </p>
          </AnimatedSection>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <CategorySidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            postCounts={memberCounts}
            allLabel="Team Members"
          />

          <div className="flex-1 min-w-0">
            <TeamGrid 
              members={filteredMembers} 
              selectedCategory={selectedCategory} 
            />
          </div>
        </div>
        
      </div>
    </section>
  )
}
