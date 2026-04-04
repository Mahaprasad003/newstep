export default function GallerySkeleton() {
  const aspectRatios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/3]']
  
  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="px-6 py-2.5 rounded-full bg-neutral-200 animate-pulse w-24"
          />
        ))}
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`break-inside-avoid mb-6 rounded-2xl overflow-hidden bg-neutral-200 animate-pulse ${aspectRatios[i % 3]}`}
          />
        ))}
      </div>
    </>
  )
}