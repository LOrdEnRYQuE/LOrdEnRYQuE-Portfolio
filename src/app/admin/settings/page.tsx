"use client";

import { useState, useEffect } from "react";
import { 
  Save, 
  RefreshCcw, 
  Globe, 
  Palette, 
  ShieldAlert, 
  Zap,
  Layout,
  Terminal,
  Database,
  Cloud,
  CheckCircle2,
  Search,
  Share2,
  Image as ImageIcon
} from "lucide-react";

export default function GlobalSettings() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [config, setConfig] = useState({
    siteName: "LOrdEnRYQuE AI",
    maintenanceMode: false,
    primaryAccent: "#7C3AED",
    dataRetention: "90",
    apiLogging: true,
    neuralSync: "OPTIMAL",
    seoTitle: "LOrdEnRYQuE | Advanced Neural Architecture",
    seoDescription: "Pioneering the future of AI-driven brand identity and systems.",
    ogImage: "/og-image.jpg"
  });

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/admin/settings");
        if (res.ok) {
          const data = await res.json();
          if (Object.keys(data).length > 0) {
            setConfig((prev: Record<string, string | boolean | number>) => ({
              ...prev,
              ...data,
              maintenanceMode: data.maintenanceMode === "true",
              apiLogging: data.apiLogging === "true",
            }));
          }
        }
      } catch (e) {
        console.error("Failed to fetch config", e);
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
      console.error("Failed to save settings", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-12 lg:p-16 space-y-12 relative overflow-hidden">
      {/* Neural Background Flux */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-accent/20 to-transparent animate-sweep opacity-20" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-linear-to-r from-transparent via-accent/10 to-transparent animate-sweep-reverse opacity-10" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-[0.2em] animate-pulse">
            <div className="w-1 h-1 rounded-full bg-accent" />
            System Configuration Protocol
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">
            Global <span className="text-accent underline underline-offset-12 decoration-accent/30">Settings</span>
          </h1>
          <p className="text-white/40 text-sm max-w-xl leading-relaxed italic border-l-2 border-white/5 pl-6 ml-1 font-medium">
            Calibrating site-wide parameters, visual branding constants, and core operational thresholds of the L&apos;ORDRE neural link.
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
            {loading ? "Syncing..." : saved ? "Config Secured" : "Commit Changes"}
          </span>
          {!saved && !loading && (
            <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10">
        <div className="lg:col-span-2 space-y-12">
          {/* General Config */}
          <div className="glass-card rounded-[3rem] border-white/5 p-12 space-y-12 bg-black/40 backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em]">Platform Identity</h3>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Core system identifiers</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Node Designation</label>
                  <input 
                    type="text" 
                    value={config.siteName}
                    onChange={(e) => setConfig({...config, siteName: e.target.value})}
                    className="w-full bg-white/3 border border-white/5 rounded-2xl px-8 py-5 text-sm font-bold focus:outline-hidden focus:border-accent/40 focus:bg-white/5 focus:shadow-accent-glow transition-all placeholder:text-white/10"
                    placeholder="Enter site name..."
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Accent Vector</label>
                  <div className="flex gap-4">
                    <div className="relative group">
                      <input 
                        type="color" 
                        value={config.primaryAccent}
                        onChange={(e) => setConfig({...config, primaryAccent: e.target.value})}
                        className="w-16 h-16 rounded-2xl bg-transparent border-none cursor-pointer p-0 opacity-0 absolute inset-0 z-10"
                      />
                      <div 
                        className="w-16 h-16 rounded-2xl border-2 border-white/10 shadow-lg group-hover:scale-105 transition-transform"
                        style={{ backgroundColor: config.primaryAccent }}
                      />
                    </div>
                    <input 
                      type="text" 
                      value={config.primaryAccent}
                      onChange={(e) => setConfig({...config, primaryAccent: e.target.value})}
                      className="flex-1 bg-white/3 border border-white/5 rounded-2xl px-8 py-5 text-sm font-bold focus:outline-hidden focus:border-accent/40 focus:bg-white/5 transition-all uppercase tracking-widest"
                    />
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between p-8 bg-white/2 border border-white/5 rounded-[32px] group hover:border-amber-500/30 transition-all hover:bg-amber-500/2">
               <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-amber-400 group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-all">
                     <ShieldAlert size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2 group-hover:text-amber-400 transition-colors">Maintenance Protocol</h4>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter max-w-xs leading-relaxed">Instantly redirect all external traffic to the static calibration interface.</p>
                  </div>
               </div>
               <button 
                onClick={() => setConfig({...config, maintenanceMode: !config.maintenanceMode})}
                className={`w-16 h-9 rounded-full transition-all relative p-1.5 ${config.maintenanceMode ? 'bg-amber-500 shadow-amber-glow' : 'bg-white/10'}`}
               >
                  <div className={`w-6 h-6 rounded-full bg-white shadow-lg transition-all transform ${config.maintenanceMode ? 'translate-x-7' : 'translate-x-0'}`} />
               </button>
            </div>
          </div>

          {/* Operational Config */}
          <div className="glass-card rounded-[3rem] border-white/5 p-12 space-y-12 bg-black/40 backdrop-blur-3xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                    <Database size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-[0.3em]">Operational Thresholds</h3>
                    <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Data cycle calibrations</p>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Data Retention Policy</label>
                    <div className="relative">
                      <select 
                        value={config.dataRetention}
                        onChange={(e) => setConfig({...config, dataRetention: e.target.value})}
                        className="w-full bg-white/3 border border-white/5 rounded-2xl px-8 py-5 text-sm font-bold focus:outline-hidden focus:border-accent/40 focus:bg-white/5 transition-all appearance-none cursor-pointer"
                      >
                        <option value="30">30 Neural Cycles (Days)</option>
                        <option value="90">90 Neural Cycles (Days)</option>
                        <option value="365">365 Neural Cycles (Yearly)</option>
                        <option value="999">Maximum Persistence (Indefinite)</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                        <RefreshCcw size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-6 bg-white/2 border border-white/5 rounded-2xl group hover:border-accent/30 transition-all">
                    <div className="flex items-center gap-3">
                      <Terminal size={16} className="text-white/20 group-hover:text-accent transition-colors" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white/60 transition-colors">Systemic API Logging</span>
                    </div>
                    <button 
                      onClick={() => setConfig({...config, apiLogging: !config.apiLogging})}
                      className={`w-12 h-6 rounded-full transition-all relative p-1 ${config.apiLogging ? 'bg-accent shadow-accent-glow-sm' : 'bg-white/10'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-md transition-all transform ${config.apiLogging ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                  </div>
               </div>

               <div className="p-8 bg-accent/3 border border-accent/20 rounded-[32px] flex flex-col justify-between relative overflow-hidden group">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-2 h-2 rounded-full bg-accent animate-ping" />
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-accent">Neural Sync Active</span>
                    </div>
                    <p className="text-[12px] text-white/50 leading-relaxed italic font-medium">
                      &quot;All core parameters are currently synchronizing with the decentralized node network. Data flux is within optimal ranges for Level 4 oversight.&quot;
                    </p>
                  </div>
                  <div className="relative z-10 mt-8 pt-6 border-t border-accent/10">
                     <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-accent/40">
                        <span>Cluster: Gamma-12</span>
                        <span>Latency: 0.04ms</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* SEO & Discovery */}
          <div className="glass-card rounded-[3rem] border-white/5 p-12 space-y-12 bg-black/40 backdrop-blur-3xl">
            <div className="flex items-center gap-4 border-b border-white/5 pb-8">
               <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                 <Search size={24} />
               </div>
               <div>
                 <h3 className="text-sm font-black uppercase tracking-[0.3em]">SEO & Discovery</h3>
                 <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-1">Neural search prioritization</p>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Meta Title Template</label>
                  <input 
                    type="text" 
                    value={config.seoTitle}
                    onChange={(e) => setConfig({...config, seoTitle: e.target.value})}
                    className="w-full bg-white/3 border border-white/5 rounded-2xl px-8 py-5 text-sm font-bold focus:outline-hidden focus:border-accent/40 focus:bg-white/5 transition-all"
                  />
               </div>
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ml-2">Meta Description</label>
                  <textarea 
                    rows={4}
                    value={config.seoDescription}
                    onChange={(e) => setConfig({...config, seoDescription: e.target.value})}
                    className="w-full bg-white/3 border border-white/5 rounded-2xl px-8 py-5 text-sm font-bold focus:outline-hidden focus:border-accent/40 focus:bg-white/5 transition-all resize-none leading-relaxed"
                  />
               </div>
            </div>

            <div className="p-8 bg-white/2 border border-white/5 rounded-[32px] space-y-6 group hover:border-accent/20 transition-all">
               <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <Share2 size={18} className="text-accent" />
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">OpenGraph Preview</span>
                 </div>
                 <div className="text-[8px] font-black uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    Live Syncing
                 </div>
               </div>
               <div className="flex flex-col md:flex-row gap-8 p-8 rounded-4xl bg-black/40 border border-white/5 shadow-2xl group-hover:shadow-accent/5 transition-all">
                  <div className="w-full md:w-48 h-48 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center overflow-hidden relative group/img">
                     <ImageIcon size={48} className="text-white/10 group-hover/img:scale-110 transition-transform duration-700" />
                     <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="flex-1 space-y-4 justify-center flex flex-col">
                     <p className="text-lg font-black uppercase tracking-tighter text-accent italic leading-tight">{config.seoTitle}</p>
                     <p className="text-sm text-white/40 font-medium leading-relaxed italic">&quot;{config.seoDescription}&quot;</p>
                     <div className="pt-4 flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                        </div>
                        <p className="text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">L&apos;ORDRE DIGITAL ASSET</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          <div className="glass-card rounded-[3rem] border-white/5 p-12 space-y-10 bg-black/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-8 border-b border-white/5 pb-4">Node Metrics</h3>
              <div className="space-y-8">
                 {[
                  { label: "Storage Load", val: "42%", icon: Database, color: "text-blue-400" },
                  { label: "Cloud Integrity", val: "99.9%", icon: Cloud, color: "text-emerald-400" },
                  { label: "Visual Fidelity", val: "High", icon: Palette, color: "text-purple-400" },
                  { label: "Terminal Res", val: "4K Node", icon: Terminal, color: "text-amber-400" },
                 ].map((m, i) => (
                   <div key={i} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center transition-colors ${m.color.replace('text-', 'bg-')}/10`}>
                           <m.icon size={16} className={`${m.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
                         </div>
                         <span className="text-[10px] font-black uppercase tracking-widest text-white/30 group-hover:text-white/60 transition-colors">{m.label}</span>
                      </div>
                      <span className="text-xs font-black text-white">{m.val}</span>
                   </div>
                 ))}
              </div>

              <div className="bg-accent/5 rounded-4xl p-8 border border-accent/10 mt-12 relative overflow-hidden group/diag">
                 <div className="absolute inset-0 bg-linear-to-tr from-accent/5 to-transparent opacity-0 group-hover/diag:opacity-100 transition-opacity" />
                 <div className="relative z-10">
                   <div className="flex items-center gap-3 mb-4">
                      <Zap size={18} className="text-accent animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Quick Diagnostic</span>
                   </div>
                   <p className="text-[10px] text-white/30 font-bold mb-8 leading-relaxed">Scan local clusters for configuration drift or potential data leakage across the neural link.</p>
                   <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] hover:bg-white/10 hover:border-accent/30 transition-all active:scale-95 shadow-lg">
                      Initialize Scan
                   </button>
                 </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[3rem] border-white/5 p-12 bg-linear-to-b from-transparent to-accent/5 border-t-accent/20">
             <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  <Layout size={20} />
                </div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Module Oversight</h3>
             </div>
             <div className="space-y-4">
                {['Admin Dashboard', 'Agent Fleet Manager', 'Lead Intake Hub', 'Personnel Oversight'].map((m) => (
                  <div key={m} className="flex items-center gap-4 group cursor-pointer">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent/30 group-hover:bg-accent transition-colors shadow-none group-hover:shadow-accent-glow-sm" />
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 group-hover:text-white/80 transition-all">{m}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
