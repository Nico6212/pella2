import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

const celebrationPhotos: { id: number; src: string; alt: string }[] = [
  { id: 1, src: '/celebration/1.jpg', alt: 'Célébration 1' },
  { id: 2, src: '/celebration/2.jpg', alt: 'Célébration 2' },
  { id: 3, src: '/celebration/3.jpg', alt: 'Célébration 3' },
  { id: 4, src: '/celebration/4.jpg', alt: 'Célébration 4' },
  { id: 6, src: '/celebration/6.jpg', alt: 'Célébration 6' },
  { id: 7, src: '/celebration/7.jpg', alt: 'Célébration 7' },
  { id: 8, src: '/celebration/8.jpg', alt: 'Célébration 8' },
  { id: 9, src: '/celebration/9.jpg', alt: 'Célébration 9' },
  { id: 10, src: '/celebration/10.jpg', alt: 'Célébration 10' },
  { id: 11, src: '/celebration/11.jpg', alt: 'Célébration 11' },
  { id: 12, src: '/celebration/12.jpg', alt: 'Célébration 12' },
  { id: 13, src: '/celebration/13.jpg', alt: 'Célébration 13' },
  { id: 14, src: '/celebration/14.jpg', alt: 'Célébration 14' },
  { id: 15, src: '/celebration/15.jpg', alt: 'Célébration 15' },
];

export default function CelebrationGallery() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState<number | null>(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-no-repeat grayscale"
        style={{
          backgroundImage: `url('/celebration/1.jpg')`,
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
          <h1 className="font-display text-xl font-semibold text-charcoal">Célébration Vintage</h1>
          <div className="w-20" />
        </div>
      </motion.header>

      {/* Gallery */}
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-2"
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">Galerie</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-semibold text-charcoal">
              Célébration Vintage
            </h2>
            <p className="mt-4 text-lg text-taupe max-w-2xl mx-auto italic">
              Chaque moment mérite d'être célébré comme il se doit.
            </p>
          </motion.div>

          {/* Texte 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <div className="space-y-6 text-charcoal text-lg leading-relaxed">
              <p>
                Les grandes étapes de la vie ne sont pas seulement des dates sur un calendrier : ce sont des instants précieux, des souvenirs en devenir, des émotions partagées avec ceux qui comptent vraiment. Nous transformons vos célébrations privées en expériences vibrantes, élégantes et profondément mémorables, pensées pour refléter votre personnalité et l'importance de l'occasion.
              </p>
              <p>
                Qu'il s'agisse d'un anniversaire marquant, d'une fête familiale, d'un anniversaire de mariage, d'une baby shower pleine de douceur, ou encore d'une remise de diplôme, nous créons des ambiances sur mesure qui donnent vie à votre vision.
              </p>
            </div>
          </motion.div>

          {/* Texte 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="space-y-6 text-charcoal text-lg leading-relaxed">
              <p>
                Notre équipe imagine des scénographies colorées, des atmosphères chaleureuses et des détails soigneusement orchestrés pour que chaque invité ressente la magie du moment.
              </p>
              <div className="space-y-3 py-4">
                <p className="flex items-start gap-3">
                  <span className="text-gold text-xl leading-none">🎉</span>
                  <span><strong className="text-charcoal">Votre célébration, notre créativité :</strong> festive, élégante, intime ou spectaculaire.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gold text-xl leading-none">🌈</span>
                  <span><strong className="text-charcoal">Votre univers, notre palette :</strong> couleurs, décorations, animations… tout est pensé pour raconter votre histoire.</span>
                </p>
                <p className="flex items-start gap-3">
                  <span className="text-gold text-xl leading-none">✨</span>
                  <span><strong className="text-charcoal">Votre bonheur, notre priorité :</strong> une organisation fluide, une ambiance unique, et des souvenirs qui durent.</span>
                </p>
              </div>
              <p>
                Des premières idées jusqu'au dernier éclat de rire, nous vous accompagnons pour créer une fête qui vous ressemble, où chaque détail contribue à rendre l'instant inoubliable.
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
                → Découvrez comment nous transformons vos moments importants en célébrations exceptionnelles.
              </button>
            </div>
          </motion.div>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {celebrationPhotos.map((photo, index) => (
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
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox > 0 ? lightbox - 1 : celebrationPhotos.length - 1); }}
            >
              ‹
            </button>
            <img
              src={celebrationPhotos[lightbox].src}
              alt={celebrationPhotos[lightbox].alt}
              className="max-h-[90vh] max-w-[90vw] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-gold transition-colors"
              onClick={(e) => { e.stopPropagation(); setLightbox(lightbox < celebrationPhotos.length - 1 ? lightbox + 1 : 0); }}
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
