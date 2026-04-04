'use client'

import { Target, GraduationCap, Briefcase, FileText } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'

const services = [
  {
    icon: Target,
    title: 'Career Assessment',
    description: 'Psychometric and aptitude testing to uncover your true strengths and align them with the right career path.',
    color: 'blue',
  },
  {
    icon: GraduationCap,
    title: 'College Counselling',
    description: 'Expert guidance on college selection, application strategy, and admission processes across India and abroad.',
    color: 'green',
  },
  {
    icon: Briefcase,
    title: 'Interview Coaching',
    description: 'Prepare for interviews with mock sessions, feedback, and proven techniques to present your best self.',
    color: 'blue',
  },
  {
    icon: FileText,
    title: 'Resume Building',
    description: 'Craft a compelling resume and LinkedIn profile that opens doors and gets you noticed by top recruiters.',
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
