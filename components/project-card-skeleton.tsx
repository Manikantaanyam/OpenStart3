export default function ProjectCardSkeleton() {
  return (
    <div className="relative rounded-xl bg-neutral-900/50 border border-white/5 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 animate-pulse" />
          <div className="space-y-2">
            <div className="h-5 w-32 bg-white/10 rounded-md animate-pulse" />
            <div className="h-3 w-24 bg-white/5 rounded-md animate-pulse" />
          </div>
        </div>
        <div className="w-5 h-5 rounded bg-white/5 animate-pulse" />
      </div>

      <div className="space-y-2 mb-6">
        <div className="h-3 w-full bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-4/5 bg-white/5 rounded animate-pulse" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="h-6 w-14 bg-white/5 rounded-md border border-white/5 animate-pulse" />
        <div className="h-6 w-20 bg-white/5 rounded-md border border-white/5 animate-pulse" />
        <div className="h-6 w-16 bg-white/5 rounded-md border border-white/5 animate-pulse" />
      </div>

      <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-4 w-10 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-10 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  );
}
