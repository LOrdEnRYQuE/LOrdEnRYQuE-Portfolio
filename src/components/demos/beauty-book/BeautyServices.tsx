"use client";

import { motion } from "framer-motion";
import { Clock, Star, CheckCircle2 } from "lucide-react";

export interface BeautyService {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  category: string;
}

const BEAUTY_SERVICES: BeautyService[] = [
  {
    id: "b1",
    name: "HydraFacial Elite",
    duration: "60 min",
    price: 180,
    description: "Deep cleansing, exfoliation, and intense hydration with antioxidant infusion.",
    category: "Skincare",
  },
  {
    id: "b2",
    name: "Lumi-Lift Sculpting",
    duration: "45 min",
    price: 120,
    description: "Non-invasive facial contouring utilizing microcurrent and LED therapy.",
    category: "Skincare",
  },
  {
    id: "b3",
    name: "The Signature Glow",
    duration: "75 min",
    price: 240,
    description: "Full spectrum facial treatment including chemical peel and oxygen therapy.",
    category: "Skincare",
  },
  {
    id: "b4",
    name: "Eyes Awakening",
    duration: "30 min",
    price: 85,
    description: "Focused treatment addressing fine lines, dark circles, and puffiness.",
    category: "Express",
  },
];

interface BeautyServicesProps {
  onSelect: (service: BeautyService) => void;
  selectedServiceId?: string;
}

export default function BeautyServices({ onSelect, selectedServiceId }: BeautyServicesProps) {
  return (
    <section className="py-32 px-6 bg-[#0B0E14] relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-10 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-[10px] uppercase tracking-[0.6e] text-accent font-black">Curated Rituals</h2>
            <h3 className="text-5xl md:text-6xl font-serif text-white leading-tight">Tailored Care <br /><span className="italic text-white/50">Redefined.</span></h3>
          </div>
          <p className="text-text-secondary max-w-md font-light text-lg leading-relaxed">
            Every treatment is a bespoke ceremony, customized to your unique skin profile using the world&apos;s most prestigious organic and scientific formulations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BEAUTY_SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              onClick={() => onSelect(service)}
              className={`group p-10 rounded-[2.5rem] transition-all duration-500 cursor-pointer relative overflow-hidden backdrop-blur-md border ${
                selectedServiceId === service.id 
                  ? "bg-accent/10 border-accent shadow-accent-glow-sm scale-[1.02]" 
                  : "bg-white/2 border-white/5 hover:border-accent/30 hover:bg-white/5 hover:-translate-y-1"
              }`}
            >
              <div className="flex justify-between items-start mb-6">
                <span className={`text-[9px] uppercase font-black tracking-[0.3em] px-3 py-1 rounded-full border transition-colors ${
                  selectedServiceId === service.id ? "bg-accent text-background border-accent" : "bg-white/5 text-accent/60 border-white/10"
                }`}>
                  {service.category}
                </span>
                {selectedServiceId === service.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-background shadow-lg shadow-accent/20"
                  >
                    <CheckCircle2 size={20} />
                  </motion.div>
                )}
              </div>
              
              <h4 className="text-2xl font-serif text-white mb-3 group-hover:text-accent transition-colors uppercase tracking-tight">
                {service.name}
              </h4>
              <p className="text-sm text-text-secondary font-light mb-10 leading-relaxed max-w-sm">
                {service.description}
              </p>
              
              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 text-[11px] text-text-secondary font-bold uppercase tracking-widest">
                    <Clock size={14} className="text-accent" />
                    {service.duration}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-accent font-bold uppercase tracking-widest">
                    <Star size={14} fill="currentColor" strokeWidth={0} />
                    Premium Rated
                  </div>
                </div>
                <div className="text-3xl font-serif text-white">
                  <span className="text-accent/50 text-sm align-top mr-1">$</span>
                  {service.price}
                </div>
              </div>

              {/* Decorative side accent */}
              <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 rounded-r-full transition-all duration-500 ${
                selectedServiceId === service.id ? "bg-accent opacity-100" : "bg-accent opacity-0 group-hover:opacity-30"
              }`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
