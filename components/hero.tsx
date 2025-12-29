"use client";

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

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

      <div>
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
      </div>
    </div>
  );
}
