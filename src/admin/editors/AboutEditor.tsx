import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../../lib/api';
import ImageUploader from '../components/ImageUploader';
import SaveButton from '../components/SaveButton';

export default function AboutEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/about').then(setData).catch(console.error);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/about', data);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Section A propos</h1>
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
        </div>

        {/* Paragraphs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Contenu</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphe 1</label>
            <textarea
              rows={3}
              value={data.paragraph1 || ''}
              onChange={e => setData({ ...data, paragraph1: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Paragraphe 2</label>
            <textarea
              rows={3}
              value={data.paragraph2 || ''}
              onChange={e => setData({ ...data, paragraph2: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Image</h3>
          <ImageUploader
            label="Image principale"
            value={data.image}
            onChange={v => setData({ ...data, image: v })}
          />
        </div>

        {/* Floating Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Carte flottante</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
            <input
              type="text"
              value={data.floatingCard?.value || ''}
              onChange={e => setData({ ...data, floatingCard: { ...data.floatingCard, value: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Libelle</label>
            <input
              type="text"
              value={data.floatingCard?.label || ''}
              onChange={e => setData({ ...data, floatingCard: { ...data.floatingCard, label: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Caracteristiques</h3>
          {(data.features || []).map((feat: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, features: data.features.filter((_: any, idx: number) => idx !== i) })}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icone</label>
                <input
                  type="text"
                  value={feat.icon || ''}
                  onChange={e => {
                    const features = [...data.features];
                    features[i] = { ...features[i], icon: e.target.value };
                    setData({ ...data, features });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={feat.title || ''}
                  onChange={e => {
                    const features = [...data.features];
                    features[i] = { ...features[i], title: e.target.value };
                    setData({ ...data, features });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={feat.description || ''}
                  onChange={e => {
                    const features = [...data.features];
                    features[i] = { ...features[i], description: e.target.value };
                    setData({ ...data, features });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setData({ ...data, features: [...(data.features || []), { icon: '', title: '', description: '' }] })}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter une caracteristique
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
