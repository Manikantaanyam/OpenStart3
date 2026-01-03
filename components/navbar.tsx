"use client";

import { NAV_ITEMS } from "@/constants/constant";
import { Github, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center">
            <Github className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            OpenStart
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.path === "/"
                ? pathName === "/"
                : pathName.startsWith(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
                ${
                  isActive
                    ? "bg-white/10 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } `}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* Right side Actions */}
        <div className="flex items-center gap-2">
          <button className="group relative hidden sm:flex  items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors ">
            <div className="absolute inset-0 -z-10 bg-linear-to-r from-orange-500/20 to-purple-500/20  opacity-0 group-hover:opacity-100 blur-lg transition-opacity" />
            <Search className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              Search...
            </span>
            <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-white/5 px-1.5 font-mono text-[10px] font-medium text-gray-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 cursor-pointer"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black p-4">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathName === "/"
                  : pathName.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors
                                    ${
                                      isActive
                                        ? "bg-orange-500/20 text-orange-500"
                                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    } `}
                >
                  {item.name}
                </Link>
              );
            })}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white"
            >
              <Search className="w-4 h-4" />
              Search Issues...
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
