"use client";

import Link from "next/link";
import { MoveLeft, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 mb-8">
          <HelpCircle size={40} className="text-accent/50" />
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
          Neural <span className="text-accent underline decoration-accent/30 underline-offset-8 italic">Void</span>
        </h1>
        
        <p className="text-text-secondary max-w-md mx-auto mb-12 text-sm md:text-base leading-relaxed uppercase tracking-[0.2em] font-bold">
          The requested data segment does not exist within the current cluster or has been moved to an inaccessible sector.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="group relative px-6 py-4 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
          >
            <span className="flex items-center gap-2">
              <MoveLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Return to Hangar
            </span>
          </Link>
          
          <Link
            href="/blog"
            className="px-6 py-4 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-white/10 transition-all active:scale-95"
          >
            Browse Insights
          </Link>
        </div>
      </motion.div>

      {/* Decorative Matrix Grid */}
      <div className="absolute inset-0 pointer-events-none -z-20 opacity-20 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>
    </div>
  );
}
