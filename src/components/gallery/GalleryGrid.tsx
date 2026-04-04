'use client'

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { GalleryImage } from '@/lib/tina'
import { cn } from '@/lib/utils'

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const lightboxRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const categories = useMemo(() => {
    const cats = new Set(images.map(img => img.category))
    return ['All', ...Array.from(cats)].sort()
  }, [images])

  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return images
    return images.filter(img => img.category === selectedCategory)
  }, [images, selectedCategory])

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null)
  }, [])

  const nextImage = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! === filteredImages.length - 1 ? 0 : prev! + 1))
    }
  }, [activeLightboxIndex, filteredImages.length])

  const prevImage = useCallback(() => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((prev) => (prev! === 0 ? filteredImages.length - 1 : prev! - 1))
    }
  }, [activeLightboxIndex, filteredImages.length])

  useEffect(() => {
    if (activeLightboxIndex === null) {
      document.body.style.overflow = 'unset'
      if (triggerRef.current) {
        triggerRef.current.focus()
      }
      return
    }

    document.body.style.overflow = 'hidden'

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()

      if (e.key === 'Tab') {
        const focusable = lightboxRef.current?.querySelectorAll(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        )
        if (!focusable || focusable.length === 0) return

        const first = focusable[0] as HTMLElement
        const last = focusable[focusable.length - 1] as HTMLElement

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    requestAnimationFrame(() => {
      const closeBtn = lightboxRef.current?.querySelector('button[aria-label="Close Lightbox"]') as HTMLElement
      closeBtn?.focus()
    })

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeLightboxIndex, closeLightbox, nextImage, prevImage])

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={cn(
              "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
              selectedCategory === cat
                ? "bg-brand-blue text-white shadow-md scale-105"
                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-20 text-neutral-500 font-body">No images found for this category.</div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => {
              const aspectRatioClass = 
                image.aspectRatio === 'portrait' ? 'aspect-[3/4]' : 
                image.aspectRatio === 'landscape' ? 'aspect-[4/3]' : 'aspect-square'

              return (
                <motion.div
                  key={image.id}
                  layout
                  initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.4 }}
                  className="break-inside-avoid mb-6 relative group cursor-pointer overflow-hidden rounded-2xl bg-neutral-100 shadow-sm"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${image.alt} in lightbox`}
                  onClick={() => {
                    triggerRef.current = null
                    setActiveLightboxIndex(index)
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      triggerRef.current = e.currentTarget as unknown as HTMLButtonElement
                      setActiveLightboxIndex(index)
                    }
                  }}
                >
                  <div className={cn("relative w-full overflow-hidden", aspectRatioClass)}>
                    <ImageWithFallback 
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      unoptimized
                      placeholderColor="bg-neutral-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <p className="text-white font-heading font-semibold text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        {image.alt}
                      </p>
                      <span className="text-white/80 text-sm font-body mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 inline-flex items-center">
                        <Expand className="w-4 h-4 mr-2" />
                        View Full Image
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
            onClick={closeLightbox}
          >
            <div className="absolute top-6 right-6 z-[110] flex gap-4">
              <span
                className="text-white/50 font-body text-sm self-center hidden sm:block"
                aria-live="polite"
                aria-atomic="true"
              >
                {activeLightboxIndex + 1} / {filteredImages.length}
              </span>
              <button 
                onClick={closeLightbox}
                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-[110] hidden md:flex"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <motion.div 
              key={activeLightboxIndex}
              initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { x: -20, opacity: 0 }}
              transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.2 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] flex flex-col justify-center items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <ImageWithFallback
                  src={filteredImages[activeLightboxIndex].src}
                  alt={filteredImages[activeLightboxIndex].alt}
                  fill
                  className="object-contain"
                  unoptimized
                  priority
                  placeholderColor="bg-black"
                />
              </div>
              <p className="absolute -bottom-8 text-center text-white/80 font-body text-base w-full">
                {filteredImages[activeLightboxIndex].alt}
              </p>
            </motion.div>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-[110] hidden md:flex"
              aria-label="Next Image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}