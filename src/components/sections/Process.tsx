"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n";
import { Search, LayoutPanelLeft, Code2, Gem } from "lucide-react";

const STEPS = [
  { icon: Search, titleKey: "process.discovery.title", descKey: "process.discovery.desc", num: "01", accent: "text-accent-blue", bg: "bg-accent-blue/5", border: "border-accent-blue/40", bubble: "border-accent-blue/30" },
  { icon: LayoutPanelLeft, titleKey: "process.planning.title", descKey: "process.planning.desc", num: "02", accent: "text-accent-emerald", bg: "bg-accent-emerald/5", border: "border-accent-emerald/40", bubble: "border-accent-emerald/30" },
  { icon: Code2, titleKey: "process.build.title", descKey: "process.build.desc", num: "03", accent: "text-accent-purple", bg: "bg-accent-purple/5", border: "border-accent-purple/40", bubble: "border-accent-purple/30" },
  { icon: Gem, titleKey: "process.refinement.title", descKey: "process.refinement.desc", num: "04", accent: "text-accent-blue", bg: "bg-accent-blue/5", border: "border-accent-blue/40", bubble: "border-accent-blue/30" },
];

export default function Process() {
  const { t } = useI18n();

  return (
    <section className="py-32 px-6 md:px-10 max-w-7xl mx-auto border-t border-border relative">
      <SectionHeading 
        title={t("process.title")} 
        subtitle={t("process.subtitle")} 
        align="center" 
      />

      <div className="mt-20 relative">
        {/* Connecting Line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-linear-to-b from-transparent via-border to-transparent hidden lg:block" />

        <div className="grid lg:grid-cols-4 gap-8 relative z-10">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group text-center space-y-8 relative"
              >
                {/* Step Number */}
                <div className="relative mx-auto">
                  <div className={`w-20 h-20 rounded-full border border-white/10 bg-surface flex items-center justify-center mx-auto group-hover:${step.border} group-hover:${step.bg} transition-all duration-700`}>
                    <Icon size={32} strokeWidth={1.5} className={`text-foreground/40 group-hover:${step.accent} transition-colors duration-500`} />
                  </div>
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border ${step.bubble} flex items-center justify-center`}>
                    <span className={`text-[10px] font-black ${step.accent}`}>{step.num}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className={`text-xl font-bold text-foreground tracking-tight group-hover:${step.accent} transition-colors duration-500`}>
                    {t(step.titleKey)}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed max-w-xs mx-auto">
                    {t(step.descKey)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
