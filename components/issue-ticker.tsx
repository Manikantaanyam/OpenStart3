"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import formatTimeAgo from "@/utils/format-time";

export default function IssueTicker({
  initialIssues,
}: {
  initialIssues: any[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!initialIssues.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % initialIssues.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [initialIssues.length]);

  const currentIssue = initialIssues[currentIndex];
  const nextIssue = initialIssues[(currentIndex + 1) % initialIssues.length];

  if (!initialIssues.length) return null;

  return (
    <div className="w-full bg-black/80 backdrop-blur-md border-b border-white/5 h-14 flex items-center overflow-hidden z-40 relative">
      <div className="container mx-auto px-4 flex items-center gap-6">
        <div className="hidden md:flex items-center gap-2 text-orange-500 text-xs font-bold uppercase tracking-widest whitespace-nowrap">
          <Activity className="w-4 h-4" />
          <span>Live</span>
        </div>

        <div className="flex-1 flex items-center gap-6 overflow-hidden">
          {/* Next Preview */}
          <div className="hidden md:flex items-center gap-2 opacity-50 scale-95 select-none grayscale transition-all duration-500 max-w-50 truncate">
            <span className="text-[10px] uppercase text-gray-400">
              Up Next:
            </span>
            <img
              src={nextIssue?.project?.avatar_url}
              alt=""
              className="w-4 h-4 rounded-full"
            />
            <span className="text-xs text-gray-500 truncate">
              {nextIssue?.title}
            </span>
          </div>

          {/* Active Issue */}
          <div className="flex-1 relative h-10">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentIssue.id}
                initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute inset-0 flex items-center cursor-pointer group"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="h-6 w-1 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                  <img
                    src={currentIssue.project?.avatar_url}
                    alt=""
                    className="w-6 h-6 rounded-md border border-white/10"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-gray-100 group-hover:text-orange-400 transition-colors truncate">
                      {currentIssue.title.length > 100
                        ? currentIssue.title.substring(0, 60) + "..."
                        : currentIssue.title}
                    </span>
                    <span className="text-[10px] text-gray-500 bg-white/5 px-1.5 rounded hidden sm:inline-block">
                      {formatTimeAgo(currentIssue.created_at)}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
