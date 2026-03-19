"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { 
  Inbox, 
  Send, 
  FileText, 
  ShieldAlert, 
  Trash2, 
  Search, 
  MoreVertical, 
  Reply, 
  Forward, 
  Star, 
  Clock, 
  Tag as TagIcon,
  Archive,
  Sparkles,
  RefreshCw
} from "lucide-react";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import EmailComposer from "./EmailComposer";
import { Doc, Id } from "@convex/_generated/dataModel";

const FOLDERS = [
  { id: "INBOX", label: "Inbox", icon: Inbox },
  { id: "STARRED", label: "Starred", icon: Star },
  { id: "SENT", label: "Sent", icon: Send },
  { id: "DRAFTS", label: "Drafts", icon: FileText },
  { id: "SPAM", label: "Spam", icon: ShieldAlert },
  { id: "TRASH", label: "Trash", icon: Trash2 },
];

export default function EmailInbox() {
  const [activeFolder, setActiveFolder] = useState("INBOX");
  const [selectedEmailId, setSelectedEmailId] = useState<Id<"emails"> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [replyTo, setReplyTo] = useState<{ to: string; subject: string; body: string } | undefined>(undefined);
  const [filterType, setFilterType] = useState<"all" | "unread" | "starred">("all");

  const emailsResult = useQuery(api.emails.listByFolder, { folder: activeFolder }) || [];
  const emails = useMemo(() => emailsResult, [emailsResult]);
  const unreadCounts = useQuery(api.emails.getCounts) || {};
  
  const updateStatus = useMutation(api.emails.updateStatus);
  const toggleStar = useMutation(api.emails.toggleStar);

  const selectedEmail = emails.find((e: Doc<"emails">) => e._id === selectedEmailId);

  const handleSelectEmail = (email: Doc<"emails">) => {
    setSelectedEmailId(email._id);
    if (email.status === "UNREAD") {
      updateStatus({ id: email._id, status: "READ" });
    }
  };

  const handleReply = () => {
    if (selectedEmail) {
      setReplyTo({
        to: selectedEmail.from,
        subject: selectedEmail.subject,
        body: `\n\n--- Original Message ---\nFrom: ${selectedEmail.from}\nSent: ${selectedEmail.sentAt}\n\n${selectedEmail.body}`
      });
      setIsComposerOpen(true);
    }
  };

  const handleCompose = () => {
    setReplyTo(undefined);
    setIsComposerOpen(true);
  };

  const filteredEmails = useMemo(() => {
    return emails.filter((e: Doc<"emails">) => {
      const matchesSearch = e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.from.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterType === "all" || 
                         (filterType === "unread" && e.status === "UNREAD") ||
                         (filterType === "starred" && e.isStarred);
                         
      return matchesSearch && matchesFilter;
    });
  }, [emails, searchQuery, filterType]);

  return (
    <div className="flex h-[calc(100vh-140px)] bg-[#050505]/80 rounded-[2.5rem] border border-white/5 overflow-hidden backdrop-blur-3xl shadow-2xl relative">
      {/* Background Glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-blue/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar */}
      <div className="w-72 border-r border-white/5 flex flex-col relative z-10">
        <div className="p-8 pb-4">
          <button 
            className="w-full py-4 px-6 rounded-2xl bg-accent-blue text-white text-sm font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-accent-blue/40 flex items-center justify-center gap-3 relative overflow-hidden group"
            onClick={handleCompose}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <Sparkles size={16} />
            Compose
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-[10px] uppercase tracking-[0.2em] font-black text-white/20 mb-4">Mailbox</p>
          {FOLDERS.map((folder) => {
            const Icon = folder.icon;
            const count = unreadCounts[folder.id] || 0;
            const isActive = activeFolder === folder.id;
            
            return (activeFolder !== "STARRED" || folder.id !== "STARRED") && (
              <button
                key={folder.id}
                onClick={() => {
                  setActiveFolder(folder.id);
                  setSelectedEmailId(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive 
                    ? "bg-white/10 text-white shadow-xl shadow-black/20" 
                    : "text-white/30 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl transition-colors ${isActive ? "bg-accent-blue/20 text-accent-blue" : "bg-white/5 group-hover:bg-white/10"}`}>
                    <Icon size={18} />
                  </div>
                  <span className="text-sm font-bold tracking-tight">{folder.label}</span>
                </div>
                {count > 0 && (
                  <span className="px-2.5 py-1 rounded-lg bg-accent-blue/10 text-accent-blue text-[10px] font-black tracking-tighter">
                    {count}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-8 mb-4">
            <p className="px-4 text-[10px] uppercase tracking-[0.2em] font-black text-white/20 mb-4">Labels</p>
            <div className="space-y-1">
              {["Product", "Work", "Urgent"].map(label => (
                <button key={label} className="w-full flex items-center gap-4 px-4 py-3 text-white/30 hover:text-white transition-all group">
                   <TagIcon size={14} className="text-white/10 group-hover:text-accent-blue transition-colors" />
                   <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Storage status */}
        <div className="p-8 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-white/20 font-bold uppercase tracking-widest">Storage</span>
            <span className="text-[10px] text-white/40 font-bold">12.4 GB / 15 GB</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-accent-blue w-[82%] rounded-full shadow-[0_0_10px_rgba(45,108,223,0.4)]" />
          </div>
        </div>
      </div>

      {/* List */}
      <div className="w-[420px] border-r border-white/5 flex flex-col bg-black/20 relative z-10 backdrop-blur-md">
        <div className="p-6 space-y-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent-blue transition-colors" size={16} />
            <input 
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-white/10 focus:outline-none focus:border-white/10 focus:bg-white/10 transition-all font-light"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {(["all", "unread", "starred"] as const).map(t => (
              <button 
                key={t}
                onClick={() => setFilterType(t)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  filterType === t ? "bg-white/10 text-white" : "text-white/20 hover:text-white/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-2 pb-8">
          {filteredEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-white/10 space-y-4">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/5 shadow-inner">
                <Inbox size={48} strokeWidth={1} />
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase opacity-40">Clean Inbox</p>
            </div>
          ) : (
            filteredEmails.map((email: Doc<"emails">) => (
              <button
                key={email._id}
                onClick={() => handleSelectEmail(email)}
                className={`w-full p-5 text-left rounded-3xl transition-all relative overflow-hidden border ${
                  selectedEmailId === email._id 
                    ? "bg-white/5 border-white/10 shadow-2xl" 
                    : "bg-transparent border-transparent hover:bg-white/2 hover:border-white/5"
                }`}
              >
                {email.status === "UNREAD" && (
                  <div className="absolute top-6 left-0 w-1 h-2 bg-accent-blue rounded-r-full shadow-[0_0_10px_rgba(45,108,223,0.8)]" />
                )}
                
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/60">
                      {email.from.charAt(0).toUpperCase()}
                    </div>
                    <span className={`text-[13px] tracking-tight ${email.status === "UNREAD" ? "text-white font-bold" : "text-white/60 font-medium"}`}>
                      {email.from}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-white/20 whitespace-nowrap tracking-wide uppercase">
                    {format(new Date(email.sentAt), "MMM d")}
                  </span>
                </div>
                
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-xs truncate mb-1.5 ${email.status === "UNREAD" ? "text-white/90 font-bold" : "text-white/40 font-semibold"}`}>
                      {email.subject}
                    </h4>
                    <p className="text-[11px] text-white/20 line-clamp-2 leading-relaxed font-light">
                      {email.body.replace(/<[^>]*>/g, '')}
                    </p>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStar({ id: email._id });
                    }}
                    className={`mt-1 transition-all ${email.isStarred ? "text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.6)]" : "text-white/5 hover:text-white/20"}`}
                  >
                    <Star size={14} fill={email.isStarred ? "currentColor" : "none"} />
                  </button>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Content Area Rendering follows similar logic but with more expanded luxury style */}
      <div className="flex-1 flex flex-col relative z-10 bg-black/40">
        <AnimatePresence mode="wait">
          {selectedEmail ? (
            <motion.div 
              key={selectedEmail._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              {/* Premium Toolbar */}
              <div className="h-24 px-8 border-b border-white/5 flex items-center justify-between bg-white/1 backdrop-blur-xl">
                 <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5 mr-4">
                      <button className="p-2.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Archive">
                        <Archive size={18} />
                      </button>
                      <button className="p-2.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Spam">
                        <ShieldAlert size={18} />
                      </button>
                      <button className="p-2.5 text-white/30 hover:text-accent-red hover:bg-accent-red/10 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
                      <button onClick={handleReply} className="p-2.5 text-white/30 hover:text-accent-blue hover:bg-accent-blue/10 rounded-lg transition-all" title="Reply">
                        <Reply size={18} />
                      </button>
                      <button className="p-2.5 text-white/30 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Reply All">
                        <RefreshCw size={18} />
                      </button>
                    </div>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="hidden xl:flex items-center gap-2 text-[10px] text-white/20 font-bold tracking-widest uppercase bg-white/5 px-4 py-2 rounded-full border border-white/5">
                      <Clock size={12} />
                      Snooze
                    </div>
                    <button className="p-3 text-white/40 hover:text-white transition-all bg-white/5 rounded-full border border-white/5 hover:border-white/20">
                      <MoreVertical size={20} />
                    </button>
                 </div>
              </div>

              {/* Message Details */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="max-w-4xl mx-auto px-12 py-12">
                   <div className="mb-12">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-[10px] font-black tracking-tighter text-accent-blue uppercase">
                          Important
                        </span>
                        <div className="flex -space-x-2">
                           <div className="w-5 h-5 rounded-full bg-linear-to-tr from-purple-500 to-pink-500 border border-black" />
                           <div className="w-5 h-5 rounded-full bg-linear-to-tr from-accent-blue to-emerald-500 border border-black" />
                        </div>
                      </div>
                      <h1 className="text-3xl font-black text-white leading-[1.15] tracking-tight">{selectedEmail.subject}</h1>
                   </div>

                   <div className="flex items-start justify-between mb-16">
                      <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-white/10 to-white/2 border border-white/10 flex items-center justify-center text-lg font-black text-white/80 shadow-2xl">
                          {selectedEmail.from.charAt(0).toUpperCase()}
                        </div>
                        <div>
                           <div className="flex items-center gap-2 mb-1">
                             <h3 className="text-base font-bold text-white tracking-tight">{selectedEmail.from}</h3>
                             <span className="text-xs text-white/10 font-medium">via LordEnRyQue</span>
                           </div>
                           <p className="text-xs text-white/30 font-medium">to {selectedEmail.to}</p>
                        </div>
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-bold text-white/40 mb-1.5 uppercase tracking-widest">{format(new Date(selectedEmail.sentAt), "MMMM d, yyyy")}</p>
                         <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest">{format(new Date(selectedEmail.sentAt), "h:mm aa")}</p>
                      </div>
                   </div>

                   <div 
                     className="prose prose-invert prose-lg max-w-none text-white/80 leading-[1.8] font-light tracking-wide bg-white/1 p-10 rounded-[3rem] border border-white/5"
                     dangerouslySetInnerHTML={{ __html: selectedEmail.body }}
                   />

                   {/* Quick Replies Support can go here */}
                   <div className="mt-20 pt-12 border-t border-white/5">
                      <p className="text-center text-[11px] text-white/10 font-bold uppercase tracking-[0.3em] mb-8">End of Message</p>
                      <div className="flex gap-4">
                        <button 
                          onClick={handleReply}
                          className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center gap-3 text-sm font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all group"
                        >
                           <Reply size={18} className="group-hover:-translate-x-1 transition-transform" />
                           Reply to this email
                        </button>
                        <button className="flex-1 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center gap-3 text-sm font-bold text-white/60 hover:bg-white/10 hover:text-white transition-all group">
                           <Forward size={18} className="group-hover:translate-x-1 transition-transform" />
                           Forward to someone
                        </button>
                      </div>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-white/5 relative">
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/1 to-transparent pointer-events-none" />
              <div className="relative group">
                <div className="absolute inset-0 bg-accent-blue/20 blur-[80px] rounded-full group-hover:bg-accent-blue/30 transition-all duration-1000" />
                <div className="relative p-12 rounded-[3.5rem] bg-[#0A0A0A] border border-white/5 shadow-2xl flex items-center justify-center rotate-3 group-hover:rotate-0 transition-all duration-700">
                  <Sparkles size={64} strokeWidth={1} className="text-white/10" />
                </div>
              </div>
              <div className="mt-12 text-center relative">
                <h3 className="text-xl font-black text-white tracking-tight mb-2">Select a thread</h3>
                <p className="text-[11px] font-bold text-white/10 uppercase tracking-[0.4em]">Nothing selected yet</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

      <EmailComposer 
        isOpen={isComposerOpen} 
        onClose={() => setIsComposerOpen(false)} 
        replyTo={replyTo}
      />
    </div>
  );
}
