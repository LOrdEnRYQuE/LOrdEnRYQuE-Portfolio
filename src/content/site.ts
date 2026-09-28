export interface SiteConfig {
  brand: string;
  name: string;
  role: string;
  headline: string;
  bio: string;
  domain: string;
  email: string;
  location: string;
  availability: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  cta: {
    primary: string;
    secondary: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: "LOrdEnRYQuE",
  name: "Attila Lazar",
  role: "Web Designer • Full-Stack Developer • AI Engineer",
  headline: "Webdesign, Webentwicklung & AI-Lösungen für Unternehmen in Landshut und darüber hinaus",
  bio: "LOrdEnRYQuE entwickelt moderne Websites, Webanwendungen, E-Commerce-Lösungen, SEO-Strategien und KI-gestützte Automatisierungen für Unternehmen und Selbstständige in Landshut, Bayern und darüber hinaus.",
  domain: process.env.NEXT_PUBLIC_APP_URL || "https://lordenryque.com",
  email: "hello@lordenryque.com",
  location: "Landshut, Bavaria, Germany",
  availability: "Available for web design, web development, AI integrations, SEO, e-commerce and custom business platforms.",
  socials: {
    github: "https://github.com/lordenryque",
    linkedin: "https://linkedin.com/in/attilalazar",
    twitter: "https://twitter.com/lordenryque",
  },
  cta: {
    primary: "Start a Project",
    secondary: "View Projects",
  },
};
