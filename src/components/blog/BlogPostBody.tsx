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

  return <TinaMarkdown content={body} />
}
