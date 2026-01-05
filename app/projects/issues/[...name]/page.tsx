"use client";

import IssueCard2 from "@/components/issue-card-2";
import { AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Project = {
  id: number;
  full_name: string;
  display_name: string;
  description: string | null;
  avatar_url: string | null;
  stars: number;
  tech_stack: string[];
  last_activity_at: string | null;
  last_issue_sync: string | null;
  last_repo_sync: string | null;
  open_issues_count: number;
  createdAt: string;
  updatedAt: string;
};

export default function ProjectIssues() {
  const [issues, setIssues] = useState<any[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const params: any = useParams();
  const repoName = params.name.join("/");

  useEffect(() => {
    async function loadIssues(repoName: string) {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/project/issues?repoName=${repoName}`
        );
        const data = await response.json();
        setIssues(data.project.issues);
        setProject(data.project);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadIssues(repoName);
  }, []);

  console.log("llllllllll", issues.length);

  if (issues.length == 0) {
    return <div>Loading....</div>;
  }

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="mb-10">
          <div className="flex gap-3 cursor-pointer">
            <img
              src={project?.avatar_url || ""}
              alt={project?.full_name}
              className="w-12 h-12 rounded-xl"
            />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`https://github.com/${project?.full_name}`}
              className="text-4xl font-bold text-white mb-2  hover:text-orange-500"
            >
              {project?.display_name}
            </a>
          </div>
          <p className="text-gray-400 mb-8">{project?.description}</p>
        </div>

        <div className="space-y-4">
          {loading ? (
            <p className="text-gray-500">Loading issues...</p>
          ) : (
            <AnimatePresence mode="popLayout">
              {issues.map((issue) => (
                <IssueCard2 key={issue.id} issue={issue} project={project} />
              ))}
            </AnimatePresence>
          )}

          {!loading && issues.length === 0 && (
            <p className="text-gray-500">
              No issues found for this repository.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
