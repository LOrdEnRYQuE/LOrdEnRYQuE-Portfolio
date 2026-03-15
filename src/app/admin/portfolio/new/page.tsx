"use client";

import { useState } from "react";
import { 
  ArrowLeft,
  Save,
  Globe,
  Github,
  Image as ImageIcon,
  Rocket,
  Code as CodeIcon,
  Star,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewPortfolioProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    summary: "",
    description: "",
    status: "Live",
    stack: "",
    cover: "",
    featured: false,
    liveUrl: "",
    githubUrl: "",
    challenge: "",
    solution: "",
    brief: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const stackArray = formData.stack.split(",").map(s => s.trim()).filter(Boolean);
      const res = await fetch("/api/admin/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          stack: stackArray
        })
      });

      if (res.ok) {
        router.push("/admin/portfolio");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to create project");
      }
    } catch (err) {
      console.error("Creation failed:", err);
      alert("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/portfolio"
            className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">
              New <span className="text-accent underline decoration-4 underline-offset-8">Manifest</span>
            </h1>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
              Initialize technical case study
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Core Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2">
              <Rocket size={14} /> Core Identity
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Internal Title</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. AI Native IDE"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all"
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Unique Slug</label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. ai-native-ide"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-mono focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all"
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Project Status</label>
                <select 
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all appearance-none"
                  value={formData.status}
                  onChange={e => setFormData({ ...formData, status: e.target.value })}
                >
                  <option value="Live">Live</option>
                  <option value="MVP">MVP</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Concept">Concept</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-accent flex items-center gap-2">
              <CodeIcon size={14} /> Tech Specs
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Stack (Comma Separated)</label>
                <input 
                  required
                  type="text" 
                  placeholder="Next.js, Tailwind, Prisma, TS"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all"
                  value={formData.stack}
                  onChange={e => setFormData({ ...formData, stack: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Cover Image URL</label>
                <div className="relative group">
                   <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                   <input 
                    required
                    type="text" 
                    placeholder="/images/projects/project.jpg"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 pl-12 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all"
                    value={formData.cover}
                    onChange={e => setFormData({ ...formData, cover: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/2 border border-white/5 self-end">
                <input 
                  type="checkbox"
                  id="featured"
                  className="w-4 h-4 accent-accent rounded"
                  checked={formData.featured}
                  onChange={e => setFormData({ ...formData, featured: e.target.checked })}
                />
                <label htmlFor="featured" className="text-xs font-black uppercase tracking-widest text-white/60 cursor-pointer flex items-center gap-2">
                  <Star size={12} fill={formData.featured ? "currentColor" : "none"} /> Feature this project
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-accent">Narrative & Case Study</h2>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Public Summary (Short)</label>
              <textarea 
                required
                placeholder="Hook the visitor with a high-level summary..."
                className="w-full h-24 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all resize-none"
                value={formData.summary}
                onChange={e => setFormData({ ...formData, summary: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Full Description</label>
              <textarea 
                required
                placeholder="Detailed project breakdown..."
                className="w-full h-40 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">The Brief</label>
                <textarea 
                  placeholder="Context..."
                  className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all resize-none"
                  value={formData.brief}
                  onChange={e => setFormData({ ...formData, brief: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">The Challenge</label>
                <textarea 
                  placeholder="Bottlenecks..."
                  className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all resize-none"
                  value={formData.challenge}
                  onChange={e => setFormData({ ...formData, challenge: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">The Solution</label>
                <textarea 
                  placeholder="Outcome..."
                  className="w-full h-32 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all resize-none"
                  value={formData.solution}
                  onChange={e => setFormData({ ...formData, solution: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="bg-white/5 border border-white/5 rounded-3xl p-8 space-y-6">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-accent">Deployment Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Live Application URL</label>
              <div className="relative group">
                 <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                 <input 
                  type="url" 
                  placeholder="https://..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 pl-12 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all"
                  value={formData.liveUrl}
                  onChange={e => setFormData({ ...formData, liveUrl: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">GitHub Repository</label>
              <div className="relative group">
                 <Github className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                 <input 
                  type="url" 
                  placeholder="https://github.com/..."
                  className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 pl-12 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all"
                  value={formData.githubUrl}
                  onChange={e => setFormData({ ...formData, githubUrl: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="flex justify-end gap-4 pt-4">
          <Link 
            href="/admin/portfolio"
            className="px-8 py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 font-bold uppercase text-xs tracking-widest hover:text-white transition-all"
          >
            Discard
          </Link>
          <button 
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-10 py-4 rounded-2xl bg-accent text-white font-bold uppercase text-xs tracking-widest hover:bg-accent/80 transition-all shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} 
            Commit Manifest
          </button>
        </div>
      </form>
    </div>
  );
}
