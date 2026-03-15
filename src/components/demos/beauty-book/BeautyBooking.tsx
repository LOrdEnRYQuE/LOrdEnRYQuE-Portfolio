"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, CheckCircle2, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BeautyService } from "./BeautyServices";

interface BeautyBookingProps {
  selectedService: BeautyService | null;
  isOpen: boolean;
  onClose: () => void;
}

const SPECIALISTS = [
  { id: "s1", name: "Elena Rossi", role: "Master Aesthetician" },
  { id: "s2", name: "Marcus Thorne", role: "Skin Specialist" },
  { id: "s3", name: "Sarah Chen", role: "Cosmetic Dermatologist" },
];

const TIME_SLOTS = ["10:00", "11:30", "14:00", "15:30", "17:00"];

export default function BeautyBooking({ selectedService, isOpen, onClose }: BeautyBookingProps) {
  const [step, setStep] = useState(1);
  const [selectedSpecialist, setSelectedSpecialist] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedSpecialist(null);
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
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="relative w-full max-w-3xl bg-[#0F1219] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row h-[650px] md:h-[600px] rounded-[3rem]"
          >
            {/* Left Sidebar - Summary */}
            <div className="w-full md:w-72 bg-white/2 p-10 flex flex-col border-b md:border-b-0 md:border-r border-white/5 backdrop-blur-md">
              <div className="grow space-y-10">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent/60">Your Ritual</span>
                  <h2 className="text-3xl font-serif text-white">Summary</h2>
                </div>

                <div className="space-y-8">
                  {selectedService && (
                    <div className="space-y-2 group/sum">
                      <p className="text-[9px] uppercase font-black text-accent tracking-widest">Service</p>
                      <p className="text-lg font-medium text-white group-hover/sum:text-accent transition-colors">{selectedService.name}</p>
                      <p className="text-xs text-text-secondary font-mono uppercase tracking-tighter">{selectedService.duration} • <span className="text-white">${selectedService.price}</span></p>
                    </div>
                  )}

                  {selectedSpecialist && (
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase font-black text-accent tracking-widest">Specialist</p>
                      <p className="text-lg font-medium text-white">
                        {SPECIALISTS.find(s => s.id === selectedSpecialist)?.name}
                      </p>
                    </div>
                  )}

                  {selectedTime && (
                    <div className="space-y-2">
                      <p className="text-[9px] uppercase font-black text-accent tracking-widest">Appointment</p>
                      <p className="text-lg font-medium text-white">Oct 28, 2026 <span className="text-accent">@</span> {selectedTime}</p>
                    </div>
                  )}
                </div>
              </div>

              {step < 4 && (
                <div className="pt-10 border-t border-white/5">
                   <div className="flex justify-between items-center mb-2">
                      <p className="text-[10px] text-text-secondary font-black uppercase tracking-widest">Progress</p>
                      <p className="text-[10px] text-accent font-black">{step}/3</p>
                   </div>
                   <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        className="bg-accent h-full"
                      />
                   </div>
                </div>
              )}
            </div>

            {/* Right Side - Step Content */}
            <div className="grow p-10 md:p-14 relative overflow-y-auto scrollbar-hide">
              <button
                onClick={handleClose}
                className="absolute top-8 right-8 p-3 bg-white/5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-all border border-white/5"
              >
                <X size={18} />
              </button>

              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col"
                  >
                    <h3 className="text-2xl font-serif text-white mb-10 uppercase tracking-tight">Select your <span className="text-accent italic">Alchemist</span></h3>
                    <div className="space-y-4 grow">
                      {SPECIALISTS.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedSpecialist(s.id)}
                          className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all duration-300 group ${
                            selectedSpecialist === s.id 
                              ? "border-accent bg-accent/10 shadow-accent-glow-sm" 
                              : "border-white/5 bg-white/2 hover:border-accent/30 hover:bg-white/5"
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                              selectedSpecialist === s.id ? "bg-accent text-background" : "bg-white/5 text-accent/60"
                            }`}>
                              <User size={24} />
                            </div>
                            <div className="text-left">
                              <p className="text-base font-bold text-white group-hover:text-accent transition-colors">{s.name}</p>
                              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-text-secondary">{s.role}</p>
                            </div>
                          </div>
                          {selectedSpecialist === s.id && <CheckCircle2 size={24} className="text-accent" />}
                        </button>
                      ))}
                    </div>
                    <div className="pt-10 flex justify-end">
                      <Button 
                        disabled={!selectedSpecialist}
                        onClick={nextStep}
                        className="bg-accent hover:bg-accent-hover text-background rounded-full uppercase tracking-[0.3em] text-[10px] font-black h-16 px-12 shadow-2xl shadow-accent/20 group"
                      >
                        Proceed <ArrowRight size={16} className="ml-3 transition-transform group-hover:translate-x-1" />
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
                    className="h-full flex flex-col"
                  >
                    <h3 className="text-2xl font-serif text-white mb-10 uppercase tracking-tight">Reserve your <span className="text-accent italic">Moment</span></h3>
                    <div className="grid grid-cols-2 gap-4 grow content-start">
                      {TIME_SLOTS.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-6 rounded-2xl border text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                            selectedTime === time 
                              ? "border-accent bg-accent text-background shadow-accent-glow-sm" 
                              : "border-white/5 bg-white/2 text-text-secondary hover:border-accent/30 hover:text-white"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    <div className="pt-10 flex justify-between gap-4">
                      <Button 
                        onClick={prevStep}
                        variant="ghost"
                        className="text-text-secondary hover:text-white uppercase tracking-[0.2em] text-[10px] font-black"
                      >
                        <ArrowLeft size={16} className="mr-3" /> Back
                      </Button>
                      <Button 
                        disabled={!selectedTime}
                        onClick={nextStep}
                        className="bg-accent hover:bg-accent-hover text-background rounded-full uppercase tracking-[0.3em] text-[10px] font-black h-16 px-12"
                      >
                        Review Ritual <ArrowRight size={16} className="ml-3" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="h-full flex flex-col"
                  >
                    <h3 className="text-2xl font-serif text-white mb-10 uppercase tracking-tight">Confirm <span className="text-accent italic">Ritual</span></h3>
                    <div className="space-y-8 grow">
                      <p className="text-base text-text-secondary font-light leading-relaxed">
                        Please verify your appointment details. By finalizing, you acknowledge this is an interactive ritual of an ultra-premium boutique booking experience.
                      </p>
                      
                      <div className="p-8 rounded-4xl bg-white/2 border border-white/5 space-y-6">
                         <div className="flex items-center gap-4 text-sm text-white font-medium">
                             <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <CheckCircle2 size={14} />
                             </div>
                             <span>Priority Concierge Support</span>
                         </div>
                         <div className="flex items-center gap-4 text-sm text-white font-medium">
                             <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                <CheckCircle2 size={14} />
                             </div>
                             <span>SMS Reminder & Digital Itinerary</span>
                         </div>
                      </div>
                    </div>
                    
                    <div className="pt-10 flex justify-between gap-4">
                      <Button 
                        onClick={prevStep}
                        variant="ghost"
                        className="text-text-secondary hover:text-white uppercase tracking-[0.2em] text-[10px] font-black"
                      >
                        <ArrowLeft size={16} className="mr-3" /> Back
                      </Button>
                      <Button 
                        onClick={nextStep}
                        className="bg-linear-to-b from-accent-light to-accent hover:bg-accent-hover text-background rounded-full uppercase tracking-[0.4em] text-[11px] font-black h-18 px-14 shadow-accent-glow group"
                      >
                        Finalize Ritual
                        <Sparkles size={16} className="ml-3 group-hover:rotate-12 transition-transform" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-10"
                  >
                    <div className="w-28 h-28 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shadow-accent-glow-sm">
                       <Sparkles className="text-accent" size={48} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-4xl font-serif text-white">Your Radiance awaits.</h3>
                      <p className="text-base text-text-secondary max-w-xs mx-auto font-light">
                        Your beauty journey has been meticulously secured in this high-fidelity experience.
                      </p>
                    </div>
                    <Button 
                      onClick={handleClose}
                      variant="outline"
                      className="border-white/10 text-white hover:bg-white/5 rounded-full uppercase tracking-[0.3em] text-[10px] font-black h-16 px-12 transition-all"
                    >
                      Return to Studio
                    </Button>
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
