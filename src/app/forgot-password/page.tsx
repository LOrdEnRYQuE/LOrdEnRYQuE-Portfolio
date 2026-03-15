"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Mail, ArrowRight, ShieldCheck, Activity, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (res.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error("Recovery request failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080B10] flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-accent/2 flex items-center justify-center pointer-events-none">
        <div className="w-full h-full bg-accent-radial" />
      </div>

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex p-3 rounded-2xl bg-accent/10 text-accent mb-4 border border-accent/20"
          >
            <ShieldCheck size={24} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-black text-white tracking-tighter uppercase italic"
          >
            Recovery <span className="text-accent underline underline-offset-4">Protocol</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]"
          >
            Initialize credential synchronization sequence
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 rounded-[40px] border-white/5 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-widest ml-2 flex items-center gap-2">
                    <Mail size={12} /> Personnel Identifier (Email)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-sm focus:border-accent outline-none transition-all placeholder:text-white/10"
                    placeholder="Enter your registered node..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-2xl py-6 font-black uppercase tracking-[0.2em] group"
                >
                  <span className="flex items-center justify-center gap-3">
                    {loading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Emit Recovery Signal
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                </Button>

                <div className="pt-4 text-center">
                  <Link 
                    href="/login" 
                    className="text-[9px] font-black text-white/20 hover:text-white transition-colors uppercase tracking-[0.3em] flex items-center justify-center gap-2"
                  >
                    <ChevronLeft size={12} /> Return to Access Terminal
                  </Link>
                </div>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-center space-y-6 py-4"
              >
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
                  <Activity size={32} className="animate-pulse" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-black uppercase tracking-tight italic text-emerald-400">Signal Emitted</h3>
                  <p className="text-[11px] font-bold text-white/40 uppercase leading-relaxed tracking-wider">
                    Operational recovery directives have been dispatched to your communication node.
                  </p>
                </div>
                <div className="h-px bg-white/5 w-full" />
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-2 text-[10px] font-black text-accent hover:text-white transition-colors uppercase tracking-[0.3em]"
                >
                  <ChevronLeft size={14} /> Back to Terminal
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="flex justify-center gap-8 opacity-20">
           <div className="h-px w-12 bg-white" />
           <div className="h-px w-12 bg-white" />
        </div>
      </div>
    </div>
  );
}
