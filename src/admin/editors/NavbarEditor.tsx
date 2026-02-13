import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../../lib/api';
import ImageUploader from '../components/ImageUploader';
import SaveButton from '../components/SaveButton';

export default function NavbarEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/navbar').then(setData).catch(console.error);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/navbar', data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur');
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="text-gray-500">Chargement...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Barre de navigation</h1>
      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Logo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Logo</h3>
          <ImageUploader
            label="Image du logo"
            value={data.logoImage}
            onChange={v => setData({ ...data, logoImage: v })}
          />
        </div>

        {/* Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Liens de navigation</h3>
          {(data.links || []).map((link: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, links: data.links.filter((_: any, idx: number) => idx !== i) })}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input
                  type="text"
                  value={link.name || ''}
                  onChange={e => {
                    const links = [...data.links];
                    links[i] = { ...links[i], name: e.target.value };
                    setData({ ...data, links });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien (href)</label>
                <input
                  type="text"
                  value={link.href || ''}
                  onChange={e => {
                    const links = [...data.links];
                    links[i] = { ...links[i], href: e.target.value };
                    setData({ ...data, links });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, links: [...(data.links || []), { name: '', href: '' }] })}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter un lien
          </button>
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Bouton d'action</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte du CTA</label>
            <input
              type="text"
              value={data.ctaText || ''}
              onChange={e => setData({ ...data, ctaText: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lien du CTA</label>
            <input
              type="text"
              value={data.ctaHref || ''}
              onChange={e => setData({ ...data, ctaHref: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        <SaveButton saving={saving} saved={saved} />
      </form>
    </div>
  );
}
