"use client";

import { motion } from "framer-motion";
import { Check, Shield, Rocket, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PLANS = [
  {
    name: "Growth",
    price: "$299",
    description: "Perfect for scaling startups",
    icon: Rocket,
    features: ["Up to 10k users", "Advanced Analytics", "24h Support", "API Access"],
    current: false,
  },
  {
    name: "Enterprise",
    price: "$999",
    description: "For large scale operations",
    icon: Globe,
    features: ["Unlimited users", "Custom Reporting", "1h Priority Support", "Dedicated DB"],
    current: true,
  }
];

export default function PlanSelector() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
         <h3 className="text-xl font-bold text-white tracking-tight">Subscription Management</h3>
         <Badge variant="accent" className="text-xs">Billed Monthly</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {PLANS.map((plan) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              className={`p-10 rounded-4xl border transition-all duration-500 flex flex-col glass-card ${
                plan.current 
                  ? 'border-slate-400 shadow-accent-glow-lg scale-[1.02] z-10' 
                  : 'bg-white/5 border-white/5 grayscale-[0.5] hover:grayscale-0 opacity-80 hover:opacity-100'
              }`}
            >
               <div className="flex items-center justify-between mb-10">
                  <div className={`p-4 rounded-2xl transition-all duration-500 ${plan.current ? 'bg-slate-400 text-background shadow-lg' : 'bg-surface text-foreground/50'}`}>
                     <plan.icon size={28} />
                  </div>
                  {plan.current && (
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-400/10 px-3 py-1.5 rounded-full border border-slate-400/20">
                      Tier: {plan.name}
                    </span>
                  )}
               </div>
 
               <div className="space-y-2 mb-10">
                  <h4 className="text-3xl font-black text-foreground tracking-tighter uppercase">{plan.name}</h4>
                  <p className="text-sm text-text-secondary font-medium">{plan.description}</p>
               </div>
 
               <div className="flex items-baseline gap-2 mb-10">
                  <span className="text-5xl font-black text-foreground tracking-tighter font-mono">{plan.price}</span>
                  <span className="text-text-muted text-sm font-bold uppercase tracking-widest">/ Month</span>
               </div>
 
               <div className="space-y-4 mb-12 flex-1">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-center gap-4 text-sm">
                       <div className={`p-1 rounded-full ${plan.current ? 'bg-slate-400/20 text-slate-400' : 'bg-surface text-text-muted'}`}>
                          <Check size={14} className="stroke-[3px]" />
                       </div>
                       <span className="text-text-secondary font-semibold">{f}</span>
                    </div>
                  ))}
               </div>
 
               <Button 
                variant={plan.current ? "outline" : "primary"}
                className={`w-full font-black uppercase tracking-[0.2em] h-14 rounded-2xl transition-all duration-500 ${
                  plan.current 
                    ? 'border-slate-400/40 text-slate-400 hover:bg-slate-400/5 backdrop-blur-sm' : 
                    'shadow-lg hover:scale-[1.02] active:scale-95'
                }`}
              >
                 {plan.current ? 'Manage Identity' : 'Secure Growth'}
               </Button>
            </motion.div>
         ))}
      </div>

      <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl flex items-center gap-4">
         <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
            <Shield size={20} />
         </div>
         <div className="flex-1">
            <p className="text-white font-bold text-sm">Enterprise Data Encryption Active</p>
            <p className="text-xs text-gray-500">Your organization&apos;s data is protected by AES-256 military-grade encryption.</p>
         </div>
         <Button variant="ghost" className="text-blue-400 text-xs font-bold uppercase tracking-widest">
            Security Log
         </Button>
      </div>
    </div>
  );
}


