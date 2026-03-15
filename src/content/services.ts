import { Code, Cpu, Layout, Workflow, type LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}

export const services: ServiceItem[] = [
  {
    id: "ai-engineering",
    title: "AI Engineering",
    description: "Designing and integrating LLM-powered features into existing products.",
    icon: Cpu,
  },
  {
    id: "full-stack",
    title: "Full-Stack Development",
    description: "Building scalable, high-performance web applications from end to end.",
    icon: Code,
  },
  {
    id: "ui-ux",
    title: "Premium Design",
    description: "Crafting visually striking, glassmorphic UI with micro-animations.",
    icon: Layout,
  },
  {
    id: "agentic-workflows",
    title: "Agentic Workflows",
    description: "Automating complex processes using autonomous specialized AI agents.",
    icon: Workflow,
  },
];
