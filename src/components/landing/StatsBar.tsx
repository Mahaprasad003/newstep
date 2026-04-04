'use client'

import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface StatProps {
  value: string
  label: string
}

function CountUpItem({ value, label }: StatProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const [count, setCount] = useState(0)

  const numMatch = value.match(/\d+/)
  const num = numMatch ? parseInt(numMatch[0], 10) : null
  const suffix = numMatch ? value.replace(numMatch[0], '') : value

  useEffect(() => {
    if (isInView && num !== null) {
      let start = 0
      const end = num
      const duration = 2000
      const incrementTime = end > 0 ? Math.abs(Math.floor(duration / end)) : duration

      const timer = setInterval(() => {
        start += 1
        setCount(start)
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        }
      }, incrementTime)

      return () => clearInterval(timer)
    }
  }, [isInView, num])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-6 text-center">
      <div className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
        {num !== null ? `${count}${suffix}` : value}
      </div>
      <div className="text-sm font-body text-white/80 uppercase tracking-wide">
        {label}
      </div>
    </div>
  )
}

export default function StatsBar({ stats = [] }: { stats?: StatProps[] }) {
  const displayStats = stats.length > 0 ? stats : [
    { value: "500+", label: 'Students Guided' },
    { value: "15+", label: 'Years Experience' },
    { value: "95%", label: 'Satisfaction Rate' },
    { value: "30+", label: 'Partner Institutions' },
  ]

  return (
    <AnimatedSection className="bg-brand-blue py-8 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/20">
          {displayStats.map((stat, idx) => (
            <CountUpItem key={idx} {...stat} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}