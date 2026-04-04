'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  title: string
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false) // For mobile accordion

  useEffect(() => {
    // Dynamically find all h2 tags inside the prose article
    const elements = Array.from(document.querySelectorAll('.prose h2'))
    const items = elements.map((el) => {
      // Ensure element has an ID
      if (!el.id) {
        el.id = el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || ''
      }
      return {
        id: el.id,
        title: el.textContent || ''
      }
    })
    
    setHeadings(items)

    // Scroll Spy Logic
    const callback = (entries: IntersectionObserverEntry[]) => {
      // Identify which elements are intersecting
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
      if (visibleEntries.length > 0) {
        // If multiple are visible, pick the first one
        setActiveId(visibleEntries[0].target.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '-10% 0px -40% 0px',
      threshold: 0.1
    })

    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  const DesktopSidebar = (
    <div className="hidden md:block sticky top-28 bg-white shadow-card rounded-2xl p-6 w-full">
      <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4 pb-4 border-b border-neutral-100">
        On this page
      </h3>
      <nav className="space-y-1">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className={cn(
              "block text-sm py-2 px-3 rounded-lg transition-all duration-200 border-l-2",
              activeId === heading.id
                ? "border-brand-blue bg-brand-blue-light text-brand-blue font-semibold"
                : "border-transparent text-neutral-600 hover:text-brand-blue hover:bg-neutral-50"
            )}
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </div>
  )

  const MobileAccordion = (
    <div className="md:hidden mb-10 bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="toc-accordion"
        className="w-full flex items-center justify-between p-5 bg-neutral-50 text-neutral-900 font-heading font-semibold"
      >
        <span>Table of Contents</span>
        <svg 
          className={cn("w-5 h-5 transition-transform duration-200", isOpen && "rotate-180")} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div id="toc-accordion" className="p-4 border-t border-neutral-100">
          <nav className="space-y-1">
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block text-sm py-2 px-3 rounded-lg border-l-2",
                  activeId === heading.id
                    ? "border-brand-blue bg-brand-blue-light text-brand-blue font-semibold"
                    : "border-transparent text-neutral-600"
                )}
              >
                {heading.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  )

  return (
    <>
      {DesktopSidebar}
      {MobileAccordion}
    </>
  )
}
