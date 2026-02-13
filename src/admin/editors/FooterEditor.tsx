import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../../lib/api';
import ImageUploader from '../components/ImageUploader';
import SaveButton from '../components/SaveButton';

export default function FooterEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/footer').then(setData).catch(console.error);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/footer', data);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Section Footer</h1>
      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Tagline */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Slogan</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
            <textarea
              rows={3}
              value={data.tagline || ''}
              onChange={e => setData({ ...data, tagline: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Newsletter</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
            <input
              type="text"
              value={data.newsletter?.title || ''}
              onChange={e => setData({ ...data, newsletter: { ...data.newsletter, title: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
            <input
              type="text"
              value={data.newsletter?.placeholder || ''}
              onChange={e => setData({ ...data, newsletter: { ...data.newsletter, placeholder: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte du bouton</label>
            <input
              type="text"
              value={data.newsletter?.buttonText || ''}
              onChange={e => setData({ ...data, newsletter: { ...data.newsletter, buttonText: e.target.value } })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Link Columns */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Colonnes de liens</h3>
          {(data.linkColumns || []).map((col: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, linkColumns: data.linkColumns.filter((_: any, idx: number) => idx !== i) })}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre de la colonne</label>
                <input
                  type="text"
                  value={col.title || ''}
                  onChange={e => {
                    const linkColumns = [...data.linkColumns];
                    linkColumns[i] = { ...linkColumns[i], title: e.target.value };
                    setData({ ...data, linkColumns });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Links within column */}
              <div className="space-y-2 pl-4 border-l-2 border-gray-200">
                <h4 className="text-sm font-medium text-gray-600">Liens</h4>
                {(col.links || []).map((link: any, j: number) => (
                  <div key={j} className="bg-white rounded-lg p-3 space-y-2 relative">
                    <button
                      type="button"
                      onClick={() => {
                        const linkColumns = [...data.linkColumns];
                        linkColumns[i] = {
                          ...linkColumns[i],
                          links: linkColumns[i].links.filter((_: any, idx: number) => idx !== j),
                        };
                        setData({ ...data, linkColumns });
                      }}
                      className="absolute top-1 right-1 text-red-400 hover:text-red-600 text-sm"
                    >
                      Supprimer
                    </button>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={link.name || ''}
                        onChange={e => {
                          const linkColumns = [...data.linkColumns];
                          const links = [...linkColumns[i].links];
                          links[j] = { ...links[j], name: e.target.value };
                          linkColumns[i] = { ...linkColumns[i], links };
                          setData({ ...data, linkColumns });
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
                          const linkColumns = [...data.linkColumns];
                          const links = [...linkColumns[i].links];
                          links[j] = { ...links[j], href: e.target.value };
                          linkColumns[i] = { ...linkColumns[i], links };
                          setData({ ...data, linkColumns });
                        }}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => {
                    const linkColumns = [...data.linkColumns];
                    linkColumns[i] = {
                      ...linkColumns[i],
                      links: [...(linkColumns[i].links || []), { name: '', href: '' }],
                    };
                    setData({ ...data, linkColumns });
                  }}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  + Ajouter un lien
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              setData({
                ...data,
                linkColumns: [...(data.linkColumns || []), { title: '', links: [] }],
              })
            }
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter une colonne
          </button>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Reseaux sociaux</h3>
          {(data.socialLinks || []).map((link: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, socialLinks: data.socialLinks.filter((_: any, idx: number) => idx !== i) })}
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
                    const socialLinks = [...data.socialLinks];
                    socialLinks[i] = { ...socialLinks[i], name: e.target.value };
                    setData({ ...data, socialLinks });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lettre (icone)</label>
                <input
                  type="text"
                  value={link.letter || ''}
                  onChange={e => {
                    const socialLinks = [...data.socialLinks];
                    socialLinks[i] = { ...socialLinks[i], letter: e.target.value };
                    setData({ ...data, socialLinks });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                <input
                  type="text"
                  value={link.url || ''}
                  onChange={e => {
                    const socialLinks = [...data.socialLinks];
                    socialLinks[i] = { ...socialLinks[i], url: e.target.value };
                    setData({ ...data, socialLinks });
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
                socialLinks: [...(data.socialLinks || []), { name: '', letter: '', url: '' }],
              })
            }
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter un reseau social
          </button>
        </div>

        <SaveButton saving={saving} saved={saved} />
      </form>
    </div>
  );
}
