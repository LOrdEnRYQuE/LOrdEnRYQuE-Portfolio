"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Rocket, Code2 } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const TIMELINE_DATA = [
  {
    day: "2025",
    titleKey: "timeline.present.title",
    company: "Neural Forge Systems",
    descKey: "timeline.present.desc",
    icon: Rocket,
    tags: ["Product Engineer", "AI", "SaaS"],
    color: "text-accent-blue",
    bg: "bg-accent-blue/5",
    border: "border-accent-blue/20"
  },
  {
    day: "2024",
    titleKey: "timeline.ai_shift.title",
    company: "Freelance / Consulting",
    descKey: "timeline.ai_shift.desc",
    icon: Code2,
    tags: ["Next.js", "GenAI", "MVP Development"],
    color: "text-accent-purple",
    bg: "bg-accent-purple/5",
    border: "border-accent-purple/20"
  },
  {
    day: "2023",
    titleKey: "timeline.senior.title",
    company: "Lordenryque Tech",
    descKey: "timeline.senior.desc",
    icon: Briefcase,
    tags: ["Lead Dev", "Architecture", "Fullstack"],
    color: "text-accent-emerald",
    bg: "bg-accent-emerald/5",
    border: "border-accent-emerald/20"
  },
  {
    day: "2022",
    titleKey: "timeline.grad.title",
    company: "Engineering University",
    descKey: "timeline.grad.desc",
    icon: GraduationCap,
    tags: ["Bachelor of Engineering", "Software Systems"],
    color: "text-accent-blue",
    bg: "bg-accent-blue/5",
    border: "border-accent-blue/20"
  }
];

export function Timeline() {
  const { t } = useI18n();

  return (
    <div className="relative py-20 px-6 md:px-10">
      {/* Central Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-border to-transparent hidden md:block transform -translate-x-1/2" />

      <div className="max-w-5xl mx-auto space-y-12">
        {TIMELINE_DATA.map((item, idx) => {
          const Icon = item.icon;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                isEven ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Content Card */}
              <div className="w-full md:w-[45%]">
                <div className={`p-8 rounded-2xl border ${item.border} ${item.bg} backdrop-blur-xl relative group hover:border-foreground/20 transition-all duration-500`}>
                  {/* Decorative corner glow */}
                  <div className={`absolute -top-4 -right-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${item.color} bg-current`} />

                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs font-black uppercase tracking-[0.2em] ${item.color}`}>
                      {item.day}
                    </span>
                    <Icon size={20} className="text-text-muted opacity-50" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:tracking-wide transition-all duration-300">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm font-medium text-text-tertiary mb-4">
                    {item.company}
                  </p>
                  <p className="text-sm text-text-secondary leading-relaxed mb-6">
                    {t(item.descKey)}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded bg-surface border border-border/40 text-text-muted">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Central Node */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
                <div className={`w-4 h-4 rounded-full border-4 border-background ${item.color.replace('text-', 'bg-')} z-20 shadow-dark-glow`} />
              </div>

              {/* Spacer for layout */}
              <div className="w-full md:w-[45%]" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
