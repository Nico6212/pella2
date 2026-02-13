import { motion, useInView } from 'motion/react';
import { useRef, useState, type FormEvent } from 'react';
import { useSectionData } from '../hooks/useSectionData';
import type { ContactContent } from '../types/content';

const fallbackData: ContactContent = {
  label: 'Contactez-nous',
  title: 'Créons ensemble quelque chose de magnifique',
  description: "Prêt à donner vie à votre vision ? Nous serions ravis d'en savoir plus sur votre prochain événement et d'explorer comment le rendre inoubliable.",
  contactItems: [
    { iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: 'bonjour@pella.events' },
    { iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Téléphone', value: '+33 1 23 45 67 89' },
    { iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Adresse', value: 'Paris, France' },
  ],
  socialLinks: [
    { name: 'Instagram', url: '#' },
    { name: 'Pinterest', url: '#' },
    { name: 'LinkedIn', url: '#' },
  ],
  formConfig: {
    eventTypes: [
      { value: 'wedding', label: 'Mariage' },
      { value: 'corporate', label: 'Événement corporate' },
      { value: 'private', label: 'Célébration privée' },
      { value: 'luxury', label: 'Expérience luxe' },
    ],
    submitButtonText: 'Envoyer ma demande',
    responseText: 'Nous vous répondrons sous 24 heures pour discuter de votre événement',
  },
};

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    eventType: '',
    date: '',
    message: '',
  });
  const { data } = useSectionData<ContactContent>('contact', fallbackData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
  };

  return (
    <section id="contact" className="py-section-mobile lg:py-section px-6 bg-charcoal" ref={ref}>
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column - Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">{data.label}</span>

            <h2 className="mt-4 font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-cream">
              {data.title}
            </h2>

            <p className="mt-6 text-lg text-cream/70 leading-relaxed">
              {data.description}
            </p>

            {/* Contact Info */}
            <div className="mt-12 space-y-6">
              {data.contactItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-full bg-cream/10 flex items-center justify-center">
                    <svg className="h-5 w-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-cream/50">{item.label}</div>
                    <div className="text-cream font-medium">{item.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-12"
            >
              <div className="text-sm text-cream/50 mb-4">Suivez-nous</div>
              <div className="flex gap-4">
                {data.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className="h-10 w-10 rounded-full border border-cream/20 flex items-center justify-center text-cream/70 transition-all hover:bg-cream/10 hover:text-cream hover:border-cream/40"
                  >
                    <span className="sr-only">{social.name}</span>
                    <span className="text-xs font-medium">{social.name[0]}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-cream/70 mb-2">Votre nom</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl bg-cream/5 border border-cream/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="Jean Dupont"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-cream/70 mb-2">Adresse email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl bg-cream/5 border border-cream/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all"
                    placeholder="jean@exemple.com"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-cream/70 mb-2">Type d'événement</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full rounded-xl bg-cream/5 border border-cream/10 px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="" className="bg-charcoal">Sélectionner un type</option>
                    {data.formConfig.eventTypes.map((eventType) => (
                      <option key={eventType.value} value={eventType.value} className="bg-charcoal">
                        {eventType.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-cream/70 mb-2">Date souhaitée</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl bg-cream/5 border border-cream/10 px-4 py-3 text-cream focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-cream/70 mb-2">Parlez-nous de votre vision</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full rounded-xl bg-cream/5 border border-cream/10 px-4 py-3 text-cream placeholder:text-cream/30 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all resize-none"
                  placeholder="Décrivez votre événement idéal, le nombre d'invités, vos préférences de lieu et toute exigence particulière..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-gold px-8 py-4 font-medium text-charcoal transition-all hover:bg-gold-light hover:shadow-xl hover:shadow-gold/20"
              >
                {data.formConfig.submitButtonText}
              </button>

              <p className="text-center text-sm text-cream/40">
                {data.formConfig.responseText}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
