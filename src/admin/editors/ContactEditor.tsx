import { useState, useEffect, type FormEvent } from 'react';
import { api } from '../../lib/api';
import ImageUploader from '../components/ImageUploader';
import SaveButton from '../components/SaveButton';

export default function ContactEditor() {
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    api.get('/contact').then(setData).catch(console.error);
  }, []);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    try {
      await api.put('/contact', data);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Section Contact</h1>
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

        {/* Contact Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Informations de contact</h3>
          {(data.contactItems || []).map((item: any, i: number) => (
            <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
              <button
                type="button"
                onClick={() => setData({ ...data, contactItems: data.contactItems.filter((_: any, idx: number) => idx !== i) })}
                className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
              >
                Supprimer
              </button>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chemin de l'icone (SVG path)</label>
                <input
                  type="text"
                  value={item.iconPath || ''}
                  onChange={e => {
                    const contactItems = [...data.contactItems];
                    contactItems[i] = { ...contactItems[i], iconPath: e.target.value };
                    setData({ ...data, contactItems });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Libelle</label>
                <input
                  type="text"
                  value={item.label || ''}
                  onChange={e => {
                    const contactItems = [...data.contactItems];
                    contactItems[i] = { ...contactItems[i], label: e.target.value };
                    setData({ ...data, contactItems });
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
                <input
                  type="text"
                  value={item.value || ''}
                  onChange={e => {
                    const contactItems = [...data.contactItems];
                    contactItems[i] = { ...contactItems[i], value: e.target.value };
                    setData({ ...data, contactItems });
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
                contactItems: [...(data.contactItems || []), { iconPath: '', label: '', value: '' }],
              })
            }
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter un contact
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
                socialLinks: [...(data.socialLinks || []), { name: '', url: '' }],
              })
            }
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            + Ajouter un reseau social
          </button>
        </div>

        {/* Form Config */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Configuration du formulaire</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte du bouton d'envoi</label>
            <input
              type="text"
              value={data.formConfig?.submitButtonText || ''}
              onChange={e =>
                setData({ ...data, formConfig: { ...data.formConfig, submitButtonText: e.target.value } })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Texte de reponse</label>
            <input
              type="text"
              value={data.formConfig?.responseText || ''}
              onChange={e =>
                setData({ ...data, formConfig: { ...data.formConfig, responseText: e.target.value } })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Event Types */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Types d'evenements</h4>
            {(data.formConfig?.eventTypes || []).map((evt: any, i: number) => (
              <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    const eventTypes = data.formConfig.eventTypes.filter((_: any, idx: number) => idx !== i);
                    setData({ ...data, formConfig: { ...data.formConfig, eventTypes } });
                  }}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 text-sm"
                >
                  Supprimer
                </button>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Valeur</label>
                  <input
                    type="text"
                    value={evt.value || ''}
                    onChange={e => {
                      const eventTypes = [...data.formConfig.eventTypes];
                      eventTypes[i] = { ...eventTypes[i], value: e.target.value };
                      setData({ ...data, formConfig: { ...data.formConfig, eventTypes } });
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Libelle</label>
                  <input
                    type="text"
                    value={evt.label || ''}
                    onChange={e => {
                      const eventTypes = [...data.formConfig.eventTypes];
                      eventTypes[i] = { ...eventTypes[i], label: e.target.value };
                      setData({ ...data, formConfig: { ...data.formConfig, eventTypes } });
                    }}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                const eventTypes = [...(data.formConfig?.eventTypes || []), { value: '', label: '' }];
                setData({ ...data, formConfig: { ...data.formConfig, eventTypes } });
              }}
              className="text-sm text-amber-600 hover:text-amber-700 font-medium"
            >
              + Ajouter un type d'evenement
            </button>
          </div>
        </div>

        <SaveButton saving={saving} saved={saved} />
      </form>
    </div>
  );
}
