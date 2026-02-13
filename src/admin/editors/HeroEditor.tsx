import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../../lib/api';
import ImageUploader from '../components/ImageUploader';
import SaveButton from '../components/SaveButton';

export default function HeroEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/hero').then(setData).catch(console.error);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/hero', data);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Section Hero</h1>
      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Badge */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Badge</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte du badge</label>
            <input
              type="text"
              value={data.badgeText || ''}
              onChange={e => setData({ ...data, badgeText: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Heading */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Titre principal</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ligne 1</label>
            <input
              type="text"
              value={data.heading?.line1 || ''}
              onChange={e => setData({ ...data, heading: { ...data.heading, line1: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ligne 2 - Préfixe</label>
            <input
              type="text"
              value={data.heading?.line2prefix || ''}
              onChange={e => setData({ ...data, heading: { ...data.heading, line2prefix: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ligne 2 - Texte en surbrillance</label>
            <input
              type="text"
              value={data.heading?.line2highlight || ''}
              onChange={e => setData({ ...data, heading: { ...data.heading, line2highlight: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ligne 3</label>
            <input
              type="text"
              value={data.heading?.line3 || ''}
              onChange={e => setData({ ...data, heading: { ...data.heading, line3: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Subtitle */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Sous-titre</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
            <textarea
              rows={3}
              value={data.subtitle || ''}
              onChange={e => setData({ ...data, subtitle: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* CTAs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Boutons d'action</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Primaire - Texte</label>
            <input
              type="text"
              value={data.ctaPrimary?.text || ''}
              onChange={e => setData({ ...data, ctaPrimary: { ...data.ctaPrimary, text: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Primaire - Lien</label>
            <input
              type="text"
              value={data.ctaPrimary?.href || ''}
              onChange={e => setData({ ...data, ctaPrimary: { ...data.ctaPrimary, href: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Secondaire - Texte</label>
            <input
              type="text"
              value={data.ctaSecondary?.text || ''}
              onChange={e => setData({ ...data, ctaSecondary: { ...data.ctaSecondary, text: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Secondaire - Lien</label>
            <input
              type="text"
              value={data.ctaSecondary?.href || ''}
              onChange={e => setData({ ...data, ctaSecondary: { ...data.ctaSecondary, href: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Scroll Text & Background */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Divers</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte de défilement</label>
            <input
              type="text"
              value={data.scrollText || ''}
              onChange={e => setData({ ...data, scrollText: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <ImageUploader
            label="Image de fond"
            value={data.backgroundImage}
            onChange={v => setData({ ...data, backgroundImage: v })}
          />
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Statistiques</h3>
          {(data.stats || []).map((stat: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, stats: data.stats.filter((_: any, idx: number) => idx !== i) })}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
                <input
                  type="text"
                  value={stat.value || ''}
                  onChange={e => {
                    const stats = [...data.stats];
                    stats[i] = { ...stats[i], value: e.target.value };
                    setData({ ...data, stats });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Libellé</label>
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={e => {
                    const stats = [...data.stats];
                    stats[i] = { ...stats[i], label: e.target.value };
                    setData({ ...data, stats });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, stats: [...(data.stats || []), { value: '', label: '' }] })}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter une statistique
          </button>
        </div>

        <SaveButton saving={saving} saved={saved} />
      </form>
    </div>
  );
}
