"use client";

import { PIXEL_LETTERS } from "@/constants/constant";
import Pixel from "./pixel";
import React from "react";

interface LetterGridProps {
  letter: string;
  offset?: number;
  globalIndexOffset: number;
}

function LetterGrid({
  letter,
  offset = 0,
  globalIndexOffset,
}: LetterGridProps) {
  const grid = PIXEL_LETTERS[letter] || PIXEL_LETTERS["O"];
  return (
    <div className="flex flex-col gap-[2px] sm:gap-1">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-[2px] sm:gap-1">
          {row.map((cell, colIndex) => {
            const cellIndex = globalIndexOffset + (rowIndex * 5 + colIndex);
            return (
              <Pixel
                key={`${rowIndex}- ${colIndex}`}
                active={cell === 1}
                delay={offset + (rowIndex * 5 + colIndex)}
                index={cellIndex}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default React.memo(LetterGrid);
