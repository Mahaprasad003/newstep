'use client'

import { cn } from '@/lib/utils'

interface CategorySidebarProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (category: string) => void
  postCounts: Record<string, number>
  allLabel?: string
}

export default function CategorySidebar({ categories, selectedCategory, onSelectCategory, postCounts, allLabel = 'All Articles' }: CategorySidebarProps) {
  const totalCount = Object.values(postCounts).reduce((a, b) => a + b, 0)

  return (
    <aside className="md:sticky md:top-28 md:w-[280px] shrink-0 z-10 w-full mb-8 md:mb-0">
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block bg-white shadow-card rounded-2xl p-6">
        <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-4 pb-4 border-b border-neutral-100">
          Browse by Topic
        </h3>
        
        <div className="space-y-1">
          {/* All Articles Generic Filter */}
          <button
            onClick={() => onSelectCategory('All')}
            aria-pressed={selectedCategory === 'All'}
            className={cn(
              "w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 active:scale-[0.98]",
              selectedCategory === 'All' 
                ? "bg-brand-blue text-white font-semibold shadow-sm" 
                : "bg-transparent text-neutral-700 hover:bg-brand-blue-light hover:text-brand-blue"
            )}
          >
            <span>{allLabel}</span>
            <span className={cn(
              "text-xs font-semibold px-2 py-0.5 rounded-full",
              selectedCategory === 'All' ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
            )}>
              {totalCount}
            </span>
          </button>

          {/* Dynamic Categories */}
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onSelectCategory(category)}
              aria-pressed={selectedCategory === category}
              className={cn(
                "w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all duration-200 active:scale-[0.98]",
                selectedCategory === category 
                  ? "bg-brand-blue text-white font-semibold shadow-sm" 
                  : "bg-transparent text-neutral-700 hover:bg-brand-blue-light hover:text-brand-blue"
              )}
            >
              <span className="truncate pr-2">{category}</span>
              <span className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                selectedCategory === category ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"
              )}>
                {postCounts[category]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Horizontal Piller Strip */}
      <div className="md:hidden">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <button
            onClick={() => onSelectCategory('All')}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shrink-0",
              selectedCategory === 'All' ? "bg-brand-blue text-white shadow-sm" : "bg-neutral-100 text-neutral-700 active:bg-neutral-200"
            )}
          >
            {allLabel}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={cn(
                "whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors shrink-0",
                selectedCategory === cat ? "bg-brand-blue text-white shadow-sm" : "bg-neutral-100 text-neutral-700 active:bg-neutral-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

    </aside>
  )
}
