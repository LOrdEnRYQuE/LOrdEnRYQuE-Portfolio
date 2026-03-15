"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, Zap, ArrowRight } from "lucide-react";

interface ServiceHubHeroProps {
  onGetQuote: () => void;
}

export default function ServiceHubHero({ onGetQuote }: ServiceHubHeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-32 px-6 bg-[#080B10] overflow-hidden">
      {/* Background Layering */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -translate-y-1/2" />
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-2 pointer-events-none" 
        style={{ backgroundImage: "url(\"https://www.transparenttextures.com/patterns/stardust.png\")" }} 
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <div className="flex items-center gap-3 text-accent group w-fit">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:bg-accent group-hover:text-background transition-all duration-500">
               <ShieldCheck size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Enterprise Security Verified</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter leading-[0.9] lg:max-w-xl">
            Streamline <br />
            <span className="bg-linear-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent italic font-serif font-light">
              Your Ops.
            </span>
          </h1>
          
          <p className="text-text-secondary text-xl font-light leading-relaxed max-w-lg">
            A high-fidelity central nervous system for your maintenance ecosystem. 
            Automated dispatching, predictive logistics, and real-time financial oversight.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 pt-4">
            <Button 
                onClick={onGetQuote}
                size="lg" 
                className="bg-accent hover:bg-accent-hover text-background px-12 h-20 text-[10px] uppercase font-black tracking-[0.3em] rounded-full shadow-2xl shadow-accent/20 group"
            >
              Initialize Quote
              <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
                variant="outline" 
                size="lg" 
                className="border-white/10 text-white hover:bg-white/5 px-12 h-20 text-[10px] uppercase font-black tracking-[0.3em] rounded-full backdrop-blur-sm"
            >
              Enterprise Demo
            </Button>
          </div>
          
          <div className="flex items-center gap-10 pt-10 border-t border-white/5">
             <div className="space-y-1">
                <p className="text-2xl font-bold text-white tracking-tight">2.4m+</p>
                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Dispatches / Year</p>
             </div>
             <div className="space-y-1">
                <p className="text-2xl font-bold text-white tracking-tight">99.9%</p>
                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Uptime SLA</p>
             </div>
             <div className="space-y-1">
                <p className="text-2xl font-bold text-white tracking-tight">150+</p>
                <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">Global Partners</p>
             </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden lg:flex relative group items-center justify-center"
        >
          {/* Main Card Decoration */}
          <div className="absolute -inset-4 bg-linear-to-tr from-accent/20 via-transparent to-accent/10 blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative bg-[#0F1219] border border-white/10 rounded-[3rem] p-4 shadow-2xl overflow-hidden backdrop-blur-3xl aspect-4/3 w-full max-w-lg flex items-center justify-center">
            <Image 
              src="/images/demos/servicehub.png" 
              alt="ServiceHub Platform Dashboard" 
              width={600}
              height={450}
              className="w-full h-auto rounded-[2.5rem] opacity-90 group-hover:opacity-100 transition-opacity duration-700"
            />
            {/* Floating Intelligence Badge */}
            <div className="absolute bottom-12 left-12 p-6 bg-[#080B10]/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex items-center gap-5">
               <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-background shadow-lg shadow-accent/20">
                  <Zap size={24} />
               </div>
               <div>
                  <p className="text-white font-bold text-base">Predictive Dispatch</p>
                  <p className="text-[10px] text-accent font-black uppercase tracking-widest">Active Intelligence</p>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
