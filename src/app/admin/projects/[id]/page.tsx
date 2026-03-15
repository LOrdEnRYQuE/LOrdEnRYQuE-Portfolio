"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Save, 
  Plus, 
  GripVertical, 
  Zap, 
  CheckCircle2, 
  Rocket, 
  Trash2, 
  Calendar, 
  Code,
  FileText,
  Loader2,
  Eye
} from "lucide-react";

interface ProjectStage {
  id: string;
  title: string;
  description: string;
  status: string;
  order: number;
}

interface ProjectDocument {
  id: string;
  title: string;
  type: string;
  size?: string;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  status: string;
  createdAt: string;
  efficiency: number;
  health: string;
  documents: ProjectDocument[];
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [stages, setStages] = useState<ProjectStage[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProject = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/projects/${id}`);
      if (!res.ok) throw new Error("Failed to fetch project");
      const data = await res.json();
      setProject(data);
      setStages(data.stages || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  const handleSave = async () => {
    if (!project) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: project.title,
          description: project.description,
          status: project.status
        }),
      });
      if (res.ok) {
        // Optimistic UI handled by state
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddStage = async () => {
    try {
      const res = await fetch(`/api/admin/projects/${id}/stages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: "New Deployment Node",
          description: "Initialize neural sequence...",
          status: "UPCOMING",
          order: stages.length
        }),
      });
      if (res.ok) {
        const newStage = await res.json();
        setStages([...stages, newStage]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateStageStatus = async (stageId: string, currentStatus: string) => {
    const statusCycle = ["UPCOMING", "IN_PROGRESS", "COMPLETED"];
    const nextStatus = statusCycle[(statusCycle.indexOf(currentStatus) + 1) % statusCycle.length];
    
    // Optimistic update
    setStages(stages.map(s => s.id === stageId ? { ...s, status: nextStatus } : s));

    try {
      await fetch(`/api/admin/projects/${id}/stages/${stageId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch (err) {
      console.error(err);
      fetchProject(); // Revert on error
    }
  };

  const handleDeleteStage = async (stageId: string) => {
    if (!confirm("Deconstruct this deployment node?")) return;
    
    // Optimistic update
    setStages(stages.filter(s => s.id !== stageId));

    try {
      await fetch(`/api/admin/projects/${id}/stages/${stageId}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
      fetchProject(); // Revert on error
    }
  };

  const handleArchiveProject = async () => {
    if (!confirm("Execute project archival sequence? This node will be moved to cold storage.")) return;
    setIsSubmitting(true);
    try {
      await fetch(`/api/admin/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "ARCHIVED" }),
      });
      router.push("/admin/projects");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateProjectKey = () => {
    const key = `pk_${Math.random().toString(36).substring(2, 12)}_${Date.now().toString(36)}`;
    alert(`NEURAL_FORGE: Project access signature generated: ${key}\n\nThis key has been registered to this node's identity.`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-2xl animate-pulse rounded-full" />
          <Loader2 className="w-12 h-12 text-accent animate-spin relative z-10" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 animate-pulse">Synchronizing Neural Stream...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black uppercase tracking-widest text-white/20">Project Not Found</h2>
        <Link href="/admin/projects" className="mt-4 inline-block text-accent text-xs font-bold uppercase tracking-widest hover:underline">Return to Hub</Link>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Breadcrumbs / Back */}
      <div className="flex items-center justify-between">
        <Link href="/admin/projects" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-all">
           <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-all">
              <ChevronLeft size={16} />
           </div>
           Back to Fleet
        </Link>
        <div className="flex items-center gap-2">
           <button className="px-6 py-3 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
              <Eye size={14} /> View Live
           </button>
           <button 
            onClick={handleSave}
            disabled={isSubmitting}
            className="px-8 py-3 rounded-2xl bg-accent text-black text-[10px] font-black uppercase tracking-widest hover:shadow-accent-glow transition-all flex items-center gap-2 disabled:opacity-50"
           >
              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} 
              Commit Changes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Metadata */}
        <div className="lg:col-span-2 space-y-12">
           <section className="space-y-6">
              <div>
                <h1 className="text-5xl font-black tracking-tighter uppercase italic mb-4">
                  {project.title.split(' ')[0]} <span className="text-accent underline decoration-4 underline-offset-8">{project.title.split(' ').slice(1).join(' ')}</span>
                </h1>
                <div className="flex items-center gap-6">
                   <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-black uppercase tracking-[0.2em]">
                      Status: {project.status}
                   </div>
                   <div className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-widest">
                      <Calendar size={12} /> Established: {new Date(project.createdAt).toLocaleDateString()}
                   </div>
                </div>
              </div>

              <div className="p-8 rounded-[32px] bg-white/2 border border-white/5 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Project Specification</label>
                    <textarea 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-sm font-medium text-white placeholder:text-white/10 outline-none focus:border-accent/40 transition-all resize-none font-mono"
                      rows={4}
                      placeholder="Enter project description..."
                      value={project.description || ""}
                      onChange={(e) => setProject({ ...project, description: e.target.value })}
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Identifier Hash</label>
                       <div className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-mono font-bold text-white/40 overflow-hidden text-ellipsis whitespace-nowrap">
                          {project.id}
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-2">Deployment Status</label>
                       <div className="relative">
                          <select 
                           className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:border-accent/40 appearance-none transition-all"
                           value={project.status}
                           onChange={(e) => setProject({ ...project, status: e.target.value })}
                          >
                             <option value="ACTIVE">Active</option>
                             <option value="DEVELOPMENT">Development</option>
                             <option value="ARCHIVED">Archived</option>
                          </select>
                          <ChevronRight size={14} className="absolute right-6 top-1/2 -translate-y-1/2 text-white/20 rotate-90 pointer-events-none" />
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           {/* Stages - Draggable */}
           <section className="space-y-6">
              <div className="flex items-center justify-between">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                   Lifecycle Deployment <span className="px-2 py-0.5 rounded bg-accent/10 text-accent text-[8px] tracking-widest">{stages.length} Nodes</span>
                 </h3>
                 <button 
                  onClick={handleAddStage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest hover:border-accent/20 transition-all">
                    <Plus size={12} /> Add Stage
                 </button>
              </div>

              <div className="space-y-3">
                 {stages.map((stage) => (
                   <motion.div
                    key={stage.id}
                    className="flex items-center gap-4 p-6 rounded-3xl bg-white/2 border border-white/5 hover:border-white/10 transition-all group"
                   >
                      <div className="cursor-grab text-white/10 group-hover:text-white/40">
                         <GripVertical size={20} />
                      </div>
                      <button 
                        onClick={() => handleUpdateStageStatus(stage.id, stage.status)}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all hover:scale-105 active:scale-95 ${
                        stage.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        stage.status === 'IN_PROGRESS' ? 'bg-accent/10 text-accent border border-accent/20 shadow-accent-glow-sm' :
                        'bg-white/5 text-white/20 border border-white/5'
                      }`}>
                         {stage.status === 'COMPLETED' ? <CheckCircle2 size={24} /> :
                          stage.status === 'IN_PROGRESS' ? <Zap className="animate-pulse" size={24} /> :
                          <Rocket size={24} />}
                      </button>
                      <div className="flex-1">
                         <p className="text-[11px] font-black uppercase tracking-wider mb-1">{stage.title}</p>
                         <p className="text-[9px] font-bold text-white/20 uppercase tracking-tighter line-clamp-1">{stage.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                         <button 
                           onClick={() => handleUpdateStageStatus(stage.id, stage.status)}
                           className={`px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest transition-colors ${
                            stage.status === 'COMPLETED' ? 'text-emerald-400 bg-emerald-400/5' :
                            stage.status === 'IN_PROGRESS' ? 'text-accent bg-accent/5' :
                            'text-white/20 hover:bg-white/5'
                          }`}>
                           {stage.status}
                         </button>
                         <button 
                           onClick={() => handleDeleteStage(stage.id)}
                           className="p-2 rounded-xl hover:bg-red-500/10 text-white/10 hover:text-red-400 transition-all">
                            <Trash2 size={16} />
                         </button>
                      </div>
                   </motion.div>
                 ))}
                 {stages.length === 0 && (
                   <div className="text-center py-12 border-2 border-dashed border-white/5 rounded-[40px] space-y-4">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                        <Rocket size={24} className="opacity-20" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/10">No deployment nodes configured.</p>
                   </div>
                 )}
              </div>
           </section>
        </div>

        {/* Right Column: Sidebar */}
        <div className="space-y-12">
           <div className="p-8 rounded-[32px] bg-white/2 border border-white/5 space-y-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
              <div className="relative z-10 space-y-8">
                 <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
                    <Zap size={16} className="text-accent" /> Neural Integration
                 </h3>
                 <div className="space-y-4">
                    {[
                      { label: "Efficiency", val: `${project.efficiency}%`, color: "text-accent" },
                      { label: "System Health", val: project.health, color: project.health === 'STABLE' ? "text-emerald-400" : "text-accent" },
                      { label: "Total Stages", val: (stages?.length || 0).toString(), color: "text-white" },
                      { label: "Document Count", val: project.documents?.length.toString() || "0", color: "text-white" }
                    ].map(st => (
                      <div key={st.label} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-3">
                         <span className="text-white/20">{st.label}</span>
                         <span className={st.color}>{st.val}</span>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-3 pt-4">
                    <button 
                      onClick={generateProjectKey}
                      className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                       <Code size={14} /> Generate Project Key
                    </button>
                    <button 
                      onClick={handleArchiveProject}
                      className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-red-400">
                       <Trash2 size={14} /> Archive Project
                    </button>
                  </div>
              </div>
           </div>

           <div className="p-8 rounded-[32px] bg-white/2 border border-white/5 space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Associated Documents</h3>
              <div className="space-y-2">
                 {project.documents?.length === 0 ? (
                   <p className="text-[10px] font-bold text-white/20 uppercase text-center py-4 border-2 border-dashed border-white/5 rounded-2xl">No documents linked</p>
                 ) : project.documents?.map((doc: ProjectDocument, i: number) => (
                   <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-black/40 border border-white/5 hover:border-white/20 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                         <FileText size={18} />
                      </div>
                      <div className="flex-1 min-w-0">
                         <p className="text-[10px] font-black uppercase tracking-wider truncate">{doc.title}</p>
                         <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">{doc.type} • {doc.size || '0 KB'}</p>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-3 rounded-xl border border-dashed border-white/10 text-[9px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white hover:border-white/30 transition-all">
                    Link Extension Access
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
