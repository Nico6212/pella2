import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { useSectionData } from '../hooks/useSectionData';
import type { FooterContent } from '../types/content';

const fallbackData: FooterContent = {
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
};

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { data } = useSectionData<FooterContent>('footer', fallbackData);

  return (
    <footer className="bg-cream-dark py-16 px-6" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <a href="#" className="font-display text-2xl font-semibold tracking-tight text-charcoal">
              REINZA EVENT<span className="text-gold">.</span>
            </a>
            <p className="mt-4 max-w-sm text-taupe leading-relaxed">
              {data.tagline}
            </p>

          </motion.div>

          {/* Links Columns */}
          {data.linkColumns.map((column, colIndex) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (colIndex + 1) }}
            >
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-charcoal mb-4">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-taupe transition-colors hover:text-charcoal"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 pt-8 border-t border-taupe/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-taupe">
            &copy; {new Date().getFullYear()} REINZA EVENT. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {data.socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                className="h-9 w-9 rounded-full border border-taupe/20 flex items-center justify-center text-taupe transition-all hover:bg-charcoal hover:text-cream hover:border-charcoal"
                aria-label={social.name}
              >
                <span className="text-xs font-medium">{social.letter}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
