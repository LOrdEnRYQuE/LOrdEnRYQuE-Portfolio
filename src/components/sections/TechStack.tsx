"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";

const TECH_GROUPS = [
  { 
    category: "Frontend", 
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    accent: "blue"
  },
  { 
    category: "Backend", 
    items: ["Node.js", "PostgreSQL", "Prisma", "Supabase"],
    accent: "emerald"
  },
  { 
    category: "AI & Cloud", 
    items: ["OpenAI API", "Python", "AWS"],
    accent: "purple"
  },
];

export default function TechStack() {
  const { t } = useI18n();

  return (
    <section className="py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-border">
      <SectionHeading 
        title={t("tech_stack.title")} 
        subtitle={t("tech_stack.subtitle")} 
        align="center" 
      />
      
      <div className="mt-20 space-y-12 max-w-5xl mx-auto">
        {TECH_GROUPS.map((group, groupIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
          >
            <p className={`text-accent-${group.accent} text-[10px] font-black tracking-[0.4em] uppercase mb-6`}>{group.category}</p>
            <div className="flex flex-wrap gap-4">
              {group.items.map((tech, idx) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (groupIdx * group.items.length + idx) * 0.03 }}
                  whileHover={{ y: -3, scale: 1.05 }}
                  className={`px-7 py-4 rounded-2xl border border-white/5 bg-surface text-text-secondary hover:text-accent-${group.accent} hover:border-accent-${group.accent}/30 hover:bg-accent-${group.accent}/5 transition-colors duration-500 font-medium text-sm cursor-default`}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
