"use client";

import { motion } from "framer-motion";
import { 
  Save, ArrowLeft, Loader2, 
  Palette, Settings, CheckCircle2,
  BookOpen, Upload, Trash2, FileText,
  Plus, Share2, Code2, Copy, Sparkles, 
  RotateCcw, Monitor, Smartphone, QrCode
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AIConcierge, { AgentConfig } from "@/components/ui/AIConcierge";
import IconPicker from "@/components/admin/IconPicker";

interface KnowledgeDoc {
  id: string;
  fileName: string;
  type: string;
  content?: string;
  createdAt: string;
}

interface Agent {
  id: string;
  name: string;
  personality?: string;
  config: AgentConfig;
  status: string;
}

export default function AgentEditorPage({ params }: { params: Promise<{ agentId: string }> }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [config, setConfig] = useState<AgentConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"identity" | "presets" | "knowledge" | "integration">("identity");
  const [knowledge, setKnowledge] = useState<KnowledgeDoc[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [previewKey, setPreviewKey] = useState(0);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    params.then(({ agentId }) => {
      fetch(`/api/agents/${agentId}`)
        .then(res => res.json())
        .then(data => {
          setAgent(data);
          setConfig(data.config);
        });
      
      fetchKnowledge(agentId);
    });
  }, [params]);

  const fetchKnowledge = async (agentId: string) => {
    const res = await fetch(`/api/agents/${agentId}/knowledge`);
    if (res.ok) {
      const data = await res.json();
      setKnowledge(data);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    setIsSaving(true);
    setSaveStatus("idle");
    try {
      const { agentId } = await params;
      const res = await fetch(`/api/agents/${agentId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: config.name,
          personality: config.personality,
          config: JSON.stringify(config),
        }),
      });
      if (!res.ok) throw new Error("Failed to save");
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      setSaveStatus("error");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const { agentId } = await params;
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/agents/${agentId}/knowledge`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        fetchKnowledge(agentId);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const deleteKnowledge = async (docId: string) => {
    const { agentId } = await params;
    const res = await fetch(`/api/agents/${agentId}/knowledge/${docId}`, {
      method: "DELETE"
    });
    if (res.ok) {
      fetchKnowledge(agentId);
    }
  };

  const handleRefinePersonality = async () => {
    if (!config?.personality) return;
    setIsRefining(true);
    try {
      const { agentId } = await params;
      const res = await fetch(`/api/agents/${agentId}/refine`, {
        method: "POST",
        body: JSON.stringify({ personality: config.personality }),
      });
      if (res.ok) {
        const { refined } = await res.json();
        setConfig({ ...config, personality: refined });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsRefining(false);
    }
  };

  const getWordCount = (text?: string) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  if (!agent || !config) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 sm:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link
              href="/admin/agents"
              className="inline-flex items-center gap-2 text-xs font-bold text-white/50 hover:text-accent transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              BACK TO DASHBOARD
            </Link>
            <h1 className="text-4xl font-black tracking-tighter flex items-center gap-4">
              EDIT <span className="text-accent">{agent.name.toUpperCase()}</span>
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {saveStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest"
              >
                <CheckCircle2 size={16} />
                CONFIG SAVED
              </motion.div>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-8 py-4 bg-accent text-background rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-accent-glow-lg disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              SAVE CHANGES
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-white/5 rounded-2xl w-fit border border-white/5">
          {[
            { id: "identity", label: "Identity", icon: Settings },
            { id: "presets", label: "Presets", icon: Plus },
            { id: "knowledge", label: "Knowledge", icon: BookOpen },
            { id: "integration", label: "Integration", icon: Share2 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "identity" | "presets" | "knowledge" | "integration")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id ? "bg-accent text-background" : "text-white/40 hover:text-white"
              }`}
            >
              <tab.icon size={12} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Controls Section */}
          <div className="space-y-8">
            {activeTab === "identity" ? (
              <>
                {/* Identity Group */}
                <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-6">
                  <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                    <Settings size={14} />
                    Identity & Personality
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Agent Name</label>
                      <input
                        type="text"
                        value={config?.name || ""}
                        onChange={(e) => setConfig(prev => prev ? { ...prev, name: e.target.value } : null)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">System Personality</label>
                        <button
                          onClick={handleRefinePersonality}
                          disabled={isRefining || !config?.personality}
                          className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-accent hover:text-accent/80 disabled:opacity-30 transition-all"
                        >
                          {isRefining ? <Loader2 size={10} className="animate-spin" /> : <Sparkles size={10} />}
                          Refine with AI
                        </button>
                      </div>
                      <textarea
                        value={config?.personality || ""}
                        onChange={(e) => setConfig(prev => prev ? { ...prev, personality: e.target.value } : null)}
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent outline-none resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Custom Greeting</label>
                      <textarea
                        value={config?.greeting || ""}
                        onChange={(e) => setConfig(prev => prev ? { ...prev, greeting: e.target.value } : null)}
                        placeholder="Hello! How can I help you today?"
                        className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-accent outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Branding Group */}
                <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-6">
                  <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                    <Palette size={14} />
                    Branding & UI
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Primary Color</label>
                      <div className="flex gap-3">
                        <input
                          type="color"
                          value={config?.branding?.primaryColor || "#3b82f6"}
                          onChange={(e) => setConfig(prev => prev ? {
                            ...prev,
                            branding: { ...(prev.branding || {}), primaryColor: e.target.value } 
                          } : null)}
                          className="w-12 h-12 rounded-xl bg-transparent border-none cursor-pointer"
                        />
                        <input
                          type="text"
                          value={config?.branding?.primaryColor || "#3b82f6"}
                          onChange={(e) => setConfig(prev => prev ? {
                            ...prev,
                            branding: { ...(prev.branding || {}), primaryColor: e.target.value }
                          } : null)}
                          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-mono uppercase"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Agent Icon</label>
                      <IconPicker
                        value={config?.branding?.icon || "Bot"}
                        onChange={(icon: string) => setConfig(prev => prev ? {
                          ...prev,
                          branding: { ...(prev.branding || {}), icon }
                        } : null)}
                      />
                    </div>

                    <div className="space-y-2 col-span-2">
                      <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Visual Theme</label>
                      <div className="grid grid-cols-3 gap-3">
                        {['dark', 'light', 'glass'].map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setConfig(prev => prev ? {
                              ...prev,
                              branding: { ...(prev.branding || {}), theme: t as "dark" | "light" | "glass" }
                            } : null)}
                            className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                              (config.branding?.theme || 'dark') === t
                                ? "bg-accent text-background border-accent"
                                : "bg-white/5 text-white/40 border-white/5 hover:border-white/10"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : activeTab === "presets" ? (
              <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-6">
                <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                  <Plus size={14} />
                  Quick Reply Presets
                </div>

                <div className="space-y-4">
                  {(config.presets || []).map((preset, idx) => (
                    <div key={idx} className="flex gap-3 items-start group">
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          value={preset.label}
                              onChange={(e) => {
                                setConfig(prev => {
                                  if (!prev) return null;
                                  const newPresets = [...(prev.presets || [])];
                                  newPresets[idx] = { ...(newPresets[idx] || { label: "", query: "" }), label: e.target.value };
                                  return { ...prev, presets: newPresets };
                                });
                              }}
                          placeholder="Label (e.g. 'View Pricing')"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white outline-none focus:border-accent"
                        />
                        <input
                          type="text"
                          value={preset.query}
                              onChange={(e) => {
                                setConfig(prev => {
                                  if (!prev) return null;
                                  const newPresets = [...(prev.presets || [])];
                                  newPresets[idx] = { ...(newPresets[idx] || { label: "", query: "" }), query: e.target.value };
                                  return { ...prev, presets: newPresets };
                                });
                              }}
                          placeholder="Query (e.g. 'What are your pricing plans?')"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] text-white/60 outline-none focus:border-accent"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newPresets = (config.presets || []).filter((_, i) => i !== idx);
                          setConfig({ ...config, presets: newPresets });
                        }}
                        className="p-2 text-white/20 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const newPresets = [...(config.presets || []), { label: "", query: "" }];
                      setConfig({ ...config, presets: newPresets });
                    }}
                    className="w-full py-4 bg-white/5 border border-dashed border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={12} />
                    Add Preset
                  </button>
                </div>
              </div>
            ) : activeTab === "knowledge" ? (
              <div className="space-y-6">
                <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                      <BookOpen size={14} />
                      Document Knowledge
                    </div>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all flex items-center gap-2"
                    >
                      {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      Upload Document
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      className="hidden"
                      accept=".txt,.pdf"
                    />
                  </div>

                  <div className="space-y-3">
                    {knowledge.length === 0 ? (
                      <div className="py-12 text-center space-y-3 opacity-30">
                        <FileText size={32} className="mx-auto" />
                        <p className="text-[10px] font-black uppercase tracking-widest">No documents uploaded</p>
                      </div>
                    ) : (
                      knowledge.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                              <FileText size={16} />
                            </div>
                             <div>
                               <p className="text-xs font-bold truncate max-w-[200px]">{doc.fileName}</p>
                               <div className="flex items-center gap-2">
                                 <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">{doc.type.toUpperCase()}</p>
                                 <span className="w-1 h-1 rounded-full bg-white/10" />
                                 <p className="text-[10px] font-black text-accent/40 uppercase tracking-widest">{getWordCount(doc.content)} WORDS</p>
                               </div>
                             </div>
                          </div>
                          <button
                            onClick={() => deleteKnowledge(doc.id)}
                            className="p-2 text-white/10 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="p-6 bg-accent/5 rounded-3xl border border-accent/10">
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <Plus size={12} /> Pro Tip
                  </p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    Upload product catalogs, internal FAQs, or service guides. Your agent will prioritize information from these documents when answering visitor questions.
                  </p>
                </div>
              </div>
            ) : activeTab === "integration" ? (
              <div className="space-y-6">
                {/* Script Embed */}
                <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                      <Code2 size={14} />
                      Widget Script
                    </div>
                    <button
                      onClick={() => {
                        const code = `<script src="${window.location.origin}/api/agents/${agent?.id}/widget.js" async></script>`;
                        navigator.clipboard.writeText(code);
                        setCopied("script");
                        setTimeout(() => setCopied(null), 2000);
                      }}
                      className="text-accent hover:text-white transition-colors"
                    >
                      {copied === "script" ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="bg-black/40 rounded-2xl p-6 font-mono text-[10px] leading-relaxed text-white/60 break-all select-all">
                    {`<script src="${typeof window !== "undefined" ? window.location.origin : ""}/api/agents/${agent?.id}/widget.js" async></script>`}
                  </div>
                  <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">
                    Paste this code before the closing &lt;/body&gt; tag of your website.
                  </p>
                </div>

                <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                      <QrCode size={14} />
                      Share & QR
                    </div>
                    <Link 
                      href={`/agent/${agent?.id}`}
                      target="_blank"
                      className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent text-[10px] font-black uppercase tracking-widest rounded-lg transition-all flex items-center gap-2"
                    >
                      <Share2 size={12} />
                      Open Page
                    </Link>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-8 items-center">
                    <div className="bg-white p-4 rounded-3xl shrink-0">
                      <Image 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${typeof window !== "undefined" ? encodeURIComponent(`${window.location.origin}/agent/${agent?.id}`) : ""}`}
                        alt="Agent QR Code"
                        width={96}
                        height={96}
                        className="w-24 h-24"
                        unoptimized
                      />
                    </div>
                    <div className="space-y-4 w-full">
                      <p className="text-xs text-white/50 leading-relaxed">
                        Share this QR code with your team for mobile testing, or use the direct link to preview the full-screen branded experience.
                      </p>
                      <div className="bg-black/40 rounded-2xl p-4 font-mono text-[9px] leading-relaxed text-white/60 break-all select-all flex items-center justify-between gap-4">
                        <span className="truncate">{typeof window !== "undefined" ? `${window.location.origin}/agent/${agent?.id}` : ""}</span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/agent/${agent?.id}`);
                            setCopied("share");
                            setTimeout(() => setCopied(null), 2000);
                          }}
                          className="text-accent hover:text-white transition-colors"
                        >
                          {copied === "share" ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Iframe Embed */}
                <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                      <Code2 size={14} />
                      Iframe Embed
                    </div>
                    <button
                      onClick={() => {
                        const code = `<iframe src="${window.location.origin}/agent/${agent?.id}" width="100%" height="600" frameborder="0"></iframe>`;
                        navigator.clipboard.writeText(code);
                        setCopied("iframe");
                        setTimeout(() => setCopied(null), 2000);
                      }}
                      className="text-accent hover:text-white transition-colors"
                    >
                      {copied === "iframe" ? <CheckCircle2 size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <div className="bg-black/40 rounded-2xl p-6 font-mono text-[10px] leading-relaxed text-white/60 break-all select-all">
                    {`<iframe src="${typeof window !== "undefined" ? window.location.origin : ""}/agent/${agent?.id}" width="100%" height="600" frameborder="0"></iframe>`}
                  </div>
                </div>

                {/* API Info */}
                <div className="glass-card p-8 rounded-[32px] border-white/5 space-y-4 text-white/40">
                  <div className="flex items-center gap-3 text-accent/50 uppercase text-[10px] font-black tracking-[0.2em]">
                    <Settings size={14} />
                    API Endpoints
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase font-black tracking-widest">Base URL</p>
                      <div className="p-3 bg-white/5 rounded-xl text-[10px] font-mono select-all text-white/60">
                        {typeof window !== "undefined" ? `${window.location.origin}/api/agents/${agent?.id}/chat` : ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Platform Support */}
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'Shopify', icon: '🛍️', guide: 'Add script to theme.liquid' },
                    { name: 'Wordpress', icon: '📝', guide: 'Use Header/Footer Plugin' },
                    { name: 'Webflow', icon: '🌐', guide: 'Add to Custom Code section' }
                  ].map((p) => (
                    <div key={p.name} className="glass-card p-4 rounded-3xl border-white/5 text-center space-y-2 group hover:border-accent/30 transition-all cursor-help relative overflow-hidden">
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="text-xl relative z-10">{p.icon}</div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-white/60 relative z-10">{p.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {/* Live Preview Section */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Real-time Preview</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                <button
                  onClick={() => setPreviewMode("desktop")}
                  className={`p-1.5 rounded-lg transition-all ${previewMode === "desktop" ? "bg-accent text-background" : "text-white/40 hover:text-white"}`}
                  title="Desktop View"
                >
                  <Monitor size={14} />
                </button>
                <button
                  onClick={() => setPreviewMode("mobile")}
                  className={`p-1.5 rounded-lg transition-all ${previewMode === "mobile" ? "bg-accent text-background" : "text-white/40 hover:text-white"}`}
                  title="Mobile View"
                >
                  <Smartphone size={14} />
                </button>
                <div className="w-px h-3 bg-white/10 mx-1" />
                <button
                  onClick={() => setPreviewKey(k => k + 1)}
                  className="p-1.5 text-white/40 hover:text-white transition-all"
                  title="Reset Preview"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>

            <div className={`relative group transition-all duration-500 mx-auto ${previewMode === "mobile" ? "max-w-[375px]" : "w-full"}`}>
              <div className="absolute -inset-1 bg-linear-to-r from-accent/20 to-accent/5 rounded-[40px] blur-xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative">
                <AIConcierge 
                  key={`${config.branding?.theme}-${config.greeting}-${config.name}-${previewKey}`} 
                  config={config} 
                  previewMode={true} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
