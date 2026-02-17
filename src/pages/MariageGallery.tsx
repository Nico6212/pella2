import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

const mariagePhotos = [
  { id: 1, src: '/mariage/mariage.jpg', alt: 'Mariage' },
  { id: 2, src: '/mariage/photo-festif.jpg', alt: 'Mariage festif' },
  { id: 3, src: '/mariage/photo-mariage.jpg', alt: 'Photo de mariage' },
  { id: 4, src: '/mariage/photo-mariage1.jpg', alt: 'Photo de mariage 1' },
  { id: 5, src: '/mariage/photo-mariage2.jpg', alt: 'Photo de mariage 2' },
];

export default function MariageGallery() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-no-repeat grayscale"
        style={{
          backgroundImage: `url('/bg-mariage.jpg')`,
          backgroundPosition: 'center 30%',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-cream/75" />

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
          <h1 className="font-display text-xl font-semibold text-charcoal">Mariage</h1>
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
              Mariages
            </h2>
            <p className="mt-4 text-lg text-taupe max-w-2xl mx-auto italic">
              Votre histoire mérite une célébration inoubliable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-16 space-y-6 text-charcoal text-lg leading-relaxed"
          >
            <p>
              Un mariage n'est pas seulement un événement : c'est un chapitre fondateur, un moment suspendu où deux parcours se rejoignent pour n'en former qu'un.
            </p>
            <p>
              Nous créons des expériences qui capturent l'essence de votre amour, subliment votre vision et transforment votre journée en un souvenir qui traverse le temps.
            </p>
            <p>
              Qu'il s'agisse d'un mariage intimiste, d'une grande célébration entourée de vos proches, ou d'un mariage destination dans un lieu d'exception, nous façonnons chaque détail avec soin.
            </p>
            <p>
              Notre approche allie esthétique raffinée, organisation millimétrée et sensibilité artistique pour donner vie à une cérémonie qui vous ressemble vraiment.
            </p>

            <div className="space-y-3 py-4">
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">💍</span>
                <span><strong className="text-charcoal">Votre style, notre inspiration :</strong> romantique, moderne, bohème, luxueux.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">🌿</span>
                <span><strong className="text-charcoal">Votre histoire, notre fil conducteur :</strong> chaque décor, chaque ambiance, chaque moment raconte quelque chose de vous.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">✨</span>
                <span><strong className="text-charcoal">Votre journée, notre mission :</strong> créer une expérience fluide, chaleureuse et profondément mémorable.</span>
              </p>
            </div>

            <p>
              Des préparatifs à la dernière danse, nous orchestrons chaque instant pour que vous puissiez vivre votre journée pleinement, sans stress, avec la certitude que tout est entre de bonnes mains.
            </p>

            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
              className="inline-block text-charcoal font-medium hover:text-gold transition-colors underline underline-offset-4 cursor-pointer"
            >
              → Découvrez comment nous transformons votre rêve en une célébration unique et authentique.
            </button>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {mariagePhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="break-inside-avoid cursor-pointer"
                onClick={() => setLightbox(index)}
              >
                <div className="relative group overflow-hidden rounded-2xl bg-cream-dark">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-3xl hover:text-gold transition-colors"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox > 0 ? lightbox - 1 : mariagePhotos.length - 1); }}
            >
              ‹
            </button>
            <img
              src={mariagePhotos[lightbox].src}
              alt={mariagePhotos[lightbox].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox < mariagePhotos.length - 1 ? lightbox + 1 : 0); }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
