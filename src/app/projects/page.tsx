import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import ProjectsList from "@/components/sections/ProjectsList";
import { type PortfolioProject } from "@/components/sections/FeaturedProjects";



export default async function ProjectsPage() {
  const dynamicProjects = await fetchQuery(api.portfolio.listAll);
  const projects = (dynamicProjects as unknown as PortfolioProject[]) || [];

  return <ProjectsList projects={projects} />;
}
