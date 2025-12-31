import formatTimeAgo from "@/utils/format-time";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export default function IssueCard({ issue }: { issue: any }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative bg-neutral-900/40 border border-white/5 rounded-xl p-5 group overflow-hidden transition-all duration-300 hover:bg-neutral-900"
    >
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-orange-500/50 to-red-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_15px_rgba(249,115,22,0.5)]" />

      <div className="flex flex-col md:flex-row gap-4 pl-2">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <img
                className="w-4 h-4 rounded-full grayscale group-hover:grayscale-0 transition-all"
                src={issue.project.avatar_url}
                alt={issue.project.full_name}
              />
              <span className="font-medium text-gray-300">
                {issue.project.full_name}
              </span>
              <span className="text-gray-600">#{issue.number}</span>
            </div>
            <span className="text-[10px] text-gray-600">•</span>
            <span className="text-[10px] text-gray-500">
              {formatTimeAgo(issue.created_at)}
            </span>
          </div>
          <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-orange-400 transition-colors cursor-pointer leading-snug">
            {issue.title}
          </h3>

          <div className="flex flex-wrap gap-2">
            {issue.labels.map((label: any, idx: any) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md text-[10px] font-medium bg-white/5 border border-white/10 text-gray-400 group-hover:border-white/20 transition-colors"
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 min-w-30 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-4">
          <a
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold rounded-lg transition-colors w-full justify-center border border-white/5 group-hover:border-white/10"
            href={`https://github.com/${issue.project.full_name}/issues/${issue.number}`}
          >
            View Issue
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
