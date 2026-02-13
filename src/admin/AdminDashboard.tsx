import { Link } from 'react-router-dom';

const sections = [
  { name: 'Hero', description: 'Titre principal, sous-titre, statistiques, image de fond', path: '/admin/hero' },
  { name: 'À propos', description: 'Textes, image, carte flottante, fonctionnalités', path: '/admin/about' },
  { name: 'Services', description: '4 services avec images, descriptions et tags', path: '/admin/services' },
  { name: 'Portfolio', description: 'Projets, catégories et images de la galerie', path: '/admin/portfolio' },
  { name: 'Contact', description: 'Infos de contact, réseaux sociaux, formulaire', path: '/admin/contact' },
  { name: 'Footer', description: 'Liens, newsletter, réseaux sociaux', path: '/admin/footer' },
  { name: 'Navbar', description: 'Logo, liens de navigation, bouton CTA', path: '/admin/navbar' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
      <p className="mt-2 text-gray-500">Sélectionnez une section à modifier.</p>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Link
            key={section.path}
            to={section.path}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-amber-500 hover:shadow-md transition-all group"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
              {section.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{section.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
