"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface QuoteWizardProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategoryId?: string;
}

export default function QuoteWizard({ isOpen, onClose, selectedCategoryId }: QuoteWizardProps) {
  const [step, setStep] = useState(1);
  const [zipCode, setZipCode] = useState("");

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setZipCode("");
    }, 300);
  };

  const nextStep = () => setStep((s) => s + 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#080B10]/95 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0F1219] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col items-center"
          >
            <button
              onClick={handleClose}
              className="absolute top-10 right-10 p-3 bg-white/5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all border border-white/5 z-20"
            >
              <X size={20} />
            </button>

            <div className="p-12 md:p-20 relative w-full">
               {/* Decorative Element */}
               <div className="absolute top-0 left-0 w-24 h-24 bg-accent/10 blur-3xl rounded-full" />
               
               <AnimatePresence mode="wait">
                 {step === 1 && (
                   <motion.div
                     key="step1"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-12"
                   >
                     <div className="space-y-6">
                       <div className="w-16 h-16 rounded-2xl bg-accent text-background flex items-center justify-center shadow-lg shadow-accent/20 mb-8">
                         <MapPin size={32} />
                       </div>
                       <h2 className="text-5xl font-serif text-white tracking-tight leading-tight">Localization <br /><span className="italic text-white/40">Reference.</span></h2>
                       <p className="text-text-secondary text-lg font-light leading-relaxed">Please provide the service postal code to synchronize with the nearest available specialist cluster.</p>
                     </div>

                     <div className="space-y-6">
                       <input
                         type="text"
                         placeholder="e.g. 10115"
                         value={zipCode}
                         onChange={(e) => setZipCode(e.target.value)}
                         className="w-full bg-white/2 border border-white/5 rounded-2xl py-6 px-8 text-2xl font-mono font-bold text-white placeholder:text-white/10 focus:border-accent focus:bg-white/5 outline-none transition-all"
                       />
                       <Button 
                         disabled={zipCode.length < 5}
                         onClick={nextStep}
                         className="w-full h-20 bg-accent hover:bg-accent-hover text-background rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-accent/20 group"
                       >
                         Check Cluster Availability
                         <ArrowRight size={16} className="ml-3 group-hover:translate-x-1" />
                       </Button>
                     </div>
                   </motion.div>
                 )}

                 {step === 2 && (
                   <motion.div
                     key="step2"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     className="space-y-12"
                   >
                     <div className="space-y-4">
                        <div className="flex items-center gap-3 text-accent mb-4">
                           <div className="relative flex items-center justify-center">
                              <div className="absolute w-3 h-3 bg-accent rounded-full animate-ping opacity-40" />
                              <div className="w-2 h-2 bg-accent rounded-full" />
                           </div>
                           <span className="text-[10px] font-black uppercase tracking-[0.3em]">8 Specialists Synchronized</span>
                        </div>
                        <h2 className="text-5xl font-serif text-white tracking-tight leading-tight">Instant <br /><span className="italic text-white/40">Valuation.</span></h2>
                        <p className="text-text-secondary text-lg font-light">Calculated benchmark based on historical algorithmic localized data.</p>
                     </div>

                     <div className="bg-white/2 border border-white/5 rounded-[2.5rem] p-10 space-y-10 relative overflow-hidden group/est">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                           <Zap size={100} className="text-accent" />
                        </div>

                        <div className="flex justify-between items-end relative">
                           <span className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Benchmark Range</span>
                           <span className="text-5xl font-serif text-white tracking-tighter italic">
                             <small className="text-accent text-xl align-top mr-1">€</small>
                             120 - 250
                           </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 relative">
                           <div className="p-5 bg-white/2 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors">
                              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-2">Labour Efficiency</p>
                              <p className="text-white font-bold text-base uppercase tracking-tight">Included</p>
                           </div>
                           <div className="p-5 bg-white/2 rounded-2xl border border-white/5 hover:border-accent/30 transition-colors">
                              <p className="text-[9px] text-white/30 uppercase font-black tracking-widest mb-2">Mobilization</p>
                              <p className="text-accent font-bold text-base uppercase tracking-tight">Priority Free</p>
                           </div>
                        </div>
                     </div>

                     <div className="space-y-6 pt-4">
                         <Button 
                           onClick={nextStep}
                           className="w-full h-20 bg-linear-to-b from-accent-light to-accent hover:bg-accent-hover text-background rounded-full font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-accent/30 group"
                         >
                           Finalize Dispatch Intent
                           <ArrowRight size={18} className="ml-3 group-hover:translate-x-1" />
                         </Button>
                         <p className="text-[9px] text-center text-white/20 uppercase font-black tracking-widest">
                            * No commitment required. Clusters react within 15 minutes.
                         </p>
                     </div>
                   </motion.div>
                 )}

                 {step === 3 && (
                   <motion.div
                     key="step3"
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="text-center py-20 space-y-12"
                   >
                     <div className="w-32 h-32 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-10 shadow-accent-glow flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border border-accent/30 scale-125 animate-ping opacity-20" />
                        <CheckCircle2 className="text-accent" size={56} />
                     </div>
                     <div className="space-y-6">
                        <h2 className="text-5xl font-serif text-white tracking-tight">Dispatch Initialized.</h2>
                        <p className="text-text-secondary text-xl font-light max-w-lg mx-auto leading-relaxed">
                           Strategic briefing for {selectedCategoryId ? selectedCategoryId.replace(/-/g, " ") : "this operation"} has been issued. Check your digital terminal for updates.
                        </p>
                     </div>
                     <div className="pt-10">
                        <Button onClick={handleClose} variant="outline" className="h-20 border-white/10 text-white hover:bg-white/5 rounded-full px-16 text-[11px] font-black uppercase tracking-[0.4em] backdrop-blur-md">
                           Return to Core
                        </Button>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
