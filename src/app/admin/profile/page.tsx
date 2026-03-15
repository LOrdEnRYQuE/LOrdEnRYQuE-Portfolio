"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Activity, 
  Save,
  Loader2,
  Camera,
  Terminal,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function ProfilePage() {
  const { data: session, update: updateSession } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: ""
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user?.name || "",
        email: session.user?.email || "",
        image: session.user?.image || ""
      }));
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password || undefined,
          image: formData.image
        })
      });

      if (res.ok) {
        setSuccess("Profile synchronization complete");
        await updateSession();
        setFormData(prev => ({ ...prev, password: "", confirmPassword: "" }));
      } else {
        const data = await res.text();
        setError(data || "Failed to update profile");
      }
    } catch {
      setError("Network error: synchronization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 sm:p-12 lg:p-16 space-y-12 max-w-5xl mx-auto">
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[8px] font-black uppercase tracking-[0.2em]">
          <ShieldCheck size={10} /> Identity Verification Protocol Active
        </div>
        <h1 className="text-5xl font-black tracking-tighter uppercase italic">
          User <span className="text-accent underline underline-offset-8">Profile</span>
        </h1>
        <p className="text-white/40 text-sm max-w-xl leading-relaxed italic border-l-2 border-white/5 pl-4 ml-1">
          Managing administrative identity, authorization credentials, and neural synchronization parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Profile Identity Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-card rounded-[40px] border-white/5 p-10 flex flex-col items-center text-center space-y-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            
            <div className="relative">
              <div className="w-32 h-32 rounded-[40px] bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
                {formData.image ? (
                  <Image src={formData.image} alt="Profile" width={128} height={128} className="w-full h-full object-cover" />
                ) : (
                  <UserIcon size={48} className="text-white/10" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                  <Camera size={24} className="text-accent" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-accent border border-white/10 flex items-center justify-center shadow-accent-glow-sm">
                <Activity size={18} className="text-white" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-black uppercase tracking-tight italic">{formData.name || 'Admin Node'}</h2>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Level 4 Oversight</p>
            </div>

            <div className="w-full grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div className="space-y-1">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Status</p>
                <p className="text-[10px] font-bold text-emerald-400 uppercase">Synchronized</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Uptime</p>
                <p className="text-[10px] font-bold text-accent uppercase">99.9%</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white/2 border border-white/5 rounded-3xl space-y-4">
             <div className="flex items-center gap-3 text-white/40">
                <Terminal size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">System Logs</span>
             </div>
             <div className="text-[9px] font-mono text-white/20 leading-loose">
                [SYSTEM] PRTCL_SYNC_INIT... OK<br/>
                [AUTH] IDENT_VERIF_PASSED... 100%<br/>
                [ADMIN] OVERSIGHT_ACTIVE_L4
             </div>
          </div>
        </div>

        {/* Configuration Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-card rounded-[48px] border-white/5 p-12 space-y-10">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                    <UserIcon size={12} /> Designation (Name)
                  </label>
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-[13px] font-black focus:outline-hidden focus:border-accent/40 focus:bg-white/7 transition-all placeholder:text-white/10"
                    placeholder="Enter identity label..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                    <Mail size={12} /> Communication Node (Email)
                  </label>
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-[13px] font-black focus:outline-hidden focus:border-accent/40 focus:bg-white/7 transition-all placeholder:text-white/10"
                    placeholder="admin@lordenryque.com"
                  />
                </div>
              </div>

              <div className="h-px bg-white/5 w-full" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5 relative">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                    <Lock size={12} /> New Auth Token (Password)
                  </label>
                  <input 
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-[13px] font-black focus:outline-hidden focus:border-accent/40 focus:bg-white/7 transition-all placeholder:text-white/10"
                    placeholder="Empty to retain current..."
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                    <ShieldCheck size={12} /> Confirm Token
                  </label>
                  <input 
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-[13px] font-black focus:outline-hidden focus:border-accent/40 focus:bg-white/7 transition-all placeholder:text-white/10"
                    placeholder="Re-enter for verification..."
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] ml-2 flex items-center gap-2">
                  <Camera size={12} /> Avatar Sequence (Image URL)
                </label>
                <input 
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-[13px] font-black focus:outline-hidden focus:border-accent/40 focus:bg-white/7 transition-all placeholder:text-white/10"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest"
                >
                  <AlertCircle size={14} /> {error}
                </motion.div>
              )}
              {success && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3 text-emerald-500 text-[10px] font-black uppercase tracking-widest"
                >
                  <ShieldCheck size={14} /> {success}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-accent text-white font-black uppercase tracking-[0.3em] py-6 rounded-3xl text-sm flex items-center justify-center gap-3 hover:shadow-accent-glow transition-all disabled:opacity-50 group"
            >
              {loading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  <Save size={20} className="group-hover:scale-110 transition-transform" /> 
                  Synchronize Identity
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
