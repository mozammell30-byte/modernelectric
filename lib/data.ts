export type ServiceItem = {
  title: string;
  description: string;
  icon: "mosque" | "clock" | "timer" | "scroll" | "store" | "settings";
};

export type PortfolioItem = {
  title: string;
  category: string;
  tag: string;
  image: string;
  videoId?: string;
  span?: "tall" | "wide" | "normal";
};

export type PricingPlan = {
  name: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  cta: string;
  accent: "green" | "blue" | "purple";
  popular?: boolean;
};

export type TestimonialItem = {
  name: string;
  quote: string;
};

export type HeroContent = {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ticker: string;
};

export type GalleryItem = {
  title: string;
  category: string;
  image: string;
  span?: "normal" | "wide" | "tall";
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

export const whatsappNumber = "919800782814";

export const services: ServiceItem[] = [
  {
    title: "Mosque LED Displays",
    description: "Elegant high-visibility LED displays tailored for masjid interiors and entrance boards.",
    icon: "mosque",
  },
  {
    title: "Prayer Time Systems",
    description: "Accurate, programmable salah time boards with iqamah timers and auto schedule updates.",
    icon: "clock",
  },
  {
    title: "Ramadan Countdown Displays",
    description: "Specialized Ramadan countdown visuals with suhoor and iftar timing highlights.",
    icon: "timer",
  },
  {
    title: "Scrolling Text Displays",
    description: "Dynamic LED marquees for announcements, reminders, offers, and community notices.",
    icon: "scroll",
  },
  {
    title: "Shop Signboards",
    description: "Bright storefront LED signboards designed for local businesses and high street visibility.",
    icon: "store",
  },
  {
    title: "Custom LED Programming",
    description: "Fully custom layouts, languages, and scheduling logic built for your exact workflow.",
    icon: "settings",
  },
];

export const stats = [
  { label: "Installations", value: "350+" },
  { label: "Cities Served", value: "48" },
  { label: "Support Uptime", value: "99.9%" },
];

export const portfolio: PortfolioItem[] = [
  {
    title: "Multi-color LED Panel",
    category: "Indoor Display",
    tag: "Indoor Display - Video",
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    videoId: "aqz-KE-bpKQ",
    span: "tall",
  },
  {
    title: "Shop OPEN Sign",
    category: "Retail Signage",
    tag: "Retail Signage",
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80",
    videoId: "dQw4w9WgXcQ",
    span: "normal",
  },
  {
    title: "Mosque Prayer Display",
    category: "Mosque Install",
    tag: "Mosque Install - Video",
    image:
      "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1200&q=80",
    videoId: "LXb3EKWsInQ",
    span: "normal",
  },
  {
    title: "Storefront Neon Wall",
    category: "Outdoor Sign",
    tag: "Outdoor Sign - Video",
    image:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1200&q=80",
    videoId: "ysz5S6PUM-U",
    span: "tall",
  },
  {
    title: "LED Pixel Matrix",
    category: "Custom Build",
    tag: "Custom Build",
    image:
      "https://images.unsplash.com/photo-1557318041-1ce374d55ebf?auto=format&fit=crop&w=1200&q=80",
    videoId: "ScMzIvxBSi4",
    span: "normal",
  },
  {
    title: "Controller Board",
    category: "Programming",
    tag: "Programming - Video",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    videoId: "M7lc1UVf-VE",
    span: "normal",
  },
  {
    title: "Color Pixel Wall",
    category: "Showroom",
    tag: "Showroom",
    image:
      "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1200&q=80",
    span: "wide",
  },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Main Prayer Hall Display",
    category: "Mosque Interior",
    image:
      "https://images.unsplash.com/photo-1524499982521-1ffd58dd89ea?auto=format&fit=crop&w=1600&q=80",
    span: "wide",
  },
  {
    title: "Night Neon Shopfront",
    category: "Retail Exterior",
    image:
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?auto=format&fit=crop&w=1600&q=80",
    span: "tall",
  },
  {
    title: "Pixel Matrix Close-up",
    category: "Hardware Detail",
    image:
      "https://images.unsplash.com/photo-1557318041-1ce374d55ebf?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Street LED Signboard",
    category: "Business Signage",
    image:
      "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Controller & Board",
    category: "Programming Unit",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Color Wall Installation",
    category: "Showroom",
    image:
      "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=1600&q=80",
    span: "wide",
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "₹15K",
    subtitle: "Starting From",
    description: "Perfect for small shops and local stores.",
    features: [
      "Single-color scrolling LED board (2-4 ft)",
      "Bengali + English text support",
      "Manual text update via USB / remote",
      "Indoor or covered outdoor use",
      "1-year hardware warranty",
      "On-site installation in Kolkata",
    ],
    cta: "Order Starter",
    accent: "green",
  },
  {
    name: "Pro Mosque",
    price: "₹45K",
    subtitle: "Starting From",
    description: "Complete prayer-time display system for mosques.",
    features: [
      "Multi-color LED prayer board (5-8 ft)",
      "Bengali - English - Arabic full support",
      "Auto Azan + Iqamah countdown",
      "Ramadan / Hijri calendar built-in",
      "WiFi remote control via mobile app",
      "2-year warranty + free updates",
      "Free site survey & calibration",
    ],
    cta: "Order Pro",
    accent: "blue",
    popular: true,
  },
  {
    name: "Custom Build",
    price: "Quote",
    subtitle: "Tailored To You",
    description: "Bespoke billboards, video walls and IoT signage.",
    features: [
      "Full-color HD video wall / billboard",
      "Custom firmware & animations",
      "IoT sensors, cameras, scheduling",
      "Outdoor IP65 weatherproof build",
      "CMS dashboard for multiple displays",
      "3-year warranty + dedicated support",
      "Nationwide installation",
    ],
    cta: "Request Quote",
    accent: "purple",
  },
];

export const features = [
  "Arabic/Bengali Support",
  "Remote Programming",
  "Energy Efficient",
  "Indoor & Outdoor",
  "Durable Build",
  "Fully Customizable",
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Masjid Noor Committee",
    quote:
      "The prayer time display is crystal clear and beautifully programmed. Setup was smooth and support is excellent.",
  },
  {
    name: "Sadiq Electronics",
    quote:
      "Our storefront LED board brought immediate visibility. The animation quality looks premium and modern.",
  },
  {
    name: "Green Market Plaza",
    quote:
      "Professional team, durable build quality, and responsive updates whenever we need new messages.",
  },
];

export const faq = [
  {
    question: "Can you customize layouts for our mosque timings?",
    answer:
      "Yes. We configure daily prayer times, iqamah countdowns, Jummah schedules, and special Ramadan profiles specific to your region.",
  },
  {
    question: "Do you offer remote updates?",
    answer:
      "Absolutely. We provide remote programming options so you can update messages and schedules without manual hardware handling.",
  },
  {
    question: "Are these displays suitable for outdoor use?",
    answer:
      "Yes. We build both indoor and weather-resistant outdoor models with high-brightness LEDs for clear daytime visibility.",
  },
  {
    question: "What is the delivery and installation timeline?",
    answer:
      "Typical projects are completed in 5-14 days depending on display size, programming complexity, and installation location.",
  },
];
