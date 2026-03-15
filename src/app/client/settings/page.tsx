"use client";

import { useI18n } from "@/lib/i18n";
import { useSession } from "next-auth/react";
import { User, Shield, Bell, CreditCard, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function SettingsPage() {
  const { t } = useI18n();
  const { data: session } = useSession();

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white tracking-tight">{t("portal.settings.title") || "PortalSettings"}</h1>
        <p className="text-gray-500 text-sm max-w-lg">
          {t("portal.settings.desc") || "Manage your account, project notification preferences, and billing details."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Section */}
        <section className="glass-card p-10 rounded-3xl border-white/5 space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-accent/10 border-2 border-accent/20 flex items-center justify-center text-accent text-3xl font-bold">
              {session?.user?.name?.[0] || <User size={40} />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{session?.user?.name || "Client"}</h2>
              <p className="text-gray-500 text-sm">{session?.user?.email || "No email provided"}</p>
              <p className="text-[10px] text-accent font-bold uppercase tracking-widest mt-2 px-3 py-1 bg-accent/10 rounded-full inline-block border border-accent/20">Verified Client</p>
            </div>
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="rounded-xl border-white/10 text-gray-500 hover:text-white">
                Edit Profile
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/5">
            <div className="space-y-4">
              <SettingsGroup icon={Shield} title="Security" desc="Two-factor authentication & password changes" />
              <SettingsGroup icon={Bell} title="Notifications" desc="Push, email and Slack project updates" />
              <SettingsGroup icon={CreditCard} title="Billing & Invoices" desc="Payment methods and transaction history" />
            </div>
            <div className="space-y-4">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4">
                  <p className="text-[10px] text-gray-600 uppercase font-black tracking-widest">Active Project</p>
                  <div className="flex items-center justify-between">
                     <p className="text-white font-bold text-sm">lordenryque-scaffold-v1</p>
                     <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Live</p>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="w-3/4 h-full bg-accent" />
                  </div>
                  <p className="text-[10px] text-gray-500 italic">Project initiated on Mar 10, 2024</p>
               </div>
            </div>
          </div>
        </section>

        {/* System Preferences */}
        <section className="glass-card p-10 rounded-3xl border-white/5 space-y-8">
           <h3 className="text-lg font-bold text-white tracking-tight">System Preferences</h3>
           
           <div className="space-y-4">
               <ToggleButton title="AI Concierge Logs" desc="Access detailed developer logs for AI concierge interactions." />
               <ToggleButton title="E-Mail Reports" desc="Receive weekly automated project health status reports." active />
           </div>
        </section>
      </div>
    </div>
  );
}

function SettingsGroup({ icon: Icon, title, desc }: { icon: React.ElementType, title: string, desc: string }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
      <div className="p-3 bg-white/5 text-gray-400 group-hover:text-accent rounded-xl transition-colors">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white mb-0.5">{title}</p>
        <p className="text-xs text-gray-500">{desc}</p>
      </div>
      <ChevronRight size={16} className="text-gray-700 group-hover:text-white transition-colors" />
    </div>
  );
}

function ToggleButton({ title, desc, active = false }: { title: string, desc: string, active?: boolean }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-accent/20 transition-all">
       <div className="space-y-1">
          <p className="text-sm font-bold text-white">{title}</p>
          <p className="text-xs text-gray-500">{desc}</p>
       </div>
       <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${active ? 'bg-accent' : 'bg-gray-800'}`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${active ? 'right-1' : 'left-1'}`} />
       </div>
    </div>
  );
}
