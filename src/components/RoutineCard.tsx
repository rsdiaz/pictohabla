import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { RewardModal } from './RewardModal';
import { useI18n } from '../i18n';
import type { Routine } from '../types';

interface RoutineCardProps {
  routine: Routine;
}

export function RoutineCard({ routine }: RoutineCardProps) {
  const { routineProgress, setRoutineProgress, settings } = useApp();
  const { speak } = useSpeech({ lang: settings.language, rate: settings.speechRate });
  const { t, tRoutine, tRoutineStep } = useI18n();
  const trTitle = tRoutine(routine);
  const [reward, setReward] = useState(false);

  const progress = routineProgress[routine.id] || {};
  const completed = useMemo(() => routine.steps.filter((s) => progress[s.id]).length, [routine, progress]);
  const total = routine.steps.length;
  const pct = Math.round((completed / total) * 100);

  const toggleStep = (stepId: string, label: string) => {
    setRoutineProgress((prev) => {
      const cur = { ...(prev[routine.id] || {}) };
      cur[stepId] = !cur[stepId];
      const updated = { ...prev, [routine.id]: cur };
      const done = routine.steps.every((s) => cur[s.id]);
      if (done) setReward(true);
      return updated;
    });
    speak(label);
  };

  const reset = () => setRoutineProgress((prev) => ({ ...prev, [routine.id]: {} }));

  return (
    <article
      className="card-soft p-5 flex flex-col gap-3"
      style={{ borderTop: `8px solid ${routine.color}` }}
      aria-label={t('routines.aria', { title: trTitle })}
    >
      <header className="flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2"><span aria-hidden className="text-3xl">{routine.emoji}</span>{trTitle}</h3>
        <button type="button" className="btn btn-secondary !min-h-0 !py-2 !px-3 text-sm" onClick={reset} aria-label={t('routines.resetAria', { title: trTitle })}>
          ↺ {t('routines.reset')}
        </button>
      </header>

      <div className="w-full h-3 rounded-full bg-soft-surface2 overflow-hidden" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={t('routines.progressAria', { pct })}>
        <div className="h-full bg-pastel-success transition-all duration-300" style={{ width: `${pct}%` }} />
      </div>
      <p className="text-sm text-soft-textSoft">{t('routines.progress', { done: completed, total })}</p>

      <ul className="flex flex-col gap-2">
        {routine.steps.map((step) => {
          const done = !!progress[step.id];
          const stepLabel = tRoutineStep(routine.id, step);
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => toggleStep(step.id, stepLabel)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md border-2 text-left text-soft-text font-semibold transition-colors ${
                  done
                    ? 'bg-pastel-success border-pastel-success line-through opacity-80'
                    : 'bg-soft-surface border-soft-border hover:border-brand'
                }`}
                aria-pressed={done}
              >
                <span aria-hidden className="text-2xl">{step.emoji}</span>
                <span className="flex-1">{stepLabel}</span>
                <span aria-hidden>{done ? '✅' : '⬜'}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <RewardModal open={reward} onClose={() => setReward(false)} message={t('routines.completed')} />
    </article>
  );
}

export default RoutineCard;
