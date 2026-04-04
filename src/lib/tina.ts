/**
 * Tina CMS Data Fetching Layer
 * 
 * This module abstracts all TinaCMS GraphQL queries behind clean async functions.
 * It normalises the CMS response shapes into the simple prop interfaces our
 * existing components already consume, so BlogCard, BlogGrid, and GalleryGrid
 * require ZERO changes to their internal rendering logic.
 * 
 * Architecture decision: we query locally via the generated client when running
 * `tinacms dev`, and via TinaCloud when deployed. The client handles this
 * transparently based on environment.
 */

import client from '../../tina/__generated__/client'

// ──────────────────────────────────────────────
// SHARED TYPES (consumed by components)
// ──────────────────────────────────────────────

export type BlogPostMeta = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  thumbnail: string
}

export type GalleryImage = {
  id: string
  src: string
  alt: string
  category: string
  aspectRatio: 'portrait' | 'landscape' | 'square'
}

// ──────────────────────────────────────────────
// BLOG QUERIES
// ──────────────────────────────────────────────

/**
 * Fetch all blog posts (metadata only, no body).
 * Sorted by date descending. Used for listing pages & preview sections.
 */
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const response = await client.queries.postConnection({
    sort: 'date',
    last: 50, // reverse sort to get newest first
  })

  const posts: BlogPostMeta[] = (response.data.postConnection.edges ?? [])
    .map((edge) => {
      const node = edge?.node
      if (!node) return null
      return {
        slug: node._sys.filename,
        title: node.title,
        date: node.date ?? '',
        category: node.category ?? 'General',
        excerpt: node.excerpt ?? '',
        thumbnail: node.thumbnail ?? '',
      }
    })
    .filter(Boolean) as BlogPostMeta[]

  // Sort newest first (TinaCMS sort can be unreliable for datetime)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

/**
 * Fetch a single blog post by its filename slug.
 * Returns the full post including the rich-text body AST for TinaMarkdown.
 */
export async function getPostBySlug(slug: string) {
  try {
    const response = await client.queries.post({
      relativePath: `${slug}.mdx`,
    })
    
    const post = response.data.post
    
    return {
      meta: {
        slug: post._sys.filename,
        title: post.title,
        date: post.date ?? '',
        category: post.category ?? 'General',
        excerpt: post.excerpt ?? '',
        thumbnail: post.thumbnail ?? '',
      } as BlogPostMeta,
      body: post.body,       // Rich-text AST for <TinaMarkdown>
      query: response.query,  // For visual editing
      variables: response.variables,
      data: response.data,
    }
  } catch {
    return null
  }
}

/**
 * Generate static params for all blog posts.
 */
export async function getAllPostSlugs(): Promise<{ slug: string }[]> {
  const response = await client.queries.postConnection()
  return (response.data.postConnection.edges ?? [])
    .map((edge) => ({
      slug: edge?.node?._sys.filename ?? '',
    }))
    .filter((p) => p.slug !== '')
}

// ──────────────────────────────────────────────
// GALLERY QUERIES
// ──────────────────────────────────────────────

/**
 * Fetch all gallery images. Each JSON in content/gallery/ = one image.
 */
export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const response = await client.queries.galleryConnection({
    last: 100,
  })

  return (response.data.galleryConnection.edges ?? [])
    .map((edge) => {
      const node = edge?.node
      if (!node) return null
      return {
        id: node._sys.filename,
        src: node.src ?? '',
        alt: node.alt ?? '',
        category: node.category ?? 'Events',
        aspectRatio: (node.aspectRatio as 'portrait' | 'landscape' | 'square') ?? 'landscape',
      }
    })
    .filter(Boolean) as GalleryImage[]
}

// ──────────────────────────────────────────────
// TEAM QUERIES
// ──────────────────────────────────────────────

export type TeamMember = {
  id: string
  name: string
  title: string
  category: string
  headshot: string
  order: number
}

/**
 * Fetch all team members.
 */
export async function getAllTeamMembers(): Promise<TeamMember[]> {
  try {
    const response = await client.queries.teamConnection({
      last: 100,
    })

    const members = (response.data.teamConnection.edges ?? [])
      .map((edge) => {
        const node = edge?.node
        if (!node) return null
        return {
          id: node._sys.filename,
          name: node.name ?? '',
          title: node.title ?? '',
          category: node.category ?? '',
          headshot: node.headshot ?? '',
          order: node.order ?? 999,
        }
      })
      .filter(Boolean) as TeamMember[]

    members.sort((a, b) => a.order - b.order)
    return members
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

// ──────────────────────────────────────────────
// SETTINGS QUERIES
// ──────────────────────────────────────────────

export type SiteSettings = {
  tagline: string
  heroSubtext: string
  phone: string
  email: string
  whatsapp: string
  address: string
  socials: {
    instagram: string
    linkedin: string
    twitter: string
    facebook: string
  }
  stats: {
    value: string
    label: string
  }[]
}

/**
 * Fetch global site settings.
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const response = await client.queries.settings({
      relativePath: 'site.json',
    })
    
    const data = response.data.settings
    
    return {
      tagline: data.tagline ?? '',
      heroSubtext: data.heroSubtext ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      whatsapp: data.whatsapp ?? '',
      address: data.address ?? '',
      socials: {
        instagram: data.socials?.instagram ?? '',
        linkedin: data.socials?.linkedin ?? '',
        twitter: data.socials?.twitter ?? '',
        facebook: data.socials?.facebook ?? '',
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      stats: (data.stats ?? []).map((s: any) => ({
        value: s?.value ?? '',
        label: s?.label ?? '',
      })),
    }
  } catch (error) {
    console.error("Error fetching site settings:", error)
    return null
  }
}

// ──────────────────────────────────────────────
// TESTIMONIALS QUERIES
// ──────────────────────────────────────────────

export type Testimonial = {
  name: string
  role: string
  quote: string
  rating: number
  avatar: string
}

/**
 * Fetch global testimonials list.
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await client.queries.testimonials({
      relativePath: 'testimonials.json',
    })
    
    const data = response.data.testimonials
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data.testimonials ?? []).map((t: any) => ({
      name: t?.name ?? '',
      role: t?.role ?? '',
      quote: t?.quote ?? '',
      rating: t?.rating ?? 5,
      avatar: t?.avatar ?? '',
    }))
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return []
  }
}
