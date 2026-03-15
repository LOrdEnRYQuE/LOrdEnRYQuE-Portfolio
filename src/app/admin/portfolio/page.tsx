"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit3, 
  Trash2,
  ExternalLink,
  Github,
  CheckCircle2,
  Clock,
  Layers,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  summary: string;
  status: string;
  featured: boolean;
  cover: string;
  updatedAt: string;
}

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/admin/portfolio");
      const data = await res.json();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/portfolio/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            Elite <span className="text-accent underline decoration-4 underline-offset-8">Portfolio</span>
          </h1>
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mt-2">
            Work Manifest & Case Study Control
          </p>
        </div>

        <Link 
          href="/admin/portfolio/new"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-accent text-white font-bold uppercase text-xs tracking-widest hover:bg-accent/80 transition-all shadow-lg shadow-accent/20"
        >
          <Plus size={16} /> Add Ready Project
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search manifest..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all"
          />
        </div>
        <button className="px-6 py-4 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse border border-white/5" />
            ))
          ) : filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.05 }}
              className="group relative h-full flex flex-col bg-white/5 border border-white/5 rounded-3xl overflow-hidden hover:border-accent/30 hover:bg-white/10 transition-all duration-500"
            >
              {/* Cover Image Placeholder/Overlay */}
              <div className="h-40 bg-zinc-900 overflow-hidden relative">
                <div className="absolute inset-0 bg-muted-radial opacity-30" />
                <div className="absolute inset-0 flex items-center justify-center font-black text-white/5 text-4xl select-none italic tracking-tighter uppercase p-4 text-center leading-none">
                  {project.title}
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md shadow-lg shadow-accent/20">
                      <Star size={10} fill="currentColor" /> Featured
                    </div>
                  </div>
                )}
                <div className="absolute top-4 right-4 z-10">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${
                    project.status === "Live" 
                    ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                    : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                  }`}>
                    {project.status === "Live" ? <CheckCircle2 size={10} /> : <Clock size={10} />} {project.status}
                  </div>
                </div>
              </div>

              <div className="p-8 flex flex-col grow">
                <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm text-white/40 line-clamp-3 mb-6 grow">
                  {project.summary}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                     <Link 
                      href={`/admin/portfolio/${project.id}/edit`}
                      className="p-2 rounded-xl bg-white/5 hover:bg-accent/20 hover:text-accent transition-all"
                     >
                       <Edit3 size={16} />
                     </Link>
                     <Link 
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-2 rounded-xl bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-500 transition-all"
                     >
                       <Eye size={16} />
                     </Link>
                  </div>

                  <button 
                    onClick={() => handleDelete(project.id)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!loading && filteredProjects.length === 0 && (
        <div className="py-20 text-center space-y-4">
          <div className="inline-flex p-6 rounded-full bg-white/5 border border-white/5 text-white/20 mb-4">
            <Layers size={48} />
          </div>
          <h3 className="text-xl font-bold uppercase tracking-widest">Manifest Empty</h3>
          <p className="text-white/40 text-sm italic">Initialize work evidence by adding your first project.</p>
        </div>
      )}
    </div>
  );
}
