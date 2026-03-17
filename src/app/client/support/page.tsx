"use client";

import { useI18n } from "@/lib/i18n";
import { Send, User, Bot, HelpCircle, PhoneCall, Mail, MessageSquare } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";

interface Message {
  _id: string;
  role: 'admin' | 'user';
  content: string;
  _creationTime: number;
}

export default function SupportPage() {
  const { t } = useI18n();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch("/api/client/support");
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch("/api/client/support", {
        method: "POST",
        body: JSON.stringify({ content: input }),
      });
      if (res.ok) {
        const newMessage = await res.json();
        setMessages([...messages, newMessage]);
        setInput("");
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-10 h-full flex flex-col">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">{t("portal.support.title") || "Direct Support"}</h1>
        <p className="text-gray-500 text-sm max-w-lg">
          {t("portal.support.desc") || `Have a question about your project? Message your dedicated project manager, ${siteConfig.name}, directly.`}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 flex-1 min-h-[600px]">
        {/* Chat Interface */}
        <div className="glass-card rounded-3xl border-white/5 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-background font-bold text-lg">
                  {siteConfig.name[0]}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0B0F15] shadow-lg" />
              </div>
              <div>
                <p className="text-white font-bold text-sm leading-none mb-1">{siteConfig.name}</p>
                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{t("portal.support.online") || "Online"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                <PhoneCall size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[400px] scroll-smooth"
          >
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-30">
                <MessageSquare size={48} className="text-gray-400" />
                <p className="text-sm font-medium">No messages yet. Start the conversation!</p>
              </div>
            ) : (
              messages.map((msg) => (
                <motion.div 
                  key={msg._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === 'admin' ? 'bg-accent text-background' : 'bg-white/10 text-white'
                  }`}>
                    {msg.role === 'admin' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl max-w-sm ${
                    msg.role === 'admin' 
                      ? 'bg-white/5 text-gray-200 border border-white/5' 
                      : 'bg-accent text-background font-medium'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className={`text-[10px] mt-2 ${msg.role === 'admin' ? 'text-gray-600' : 'text-background/60'}`}>{formatTime(msg._creationTime)}</p>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/5">
            <form onSubmit={handleSend} className="relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                autoComplete="off"
                disabled={sending}
                placeholder={t("portal.support.placeholder") || "Type your message..."}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-16 text-white text-sm focus:border-accent outline-none transition-all placeholder:text-gray-700 disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={sending || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-accent text-background rounded-xl hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-accent/20 disabled:opacity-50 disabled:scale-100"
              >
                {sending ? <div className="w-5 h-5 rounded-full border-2 border-background border-t-transparent animate-spin" /> : <Send size={18} />}
              </button>
            </form>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="glass-card p-8 rounded-3xl border-white/5 space-y-6">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t("portal.support.help_center") || "Quick Support"}</h3>
            
            <div className="space-y-4">
              <SupportOption icon={HelpCircle} title="Documentation" desc="Read project technical docs" />
              <SupportOption icon={Mail} title="Alternative Contact" desc={siteConfig.email} />
            </div>

            <div className="pt-6 border-t border-white/5">
              <p className="text-[10px] text-gray-600 uppercase font-black tracking-[0.2em] mb-4">Availability</p>
              <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10">
                <p className="text-xs text-accent font-bold leading-relaxed">
                  {siteConfig.availability}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SupportOption({ icon: Icon, title, desc }: { icon: React.ElementType, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-all cursor-pointer border border-transparent hover:border-white/5 group">
      <div className="p-3 bg-white/5 text-gray-400 group-hover:text-accent rounded-xl transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-bold text-white group-hover:text-accent transition-colors mb-1">{title}</p>
        <p className="text-[10px] text-gray-600 line-clamp-1">{desc}</p>
      </div>
    </div>
  );
}
