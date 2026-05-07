import { useEffect, useState } from 'react';
import { STORIES } from '../data/stories';
import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { RewardModal } from '../components/RewardModal';
import { useI18n } from '../i18n';
import type { Story } from '../types';

function StoryPlayer({ story, onExit }: { story: Story; onExit: () => void }) {
  const [idx, setIdx] = useState(0);
  const [reward, setReward] = useState(false);
  const { settings } = useApp();
  const { speak, cancel } = useSpeech({ lang: settings.language, rate: settings.speechRate });
  const { t, tStory, tStoryStep } = useI18n();
  const story_t = tStory(story);
  const step = story.steps[idx];
  const stepT = tStoryStep(story.id, step, idx);

  useEffect(() => {
    speak(`${stepT.title}. ${stepT.text}`);
    return cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const next = () => {
    if (idx + 1 >= story.steps.length) setReward(true);
    else setIdx(idx + 1);
  };
  const prev = () => setIdx(Math.max(0, idx - 1));

  return (
    <div className="card-soft p-6 flex flex-col gap-4" style={{ borderTop: `8px solid ${story.color}` }}>
      <header className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2"><span aria-hidden className="text-3xl">{story.cover}</span>{story_t}</h2>
        <button type="button" className="btn btn-secondary" onClick={onExit}>{t('stories.back')}</button>
      </header>

      <div className="flex flex-col items-center text-center gap-3 p-6 rounded-md" style={{ backgroundColor: story.color }}>
        <span aria-hidden className="text-8xl">{step.emoji}</span>
        <h3>{stepT.title}</h3>
        <p className="text-lg max-w-prose">{stepT.text}</p>
      </div>

      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button type="button" className="btn btn-secondary" onClick={prev} disabled={idx === 0}>{t('stories.prev')}</button>
        <span className="text-soft-textSoft" aria-live="polite">{t('stories.stepCounter', { i: idx + 1, n: story.steps.length })}</span>
        <button type="button" className="btn" onClick={next}>
          {idx + 1 === story.steps.length ? `🌟 ${t('stories.finish')}` : t('stories.next')}
        </button>
      </div>

      <RewardModal open={reward} onClose={() => { setReward(false); onExit(); }} message={t('stories.completed')} />
    </div>
  );
}

export default function Stories() {
  const [active, setActive] = useState<Story | null>(null);
  const { t, tStory } = useI18n();

  if (active) return <StoryPlayer story={active} onExit={() => setActive(null)} />;

  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5">
        <h1>{t('stories.title')}</h1>
        <p className="text-soft-textSoft">{t('stories.intro')}</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {STORIES.map((s) => {
          const title = tStory(s);
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(s)}
              className="rounded-lg shadow-soft border-2 border-soft-border p-5 flex flex-col items-center gap-2 text-soft-text font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97]"
              style={{ backgroundColor: s.color }}
              aria-label={t('stories.openAria', { title })}
            >
              <span aria-hidden className="text-6xl">{s.cover}</span>
              <span className="text-xl">{title}</span>
              <span className="text-sm text-soft-textSoft">{t('stories.steps', { n: s.steps.length })}</span>
            </button>
          );
        })}
      </section>
    </div>
  );
}
