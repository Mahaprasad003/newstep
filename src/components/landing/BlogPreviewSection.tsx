import Link from 'next/link'
import SectionHeading from '@/components/ui/SectionHeading'
import AnimatedSection from '@/components/ui/AnimatedSection'
import BlogCard from '@/components/blog/BlogCard'
import { getAllPosts } from '@/lib/tina'

export default async function BlogPreviewSection() {
  const allPosts = await getAllPosts()
  // Pull only the latest 3 posts for the preview
  const recentPosts = allPosts.slice(0, 3)

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatedSection>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <SectionHeading 
              title="Career Insights" 
              subtitle="Latest advice and articles from our expert counsellors"
            />
            <Link 
              href="/blog"
              className="hidden md:inline-flex items-center text-brand-blue font-heading font-semibold hover:text-brand-blue-dark transition-colors mb-16"
            >
              View All Articles <span className="ml-2">→</span>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, idx) => (
            <AnimatedSection key={post.slug} delay={idx * 0.1}>
              <BlogCard {...post} />
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-blue-light text-brand-blue font-heading font-semibold w-full"
          >
            View All Articles
          </Link>
        </div>

      </div>
    </section>
  )
}
