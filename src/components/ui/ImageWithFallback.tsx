'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
  placeholderColor?: string
}

export default function ImageWithFallback({
  src,
  fallbackSrc,
  placeholderColor = 'bg-neutral-200',
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const currentSrc = hasError && fallbackSrc ? fallbackSrc : src

  return (
    <div className="relative w-full h-full">
      {isLoading && !hasError && (
        <div className={cn('absolute inset-0 animate-pulse', placeholderColor)} />
      )}
      <Image
        src={currentSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
        {...props}
      />
    </div>
  )
}