"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight } from "lucide-react";

const STATS = [
  { 
    label: "Monthly Revenue", 
    value: "$128,450", 
    change: "+12.5%", 
    trend: "up", 
    icon: DollarSign,
    color: "text-slate-400",
    bg: "bg-slate-400/10",
    points: [20, 35, 25, 45, 30, 55, 40, 65]
  },
  { 
    label: "Active Sessions", 
    value: "34,102", 
    change: "+8.1%", 
    trend: "up", 
    icon: Users,
    color: "text-slate-400/80",
    bg: "bg-slate-400/5",
    points: [30, 20, 45, 35, 55, 45, 65, 50]
  },
  { 
    label: "Error Rate", 
    value: "0.24%", 
    change: "-4.2%", 
    trend: "down", 
    icon: Activity,
    color: "text-slate-400/60",
    bg: "bg-slate-400/5",
    points: [50, 45, 55, 40, 45, 30, 35, 20]
  },
  { 
    label: "Avg. Response", 
    value: "142ms", 
    change: "+2.3%", 
    trend: "up", 
    icon: TrendingUp,
    color: "text-slate-400/90",
    bg: "bg-slate-400/10",
    points: [40, 45, 42, 48, 45, 52, 50, 55]
  }
];

export default function SaaSStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all group"
        >
          <div className="flex justify-between items-start mb-4">
             <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={20} />
             </div>
             <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-400' : 'text-blue-400'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
             </div>
          </div>

          <div className="space-y-1">
             <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
             <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
          </div>

          <div className="mt-6 h-12 w-full relative">
             <svg className="w-full h-full overflow-visible" viewBox="0 0 100 70">
                <defs>
                   <linearGradient id={`gradient-${i}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" className={stat.color} />
                      <stop offset="100%" stopColor="currentColor" stopOpacity="0" className={stat.color} />
                   </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  d={`M ${stat.points.map((p, idx) => `${(idx / (stat.points.length - 1)) * 100} ${70 - p}`).join(' L ')}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={stat.color}
                />
                <path
                  d={`M ${stat.points.map((p, idx) => `${(idx / (stat.points.length - 1)) * 100} ${70 - p}`).join(' L ')} V 70 H 0 Z`}
                  fill={`url(#gradient-${i})`}
                  className={stat.color}
                />
             </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
