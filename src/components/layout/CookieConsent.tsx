"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, X, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function CookieConsent() {
  const { t } = useI18n();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 w-[calc(100%-2rem)] max-w-lg"
        >
          <div className="glass-card p-6 rounded-4xl border-accent/20 bg-background/80 backdrop-blur-xl shadow-2xl shadow-accent/10 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 shadow-accent-glow-sm">
              <Shield size={24} />
            </div>

            <div className="flex-1 text-center md:text-left space-y-1 relative z-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-white/90">
                {t("cookie.title")}
              </h4>
              <p className="text-xs text-white/50 leading-relaxed font-medium">
                {t("cookie.description")}
              </p>
            </div>

            <div className="flex items-center gap-3 relative z-10">
              <button
                onClick={handleDecline}
                className="px-4 py-2 rounded-xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white hover:bg-white/5 transition-all"
              >
                {t("cookie.decline")}
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2 rounded-xl bg-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-accent/80 transition-all shadow-lg shadow-accent/20 flex items-center gap-2"
              >
                <Check size={12} /> {t("cookie.accept")}
              </button>
            </div>

            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-white/10 hover:text-white/40 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
