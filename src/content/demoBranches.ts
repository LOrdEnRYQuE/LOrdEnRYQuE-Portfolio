export type DemoBranch = {
  slug: string;
  title: string;
  niche: string;
  headline: string;
  summary: string;
  features: string[];
  cover: string;
  status: "Live Demo" | "Prototype";
  ctaLabel: string;
};

export const demoBranches: DemoBranch[] = [
  {
    slug: "restaurantflow",
    title: "LOrdEnRYQuE RestaurantFlow",
    niche: "Restaurants & Dining",
    headline: "The modern digital dining experience.",
    summary:
      "A complete flow for modern restaurants: digital menus, table reservations, and seamless online ordering simulations.",
    features: [
      "Digital Menu System",
      "Table Reservation UX",
      "Order/Cart Simulation",
      "Featured Dishes Carousel",
    ],
    cover: "/images/demos/restaurantflow.png",
    status: "Live Demo",
    ctaLabel: "Test Restaurant Demo",
  },
  {
    slug: "beautybook",
    title: "LOrdEnRYQuE BeautyBook",
    niche: "Salons & Aesthetics",
    headline: "Premium booking for premium services.",
    summary:
      "An elegant appointment booking and service presentation platform designed for high-end beauty and aesthetic studios.",
    features: [
      "Online Appointment Flow",
      "Service Duration & Pricing",
      "Stylist Profile Cards",
      "Before/After Gallery",
    ],
    cover: "/images/demos/beautybook.png",
    status: "Live Demo",
    ctaLabel: "Test Booking Demo",
  },
  {
    slug: "servicehub",
    title: "LOrdEnRYQuE ServiceHub",
    niche: "Home & Local Services",
    headline: "Convert local traffic into booked jobs.",
    summary:
      "A conversion-optimized platform for tradespeople, featuring instant quote requests and area coverage mapping.",
    features: [
      "Instant Quote Request",
      "Mobile-First Contact Flow",
      "Service Category Grid",
      "Trust Badges & Reviews",
    ],
    cover: "/images/demos/servicehub.png",
    status: "Live Demo",
    ctaLabel: "Test Service Demo",
  },
  {
    slug: "propview",
    title: "LOrdEnRYQuE PropView",
    niche: "Real Estate & Luxury Listings",
    headline: "Immersive property exploration & lead gen.",
    summary:
      "A high-end real estate platform showcasing luxury properties with interactive tour scheduling and neighborhood analytics.",
    features: [
      "Immersive Property Gallery",
      "Schedule a Tour Wizard",
      "Neighborhood Stats Widget",
      "Mortgage Calculator",
    ],
    cover: "/images/demos/propview.png",
    status: "Live Demo",
    ctaLabel: "Test Real Estate Demo",
  },
  {
    slug: "insightflow",
    title: "LOrdEnRYQuE InsightFlow",
    niche: "SaaS & Analytics Dashboard",
    headline: "Data-driven decisions, simplified.",
    summary:
      "A high-performance SaaS analytics platform featuring real-time data visualization, user activity monitoring, and enterprise-grade reporting.",
    features: [
      "Real-time Data Visuals",
      "User Activity Feed",
      "Revenue Analytics",
      "Subscription Management",
    ],
    cover: "/images/demos/insightflow.png",
    status: "Live Demo",
    ctaLabel: "Test SaaS Demo",
  },
];
