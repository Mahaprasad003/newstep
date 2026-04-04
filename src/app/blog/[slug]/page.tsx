import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import Link from 'next/link'
import { getAllPosts, getAllPostSlugs, getPostBySlug } from '@/lib/tina'
import { formatDate, calculateReadTime } from '@/lib/utils'
import TableOfContents from '@/components/blog/TableOfContents'
import BlogCard from '@/components/blog/BlogCard'
import SectionHeading from '@/components/ui/SectionHeading'
import BlogPostBody from '@/components/blog/BlogPostBody'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return await getAllPostSlugs()
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const result = await getPostBySlug(params.slug)

  if (!result) {
    return {
      title: 'Post Not Found',
    }
  }

  const { meta: post } = result

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Newstep Careers`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Newstep Careers'],
      images: post.thumbnail
        ? [{ url: post.thumbnail, width: 1200, height: 630, alt: post.title }]
        : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const result = await getPostBySlug(params.slug)
  
  if (!result) {
    notFound()
  }

  const { meta: post, body } = result

  const readTime = calculateReadTime(post.excerpt.repeat(8))

  const allPosts = await getAllPosts()
  
  let relatedPosts = allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3)

  if (relatedPosts.length < 3) {
    const padItems = allPosts
      .filter(p => p.slug !== post.slug && !relatedPosts.find(r => r.slug === p.slug))
      .slice(0, 3 - relatedPosts.length)
    relatedPosts = [...relatedPosts, ...padItems]
  }

  return (
    <article className="bg-white min-h-screen">
      
      <AnimatedSection className="relative w-full h-[40vh] min-h-[400px]">
        {post.thumbnail && (
          <ImageWithFallback 
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
            priority
            placeholderColor="bg-brand-navy"
          />
        )}
        <div className="absolute inset-0 bg-brand-navy/60" />
        
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
            <span className="inline-block px-4 py-1.5 bg-brand-blue text-white text-sm font-semibold rounded-full shadow-sm mb-6">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-lg">
              {post.title}
            </h1>
            <div className="flex items-center text-white/90 text-sm md:text-base font-body space-x-4">
              <span>By Newstep Careers</span>
              <span>•</span>
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        <AnimatedSection>
          <nav className="text-sm font-body text-brand-blue mb-12">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2 text-brand-blue/50">/</span>
            <Link href="/blog" className="hover:underline">Blog</Link>
            <span className="mx-2 text-brand-blue/50">/</span>
            <span className="text-neutral-500">{post.title}</span>
          </nav>
        </AnimatedSection>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 relative">
          
          <AnimatedSection className="flex-1 min-w-0 prose prose-lg prose-headings:font-heading prose-headings:text-brand-navy prose-a:text-brand-blue prose-img:rounded-2xl max-w-none">
            <BlogPostBody body={body} />
          </AnimatedSection>

          <AnimatedSection className="w-full md:w-[260px] lg:w-[300px] shrink-0" delay={0.2}>
            <TableOfContents />
          </AnimatedSection>

        </div>
      </div>

      <AnimatedSection className="bg-neutral-50 py-20 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Keep Reading" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {relatedPosts.map(related => (
              <BlogCard key={related.slug} {...related} />
            ))}
          </div>
        </div>
      </AnimatedSection>

    </article>
  )
}