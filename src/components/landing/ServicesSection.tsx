'use client'

import { Target, GraduationCap, Briefcase, FileText } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Target,
    title: 'Career Counselling',
    description: 'Expert guidance on stream and institution selection, application strategy, and admissions in India and abroad.',
    color: 'blue',
  },
  {
    icon: GraduationCap,
    title: 'Career Assessment & Analysis',
    description: 'Multidimensional psychometric and aptitude testing to uncover your strengths and align them with the right career path.',
    color: 'green',
  },
  {
    icon: Briefcase,
    title: 'Soft Skills Training',
    description: 'Turning knowledge into impact by strengthening communication, emotional intelligence, mindfulness, and adaptability for real-world success.',
    color: 'blue',
  },
  {
    icon: FileText,
    title: 'Placements',
    description: 'Bridging talent and opportunity by matching the right skills to the right careers at the right time.',
    color: 'green',
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-neutral-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection>
          <SectionHeading 
            title="Our Services" 
            subtitle="Comprehensive career guidance tailored to your unique journey"
            align="center"
          />
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-16">
          {services.map((service, idx) => {
            const Icon = service.icon
            const isBlue = service.color === 'blue'
            
            return (
              <AnimatedSection key={idx} delay={idx * 0.1}>
                <div className="bg-white rounded-2xl shadow-card hover:shadow-card-hover p-8 md:p-10 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                  
                  <div className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center mb-6 shrink-0",
                    isBlue ? "bg-brand-blue-light text-brand-blue" : "bg-brand-green-light text-brand-green"
                  )}>
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-neutral-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-neutral-600 font-body leading-relaxed flex-grow">
                    {service.description}
                  </p>

                </div>
              </AnimatedSection>
            )
          })}
        </div>
        
      </div>
    </section>
  )
}
