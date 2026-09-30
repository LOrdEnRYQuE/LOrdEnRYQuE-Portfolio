import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import { CONVEX_URL } from "@/lib/convex";
import ProjectsList from "@/components/sections/ProjectsList";
import { type PortfolioProject } from "@/components/sections/FeaturedProjects";

export const dynamic = "force-dynamic";



export default async function ProjectsPage() {
  const dynamicProjects = await fetchQuery(api.portfolio.listAll, {}, { url: CONVEX_URL });
  const projects = (dynamicProjects as unknown as PortfolioProject[]) || [];

  return <ProjectsList projects={projects} />;
}
