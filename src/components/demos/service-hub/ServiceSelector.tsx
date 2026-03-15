"use client";

import { motion } from "framer-motion";
import { Paintbrush, Waves, Lightbulb, Thermometer, ArrowRight, UserCheck } from "lucide-react";

export interface ServiceCategory {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
}

const CATEGORIES: ServiceCategory[] = [
  { id: "c1", name: "Electrical Systems", icon: Lightbulb, description: "Precision wiring, high-voltage fixtures, and emergency power redundancies." },
  { id: "c2", name: "Fluid Logistics", icon: Waves, description: "Hydraulic leak repairs and high-fidelity system installations." },
  { id: "c3", name: "Aesthetic Restoration", icon: Paintbrush, description: "Elite level interior and exterior professional protective coating." },
  { id: "c4", name: "Thermal Control", icon: Thermometer, description: "Institutional climate oversight and advanced air filtration." },
];

interface ServiceSelectorProps {
  onSelect: (id: string) => void;
  selectedId?: string;
}

export default function ServiceSelector({ onSelect, selectedId }: ServiceSelectorProps) {
  return (
    <section className="py-32 px-6 bg-[#080B10] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-linear-to-b from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20 space-y-4">
          <div className="flex items-center gap-2 text-accent">
             <UserCheck size={16} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Expert Registry</span>
          </div>
          <h2 className="text-6xl font-serif text-white tracking-tight leading-tight lg:max-w-2xl">
            Authorize <br />
            <span className="italic text-white/40">Specialist Cluster.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedId === cat.id;
            
            return (
              <motion.button
                key={cat.id}
                whileHover={{ y: -8 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelect(cat.id)}
                className={`group p-10 rounded-[2.5rem] border text-left transition-all duration-700 relative overflow-hidden ${
                  isSelected 
                    ? "bg-accent border-accent text-background shadow-2xl shadow-accent/20" 
                    : "bg-[#0F1219] border-white/5 text-white hover:border-accent/30"
                }`}
              >
                {/* Hover Glow Effect */}
                {!isSelected && (
                  <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                )}

                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-700 group-hover:scale-110 ${
                  isSelected ? "bg-background/20 text-background" : "bg-white/5 text-accent border border-white/5"
                }`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                
                <h4 className="text-2xl font-serif font-bold mb-4 tracking-tight">{cat.name}</h4>
                <p className={`text-base font-light leading-relaxed mb-10 ${isSelected ? "text-background/70" : "text-white/40"}`}>
                  {cat.description}
                </p>

                <div className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                  isSelected ? "text-background" : "text-accent opacity-40 group-hover:opacity-100 group-hover:translate-x-2"
                }`}>
                   Initialize Dispatch
                  <ArrowRight size={14} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
