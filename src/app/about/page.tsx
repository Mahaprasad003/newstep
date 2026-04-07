import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Target, HeartHandshake, Quote } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import SectionHeading from '@/components/ui/SectionHeading'
import TeamClient from '@/components/about/TeamClient'
import { getAllTeamMembers } from '@/lib/tina'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about our certified career counsellor and our mission to guide every student to their ideal career.',
}

const values = [
  {
    title: "Student-First Approach",
    description: "Every metric, aptitude test, and conversation fundamentally revolves around the unique emotional and academic profile of the student.",
    icon: <Target className="w-8 h-8 text-brand-blue" />
  },
  {
    title: "Evidence-Based Guidance",
    description: "We don't do guesswork. We utilize scientifically validated psychometric assessments as the foundation of our advisory frameworks.",
    icon: <Award className="w-8 h-8 text-brand-blue" />
  },
  {
    title: "Lifelong Support",
    description: "Choosing a college isn't the end. We stick around to help map out internships, resume building, and eventual corporate leaps.",
    icon: <HeartHandshake className="w-8 h-8 text-brand-blue" />
  }
]

export default async function AboutPage() {
  const teamMembers = await getAllTeamMembers()

  return (
    <div className="bg-white">
      
      {/* 1. Hero Banner */}
      <section className="bg-brand-blue-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <AnimatedSection>
            <nav className="text-sm font-body text-brand-blue mb-4 flex justify-center items-center">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2 text-brand-blue/50">/</span>
              <span className="text-brand-navy">About</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-brand-navy mb-6">
              About Newstep
            </h1>
            <p className="text-lg md:text-xl font-body text-brand-navy/80 max-w-2xl mx-auto">
              Empowering students to step confidently into their future with clarity, evidence, and profound empathy.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. Team Section (Dynamic via CMS) */}
      <TeamClient members={teamMembers} />

      {/* 3. Pull-Quote Mission Statement */}
      <section className="relative bg-brand-navy py-24 md:py-32 overflow-hidden px-4">
        {/* Background Decorative Quote Marks */}
        <Quote className="absolute top-10 left-10 md:top-20 md:left-24 w-40 h-40 md:w-64 md:h-64 text-white/5 transform -rotate-12" />
        <Quote className="absolute bottom-10 right-10 md:bottom-20 md:right-24 w-40 h-40 md:w-64 md:h-64 text-brand-blue/10 transform rotate-12" />
        
        <AnimatedSection className="relative z-10 max-w-5xl mx-auto text-center" scale>
          <p className="text-center font-heading font-semibold text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white italic">
             &ldquo;Our mission is to replace career anxiety with <span className="text-brand-green">radical clarity</span>, forging futures architected on unshakeable internal confidence and robust external evidence.&rdquo;
          </p>
        </AnimatedSection>
      </section>

      {/* 4. Values Cards */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeading title="Our Core Values" align="center" />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16">
            {values.map((val, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.2}>
                <div className="bg-neutral-50 rounded-3xl p-10 h-full flex flex-col items-center text-center hover:bg-brand-blue-light/30 transition-colors duration-300 border border-neutral-100/50">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8">
                    {val.icon}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-neutral-900 mb-4">
                    {val.title}
                  </h3>
                  <p className="text-neutral-600 font-body leading-relaxed flex-grow">
                    {val.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
