"use client";

import { useSession, signOut } from "next-auth/react";
import { useI18n } from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, MessageSquare, FileText, Settings, LogOut, LucideIcon } from "lucide-react";
import Link from "next/link";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

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
        <main className="min-w-0">
          {children}
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
