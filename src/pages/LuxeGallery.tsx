import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';

const luxePhotos: { id: number; src: string; alt: string }[] = [
  // Ajoute tes photos ici
];

export default function LuxeGallery() {
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('/bg-luxe.jpg')`,
          backgroundPosition: 'center 30%',
        }}
      />
      <div className="fixed inset-0 -z-10 bg-cream/70" />

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
          <h1 className="font-display text-xl font-semibold text-charcoal">Expériences Luxe</h1>
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
              Expériences Luxe
            </h2>
            <p className="mt-4 text-lg text-taupe max-w-2xl mx-auto italic">
              L'excellence n'est pas un détail, c'est une expérience.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl mx-auto mb-16 space-y-6 text-charcoal text-lg leading-relaxed"
          >
            <p>
              Les événements d'exception ne se contentent pas d'être beaux : ils doivent être impeccables, raffinés, orchestrés avec une précision absolue.
            </p>
            <p>
              Nous créons des expériences luxe pensées pour des clients exigeants, qui recherchent bien plus qu'un événement… ils recherchent un moment rare, exclusif, façonné sur mesure.
            </p>
            <p>
              Qu'il s'agisse d'un dîner privé dans un cadre prestigieux, d'une soirée VIP élégante, d'une réception exclusive, ou d'une fête sur yacht au coucher du soleil, chaque détail est imaginé pour offrir une atmosphère unique, sophistiquée et mémorable.
            </p>
            <p>
              Notre approche combine esthétique haut de gamme, service irréprochable et scénographie d'exception, afin de créer des instants qui marquent durablement.
            </p>

            <div className="space-y-3 py-4">
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">🌟</span>
                <span><strong className="text-charcoal">Votre vision, notre signature :</strong> élégance, discrétion, excellence.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">🍾</span>
                <span><strong className="text-charcoal">Votre événement, notre expertise :</strong> lieux d'exception, ambiances raffinées, prestations premium.</span>
              </p>
              <p className="flex items-start gap-3">
                <span className="text-gold text-xl leading-none">✨</span>
                <span><strong className="text-charcoal">Votre moment, notre engagement :</strong> offrir une expérience qui dépasse toutes les attentes.</span>
              </p>
            </div>

            <p>
              Du premier concept à la dernière lueur de la soirée, nous orchestrons chaque élément avec une attention minutieuse, pour que vous puissiez vivre un moment rare, entouré de vos invités, dans un univers où tout respire le luxe et la perfection.
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
              → Découvrez comment nous transformons vos événements haut de gamme en expériences inoubliables.
            </button>
          </motion.div>

          {luxePhotos.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {luxePhotos.map((photo, index) => (
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
