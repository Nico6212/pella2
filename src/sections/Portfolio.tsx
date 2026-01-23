import { motion, useInView } from 'motion/react';
import { useRef, useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Gala du Jardin Enchanté',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=800',
    size: 'large',
  },
  {
    id: 2,
    title: 'Mariage Coucher de Soleil',
    category: 'Mariage',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800',
    size: 'small',
  },
  {
    id: 3,
    title: 'Célébration Vintage',
    category: 'Privé',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800',
    size: 'small',
  },
  {
    id: 4,
    title: 'Sommet Tech 2024',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800',
    size: 'medium',
  },
  {
    id: 5,
    title: 'Romance sur les Toits',
    category: 'Mariage',
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?q=80&w=800',
    size: 'medium',
  },
  {
    id: 6,
    title: 'Lancement Marque de Luxe',
    category: 'Corporate',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800',
    size: 'large',
  },
];

const categories = ['Tous', 'Corporate', 'Mariage', 'Privé'];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'Tous'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-section-mobile lg:py-section px-6" ref={ref}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12"
        >
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-gold uppercase tracking-widest">Réalisations</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-charcoal">
              Nos derniers projets
            </h2>
            <p className="mt-4 text-lg text-taupe">
              Une sélection de nos événements et célébrations les plus mémorables.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-charcoal text-cream'
                    : 'bg-cream-dark text-taupe hover:bg-taupe/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer ${
                project.size === 'large' ? 'md:col-span-2 aspect-[2/1]' : 'aspect-[4/5]'
              }`}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
                animate={{
                  scale: hoveredId === project.id ? 1.05 : 1,
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"
                animate={{
                  opacity: hoveredId === project.id ? 1 : 0.6,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <motion.span
                  className="text-xs font-medium text-gold uppercase tracking-widest mb-2"
                  animate={{
                    y: hoveredId === project.id ? 0 : 10,
                    opacity: hoveredId === project.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {project.category}
                </motion.span>

                <motion.h3
                  className="font-display text-xl md:text-2xl font-semibold text-cream"
                  animate={{
                    y: hoveredId === project.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3, delay: 0.05 }}
                >
                  {project.title}
                </motion.h3>

                <motion.div
                  className="mt-4 flex items-center gap-2 text-cream/80"
                  animate={{
                    opacity: hoveredId === project.id ? 1 : 0,
                    y: hoveredId === project.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <span className="text-sm">Voir le projet</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 font-medium text-charcoal group"
          >
            <span>Voir toutes nos réalisations</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
