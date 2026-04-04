'use client'

import { useState, useEffect, useCallback } from 'react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'

import { Testimonial } from '@/lib/tina'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export default function TestimonialsSection({ testimonials: rawTestimonials = [] }: TestimonialsSectionProps) {
  // Fallback defaults if empty
  const defaultTestimonials = [
    {
      name: 'Priya Sharma',
      role: 'Engineering Student, IIT Delhi',
      quote: 'Newstep Careers completely changed my perspective on my future. The counselling sessions were eye-opening and deeply personalised.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      name: 'Arjun Mehta',
      role: 'Parent of Class 12 Student',
      quote: 'As a parent, I was anxious about my son\'s career choices. The counsellor helped both of us see the bigger picture clearly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150',
    },
    {
      name: 'Sneha Patel',
      role: 'MBA Graduate, IIM Ahmedabad',
      quote: 'The psychometric testing and follow-up sessions gave me the confidence to pursue exactly the right career. Highly recommended.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150',
    }
  ]

  const activeTestimonials = rawTestimonials.length > 0 ? rawTestimonials : defaultTestimonials

  // Chunks of 3
  const pages = []
  for (let i = 0; i < activeTestimonials.length; i += 3) {
    pages.push(activeTestimonials.slice(i, i + 3))
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const maxIndex = pages.length - 1

  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current === maxIndex ? 0 : current + 1))
  }, [maxIndex])

  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? maxIndex : current - 1))
  }, [maxIndex])

  useEffect(() => {
    if (isHovered) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isHovered, nextSlide])

  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection>
          <SectionHeading title="What Our Students Say" align="center" />
        </AnimatedSection>

        <div 
          className="relative mt-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Carousel Container */}
          <div className="overflow-hidden px-2 pb-6">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {pages.map((page, pageIdx) => (
                <div key={pageIdx} className="w-full shrink-0 px-2 lg:px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {page.map((testimonial, idx) => (
                      <div key={idx} className="bg-white rounded-2xl shadow-card p-8 h-full flex flex-col items-center text-center hover:shadow-card-hover transition-shadow duration-300">
                        
                        <div className="flex space-x-1 mb-6 text-yellow-400">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>

                          <p className="text-neutral-700 italic font-body mb-8 flex-grow">
                            &ldquo;{testimonial.quote}&rdquo;
                          </p>

                        <div className="pt-6 border-t border-neutral-100 w-full flex flex-col items-center">
                          <div className="relative w-14 h-14 rounded-full overflow-hidden mb-4 bg-neutral-100">
                            <ImageWithFallback 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              unoptimized
                              placeholderColor="bg-neutral-100"
                            />
                          </div>
                          <h4 className="font-heading font-semibold text-neutral-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm font-body text-neutral-500">
                            {testimonial.role}
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls - exactly configured for the 2 pages */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-3">
              {pages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-colors",
                    activeIndex === idx ? "bg-brand-blue w-6" : "bg-neutral-300 hover:bg-brand-blue-light"
                  )}
                  aria-label={`Go to testimonial group ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              className="p-2 rounded-full border border-neutral-200 text-neutral-600 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  )
}
