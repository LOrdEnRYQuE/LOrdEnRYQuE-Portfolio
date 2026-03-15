"use client";

import { motion } from "framer-motion";
import { Plus, Info } from "lucide-react";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const MENU_DATA: MenuItem[] = [
  {
    id: "1",
    name: "Wild Forest Mushroom Risotto",
    description: "Carnaroli rice, porcini, truffle oil, Grana Padano.",
    price: 24,
    category: "Main Courses",
    image: "/images/demos/restaurant/risotto.jpg",
  },
  {
    id: "2",
    name: "Dry-Aged Ribeye",
    description: "30-day aged beef, smoked bone marrow butter, sea salt.",
    price: 48,
    category: "Main Courses",
    image: "/images/demos/restaurant/steak.jpg",
  },
  {
    id: "3",
    name: "Heirloom Tomato Salad",
    description: "Burrata, basil oil, balsamic reduction.",
    price: 16,
    category: "Starters",
    image: "/images/demos/restaurant/salad.jpg",
  },
  {
    id: "4",
    name: "Pan-Seared Scallops",
    description: "Cauliflower purée, crispy pancetta, herb oil.",
    price: 22,
    category: "Starters",
    image: "/images/demos/restaurant/scallops.jpg",
  },
];

interface RestaurantMenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function RestaurantMenu({ onAddToCart }: RestaurantMenuProps) {
  const categories = ["Starters", "Main Courses", "Desserts", "Signature Cocktails"];

  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-accent-radial" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-xs uppercase tracking-[0.4em] text-slate-400/60 mb-4 font-black">Discovery</h2>
          <h3 className="text-5xl md:text-6xl font-bold text-foreground tracking-tighter uppercase leading-none">The Menu</h3>
        </div>

        {/* Category Tabs Mock */}
        <div className="flex flex-wrap justify-center gap-6 mb-20">
          {categories.map((cat, i) => (
            <button
              key={cat}
              className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-500 transform ${
                i === 1 
                  ? "bg-slate-400 text-background shadow-accent-glow-sm scale-105" 
                  : "bg-surface/30 text-text-secondary border border-white/5 hover:border-slate-400/40 hover:text-foreground hover:bg-surface/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {MENU_DATA.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="group flex flex-col sm:flex-row gap-8 p-6 rounded-3xl glass-card transition-all duration-500 border border-white/5 hover:border-accent/20"
            >
              <div className="relative w-full sm:w-40 h-40 shrink-0 rounded-2xl overflow-hidden bg-surface/50">
                 {/* Placeholder for actual food images */}
                 <div className="absolute inset-0 bg-accent/5 flex items-center justify-center">
                    <span className="text-[10px] text-accent/30 p-4 text-center uppercase font-black tracking-widest leading-relaxed">
                       {item.name}
                    </span>
                 </div>
                 <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <div className="grow flex flex-col justify-between py-1">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 tracking-tight">
                      {item.name}
                    </h4>
                    <span className="text-accent font-black text-lg tracking-tighter">${item.price}</span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-6 pt-6 mt-auto">
                  <button 
                    onClick={() => onAddToCart(item)}
                    className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-background bg-accent px-6 py-3 rounded-xl hover:bg-accent-hover transition-all duration-300 active:scale-95 shadow-lg"
                  >
                    <Plus size={16} />
                    Add to Order
                  </button>
                  <button className="text-text-muted hover:text-accent transition-colors duration-300">
                    <Info size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
