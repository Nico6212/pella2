import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

const footerLinks = {
  services: [
    { name: 'Événements Corporate', href: '#services' },
    { name: 'Mariages', href: '#services' },
    { name: 'Célébrations Privées', href: '#services' },
    { name: 'Expériences Luxe', href: '#services' },
  ],
  entreprise: [
    { name: 'À propos', href: '#about' },
    { name: 'Réalisations', href: '#portfolio' },
    { name: 'Témoignages', href: '#' },
    { name: 'Blog', href: '#' },
  ],
  support: [
    { name: 'Contact', href: '#contact' },
    { name: 'FAQ', href: '#' },
    { name: 'Confidentialité', href: '#' },
    { name: 'Mentions légales', href: '#' },
  ],
};

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

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
              Pella<span className="text-gold">.</span>
            </a>
            <p className="mt-4 max-w-sm text-taupe leading-relaxed">
              Créateurs d'expériences inoubliables, nous donnons vie à votre vision avec créativité,
              précision et passion.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="text-sm font-medium text-charcoal mb-3">Restez inspiré</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 rounded-full bg-cream border border-taupe/20 px-4 py-2.5 text-sm text-charcoal placeholder:text-taupe/50 focus:outline-none focus:border-gold/50"
                />
                <button className="rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-charcoal-light">
                  S'inscrire
                </button>
              </div>
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([title, links], colIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (colIndex + 1) }}
            >
              <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-charcoal mb-4">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
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
            &copy; {new Date().getFullYear()} Pella Events. Tous droits réservés.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { name: 'Instagram', letter: 'In' },
              { name: 'Pinterest', letter: 'Pi' },
              { name: 'LinkedIn', letter: 'Li' },
              { name: 'Twitter', letter: 'X' },
            ].map((social) => (
              <a
                key={social.name}
                href="#"
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
