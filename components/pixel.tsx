"use client";

import { PIXEL_PROJECTS } from "@/constants/constant";
import { useMemo } from "react";

type PixelProps = {
  active: boolean;
  delay: number;
  index: number;
};

export default function Pixel({ active, delay, index }: PixelProps) {
  const project = useMemo(
    () => PIXEL_PROJECTS[index % PIXEL_PROJECTS.length],
    [index]
  );

  if (!active) {
    return (
      <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-5 md:h-5 rounded-[1px]" />
    );
  }

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative w-2 h-2 sm:w-3 sm:h-3 md:h-5 md:w-5 bg-neutral-800 rounded-[1px] cursor-pointer z-10 hover:z-50"
      style={{
        animation: `fadeIn 0.5s ease-out forwards`,
        animationDelay: `${delay * 30}ms`,
        opacity: 0,
        transform: "scale(0.8)",
      }}
    >
      <img
        src={project.logo}
        alt=""
        className="w-full h-full object-cover rounded-[1px] opacity-80 group-hover:opacity-100 group-hover:scale-150 transition-all duration-200"
      />

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-white/20 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
        {project.url.split("/").pop()}
      </div>
    </a>
  );
}
