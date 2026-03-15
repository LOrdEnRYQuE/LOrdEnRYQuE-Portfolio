"use client";

import { motion } from "framer-motion";
import { AlertCircle, Zap, User } from "lucide-react";

const ACTIVITIES = [
  { id: 1, user: "Alex Rivera", action: "Upgraded to Enterprise", time: "2m ago", status: "success", type: "upgrade" },
  { id: 2, user: "Sarah Chen", action: "API Limit Reached", time: "15m ago", status: "warning", type: "alert" },
  { id: 3, user: "System", action: "Database Backup Complete", time: "45m ago", status: "success", type: "system" },
  { id: 4, user: "John Doe", action: "Failed Login Attempt", time: "1h ago", status: "error", type: "security" },
  { id: 5, user: "Maria Garcia", action: "New Deployment v2.4", time: "3h ago", status: "info", type: "system" },
];

export default function UserActivity() {
  return (
    <div className="glass-card rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-slate-400/10 shadow-2xl">
      <div className="p-8 border-b border-white/5 flex items-center justify-between bg-slate-400/5 backdrop-blur-md">
         <h3 className="text-xl font-black text-foreground tracking-tighter uppercase">Real-Time Activity</h3>
         <div className="flex items-center gap-3 text-[10px] text-slate-400/60 font-black uppercase tracking-[0.3em] bg-slate-400/5 px-3 py-1.5 rounded-full border border-slate-400/10">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse shadow-accent-glow-sm" />
            Live Monitoring
         </div>
      </div>

      <div className="divide-y divide-white/5">
         {ACTIVITIES.map((activity, i) => (
           <motion.div
             key={activity.id}
             initial={{ opacity: 0, x: -10 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: i * 0.1 }}
             className="p-6 flex items-center gap-6 hover:bg-slate-400/5 transition-all duration-300 cursor-default group"
           >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${
                activity.status === 'success' ? 'bg-slate-400/10 text-slate-400 shadow-accent-glow-sm' :
                activity.status === 'warning' ? 'bg-slate-400/5 text-slate-400/60' :
                activity.status === 'error' ? 'bg-red-500/10 text-red-500' :
                'bg-slate-400/5 text-slate-400/40'
              }`}>
                 {activity.type === 'upgrade' ? <Zap size={20} /> : 
                  activity.type === 'alert' ? <AlertCircle size={20} /> : 
                  activity.type === 'security' ? <AlertCircle size={20} /> :
                  <User size={20} />}
              </div>

              <div className="flex-1 min-w-0">
                 <p className="text-sm font-black text-foreground truncate group-hover:text-slate-400 transition-colors duration-300">{activity.user}</p>
                 <p className="text-xs text-text-secondary truncate tracking-tight">{activity.action}</p>
              </div>

              <div className="text-right">
                 <p className="text-[10px] font-black text-text-muted uppercase tracking-widest whitespace-nowrap bg-surface/50 px-2 py-1 rounded">
                   {activity.time}
                 </p>
              </div>
           </motion.div>
         ))}
      </div>

      <button className="w-full py-5 text-[10px] font-black text-slate-400/40 uppercase tracking-[0.4em] hover:text-slate-400 hover:bg-slate-400/10 transition-all duration-500 bg-slate-400/5 border-t border-white/5">
         View All Intelligence Logs
      </button>
    </div>
  );
}
