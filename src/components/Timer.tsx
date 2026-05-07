import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSpeech } from '../hooks/useSpeech';
import { RewardModal } from './RewardModal';
import { useI18n } from '../i18n';

const PRESETS_MIN = [5, 10, 15];

const R = 90;
const C = 2 * Math.PI * R;

export function Timer() {
  const { settings } = useApp();
  const { speak } = useSpeech({ lang: settings.language, rate: settings.speechRate });
  const { t } = useI18n();
  const [total, setTotal] = useState(PRESETS_MIN[0] * 60);
  const [remaining, setRemaining] = useState(PRESETS_MIN[0] * 60);
  const [running, setRunning] = useState(false);
  const [reward, setReward] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); }, []);

  useEffect(() => {
    if (!running) return;
    timerRef.current = window.setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          setRunning(false);
          setReward(true);
          speak(t('timer.finishedSpeech'));
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [running, speak, t]);

  const setPreset = (s: number) => { setTotal(s); setRemaining(s); setRunning(false); };
  const start = () => { if (remaining === 0) setRemaining(total); setRunning(true); };
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); setRemaining(total); };

  const minutes = String(Math.floor(remaining / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');
  const progress = total > 0 ? remaining / total : 0;
  const dashOffset = C * (1 - progress);

  return (
    <div className="card-soft p-5 flex flex-col items-center gap-4" aria-label={t('timer.aria')}>
      <div className="flex flex-wrap gap-2 justify-center">
        {PRESETS_MIN.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setPreset(m * 60)}
            className={`btn ${total === m * 60 ? '' : 'btn-secondary'}`}
            aria-pressed={total === m * 60}
          >
            {t('timer.minLabel', { n: m })}
          </button>
        ))}
      </div>

      <div className="relative w-[220px] h-[220px]">
        <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
          <circle cx="100" cy="100" r={R} fill="none" stroke="#E6E1EA" strokeWidth="14" />
          <circle
            cx="100" cy="100" r={R}
            fill="none"
            stroke="#A7D8FF"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={dashOffset}
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold tabular-nums" aria-live="polite">{minutes}:{seconds}</div>
          <div className="text-soft-textSoft">{running ? t('timer.running') : remaining === 0 ? t('timer.done') : t('timer.paused')}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {!running ? (
          <button type="button" className="btn btn-success" onClick={start}><span aria-hidden>▶️</span> {t('timer.start')}</button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={pause}><span aria-hidden>⏸️</span> {t('timer.pause')}</button>
        )}
        <button type="button" className="btn btn-secondary" onClick={reset}><span aria-hidden>↺</span> {t('timer.reset')}</button>
      </div>

      <RewardModal open={reward} onClose={() => setReward(false)} message={t('timer.finishedReward')} />
    </div>
  );
}

export default Timer;
