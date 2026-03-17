"use client";

import React, { useState, useEffect } from "react";
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  Settings2,
  Layers,
  ChevronRight,
  Activity,
  Cpu,
  X,
  Loader2,
  User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


interface Project {
  _id: string;
  title: string;
  description: string | null;
  status: string;
  health: string;
  efficiency: number;
  _creationTime: number;
  _count: {
    stages: number;
    documents: number;
  };
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

interface UserSummary {
  _id: string;
  name: string | null;
  email: string | null;
}

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "ACTIVE",
    userId: ""
  });
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      setUsers(data.filter((u: UserSummary & { role: string }) => u.role === "CLIENT"));
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { 
      label: "Active Project", 
      value: projects.filter(p => p.status === "ACTIVE").length.toString().padStart(2, '0'), 
      icon: Layers, 
      color: "text-accent" 
    },
    { 
      label: "Total Stages", 
      value: projects.reduce((acc, p) => acc + (p._count?.stages || 0), 0).toString(), 
      icon: Clock, 
      color: "text-blue-400" 
    },
    { 
      label: "Avg Efficiency", 
      value: projects.length > 0 
        ? `${Math.round(projects.reduce((acc, p) => acc + (p.efficiency || 0), 0) / projects.length)}%`
        : "0%", 
      icon: Activity, 
      color: "text-emerald-400" 
    },
    { 
      label: "Documents", 
      value: projects.reduce((acc, p) => acc + (p._count?.documents || 0), 0).toString(), 
      icon: Cpu, 
      color: "text-purple-400" 
    },
  ];

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // For now, we'll try to get the admin user ID or just use a placeholder if needed
      // Ideally we'd have the session userId here.
      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData
        })
      });

      if (res.ok) {
        setIsCreateOpen(false);
        setFormData({ title: "", description: "", status: "ACTIVE", userId: "" });
        fetchProjects();
      }
    } catch (error) {
      console.error("Creation failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-12 space-y-12">
      {/* Creation Modal */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl" 
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black tracking-tighter uppercase italic">
                      Initialize <span className="text-accent">Project</span>
                    </h2>
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-widest mt-1">Neural Stream Protocol v1.0</p>
                  </div>
                  <button 
                    onClick={() => setIsCreateOpen(false)}
                    className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center text-white/20 hover:text-white hover:border-white/20 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Project Title</label>
                    <input 
                      required
                      placeholder="e.g. Neural Engine Genesis"
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-sm font-bold text-white placeholder:text-white/10 outline-none focus:border-accent/40 transition-all"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Objective Description</label>
                    <textarea 
                      placeholder="Define the project mission trajectory..."
                      className="w-full bg-white/5 border border-white/5 rounded-2xl p-6 text-sm font-bold text-white placeholder:text-white/10 outline-none focus:border-accent/40 transition-all resize-none"
                      rows={4}
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Initial Status</label>
                      <select 
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-accent/40 appearance-none transition-all"
                        value={formData.status}
                        onChange={e => setFormData({ ...formData, status: e.target.value })}
                      >
                        <option value="ACTIVE">Active</option>
                        <option value="DEVELOPMENT">Development</option>
                        <option value="STAGING">Staging</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Assign to Client</label>
                      <select 
                        required
                        className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-accent/40 appearance-none transition-all"
                        value={formData.userId}
                        onChange={e => setFormData({ ...formData, userId: e.target.value })}
                      >
                        <option value="" disabled className="bg-black text-white/20">Select a client...</option>
                        {users.map(user => (
                          <option key={user._id} value={user._id} className="bg-black text-white">
                            {user.name || user.email}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-6 bg-accent text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:shadow-accent-glow transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                    Initiate Neural Merge
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <FolderKanban size={16} />
            </div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">
              Project<span className="text-accent underline decoration-4 underline-offset-8">Command</span>
            </h1>
          </div>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">
            Lifecycle Management & Neural Deployment
          </p>
        </div>

        <button 
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-accent text-black rounded-2xl font-black text-[11px] uppercase tracking-wider hover:shadow-accent-glow transition-all"
        >
          <Plus size={16} /> New Project
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-3xl bg-white/2 border border-white/5 hover:border-white/10 transition-all group"
          >
            <stat.icon className={`${stat.color} mb-4 opacity-50 group-hover:opacity-100 transition-all`} size={20} />
            <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{stat.label}</p>
            <p className="text-3xl font-black tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between p-4 rounded-3xl bg-white/2 border border-white/5">
        <div className="flex items-center gap-4 flex-1 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
            <input 
              placeholder="Filter by title, stage, or status..."
              className="w-full bg-black/40 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-[11px] font-bold text-white placeholder:text-white/10 focus:border-accent/40 transition-all outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="col-span-full py-20 text-center">
            <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-white/20 font-black uppercase tracking-widest text-[10px]">Accessing Neural Nodes...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-[40px]">
            <FolderKanban size={48} className="mx-auto text-white/10 mb-4" />
            <p className="text-white/40 font-black uppercase tracking-widest text-xs">No project streams detected</p>
          </div>
        ) : (
          filteredProjects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-accent/5 blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
              <div className="relative p-8 rounded-[40px] bg-black/40 border border-white/5 group-hover:border-accent/20 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 right-0 p-8">
                  <div className={`px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-widest ${
                    project.status === 'ACTIVE' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
                  }`}>
                    {project.status}
                  </div>
                </div>

                <div className="flex items-start gap-6 mb-10">
                  <div className="w-16 h-16 rounded-3xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-all duration-500">
                    <Folders size={28} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tighter uppercase mb-2 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-widest">
                        <User size={12} /> {project.user?.name || project.user?.email || "Unknown"}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                        <Layers size={12} /> {project._count?.stages || 0} Stages
                      </div>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/30 uppercase tracking-widest">
                        <Clock size={12} /> {new Date(project._creationTime).toLocaleDateString()}
                      </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/20">System Health</p>
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-black ${project.health === 'STABLE' ? 'text-emerald-400' : 'text-accent'}`}>{project.health}</p>
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${project.health === 'STABLE' ? 'bg-emerald-400 w-full' : 'bg-accent w-[60%]'}`} />
                      </div>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/20">Efficiency</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-black text-white">{project.efficiency}%</p>
                      <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: `${project.efficiency}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(j => (
                      <div key={j} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-white/5 flex items-center justify-center text-[10px] font-black uppercase text-white/40">
                        U{j}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-3 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white hover:border-white/20 transition-all">
                      <Settings2 size={16} />
                    </button>
                    <a 
                      href={`/admin/projects/${project._id}`}
                      className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                      Manage <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Internal icons helper
function Folders({ size }: { size: number }) {
  return <FolderKanban size={size} />;
}
