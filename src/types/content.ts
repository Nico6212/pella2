export interface HeroContent {
  badgeText: string;
  heading: {
    line1: string;
    line2prefix: string;
    line2highlight: string;
    line3: string;
  };
  subtitle: string;
  ctaPrimary: { text: string; href: string };
  ctaSecondary: { text: string; href: string };
  scrollText: string;
  backgroundImage: string;
  stats: Array<{ value: string; label: string }>;
}

export interface AboutContent {
  label: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
  floatingCard: { value: string; label: string };
  features: Array<{ icon: string; title: string; description: string }>;
  ctaText: string;
  ctaHref: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  image: string;
  features: string[];
  linkTo: string | null;
}

export interface ServicesContent {
  label: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  items: ServiceItem[];
}

export interface PortfolioProject {
  title: string;
  category: string;
  image: string;
  size: 'large' | 'medium' | 'small';
  linkTo: string | null;
}

export interface PortfolioContent {
  label: string;
  title: string;
  description: string;
  categories: string[];
  projects: PortfolioProject[];
}

export interface ContactContent {
  label: string;
  title: string;
  description: string;
  contactItems: Array<{ iconPath: string; label: string; value: string }>;
  socialLinks: Array<{ name: string; url: string }>;
  formConfig: {
    eventTypes: Array<{ value: string; label: string }>;
    submitButtonText: string;
    responseText: string;
  };
}

export interface FooterContent {
  tagline: string;
  newsletter: { title: string; placeholder: string; buttonText: string };
  linkColumns: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  socialLinks: Array<{ name: string; letter: string; url: string }>;
}

export interface NavbarContent {
  logoImage: string;
  links: Array<{ name: string; href: string }>;
  ctaText: string;
  ctaHref: string;
}
