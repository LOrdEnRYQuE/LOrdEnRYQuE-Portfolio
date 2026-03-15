import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  keywords: ['web development services', 'mobile app development', 'AI integration services', 'custom website development', 'e-commerce solutions', 'business software development']
});

export default function ServicesPage() {
  const services = [
    {
      title: 'Custom Website Development',
      description: 'Professional, conversion-focused websites that drive business growth and establish your online presence.',
      icon: '🌐',
      features: [
        'Responsive design for all devices',
        'SEO optimization for search visibility',
        'Fast loading and Core Web Vitals',
        'Content management systems',
        'E-commerce integration',
        'Analytics and tracking setup'
      ],
      industries: ['All Industries', 'Startups', 'Professional Services'],
      pricing: 'Starting at €3,000'
    },
    {
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      icon: '📱',
      features: [
        'iOS and Android development',
        'Cross-platform solutions (React Native/Flutter)',
        'App Store deployment',
        'Push notifications',
        'Offline functionality',
        'API integration'
      ],
      industries: ['Restaurants', 'Healthcare', 'Retail', 'Real Estate'],
      pricing: 'Starting at €8,000'
    },
    {
      title: 'AI Integration Services',
      description: 'Cutting-edge AI solutions that automate processes and enhance user experiences.',
      icon: '🤖',
      features: [
        'Chatbot development',
        'Recommendation systems',
        'Automated workflows',
        'Natural language processing',
        'Predictive analytics',
        'Machine learning models'
      ],
      industries: ['E-commerce', 'Customer Service', 'Healthcare', 'Finance'],
      pricing: 'Starting at €5,000'
    },
    {
      title: 'E-commerce Solutions',
      description: 'Complete online stores with advanced features to maximize sales and customer satisfaction.',
      icon: '🛒',
      features: [
        'Product catalog management',
        'Secure payment processing',
        'Inventory management',
        'Customer accounts',
        'Shipping integration',
        'Marketing automation'
      ],
      industries: ['Retail', 'Fashion', 'Electronics', 'Food & Beverage'],
      pricing: 'Starting at €8,000'
    },
    {
      title: 'Real Estate Websites',
      description: 'Specialized platforms for property listings, virtual tours, and lead generation.',
      icon: '🏠',
      features: [
        'Property listing management',
        'Virtual tour integration',
        'MLS integration',
        'Lead capture forms',
        'Neighborhood information',
        'Mortgage calculators'
      ],
      industries: ['Real Estate', 'Property Management'],
      pricing: 'Starting at €6,000'
    },
    {
      title: 'Restaurant Applications',
      description: 'Digital solutions for ordering, reservations, and customer loyalty programs.',
      icon: '🍽️',
      features: [
        'Online ordering systems',
        'Reservation management',
        'Menu management',
        'Customer loyalty programs',
        'Delivery integration',
        'Analytics dashboard'
      ],
      industries: ['Restaurants', 'Food Service', 'Cafes', 'Bars'],
      pricing: 'Starting at €5,000'
    },
    {
      title: 'Healthcare Software',
      description: 'HIPAA-compliant applications for patient management and healthcare automation.',
      icon: '🏥',
      features: [
        'Patient management',
        'Telemedicine platforms',
        'Appointment scheduling',
        'Medical records',
        'Billing integration',
        'HIPAA compliance'
      ],
      industries: ['Healthcare', 'Medical Clinics', 'Telehealth'],
      pricing: 'Starting at €10,000'
    },
    {
      title: 'Business Process Automation',
      description: 'Custom software solutions to streamline workflows and improve efficiency.',
      icon: '⚙️',
      features: [
        'Workflow automation',
        'Process optimization',
        'Data integration',
        'Reporting dashboards',
        'Employee management',
        'Quality control systems'
      ],
      industries: ['Manufacturing', 'Logistics', 'Professional Services'],
      pricing: 'Starting at €7,000'
    }
  ];

  return (
    <div className="py-24 px-6 md:px-10 max-w-7xl mx-auto min-h-screen">
      <div className="space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Services & Solutions
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Comprehensive development services tailored to your industry and business needs. From concept to deployment, I deliver solutions that drive results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border border-border rounded-xl p-8 space-y-6 hover:border-accent transition-colors">
              <div className="space-y-4">
                <div className="text-4xl">{service.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-text-secondary">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <span className="text-accent mt-1">✓</span>
                      <span className="text-text-secondary text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-foreground">Best for:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {service.industries.map((industry, industryIndex) => (
                      <span key={industryIndex} className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <span className="text-lg font-bold text-accent">{service.pricing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center space-y-6 pt-12 border-t border-border">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to start your project?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Let's discuss your specific requirements and create a tailored solution that meets your business goals and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 bg-accent text-accent-foreground font-medium hover:bg-accent/90 transition-colors"
            >
              Get a Quote
            </a>
            <a
              href="/faq"
              className="inline-flex items-center justify-center rounded-lg px-8 py-3 border border-border hover:border-accent transition-colors"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
