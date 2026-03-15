import { notFound } from "next/navigation";
import { demoBranches } from "@/content/demoBranches";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Play, Briefcase } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  return demoBranches.map((demo) => ({
    slug: demo.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const demo = demoBranches.find((d) => d.slug === resolvedParams.slug);
  
  if (!demo) return constructMetadata({ title: "Demo Not Found" });

  return constructMetadata({
    title: `${demo.title} | MVP Prototype`,
    description: demo.summary,
    image: demo.cover,
  });
}

export default async function DemoDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const demo = demoBranches.find((d) => d.slug === resolvedParams.slug);

  if (!demo) return notFound();

  return (
    <article className="py-24 px-6 md:px-10 max-w-4xl mx-auto min-h-screen">
      <Button href="/demo-branches" variant="ghost" className="mb-12 pl-0 group text-text-secondary hover:text-foreground">
        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Demos
      </Button>

      <div className="space-y-6 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Badge variant="default" className="w-fit text-sm px-4 py-1 uppercase tracking-widest">{demo.niche}</Badge>
          <Badge variant={demo.status === "Live Demo" ? "accent" : "default"} className="w-fit text-sm px-4 py-1">
            {demo.status}
          </Badge>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight">
          {demo.title}
        </h1>
        
        <p className="text-2xl font-medium text-accent-text mt-4">
          {demo.headline}
        </p>
        
        <p className="text-xl text-text-secondary leading-relaxed max-w-2xl mt-6">
          {demo.summary}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button
              href={`/demo-branches/${demo.slug}/prototype`}
              variant="primary"
              size="lg"
              className="group/btn"
              disabled={demo.status === "Prototype"}
            >
              <Play size={18} className="mr-2 group-hover/btn:scale-110 transition-transform" />
              {demo.ctaLabel}
            </Button>
            <Button
              href={`/contact?subject=Inquiry about ${demo.title}`}
              variant="outline"
              size="lg"
            >
              <Briefcase size={18} className="mr-2" />
              Request This for My Business
            </Button>
        </div>
      </div>

      <div className="relative aspect-video rounded-2xl overflow-hidden glass-card mb-16 border border-border group">
         {/* Placeholder for iframe / real image */}
        <div className="absolute inset-0 bg-linear-to-tr from-surface to-surface-hover flex items-center justify-center p-8 text-center">
            {demo.status === "Prototype" ? (
                <div className="space-y-4">
                   <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                       <Play className="text-accent" size={32} />
                   </div>
                   <h3 className="text-text-muted text-xl font-medium">Interactive Demo in Development</h3>
                   <p className="text-text-secondary max-w-md mx-auto">This MVP flow is currently being coded and prepared for interactive display. Contact me to view the staging version early.</p>
                </div>
            ) : (
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${demo.cover})` }}
                >
                   <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-transparent opacity-60" />
                </div>
            )}
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <SectionHeading title="Key Features & Flows" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {demo.features.map((feature) => (
              <div key={feature} className="glass-card p-4 rounded-xl flex items-center border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-accent mr-4"></div>
                  <span className="text-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-24 pt-12 border-t border-border flex justify-between items-center text-sm font-medium">
        <span className="text-text-muted">Want to build something similar?</span>
        <Button href={`/contact?subject=Custom Build Inquiry based on ${demo.title}`} variant="ghost">
          Start a conversation
        </Button>
      </div>
    </article>
  );
}
