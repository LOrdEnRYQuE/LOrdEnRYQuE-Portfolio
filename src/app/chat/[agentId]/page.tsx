"use client";

import { useEffect, useState } from "react";
import AIConcierge, { AgentConfig } from "@/components/ui/AIConcierge";

// This page is designed to be embedded in an iframe
export default function PublicChatPage({ params }: { params: Promise<{ agentId: string }> }) {
  const [config, setConfig] = useState<AgentConfig | null>(null);

  useEffect(() => {
    params.then(({ agentId }) => {
      fetch(`/api/agents/${agentId}`)
        .then(res => res.json())
        .then(data => setConfig(data.config));
    });
  }, [params]);

  if (!config) return null;

  return (
    <div className="fixed inset-0 bg-transparent flex flex-col items-end justify-end p-4">
      <AIConcierge config={config} />
      
      {/* Remove global layout styles that might interfere */}
      <style jsx global>{`
        body { background: transparent !important; }
        footer, header, nav { display: none !important; }
      `}</style>
    </div>
  );
}
