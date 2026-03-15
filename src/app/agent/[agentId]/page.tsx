import { prisma } from "@/lib/db";
import AIConcierge from "@/components/ui/AIConcierge";
import { notFound } from "next/navigation";
import { AgentConfig } from "@/components/ui/AIConcierge";

export default async function StandaloneAgentPage({
  params,
  searchParams
}: {
  params: Promise<{ agentId: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const { agentId } = await params;
  const { embed } = await searchParams;
  const isEmbed = embed === "true";

  const agent = await prisma.agent.findUnique({
    where: { id: agentId }
  });

  if (!agent) {
    notFound();
  }

  const config = agent.config as unknown as AgentConfig;

  return (
    <div className={`fixed inset-0 bg-transparent flex items-end justify-end ${isEmbed ? 'p-0' : 'p-4'}`}>
      <AIConcierge config={config} embedMode={isEmbed} />
    </div>
  );
}
