"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Utensils, Calendar, ArrowDown } from "lucide-react";

export default function RestaurantHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Liquid Motion Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-slate-400/10 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[10%] -right-[10%] w-[45%] h-[45%] bg-slate-400/5 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 bg-accent-radial opacity-60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="flex justify-center mb-8">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="w-16 h-16 rounded-2xl bg-slate-400/20 flex items-center justify-center border border-slate-400/30 shadow-accent-glow-sm"
            >
              <Utensils className="text-slate-400" size={32} />
            </motion.div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-6 uppercase leading-[0.9]">
            Culinary Art <br />
            <span className="text-slate-400 italic font-serif flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-slate-400/30 hidden md:block"></span>
              Redefined.
              <span className="h-px w-12 bg-slate-400/30 hidden md:block"></span>
            </span>
          </h1>
          
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Experience a symphony of flavors in an atmosphere of elegance. 
            From our farm-to-table ingredients to our curated wine selection.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10">
            <Button size="lg" className="bg-slate-400 hover:bg-slate-500 text-background min-w-[220px] h-14 rounded-2xl font-black shadow-accent-glow transition-all hover:scale-[1.02]">
              View Digital Menu
            </Button>
            <Button variant="outline" size="lg" className="border-slate-400/30 text-slate-400 hover:bg-slate-400/5 min-w-[220px] h-14 rounded-2xl font-bold backdrop-blur-sm">
              <Calendar className="mr-2" size={18} />
              Book a Table
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400/40"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-black">Scroll to Explore</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  );
}
