"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { X, Send, Paperclip, Smile, Sparkles, Wand2, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  replyTo?: {
    to: string;
    subject: string;
    body: string;
  };
}

export default function EmailComposer({ isOpen, onClose, replyTo }: EmailComposerProps) {
  const [to, setTo] = useState(replyTo?.to || "");
  const [subject, setSubject] = useState(replyTo ? `Re: ${replyTo.subject}` : "");
  const [body, setBody] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const createEmail = useMutation(api.emails.create);

  // Auto-save draft animation simulation
  useEffect(() => {
    if (body.length > 0) {
      setIsSaved(false);
      const timer = setTimeout(() => setIsSaved(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [body, subject, to]);

  const handleGenerateAI = async () => {
    if (!replyTo && !body) return;
    
    setIsGenerating(true);
    try {
      const response = await fetch("/api/admin/email/generate-reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originalEmail: replyTo || { from: "N/A", subject: subject || "New Message", body: body || "Drafting a new email." },
          context: body ? `Improve and expand this draft politely: ${body}` : "Draft a professional reply.",
        }),
      });
      
      const data = await response.json();
      if (data.text) {
        setBody(data.text);
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSend = async () => {
    if (!to || !subject || !body) return;
    
    setIsSending(true);
    try {
      await createEmail({
        from: "attila@lordenryque.dev", 
        to,
        subject,
        body: body.includes('<') ? body : body.replace(/\n/g, '<br/>'),
        folder: "SENT",
        status: "READ",
      });
      onClose();
      setTo("");
      setSubject("");
      setBody("");
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          className="fixed bottom-0 right-10 w-[580px] bg-neutral-900 border border-white/10 rounded-t-2xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] z-50 overflow-hidden flex flex-col"
        >
          {/* Decorative Top Line */}
          <div className="h-1 bg-linear-to-r from-accent-blue/50 via-purple-500/50 to-transparent" />

          {/* Header */}
          <div className="bg-black/60 p-4 flex items-center justify-between border-b border-white/5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="p-1 px-2 rounded-md bg-accent-blue/10 border border-accent-blue/20 text-[10px] uppercase font-bold tracking-tighter text-accent-blue">
                Draft
              </div>
              <h3 className="text-sm font-semibold text-white/90">{subject || "New Message"}</h3>
              {!isSaved && <span className="text-[10px] text-white/30 italic animate-pulse">Saving...</span>}
              {isSaved && body.length > 0 && <span className="text-[10px] text-emerald-500/60 font-medium">Saved</span>}
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowPreview(!showPreview)}
                className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all flex items-center gap-2"
                title="Toggle HTML Preview"
              >
                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Fields */}
          <div className="p-6 space-y-4 flex-1">
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="text-[11px] uppercase tracking-widest font-bold text-white/20 w-8">To</span>
              <input 
                type="text" 
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="recipient@example.com"
                className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 placeholder:text-white/5 font-medium"
              />
            </div>
            <div className="flex items-center gap-2 border-b border-white/5 pb-3">
              <span className="text-[11px] uppercase tracking-widest font-bold text-white/20 w-8">Sub</span>
              <input 
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject of the email"
                className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 placeholder:text-white/5 font-medium"
              />
            </div>

            <div className="relative group">
              {showPreview ? (
                <div 
                  className="w-full h-80 overflow-y-auto p-4 rounded-xl bg-white/5 border border-white/5 prose prose-invert prose-sm max-w-none text-white/70 font-light"
                  dangerouslySetInnerHTML={{ __html: body }}
                />
              ) : (
                <textarea 
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Type your message here... (Markdown & HTML supported)"
                  className="w-full h-80 bg-transparent border-none text-sm text-white/70 font-light focus:ring-0 placeholder:text-white/5 resize-none custom-scrollbar leading-relaxed"
                />
              )}
              
              {/* AI Hover Button */}
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="absolute right-4 bottom-4 p-3 rounded-full bg-accent-blue text-white shadow-xl hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed group/ai"
                title="AI Magic"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="group-hover/ai:animate-pulse" />}
              </button>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-4 px-6 bg-black/40 border-t border-white/5 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2"
              >
                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                Auto-Draft
              </button>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <Paperclip size={18} />
              </button>
              <button className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                <Smile size={18} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={onClose}
                className="text-xs font-semibold text-white/20 hover:text-white transition-all uppercase tracking-widest"
              >
                Discard
              </button>
              <button 
                disabled={isSending || !to || !subject || !body}
                onClick={handleSend}
                className="flex items-center gap-3 bg-accent-blue text-white px-8 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-accent-blue/80 disabled:opacity-20 disabled:grayscale transition-all shadow-xl shadow-accent-blue/20"
              >
                {isSending ? "Sending..." : "Send"}
                {!isSending && <Send size={12} />}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
