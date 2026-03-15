"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowLeft, Loader2, Bot, Palette, MessageSquare, Zap, CheckCircle2, Cpu, Shapes, Wand2, RotateCcw } from "lucide-react";
import Link from "next/link";
import AIConcierge, { AgentConfig } from "@/components/ui/AIConcierge";
import { useRouter } from "next/navigation";

const SCULPTING_STEPS = [
  { icon: Cpu, label: "Initializing Neural Framework", duration: 2000 },
  { icon: Wand2, label: "Sculpting Personality & Tone", duration: 2500 },
  { icon: Palette, label: "Applying Brand DNA", duration: 2000 },
  { icon: Shapes, label: "Assembling Visual Interface", duration: 1500 },
];

export default function AgentGeneratorPage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [generatedConfig, setGeneratedConfig] = useState<AgentConfig | null>(null);
  const router = useRouter();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGenerating && currentStep < SCULPTING_STEPS.length) {
      timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, SCULPTING_STEPS[currentStep].duration);
    }
    return () => clearTimeout(timer);
  }, [isGenerating, currentStep]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setCurrentStep(0);
    setGeneratedConfig(null);
    
    try {
      const res = await fetch("/api/generate/agent", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      // Artificial delay to let the animations play out if the AI is too fast
      await new Promise(r => setTimeout(r, 2000));
      setGeneratedConfig(data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate agent. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedConfig) return;
    setIsSaving(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        body: JSON.stringify({
          name: generatedConfig.name,
          personality: generatedConfig.personality,
          config: generatedConfig,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      router.push("/admin/agents");
    } catch (error) {
      console.error(error);
      alert("Failed to save agent.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 sm:p-12 lg:p-16 selection:bg-accent selection:text-background">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 blur-[120px] rounded-full [animation-delay:2s] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">
          <div className="space-y-4">
            <Link 
              href="/admin/agents" 
              className="group inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-white/30 hover:text-accent transition-all uppercase"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              Return to Nexus
            </Link>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-none">
              AGENT <span className="bg-clip-text text-transparent bg-linear-to-r from-accent to-accent/40">FORGE</span>
            </h1>
            <p className="text-white/40 text-sm max-w-lg leading-relaxed font-medium">
              Transmute your ideas into digital life. Our neural engine crafts autonomous entities with distinct personalities and striking visual DNA.
            </p>
          </div>
          
          <AnimatePresence>
            {generatedConfig && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleSave}
                disabled={isSaving}
                className="px-10 py-5 bg-accent text-background rounded-[24px] font-black text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-accent-glow-lg disabled:opacity-50 group"
              >
                {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="fill-current" />}
                DEPLOY ENTITY
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Input Section */}
          <div className="space-y-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-accent/20 to-accent/5 rounded-[40px] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
              <div className="relative glass-card p-10 rounded-[40px] border-white/5 space-y-8 bg-black/40 backdrop-blur-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-accent uppercase text-[10px] font-black tracking-[0.3em]">
                    <Sparkles size={16} />
                    Vision Input
                  </div>
                  {prompt.length > 0 && (
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">{prompt.length} CHARS</span>
                  )}
                </div>
                
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. A hyper-efficient technical support agent with a cyberpunk aesthetic, specializing in Cloud Architecture and Rust optimization..."
                  className="w-full h-48 bg-transparent border-none text-lg text-white placeholder:text-white/10 outline-none resize-none font-medium leading-relaxed"
                />

                <div className="flex gap-4">
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="flex-1 py-6 bg-accent/5 border border-accent/20 rounded-3xl font-black text-[12px] tracking-[0.2em] hover:bg-accent hover:text-background transition-all flex items-center justify-center gap-4 disabled:opacity-20 uppercase group"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        <span>Forging...</span>
                      </>
                    ) : (
                      <>
                        <Bot className="group-hover:rotate-12 transition-transform" size={20} />
                        <span>{generatedConfig ? "Reforge Essence" : "Ignite Generation"}</span>
                      </>
                    )}
                  </button>
                  {generatedConfig && !isGenerating && (
                    <button
                      onClick={() => { setPrompt(""); setGeneratedConfig(null); }}
                      className="px-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-red-500/10 hover:text-red-400 transition-all group"
                      title="Discard and Reset"
                    >
                      <RotateCcw size={20} className="group-hover:-rotate-90 transition-transform" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sculpting Progress */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-4"
                >
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.3em] ml-2">Neural Status</p>
                  <div className="glass-card p-8 rounded-[32px] border-white/5 bg-black/20 space-y-6">
                    {SCULPTING_STEPS.map((step, idx) => {
                      const StepIcon = step.icon;
                      const isActive = idx === currentStep;
                      const isCompleted = idx < currentStep;
                      
                      return (
                        <div key={idx} className="flex items-center gap-6 transition-all duration-500">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                            isActive ? "bg-accent/20 border-accent text-accent scale-110 shadow-accent-glow-sm" :
                            isCompleted ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                            "bg-white/5 border-white/5 text-white/20"
                          }`}>
                            {isCompleted ? <CheckCircle2 size={18} /> : <StepIcon size={18} />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`text-[11px] font-black uppercase tracking-widest transition-colors duration-500 ${
                                isActive ? "text-white" : isCompleted ? "text-emerald-400/60" : "text-white/10"
                              }`}>
                                {step.label}
                              </span>
                              {isActive && (
                                <motion.div 
                                  animate={{ scale: [1, 1.2, 1] }} 
                                  transition={{ repeat: Infinity, duration: 2 }}
                                  className="text-[10px] font-black text-accent"
                                >
                                  ACTIVE
                                </motion.div>
                              )}
                            </div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              {isActive && (
                                <motion.div 
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "0%" }}
                                  transition={{ duration: step.duration / 1000, ease: "linear" }}
                                  className="h-full bg-accent"
                                />
                              )}
                              {isCompleted && <div className="h-full w-full bg-emerald-500/30" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generated Signature */}
            <AnimatePresence>
              {generatedConfig && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] ml-2">Component DNA</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-8 rounded-[32px] bg-white/2 border border-white/5 space-y-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-[18px] border border-white/10 shadow-2xl" 
                          style={{ backgroundColor: generatedConfig.branding.primaryColor }}
                        />
                        <div>
                          <p className="text-[10px] font-black text-white uppercase tracking-widest">{generatedConfig.branding.primaryColor}</p>
                          <p className="text-[10px] text-white/30 uppercase font-black">{generatedConfig.branding.icon} CONFIG</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-8 rounded-[32px] bg-white/2 border border-white/5 space-y-4">
                      <div className="flex items-center gap-3 text-white/40">
                        <MessageSquare size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Persona Matrix</span>
                      </div>
                      <p className="text-[11px] text-white/60 leading-relaxed line-clamp-2 italic font-medium">
                        &quot;{generatedConfig.personality}&quot;
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Holographic Preview Section */}
          <div className="lg:sticky lg:top-16 space-y-8">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shadow-accent-glow-sm animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Holoscan Preview</span>
              </div>
              <div className="flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/5" />
              </div>
            </div>

            <div className="relative group perspective-1000">
              <div className="absolute -inset-10 bg-accent/10 blur-[100px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-1000"></div>
              <motion.div 
                className="relative"
                animate={isGenerating ? { opacity: [1, 0.4, 1], scale: [1, 0.98, 1] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {generatedConfig ? (
                  <div className="scale-105 origin-top transition-transform duration-700">
                    <AIConcierge config={generatedConfig} previewMode={true} />
                  </div>
                ) : (
                  <div className="w-full h-[580px] glass-card rounded-[48px] border-white/5 flex flex-col items-center justify-center text-center p-16 space-y-6 bg-white/2 backdrop-blur-3xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-b from-accent/5 to-transparent pointer-events-none" />
                    <div className="w-24 h-24 rounded-[32px] bg-white/5 flex items-center justify-center text-white/10 mb-4 border border-white/5 relative group-hover:border-accent/20 transition-all duration-500">
                      <Bot size={48} className="group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black tracking-tighter uppercase italic">Awaiting Matrix</h3>
                      <p className="text-white/20 text-xs font-medium uppercase tracking-widest leading-loose">
                        Input vision to manifest <br/> digital consciousness
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
