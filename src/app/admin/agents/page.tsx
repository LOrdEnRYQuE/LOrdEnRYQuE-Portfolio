"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus, MessageSquare, Code, Trash2, 
  Loader2, Bot, AlertCircle,
  Search, Layout, Zap, RefreshCcw, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { AgentConfig } from "@/components/ui/AIConcierge";

interface Agent {
  _id: string;
  name: string;
  personality: string;
  config: AgentConfig;
  status: string;
  _creationTime: number;
  lastProcessedAt?: string;
  _count?: {
    conversations: number;
  };
}

export default function AgentDashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const totalConversations = agents.reduce((acc, agent) => acc + (agent._count?.conversations || 0), 0);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/agents");
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAgents(data);
    } catch (err) {
      setError("Failed to load agents. Please try again later.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this agent? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/agents/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setAgents(prev => prev.filter(a => a._id !== id));
      setSelectedIds(prev => prev.filter(i => i !== id));
    } catch (err) {
      alert("Failed to delete agent.");
      console.error(err);
    }
  };

  const handleMassDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} agents? This action cannot be undone.`)) return;
    
    try {
      // Parallel deletes for now as we don't have a bulk API endpoint
      await Promise.all(selectedIds.map(id => fetch(`/api/agents/${id}`, { method: "DELETE" })));
      setAgents(prev => prev.filter(a => !selectedIds.includes(a._id)));
      setSelectedIds([]);
    } catch (err) {
      alert("Failed to delete some agents.");
      console.error(err);
    }
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredAgents = agents.filter(agent => 
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.personality.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent text-white p-8 sm:p-12 lg:p-16 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Selection Toolbar */}
        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 px-8 py-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex items-center gap-8"
            >
              <div className="flex items-center gap-3 pr-8 border-r border-white/10">
                <div className="w-8 h-8 rounded-lg bg-accent text-background flex items-center justify-center text-xs font-black">
                  {selectedIds.length}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Nodes Selected</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleMassDelete}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
                >
                  <Trash2 size={16} /> Batch Purge
                </button>
                <button 
                  onClick={() => setSelectedIds([])}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-[0.2em]">
               <Bot size={10} /> Fleet Synchronization Active
            </div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase italic leading-none">
              Agent <span className="text-accent underline underline-offset-8">Fleet</span>
            </h1>
            <p className="text-white/40 text-sm max-w-xl leading-relaxed italic border-l-2 border-white/5 pl-4">
              Deploying and regulating independent neural entities across the digital ecosystem. Protocol: High-Performance Autonomy.
            </p>
          </div>
          
          <Link 
            href="/admin/agents/generate" 
            className="px-10 py-5 bg-accent text-background rounded-2xl font-black text-xs hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-accent-glow-lg group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-[-20deg]" />
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500 relative z-10" />
            <span className="relative z-10 uppercase tracking-widest">Forge New Agent</span>
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Active Nodes", value: agents.filter(a => a.status === 'ACTIVE').length, color: "text-accent", icon: Zap },
            { label: "Inbound Synapses", value: totalConversations, color: "text-white/20", icon: MessageSquare },
            { 
              label: "Global Status", 
              value: agents.every(a => a.status === 'ACTIVE') ? "Sync Optimal" : "Partial Sync", 
              color: agents.every(a => a.status === 'ACTIVE') ? "text-emerald-400" : "text-amber-400", 
              icon: ShieldCheck 
            },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-10 rounded-[32px] border-white/5 space-y-3 group hover:border-white/10 transition-all">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{stat.label}</p>
                <stat.icon size={14} className="text-white/10 group-hover:text-accent transition-colors" />
              </div>
              <p className={`text-4xl font-black italic tracking-tighter ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search & Intelligence Controls */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="relative group flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search fleet database by name or identifier..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-3xl py-6 pl-16 pr-8 text-xs font-bold uppercase tracking-widest outline-none focus:border-accent/30 focus:bg-white/7 transition-all placeholder:text-white/10"
            />
          </div>
          <button 
            onClick={() => setSelectedIds(selectedIds.length === filteredAgents.length ? [] : filteredAgents.map(a => a._id))}
            className="px-8 py-6 bg-white/5 border border-white/5 rounded-3xl text-[10px] font-black uppercase tracking-widest text-white/20 hover:text-white hover:border-white/10 transition-all flex items-center gap-3"
          >
             <Layout size={16} /> {selectedIds.length === filteredAgents.length ? 'Deselect All' : 'Select Fleet'}
          </button>
        </div>

        {/* Agents Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-6">
            <div className="relative">
               <Loader2 size={64} className="animate-spin text-accent" />
               <div className="absolute inset-0 blur-2xl bg-accent/20 animate-pulse" />
            </div>
            <p className="text-white/20 font-black uppercase tracking-[0.4em] text-[10px] animate-pulse">Syncing with AI Core...</p>
          </div>
        ) : error ? (
          <div className="glass-card p-16 rounded-[48px] border-red-500/10 text-center space-y-6 bg-red-500/2">
            <AlertCircle size={64} className="mx-auto text-red-500/50" />
            <div className="space-y-2">
              <p className="text-xl font-black uppercase italic tracking-tight">{error}</p>
              <p className="text-xs text-white/20 uppercase font-bold tracking-widest">Check system logs for decryption errors</p>
            </div>
            <button onClick={fetchAgents} className="px-8 py-4 rounded-2xl bg-white/5 text-accent text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all">Reorder Connection</button>
          </div>
        ) : filteredAgents.length === 0 ? (
          <div className="glass-card p-32 rounded-[48px] border-white/5 text-center space-y-8 bg-white/1">
            <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto text-white/5 mb-4 group-hover:scale-110 transition-all border border-white/5 underline decoration-accent underline-offset-8">
              <Bot size={48} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black tracking-tighter uppercase italic">No Nodes Detected</h3>
              <p className="text-white/30 max-w-sm mx-auto text-xs uppercase font-bold tracking-widest leading-loose">
                The neural database is currently vacant. Begin forging your first autonomous entity to populate the fleet.
              </p>
            </div>
            <Link href="/admin/agents/generate" className="inline-flex items-center gap-3 text-accent text-[10px] font-black uppercase tracking-[0.4em] px-8 py-4 rounded-2xl border border-accent/20 hover:bg-accent/5 transition-all">
              Initialize Neural Forge <Plus size={16} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <AnimatePresence mode="popLayout">
              {filteredAgents.map((agent) => (
                <motion.div
                  key={agent._id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  onClick={() => toggleSelection(agent._id)}
                  className={`glass-card-hover group rounded-[48px] p-10 border flex flex-col gap-10 transition-all hover:bg-white/3 shadow-2xl shadow-black relative overflow-hidden cursor-pointer ${
                    selectedIds.includes(agent._id) ? 'border-accent bg-accent/2' : 'border-white/5'
                  }`}
                >
                  {/* Subtle Background Accent */}
                  <div 
                    className="absolute -top-24 -right-24 w-64 h-64 blur-[100px] opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
                    style={{ backgroundColor: agent.config?.branding?.primaryColor || 'var(--accent)' }}
                  />

                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <div 
                          className="w-16 h-16 rounded-3xl flex items-center justify-center text-background shadow-2xl relative z-10"
                          style={{ backgroundColor: agent.config?.branding?.primaryColor || 'var(--accent)' }}
                        >
                          <Bot size={32} />
                        </div>
                        <div 
                          className="absolute inset-0 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition-all"
                          style={{ backgroundColor: agent.config?.branding?.primaryColor || 'var(--accent)' }}
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-black border-2 border-background flex items-center justify-center z-20">
                           <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-black tracking-tighter uppercase italic text-white group-hover:text-accent transition-colors">
                          {agent.name}
                        </h3>
                        <div className="flex items-center gap-3">
                           <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{agent.status}</span>
                           <span className="w-1 h-1 rounded-full bg-white/10" />
                           <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{formatDistanceToNow(new Date(agent._creationTime))} ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-4 items-center">
                      <div className={`w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedIds.includes(agent._id) ? 'bg-accent border-accent text-background' : 'border-white/10'
                      }`}>
                        {selectedIds.includes(agent._id) && <Plus size={14} className="rotate-45" />}
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleDelete(agent._id); }}
                        className="p-4 rounded-2xl bg-white/5 text-white/10 hover:bg-red-500/10 hover:text-red-400 transition-all border border-white/5 shadow-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10 flex-1">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-accent/40">
                       <RefreshCcw size={10} className="animate-spin-slow" /> Entity Signature
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed font-bold italic line-clamp-3 group-hover:text-white/60 transition-colors">
                      &quot;{agent.personality}&quot;
                    </p>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-4">
                       <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2">
                          <MessageSquare size={14} className="text-white/20" />
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{agent._count?.conversations || 0}</span>
                       </div>
                    </div>
                    
                    <div className="flex items-center gap-3 w-full sm:w-auto" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        href={`/admin/agents/${agent._id}/edit`}
                        className="flex-1 sm:flex-none text-center px-8 py-4 bg-white/5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] border border-white/5 hover:bg-accent hover:text-background hover:border-accent transition-all shadow-xl"
                      >
                        Manage Node
                      </Link>
                      <Link 
                        href={`/admin/agents/${agent._id}/integrate`}
                        className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:text-accent transition-all hover:bg-white/10"
                        title="Integration SDK"
                      >
                        <Code size={18} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
