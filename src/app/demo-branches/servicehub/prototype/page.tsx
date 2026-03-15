"use client";

import { useState } from "react";
import DemoLayout from "@/components/demos/DemoLayout";
import ServiceHubHero from "@/components/demos/service-hub/ServiceHubHero";
import ServiceSelector from "@/components/demos/service-hub/ServiceSelector";
import QuoteWizard from "@/components/demos/service-hub/QuoteWizard";

export default function ServiceHubPrototypePage() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | undefined>();
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const handleSelectService = (id: string) => {
    setSelectedServiceId(id);
    setIsQuoteOpen(true);
  };

  const handleOpenQuote = () => {
    setSelectedServiceId(undefined);
    setIsQuoteOpen(true);
  };

  return (
    <DemoLayout
      demoTitle="ServiceHub"
      backUrl="/demo-branches/servicehub"
    >
      <div className="bg-[#080B10]">
        <ServiceHubHero onGetQuote={handleOpenQuote} />
        
        <ServiceSelector 
          onSelect={handleSelectService} 
          selectedId={selectedServiceId} 
        />

        <QuoteWizard 
          isOpen={isQuoteOpen}
          onClose={() => setIsQuoteOpen(false)}
          selectedCategoryId={selectedServiceId}
        />

        <footer className="py-32 border-t border-white/5 bg-[#05070A] text-center px-6">
             <h4 className="text-white font-serif italic text-4xl mb-6 tracking-tight">LOrdEnRYQuE <span className="text-white/20 not-italic font-bold">ServiceHub</span></h4>
             <p className="text-accent text-[10px] font-black uppercase tracking-[0.6em] opacity-50">Enterprise Operational Intelligence</p>
        </footer>
      </div>
    </DemoLayout>
  );
}
