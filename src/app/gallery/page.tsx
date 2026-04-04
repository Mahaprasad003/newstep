import type { Metadata } from 'next'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import GalleryGrid from '@/components/gallery/GalleryGrid'
import GallerySkeleton from '@/components/gallery/GallerySkeleton'
import { getAllGalleryImages } from '@/lib/tina'

export const metadata: Metadata = {
  title: 'Our Gallery',
  description:
    'Photos from our events, workshops, and student success celebrations.',
}

export default async function GalleryPage() {
  const images = await getAllGalleryImages()

  return (
    <>
      {/* Hero Header */}
      <div className="bg-brand-blue-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <AnimatedSection>
            <nav className="text-sm font-body text-brand-blue mb-4 flex justify-center items-center">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2 text-brand-blue/50">/</span>
              <span className="text-brand-navy">Gallery</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-brand-navy mb-6">
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl font-body text-brand-navy/80 max-w-2xl mx-auto">
              Visual snapshots from our seminars, interactive workshops, and moments of student achievement.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Masonry Container */}
      <section className="bg-white py-16 md:py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {images.length === 0 ? (
            <GallerySkeleton />
          ) : (
            <GalleryGrid images={images} />
          )}
        </div>
      </section>
    </>
  )
}