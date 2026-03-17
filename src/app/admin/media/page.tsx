"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Image as ImageIcon, 
  Search, 
  Filter, 
  Upload, 
  Grid2X2, 
  List, 
  MoreVertical, 
  Download, 
  Trash2, 
  FileText, 
  FileJson, 
  Eye
} from "lucide-react";
import { motion } from "framer-motion";

interface Asset {
  _id: string;
  title: string;
  type: string;
  ext: string;
  size: string;
  url: string;
  date: string;
}

export default function MediaVaultPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setAssets(data.map((a: { _id: string; title: string; url: string; type: "IMAGE" | "DOCUMENT" | "DATA"; size: string; ext: string; _creationTime: number }) => ({
          ...a,
          date: new Date(a._creationTime).toLocaleDateString()
        })));
      }
    } catch (e) {
      console.error("Failed to fetch assets", e);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        fetchAssets();
      }
    } catch (e) {
      console.error("Upload failed", e);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this asset?")) return;

    try {
      const res = await fetch(`/api/admin/media/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAssets(prev => prev.filter(a => a._id !== id));
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const filteredAssets = assets.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case "IMAGE": return <ImageIcon size={20} />;
      case "DOCUMENT": return <FileText size={20} />;
      case "DATA": return <FileJson size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <div className="p-12 space-y-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <ImageIcon size={16} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
              Media<span className="text-accent underline decoration-4 underline-offset-8">Vault</span>
            </h1>
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            Centralized Asset Intelligence & Storage
          </p>
        </div>

        <div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-2xl font-black text-[11px] uppercase tracking-wider hover:shadow-accent-glow transition-all disabled:opacity-50"
          >
            {uploading ? <MoreVertical className="animate-spin" size={16} /> : <Upload size={16} />} 
            {uploading ? "Uploading..." : "Upload Asset"}
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-3xl bg-white/2 border border-white/5">
        <div className="flex items-center gap-4 flex-1 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              placeholder="Search assets..."
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-[11px] font-bold text-white placeholder:text-white/10 focus:border-accent/40 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-white/5">
            <button 
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'}`}
            >
              <Grid2X2 size={16} />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-white/20 hover:text-white'}`}
            >
              <List size={16} />
            </button>
          </div>
          <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Assets Display */}
      {loading ? (
        <div className="py-20 text-center space-y-4">
          <MoreVertical className="mx-auto text-accent animate-spin" size={32} />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Scanning Vault Layers...</p>
        </div>
      ) : filteredAssets.length === 0 ? (
        <div className="py-20 text-center glass-card rounded-[40px] border-white/5 space-y-4">
          <ImageIcon className="mx-auto text-white/5" size={64} />
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Vault is empty</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredAssets.map((asset, i) => (
            <motion.div
              key={asset._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative aspect-square rounded-[32px] bg-white/2 border border-white/5 hover:border-accent/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-all" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                 <div className="mb-4 text-white/20 group-hover:text-accent group-hover:scale-110 transition-all duration-500">
                    {getIcon(asset.type)}
                 </div>
                 <p className="text-[10px] font-black uppercase tracking-wider text-white truncate w-full px-2 mb-1">
                    {asset.title}
                 </p>
                 <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                    {asset.ext} • {asset.size}
                 </p>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-all">
                 <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10">
                    <a href={asset.url} target="_blank" rel="noopener noreferrer" className="flex-1 p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all text-center">
                       <Eye size={14} className="mx-auto" />
                    </a>
                    <div className="w-px h-4 bg-white/10" />
                    <a href={asset.url} download className="flex-1 p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all text-center">
                       <Download size={14} className="mx-auto" />
                    </a>
                    <div className="w-px h-4 bg-white/10" />
                    <button 
                      onClick={() => handleDelete(asset._id)}
                      className="flex-1 p-2 rounded-xl hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
                    >
                       <Trash2 size={14} className="mx-auto" />
                    </button>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
           {filteredAssets.map((asset, i) => (
             <motion.div
               key={asset._id}
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: i * 0.05 }}
               className="flex items-center gap-6 p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-accent/20 transition-all group"
             >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-accent transition-all">
                   {getIcon(asset.type)}
                </div>
                <div className="flex-1">
                   <p className="text-[11px] font-black uppercase tracking-wider text-white mb-1">{asset.title}</p>
                   <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">
                      {asset.type} • {asset.ext}
                   </p>
                </div>
                <div className="text-right px-6 border-r border-white/5">
                   <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">{asset.size}</p>
                   <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{asset.date}</p>
                </div>
                <div className="flex items-center gap-2 px-2">
                   <a href={asset.url} download className="p-2 rounded-xl hover:bg-white/5 text-white/40 hover:text-white transition-all">
                      <Download size={14} />
                   </a>
                   <button 
                    onClick={() => handleDelete(asset._id)}
                    className="p-2 rounded-xl hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all"
                   >
                      <Trash2 size={14} />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      )}
    </div>
  );
}
