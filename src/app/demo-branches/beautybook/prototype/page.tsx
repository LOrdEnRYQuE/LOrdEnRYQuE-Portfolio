"use client";

import { useState } from "react";
import DemoLayout from "@/components/demos/DemoLayout";
import BeautyHero from "@/components/demos/beauty-book/BeautyHero";
import BeautyServices, { BeautyService } from "@/components/demos/beauty-book/BeautyServices";
import BeautyBooking from "@/components/demos/beauty-book/BeautyBooking";
import { Sparkles } from "lucide-react";

export default function BeautyBookPrototypePage() {
  const [selectedService, setSelectedService] = useState<BeautyService | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleSelectService = (service: BeautyService) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <DemoLayout
      demoTitle="BeautyBook"
      backUrl="/demo-branches/beautybook"
    >
      <div className="bg-[#FAF9F6]">
        <div onClick={(e) => {
            const target = e.target as HTMLElement;
            if (target.textContent?.includes("Book") || target.textContent?.includes("Journey")) {
                setIsBookingOpen(true);
            }
        }}>
           <BeautyHero />
        </div>
        
        <BeautyServices 
          onSelect={handleSelectService} 
          selectedServiceId={selectedService?.id} 
        />

        <BeautyBooking 
          selectedService={selectedService}
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
        />

        {/* Brand Bar */}
        <div className="py-24 bg-white border-t border-[#F5F5F0] text-center">
             <div className="inline-flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-[#BAB6A2]" />
                <Sparkles size={16} className="text-[#D4A373]" />
                <div className="h-px w-12 bg-[#BAB6A2]" />
             </div>
             <h4 className="text-3xl font-serif text-[#2C2C2C] tracking-tighter uppercase mb-4">LOrdEnRYQuE BeautyBook</h4>
             <p className="text-[10px] text-[#BAB6A2] font-bold uppercase tracking-[0.5em]">Experience Infinite Elegance</p>
        </div>
      </div>
    </DemoLayout>
  );
}
