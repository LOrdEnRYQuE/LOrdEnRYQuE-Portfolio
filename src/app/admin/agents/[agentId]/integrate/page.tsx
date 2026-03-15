"use client";

import { useState, useEffect } from "react";
import { 
  Bot, Code, Copy, Check, Globe, 
  Smartphone, ArrowLeft, ExternalLink
} from "lucide-react";
import Link from "next/link";

import { AgentConfig } from "@/components/ui/AIConcierge";

interface Agent {
  id: string;
  name: string;
  config: AgentConfig;
}

export default function IntegrationPage({ params }: { params: Promise<{ agentId: string }> }) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    params.then(({ agentId }) => {
      fetch(`/api/agents/${agentId}`)
        .then(res => res.json())
        .then(data => setAgent(data));
    });
  }, [params]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (!agent) return null;

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

  const webSnippet = `<!-- Neural Agent: ${agent.name} -->
<script 
  src="${baseUrl}/api/agents/${agent.id}/widget.js" 
  async
></script>`;

  const reactSnippet = `"use client";

import { useEffect } from "react";

export function NeuralAgent() {
  useEffect(() => {
    // Neural Synchronization Protocol
    const script = document.createElement("script");
    script.src = "${baseUrl}/api/agents/${agent.id}/widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
      const widget = document.getElementById("ai-agent-widget-${agent.id}");
      if (widget) widget.remove();
    };
  }, []);

  return null;
}`;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 sm:p-12 lg:p-16">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="space-y-4">
          <Link 
            href="/admin/agents" 
            className="inline-flex items-center gap-2 text-xs font-bold text-white/50 hover:text-accent transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            BACK TO DASHBOARD
          </Link>
          <div className="flex items-center gap-6">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-background"
              style={{ backgroundColor: agent.config?.branding?.primaryColor || 'var(--accent)' }}
            >
              <Bot size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter">INTEGRATE {agent.name.toUpperCase()}</h1>
              <p className="text-white/40 text-sm">Deploy your agent across any platform with these simple integrations.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: 'web', icon: Globe, label: 'Website (HTML)', active: true },
            { id: 'react', icon: Code, label: 'React / Next.js', active: true },
            { id: 'mobile', icon: Smartphone, label: 'Mobile (SDK)', active: false },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`glass-card p-6 rounded-3xl border ${item.active ? 'border-accent/30 bg-accent/5' : 'border-white/5 bg-white/5'} transition-all`}
            >
              <item.icon size={24} className={item.active ? 'text-accent' : 'text-white/20'} />
              <p className="mt-4 font-bold tracking-tight">{item.label}</p>
              {!item.active && <p className="text-[10px] text-white/20 font-black uppercase tracking-widest mt-1">COMING SOON</p>}
            </div>
          ))}
        </div>

        <div className="space-y-8">
          {/* Universal Web Widget */}
          <div className="glass-card p-8 rounded-[40px] border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="text-accent" size={20} />
                <h2 className="text-xl font-bold tracking-tight italic uppercase">Universal Web Widget</h2>
              </div>
              <button 
                onClick={() => copyToClipboard(webSnippet, 1)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors"
              >
                {copiedIndex === 1 ? <Check size={14} /> : <Copy size={14} />}
                {copiedIndex === 1 ? 'COPIED' : 'COPY SNIPPET'}
              </button>
            </div>
            
            <p className="text-sm text-white/40 max-w-2xl">
              Paste this snippet into the <code className="text-accent font-mono">&lt;head&gt;</code> or <code className="text-accent font-mono">&lt;body&gt;</code> of any HTML website to deploy your agent instantly.
            </p>

            <div className="bg-[#0a0a0a] rounded-2xl p-6 font-mono text-xs text-white/80 border border-white/5 relative overflow-hidden group">
              <pre className="whitespace-pre-wrap">{webSnippet}</pre>
            </div>
          </div>

          {/* React Component */}
          <div className="glass-card p-8 rounded-[40px] border-white/5 space-y-6 hover:bg-white/1 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Code className="text-accent" size={20} />
                <h2 className="text-xl font-bold tracking-tight italic uppercase">React / Next.js Hook</h2>
              </div>
              <button 
                onClick={() => copyToClipboard(reactSnippet, 2)}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors"
              >
                {copiedIndex === 2 ? <Check size={14} /> : <Copy size={14} />}
                {copiedIndex === 2 ? 'COPIED' : 'COPY COMPONENT'}
              </button>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl p-6 font-mono text-xs text-white/80 border border-white/5 relative overflow-hidden group">
              <pre className="whitespace-pre-wrap">{reactSnippet}</pre>
            </div>
          </div>

          {/* Documentation Link */}
          <div className="bg-white/5 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/5">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-lg font-bold tracking-tight italic uppercase">Need more control?</p>
              <p className="text-sm text-white/40">Check our advanced SDK documentation for custom mobile and desktop integrations.</p>
            </div>
            <Link 
              href="/docs/agents/sdk"
              className="px-8 py-4 bg-white text-background rounded-2xl font-black text-xs hover:scale-105 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              READ FULL DOCS <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
