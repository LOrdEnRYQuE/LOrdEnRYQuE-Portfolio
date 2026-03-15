"use client";

import { motion } from "framer-motion";
import { MapPin, BedDouble, Bath, Square, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PropHeroProps {
  onSchedule: () => void;
}

export default function PropHero({ onSchedule }: PropHeroProps) {
  return (
    <section className="relative h-[95vh] overflow-hidden group">
      {/* Background Image with Ken Burns Effect */}
      <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/images/demos/propview.png")' }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-[#080B10]" />
      </motion.div>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-32">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <div className="flex items-center gap-3 text-accent mb-8">
            <div className="px-4 py-1.5 bg-accent/10 backdrop-blur-md border border-accent/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
              <MapPin size={12} className="text-accent" />
              <span>Malibu, California</span>
            </div>
            <div className="h-px w-12 bg-accent/30" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Exclusive Listing</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-bold text-white mb-8 tracking-tighter leading-[0.95]">
            Azure Horizon <br />
            <span className="bg-linear-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent italic font-serif font-light">
              Luxury Estate.
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-10 mb-14">
             <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Bedrooms</span>
                <div className="flex items-center gap-2 text-white">
                  <BedDouble className="text-accent" size={18} />
                  <span className="text-2xl font-bold">6</span>
                </div>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Bathrooms</span>
                <div className="flex items-center gap-2 text-white">
                  <Bath className="text-accent" size={18} />
                  <span className="text-2xl font-bold">8</span>
                </div>
             </div>
             <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Area</span>
                <div className="flex items-center gap-2 text-white">
                  <Square className="text-accent" size={18} />
                  <span className="text-2xl font-bold text-nowrap">12,500 <small className="text-xs uppercase font-normal ml-1">sqft</small></span>
                </div>
             </div>
             <div className="h-12 w-px bg-white/10 hidden md:block" />
             <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase font-black tracking-widest text-white/40">Price</span>
                <div className="text-4xl font-serif font-light text-white">$14,500,000</div>
             </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button 
                onClick={onSchedule}
                size="lg" 
                className="bg-accent hover:bg-accent-hover text-background px-12 h-20 text-[10px] uppercase font-black tracking-[0.2em] rounded-full shadow-2xl shadow-accent/20 group"
            >
              Schedule Private Tour
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
                variant="outline" 
                size="lg" 
                className="border-white/10 text-white hover:bg-white/5 px-12 h-20 text-[10px] uppercase font-black tracking-[0.2em] rounded-full backdrop-blur-sm"
            >
              Explore Gallery
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
         {[1, 2, 3, 4].map(idx => (
           <div key={idx} className={`w-1 h-8 rounded-full transition-all duration-700 ${idx === 1 ? 'bg-accent h-16' : 'bg-white/10'}`} />
         ))}
      </div>
    </section>
  );
}
