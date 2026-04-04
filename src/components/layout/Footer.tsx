import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

const Facebook = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const Instagram = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const Linkedin = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const Youtube = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
)

import { SiteSettings } from '@/lib/tina'

const currentYear = new Date().getFullYear();

interface FooterProps {
  settings?: SiteSettings | null
}

export default function Footer({ settings }: FooterProps) {
  const s = settings || {
    phone: "+91 98765 43210",
    email: "contact@newstepcareers.com",
    address: "123 Career Avenue, Block 4,\nNew Delhi, India",
    socials: {
      instagram: "#",
      linkedin: "#",
      twitter: "#",
      facebook: "#",
    }
  }

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-6 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          <AnimatedSection className="space-y-6" delay={0}>
            <Link href="/" className="inline-block text-2xl font-bold font-heading text-white">
              Newstep Careers
            </Link>
            <p className="text-gray-300 text-sm font-body leading-relaxed">
              Personalised career counselling for students and professionals across India. Helping you find your true career path.
            </p>
            <div className="flex space-x-4">
              {s.socials?.facebook && (
                <a href={s.socials.facebook} className="p-2 bg-white/5 hover:bg-brand-blue hover:scale-110 rounded-full transition-all duration-300 group" aria-label="Facebook">
                  <Facebook className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </a>
              )}
              {s.socials?.instagram && (
                <a href={s.socials.instagram} className="p-2 bg-white/5 hover:bg-brand-blue hover:scale-110 rounded-full transition-all duration-300 group" aria-label="Instagram">
                  <Instagram className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </a>
              )}
              {s.socials?.linkedin && (
                <a href={s.socials.linkedin} className="p-2 bg-white/5 hover:bg-brand-blue hover:scale-110 rounded-full transition-all duration-300 group" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </a>
              )}
              {s.socials?.twitter && (
                <a href={s.socials.twitter} className="p-2 bg-white/5 hover:bg-brand-blue hover:scale-110 rounded-full transition-all duration-300 group" aria-label="Twitter / X">
                  <Youtube className="w-4 h-4 text-gray-300 group-hover:text-white" />
                </a>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection className="" delay={0.1}>
            <h3 className="text-lg font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3 font-body text-gray-300 text-sm">
              <li>
                <Link href="/" className="hover:text-brand-blue hover:translate-x-1 transition-all duration-200 inline-block">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-blue hover:translate-x-1 transition-all duration-200 inline-block">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-blue hover:translate-x-1 transition-all duration-200 inline-block">Blog & Resources</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-brand-blue hover:translate-x-1 transition-all duration-200 inline-block">Gallery</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-blue hover:translate-x-1 transition-all duration-200 inline-block">Contact</Link>
              </li>
            </ul>
          </AnimatedSection>

          <AnimatedSection className="" delay={0.2}>
            <h3 className="text-lg font-heading font-semibold mb-6">Get in Touch</h3>
            <ul className="space-y-4 font-body text-gray-300 text-sm">
              <li className="flex items-start group">
                <Phone className="w-5 h-5 mr-3 text-brand-green shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>{s.phone}</span>
              </li>
              <li className="flex items-start group">
                <Mail className="w-5 h-5 mr-3 text-brand-green shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span>{s.email}</span>
              </li>
              <li className="flex items-start group">
                <MapPin className="w-5 h-5 mr-3 text-brand-green shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="whitespace-pre-line">{s.address}</span>
              </li>
            </ul>
          </AnimatedSection>
          
        </div>

        <AnimatedSection className="border-t border-white/10 pt-6 mt-12 flex flex-col md:flex-row justify-between items-center text-xs font-body text-gray-400">
          <p>© {currentYear} Newstep Careers. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Designed with care</p>
        </AnimatedSection>
        
      </div>
    </footer>
  )
}