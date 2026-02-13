import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../../lib/api';
import ImageUploader from '../components/ImageUploader';
import SaveButton from '../components/SaveButton';

export default function ServicesEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/services').then(setData).catch(console.error);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      // Convert comma-separated features strings back to arrays before saving
      const payload = {
        ...data,
        items: (data.items || []).map((item: any) => ({
          ...item,
          features: typeof item.features === 'string'
            ? item.features.split(',').map((f: string) => f.trim()).filter(Boolean)
            : item.features,
        })),
      };
      await api.put('/services', payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur');
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="text-gray-500">Chargement...</div>;

  // Ensure features are displayed as comma-separated strings for editing
  const getItemFeatures = (item: any): string => {
    if (typeof item.features === 'string') return item.features;
    if (Array.isArray(item.features)) return item.features.join(', ');
    return '';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Section Services</h1>
      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">En-tete</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
            <input
              type="text"
              value={data.label || ''}
              onChange={e => setData({ ...data, label: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              value={data.title || ''}
              onChange={e => setData({ ...data, title: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={data.description || ''}
              onChange={e => setData({ ...data, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
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

        {/* Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Services</h3>
          {(data.items || []).map((item: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, items: data.items.filter((_: any, idx: number) => idx !== i) })}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={e => {
                    const items = [...data.items];
                    items[i] = { ...items[i], title: e.target.value };
                    setData({ ...data, items });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={item.description || ''}
                  onChange={e => {
                    const items = [...data.items];
                    items[i] = { ...items[i], description: e.target.value };
                    setData({ ...data, items });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <ImageUploader
                label="Image du service"
                value={item.image}
                onChange={v => {
                  const items = [...data.items];
                  items[i] = { ...items[i], image: v };
                  setData({ ...data, items });
                }}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caracteristiques (separees par des virgules)
                </label>
                <input
                  type="text"
                  value={getItemFeatures(item)}
                  onChange={e => {
                    const items = [...data.items];
                    items[i] = { ...items[i], features: e.target.value };
                    setData({ ...data, items });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lien (optionnel)</label>
                <input
                  type="text"
                  value={item.linkTo || ''}
                  onChange={e => {
                    const items = [...data.items];
                    items[i] = { ...items[i], linkTo: e.target.value };
                    setData({ ...data, items });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                items: [...(data.items || []), { title: '', description: '', image: '', features: '', linkTo: '' }],
              })
            }
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter un service
          </button>
        </div>

        <SaveButton saving={saving} saved={saved} />
      </form>
    </div>
  );
}
