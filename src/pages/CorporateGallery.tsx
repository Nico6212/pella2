import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

const corporatePhotos: { id: number; src: string; alt: string }[] = [
  // Ajoute tes photos ici
];

export default function CorporateGallery() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-no-repeat grayscale"
        style={{
          backgroundImage: `url('/bg-corporate.jpg')`,
          backgroundPosition: 'center 30%',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-cream/75" />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-taupe/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-charcoal hover:text-gold transition-colors">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Retour</span>
          </Link>
          <h1 className="font-display text-xl font-semibold text-charcoal">Événements Corporate</h1>
          <div className="w-20" />
        </div>
      </motion.header>

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
              Événements Corporate
            </h2>
            <p className="mt-4 text-lg text-taupe max-w-2xl mx-auto italic">
              Vivez l'instant. Créez l'impact. Marquez les esprits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-16 space-y-6 text-charcoal text-lg leading-relaxed"
          >
            <p>
              Chaque événement est une scène, chaque moment une opportunité.
            </p>
            <p>
              Nous concevons des expériences corporate qui vont bien au-delà du simple rassemblement : elles incarnent votre vision, valorisent votre marque et créent une connexion durable avec votre audience.
            </p>
            <p>
              Des lancements de produits audacieux aux galas prestigieux, en passant par des séminaires inspirants et des team buildings fédérateurs, nous transformons vos idées en événements mémorables.
            </p>
            <p>
              Notre approche allie créativité, rigueur logistique et technologie immersive pour offrir des formats sur mesure, adaptés à vos enjeux et à vos ambitions.
            </p>

            <div className="space-y-3 py-4">
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">🎯</span>
                <span><strong className="text-charcoal">Objectif :</strong> captiver, fédérer, valoriser.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">🎤</span>
                <span><strong className="text-charcoal">Moyens :</strong> scénographie moderne, storytelling visuel, interactions engageantes.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">🌐</span>
                <span><strong className="text-charcoal">Résultat :</strong> une expérience qui résonne bien au-delà du jour J.</span>
              </p>
            </div>

            <button
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }, 300);
              }}
              className="inline-block text-charcoal font-medium hover:text-gold transition-colors underline underline-offset-4 cursor-pointer"
            >
              → Découvrez comment nos événements corporate peuvent transformer votre communication en expérience vivante.
            </button>
          </motion.div>

          {corporatePhotos.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {corporatePhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                  className="break-inside-avoid"
                >
                  <div className="relative group overflow-hidden rounded-2xl bg-cream-dark">
                    <img src={photo.src} alt={photo.alt} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  );
}
