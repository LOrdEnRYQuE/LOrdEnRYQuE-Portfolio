"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Database,
  Globe,
  Layers,
  Zap,
  Workflow,
  Server,
  Braces
} from "lucide-react";

import { useI18n } from "@/lib/i18n";

const STACK = [
  { icon: Globe, label: "Next.js", x: -160, y: -120, delay: 0 },
  { icon: Code2, label: "TypeScript", x: 160, y: -120, delay: 0.2 },
  { icon: Cpu, label: "tech.ai_agents.label", x: 0, y: -200, delay: 0.4 },
  { icon: Database, label: "PostgreSQL", x: 160, y: 120, delay: 0.6 },
  { icon: Layers, label: "Framer Motion", x: -160, y: 120, delay: 0.8 },
  { icon: Server, label: "Node.js", x: 220, y: 0, delay: 1.0 },
  { icon: Workflow, label: "LangChain", x: -220, y: 0, delay: 1.2 },
  { icon: Zap, label: "Tailwind CSS", x: 0, y: 200, delay: 1.4 },
];

export default function TechPulse() {
  const { t } = useI18n();
  const [particles, setParticles] = useState<{id: number, x: number, y: number, duration: number}[]>([]);

  useEffect(() => {
    // Generate particles after mount to maintain render purity and avoid hydration mismatch
    // Wrap in requestAnimationFrame to avoid cascading render lint warning
    const rAF = requestAnimationFrame(() => {
      const newParticles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 1000 - 500,
        y: Math.random() * 800 - 400,
        duration: 3 + Math.random() * 5
      }));
      setParticles(newParticles);
    });
    return () => cancelAnimationFrame(rAF);
  }, []);

  return (
    <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden py-20">
      {/* Background Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3].map((ring) => (
          <div
            key={ring}
            className="absolute rounded-full border border-white/5"
            style={{
              width: `${ring * 200}px`,
              height: `${ring * 200}px`,
              borderColor: ring === 1 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.05)'
            }}
          />
        ))}
      </div>

      {/* Center Hub */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="relative z-10 w-24 h-24 text-background rounded-3xl flex items-center justify-center shadow-blue-glow-sm group cursor-pointer overflow-hidden"
      >
        {/* Prismatic Hub Background */}
        <div 
          className="absolute inset-0 bg-accent-radial opacity-50" 
        />
        <Braces size={40} className="relative z-10 group-hover:rotate-12 transition-transform duration-500" />

        {/* Pulsing signal */}
        <div className="absolute inset-0 rounded-3xl bg-white animate-ping opacity-20" />
      </motion.div>

      {/* Orbiting Icons */}
      <div className="absolute inset-0 flex items-center justify-center">
        {STACK.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 0, y: 0 }}
              animate={{ opacity: 1, x: item.x, y: item.y }}
              transition={{
                delay: item.delay,
                duration: 1.5,
                type: "spring",
                stiffness: 50
              }}
              className="absolute group"
            >
              {/* Connection Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: item.delay + 0.5, duration: 1 }}
                className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent-radial opacity-30 origin-left hidden md:block"
                style={{
                  width: `${Math.sqrt(item.x * item.x + item.y * item.y) - 48}px`,
                  transform: `rotate(${Math.atan2(item.y, item.x)}rad) translate(48px)`,
                }}
              />

              {/* Icon Bubble */}
              <div className="h-14 w-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-linear-to-br group-hover:from-[#94A3B8] group-hover:via-[#3B82F6] group-hover:to-[#8B5CF6] group-hover:text-background group-hover:scale-110 transition-all duration-500 shadow-none group-hover:shadow-blue-glow-sm">
                <Icon size={24} className="text-accent group-hover:animate-pulse" />
                <span 
                  className="text-[10px] font-bold uppercase tracking-widest hidden group-hover:block whitespace-nowrap bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(to right, #94A3B8, #3B82F6, #10B981, #8B5CF6)' }}
                >
                  {item.label.includes('.') ? t(item.label) : item.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: ['#94A3B8', '#3B82F6', '#10B981', '#8B5CF6'][p.id % 4]
            }}
            initial={{
              x: p.x,
              y: p.y
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity
            }}
          />
        ))}
      </div>
    </div>
  );
}
