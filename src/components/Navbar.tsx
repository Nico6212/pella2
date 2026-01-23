import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { name: 'À propos', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Réalisations', href: '#portfolio' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-full bg-cream/80 px-6 py-3 backdrop-blur-md border border-taupe/10">
          {/* Logo */}
          <a href="#" className="font-display text-xl font-semibold tracking-tight text-charcoal">
            Pella<span className="text-gold">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-taupe transition-colors hover:text-charcoal"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-charcoal px-5 py-2 text-sm font-medium text-cream transition-all hover:bg-charcoal-light"
            >
              Réserver un appel
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
              className="block h-0.5 w-6 bg-charcoal"
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className="block h-0.5 w-6 bg-charcoal"
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
              className="block h-0.5 w-6 bg-charcoal"
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-6 right-6 mt-2 rounded-2xl bg-cream/95 p-6 backdrop-blur-md border border-taupe/10 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-charcoal transition-colors hover:text-gold"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded-full bg-charcoal px-5 py-3 text-center text-sm font-medium text-cream"
              >
                Réserver un appel
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
