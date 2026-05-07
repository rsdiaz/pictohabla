import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';

interface FavoriteButtonProps {
  id: number;
}

export function FavoriteButton({ id }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useApp();
  const { t } = useI18n();
  const fav = isFavorite(id);
  const label = fav ? t('favorites.remove') : t('favorites.add');
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(id);
      }}
      className="absolute top-2 right-2 w-10 h-10 rounded-full bg-soft-surface/80 backdrop-blur shadow-soft flex items-center justify-center text-xl hover:scale-110 transition-transform"
      aria-pressed={fav}
      aria-label={label}
      title={label}
    >
      <span aria-hidden>{fav ? '⭐' : '☆'}</span>
    </button>
  );
}

export default FavoriteButton;
