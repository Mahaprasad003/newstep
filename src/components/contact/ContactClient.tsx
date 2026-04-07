'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { cn } from '@/lib/utils'
import { SiteSettings } from '@/lib/tina'

type Inputs = {
  fullName: string
  email: string
  phone: string
  subject: string
  message: string
}

const FORM_NAME = 'contact'

export default function ContactClient({ settings }: { settings: SiteSettings | null }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])
  
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors } 
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': FORM_NAME,
          ...data,
        }).toString(),
      })

      if (!response.ok) {
        throw new Error(`Netlify submission failed with status ${response.status}`)
      }

      reset()
      setIsSuccess(true)
    } catch (error) {
      console.error('Netlify form submission failed:', error)
      setSubmitError('We could not send your message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Fallback defaults
  const phone = settings?.phone || "+91 98765 43210"
  const email = settings?.email || "hello@newstepcareers.com"
  const address = settings?.address || "Knowledge Park, Sector 4, New Delhi"
  const whatsapp = settings?.whatsapp || "919876543210"

  const contactCards = [
    {
      icon: <Phone className="w-6 h-6 text-brand-blue" />,
      title: "Primary Phone",
      value: phone,
      action: `tel:${phone.replace(/\s+/g, '')}`
    },
    {
      icon: <Mail className="w-6 h-6 text-brand-blue" />,
      title: "Email",
      value: email,
      action: `mailto:${email}`
    },
    {
      icon: <MapPin className="w-6 h-6 text-brand-blue" />,
      title: "Headquarters",
      value: address,
      action: null
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-brand-blue" />,
      title: "WhatsApp",
      value: "Chat with an Advisor",
      action: `https://wa.me/${whatsapp.replace(/\D/g, '')}`
    }
  ]

  return (
    <div className="bg-white min-h-screen">
      
      {/* 1. Universal Hero Header */}
      <section className="bg-brand-blue-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <AnimatedSection>
            <nav className="text-sm font-body text-brand-blue mb-4 flex justify-center items-center">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2 text-brand-blue/50">/</span>
              <span className="text-brand-navy">Contact</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-brand-navy mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl font-body text-brand-navy/80 max-w-2xl mx-auto">
              Ready to take the next step? Reach out to our advisory team and we&apos;ll connect with you within 24 hours.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* 2. Main 2-Column Grid */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            
            {/* Left Column: Contact Cards (5/12 columns) */}
            <div className="lg:col-span-5 space-y-12">
              <AnimatedSection direction="left">
                <h2 className="text-4xl font-heading font-extrabold text-neutral-900 mb-6">
                  Let&apos;s start a conversation
                </h2>
                <p className="text-xl text-neutral-600 font-body mb-12 leading-relaxed max-w-lg">
                  Whether you are a student confused about which stream to take, or a parent seeking long-term roadmap planning, we are here to listen.
                </p>

                <div className="space-y-8">
                  {contactCards.map((card, idx) => {
                    const Wrapper = card.action ? 'a' : 'div'
                    return (
                      <Wrapper
                        key={idx}
                        href={card.action || undefined}
                        target={card.action && card.action.startsWith('http') ? '_blank' : undefined}
                        className={cn(
                          "flex items-start group transition-all duration-300",
                          card.action ? "cursor-pointer" : ""
                        )}
                      >
                        <div className="w-14 h-14 bg-brand-blue-light/50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                          {/* We clone the icon to manipulate stroke classes easily */}
                          <div className={cn("text-brand-blue group-hover:text-white transition-colors duration-300")}>
                            {card.icon}
                          </div>
                        </div>
                        <div className="ml-6 pt-1 flex flex-col justify-center">
                          <h3 className="text-sm font-heading font-bold uppercase tracking-widest text-neutral-400 mb-1">
                            {card.title}
                          </h3>
                          <p className={cn(
                            "font-body text-xl text-neutral-900 font-medium whitespace-pre-line",
                            card.action ? "group-hover:text-brand-blue transition-colors" : ""
                          )}>
                            {card.value}
                          </p>
                        </div>
                      </Wrapper>
                    )
                  })}
                </div>
              </AnimatedSection>
            </div>

            {/* Right Column: React Hook Form (7/12 columns) */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="up" delay={0.2} className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 md:p-14 border border-neutral-100/60 relative overflow-hidden h-full">
                
                {/* Embedded Success Overlay (Absolute bounds mapping) */}
                {isSuccess && (
                  <div
                    className="absolute inset-0 bg-white z-10 flex flex-col items-center justify-center text-center p-8"
                    role="status"
                    aria-live="polite"
                  >
                    <motion.div
                      initial={prefersReducedMotion ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={prefersReducedMotion ? { duration: 0.01 } : { type: "spring", stiffness: 200, damping: 20 }}
                    >
                      <CheckCircle className="w-24 h-24 text-brand-green mb-6 mx-auto" />
                    </motion.div>
                    <h3 className="text-4xl font-heading font-bold text-brand-navy mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-neutral-600 font-body text-lg mb-10 max-w-md">
                      Thank you for reaching out to Newstep Careers. One of our lead advisors will contact you shortly regarding your inquiry.
                    </p>
                    <button 
                      type="button"
                      onClick={() => setIsSuccess(false)}
                      className="px-10 py-4 bg-brand-blue-light hover:bg-brand-blue hover:text-white text-brand-blue font-heading font-bold rounded-full transition-colors duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                )}

                <form
                  name={FORM_NAME}
                  method="POST"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-8 flex flex-col"
                >
                  <input type="hidden" name="form-name" value={FORM_NAME} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Name */}
                    <div className="space-y-3">
                      <label htmlFor="fullName" className="text-sm font-heading font-bold text-neutral-900 tracking-wide uppercase">
                        Full Name <span className="text-brand-blue">*</span>
                      </label>
                      <input 
                        id="fullName"
                        {...register("fullName", { required: "Name is required" })} 
                        className={cn(
                          "w-full px-5 py-4 rounded-xl bg-neutral-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-200 font-body text-neutral-900",
                          errors.fullName ? "border-red-500 focus:border-red-500" : ""
                        )}
                        placeholder="John Doe"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      />
                      {errors.fullName && <p id="fullName-error" className="text-red-500 text-xs font-body font-medium mt-1">{errors.fullName.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-3">
                      <label htmlFor="email" className="text-sm font-heading font-bold text-neutral-900 tracking-wide uppercase">
                        Email Address <span className="text-brand-blue">*</span>
                      </label>
                      <input 
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                        })} 
                        className={cn(
                          "w-full px-5 py-4 rounded-xl bg-neutral-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-200 font-body text-neutral-900",
                          errors.email ? "border-red-500 focus:border-red-500" : ""
                        )}
                        placeholder="john@example.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && <p id="email-error" className="text-red-500 text-xs font-body font-medium mt-1">{errors.email.message}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phone */}
                    <div className="space-y-3">
                      <label htmlFor="phone" className="text-sm font-heading font-bold text-neutral-900 tracking-wide uppercase">
                        Phone Number
                      </label>
                      <input 
                        id="phone"
                        type="tel"
                        {...register("phone")} 
                        className="w-full px-5 py-4 rounded-xl bg-neutral-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-200 font-body text-neutral-900"
                        placeholder="+91 XXXXX XXXXX" 
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-3">
                      <label htmlFor="subject" className="text-sm font-heading font-bold text-neutral-900 tracking-wide uppercase">
                        Subject Inquiry <span className="text-brand-blue">*</span>
                      </label>
                      <select 
                        id="subject"
                        {...register("subject", { required: "Please select an inquiry type" })}
                        className={cn(
                          "w-full px-5 py-4 rounded-xl bg-neutral-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-200 font-body text-neutral-900 appearance-none",
                          errors.subject ? "border-red-500 focus:border-red-500" : ""
                        )}
                        aria-required="true"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                      >
                        <option value="">Select a topic...</option>
                        <option value="school-counselling">School Counselling</option>
                        <option value="college-admissions">College Admissions</option>
                        <option value="study-abroad">Study Abroad Program</option>
                        <option value="psychometric-testing">Psychometric Testing</option>
                        <option value="general">General Inquiry</option>
                      </select>
                      {errors.subject && <p id="subject-error" className="text-red-500 text-xs font-body font-medium mt-1">{errors.subject.message}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-3 flex-grow">
                    <label htmlFor="message" className="text-sm font-heading font-bold text-neutral-900 tracking-wide uppercase">
                      How can we help? <span className="text-brand-blue">*</span>
                    </label>
                    <textarea 
                      id="message"
                      rows={5}
                      {...register("message", { required: "A message is required", minLength: { value: 10, message: "Please provide a slightly longer description" } })} 
                        className={cn(
                          "w-full px-5 py-4 rounded-xl bg-neutral-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/10 transition-all duration-200 font-body text-neutral-900 resize-y",
                          errors.message ? "border-red-500 focus:border-red-500" : ""
                        )}
                      placeholder="Tell us a little bit about your current situation..."
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && <p id="message-error" className="text-red-500 text-xs font-body font-medium mt-1">{errors.message.message}</p>}
                  </div>

                  {/* Submit Array */}
                  <div className="pt-4">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-brand-blue hover:bg-brand-blue-dark text-white font-heading font-bold tracking-wide text-lg py-5 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-70 disabled:hover:-translate-y-0 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                    <p className="text-center text-sm text-neutral-400 font-body mt-6">
                      Your details are completely secure and will not be shared with any third party.
                    </p>
                    {submitError && (
                      <p className="text-center text-sm text-red-500 font-body mt-3" role="alert">
                        {submitError}
                      </p>
                    )}
                  </div>
                </form>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}
