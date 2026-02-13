import { motion } from 'motion/react';
import { useSectionData } from '../hooks/useSectionData';
import type { HeroContent } from '../types/content';

const fallback: HeroContent = {
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
  backgroundImage: '/hero%20evenement%20image%20de%20font%20.png',
  stats: [
    { value: '500+', label: 'Événements organisés' },
    { value: '12', label: "Années d'expérience" },
    { value: '98%', label: 'Clients satisfaits' },
    { value: '15', label: 'Prix du secteur' },
  ],
};

export default function Hero() {
  const { data } = useSectionData<HeroContent>('hero', fallback);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-20">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${data.backgroundImage})`,
          backgroundPosition: 'center 30%'
        }}
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-[10%] h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        <div className="absolute bottom-20 left-[10%] h-96 w-96 rounded-full bg-sage/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blush/20 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-cream-dark px-4 py-2 border border-taupe/20"
        >
          <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
          <span className="text-sm font-medium text-taupe">{data.badgeText}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.95] tracking-tight text-charcoal text-balance"
        >
          {data.heading.line1}
          <br />
          {data.heading.line2prefix}<span className="text-taupe">{data.heading.line2highlight}</span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">{data.heading.line3}</span>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-2 left-0 right-0 h-4 bg-gold/30 origin-left -z-10"
            />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-8 max-w-xl text-lg text-taupe leading-relaxed"
        >
          {data.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={data.ctaPrimary.href}
            className="group relative overflow-hidden rounded-full bg-charcoal px-8 py-4 font-medium text-cream transition-all hover:shadow-xl hover:shadow-charcoal/20"
          >
            <span className="relative z-10">{data.ctaPrimary.text}</span>
            <span className="absolute inset-0 bg-gold translate-y-full transition-transform group-hover:translate-y-0" />
          </a>
          <a
            href={data.ctaSecondary.href}
            className="flex items-center gap-2 rounded-full px-8 py-4 font-medium text-charcoal transition-colors hover:text-gold"
          >
            <span>{data.ctaSecondary.text}</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-taupe/10 pt-10"
        >
          {data.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-semibold text-charcoal">{stat.value}</div>
              <div className="mt-1 text-sm text-taupe">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-taupe uppercase tracking-widest">{data.scrollText}</span>
          <div className="h-12 w-[1px] bg-gradient-to-b from-taupe to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
