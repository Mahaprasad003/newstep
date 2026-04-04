import Link from 'next/link'
import ImageWithFallback from '@/components/ui/ImageWithFallback'
import { formatDate } from '@/lib/utils'
import { BlogPostMeta } from '@/lib/tina'

interface BlogCardProps extends BlogPostMeta {
  readTime?: number
}

export default function BlogCard({ slug, title, date, category, excerpt, thumbnail, readTime }: BlogCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="block group h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 h-full flex flex-col flex-grow hover:-translate-y-1 relative">
        
        {/* Thumbnail */}
        <div className="relative w-full aspect-video overflow-hidden shrink-0">
          <div className="absolute inset-0 bg-brand-navy/10 group-hover:bg-transparent transition-colors z-10" />
          <ImageWithFallback 
            src={thumbnail} 
            alt={title}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            unoptimized
            placeholderColor="bg-neutral-100"
          />
          <div className="absolute bottom-3 left-3 z-20">
            <span className="inline-block px-3 py-1 bg-brand-blue text-white text-xs font-semibold rounded-full shadow-sm">
              {category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <p className="text-xs text-neutral-500 font-body mb-3 flex items-center">
            {formatDate(date)} 
            {readTime && (
              <>
                <span className="mx-2">•</span>
                {readTime} min read
              </>
            )}
          </p>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-neutral-900 mb-3 group-hover:text-brand-blue transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-neutral-600 font-body line-clamp-3 mb-6 flex-grow">
            {excerpt}
          </p>
          <span className="mt-auto inline-flex items-center text-brand-blue font-heading font-semibold text-sm group-hover:underline">
            Read More <span className="ml-1 transition-transform group-hover:translate-x-1 no-underline">→</span>
          </span>
        </div>

      </div>
    </Link>
  )
}
