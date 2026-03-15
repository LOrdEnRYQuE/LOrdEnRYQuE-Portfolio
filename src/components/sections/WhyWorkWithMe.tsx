"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";
import { Brain, Sparkles, Rocket, Bot } from "lucide-react";

const REASONS = [
  { 
    icon: Brain, 
    titleKey: "why.product.title",
    descKey: "why.product.desc",
    accent: "blue"
  },
  { 
    icon: Sparkles, 
    titleKey: "why.visual.title",
    descKey: "why.visual.desc",
    accent: "emerald"
  },
  { 
    icon: Rocket, 
    titleKey: "why.mvp.title",
    descKey: "why.mvp.desc",
    accent: "purple"
  },
  { 
    icon: Bot, 
    titleKey: "why.ai.title",
    descKey: "why.ai.desc",
    accent: "blue"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export default function WhyWorkWithMe() {
  const { t } = useI18n();

  return (
    <section className="py-32 px-6 md:px-10 max-w-7xl mx-auto relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/5 blur-[80px] rounded-full translate-x-1/3 pointer-events-none" />

      <SectionHeading 
        title={t("why.title")} 
        subtitle={t("why.subtitle")} 
        align="center" 
      />

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid sm:grid-cols-2 gap-8 mt-20 relative z-10"
      >
        {REASONS.map((reason) => {
          const Icon = reason.icon;
          return (
            <motion.div
              variants={item}
              key={reason.titleKey}
              className={`group relative p-10 rounded-3xl border border-white/5 bg-surface hover:border-accent-${reason.accent}/20 transition-all duration-700 overflow-hidden`}
            >
              {/* Hover Glow */}
              <div className={`absolute inset-0 bg-accent-${reason.accent}/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
              
              <div className="relative z-10 space-y-6">
                <div className={`w-14 h-14 rounded-2xl bg-accent-${reason.accent}/10 border border-accent-${reason.accent}/20 flex items-center justify-center text-accent-${reason.accent} group-hover:bg-accent-${reason.accent} group-hover:text-background transition-all duration-500`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                
                <h3 className={`text-2xl font-bold text-foreground tracking-tight group-hover:text-accent-${reason.accent} transition-colors duration-500`}>
                  {t(reason.titleKey)}
                </h3>
                
                <p className="text-text-secondary text-base leading-relaxed">
                  {t(reason.descKey)}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className={`absolute -bottom-8 -right-8 w-24 h-24 border border-accent-${reason.accent}/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
