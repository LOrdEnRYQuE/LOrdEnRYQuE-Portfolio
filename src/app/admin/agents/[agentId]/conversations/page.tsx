"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, MessageSquare, Clock, User, 
  Bot, Loader2, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { use } from "react";

interface Conversation {
  _id: string;
  visitorId: string | null;
  _creationTime: number;
  _count: {
    messages: number;
  };
}

interface Agent {
  _id: string;
  name: string;
}

export default function AgentConversationsPage({ params }: { params: Promise<{ agentId: string }> }) {
  const { agentId } = use(params);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedConvId, setSelectedConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ _id: string; role: string; content: string; _creationTime: number }[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const fetchAgent = async () => {
    const res = await fetch(`/api/agents/${agentId}`);
    const data = await res.json();
    setAgent(data);
  };

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/agents/${agentId}/conversations`);
      const data = await res.json();
      setConversations(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAgent();
    fetchConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentId]);

  const fetchMessages = async (convId: string) => {
    try {
      setSelectedConvId(convId);
      setIsMessagesLoading(true);
      const res = await fetch(`/api/agents/${agentId}/conversations/${convId}`);
      const data = await res.json();
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 sm:p-12 lg:p-16">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <Link href="/admin/agents" className="inline-flex items-center gap-2 text-xs font-bold text-white/50 hover:text-accent transition-colors">
            <ArrowLeft size={14} />
            BACK TO DASHBOARD
          </Link>
          <h1 className="text-4xl font-black tracking-tighter">
            {agent?.name.toUpperCase() || 'AGENT'} <span className="text-accent">LOGS</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conversation List */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Recent Sessions</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2 py-0.5 rounded-full">{conversations.length}</span>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {isLoading ? (
                <div className="flex flex-col items-center py-20 gap-4">
                  <Loader2 className="animate-spin text-accent/20" size={32} />
                  <p className="text-[10px] uppercase font-black tracking-widest text-white/20">Loading Logs...</p>
                </div>
              ) : conversations.length === 0 ? (
                <div className="text-center py-20 glass-card rounded-[32px] border-white/5 opacity-50">
                  <MessageSquare size={32} className="mx-auto mb-4" />
                  <p className="text-xs font-bold">No conversations yet</p>
                </div>
              ) : conversations.map((conv) => (
                <button
                  key={conv._id}
                  onClick={() => fetchMessages(conv._id)}
                  className={`w-full text-left p-6 rounded-[32px] border transition-all flex flex-col gap-3 group ${
                    selectedConvId === conv._id 
                      ? 'bg-white/10 border-accent/30 ring-1 ring-accent/20' 
                      : 'bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/7'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-xs font-bold text-white/80">
                      <Clock size={14} className="text-accent" />
                      {formatDistanceToNow(new Date(conv._creationTime))} ago
                    </div>
                    <ChevronRight size={14} className={`transition-transform ${selectedConvId === conv._id ? 'rotate-90 text-accent' : 'text-white/20'}`} />
                  </div>
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/30">
                    <span>ID: {conv._id.slice(-8)}</span>
                    <span>{conv._count.messages} MESSAGES</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Message History */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-[40px] border-white/5 min-h-[70vh] flex flex-col relative overflow-hidden">
              {!selectedConvId ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6">
                  <div className="w-24 h-24 rounded-[40px] bg-white/5 flex items-center justify-center text-white/10 mb-4 ring-1 ring-white/10">
                    <MessageSquare size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black">Select a Session</h3>
                    <p className="text-white/40 text-sm max-w-xs mx-auto">
                      Click on a conversation from the list to view the full interaction logs.
                    </p>
                  </div>
                </div>
              ) : isMessagesLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <Loader2 className="animate-spin text-accent/20" size={48} />
                  <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-white/20">Retrieving Logs...</p>
                </div>
              ) : (
                <>
                  <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent">
                        <Bot size={20} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest">Session {selectedConvId.slice(-8)}</p>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Live Integration Feedback</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-8 space-y-8 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    {messages.map((msg, i) => (
                      <div 
                        key={msg._id} 
                        className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2 animate-in fade-in slide-in-from-bottom-2`}
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-1 ${msg.role === 'user' ? 'text-white/20' : 'text-accent'}`}>
                          {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                          {msg.role === 'user' ? 'Visitor' : agent?.name || 'Agent'}
                        </div>
                        <div className={`max-w-[80%] p-6 rounded-[28px] text-sm leading-relaxed ${
                          msg.role === 'user' 
                            ? 'bg-white/5 text-white/80 rounded-tr-none' 
                            : 'bg-accent/10 border border-accent/20 text-white rounded-tl-none ring-1 ring-accent/5'
                        }`}>
                          {msg.content}
                        </div>
                        <span className="text-[10px] text-white/10 font-bold uppercase tracking-tight">
                          {formatDistanceToNow(new Date(msg._creationTime))} ago
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-white/2 border border-white/5 rounded-2xl p-4 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 text-center">
                      End of Session Logs • Integrity Verified
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
