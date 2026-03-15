import { demoBranches } from "@/content/demoBranches";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Play, Briefcase } from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Demo Branches | LOrdEnRYQuE",
  description: "Test drive interactive MVP prototypes for real business niches.",
});

export default function DemoBranchesPage() {
  return (
    <div className="py-24 px-6 md:px-10 max-w-7xl mx-auto min-h-screen">
      <div className="max-w-3xl mb-16">
        <SectionHeading title="Demo Branches" />
        <p className="text-xl text-text-secondary mt-6 leading-relaxed">
          Don&apos;t just look at screenshots. Test drive fully interactive business
          MVP prototypes. From restaurant ordering to high-end service booking,
          experience the conversion flows your business needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {demoBranches.map((demo) => (
          <article
            key={demo.slug}
            className="group relative flex flex-col justify-between glass-card p-6 md:p-8 rounded-2xl hover:bg-surface-hover/50 transition-colors duration-300"
          >
            <div>
              <div className="flex justify-between items-start mb-6">
                <Badge variant="default" className="text-xs">
                  {demo.niche}
                </Badge>
                <Badge variant={demo.status === "Live Demo" ? "accent" : "default"} className="text-xs">
                  {demo.status}
                </Badge>
              </div>

              <h2 className="text-2xl font-bold text-foreground mb-3 tracking-tight group-hover:text-accent-text transition-colors duration-300">
                {demo.title}
              </h2>

              <p className="text-text-secondary mb-6 line-clamp-2">
                {demo.headline}
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-medium text-text-muted uppercase tracking-wider">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {demo.features.slice(0, 3).map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-text-secondary">
                      <span className="text-accent mr-2">•</span> {feature}
                    </li>
                  ))}
                  {demo.features.length > 3 && (
                    <li className="text-sm text-text-muted italic pl-3">
                      + {demo.features.length - 3} more
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex flex-col gap-3 relative z-10">
              <Button
                href={`/demo-branches/${demo.slug}`}
                variant="primary"
                className="w-full justify-center group/btn"
              >
                <Play size={16} className="mr-2 group-hover/btn:scale-110 transition-transform" />
                {demo.ctaLabel}
              </Button>
              <Button
                href={`/contact?subject=Inquiry about ${demo.title}`}
                variant="outline"
                className="w-full justify-center"
              >
                <Briefcase size={16} className="mr-2" />
                Request This for My Business
              </Button>
            </div>

            <Link href={`/demo-branches/${demo.slug}`} className="absolute inset-0 z-0" aria-label={`View ${demo.title} details`} />
          </article>
        ))}
      </div>

      {/* Custom Demo Section */}
      <section className="mt-32 pt-24 border-t border-border">
         <div className="bg-surface/30 border border-white/5 rounded-3xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 blur-[100px] rounded-full translate-x-1/2" />
            
            <div className="relative z-10 max-w-2xl">
               <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                  Need a custom industry prototype?
               </h2>
               <p className="text-lg text-text-secondary mb-10 leading-relaxed">
                  Every business is unique. We can build a bespoke interactive demo for your specific niche, 
                  helping you visualize exactly how your app will function and convert before a single line 
                  of production code is written.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    href="/contact?subject=Custom Demo Prototype Request"
                    variant="primary"
                    size="lg"
                    className="px-8 group"
                  >
                    Request Custom Demo
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    href="mailto:lead@example.com"
                    variant="ghost"
                    size="lg"
                    className="text-text-secondary"
                  >
                    Chat with an Expert
                  </Button>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
