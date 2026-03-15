"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Layers, 
  Clock, 
  User, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  CheckCircle2,
  Globe,
  Zap,
  Shield,
  MessageSquare,
  BarChart3,
  Smartphone,
  Database,
  Code2,
  Brain,
  Cpu,
  Briefcase,
  Palette,
  Target,
  Search
} from "lucide-react";

type Step = "category" | "niche" | "details" | "features" | "timeline" | "contact" | "analyzing" | "success";

export default function MVPWizardPage() {
  const [step, setStep] = useState<Step>("category");
  const [formData, setFormData] = useState({
    category: "", // Tech, Services, Creative
    concept: "",
    industry: "", // Specific Niche
    description: "",
    features: [] as string[],
    stack: "modern-web",
    timeline: "3-6-weeks",
    budget: "standard",
    email: "",
    name: "",
  });
  const [analyzingMessage, setAnalyzingMessage] = useState("Analyzing Industry Trends...");

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = async (current: Step) => {
    if (current === "category") setStep("niche");
    else if (current === "niche") setStep("details");
    else if (current === "details") setStep("features");
    else if (current === "features") setStep("timeline");
    else if (current === "timeline") setStep("contact");
    else if (current === "contact") {
      setStep("analyzing");
      
      const messages = [
        "Analyzing Industry Trends...",
        "Calibrating Tech Stack...",
        "Forging Blueprint Architecture...",
        "Optimizing UX Flows..."
      ];
      
      let msgIndex = 0;
      const interval = setInterval(() => {
        msgIndex++;
        if (msgIndex < messages.length) {
          setAnalyzingMessage(messages[msgIndex]);
        }
      }, 700);

      try {
        await fetch("/api/mvp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        setTimeout(() => {
          clearInterval(interval);
          setStep("success");
        }, 2800);
      } catch (error) {
        console.error("Submission failed", error);
        clearInterval(interval);
        setStep("contact");
      }
    }
  };

  const prevStep = (current: Step) => {
    if (current === "niche") setStep("category");
    else if (current === "details") setStep("niche");
    else if (current === "features") setStep("details");
    else if (current === "timeline") setStep("features");
    else if (current === "contact") setStep("timeline");
  };

  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[10%] left-[20%] w-160 h-160 bg-accent-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-120 h-120 bg-accent-purple/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Progress Header */}
        <div className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-white/10 mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent-blue" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              {step === "success" ? "Blueprint Forged" : "MVP Blueprint Forge"}
            </span>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            {step === "success" ? "Blueprint Complete" : "Let's build your vision."}
          </h1>
          <p className="text-text-muted">
            {step === "success" 
              ? "Your technical roadmap is being generated and sent to your inbox." 
              : "Tell us about your project, and we'll generate a custom development blueprint."}
          </p>

          {/* Progress Bar */}
          {step !== "success" && step !== "analyzing" && (
            <div className="mt-10 flex gap-2 justify-center">
              {(["category", "niche", "details", "features", "timeline", "contact"] as Step[]).map((s, idx) => {
                const isActive = step === s;
                const isPast = (["category", "niche", "details", "features", "timeline", "contact"] as Step[]).indexOf(step) > idx;
                
                return (
                  <div 
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      isActive ? "w-12 bg-accent-blue shadow-blue-glow-sm" : 
                      isPast ? "w-6 bg-accent-green" : "w-6 bg-white/5"
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Wizard Content Container */}
        <div className="glass-card rounded-3xl border-white/10 overflow-hidden relative min-h-[400px]">
          {/* Internal Prismatic Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-blue/5 rounded-full blur-[60px] -mr-32 -mt-32" />
          
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {step === "category" && (
                <motion.div
                  key="category"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent-blue/10 rounded-2xl text-accent-blue">
                      <Target size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">What&apos;s your focus?</h2>
                      <p className="text-text-muted text-sm italic">Choose your primary project category.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: "Tech", label: "Tech & Software", icon: Cpu, desc: "SaaS, AI, Apps & Digital Ecosystems", color: "blue" },
                      { id: "Services", label: "Professional Services", icon: Briefcase, desc: "Local Business, Global Logistics & Consulting", color: "emerald" },
                      { id: "Creative", label: "Creative & Media", icon: Palette, desc: "Design, Content, Gaming & Brand Identity", color: "purple" }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          updateFormData("category", cat.id);
                          nextStep("category");
                        }}
                        className={`group relative p-6 rounded-3xl border transition-all duration-500 text-left overflow-hidden ${
                          formData.category === cat.id 
                            ? cat.color === "blue" 
                              ? "bg-accent-blue/10 border-accent-blue"
                              : cat.color === "emerald"
                              ? "bg-accent-emerald/10 border-accent-emerald"
                              : "bg-accent-purple/10 border-accent-purple"
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        }`}
                        style={{
                          boxShadow: formData.category === cat.id 
                            ? `0 0 30px rgba(var(--accent-${cat.color}-raw-rgb), 0.2)`
                            : 'none'
                        }}
                      >
                        <div className={`p-3 rounded-2xl bg-accent-${cat.color}/10 text-accent-${cat.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-500`}>
                          <cat.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-1">{cat.label}</h3>
                        <p className="text-xs text-text-muted leading-relaxed">{cat.desc}</p>
                        
                        {/* Interactive corner indicator */}
                        <div className={`absolute top-4 right-4 w-2 h-2 rounded-full transition-all duration-500 ${
                          formData.category === cat.id 
                            ? cat.color === "blue" ? "bg-accent-blue scale-125"
                            : cat.color === "emerald" ? "bg-accent-emerald scale-125"
                            : "bg-accent-purple scale-125"
                            : "bg-white/10 group-hover:bg-white/30"
                        }`} />
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "niche" && (
                <motion.div
                  key="niche"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent-blue/10 rounded-2xl text-accent-blue">
                      <Search size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">Specific Industry</h2>
                      <p className="text-text-muted text-sm italic">Which niche describes you best?</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {(formData.category === "Tech" 
                        ? ["SaaS", "Fintech", "HealthTech", "EdTech", "E-commerce", "AI/ML", "Crypto/Web3", "Cybersecurity", "GovTech", "LegalTech", "PropTech"]
                        : formData.category === "Services"
                        ? ["Restaurant", "Barbershop", "Construction", "Transport", "Logistics", "Sport & Fitness", "Real Estate", "Sustainability", "Cleaning Services", "Consulting"]
                        : ["Portfolio", "Graphic Design", "Logo Design", "Social Media", "Gaming", "AdTech", "Marketing", "Photography", "Video Production", "Personal Brand"]
                      ).map(ind => (
                        <button
                          key={ind}
                          onClick={() => {
                            updateFormData("industry", ind);
                            nextStep("niche");
                          }}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                            formData.industry === ind 
                              ? "bg-accent-blue/20 border-accent-blue text-accent-blue" 
                              : "bg-white/5 border-white/10 text-text-muted hover:border-white/30"
                          }`}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-8 border-t border-white/5">
                      <button 
                        onClick={() => prevStep("niche")}
                        className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                      >
                        <ArrowLeft size={18} />
                        Back
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "details" && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent-blue/10 rounded-2xl text-accent-blue">
                      <Rocket size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">The Mission</h2>
                      <p className="text-text-muted text-sm italic">What are we building?</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Project Concept / Title</label>
                      <input 
                        type="text"
                        placeholder="e.g. AI-Powered Personal Trainer"
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-foreground focus:outline-none focus:border-accent-blue transition-colors text-lg"
                        value={formData.concept}
                        onChange={(e) => updateFormData("concept", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Brief Description</label>
                      <textarea 
                        placeholder="Tell us the core problem you're solving..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-foreground h-40 resize-none focus:outline-none focus:border-accent-blue transition-colors leading-relaxed"
                        value={formData.description}
                        onChange={(e) => updateFormData("description", e.target.value)}
                      />
                    </div>

                    <div className="pt-4 flex justify-between items-center">
                      <button 
                        onClick={() => prevStep("details")}
                        className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                      >
                        <ArrowLeft size={18} />
                        Back
                      </button>
                      <button 
                        onClick={() => nextStep("details")}
                        disabled={!formData.concept || !formData.description}
                        className="group flex items-center gap-2 px-8 py-4 rounded-full bg-accent-blue text-white font-bold hover:shadow-blue-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next: Features
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "features" && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent-green/10 rounded-2xl text-accent-green">
                      <Layers size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">The Core</h2>
                      <p className="text-text-muted text-sm italic">Multi-platform or Web focused?</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Feature Categories */}
                    {[
                      { 
                        title: "AI & Data", 
                        items: [
                          { id: "ai-chat", icon: MessageSquare, label: "AI Chat / LLM" },
                          { id: "analytics", icon: BarChart3, label: "Analytics Vitals" },
                          { id: "vector", icon: Brain, label: "Vector Search" }
                        ] 
                      },
                      { 
                        title: "Architecture", 
                        items: [
                          { id: "auth", icon: Shield, label: "Secure Auth" },
                          { id: "api", icon: Code2, label: "API First" },
                          { id: "db", icon: Database, label: "Realtime DB" }
                        ] 
                      },
                      { 
                        title: "Platform", 
                        items: [
                          { id: "mobile", icon: Smartphone, label: "iOS/Android" },
                          { id: "responsive", icon: Globe, label: "Desktop Web" },
                          { id: "automations", icon: Zap, label: "Automations" }
                        ] 
                      }
                    ].map((cat) => (
                      <div key={cat.title} className="space-y-3">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-text-muted pl-1">{cat.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {cat.items.map((feat) => (
                            <button
                              key={feat.id}
                              onClick={() => {
                                const current = [...formData.features];
                                if (current.includes(feat.id)) {
                                  updateFormData("features", current.filter(id => id !== feat.id));
                                } else {
                                  updateFormData("features", [...current, feat.id]);
                                }
                              }}
                              className={`flex items-center gap-2 p-3 rounded-xl border transition-all duration-300 text-left relative ${
                                formData.features.includes(feat.id) 
                                  ? "bg-accent-green/10 border-accent-green text-accent-green shadow-green-glow" 
                                  : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                              }`}
                            >
                              <feat.icon size={16} />
                              <span className="text-xs font-medium">{feat.label}</span>
                              
                              {/* Recommendation Badge */}
                              {((formData.category === "Tech" && ["auth", "api"].includes(feat.id)) ||
                                (formData.category === "Services" && ["automations", "analytics"].includes(feat.id)) ||
                                (formData.category === "Creative" && ["vector", "mobile"].includes(feat.id))) && (
                                  <div className="absolute -top-2 -right-1 px-1.5 py-0.5 rounded-md bg-accent-blue text-[8px] font-black uppercase tracking-tighter text-white animate-bounce">
                                    REC
                                  </div>
                                )}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      onClick={() => prevStep("features")}
                      className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button 
                      onClick={() => nextStep("features")}
                      className="group flex items-center gap-2 px-8 py-3 rounded-full bg-accent-green text-white font-bold hover:shadow-green-glow transition-all duration-300"
                    >
                      Next: Timeline
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "timeline" && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent-purple/10 rounded-2xl text-accent-purple">
                      <Clock size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">The Reality</h2>
                      <p className="text-text-muted text-sm italic">Speed vs Scalability?</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-accent-green mb-1">
                    <CheckCircle2 size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Successfully Committed</span>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Target Launch</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { id: "urgent", label: "ASAP", sub: "Under 4 wks" },
                          { id: "3-6-weeks", label: "Standard", sub: "4-8 wks" },
                          { id: "strategic", label: "Strategic", sub: "2+ months" },
                        ].map((t) => (
                          <button
                            key={t.id}
                            onClick={() => updateFormData("timeline", t.id)}
                            className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                              formData.timeline === t.id 
                                ? "bg-accent-purple/10 border-accent-purple text-accent-purple" 
                                : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <div className="font-bold text-sm">{t.label}</div>
                            <div className="text-[10px] opacity-60">{t.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">Tech Preference</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { id: "modern-web", label: "Modern Web (Next.js/TS)", sub: "Best for SEO & Speed" },
                          { id: "mobile-first", label: "Cross-Platform Mobile", sub: "Best for App Stores" },
                        ].map((s) => (
                          <button
                            key={s.id}
                            onClick={() => updateFormData("stack", s.id)}
                            className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                              formData.stack === s.id 
                                ? "bg-accent-blue/10 border-accent-blue text-accent-blue shadow-blue-glow-subtle" 
                                : "bg-white/5 border-white/10 text-white/50 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            <div className="font-bold text-sm italic">{s.label}</div>
                            <div className="text-[10px] opacity-60">{s.sub}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      onClick={() => prevStep("timeline")}
                      className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button 
                      onClick={() => nextStep("timeline")}
                      className="group flex items-center gap-2 px-8 py-3 rounded-full bg-accent-purple text-white font-bold hover:shadow-purple-glow transition-all duration-300"
                    >
                      Next: Contact
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-h-[400px] flex flex-col items-center justify-center space-y-8 text-center"
                >
                  <div className="relative">
                    {/* Pulsing Outer Rings */}
                    <div className="absolute inset-0 bg-accent-blue/20 rounded-full blur-3xl animate-pulse" />
                    <div className="relative w-32 h-32 rounded-full border-2 border-accent-blue/30 flex items-center justify-center overflow-hidden">
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-accent-blue"
                      >
                        <Sparkles size={48} />
                      </motion.div>
                      
                      {/* Scanning Line */}
                      <motion.div 
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-accent-blue to-transparent opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tight bg-linear-to-r from-white via-accent-silver to-white bg-clip-text text-transparent">
                      {analyzingMessage}
                    </h2>
                    <p className="text-text-muted text-sm max-w-sm mx-auto">
                      Our engines are processing your requirements to forge the perfect technical blueprint.
                    </p>
                  </div>

                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        className="w-1.5 h-1.5 rounded-full bg-accent-blue"
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                   <div className="flex items-start gap-4">
                    <div className="p-3 bg-accent-silver/10 rounded-2xl text-accent-silver">
                      <User size={24} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-2">The Connection</h2>
                      <p className="text-text-muted text-sm italic">Where should we send the Blueprint?</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Full Name</label>
                        <input 
                          type="text"
                          placeholder="Your name"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent-silver transition-colors"
                          value={formData.name}
                          onChange={(e) => updateFormData("name", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Email Address</label>
                        <input 
                          type="email"
                          placeholder="your@email.com"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent-silver transition-colors"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                        />
                      </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <button 
                      onClick={() => prevStep("contact")}
                      className="flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                    <button 
                      onClick={() => nextStep("contact")}
                      disabled={!formData.email || !formData.name}
                      className="group flex items-center gap-2 px-8 py-3 rounded-full bg-[#F5F5F5] text-background font-bold hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Forge Blueprint
                      <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-6"
                >
                  <div 
                    className="w-20 h-20 bg-accent-green/10 rounded-full flex items-center justify-center text-accent-green mx-auto mb-4 border border-accent-green/20 shadow-accent-glow"
                  >
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-3xl font-bold">Successfully Committed</h2>
                  <p className="text-text-muted max-w-md mx-auto">
                    We&apos;ve received your data. A specialized **Blueprint + MVP Roadmap** is being forged and will arrive at **{formData.email}** within 24 hours.
                  </p>
                  
                  <div className="pt-8">
                    <button 
                      onClick={() => window.location.href = "/"}
                      className="px-8 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors font-medium"
                    >
                      Back to Portfolio
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
