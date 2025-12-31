"use client";

import { motion } from "framer-motion";
import LetterGrid from "./letter-grid";

export default function Hero() {
  return (
    <div className="relative w-full py-16 md:py-24  lg:py-32 flex flex-col items-center justify-center overflow-hidden">
      <style>
        {`
            @keyframes fadeIn {
              from {opacity: 0; transform: scale(0.5);}
              to {opacity: 1; transform:scale(1);}
            }`}
      </style>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-orange-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div className="flex flex-col items-center gap-6 md:gap-10 z-10 w-full px-2">
        <div className="flex flex-wrap justify-center gap-6 md:gap-16">
          <div className="flex gap-1.5 md:gap-3">
            {["O", "P", "E", "N"].map((char, i) => (
              <LetterGrid
                key={i}
                letter={char}
                offset={i * 8}
                globalIndexOffset={i * 25}
              />
            ))}
          </div>
          <div className="flex gap-1.5 md:gap-3">
            {["S", "O", "U", "R", "C", "E"].map((char, i) => (
              <LetterGrid
                key={i}
                letter={char}
                offset={40 + i * 8}
                globalIndexOffset={100 + i * 25}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 100, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center max-w-2xl px-4 mt-4 md:mt-8"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Start Your{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-500">
              Contribution
            </span>
            Journey
          </h1>
          <p className="text-base md:text-lg text-gray-400 mb-8 leading-relaxed">
            Discover beginner-friendly issues in the world's best open source
            projects. Click a pixel above to explore the project.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/projects"
              className="px-6 py-2.5 md:px-8 md:py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              Explore Projects
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
