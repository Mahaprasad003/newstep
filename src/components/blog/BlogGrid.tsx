'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import BlogCard from '@/components/blog/BlogCard'
import { BlogPostMeta } from '@/lib/tina'

interface BlogGridProps {
  posts: BlogPostMeta[]
  selectedCategory: string
}

export default function BlogGrid({ posts, selectedCategory }: BlogGridProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1, 
      y: 0,
      transition: { delay: prefersReducedMotion ? 0 : i * 0.08, duration: prefersReducedMotion ? 0.01 : 0.4 }
    }),
    exit: { opacity: 0, y: -10, transition: { duration: prefersReducedMotion ? 0.01 : 0.2 } }
  }

  if (posts.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-12 bg-neutral-50 rounded-2xl border border-neutral-100 min-h-[400px]">
        <div className="text-4xl mb-4">📭</div>
        <h3 className="text-lg font-heading font-semibold text-neutral-900 mb-2">
          No articles found
        </h3>
        <p className="text-neutral-500 font-body text-center">
          We haven&apos;t published anything under &quot;{selectedCategory}&quot; yet.<br/> Check back soon!
        </p>
      </div>
    )
  }

  return (
    <motion.div 
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
    >
      <AnimatePresence mode="popLayout">
        {posts.map((post, index) => (
          <motion.div
            key={post.slug}
            layout
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={index}
          >
            <BlogCard {...post} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
