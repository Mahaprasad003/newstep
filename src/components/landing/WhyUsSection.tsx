'use client'

import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { CheckCircle2 } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const points = [
  'Personalized 1-on-1 counseling powered by psychometric insights',
  'Targeted skill development for students and professionals',
  'Discover your strengths and align them with the right career path',
  'Trusted by students, professionals, and families',
  'Long-term career clarity rooted in self-knowledge, not market trends',
]

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side (40%) */}
          <AnimatedSection className="w-full lg:w-[40%] shrink-0">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1555421689-d68471e189f2?auto=format&fit=crop&q=80&w=800"
                alt="Newstep Career Counsellor"
                fill
                className="object-cover"
                unoptimized
                placeholderColor="bg-brand-blue-light"
              />
            </div>
          </AnimatedSection>

          {/* Content Side (60%) */}
          <AnimatedSection className="w-full lg:w-[60%] flex flex-col justify-center" delay={0.2}>
            
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Why Choose Newstep?
            </h2>
            <div className="h-1 bg-brand-green w-[60px] rounded mb-8" />
            
            <p className="text-lg font-body text-neutral-600 mb-8 max-w-2xl">
              We don&apos;t just suggest careers; we embark on a journey with you to uncover your genuine potential and build a strategic roadmap for success.
            </p>

            <ul className="space-y-4 md:space-y-5">
              {points.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-green mr-4 shrink-0 mt-0.5" />
                  <span className="text-neutral-800 font-body md:text-lg">{point}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <a 
                href="/about"
                className="inline-flex items-center font-heading font-semibold text-brand-blue hover:text-brand-blue-dark transition-colors group"
              >
                Read our story
                <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </AnimatedSection>

        </div>
        
      </div>
    </section>
  )
}