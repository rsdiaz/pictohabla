import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { useI18n } from '../i18n';

export function SentenceBar() {
  const { sentence, clearSentence, popSentence, settings } = useApp();
  const { speak, speaking, cancel } = useSpeech({ lang: settings.language, rate: settings.speechRate });
  const { t, tPicto } = useI18n();

  const translated = sentence.map((p) => ({ ...p, ...tPicto(p) }));
  const text = translated.map((p) => p.label).join(' ');

  const handleSpeak = () => {
    if (!text) return;
    if (speaking) cancel();
    else speak(text);
  };

  return (
    <section
      aria-label={t('sentence.aria')}
      className="sticky top-[68px] z-20 bg-soft-surface/95 backdrop-blur border border-soft-border rounded-lg shadow-soft p-3 sm:p-4 mb-4 dark:bg-dark-surface/95 dark:border-dark-border"
    >
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex-1 min-h-[64px] flex items-center gap-2 flex-wrap p-2 rounded-md bg-soft-bg dark:bg-dark-bg" aria-live="polite">
          {sentence.length === 0 ? (
            <span className="text-soft-textSoft italic">{t('sentence.placeholder')}</span>
          ) : (
            translated.map((p, i) => (
              <span
                key={`${p.id}-${i}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-md font-semibold text-soft-text shadow-soft"
                style={{ backgroundColor: p.color }}
              >
                <span aria-hidden>{p.emoji}</span>
                <span>{p.label}</span>
              </span>
            ))
          )}
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleSpeak}
            disabled={sentence.length === 0}
            aria-label={speaking ? t('sentence.stopAria') : t('sentence.playAria')}
          >
            <span aria-hidden>{speaking ? '⏹️' : '🔊'}</span>
            {speaking ? t('sentence.stop') : t('sentence.play')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={popSentence}
            disabled={sentence.length === 0}
            aria-label={t('sentence.lastAria')}
          >
            <span aria-hidden>↩️</span>
            {t('sentence.last')}
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={clearSentence}
            disabled={sentence.length === 0}
            aria-label={t('sentence.clearAria')}
          >
            <span aria-hidden>🗑️</span>
            {t('sentence.clear')}
          </button>
        </div>
      </div>
    </section>
  );
}

export default SentenceBar;
