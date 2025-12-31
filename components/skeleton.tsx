"use client";

export default function IssueTickerSkeleton() {
  return (
    <div className="w-full bg-black/80 backdrop-blur-md border-b border-white/5 h-14 flex items-center overflow-hidden z-40 relative">
      <div className="container mx-auto px-4 flex items-center gap-6">
        {/* Skeleton Label (Live Icon) */}
        <div className="hidden md:flex items-center gap-2 opacity-20">
          <div className="w-4 h-4 rounded-full bg-orange-500/50 animate-pulse" />
          <div className="w-8 h-3 bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex items-center gap-6 overflow-hidden">
          {/* Skeleton Next Preview (Left side) */}
          <div className="hidden md:flex items-center gap-2 opacity-30">
            <div className="w-12 h-2 bg-gray-800 rounded" />
            <div className="w-4 h-4 rounded-full bg-gray-800" />
            <div className="w-24 h-2 bg-gray-800 rounded" />
          </div>

          {/* Active Issue Skeleton (Center) */}
          <div className="flex-1 relative h-10 flex items-center">
            <div className="flex items-center gap-3 w-full animate-pulse">
              {/* Vertical Orange Accent */}
              <div className="h-6 w-1 bg-orange-500/30 rounded-full" />

              {/* Avatar Box */}
              <div className="w-6 h-6 rounded-md bg-gray-800 relative overflow-hidden">
                <ShimmerOverlay />
              </div>

              {/* Text Blocks */}
              <div className="flex flex-col gap-1.5">
                <div className="h-3 w-48 md:w-64 bg-gray-800 rounded relative overflow-hidden">
                  <ShimmerOverlay />
                </div>
                <div className="h-2 w-12 bg-gray-900 rounded" />
              </div>

              {/* Arrow placeholder */}
              <div className="ml-auto w-4 h-4 bg-gray-800 rounded opacity-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShimmerOverlay() {
  return (
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
  );
}
