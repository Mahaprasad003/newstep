'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Briefcase } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [mobileMenuOpen])

  const isHome = pathname === '/'
  const isScrolled = scrolled || !isHome

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-lg focus:font-heading focus:font-semibold"
      >
        Skip to main content
      </a>

      <nav
        aria-label="Main navigation"
        className={cn(
          'fixed top-0 left-0 w-full z-50 h-20 transition-all duration-300 ease-in-out',
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent text-white'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            
            <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 group">
              <div className={cn(
                "flex items-center justify-center w-7 h-7 sm:w-9 sm:h-9 rounded-xl transition-colors", 
                isScrolled ? "bg-brand-blue-light text-brand-blue" : "bg-white/10 text-white backdrop-blur-sm group-hover:bg-white/20"
              )}>
                <Briefcase strokeWidth={2.5} className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className={cn("text-lg sm:text-xl lg:text-2xl font-bold font-heading tracking-tight", isScrolled ? "text-brand-navy" : "text-white")}>
                Newstep Careers
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'font-heading font-medium text-[0.95rem] transition-colors relative group',
                      isScrolled ? 'text-neutral-700 hover:text-brand-blue' : 'text-white/90 hover:text-white',
                      isActive && (isScrolled ? 'text-brand-blue' : 'text-white')
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                    <span 
                      className={cn(
                        "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 ease-in-out group-hover:w-full",
                        isScrolled ? "bg-brand-blue" : "bg-white"
                      )} 
                    />
                    {isActive && (
                      <span 
                        className={cn(
                          "absolute -bottom-1 left-1/2 w-1 h-1 rounded-full -translate-x-1/2",
                          isScrolled ? "bg-brand-blue" : "bg-white"
                        )} 
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-blue text-white font-heading font-semibold text-[0.9rem] shadow-sm hover:bg-brand-blue-dark active:scale-95 transition-all"
              >
                Book a Session
              </Link>

              <button
                type="button"
                className={cn("md:hidden p-2 rounded-md", isScrolled ? "text-neutral-900" : "text-white")}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open main menu'}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div 
          id="mobile-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={cn(
            "md:hidden absolute top-full left-0 w-full bg-white border-t border-neutral-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out",
            mobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-3 rounded-md text-base font-medium font-heading',
                    isActive 
                      ? 'bg-brand-blue-light text-brand-blue' 
                      : 'text-neutral-700 hover:bg-neutral-50 hover:text-brand-blue'
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              )
            })}
            <div className="pt-4 px-3">
              <Link
                href="/contact"
                className="w-full inline-flex justify-center px-4 py-3 rounded-xl bg-brand-blue text-white font-heading font-semibold hover:bg-brand-blue-dark"
                onClick={closeMobileMenu}
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}