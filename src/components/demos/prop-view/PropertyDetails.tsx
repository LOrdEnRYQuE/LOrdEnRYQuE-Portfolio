"use client";

import { useState } from "react";
import { Calculator, Percent, Home, Map as MapIcon, GraduationCap, Train } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function PropertyDetails() {
  const [loanAmount, setLoanAmount] = useState(14500000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const monthlyPayment = (
    (loanAmount * (interestRate / 100 / 12)) /
    (1 - Math.pow(1 + interestRate / 100 / 12, -term * 12))
  ).toFixed(0);

  return (
    <section className="py-32 px-6 bg-[#080B10] relative overflow-hidden">
      {/* Background Subtle Texture */}
      <div className="absolute inset-0 opacity-3 pointer-events-none" 
        style={{ backgroundImage: "url(\"https://www.transparenttextures.com/patterns/carbon-fibre.png\")" }} 
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 relative z-10">
        
        {/* Left Column - Details & Neighborhood */}
        <div className="lg:col-span-2 space-y-24">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="h-px w-10 bg-accent" />
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Architectural Narrative</h2>
            </div>
            <h3 className="text-5xl font-serif text-white leading-tight">Azure Horizon <br /><span className="text-white/40 italic">Clifford Estates.</span></h3>
            <p className="text-text-secondary text-xl font-light leading-relaxed max-w-3xl">
              Perched on the sovereign cliffs of Malibu, this architectural masterpiece offers an unparalleled 
              lifestyle of tranquility and sophistication. Floor-to-ceiling glass walls frame panoramic 
              Pacific views, erasing the boundaries between internal luxury and coastal grandeur.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
               {[
                 { label: "Year Built", value: "2026" },
                 { label: "Lot Size", value: "1.2 Acres" },
                 { label: "Parking", value: "8 Garage" },
                 { label: "Structure", value: "Steel & Glass" }
               ].map((stat, i) => (
                 <div key={i} className="p-6 bg-white/2 border border-white/5 rounded-3xl group hover:border-accent/30 transition-colors">
                    <p className="text-[9px] text-white/40 uppercase font-black tracking-widest mb-2">{stat.label}</p>
                    <p className="text-white font-bold text-lg">{stat.value}</p>
                 </div>
               ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex items-center justify-between">
               <div className="space-y-2">
                 <h3 className="text-3xl font-serif text-white tracking-tight">Neighborhood Intelligence</h3>
                 <p className="text-sm text-text-secondary">AI-driven local analytics & infrastructure health.</p>
               </div>
               <Button variant="ghost" className="text-accent hover:bg-accent/10 rounded-full py-2 px-6 border border-accent/20 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                  <MapIcon size={12} />
                  Explore Map
               </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { icon: GraduationCap, label: "Education Efficiency", score: 94, desc: "Private Institutional Access" },
                 { icon: Train, label: "Transit Connectivity", score: 65, desc: "Connected Hub Proximity" },
                 { icon: Home, label: "Equity Acceleration", score: 88, desc: "+12% Annual Valuation" }
               ].map((metric, i) => (
                 <div key={i} className="space-y-6">
                    <div className="flex items-center gap-3 text-white">
                       <metric.icon className="text-accent" size={24} />
                       <span className="font-bold text-sm uppercase tracking-widest">{metric.label}</span>
                    </div>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black inline-block py-1 px-2 uppercase rounded-full text-accent bg-accent/10">
                            Elite Class
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black inline-block text-accent">
                            {metric.score}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-1.5 mb-4 text-xs flex rounded-full bg-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${metric.score}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-accent"
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-white/30 uppercase font-black tracking-widest">{metric.desc}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column - Mortgage Calculator */}
        <div className="relative group/calc shadow-2xl">
          <div className="absolute -inset-1 bg-linear-to-b from-accent/20 to-transparent blur-2xl opacity-0 group-hover/calc:opacity-100 transition-opacity duration-700" />
          <div className="bg-[#0F1219] border border-white/10 rounded-[2.5rem] p-10 h-fit sticky top-32 backdrop-blur-3xl overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5">
               <Calculator size={120} className="text-accent" />
            </div>

            <div className="flex items-center gap-4 mb-10 relative">
               <div className="w-12 h-12 rounded-2xl bg-accent text-background flex items-center justify-center shadow-lg shadow-accent/20">
                  <Calculator size={24} />
               </div>
               <div className="space-y-0.5">
                 <h3 className="text-xl font-bold text-white uppercase tracking-tight">Capital Planning</h3>
                 <p className="text-[9px] text-accent font-black uppercase tracking-[0.2em]">Institutional Access</p>
               </div>
            </div>

            <div className="space-y-8 relative">
               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Investment Capital ($)</label>
                  <input 
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white font-mono text-xl focus:border-accent focus:bg-white/10 outline-none transition-all"
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Yield Benchmark (%)</label>
                  <div className="relative">
                     <Percent className="absolute right-6 top-1/2 -translate-y-1/2 text-accent" size={18} />
                     <input 
                       type="number"
                       step="0.1"
                       value={interestRate}
                       onChange={(e) => setInterestRate(Number(e.target.value))}
                       className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white font-mono text-xl focus:border-accent outline-none transition-all"
                     />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-black">Allocation Term</label>
                  <select 
                    value={term}
                    onChange={(e) => setTerm(Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 px-6 text-white font-mono text-xl focus:border-accent outline-none appearance-none cursor-pointer"
                  >
                     <option value={15} className="bg-background">15 Cycles (Years)</option>
                     <option value={30} className="bg-background">30 Cycles (Years)</option>
                  </select>
               </div>

               <div className="py-10 border-t border-white/5 mt-4">
                  <div className="flex justify-between items-end mb-3">
                     <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Monthly Allocation</span>
                     <span className="text-4xl font-serif text-white tracking-tighter italic">
                       <small className="text-accent text-lg align-top mr-1">$</small>
                       {Number(monthlyPayment).toLocaleString()}
                     </span>
                  </div>
                  <div className="flex items-center gap-2 text-[8px] text-accent/50 uppercase font-black tracking-widest justify-end">
                     <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                     Estimated Principal & Interest
                  </div>
               </div>

               <Button className="w-full h-20 bg-accent hover:bg-accent-hover text-background rounded-2xl font-black uppercase tracking-[0.4em] text-[10px] shadow-2xl shadow-accent/20">
                  Get Verified Pre-Approval
               </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
