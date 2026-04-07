'use client'

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { TeamMember } from '@/lib/tina'

interface TeamGridProps {
  members: TeamMember[]
  selectedCategory: string
}

type SocialLink = {
  label: string
  href: string
}

function normaliseExternalUrl(url: string) {
  if (!url) return ''
  if (/^[a-z]+:\/\//i.test(url)) return url
  return `https://${url}`
}

function getSocialLinks(member: TeamMember): SocialLink[] {
  return [
    { label: 'LinkedIn', href: member.socials.linkedin },
    { label: 'Twitter / X', href: member.socials.twitter },
    { label: 'Facebook', href: member.socials.facebook },
    { label: 'Instagram', href: member.socials.instagram },
  ].filter((link) => link.href.trim() !== '')
}

export default function TeamGrid({ members, selectedCategory }: TeamGridProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [activeMemberId, setActiveMemberId] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  const activeMember = useMemo(
    () => members.find((member) => member.id === activeMemberId) ?? null,
    [activeMemberId, members]
  )

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const closeModal = useCallback(() => {
    setActiveMemberId(null)
  }, [])

  useEffect(() => {
    if (!activeMember) {
      document.body.style.overflow = 'unset'
      triggerRef.current?.focus()
      return
    }

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
        return
      }

      if (e.key !== 'Tab') return

      const focusable = modalRef.current?.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      )

      if (!focusable || focusable.length === 0) return

      const first = focusable[0] as HTMLElement
      const last = focusable[focusable.length - 1] as HTMLElement

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      }

      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    requestAnimationFrame(() => {
      const closeButton = modalRef.current?.querySelector(
        'button[aria-label="Close team profile"]'
      ) as HTMLElement | null
      closeButton?.focus()
    })

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeMember, closeModal])

  if (members.length === 0) {
    return (
      <div className="rounded-2xl border border-neutral-100 bg-neutral-50 py-20 text-center">
        <p className="font-body text-lg text-neutral-500">
          No team members found for {selectedCategory !== 'All' ? `"${selectedCategory}"` : 'this category'}.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {members.map((member, idx) => (
            <motion.button
              key={member.id}
              type="button"
              layout
              initial={prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4, ease: 'easeOut', delay: idx * 0.05 }}
              className="group flex flex-col overflow-hidden rounded-2xl text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/20"
              onClick={(e) => {
                triggerRef.current = e.currentTarget
                setActiveMemberId(member.id)
              }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-xl border-x border-t border-neutral-100 bg-neutral-100/50 shadow-sm">
                {member.headshot ? (
                  <ImageWithFallback
                    src={member.headshot}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                    placeholderColor="bg-neutral-100"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-brand-blue-light text-4xl font-bold text-brand-blue">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col rounded-b-2xl border-x border-b border-neutral-100 bg-white p-5 shadow-card transition-shadow duration-300 group-hover:border-brand-blue/20 group-hover:shadow-card-hover md:p-6">
                <span className="mb-3 w-fit rounded-md bg-brand-blue-light/50 px-2.5 py-1 text-xs font-semibold text-brand-blue">
                  {member.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-neutral-900 transition-colors group-hover:text-brand-blue md:text-xl">
                  {member.name}
                </h3>
                <p className="mt-1 font-body text-sm font-medium text-neutral-500">
                  {member.title}
                </p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand-blue">
                  View profile
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`team-member-${activeMember.id}-name`}
            className="fixed inset-0 z-[100] bg-brand-navy/75 p-4 backdrop-blur-sm md:p-6"
            onClick={closeModal}
          >
            <motion.div
              ref={modalRef}
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.24, ease: 'easeOut' }}
              className="relative mx-auto flex h-full max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-neutral-700 shadow-sm transition-colors hover:bg-white hover:text-brand-blue"
                aria-label="Close team profile"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="min-h-0 overflow-y-auto px-6 py-8 md:px-10 md:py-10">
                  <span className="inline-flex rounded-full bg-brand-blue-light/50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-blue">
                    {activeMember.category}
                  </span>
                  <h3
                    id={`team-member-${activeMember.id}-name`}
                    className="mt-4 font-heading text-3xl font-bold text-brand-navy md:text-4xl"
                  >
                    {activeMember.name}
                  </h3>
                  <p className="mt-2 font-body text-lg font-medium text-neutral-500">
                    {activeMember.title}
                  </p>

                  <div className="mt-8 border-t border-neutral-100 pt-6">
                    {activeMember.bio ? (
                      <div className="prose prose-neutral max-w-none font-body prose-headings:font-heading prose-p:leading-relaxed prose-a:text-brand-blue">
                        <TinaMarkdown content={activeMember.bio} />
                      </div>
                    ) : (
                      <p className="font-body leading-relaxed text-neutral-600">
                        More about {activeMember.name} will be added here soon.
                      </p>
                    )}
                  </div>

                  {getSocialLinks(activeMember).length > 0 && (
                    <div className="mt-8 border-t border-neutral-100 pt-6">
                      <p className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
                        Connect
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {getSocialLinks(activeMember).map((link) => (
                          <a
                            key={link.label}
                            href={normaliseExternalUrl(link.href)}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
                          >
                            {link.label}
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
