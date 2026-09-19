'use client'

import { TinaMarkdown } from 'tinacms/dist/rich-text'

interface BlogPostBodyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any // Rich-text AST from Tina
}

/**
 * Client component that renders Tina's rich-text AST into styled HTML.
 * The parent page wraps this in a `prose` container for typography styling.
 * 
 * TinaMarkdown automatically generates heading IDs, which our
 * TableOfContents IntersectionObserver picks up seamlessly.
 */
export default function BlogPostBody({ body }: BlogPostBodyProps) {
  if (!body) {
    return <p>This article is currently being drafted. Check back soon!</p>
  }

  return (
    <TinaMarkdown
      content={body}
      components={{
        // CMS images arrive at full size; cap them so a QR code or photo can't
        // stretch across the whole column. Smaller images keep their own size.
        img: (props: { url: string; caption?: string; alt?: string } | undefined) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={props?.url}
            alt={props?.alt ?? ''}
            className="mx-auto max-w-[min(100%,500px)]"
            loading="lazy"
          />
        ),
      }}
    />
  )
}
