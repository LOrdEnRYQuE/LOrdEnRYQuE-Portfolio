"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown, Layers } from "lucide-react";
import { demoBranches } from "@/content/demoBranches";

interface DemoLayoutProps {
  children: React.ReactNode;
  demoTitle: string;
  themeColor?: string;
  backUrl: string;
}

export default function DemoLayout({
  children,
  demoTitle,
  backUrl,
}: DemoLayoutProps) {
  const [isSwitcherOpen, setIsSwitcherOpen] = useState(false);
  const otherDemos = demoBranches.filter(d => !demoTitle.toLowerCase().includes(d.slug));

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Immersive Top Bar */}
      <nav className="fixed top-0 left-0 right-0 z-60 px-6 py-4">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link
            href={backUrl}
            className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-foreground transition-colors group"
          >
            <div className="w-8 h-8 rounded-full glass-card flex items-center justify-center group-hover:bg-surface-hover transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="hidden sm:inline">Exit Demo</span>
          </Link>

          <div className="glass-card px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border border-white/5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Interactive MVP: {demoTitle}
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsSwitcherOpen(!isSwitcherOpen)}
              className="flex items-center gap-2 bg-accent/10 border border-accent/20 px-4 py-2 rounded-xl text-xs font-bold text-accent hover:bg-accent/20 transition-all shadow-lg shadow-accent/5 active:scale-95"
            >
               <Layers size={14} />
               <span className="hidden md:inline">Other Demos</span>
               <ChevronDown size={14} className={`transition-transform duration-300 ${isSwitcherOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
               {isSwitcherOpen && (
                 <>
                   <div className="fixed inset-0 z-10" onClick={() => setIsSwitcherOpen(false)} />
                   <motion.div
                     initial={{ opacity: 0, scale: 0.95, y: 10 }}
                     animate={{ opacity: 1, scale: 1, y: 0 }}
                     exit={{ opacity: 0, scale: 0.95, y: 10 }}
                     className="absolute right-0 mt-3 w-72 glass-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-20 backdrop-blur-2xl"
                   >
                      <div className="p-4 border-b border-white/5 bg-white/5">
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Switch Prototype</p>
                      </div>
                      <div className="p-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
                         {otherDemos.map(demo => (
                           <Link 
                             key={demo.slug}
                             href={`/demo-branches/${demo.slug}/prototype`}
                             className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-all group"
                           >
                              <div className="w-10 h-10 rounded-lg bg-cover bg-center border border-white/10 shrink-0" style={{ backgroundImage: `url(${demo.cover})` }} />
                              <div className="flex-1 min-w-0">
                                 <p className="text-xs font-bold text-white truncate group-hover:text-accent transition-colors">{demo.title.replace('LOrdEnRYQuE ', '')}</p>
                                 <p className="text-[10px] text-gray-500 truncate">{demo.niche}</p>
                              </div>
                           </Link>
                         ))}
                      </div>
                      <Link 
                        href="/demo-branches"
                        className="w-full text-center py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all border-t border-white/5 flex items-center justify-center gap-2"
                      >
                         View All Case Studies
                      </Link>
                   </motion.div>
                 </>
               )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
    </div>
  );
}
