"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Sparkles, Calendar, ArrowRight } from "lucide-react";

export default function BeautyHero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#080B10]">
      {/* Background Decorative Gradient Elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 -left-1/4 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 -right-1/4 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-accent/80 backdrop-blur-md">
              <Sparkles size={10} className="text-accent" />
              The Art of Aesthetic Excellence
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-serif text-white leading-[1.05] tracking-tight">
            Reveal Your <br />
            <span className="relative inline-block mt-4">
              <span className="italic bg-linear-to-b from-accent-light via-accent to-accent-hover bg-clip-text text-transparent">
                Radiance.
              </span>
              <motion.div 
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "110%", opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.5 }}
                className="absolute -bottom-4 -left-[5%] h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" 
              />
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-text-secondary max-w-xl mx-auto font-light leading-relaxed">
            Personalized skincare and aesthetic treatments designed to enhance your natural beauty. Experience science-backed luxury.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12">
            <Button size="lg" className="bg-accent hover:bg-accent-hover text-background min-w-[240px] h-16 rounded-full uppercase tracking-[0.2em] text-[10px] font-black transition-all shadow-2xl shadow-accent/20 group">
              Start Your Journey
              <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button variant="outline" size="lg" className="border-white/10 text-white hover:bg-white/5 min-w-[240px] h-16 rounded-full uppercase tracking-[0.2em] text-[10px] font-black transition-all backdrop-blur-sm">
              <Calendar className="mr-3" size={14} />
              Book Treatment
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Side Decorative Text */}
      <div className="hidden lg:block absolute left-12 top-1/2 -translate-y-1/2 vertical-text overflow-hidden opacity-30 select-none">
        <span className="text-[9px] font-black uppercase tracking-[1.5em] text-accent font-mono">
          EST. 2026 • LOrdEnRYQuE • STUDIO
        </span>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-12 bg-linear-to-b from-accent/50 to-transparent"
      />
    </section>
  );
}
