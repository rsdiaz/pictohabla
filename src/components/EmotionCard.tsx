import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { useI18n } from '../i18n';
import type { Pictogram } from '../types';

interface EmotionCardProps {
  pictogram: Pictogram;
}

export function EmotionCard({ pictogram }: EmotionCardProps) {
  const { settings, addToSentence } = useApp();
  const { speak } = useSpeech({ lang: settings.language, rate: settings.speechRate });
  const { tPicto } = useI18n();
  const tp = tPicto(pictogram);

  return (
    <button
      type="button"
      onClick={() => { speak(tp.phrase || tp.label); addToSentence(pictogram); }}
      className="rounded-lg shadow-soft border-2 border-soft-border p-6 flex flex-col items-center gap-3 text-soft-text font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] min-h-[180px]"
      style={{ backgroundColor: pictogram.color }}
      aria-label={tp.phrase || tp.label}
    >
      <span aria-hidden className="text-7xl sm:text-8xl">{pictogram.emoji}</span>
      <span className="text-xl sm:text-2xl">{tp.label}</span>
    </button>
  );
}

export default EmotionCard;
