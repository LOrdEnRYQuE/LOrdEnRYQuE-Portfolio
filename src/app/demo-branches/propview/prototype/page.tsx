"use client";

import { useState } from "react";
import DemoLayout from "@/components/demos/DemoLayout";
import PropHero from "@/components/demos/prop-view/PropHero";
import PropertyDetails from "@/components/demos/prop-view/PropertyDetails";
import TourWizard from "@/components/demos/prop-view/TourWizard";

export default function PropViewPrototypePage() {
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <DemoLayout
      demoTitle="PropView"
      backUrl="/demo-branches/propview"
    >
      <div className="bg-[#0D1117]">
        <PropHero onSchedule={() => setIsTourOpen(true)} />
        
        <PropertyDetails />

        <TourWizard 
          isOpen={isTourOpen}
          onClose={() => setIsTourOpen(false)}
        />

        <footer className="py-24 border-t border-white/5 bg-[#080B10] text-center px-6">
             <h4 className="text-white font-bold text-2xl mb-2 tracking-tight">LOrdEnRYQuE PropView</h4>
             <p className="text-accent text-xs font-bold uppercase tracking-[0.5em]">High-Conversion Real Estate Platform</p>
        </footer>
      </div>
    </DemoLayout>
  );
}
