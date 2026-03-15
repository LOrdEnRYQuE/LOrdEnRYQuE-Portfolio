import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  keywords: ['web development FAQ', 'app development cost', 'custom website pricing 2026', 'AI integration benefits', 'mobile app timeline', 'business software development']
});

export default function FAQPage() {
  const faqs = [
    {
      question: "How much does a custom website cost in 2026?",
      answer: "Custom website costs vary based on complexity: Basic business websites (€3,000-€8,000), E-commerce sites (€8,000-€25,000), Custom web applications (€15,000-€50,000+). AI integration and advanced features add 20-40% to base costs."
    },
    {
      question: "What is the best framework for a mobile app in 2026?",
      answer: "For 2026, React Native and Flutter lead cross-platform development. Native iOS/Android remains best for performance-critical apps. Progressive Web Apps (PWAs) offer cost-effective solutions for simpler applications. AI integration capabilities should influence your choice."
    },
    {
      question: "How long does mobile app development take?",
      answer: "Timeline varies by complexity: Simple apps (2-4 months), Medium complexity (4-8 months), Enterprise apps (8-12+ months). AI features add 1-2 months. MVP development typically takes 6-12 weeks from concept to launch."
    },
    {
      question: "What are the benefits of AI integration for businesses?",
      answer: "AI integration provides: 24/7 customer service chatbots, personalized user experiences, automated workflows, data-driven insights, reduced operational costs (30-50%), improved conversion rates (15-25%), and competitive advantage in your industry."
    },
    {
      question: "Should my business have a mobile app or responsive website?",
      answer: "Start with a responsive website for most businesses. Add a mobile app if you need: offline functionality, push notifications, device-specific features, or high user engagement. PWAs offer a middle ground with app-like experiences at lower costs."
    },
    {
      question: "What's the ROI of professional web development?",
      answer: "Professional web development typically delivers: 200-300% increase in lead generation, 150% improvement in conversion rates, 40% reduction in bounce rates, and 3-5x return on investment within 12 months for most businesses."
    },
    {
      question: "Do you work with specific industries?",
      answer: "Yes, I specialize in: Real estate websites, restaurant ordering systems, e-commerce platforms, healthcare applications, financial services, education platforms, and professional services. Industry expertise ensures compliance and best practices."
    },
    {
      question: "What's included in your development process?",
      answer: "My process includes: Discovery & strategy, UX/UI design, development, testing, deployment, and 3 months of support. I provide project management, regular updates, and documentation throughout the entire development lifecycle."
    },
    {
      question: "How do you ensure website performance and accessibility?",
      answer: "I implement: Core Web Vitals optimization, ADA compliance, responsive design, fast loading times (<2 seconds), SEO best practices, and regular performance audits. All sites are tested across devices and browsers."
    },
    {
      question: "What ongoing support do you provide?",
      answer: "Post-launch support includes: 3 months of bug fixes, security updates, performance monitoring, content updates training, and optional maintenance plans. Emergency support is available 24/7 for critical issues."
    }
  ];

  return (
    <div className="py-24 px-6 md:px-10 max-w-4xl mx-auto min-h-screen">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Everything you need to know about web development, mobile apps, and AI integration for your business in 2026.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg p-6 space-y-3">
              <h3 className="text-lg font-semibold text-foreground">
                {faq.question}
              </h3>
              <p className="text-text-secondary leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground">
            Still have questions?
          </h2>
          <p className="text-text-secondary">
            Let's discuss your specific project needs and get you a detailed proposal.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg px-8 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}
