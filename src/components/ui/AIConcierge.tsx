"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, ArrowRight, Zap, Bot } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import * as LucideIcons from "lucide-react";

export interface AgentConfig {
  name: string;
  description?: string;
  personality?: string;
  greeting?: string;
  branding: {
    primaryColor: string;
    icon: string;
    theme: "dark" | "light" | "glass";
  };
  knowledgeBase?: string[];
  capabilities?: string[];
  presets?: { label: string; query: string }[];
}

const DynamicIcon = ({ name, size = 20, className = "" }: { name: string, size?: number, className?: string }) => {
  // @ts-expect-error - LucideIcons is a module object and we are indexing it with a string key
  const IconComponent = LucideIcons[name.charAt(0).toUpperCase() + name.slice(1)] || Bot;
  return <IconComponent size={size} className={className} />;
};

interface AIConciergeProps {
  config?: AgentConfig;
  previewMode?: boolean;
  embedMode?: boolean;
}

export default function AIConcierge({ config, previewMode = false, embedMode = false }: AIConciergeProps) {
  const [isOpen, setIsOpen] = useState(previewMode || embedMode);
  const { t } = useI18n();

  // Default values if no config is provided (fallback to original logic)
  const name = config?.name || t("concierge.name");
  const greeting = config?.greeting || t("concierge.greeting");
  const primaryColor = config?.branding?.primaryColor || "var(--accent)";
  const iconName = config?.branding?.icon || "Bot";
  
  const PRESETS = config?.presets || [
    { label: t("concierge.preset.tech.label"), query: t("concierge.preset.tech.query") },
    { label: t("concierge.preset.cost.label"), query: t("concierge.preset.cost.query") },
    { label: t("concierge.preset.saas.label"), query: t("concierge.preset.saas.query") },
  ];

  const [messages, setMessages] = useState<{ role: 'ai' | 'user', content: string }[]>(() => [
    { role: 'ai', content: greeting }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleQuery = async (query: string) => {
    if (previewMode) return; // Disable actual logic in preview

    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: query,
          config: config ? {
            name: config.name,
            description: config.description,
            personality: config.personality
          } : undefined
        })
      });

      if (!res.ok) throw new Error("Neural link failed");
      const data = await res.json();

      setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (error) {
      console.error("Chat failure:", error);
      setMessages(prev => [...prev, { role: 'ai', content: t("concierge.fallback") }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={previewMode ? "relative" : ""}>
      {/* Floating Toggle */}
      {!previewMode && (
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (typeof window !== "undefined") {
              window.parent.postMessage({ type: 'TOGGLE_WIDGET' }, '*');
            }
          }}
          className="fixed bottom-8 right-8 z-60 w-14 h-14 text-background rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group overflow-hidden"
        >
          <div 
            className="absolute inset-0 animate-gradient-xy group-hover:scale-110 transition-transform duration-500" 
            style={{ background: 'linear-gradient(135deg, #94A3B8, #3B82F6, #10B981, #8B5CF6)' }}
          />
          
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" className="relative z-10" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="open" className="relative z-10" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <DynamicIcon name={iconName} size={24} className="group-hover:animate-pulse" />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-20 group-hover:opacity-40" />
        </button>
      )}

      {/* Chat Pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={previewMode ? { opacity: 1, scale: 1 } : { opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`
              ${previewMode ? "relative w-full h-[500px]" : embedMode ? "fixed inset-0 w-full h-full" : "fixed bottom-24 right-8 w-[380px] h-[520px]"} 
              z-60 rounded-[32px] flex flex-col overflow-hidden shadow-dark-lg transition-all duration-500
              ${config?.branding?.theme === 'light' ? 'bg-white text-gray-900 border-gray-200' : 
                config?.branding?.theme === 'glass' ? 'glass-card border-white/10 backdrop-blur-2xl' : 
                'bg-[#0a0a0a] text-white border-white/5'} 
              border
            `}
          >
            {/* Header */}
            <div className={`relative p-6 border-b flex items-center justify-between overflow-hidden ${config?.branding?.theme === 'light' ? 'bg-gray-50 border-gray-100' : 'bg-white/5 border-white/5'}`}>
              {/* Header Gradient Overlay */}
              <div className="absolute inset-0 bg-linear-to-r from-[#3B82F6]/5 to-[#8B5CF6]/5 opacity-50" />
              
              <div className="flex items-center gap-3 relative z-10">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-background shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #94A3B8, #3B82F6, #8B5CF6)' }}
                >
                  <DynamicIcon name={iconName} size={22} />
                </div>
                <div>
                  <h3 className={`text-sm font-bold tracking-tight ${config?.branding?.theme === 'light' ? 'text-gray-900' : 'text-white'}`}>{name}</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400/80 font-bold uppercase tracking-widest">{t("concierge.status")}</span>
                  </div>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center" style={{ color: `${primaryColor}80` }}>
                <Zap size={14} />
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      msg.role === 'ai' 
                        ? config?.branding?.theme === 'light' 
                          ? 'bg-gray-100 text-gray-700 rounded-tl-none border border-gray-200'
                          : 'bg-white/5 text-gray-300 rounded-tl-none border border-white/5' 
                        : 'text-background rounded-tr-none font-medium'
                    }`}
                    style={msg.role === 'user' ? { backgroundColor: primaryColor } : {}}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1">
                    <span className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: primaryColor }} />
                    <span className="w-1 h-1 rounded-full animate-bounce [animation-delay:0.2s]" style={{ backgroundColor: primaryColor }} />
                    <span className="w-1 h-1 rounded-full animate-bounce [animation-delay:0.4s]" style={{ backgroundColor: primaryColor }} />
                  </div>
                </div>
              )}
            </div>

            {/* Presets & Input Area */}
            <div className="p-6 pt-0 space-y-4">
              {messages.length < 4 && (
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuery(preset.query)}
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5 hover:bg-accent/10 transition-colors flex items-center gap-2 group"
                      style={{ color: primaryColor, borderColor: `${primaryColor}33`, backgroundColor: `${primaryColor}0D` }}
                    >
                      {preset.label}
                      <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              )}

              <div className="relative group">
                <input
                  type="text"
                  placeholder={t("concierge.placeholder")}
                  disabled={previewMode}
                  className={`w-full border rounded-2xl py-4 pl-6 pr-14 text-xs focus:border-accent outline-none transition-all ${
                    config?.branding?.theme === 'light' 
                      ? 'bg-gray-50 border-gray-200 text-gray-900 focus:bg-white' 
                      : 'bg-white/5 border-white/10 text-white focus:bg-white/10'
                  }`}
                  style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value) {
                      handleQuery(e.currentTarget.value);
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button 
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-accent/10 text-accent rounded-xl hover:bg-accent hover:text-background transition-all"
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}1A` }}
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
