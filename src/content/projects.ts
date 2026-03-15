export type Project = {
  slug: string;
  title: string;
  status: "Live" | "MVP" | "In Progress" | "Concept";
  summary: string;
  description: string;
  challenge?: string;
  solution?: string;
  brief?: string;
  stack: string[];
  cover: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "ai-native-ide-platform",
    title: "AI Native IDE Platform",
    status: "MVP",
    summary:
      "A desktop-first development environment focused on AI-assisted building, workflow orchestration, and modern product execution.",
    brief: "The current state of AI-assisted development is dominated by simple chat interfaces within existing IDEs. This project aims to reimagine the developer experience by putting AI at the core of the IDE's architecture, allowing it to reason about the entire workspace and provide real engineering leverage.",
    challenge: "Traditional editors are built for text manipulation, not for LLM orchestration. The challenge was building a high-performance desktop application that can manage large-scale context injection, real-time agent coordination, and a seamless UI for both code and product orchestration.",
    solution: "We built an Electron-based environment from the ground up, featuring a specialized context-management engine and a 'multi-agent orchestration' layer. This allows the IDE to act as a senior-level partner that can plan, implement, and verify entire features based on high-level product intent.",
    description:
      "This project explores a premium AI-native IDE experience that combines assisted coding, structured workflows, and product-oriented tooling. The goal is to move beyond basic chat-inside-an-editor patterns and create a more capable environment for building real applications faster and with better architecture.",
    stack: ["Electron", "React", "TypeScript", "Node.js", "AI Workflows", "Structured Context"],
    cover: "/images/projects/ai-native-ide-platform.jpg",
    featured: true,
  },
  {
    slug: "autonomous-developer-agents",
    title: "Autonomous Developer Agents",
    status: "In Progress",
    summary:
      "A system of structured AI agents designed to support planning, building, reviewing, and improving software projects.",
    brief: "Building complex software often involves coordination overhead that slows down human developers. This project aims to delegate structured engineering tasks to specialized AI agents that can operate independently within defined boundaries.",
    challenge: "The primary challenge is ensuring reliability and preventing 'agent hallucinations'. We needed to implement rigorous validation steps and a structured planning-first approach for every task.",
    solution: "We developed a multi-stage workflow where a Planner agent creates a task-breakdown, an Implementer agent writes the code, and a Reviewer agent verifies it against the original plan and code standards.",
    description:
      "This project focuses on orchestrating specialized AI agents for software development workflows, including planning, implementation, validation, and iteration. It is designed around the idea that AI should provide real engineering leverage instead of shallow novelty.",
    stack: ["TypeScript", "Next.js", "LLM Integrations", "Automation", "Agent Workflows"],
    cover: "/images/projects/autonomous-developer-agents.jpg",
    featured: true,
  },
  {
    slug: "lordenryque-portfolio",
    title: "LOrdEnRYQuE Portfolio",
    status: "Live",
    summary:
      "A premium personal developer portfolio built to present services, projects, and product direction with clarity and strong visual identity.",
    brief: "A developer's portfolio is more than a list of projects; it's a product in itself. The design needed to reflect a commitment to high-fidelity aesthetics and clear communication of value.",
    challenge: "The challenge was creating a design that felt premium and futuristic (Refined Ethereal Glass) while maintaining excellent performance and high discoverability (GEO).",
    solution: "We implemented a custom design system with Glassmorphism, liquid motion effects, and specialized GEO metadata, ensuring the site performs as well as it looks.",
    description:
      "This portfolio serves as the digital home of the LOrdEnRYQuE brand. It is built to showcase selected work, communicate technical and product capabilities, and provide a clean conversion path for clients, collaborators, and business inquiries.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GEO"],
    cover: "/images/projects/lordenryque-portfolio.jpg",
    featured: true,
    liveUrl: "https://lordenryque.com",
  },
];
