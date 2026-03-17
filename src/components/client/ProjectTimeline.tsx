"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import { useI18n } from "@/lib/i18n";

interface StageProp {
  _id: string;
  title: string;
  description?: string;
  status: string;
}

export default function ProjectTimeline({ stages: initialStages }: { stages?: StageProp[] }) {

  const { t } = useI18n();

  const MOCK_STAGES = [
    { id: 1, name: t("timeline.stage.discovery.label"), description: t("timeline.stage.discovery.desc"), status: "completed" },
    { id: 2, name: t("timeline.stage.architecture.label"), description: t("timeline.stage.architecture.desc"), status: "completed" },
    { id: 3, name: t("timeline.stage.development.label"), description: t("timeline.stage.development.desc"), status: "in-progress" },
    { id: 4, name: t("timeline.stage.testing.label"), description: t("timeline.stage.testing.desc"), status: "upcoming" },
    { id: 5, name: t("timeline.stage.launch.label"), description: t("timeline.stage.launch.desc"), status: "upcoming" },
  ];

  const STAGES = initialStages?.map(s => ({
    id: s._id,
    name: s.title,
    description: s.description,
    status: s.status.toLowerCase().replace('_', '-')
  })) || MOCK_STAGES;
  return (
    <div className="relative py-12 px-4 max-w-4xl mx-auto">
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 hidden md:block" />

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4">
        {STAGES.map((stage, idx) => (
          <motion.div
            key={stage.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="relative flex flex-col items-center text-center group"
          >
            <div className={`w-12 h-12 rounded-full mb-4 flex items-center justify-center border-2 transition-all duration-500 z-10 ${
              stage.status === 'completed' ? 'bg-slate-400 border-slate-400 text-background' :
              stage.status === 'in-progress' ? 'bg-background border-slate-400 text-slate-400 animate-pulse' :
              'bg-background border-white/10 text-gray-600'
            }`}>
              {stage.status === 'completed' ? <Check size={20} /> : <span>{idx + 1}</span>}
            </div>

            <div className="space-y-1">
              <h4 className={`text-sm font-bold uppercase tracking-widest ${
                stage.status === 'upcoming' ? 'text-gray-600' : 'text-white'
              }`}>
                {stage.name}
              </h4>
              <p className="text-[10px] text-gray-500 max-w-[120px] mx-auto leading-relaxed">
                {stage.description}
              </p>
            </div>

            {/* Connecting lines for vertical mobile layout */}
            {idx < STAGES.length - 1 && (
              <div className="md:hidden h-8 w-0.5 bg-white/5 my-2" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
