import { NavLink } from 'react-router-dom';
import { removeToken } from '../../lib/api';
import { useNavigate } from 'react-router-dom';

const sections = [
  { name: 'Accueil', path: '/admin', icon: '◻' },
  { name: 'Hero', path: '/admin/hero', icon: '★' },
  { name: 'À propos', path: '/admin/about', icon: '◆' },
  { name: 'Services', path: '/admin/services', icon: '●' },
  { name: 'Portfolio', path: '/admin/portfolio', icon: '▲' },
  { name: 'Contact', path: '/admin/contact', icon: '✦' },
  { name: 'Footer', path: '/admin/footer', icon: '▬' },
  { name: 'Navbar', path: '/admin/navbar', icon: '☰' },
];

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-lg font-bold">Pela Admin</h2>
        <a href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
          ← Voir le site
        </a>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {sections.map((section) => (
          <NavLink
            key={section.path}
            to={section.path}
            end={section.path === '/admin'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <span>{section.icon}</span>
            <span>{section.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
