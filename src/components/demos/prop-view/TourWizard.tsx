"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Video, User, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TourWizardProps {
  isOpen: boolean;
  onClose: () => void;
}

const DATES = ["Oct 30", "Oct 31", "Nov 01", "Nov 02"];
const TIMES = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

export default function TourWizard({ isOpen, onClose }: TourWizardProps) {
  const [step, setStep] = useState(1);
  const [tourType, setTourType] = useState<"virtual" | "in-person" | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setTourType(null);
      setSelectedDate(null);
      setSelectedTime(null);
    }, 300);
  };

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

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
            className="relative w-full max-w-3xl bg-[#0F1219] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-10 right-10 p-3 bg-white/5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all border border-white/5 z-20"
            >
              <X size={20} />
            </button>

            <div className="p-12 md:p-20 relative">
               {/* Decorative Gradient Sparkle */}
               <div className="absolute -top-20 -left-20 w-64 h-64 bg-accent/5 blur-[100px] rounded-full" />
               
               <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-14"
                    >
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 text-accent">
                            <div className="h-px w-8 bg-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Concierge Access</span>
                         </div>
                         <h2 className="text-5xl font-serif text-white tracking-tight leading-tight">Define Your <br /><span className="italic text-white/40">Perspective.</span></h2>
                         <p className="text-text-secondary text-lg font-light">Experience the Azure Horizon estate through our bespoke tour selections.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <button 
                            onClick={() => { setTourType("in-person"); nextStep(); }}
                            className="p-10 bg-white/2 border border-white/5 rounded-[2.5rem] text-left hover:border-accent/40 hover:bg-white/5 transition-all group relative overflow-hidden"
                         >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                               <User size={120} className="text-white" />
                            </div>
                            <div className="w-16 h-16 bg-accent text-background rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-lg shadow-accent/20">
                               <User size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Privileged Tour</h3>
                            <p className="text-sm text-text-secondary leading-relaxed font-light">One-on-one curated walk-through with a Senior Estate Director.</p>
                         </button>
                         <button 
                            onClick={() => { setTourType("virtual"); nextStep(); }}
                            className="p-10 bg-white/2 border border-white/5 rounded-[2.5rem] text-left hover:border-accent/40 hover:bg-white/5 transition-all group relative overflow-hidden"
                         >
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                               <Video size={120} className="text-white" />
                            </div>
                            <div className="w-16 h-16 bg-white/10 text-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform border border-white/5">
                               <Video size={28} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">Virtual Immersion</h3>
                            <p className="text-sm text-text-secondary leading-relaxed font-light">Immersive 8K cinematic narrative tour via secure streaming link.</p>
                         </button>
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-14"
                    >
                      <div className="space-y-4">
                         <div className="flex items-center gap-3 text-accent">
                            <div className="h-px w-8 bg-accent" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Temporal Allocation</span>
                         </div>
                         <h2 className="text-5xl font-serif text-white tracking-tight leading-tight">Request Your <br /><span className="italic text-white/40">Moment.</span></h2>
                         <p className="text-text-secondary text-lg font-light">Select an available window for your {tourType === 'in-person' ? 'Privileged' : 'Virtual'} experience.</p>
                      </div>

                      <div className="space-y-12">
                         <div className="space-y-6">
                            <label className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Upcoming Availability</label>
                            <div className="grid grid-cols-4 gap-4">
                               {DATES.map(d => (
                                 <button 
                                    key={d}
                                    onClick={() => setSelectedDate(d)}
                                    className={`py-6 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                       selectedDate === d ? "bg-accent border-accent text-background shadow-lg shadow-accent/20" : "bg-white/2 border-white/5 text-white hover:border-accent/30"
                                    }`}
                                 >
                                    {d}
                                 </button>
                               ))}
                            </div>
                         </div>

                         <div className="space-y-6">
                            <label className="text-[10px] uppercase tracking-[0.4em] text-white/40 font-black">Preferred Synchronicity</label>
                            <div className="grid grid-cols-4 gap-4">
                               {TIMES.map(t => (
                                 <button 
                                    key={t}
                                    onClick={() => setSelectedTime(t)}
                                    className={`py-6 rounded-2xl border text-[10px] font-black uppercase tracking-widest transition-all ${
                                       selectedTime === t ? "bg-accent border-accent text-background shadow-lg shadow-accent/20" : "bg-white/2 border-white/5 text-white hover:border-accent/30"
                                    }`}
                                 >
                                    {t.replace(" AM", "").replace(" PM", "")}
                                 </button>
                               ))}
                            </div>
                         </div>
                      </div>

                      <div className="pt-8 flex justify-between items-center">
                         <Button onClick={prevStep} variant="ghost" className="text-white/40 hover:text-white uppercase tracking-[0.2em] text-[10px] font-black">
                             <ArrowLeft size={16} className="mr-3" /> Back
                         </Button>
                         <Button 
                            disabled={!selectedDate || !selectedTime}
                            onClick={nextStep} 
                            className="bg-accent hover:bg-accent-hover text-background rounded-full px-12 h-20 text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-accent/20 group"
                         >
                             Finalize Request
                             <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 transition-transform" />
                         </Button>
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
                         <h2 className="text-5xl font-serif text-white tracking-tight">Access Secured.</h2>
                         <p className="text-text-secondary text-xl font-light max-w-lg mx-auto leading-relaxed">
                            Your itinerary has been submitted to the Executive Concierge. Expect a formal invitation within the next production cycle.
                         </p>
                      </div>
                      <div className="pt-10">
                         <Button onClick={handleClose} variant="outline" className="h-20 border-white/10 text-white hover:bg-white/5 rounded-full px-16 text-[11px] font-black uppercase tracking-[0.4em] backdrop-blur-md">
                             Return To Estate
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
