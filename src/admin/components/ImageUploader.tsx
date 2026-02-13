import { useState, useRef } from 'react';
import { api } from '../../lib/api';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await api.upload(file);
      onChange(res.url);
    } catch {
      alert('Erreur lors du téléchargement');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex items-start gap-4">
        {value && (
          <img
            src={value}
            alt="Aperçu"
            className="w-24 h-24 object-cover rounded-lg border border-gray-200"
          />
        )}
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            placeholder="URL de l'image"
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-sm text-amber-600 hover:text-amber-700 font-medium disabled:opacity-50"
          >
            {uploading ? 'Téléchargement...' : 'Télécharger une image'}
          </button>
        </div>
      </div>
    </div>
  );
}
