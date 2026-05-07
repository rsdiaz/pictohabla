import { useCallback, useEffect, useRef, useState } from 'react';

interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

/**
 * Hook para usar la Web Speech API (síntesis de voz).
 */
export function useSpeech({ lang = 'es-ES', rate = 0.95, pitch = 1 }: SpeechOptions = {}) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setSupported(true);

    const pickVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      voiceRef.current =
        voices.find((v) => v.lang?.toLowerCase().startsWith(lang.toLowerCase())) ||
        voices.find((v) => v.lang?.toLowerCase().startsWith('es')) ||
        voices[0] ||
        null;
    };
    pickVoice();
    window.speechSynthesis.onvoiceschanged = pickVoice;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, [lang]);

  const speak = useCallback(
    (text: string) => {
      if (!text || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(String(text));
      utter.lang = lang;
      utter.rate = rate;
      utter.pitch = pitch;
      if (voiceRef.current) utter.voice = voiceRef.current;
      utter.onstart = () => setSpeaking(true);
      utter.onend = () => setSpeaking(false);
      utter.onerror = () => setSpeaking(false);
      window.speechSynthesis.speak(utter);
    },
    [lang, rate, pitch]
  );

  const cancel = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  }, []);

  return { speak, cancel, speaking, supported };
}
