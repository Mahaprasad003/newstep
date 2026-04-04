export default function BlogSkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
      <div className="relative w-full aspect-video bg-neutral-200" />
      <div className="p-6 space-y-4">
        <div className="h-3 bg-neutral-200 rounded w-24" />
        <div className="space-y-2">
          <div className="h-5 bg-neutral-200 rounded w-full" />
          <div className="h-5 bg-neutral-200 rounded w-3/4" />
        </div>
        <div className="space-y-2">
          <div className="h-3 bg-neutral-200 rounded w-full" />
          <div className="h-3 bg-neutral-200 rounded w-full" />
          <div className="h-3 bg-neutral-200 rounded w-2/3" />
        </div>
        <div className="h-4 bg-neutral-200 rounded w-28 mt-4" />
      </div>
    </div>
  )
}