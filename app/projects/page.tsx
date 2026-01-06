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
