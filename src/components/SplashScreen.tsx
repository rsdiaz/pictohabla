import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';

interface SplashScreenProps {
  onFinish: () => void;
  /** Reproducir melodía de bienvenida */
  withSound?: boolean;
}

const FLOATERS = ['🗣️', '💗', '⭐', '🌟', '🎵', '🧸', '🎨', '😊', '📖', '🌈', '🐻', '🌞'];

/* ====================================================================
   Melodía de bienvenida (Do mayor pentatónica) – ~16 s, resuelve al I.
   Estructura: A (pregunta) – A' (respuesta) – B (puente) – A'' (cierre).
   ==================================================================== */
const N = {
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00, C6: 1046.5,
  G4: 392.00, A4: 440.00, B4: 493.88,
} as const;

const Q = 0.42; // negra
const E = Q / 2; // corchea
const H = Q * 2; // blanca
const W = Q * 4; // redonda

const MELODY: { freq: number; dur: number }[] = [
  // Frase A
  { freq: N.C5, dur: Q }, { freq: N.E5, dur: Q }, { freq: N.G5, dur: Q }, { freq: N.E5, dur: Q },
  { freq: N.D5, dur: Q }, { freq: N.G5, dur: E }, { freq: N.E5, dur: E }, { freq: N.C5, dur: H },
  // Frase A'
  { freq: N.D5, dur: Q }, { freq: N.E5, dur: Q }, { freq: N.G5, dur: Q }, { freq: N.A5, dur: Q },
  { freq: N.G5, dur: E }, { freq: N.E5, dur: E }, { freq: N.D5, dur: Q }, { freq: N.C5, dur: H },
  // Frase B – puente sube
  { freq: N.E5, dur: E }, { freq: N.G5, dur: E }, { freq: N.A5, dur: Q }, { freq: N.C6, dur: H },
  { freq: N.A5, dur: Q }, { freq: N.G5, dur: Q }, { freq: N.E5, dur: H },
  // Frase A'' – cierre con resolución larga
  { freq: N.D5, dur: Q }, { freq: N.E5, dur: Q }, { freq: N.G5, dur: Q }, { freq: N.E5, dur: Q },
  { freq: N.D5, dur: Q }, { freq: N.E5, dur: Q }, { freq: N.C5, dur: W },
];

/** Acordes suaves (pad) bajo la melodía, uno por compás. */
const PAD: { freqs: number[]; dur: number }[] = [
  { freqs: [N.G4, N.C5, N.E5], dur: Q * 4 }, // C
  { freqs: [N.A4, N.C5, N.E5], dur: Q * 4 }, // Am
  { freqs: [N.G4, N.B4, N.D5], dur: Q * 4 }, // G
  { freqs: [N.G4, N.C5, N.E5], dur: Q * 4 }, // C
  { freqs: [N.A4, N.C5, N.E5], dur: Q * 3 }, // Am (puente)
  { freqs: [N.G4, N.B4, N.D5], dur: Q * 4 }, // G
  { freqs: [N.G4, N.C5, N.E5], dur: Q * 4 }, // C – cierre
];

/** Reproduce una nota suave con envolvente ADSR rápida. */
function playNote(
  ctx: AudioContext,
  destination: AudioNode,
  freq: number,
  start: number,
  dur: number,
  gain: number,
  type: OscillatorType = 'sine'
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.04);
  g.gain.linearRampToValueAtTime(gain * 0.7, start + dur * 0.5);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

/** Acorde sostenido tipo pad con ataque y liberación largos. */
function playPad(ctx: AudioContext, destination: AudioNode, freqs: number[], start: number, dur: number, gain: number) {
  freqs.forEach((f) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = f;
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.25);
    g.gain.linearRampToValueAtTime(gain, start + dur - 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(g).connect(destination);
    osc.start(start);
    osc.stop(start + dur + 0.05);
  });
}

