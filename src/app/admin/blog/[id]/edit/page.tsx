"use client";

import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Tag as TagIcon, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    tags: "",
    published: false
  });

  useEffect(() => {
    if (id) {
      const loadPost = async () => {
        try {
          const res = await fetch(`/api/admin/posts/${id}`);
          if (!res.ok) throw new Error("Entry not found");
          const data = await res.json();
          setFormData({
            ...data,
            tags: (JSON.parse(data.tags) as string[]).join(", ")
          });
        } catch (err) {
          setError(err instanceof Error ? err.message : "Neural link failure");
        } finally {
          setLoading(false);
        }
      };
      loadPost();
    }
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    
    setFormData({ ...formData, title, slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: JSON.stringify(formData.tags.split(",").map(t => t.trim()).filter(t => t !== ""))
        })
      });

      if (!res.ok) throw new Error("Failed to synchronize post");

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Synchronization failure");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Confirm Deletion of Neural Insight? This action is irreversible.")) return;
    
    try {
      const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to purge entry");
      router.push("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Purge cycle failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/blog"
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Command List
        </Link>

        <div className="flex items-center gap-4">
          <button 
            onClick={handleDelete}
            className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all shadow-lg shadow-red-500/10"
            title="Purge Entry"
          >
            <Trash2 size={16} />
          </button>

          <Link 
            href={`/blog/${formData.slug}`}
            target="_blank"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Eye size={16} /> View Production
          </Link>
          <button 
            onClick={handleSubmit}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-accent text-white font-bold uppercase text-xs tracking-widest hover:bg-accent/80 transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Synchronize Cache
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2">Primary Heading</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="The Future of AI Observability..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-xl font-bold focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2">Knowledge Payload (Markdown)</label>
              <textarea 
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your insights here..."
                className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-sm font-light min-h-[500px] focus:outline-0 focus:border-accent/40 focus:bg-white/10 transition-all font-mono leading-relaxed text-white/90"
                required
              />
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          <div className="glass-card p-8 rounded-3xl border border-white/5 space-y-8">
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Publication Meta</h4>
              
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/40">URL Fragment (Slug)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-xs font-mono text-accent focus:outline-0"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Status</span>
                  <span className={`text-[9px] font-bold ${formData.published ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {formData.published ? 'LIVE NODE' : 'LOCAL CACHE'}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white/40 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent peer-checked:after:bg-white"></div>
                </label>
              </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Executive Summary</h4>
              <textarea 
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief summary for indexing..."
                className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-xs font-light min-h-[120px] focus:outline-0 text-white/60"
              />
            </div>

            <div className="space-y-4 pt-8 border-t border-white/5">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 flex items-center gap-2">
                <TagIcon size={12} /> Neural Tags
              </h4>
              <input 
                type="text" 
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="tech, ai, product (comma separated)"
                className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-xs focus:outline-0 text-white/80"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-start gap-3"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-start gap-3"
              >
                <CheckCircle2 size={16} className="shrink-0" />
                <span>Insight synchronized successfully.</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}
