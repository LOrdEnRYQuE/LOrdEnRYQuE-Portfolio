import Hero from "@/components/sections/Hero";
import DemosSection from "@/components/sections/DemosSection";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TechPulse from "@/components/sections/TechPulse";
import TechStack from "@/components/sections/TechStack";
import WhyWorkWithMe from "@/components/sections/WhyWorkWithMe";
import Process from "@/components/sections/Process";
import ContactCta from "@/components/sections/ContactCta";
import { Timeline } from "@/components/ui/Timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DemosSection />
      <About />
      <Timeline />
      <Services />
      <FeaturedProjects />
      <WhyWorkWithMe />
      <Process />
      <TechPulse />
      <TechStack />
      <ContactCta />
    </>
  );
}