/** Pequeño brillo final tipo "sparkle" */
function playSparkle(ctx: AudioContext, destination: AudioNode, start: number) {
  [1318.5, 1567.98, 1975.53].forEach((f, i) => {
    playNote(ctx, destination, f, start + i * 0.06, 0.22, 0.04);
  });
}

export function SplashScreen({ onFinish, withSound = true }: SplashScreenProps) {
  const { t } = useI18n();
  const [leaving, setLeaving] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(withSound);
  const [audioBlocked, setAudioBlocked] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopRef = useRef<number | null>(null);
  const finishedRef = useRef(false);
  const startedRef = useRef(false);
  const soundEnabledRef = useRef(withSound);

  const stopAudio = () => {
    if (loopRef.current != null) {
      window.clearInterval(loopRef.current);
      loopRef.current = null;
    }
    const ctx = ctxRef.current;
    ctxRef.current = null;
    masterGainRef.current = null;
    startedRef.current = false;
    if (!ctx) return;
    try { ctx.close(); } catch { /* noop */ }
  };

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setLeaving(true);
    window.setTimeout(onFinish, 450);
    // Cerrar audio con un pequeño desvanecido
    window.setTimeout(() => stopAudio(), 300);
  };

  const startAudio = (forceRestart = false) => {
    if (!withSound || !soundEnabledRef.current) return;
    if (forceRestart) stopAudio();
    if (startedRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    startedRef.current = true; // marcamos cuanto antes para evitar dobles arranques
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AC();
      ctxRef.current = ctx;
      const master = ctx.createGain();
      master.gain.value = soundEnabledRef.current ? 1 : 0;
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const begin = () => {
        if (finishedRef.current || ctx.state === 'closed') return;
        setAudioBlocked(false);

        // "Ding" inmediato para confirmar que el audio funciona
        const t0 = ctx.currentTime + 0.02;
        playNote(ctx, master, N.G5, t0, 0.18, 0.18);
        playNote(ctx, master, N.C6, t0 + 0.12, 0.32, 0.18);

        const melodyDur = MELODY.reduce((acc, n) => acc + n.dur, 0);
        const padDur = PAD.reduce((acc, p) => acc + p.dur, 0);
        const loopDur = Math.max(melodyDur, padDur) + 0.9;
        let nextStart = ctx.currentTime + 0.7; // tras el ding

        const scheduleOnce = () => {
          if (finishedRef.current || ctx.state === 'closed') return;
          let t = nextStart;
          MELODY.forEach((n) => { playNote(ctx, master, n.freq, t, n.dur, 0.14); t += n.dur; });
          let p = nextStart;
          PAD.forEach((c) => { playPad(ctx, master, c.freqs, p, c.dur, 0.05); p += c.dur; });
          playSparkle(ctx, master, nextStart + melodyDur - 0.2);
          nextStart += loopDur;
        };

        scheduleOnce();
        loopRef.current = window.setInterval(scheduleOnce, loopDur * 1000);
      };

      // Resume() debe llamarse SIEMPRE dentro del gesto en muchos navegadores.
      const tryResume = ctx.state === 'suspended' ? ctx.resume() : Promise.resolve();
      tryResume.then(begin).catch(() => {
        startedRef.current = false;
        setAudioBlocked(true);
      });
    } catch {
      startedRef.current = false;
      setAudioBlocked(true);
    }
  };

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
    const ctx = ctxRef.current;
    const master = masterGainRef.current;
    if (ctx && master) {
      const target = soundEnabled ? 1 : 0;
      master.gain.setTargetAtTime(target, ctx.currentTime, 0.05);
    }
  }, [soundEnabled]);

  useEffect(() => {
    if (!withSound) {
      return;
    }
    // No intentamos arrancar en el montaje: los navegadores lo bloquean.
    // Mostramos el aviso y esperamos al primer gesto.
    setAudioBlocked(true);

    const onGesture = () => {
      if (!soundEnabledRef.current) return;
      startAudio();
    };
    window.addEventListener('pointerdown', onGesture);
    window.addEventListener('keydown', onGesture);
    window.addEventListener('touchstart', onGesture, { passive: true });

    const onKey = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') finish(); };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('keydown', onGesture);
      window.removeEventListener('touchstart', onGesture);
      stopAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      role="dialog"
      aria-label={t('splash.dialogAria')}
      aria-live="polite"
      className={[
        'fixed inset-0 z-[100] flex flex-col items-center justify-center text-center p-6 overflow-hidden',
        'bg-gradient-to-br from-pastel-blue via-pastel-pink to-pastel-purple',
        'transition-opacity duration-500',
        leaving ? 'opacity-0 pointer-events-none' : 'opacity-100',
      ].join(' ')}
    >
      {/* Pictogramas flotantes de fondo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        {FLOATERS.map((emoji, i) => {
          const left = (i * 83) % 100;
          const top = (i * 47) % 100;
          const delay = (i % 6) * 0.4;
          const dur = 4 + (i % 4);
          const size = 32 + ((i * 11) % 28);
          return (
            <span
              key={i}
              className="absolute select-none opacity-70 motion-safe:animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                fontSize: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${dur}s`,
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>

      {/* Controles flotantes de audio */}
      {withSound && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            type="button"
            onClick={() => {
              setSoundEnabled((prev) => {
                const next = !prev;
                soundEnabledRef.current = next;
                if (next && !startedRef.current) startAudio(true);
                return next;
              });
            }}
            aria-pressed={soundEnabled}
            aria-label={soundEnabled ? t('splash.soundOffAria') : t('splash.soundOnAria')}
            title={soundEnabled ? t('splash.soundOff') : t('splash.soundOn')}
            className="w-11 h-11 rounded-full bg-white/85 dark:bg-dark-surface/85 backdrop-blur shadow-lg border border-soft-border dark:border-dark-border flex items-center justify-center text-xl hover:scale-105 active:scale-95 transition-transform"
          >
            <span aria-hidden>{soundEnabled ? '🔊' : '🔇'}</span>
          </button>
        </div>
      )}

      {/* Logo principal */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div
          aria-hidden
          className={[
            'w-32 h-32 sm:w-40 sm:h-40 rounded-[2rem] bg-white/80 backdrop-blur shadow-card',
            'flex items-center justify-center text-7xl sm:text-8xl',
            'motion-safe:animate-bounce-soft',
          ].join(' ')}
        >
          🗣️
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-soft-text drop-shadow-sm motion-safe:animate-fade-up">
          {t('app.title')}
        </h1>
        <p className="text-lg sm:text-xl text-soft-textSoft motion-safe:animate-fade-up" style={{ animationDelay: '0.2s' }}>
          {t('app.subtitle')}
        </p>

        {/* Indicador de carga: puntos */}
        {/* <div className="flex items-center gap-2 mt-4" aria-label="Cargando">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full bg-brand motion-safe:animate-loading-dot"
              style={{ animationDelay: `${i * 0.18}s` }}
            />
          ))}
        </div> */}

        <button
          type="button"
          onClick={finish}
          className="btn btn-success mt-6 motion-safe:animate-fade-up text-xl !min-h-[64px] !px-8"
          style={{ animationDelay: '0.5s' }}
          aria-label={t('splash.startAria')}
          autoFocus
        >
          <span aria-hidden>👉</span> {t('splash.start')}
        </button>
        <p className="text-sm text-soft-textSoft mt-1">{t('splash.hint')}</p>
        {withSound && soundEnabled && audioBlocked && (
          <p className="text-xs text-soft-textSoft/80 mt-1" aria-live="polite">
            {t('splash.audioBlocked')}
          </p>
        )}
      </div>
    </div>
  );
}

export default SplashScreen;
