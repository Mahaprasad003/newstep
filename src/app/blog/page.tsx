import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/tina'
import BlogListingClient from '@/components/blog/BlogListingClient'

export const metadata: Metadata = {
  title: 'Career Insights & Advice',
  description:
    'Expert career advice, counselling tips, and student success stories from Newstep Careers.',
}

export default async function BlogListingPage() {
  const posts = await getAllPosts()

  return <BlogListingClient posts={posts} />
}
