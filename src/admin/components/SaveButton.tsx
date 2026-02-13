interface SaveButtonProps {
  saving: boolean;
  saved: boolean;
}

export default function SaveButton({ saving, saved }: SaveButtonProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="submit"
        disabled={saving}
        className="bg-gray-900 text-white rounded-lg px-6 py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Enregistrement...' : 'Enregistrer'}
      </button>
      {saved && (
        <span className="text-sm text-green-600 font-medium">Sauvegardé !</span>
      )}
    </div>
  );
}
