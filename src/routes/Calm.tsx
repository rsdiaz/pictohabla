import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { useI18n, type UIKey } from '../i18n';

interface CalmCard {
  id: string;
  emoji: string;
  labelKey: UIKey;
  phraseKey: UIKey;
  color: string;
}

const CARDS: CalmCard[] = [
  { id: 'rest',       emoji: '😴', labelKey: 'calm.rest.label',       phraseKey: 'calm.rest.phrase',       color: '#CDE7FF' },
  { id: 'noise',      emoji: '🔇', labelKey: 'calm.noise.label',      phraseKey: 'calm.noise.phrase',      color: '#E3D7FF' },
  { id: 'alone',      emoji: '🧍', labelKey: 'calm.alone.label',      phraseKey: 'calm.alone.phrase',      color: '#D4F1E0' },
  { id: 'hug',        emoji: '🤗', labelKey: 'calm.hug.label',        phraseKey: 'calm.hug.phrase',        color: '#FFD9E0' },
  { id: 'noTouch',    emoji: '🚫', labelKey: 'calm.noTouch.label',    phraseKey: 'calm.noTouch.phrase',    color: '#FFE2C2' },
  { id: 'water',      emoji: '💧', labelKey: 'calm.water.label',      phraseKey: 'calm.water.phrase',      color: '#CFF1F5' },
  { id: 'dim',        emoji: '🌙', labelKey: 'calm.dim.label',        phraseKey: 'calm.dim.phrase',        color: '#DCE0FF' },
  { id: 'help',       emoji: '🆘', labelKey: 'calm.help.label',       phraseKey: 'calm.help.phrase',       color: '#FFE7B0' },
];

export default function Calm() {
  const { settings } = useApp();
  const { t, locale } = useI18n();
  const { speak, cancel } = useSpeech({ lang: settings.language, rate: Math.min(settings.speechRate, 0.9) });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [breathPhase, setBreathPhase] = useState<'in' | 'out'>('in');

  useEffect(() => () => cancel(), [cancel]);

  // Ciclo de respiración: 4s inhalar / 4s exhalar
  useEffect(() => {
    const id = setInterval(() => setBreathPhase((p) => (p === 'in' ? 'out' : 'in')), 4000);
    return () => clearInterval(id);
  }, []);

  const handleTap = (card: CalmCard) => {
    const phrase = t(card.phraseKey);
    setActiveId(card.id);
    speak(phrase);
    window.setTimeout(() => setActiveId((id) => (id === card.id ? null : id)), 1200);
  };

  return (
    <div
      className="flex flex-col gap-5 min-h-[80vh] -mx-4 px-4 py-4 rounded-3xl"
      style={{
        background: 'linear-gradient(180deg, #F4F8FF 0%, #FFF6F2 100%)',
      }}
      aria-label={t('calm.title')}
    >
      <header className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <h1 className="mb-0">🫧 {t('calm.title')}</h1>
          <p className="text-soft-textSoft m-0">{t('calm.intro')}</p>
        </div>
        <Link
          to="/"
          className="btn btn-secondary !min-h-0 !py-2 !px-4 text-sm"
          aria-label={t('calm.exitAria')}
        >
          ← {t('calm.exit')}
        </Link>
      </header>

      {/* Círculo de respiración */}
      <section
        className="flex flex-col items-center justify-center py-2"
        aria-label={t('calm.breathAria')}
      >
        <div
          className="relative flex items-center justify-center rounded-full transition-all ease-in-out"
          style={{
            width: 140,
            height: 140,
            transitionDuration: '4000ms',
            transform: `scale(${breathPhase === 'in' ? 1.15 : 0.85})`,
            background: 'radial-gradient(circle, #BFE0FF 0%, #E8D7FF 100%)',
            boxShadow: '0 0 40px rgba(167, 216, 255, 0.55)',
          }}
        >
          <span aria-hidden className="text-3xl select-none">
            {breathPhase === 'in' ? '🌬️' : '💨'}
          </span>
        </div>
        <p className="mt-3 text-soft-textSoft font-semibold" aria-live="polite">
          {breathPhase === 'in' ? t('calm.breathIn') : t('calm.breathOut')}
        </p>
      </section>

      <section
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        aria-label={t('calm.cardsAria')}
      >
        {CARDS.map((card) => {
          const isActive = activeId === card.id;
          const label = t(card.labelKey);
          const phrase = t(card.phraseKey);
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleTap(card)}
              lang={locale === 'en' ? 'en' : 'es'}
              aria-label={phrase}
              className={[
                'rounded-3xl border-2 border-soft-border p-5 sm:p-6 flex flex-col items-center gap-2 text-soft-text font-semibold',
                'min-h-[160px] sm:min-h-[180px] shadow-soft transition-transform duration-200',
                'hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-brand/60',
                isActive ? 'ring-4 ring-brand scale-[1.04]' : '',
              ].join(' ')}
              style={{ backgroundColor: card.color }}
            >
              <span aria-hidden className="text-6xl sm:text-7xl">{card.emoji}</span>
              <span className="text-base sm:text-lg text-center leading-tight">{label}</span>
            </button>
          );
        })}
      </section>

      <p className="text-center text-soft-textSoft text-sm">{t('calm.footer')}</p>
    </div>
  );
}
