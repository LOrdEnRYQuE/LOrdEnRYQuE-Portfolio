"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { X, Send, Paperclip, Smile, Wand2, Eye, EyeOff, Loader2 } from "lucide-react";
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
  const [isUploading, setIsUploading] = useState(false);
  const [attachments, setAttachments] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaved, setIsSaved] = useState(true);

  const createEmail = useMutation(api.emails.create);
  const generateUploadUrl = useMutation(api.emails.generateUploadUrl);

  // Auto-fill form when replyTo changes or modal opens
  useEffect(() => {
    if (isOpen && replyTo) {
      setTo(replyTo.to);
      setSubject(replyTo.subject.startsWith("Re:") ? replyTo.subject : `Re: ${replyTo.subject}`);
      setBody(replyTo.body);
    } else if (isOpen && !replyTo) {
      // Keep existing draft or clear? Clear for brand new compose.
      // But if user was already typing, we shouldn't wipe it.
      // Only clear if it was empty before.
    }
  }, [replyTo, isOpen]);

  // Auto-save draft animation simulation
  useEffect(() => {
    if (body.length > 0) {
      setIsSaved(false);
      const timer = setTimeout(() => setIsSaved(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [body, subject, to]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    try {
      const fileList = Array.from(files);
      for (const file of fileList) {
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
          method: "POST",
          headers: { "Content-Type": file.type },
          body: file,
        });
        const { storageId } = await result.json();
        setAttachments(prev => [...prev, storageId]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a !== id));
  };

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
        attachments,
        folder: "SENT",
        status: "READ",
      });
      onClose();
      setTo("");
      setSubject("");
      setBody("");
      setAttachments([]);
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
              
            </div>

            {/* Attachments List */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {attachments.map((id) => (
                  <div key={id} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg group animate-in fade-in slide-in-from-bottom-2">
                    <Paperclip size={10} className="text-accent-blue" />
                    <span className="text-[10px] text-white/50 font-mono truncate max-w-[100px]">{id.slice(0, 8)}...</span>
                    <button 
                      onClick={() => removeAttachment(id)}
                      className="p-1 hover:bg-white/10 rounded text-white/20 hover:text-red-400 transition-colors"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 px-6 bg-black/40 border-t border-white/5 flex items-center justify-between backdrop-blur-md">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating}
                className={`px-3 py-1.5 rounded-lg border text-[11px] font-bold transition-all flex items-center gap-2 ${
                  isGenerating 
                    ? "bg-accent-blue/15 border-accent-blue/30 text-accent-blue animate-pulse" 
                    : "bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10"
                }`}
              >
                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                {isGenerating ? "Magic Drafting..." : "AI Auto-Draft"}
              </button>
              <div className="w-px h-4 bg-white/10 mx-1" />
              <input 
                type="file" 
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className={`p-2 rounded-lg transition-all ${
                  isUploading 
                    ? "bg-accent-blue/10 text-accent-blue animate-pulse" 
                    : "text-white/30 hover:text-white hover:bg-white/5"
                }`}
              >
                {isUploading ? <Loader2 size={18} className="animate-spin" /> : <Paperclip size={18} />}
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
