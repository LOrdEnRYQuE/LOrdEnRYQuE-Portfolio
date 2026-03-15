"use client";

import { useSession } from "next-auth/react";
import ProjectTimeline from "@/components/client/ProjectTimeline";
import OnboardingWizard from "@/components/client/OnboardingWizard";
import { Badge } from "@/components/ui/Badge";
import { siteConfig } from "@/content/site";
import { LayoutDashboard, MessageSquare, FileText, Settings, LogOut, LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface ProjectStage {
  id: string;
  title: string;
  description: string;
  status: string;
  order: number;
}

interface ProjectData {
  id: string;
  title: string;
  description: string;
  status: string;
  health: string;
  efficiency: number;
  stages: ProjectStage[];
}

export default function ClientPortal() {
  const { data: session } = useSession();
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch("/api/client/project");
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        }
      } catch (error) {
        console.error("Failed to fetch project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-foreground flex flex-col pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        
        {/* Sidebar Nav */}
        <aside className="space-y-8 hidden lg:block">
           <div className="space-y-2">
              <h3 className="text-xl font-bold text-white tracking-tight">{t("portal.title")}</h3>
              <p className="text-xs text-gray-500">
                {session?.user?.name ? `${t("portal.welcome")}, ${session.user.name}` : t("portal.welcome")}
              </p>
           </div>

           <nav className="space-y-2">
              <SidebarItem icon={LayoutDashboard} label={t("portal.nav.overview")} active={pathname === "/client"} href="/client" />
              <SidebarItem icon={FileText} label={t("portal.nav.docs")} active={pathname === "/client/documents"} href="/client/documents" />
              <SidebarItem icon={MessageSquare} label={t("portal.nav.support")} active={pathname === "/client/support"} href="/client/support" />
              <SidebarItem icon={Settings} label={t("portal.nav.settings")} active={pathname === "/client/settings"} href="/client/settings" />
           </nav>

           <div className="pt-8 border-t border-white/5">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-3 text-sm text-gray-500 hover:text-red-400 transition-colors group"
              >
                 <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                 {t("portal.sign_out")}
              </button>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="space-y-12">
           {/* Active Project Header */}
           <div className="glass-card p-10 rounded-3xl border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 flex flex-col items-end gap-3">
                 <Badge variant="accent" className="bg-accent text-background border-none px-4 py-1.5 font-black shadow-lg shadow-accent/20">{t("portal.project.active_badge")}</Badge>
                 <div className="flex items-center gap-2 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10 backdrop-blur-md">
                    <motion.div 
                       animate={{ opacity: [0.4, 1, 0.4] }} 
                       transition={{ duration: 2, repeat: Infinity }}
                       className="w-1.5 h-1.5 rounded-full bg-accent" 
                    />
                    <span className="text-[9px] text-accent font-black tracking-[0.2em] uppercase">Status: {project?.status || "Loading..."}</span>
                 </div>
              </div>

              <div className="max-w-xl space-y-6">
                 <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">{project?.title || t("portal.project.title")}</h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                       {project?.description || t("portal.project.desc")}
                    </p>
                 </div>

                 <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                       <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">{t("portal.project.health")}</span>
                       <span className="text-emerald-400 font-bold">{project?.health || t("portal.project.health.stable")}</span>
                    </div>
                    <div className="flex flex-col border-l border-white/5 pl-6">
                       <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">{t("portal.project.efficiency")}</span>
                       <span className="text-white font-bold">{project?.efficiency || 0}%</span>
                    </div>
                    <div className="flex flex-col border-l border-white/5 pl-6">
                       <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest">{t("portal.project.manager")}</span>
                       <span className="text-white font-bold">{siteConfig.brand}</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Timeline Section */}
           <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-2xl font-bold text-white tracking-tight">{t("portal.timeline.title")}</h2>
                 <span className="text-xs text-accent font-bold tracking-widest uppercase">{t("portal.timeline.status")}</span>
              </div>
               <div className="glass-card rounded-3xl border-white/5 p-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                    </div>
                  ) : (
                    <ProjectTimeline stages={project?.stages} />
                  )}
               </div>
           </div>

           {/* Onboarding Wizard (Mock) */}
           <div className="space-y-8 pt-12 border-t border-white/5">
              <div className="text-center space-y-2 mb-12">
                 <h2 className="text-3xl font-bold text-white tracking-tight">{t("portal.onboarding.title")}</h2>
                 <p className="text-gray-500 text-sm max-w-lg mx-auto leading-relaxed">
                    {t("portal.onboarding.desc")}
                 </p>
              </div>
              
              <OnboardingWizard />
           </div>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ 
  icon: Icon, 
  label, 
  active = false, 
  href 
}: { 
  icon: LucideIcon, 
  label: string, 
  active?: boolean,
  href: string
}) {
  return (
    <Link href={href}>
      <div className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${
        active 
          ? 'bg-accent/10 text-accent font-bold shadow-lg shadow-accent/5' 
          : 'text-gray-500 hover:text-white hover:bg-white/5'
      }`}>
        <Icon size={20} />
        <span className="text-sm">{label}</span>
        {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent" />}
      </div>
    </Link>
  );
}
