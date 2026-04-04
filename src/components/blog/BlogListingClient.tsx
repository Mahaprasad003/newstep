'use client'

import { useState, useMemo } from 'react'
import CategorySidebar from '@/components/blog/CategorySidebar'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogSkeletonCard from '@/components/blog/BlogSkeletonCard'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { BlogPostMeta } from '@/lib/tina'
import Link from 'next/link'

interface BlogListingClientProps {
  posts: BlogPostMeta[]
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const { categories, postCounts } = useMemo(() => {
    const counts: Record<string, number> = {}
    posts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1
    })
    return {
      categories: Object.keys(counts).sort(),
      postCounts: counts
    }
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return posts
    return posts.filter(post => post.category === selectedCategory)
  }, [posts, selectedCategory])

  const isLoading = posts.length === 0

  return (
    <>
      {/* Page Header */}
      <div className="bg-brand-blue-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <AnimatedSection>
            <nav className="text-sm font-body text-brand-blue mb-4">
              <Link href="/" className="hover:underline">Home</Link>
              <span className="mx-2 text-brand-blue/50">/</span>
              <span className="text-brand-navy">Blog</span>
            </nav>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-brand-navy mb-6">
              Career Insights & Advice
            </h1>
            <p className="text-lg md:text-xl font-body text-brand-navy/80 max-w-2xl mx-auto">
              Expert career advice, counselling tips, and student success stories to help guide your journey.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-10">
            
            <CategorySidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              postCounts={postCounts}
            />

            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <BlogSkeletonCard key={i} />
                  ))}
                </div>
              ) : (
                <BlogGrid 
                  posts={filteredPosts} 
                  selectedCategory={selectedCategory} 
                />
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}