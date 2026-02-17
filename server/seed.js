const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Hero = require('./models/Hero');
const About = require('./models/About');
const Services = require('./models/Services');
const Portfolio = require('./models/Portfolio');
const Contact = require('./models/Contact');
const Footer = require('./models/Footer');
const Navbar = require('./models/Navbar');

const seedData = {
  hero: {
    badgeText: 'Créateurs de moments inoubliables',
    heading: {
      line1: 'Nous Créons',
      line2prefix: 'des ',
      line2highlight: 'Expériences',
      line3: 'Inspirantes',
    },
    subtitle: 'Des réceptions intimistes aux grandes célébrations, nous transformons votre vision en événements extraordinaires qui marquent les esprits.',
    ctaPrimary: { text: 'Voir nos réalisations', href: '#portfolio' },
    ctaSecondary: { text: 'Planifier votre événement', href: '#contact' },
    scrollText: 'Défiler',
    backgroundImage: '/hero-bg.jpg',
    stats: [
      { value: '500+', label: 'Événements organisés' },
      { value: '12', label: "Années d'expérience" },
      { value: '98%', label: 'Clients satisfaits' },
      { value: '15', label: 'Prix du secteur' },
    ],
  },

  about: {
    label: 'À propos',
    title: 'Là où la vision rencontre l\'exécution parfaite',
    paragraph1: 'Fondée avec une passion pour créer des moments extraordinaires, REINZA EVENT est devenue une agence événementielle de premier plan, reconnue pour son souci du détail et son approche innovante.',
    paragraph2: 'Notre équipe de professionnels créatifs réunit expertise en design, logistique et hospitalité pour offrir des expériences fluides qui dépassent les attentes. Du concept à la réalisation, nous gérons chaque détail avec précision et soin.',
    image: '/about-image.jpg',
    floatingCard: { value: '12+', label: "Années d'excellence" },
    features: [
      { icon: '✦', title: 'Vision créative', description: 'Concepts uniques adaptés à votre histoire' },
      { icon: '◆', title: 'Équipe experte', description: 'Professionnels leaders du secteur' },
      { icon: '●', title: 'Souci du détail', description: 'Rien n\'est laissé au hasard' },
      { icon: '▲', title: 'Organisation sereine', description: 'Nous gérons tout pour vous' },
    ],
    ctaText: 'En savoir plus sur notre approche',
    ctaHref: '#contact',
  },

  services: {
    label: 'Nos Services',
    title: "Des événements d'exception pour chaque occasion",
    description: "Qu'il s'agisse d'une réunion intimiste ou d'une grande célébration, nous donnons vie à votre vision avec créativité, précision et passion.",
    ctaText: 'Discutons de votre événement',
    ctaHref: '#contact',
    items: [
      {
        title: 'Événements Corporate',
        description: 'Des lancements de produits aux galas annuels, nous créons des expériences corporate impactantes qui renforcent votre marque et engagent votre audience.',
        image: '/services-corporate.jpg',
        features: ['Conférences & Séminaires', 'Lancements de produits', 'Team Building', 'Cérémonies de remise de prix'],
        linkTo: '/evenements-corporate',
      },
      {
        title: 'Mariages',
        description: "Votre histoire d'amour mérite une célébration aussi unique que vous. Nous créons des mariages personnalisés qui reflètent votre parcours ensemble.",
        image: '/services-mariages.jpg',
        features: ['Mariages destination', 'Cérémonies intimistes', 'Grandes célébrations', 'Organisation complète'],
        linkTo: '/mariage-pela',
      },
      {
        title: 'Célébration Vintage',
        description: 'Anniversaires, fêtes et moments importants transformés en célébrations inoubliables pour vous et vos proches.',
        image: '/services-celebration.jpg',
        features: ["Fêtes d'anniversaire", 'Anniversaires de mariage', 'Baby Showers', 'Remises de diplômes'],
        linkTo: '/celebration-vintage',
      },
      {
        title: 'Expériences Luxe',
        description: "Événements exclusifs haut de gamme conçus pour des clients exigeants qui n'attendent rien de moins que la perfection.",
        image: '/services-luxe.jpg',
        features: ['Événements VIP', 'Dîners privés', 'Soirées sur yacht', 'Réceptions exclusives'],
        linkTo: '/experiences-luxe',
      },
    ],
  },

  portfolio: {
    label: 'Réalisations',
    title: 'Nos derniers projets',
    description: 'Une sélection de nos événements et célébrations les plus mémorables.',
    categories: ['Tous', 'Corporate', 'Mariage', 'Privé'],
    projects: [
      { title: 'Gala du Jardin Enchanté', category: 'Corporate', image: '/portfolio-gala.jpg', size: 'large', linkTo: '/portfolio/gala-jardin-enchante' },
      { title: 'Mariage Coucher de Soleil', category: 'Mariage', image: '/portfolio-mariage.jpg', size: 'small', linkTo: '/portfolio/mariage-coucher-soleil' },
      { title: 'Célébration Vintage', category: 'Privé', image: '/portfolio-celebration.jpg', size: 'small', linkTo: '/portfolio/celebration-vintage' },
      { title: 'Sommet Tech 2024', category: 'Corporate', image: '/portfolio-tech.jpg', size: 'medium', linkTo: '/portfolio/sommet-tech-2024' },
      { title: 'Romance sur les Toits', category: 'Mariage', image: '/portfolio-romance.jpg', size: 'medium', linkTo: '/portfolio/romance-toits' },
      { title: 'Lancement Marque de Luxe', category: 'Corporate', image: '/portfolio-luxe.jpg', size: 'large', linkTo: '/portfolio/lancement-marque-luxe' },
    ],
  },

  contact: {
    label: 'Contactez-nous',
    title: 'Créons ensemble quelque chose de magnifique',
    description: "Prêt à donner vie à votre vision ? Nous serions ravis d'en savoir plus sur votre prochain événement et d'explorer comment le rendre inoubliable.",
    contactItems: [
      { iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'ppelavie@yahoo.fr' },
      { iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Téléphone', value: '+33 1 23 45 67 89' },
      { iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Adresse', value: 'Paris, France' },
    ],
    socialLinks: [
      { name: 'Instagram', url: '#' },
      { name: 'Pinterest', url: '#' },
      { name: 'LinkedIn', url: '#' },
    ],
    formConfig: {
      eventTypes: [
        { value: 'wedding', label: 'Mariage' },
        { value: 'corporate', label: 'Événement corporate' },
        { value: 'private', label: 'Célébration privée' },
        { value: 'luxury', label: 'Expérience luxe' },
      ],
      submitButtonText: 'Envoyer ma demande',
      responseText: 'Nous vous répondrons sous 24 heures pour discuter de votre événement',
    },
  },

  footer: {
    tagline: "Créateurs d'expériences inoubliables, nous donnons vie à votre vision avec créativité, précision et passion.",
    newsletter: {
      title: 'Restez inspiré',
      placeholder: 'Votre email',
      buttonText: "S'inscrire",
    },
    linkColumns: [
      {
        title: 'services',
        links: [
          { name: 'Événements Corporate', href: '#services' },
          { name: 'Mariages', href: '#services' },
          { name: 'Célébration Vintage', href: '#services' },
          { name: 'Expériences Luxe', href: '#services' },
        ],
      },
      {
        title: 'entreprise',
        links: [
          { name: 'À propos', href: '#about' },
          { name: 'Réalisations', href: '#portfolio' },
          { name: 'Témoignages', href: '#' },
          { name: 'Blog', href: '#' },
        ],
      },
      {
        title: 'support',
        links: [
          { name: 'Contact', href: '#contact' },
          { name: 'FAQ', href: '#' },
          { name: 'Confidentialité', href: '#' },
          { name: 'Mentions légales', href: '#' },
        ],
      },
    ],
    socialLinks: [
      { name: 'Instagram', letter: 'In', url: '#' },
      { name: 'Pinterest', letter: 'Pi', url: '#' },
      { name: 'LinkedIn', letter: 'Li', url: '#' },
      { name: 'Twitter', letter: 'X', url: '#' },
    ],
  },

  navbar: {
    logoImage: '/mariage pela/logo REINZA EVENT.png',
    links: [
      { name: 'À propos', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Réalisations', href: '#portfolio' },
      { name: 'Contact', href: '#contact' },
    ],
    ctaText: 'Réserver un appel',
    ctaHref: '#contact',
  },
};

async function seed() {
  await connectDB();

  await Promise.all([
    Hero.deleteMany({}),
    About.deleteMany({}),
    Services.deleteMany({}),
    Portfolio.deleteMany({}),
    Contact.deleteMany({}),
    Footer.deleteMany({}),
    Navbar.deleteMany({}),
  ]);

  await Promise.all([
    Hero.create(seedData.hero),
    About.create(seedData.about),
    Services.create(seedData.services),
    Portfolio.create(seedData.portfolio),
    Contact.create(seedData.contact),
    Footer.create(seedData.footer),
    Navbar.create(seedData.navbar),
  ]);

  console.log('Base de données initialisée avec succès !');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Erreur lors du seed:', err);
  process.exit(1);
});
