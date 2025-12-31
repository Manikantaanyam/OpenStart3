import ProjectCard from "@/components/project-card";
import ProjectCardSkeleton from "@/components/project-card-skeleton";
import prisma from "@/lib/prisma";
import { Filter } from "lucide-react";

export default async function Projects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      stars: "desc",
    },
  });

  console.log("pro", projects);
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Explore Projects
          </h1>
          <p className="text-gray-400">
            Discover the best open source projects
          </p>
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2  p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-colors">
            <Filter className="w-4 h-4" />
          </button>

          <select className="bg-black border border-white/10 text-gray-300 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block p-2.5">
            <option>Most Stars</option>
            <option>Most Issues</option>
            <option>Recently Active</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects
          ? projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          : [...Array(6)].map((_, i) => <ProjectCardSkeleton key={i} />)}
      </div>
    </div>
  );
}
