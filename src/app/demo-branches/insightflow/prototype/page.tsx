"use client";

import DemoLayout from "@/components/demos/DemoLayout";
import SaaSStats from "@/components/demos/insight-flow/SaaSStats";
import UserActivity from "@/components/demos/insight-flow/UserActivity";
import PlanSelector from "@/components/demos/insight-flow/PlanSelector";
import { LayoutGrid, BarChart3, Users, Settings, Bell, Search, Menu, LucideIcon } from "lucide-react";

export default function SaaSPrototypePage() {
  return (
    <DemoLayout
      demoTitle="InsightFlow"
      backUrl="/demo-branches/insightflow"
    >
      <div className="flex h-[calc(100vh-64px)] bg-[#080B10] overflow-hidden">
        {/* Mock Sidebar */}
        <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#0D1117] flex-col p-4 hidden md:flex shrink-0">
           <div className="h-12 w-12 rounded-xl bg-accent flex items-center justify-center text-background font-black text-xl mb-12 mx-auto lg:mx-0">
             IF
           </div>
           
           <nav className="space-y-2 flex-1">
              <NavItem icon={LayoutGrid} label="Dashboard" active />
              <NavItem icon={BarChart3} label="Analytics" />
              <NavItem icon={Users} label="Customers" />
              <NavItem icon={Settings} label="Settings" />
           </nav>

           <div className="mt-auto p-4 bg-white/5 rounded-2xl hidden lg:block">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Usage Limit</p>
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mb-2">
                 <div className="bg-accent h-full w-[72%]" />
              </div>
              <p className="text-[10px] font-bold text-white tracking-widest">7,240 / 10,000 requests</p>
           </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollbar-hide">
           {/* Header */}
           <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#080B10]/80 backdrop-blur-xl z-10">
              <div className="flex items-center gap-4 flex-1">
                 <div className="relative max-w-md w-full hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                    <input 
                       disabled
                       placeholder="Search analytics..."
                       className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-10 text-sm text-gray-400 outline-none"
                    />
                 </div>
                 <button className="md:hidden text-white"><Menu size={24} /></button>
              </div>

              <div className="flex items-center gap-6">
                 <div className="relative p-2 text-gray-400 hover:text-white cursor-pointer transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-[#080B10]" />
                 </div>
                 <div className="h-10 w-10 rounded-full bg-linear-to-br from-accent to-emerald-400 border border-white/20 p-px">
                    <div className="w-full h-full rounded-full bg-[#0D1117] flex items-center justify-center text-white overflow-hidden">
                       <span className="text-xs font-bold">LR</span>
                    </div>
                 </div>
              </div>
           </header>

           <div className="p-8 space-y-10 max-w-7xl mx-auto">
              <div>
                 <h1 className="text-3xl font-bold text-white tracking-tight leading-tight">System Overview</h1>
                 <p className="text-gray-500">Welcome back, your system is performing <span className="text-emerald-400 font-bold">optimally</span>.</p>
              </div>

              <SaaSStats />

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                 <div className="xl:col-span-2">
                    <PlanSelector />
                 </div>
                 <div>
                    <UserActivity />
                 </div>
              </div>
           </div>
        </main>
      </div>
    </DemoLayout>
  );
}

function NavItem({ icon: Icon, label, active = false }: { icon: LucideIcon, label: string, active?: boolean }) {
  return (
    <div className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${
      active ? 'bg-accent/10 text-accent font-bold shadow-lg shadow-accent/5' : 'text-gray-500 hover:text-white hover:bg-white/5'
    }`}>
       <Icon size={20} />
       <span className="hidden lg:block text-sm">{label}</span>
    </div>
  );
}
