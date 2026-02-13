import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useSectionData } from '../hooks/useSectionData';
import type { AboutContent } from '../types/content';

const fallback: AboutContent = {
  label: 'À propos',
  title: 'Là où la vision rencontre l\'exécution parfaite',
  paragraph1: 'Fondée avec une passion pour créer des moments extraordinaires, Pela est devenue une agence événementielle de premier plan, reconnue pour son souci du détail et son approche innovante.',
  paragraph2: 'Notre équipe de professionnels créatifs réunit expertise en design, logistique et hospitalité pour offrir des expériences fluides qui dépassent les attentes. Du concept à la réalisation, nous gérons chaque détail avec précision et soin.',
  image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1000',
  floatingCard: { value: '12+', label: "Années d'excellence" },
  features: [
    { icon: '✦', title: 'Vision créative', description: 'Concepts uniques adaptés à votre histoire' },
    { icon: '◆', title: 'Équipe experte', description: 'Professionnels leaders du secteur' },
    { icon: '●', title: 'Souci du détail', description: 'Rien n\'est laissé au hasard' },
    { icon: '▲', title: 'Organisation sereine', description: 'Nous gérons tout pour vous' },
  ],
  ctaText: 'En savoir plus sur notre approche',
  ctaHref: '#contact',
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { data } = useSectionData<AboutContent>('about', fallback);

  return (
    <section id="about" className="py-section-mobile lg:py-section px-6 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream-dark">
              <img src={data.image} alt="Décoration événementielle élégante" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 bg-cream rounded-2xl p-6 shadow-xl border border-taupe/10"
            >
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <div className="font-display text-2xl font-semibold text-charcoal">{data.floatingCard.value}</div>
                  <div className="text-sm text-taupe">{data.floatingCard.label}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">{data.label}</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold leading-tight text-charcoal text-balance">
              {data.title}
            </h2>
            <p className="mt-6 text-lg text-taupe leading-relaxed">{data.paragraph1}</p>
            <p className="mt-4 text-taupe leading-relaxed">{data.paragraph2}</p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {data.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 text-gold">{feature.icon}</span>
                  <div>
                    <h4 className="font-display font-medium text-charcoal">{feature.title}</h4>
                    <p className="text-sm text-taupe">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              href={data.ctaHref}
              className="mt-10 inline-flex items-center gap-2 font-medium text-charcoal group"
            >
              <span>{data.ctaText}</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
