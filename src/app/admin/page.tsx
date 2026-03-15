"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Activity, 
  Bot, 
  MessageSquare, 
  Zap, 
  ShieldCheck,
  Cpu,
  History,
  Terminal,
  Image as ImageIcon,
  ArrowUpRight,
  Briefcase,
  FileText
} from "lucide-react";
import Link from "next/link";

interface Stats {
  agents: number;
  conversations: number;
  leads: number;
  assets: number;
  portfolio: number;
  health: string;
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats>({ agents: 0, conversations: 0, leads: 0, assets: 0, portfolio: 0, health: "OPTIMAL" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
          const agentsRes = await fetch("/api/agents");
          const agentsData = await agentsRes.json();
          
          const leadsRes = await fetch("/api/admin/leads");
          const leadsData = await leadsRes.json();
          
          const mediaRes = await fetch("/api/admin/media");
          const mediaData = await mediaRes.json();
          
          const portfolioRes = await fetch("/api/portfolio");
          const portfolioData = await portfolioRes.json();

          const totalConvs = Array.isArray(agentsData) ? agentsData.reduce((acc: number, agent: { _count?: { conversations: number } }) => acc + (agent._count?.conversations || 0), 0) : 0;
          
          setStats({
            agents: Array.isArray(agentsData) ? agentsData.length : 0,
            conversations: totalConvs,
            leads: Array.isArray(leadsData) ? leadsData.length : 0,
            assets: Array.isArray(mediaData) ? mediaData.length : 0,
            portfolio: Array.isArray(portfolioData) ? portfolioData.length : 0,
            health: "OPTIMAL"
          });
      } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const metrics = [
    { label: "Neural Nodes", value: stats.agents, icon: Bot, trend: "Active fleet", color: "text-accent" },
    { label: "Data Flux", value: stats.conversations, icon: MessageSquare, trend: "Synced to core", color: "text-emerald-400" },
    { label: "Lead Synapses", value: stats.leads, icon: Zap, trend: "Pulse active", color: "text-accent" },
    { label: "Vault Assets", value: stats.assets, icon: ShieldCheck, trend: "Encryption active", color: "text-accent" },
    { label: "Portfolio Hub", value: stats.portfolio, icon: Briefcase, trend: "Projects live", color: "text-emerald-400" },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden selection:bg-accent/30 selection:text-white">
      {/* Neural Background Sweep */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-accent/40 to-transparent animate-scan pointer-events-none z-50" />
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(var(--accent) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-[9px] font-black uppercase tracking-[0.3em] shadow-accent-glow-sm"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Neural Link: Level 4 Oversight
            </motion.div>
            <div className="space-y-1">
              <h1 className="text-6xl sm:text-7xl font-black tracking-tighter uppercase italic leading-[0.8] flex flex-col">
                <span className="text-white/20 text-2xl not-italic tracking-[0.2em] mb-2 font-black antialiased">L&apos;ORDRE</span>
                <span className="relative inline-block">
                  Neural <span className="text-accent underline decoration-4 underline-offset-12">Command</span>
                </span>
              </h1>
            </div>
            <p className="text-white/40 text-sm max-w-xl leading-relaxed italic border-l-2 border-accent/20 pl-6 ml-1 py-1 font-medium antialiased">
              Synthesized oversight of active neural nodes and cross-entity engagement. System flux is initialized and synchronized with the AI Core.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right hidden sm:block space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Operational Status</p>
              <div className="flex items-center justify-end gap-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-emerald-glow" />
                 <p className="text-xs font-black text-emerald-400 uppercase tracking-widest">Core Synchronized</p>
              </div>
            </div>
            <div className="w-16 h-16 rounded-4xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shadow-accent-glow-sm group hover:scale-105 transition-transform duration-500">
               <ShieldCheck size={32} className="group-hover:drop-shadow-accent transition-all" />
            </div>
          </div>
        </div>

        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((m, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="glass-card p-10 rounded-[3rem] border-white/5 space-y-6 group hover:bg-white/3 hover:border-accent/30 transition-all duration-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 blur-2xl rounded-full -translate-y-12 translate-x-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
              
              <div className="flex items-start justify-between relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white/30 group-hover:text-accent group-hover:border-accent/30 group-hover:shadow-accent-glow-sm flex items-center justify-center transition-all duration-500">
                  <m.icon size={24} />
                </div>
                <div className="flex items-center gap-2 text-white/20 group-hover:text-accent/60 text-[8px] font-black uppercase tracking-[0.2em] transition-colors">
                  {m.trend}
                  <ArrowUpRight size={10} />
                </div>
              </div>
              
              <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 group-hover:text-white/40 transition-colors">{m.label}</p>
                <p className={`text-4xl font-black tracking-tighter ${m.color} group-hover:scale-110 origin-left transition-transform duration-500`}>
                  {loading ? "..." : m.value}
                </p>
              </div>
              
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
                 <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1 + (i * 0.2), duration: 2 }}
                  className="h-full bg-linear-to-r from-accent/0 via-accent/40 to-accent/80" 
                 />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Neural Pulse Area */}
          <div className="lg:col-span-2 glass-card rounded-[4rem] border-white/5 p-12 space-y-12 min-h-[500px] flex flex-col justify-between overflow-hidden relative group">
             {/* Background Scanner Line for this card */}
             <div className="absolute inset-y-0 left-0 w-px bg-accent/10 group-hover:translate-x-[600px] transition-transform duration-3000 ease-in-out pointer-events-none" />
             
             <div className="absolute bottom-0 right-0 p-16 opacity-[0.03] scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <Cpu size={300} />
             </div>
             
             <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full bg-accent relative">
                    <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75" />
                  </div>
                  <h3 className="text-2xl font-black tracking-tighter uppercase italic text-white/90">Engagement Synchronicity</h3>
                </div>
                <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] border-l border-white/10 pl-6 ml-1.5 py-1">Cross-Node Pulse Feedback // Neural Flux Monitoring</p>
             </div>

             <div className="flex-1 flex items-end gap-3 h-56 pb-8 px-4">
                {[45, 75, 55, 95, 85, 90, 40, 65, 85, 70, 100, 55, 85, 60, 80].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${h}%`, opacity: 1 }}
                    transition={{ delay: 0.5 + (i * 0.05), duration: 1.5, ease: "anticipate" }}
                    className={`flex-1 rounded-2xl bg-linear-to-t from-accent/0 via-accent/10 to-accent/40 border-t border-accent/50 relative group bg-black/20`}
                  >
                    <div className="absolute inset-0 bg-accent blur-[20px] opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    {i === 10 && <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-accent-glow-sm" />}
                  </motion.div>
                ))}
             </div>

             <div className="flex items-center justify-between pt-10 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-10">
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-accent shadow-accent-glow-sm" />
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Active Sync Flow</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-white/5 shadow-inner" />
                      <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Neural Resting State</span>
                   </div>
                </div>
                <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-white/10 hover:text-accent transition-colors cursor-pointer group/link">
                   Initialize Deep Analytics <ArrowUpRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                </div>
             </div>
          </div>

          {/* Activity Flux Stream */}
          <div className="glass-card rounded-[4rem] border-white/5 p-12 flex flex-col h-full relative overflow-hidden group">
            <div className="absolute inset-0 bg-linear-to-b from-accent/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/5 text-white/40">
                  <History size={20} />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white antialiased">Neural Flux</h3>
                  <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mt-1 italic">Real-time Stream</p>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-widest animate-pulse">
                Active
              </div>
            </div>

            <div className="flex-1 space-y-8 overflow-y-auto pr-4 custom-scrollbar relative z-10">
              {[
                { type: "node", msg: "Neural Node 'Creative Director' initialized successfully.", time: "2 MIN", icon: Bot, status: "ACTIVE" },
                { type: "lead", msg: "New synapse recorded: Enterprise inquiry from Global Dynamics.", time: "18 MIN", icon: Zap, status: "LOCKED" },
                { type: "media", msg: "Batch processing completed in Media Vault. 14 new assets ingested.", time: "45 MIN", icon: ImageIcon, status: "SYNCED" },
                { type: "sys", msg: "Global Command Interface upgraded to v3.0 (Neural Update).", time: "1 HOUR", icon: Terminal, status: "DONE" },
                { type: "auth", msg: "Security handshake verified. Level 4 encrypted link active.", time: "3 HOURS", icon: ShieldCheck, status: "OPTIMAL" },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + (i * 0.1), duration: 0.6 }}
                  className="flex gap-6 group/item relative"
                >
                   <div className="absolute left-6 top-12 bottom-0 w-px bg-white/5 group-last:hidden" />
                   
                   <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover/item:text-accent group-hover/item:border-accent/30 group-hover/item:shadow-accent-glow-sm transition-all duration-500">
                        <item.icon size={18} />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-black border-2 border-white/10 group-hover/item:border-accent/20" />
                   </div>
                   
                   <div className="flex-1 min-w-0 space-y-1.5 pt-1">
                     <div className="flex items-center justify-between">
                       <p className="text-[8px] font-black text-accent/40 uppercase tracking-[0.3em]">{item.status}</p>
                       <p className="text-[8px] font-black text-white/10 uppercase tracking-widest">{item.time}</p>
                     </div>
                     <p className="text-[11px] font-bold text-white/60 leading-relaxed group-hover/item:text-white transition-colors antialiased">
                       {item.msg}
                     </p>
                   </div>
                </motion.div>
              ))}
            </div>

            <Link href="/admin/leads" className="mt-12 pt-8 border-t border-white/5 w-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-white/10 hover:text-accent transition-all duration-500 group/footer relative z-10">
              <Activity size={14} className="group-hover/footer:animate-spin" />
              Access Unified Data Stream
            </Link>
          </div>
        </div>

        {/* Global Quick Commands */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 border-t border-white/5 relative">
           <p className="absolute -top-3 left-1/2 -translate-x-1/2 px-6 bg-[#050505] text-[9px] font-black uppercase tracking-[0.5em] text-white/10">Quick Diagnostics</p>
           {[
            { label: "Neural Forge", icon: Cpu, href: "/admin/agents/generate", detail: "Generate Nodes" },
            { label: "Media Vault", icon: ImageIcon, href: "/admin/media", detail: "Asset Control" },
            { label: "Lead Hub", icon: Zap, href: "/admin/leads", detail: "CRM Engagement" },
            { label: "Portfolio Hub", icon: Briefcase, href: "/admin/portfolio", detail: "Showcase Management" },
            { label: "Neural Blog", icon: FileText, href: "/admin/blog", detail: "Neural Updates" },
            { label: "Settings", icon: Terminal, href: "/admin/settings", detail: "System Core" },
           ].map((cmd) => (
             <Link 
              key={cmd.label}
              href={cmd.href}
               className="px-8 py-5 bg-white/2 border border-white/5 rounded-4xl flex items-center gap-4 hover:bg-white/5 hover:border-accent/40 hover:shadow-accent-glow-subtle transition-all group min-w-[200px]"
             >
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20 group-hover:text-accent group-hover:bg-accent/10 transition-all">
                 <cmd.icon size={20} />
               </div>
               <div className="text-left">
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-white transition-colors">{cmd.label}</p>
                 <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{cmd.detail}</p>
               </div>
             </Link>
           ))}
        </div>
      </div>
    </div>
  );
}
