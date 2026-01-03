"use client";
import formatTimeAgo from "@/utils/format-time";
import { motion } from "framer-motion";
import { Eye, GitCommit, Star } from "lucide-react";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <motion.div className="group relative rounded-xl bg-neutral-900/50 border border-white/5 p-6 transition-all duration-300 hover:border-white/10 hover:bg-neutral-900">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={project.avatar_url}
              alt={project.display_name}
              className="w-12 h-12 rounded-xl bg-black border border-white/5"
            />
            <div className="absolute -bottom-1 -right-1 bg-neutral-900 rounded-full p-0.5">
              <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-neutral-900" />
            </div>
          </div>

          <div>
            <a
              href={`/projects/issues/${project.full_name}`}
              className="font-bold cursor-pointer text-lg text-white group-hover:text-orange-400 transition-colors"
            >
              {project.display_name}
            </a>
            <p className="text-xs text-gray-500 font-mono">
              {project.full_name}
            </p>
          </div>
        </div>
        <button
          onClick={() => alert("feature not available yet")}
          className="cursor-pointer text-orange-500 p-2 rounded-lg transition-all duration-200 bg-orange-500/10 hover:bg-orange-500/20"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
      <p className="text-sm text-gray-400 mb-6 line-clamp-2 h-10 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6 ">
        {project?.tech_stack.slice(0, 4).map((tag: any) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-medium text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="pt-4 border-t border-dashed border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-300">
            <Star className="w-3.5 h-3.5" />
            <span className="font-mono">{project.stars}</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <GitCommit className="w-3.5 h-3.5" />
            <span className="font-mono">{project.open_issues_count}</span>
          </div>
        </div>
        <span className="text-gray-600">
          {formatTimeAgo(project.last_activity_at)}
        </span>
      </div>
    </motion.div>
  );
}
