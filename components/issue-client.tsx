"use client";
import { FILTER_STYLES, filters } from "@/constants/constant";
import { AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import IssueCard from "./issue-card";
import { useInView } from "react-intersection-observer";
import fetchPaginatedIssues from "@/utils/fetchIssuesPage";

export default function IssueClient() {
  const { ref, inView } = useInView();

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [issues, setIssues]: any = useState([]);
  const [nextCursor, setNextCursor] = useState("");
  const [issueCount, setIssueCount] = useState("");

  async function loadIssues(nextCursor?: string) {
    try {
      const data = await fetchPaginatedIssues(nextCursor);

      setIssues((prev: any) => [...prev, ...data.result]);
      setNextCursor(data.cursor);
      setIssueCount(data.issueCount.toString());
    } catch (e) {
      console.error("Failed to load issues", e);
    }
  }

  useEffect(() => {
    loadIssues();
  }, []);

  console.log("iii", issueCount);

  useEffect(() => {
    if (inView && nextCursor) {
      loadIssues(nextCursor);
    }
  }, [inView, nextCursor]);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue: any) => {
      const matchesSearch = issue.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        issue.labels.some((label: string) =>
          label.toLowerCase().includes(activeFilter.toLowerCase())
        );
      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, searchQuery, issues]);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Open Issues</h1>
        <p className="text-gray-400 mb-2">
          Best Beginner Friendly issues for you to contribute
        </p>

        {issues.length > 0 && (
          <p className="text-orange-500 font-mono mt-2 mb-8">
            found {issueCount} open issues
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
          <div className="relative w-full lg:w-96 group">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-500 group-focus-within:text-orange-500 transition-colors" />
            </div>
            <input
              type="text"
              value={searchQuery}
              placeholder="Search issues..."
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full p-3 pl-10 text-sm text-white border border-white/10 rounded-xl bg-neutral-900 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 outline-none transition-all"
            />
          </div>

          {/* Filters  */}
          <div className="flex flex-wrap gap-2 items-center">
            <SlidersHorizontal className="w-4 h-4 text-gray-500 mr-2" />
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                  activeFilter === filter.value
                    ? `${
                        FILTER_STYLES[filter.value]
                      } bg-opacity-20 border-opacity-50 shadow-[0_0_10px_rgba(0,0,0,0.5)]`
                    : "bg-white/5 border-white/5 text-gray-500 hover:text-gray-300 hover:bg-white/10"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredIssues.map((issue: any) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </AnimatePresence>
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-20 border border-dashed border-white/10 rounded-xl bg-white/5">
          <p className="text-gray-500">
            No issues found matching your criteria.
          </p>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSearchQuery("");
            }}
            className="mt-4 cursor-pointer text-orange-500 hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}

      <div ref={ref} className="mt-8 flex justify-center items-center">
        <div className="flex gap-2">
          <span className="h-4 w-4 rounded-full bg-orange-300 animate-bounce [animation-delay:0ms]" />
          <span className="h-4 w-4 rounded-full bg-orange-400 animate-bounce [animation-delay:150ms]" />
          <span className="h-4 w-4 rounded-full bg-orange-500 animate-bounce [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
