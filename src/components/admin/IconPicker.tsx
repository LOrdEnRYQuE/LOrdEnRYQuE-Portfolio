"use client";

import { useState } from "react";
import { Search, Settings, Bot } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Curated list of common icons
const COMMON_ICONS = [
  "Bot", "MessageSquare", "Zap", "Smile", "User", "Star", "Shield", "HelpCircle", 
  "Briefcase", "ShoppingBag", "Info", "Phone", "Mail", "MapPin", "Calendar", 
  "Clock", "Globe", "Lock", "Unlock", "Settings", "Palette", "Image", "Layout", 
  "Layers", "Heart", "Coffee", "Music", "Video", "Camera", "Mic", "Headphones", 
  "Monitor", "Smartphone", "Tablet", "Laptop", "Watch", "Cpu", "Database", 
  "Cloud", "Wifi", "Bluetooth", "Battery", "Sun", "Moon", "Wind", "Droplets", 
  "Flame", "Trees", "Mountain", "Rocket", "Plane", "Train", "Car", "Bike", 
  "Send", "Paperclip", "Clipboard", "Trash", "Edit", "Plus", "Minus", "Check"
];

const DynamicIcon = ({ name, size = 20, className = "" }: { name: string; size?: number; className?: string }) => {
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  if (!Icon) return <Bot size={size} className={className} />;
  return <Icon size={size} className={className} />;
};

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
}

export default function IconPicker({ value, onChange }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredIcons = COMMON_ICONS.filter(name => 
    name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white flex items-center justify-between hover:border-accent/50 transition-all outline-none"
      >
        <div className="flex items-center gap-3">
          <DynamicIcon name={value} size={18} className="text-accent" />
          <span className="font-bold">{value}</span>
        </div>
        <Settings size={14} className="opacity-30" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-50" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-full mt-2 left-0 w-[300px] max-h-[400px] bg-black border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
                <input
                  type="text"
                  placeholder="Search icons..."
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder:text-white/20 outline-none focus:border-accent"
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 grid grid-cols-4 gap-2 scrollbar-hide">
              {filteredIcons.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => {
                    onChange(name);
                    setIsOpen(false);
                    setSearch("");
                  }}
                  className={`aspect-square flex flex-col items-center justify-center gap-1.5 rounded-lg border transition-all hover:scale-110 active:scale-95 ${
                    value === name 
                      ? "bg-accent/20 border-accent text-accent" 
                      : "bg-white/5 border-transparent text-white/40 hover:bg-white/10 hover:text-white"
                  }`}
                  title={name}
                >
                  <DynamicIcon name={name} size={20} />
                </button>
              ))}
              {filteredIcons.length === 0 && (
                <div className="col-span-4 py-8 text-center text-[10px] font-black uppercase text-white/20 tracking-widest">
                  No icons found
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
