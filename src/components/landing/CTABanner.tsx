import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'

export default function CTABanner() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-brand-blue to-brand-blue-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                Ready to Take Your Next Step?
              </h2>
              <p className="text-lg md:text-xl font-body text-white/80 max-w-2xl">
                Book a free 30-minute consultation today. Let&apos;s discuss your goals and how we can achieve them together.
              </p>
            </div>

            <div className="shrink-0 w-full md:w-auto">
              <Link 
                href="/contact"
                className="inline-flex justify-center items-center px-8 py-4 w-full md:w-auto rounded-full bg-white text-brand-blue font-heading font-bold text-[1.05rem] shadow-cta hover:bg-brand-blue-light transition-colors whitespace-nowrap"
              >
                Book a Free Session
              </Link>
            </div>

          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
