import { useEffect, useRef } from 'react';
import { useSpeech } from '../hooks/useSpeech';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';

interface RewardModalProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export function RewardModal({ open, onClose, message }: RewardModalProps) {
  const { settings } = useApp();
  const { speak } = useSpeech({ lang: settings.language, rate: settings.speechRate });
  const { t } = useI18n();
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const idx = Math.floor(Math.random() * 5) + 1;
    const keys = ['reward.msg.1', 'reward.msg.2', 'reward.msg.3', 'reward.msg.4', 'reward.msg.5'] as const;
    const text = message || t(keys[idx - 1]);
    speak(text);
    closeBtn.current?.focus();
    const tm = window.setTimeout(onClose, 3500);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(tm); window.removeEventListener('keydown', onKey); };
  }, [open, message, onClose, speak, t]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t('reward.aria')}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div className="bg-soft-surface dark:bg-dark-surface rounded-lg shadow-card border border-soft-border dark:border-dark-border p-8 max-w-md w-full text-center animate-bounce-once">
        <div className="text-7xl mb-3" aria-hidden>🌟</div>
        <h2 className="mb-2">{message || t('reward.default')}</h2>
        <p className="text-soft-textSoft mb-4">{t('reward.subtitle')}</p>
        <button ref={closeBtn} type="button" className="btn btn-success" onClick={onClose}>
          <span aria-hidden>👍</span> {t('reward.continue')}
        </button>
      </div>
    </div>
  );
}

export default RewardModal;
