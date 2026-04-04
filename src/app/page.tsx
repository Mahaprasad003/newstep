import type { Metadata } from 'next'
import HeroSection from '@/components/landing/HeroSection'
import StatsBar from '@/components/landing/StatsBar'
import ServicesSection from '@/components/landing/ServicesSection'
import ParallaxImage from '@/components/landing/ParallaxImage'
import WhyUsSection from '@/components/landing/WhyUsSection'
import TestimonialsSection from '@/components/landing/TestimonialsSection'
import BlogPreviewSection from '@/components/landing/BlogPreviewSection'
import CTABanner from '@/components/landing/CTABanner'
import { getSiteSettings, getTestimonials } from '@/lib/tina'

export const metadata: Metadata = {
  title: 'Newstep Careers — Career Counselling India',
  description:
    'Professional career counselling for students and professionals. Psychometric testing, college admissions guidance, interview coaching, and personalised career planning.',
}

export default async function Home() {
  const settings = await getSiteSettings()
  const testimonials = await getTestimonials()

  return (
    <>
      <HeroSection tagline={settings?.tagline} heroSubtext={settings?.heroSubtext} />
      <StatsBar stats={settings?.stats} />
      <ServicesSection />
      <ParallaxImage />
      <WhyUsSection />
      <TestimonialsSection testimonials={testimonials} />
      <BlogPreviewSection />
      <CTABanner />
    </>
  )
}
