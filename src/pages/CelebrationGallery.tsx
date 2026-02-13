import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const celebrationPhotos: { id: number; src: string; alt: string }[] = [
  // Ajoute tes photos ici, exemple :
  // { id: 1, src: '/celebration vintage/photo1.png', alt: 'Celebration 1' },
];

export default function CelebrationGallery() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-taupe/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-charcoal hover:text-gold transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Retour</span>
          </Link>
          <h1 className="font-display text-xl font-semibold text-charcoal">Célébrations Privées</h1>
          <div className="w-20" />
        </div>
      </motion.header>

      {/* Gallery */}
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-12"
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">Galerie</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-charcoal">
              Célébrations Privées
            </h2>
            <p className="mt-4 text-lg text-taupe max-w-2xl mx-auto">
              Découvrez nos célébrations privées, des moments élégants et inoubliables.
            </p>
          </motion.div>

          {/* Masonry Grid */}
          {celebrationPhotos.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {celebrationPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="break-inside-avoid"
                >
                  <div className="relative group overflow-hidden rounded-2xl bg-cream-dark">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-taupe text-lg">Photos bientôt disponibles...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
