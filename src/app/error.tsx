"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("System Error Overlay:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Neural Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent-blue/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full delay-700 animate-pulse" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-xl w-full p-12 rounded-3xl border border-border bg-surface/50 backdrop-blur-2xl relative z-10 text-center shadow-2xl"
      >
        <div className="mb-8 inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 border border-red-500/20 text-red-500">
          <AlertTriangle size={48} />
        </div>

        <h1 className="text-4xl font-black text-foreground mb-4 tracking-tight">
          System Breach Detected
        </h1>
        
        <p className="text-text-secondary mb-10 leading-relaxed max-w-sm mx-auto">
          The neural link encountered an unexpected exception. Our systems are attempting to stabilize the environment.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-foreground text-background font-bold hover:opacity-90 transition-all w-full sm:w-auto active:scale-95"
          >
            <RefreshCcw size={18} />
            Initialize Recovery
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border bg-surface text-foreground font-bold hover:border-border-strong transition-all w-full sm:w-auto active:scale-95"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>

        {error.digest && (
          <p className="mt-8 text-[10px] font-mono text-text-muted opacity-50 uppercase tracking-widest">
            Digest Code: {error.digest}
          </p>
        )}
      </motion.div>
    </div>
  );
}
