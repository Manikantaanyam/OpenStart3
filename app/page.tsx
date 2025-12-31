"use client";

import Navbar from "@/components/navbar";
import Hero from "../components/hero";
import IssueTicker from "@/components/issue-ticker";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <IssueTicker />
      <Hero />
    </div>
  );
}
