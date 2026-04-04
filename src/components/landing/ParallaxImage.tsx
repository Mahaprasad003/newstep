'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'

export default function ParallaxImage() {
  return (
    <AnimatedSection className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2850)' }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-brand-navy/60" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-md">
          Your Career. Your Future. Your Step.
        </h2>
        <div className="h-0.5 bg-brand-green w-[80px] mx-auto rounded-full" />
      </div>
    </AnimatedSection>
  )
}