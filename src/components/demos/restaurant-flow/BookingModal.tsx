"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => setStep("form"), 300); // Reset after animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-background/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg glass-card rounded-3xl p-8 md:p-10 shadow-2xl border border-white/5 overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {step === "form" ? (
              <div className="space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-white tracking-tight">Reserve a Table</h2>
                  <p className="text-gray-400">Join us for an unforgettable evening.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={16} />
                        <input
                          type="text"
                          defaultValue="Oct 24, 2026"
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-accent/50 outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={16} />
                        <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-accent/50 outline-none appearance-none">
                          <option>2 People</option>
                          <option>4 People</option>
                          <option>6+ People</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-500 font-bold">Preferred Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={16} />
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:border-accent/50 outline-none appearance-none">
                        <option>19:00</option>
                        <option>20:00</option>
                        <option>21:00</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button type="submit" className="w-full h-14 bg-accent hover:bg-accent-hover text-background rounded-xl font-bold">
                      Confirm Availability
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 space-y-6"
              >
                <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="text-accent" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white">Table Reserved!</h2>
                <p className="text-gray-400 max-w-xs mx-auto">
                  Your reservation is confirmed. We&apos;ve sent the details to your registered email.
                </p>
                <div className="pt-6">
                  <Button onClick={handleClose} variant="outline" className="min-w-[160px] border-accent/20 text-accent">
                    Return to Menu
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
