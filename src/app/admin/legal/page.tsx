"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  RefreshCcw, 
  ShieldCheck, 
  Scale, 
  FileText, 
  CheckCircle2,
  Globe,
  Languages
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type LegalTab = "impressum" | "privacy" | "terms";

export default function AdminLegalPage() {
  const [activeTab, setActiveTab] = useState<LegalTab>("impressum");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          setConfig(data);
        }
      } catch (e) {
        console.error("Failed to fetch legal config", e);
      }
    }
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (e) {
      console.error("Failed to save legal settings", e);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: LegalTab; label: string; icon: React.ElementType }[] = [
    { id: "impressum", label: "Impressum", icon: ShieldCheck },
    { id: "privacy", label: "Privacy Policy", icon: FileText },
    { id: "terms", label: "Terms of Service", icon: Scale },
  ];

  return (
    <div className="min-h-screen p-8 sm:p-12 lg:p-16 space-y-12 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1/2 h-full bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-[0.2em] animate-pulse">
            <div className="w-1 h-1 rounded-full bg-accent" />
            Legal Compliance Protocol
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
            Legal <span className="text-accent underline underline-offset-12 decoration-accent/30">Oversight</span>
          </h1>
          <p className="text-white/40 text-sm max-w-xl leading-relaxed italic border-l-2 border-white/5 pl-6 ml-1 font-medium">
            Managing the neural link&apos;s legal framework. Updates to these documents are instantly synchronized across the global node network.
          </p>
        </div>

        <button 
          onClick={handleSave}
          disabled={loading}
          className={`px-10 py-5 rounded-2xl flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all group relative overflow-hidden ${
            saved ? 'bg-emerald-500 text-white shadow-emerald-glow' : 'bg-accent text-white hover:shadow-accent-glow-lg active:scale-95'
          }`}
        >
          {loading ? <RefreshCcw className="animate-spin" size={16} /> : saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          <span className="relative z-10">
            {loading ? "Syncing..." : saved ? "Commit Successful" : "Commit Changes"}
          </span>
          {!saved && !loading && (
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all text-left border ${
                  isActive 
                    ? "bg-accent/10 border-accent/30 text-accent shadow-accent-glow-sm" 
                    : "bg-white/3 border-white/5 text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon size={18} className={isActive ? "text-accent" : "text-white/20"} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Area */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card p-10 rounded-4xl border-white/5 space-y-12 relative overflow-hidden group min-h-[600px]"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    {activeTab === "impressum" && <ShieldCheck size={24} />}
                    {activeTab === "privacy" && <FileText size={24} />}
                    {activeTab === "terms" && <Scale size={24} />}
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em]">{activeTab} Framework</h3>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Manual Content Deployment</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {/* German Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Globe size={16} className="text-accent" />
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">German Version (Primary)</label>
                  </div>
                  <textarea
                    rows={12}
                    value={config[`legal_${activeTab}_de`] || ""}
                    onChange={(e) => setConfig({ ...config, [`legal_${activeTab}_de`]: e.target.value })}
                    className="w-full bg-white/3 border border-white/5 rounded-4xl px-8 py-8 text-sm font-medium focus:outline-hidden focus:border-accent/40 focus:bg-white/5 transition-all resize-none leading-relaxed placeholder:text-white/5"
                    placeholder={`Enter German ${activeTab} content...`}
                  />
                  <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest pl-4 leading-relaxed">
                    Note: This version is typically required for German and EU compliance.
                  </p>
                </div>

                {/* English Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Languages size={16} className="text-accent" />
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">English Version</label>
                  </div>
                  <textarea
                    rows={12}
                    value={config[`legal_${activeTab}_en`] || ""}
                    onChange={(e) => setConfig({ ...config, [`legal_${activeTab}_en`]: e.target.value })}
                    className="w-full bg-white/3 border border-white/5 rounded-4xl px-8 py-8 text-sm font-medium focus:outline-hidden focus:border-accent/40 focus:bg-white/5 transition-all resize-none leading-relaxed placeholder:text-white/5"
                    placeholder={`Enter English ${activeTab} content...`}
                  />
                  <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest pl-4 leading-relaxed">
                    Provides global accessibility for non-German speaking users.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
