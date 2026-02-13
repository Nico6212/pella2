import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../../lib/api';
import ImageUploader from '../components/ImageUploader';
import SaveButton from '../components/SaveButton';

export default function PortfolioEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/portfolio').then(setData).catch(console.error);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      // Convert comma-separated categories back to array
      const payload = {
        ...data,
        categories: typeof data.categories === 'string'
          ? data.categories.split(',').map((c: string) => c.trim()).filter(Boolean)
          : data.categories,
      };
      await api.put('/portfolio', payload);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Erreur');
    } finally {
      setSaving(false);
    }
  };

  if (!data) return <div className="text-gray-500">Chargement...</div>;

  const getCategories = (): string => {
    if (typeof data.categories === 'string') return data.categories;
    if (Array.isArray(data.categories)) return data.categories.join(', ');
    return '';
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Section Portfolio</h1>
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Categories (separees par des virgules)
            </label>
            <input
              type="text"
              value={getCategories()}
              onChange={e => setData({ ...data, categories: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Projets</h3>
          {(data.projects || []).map((project: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, projects: data.projects.filter((_: any, idx: number) => idx !== i) })}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={project.title || ''}
                  onChange={e => {
                    const projects = [...data.projects];
                    projects[i] = { ...projects[i], title: e.target.value };
                    setData({ ...data, projects });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categorie</label>
                <input
                  type="text"
                  value={project.category || ''}
                  onChange={e => {
                    const projects = [...data.projects];
                    projects[i] = { ...projects[i], category: e.target.value };
                    setData({ ...data, projects });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <ImageUploader
                label="Image du projet"
                value={project.image}
                onChange={v => {
                  const projects = [...data.projects];
                  projects[i] = { ...projects[i], image: v };
                  setData({ ...data, projects });
                }}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taille</label>
                <select
                  value={project.size || 'medium'}
                  onChange={e => {
                    const projects = [...data.projects];
                    projects[i] = { ...projects[i], size: e.target.value };
                    setData({ ...data, projects });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                projects: [...(data.projects || []), { title: '', category: '', image: '', size: 'medium' }],
              })
            }
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter un projet
          </button>
        </div>

        <SaveButton saving={saving} saved={saved} />
      </form>
    </div>
  );
}
