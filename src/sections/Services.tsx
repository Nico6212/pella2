import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { usePageTransition } from '../components/TileTransition';
import { useSectionData } from '../hooks/useSectionData';
import type { ServicesContent } from '../types/content';

const fallback: ServicesContent = {
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
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { startTransition } = usePageTransition();
  const { data } = useSectionData<ServicesContent>('services', fallback);

  const handleServiceClick = (index: number) => {
    const service = data.items[index];
    if (service?.linkTo) {
      startTransition(service.linkTo);
    }
  };

  return (
    <section id="services" className="py-section-mobile lg:py-section px-6 bg-cream-dark" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">{data.label}</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-charcoal text-balance">
            {data.title}
          </h2>
          <p className="mt-6 text-lg text-taupe">{data.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {data.items.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              onMouseEnter={() => setHoveredId(index)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleServiceClick(index)}
              className="group relative overflow-hidden rounded-3xl bg-cream cursor-pointer"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="h-full w-full object-cover"
                  animate={{ scale: hoveredId === index ? 1.05 : 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent" />
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <motion.div animate={{ y: hoveredId === index ? 0 : 20 }} transition={{ duration: 0.4 }}>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-cream">{service.title}</h3>
                  <motion.p
                    className="mt-3 text-cream/80 leading-relaxed"
                    animate={{ opacity: hoveredId === index ? 1 : 0, y: hoveredId === index ? 0 : 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {service.description}
                  </motion.p>
                  <motion.div
                    className="mt-4 flex flex-wrap gap-2"
                    animate={{ opacity: hoveredId === index ? 1 : 0, y: hoveredId === index ? 0 : 10 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {service.features.map((feature, idx) => (
                      <span key={idx} className="rounded-full bg-cream/20 backdrop-blur-sm px-3 py-1 text-xs text-cream">
                        {feature}
                      </span>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-cream/20 backdrop-blur-sm flex items-center justify-center"
                animate={{ scale: hoveredId === index ? 1 : 0.8, opacity: hoveredId === index ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="h-4 w-4 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <a
            href={data.ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-charcoal px-8 py-4 font-medium text-cream transition-all hover:bg-charcoal-light hover:shadow-xl hover:shadow-charcoal/10"
          >
            <span>{data.ctaText}</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
