import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { FavoriteButton } from './FavoriteButton';
import { useI18n } from '../i18n';
import type { Pictogram } from '../types';

interface PictogramCardProps {
  pictogram: Pictogram;
  showFavorite?: boolean;
  size?: 'md' | 'lg';
  onClick?: (p: Pictogram) => void;
}

export function PictogramCard({ pictogram, showFavorite = true, size = 'md', onClick }: PictogramCardProps) {
  const { addToSentence, recordings, settings } = useApp();
  const { speak } = useSpeech({ lang: settings.language, rate: settings.speechRate });
  const { tPicto } = useI18n();
  const tp = tPicto(pictogram);

  const handleClick = () => {
    // Reproducir audio grabado o sintetizar voz
    const recorded = recordings[pictogram.id];
    if (recorded) {
      const audio = new Audio(recorded);
      audio.play().catch(() => {});
    } else {
      speak(tp.phrase || tp.label);
    }
    addToSentence(pictogram);
    onClick?.(pictogram);
  };

  const padding = size === 'lg' ? 'p-6' : 'p-4';
  const emojiSize = size === 'lg' ? 'text-7xl sm:text-8xl' : 'text-5xl sm:text-6xl';
  const labelSize = size === 'lg' ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg';

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleClick}
        className={`relative w-full rounded-lg shadow-soft border-2 border-soft-border ${padding} flex flex-col items-center justify-center gap-2 text-soft-text font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] min-h-[140px]`}
        style={{ backgroundColor: pictogram.color }}
        aria-label={tp.phrase || tp.label}
      >
        {pictogram.image ? (
          <img
            src={pictogram.image}
            alt=""
            aria-hidden
            className={`${size === 'lg' ? 'h-24 w-24' : 'h-16 w-16'} object-contain rounded-md`}
          />
        ) : (
          <span aria-hidden className={emojiSize}>{pictogram.emoji}</span>
        )}
        <span className={`${labelSize} text-center leading-tight`}>{tp.label}</span>
      </button>
      {showFavorite && <FavoriteButton id={pictogram.id} />}
    </div>
  );
}

export default PictogramCard;
