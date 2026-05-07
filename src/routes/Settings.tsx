import { useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/pictograms';
import { useI18n } from '../i18n';
import type { Pictogram } from '../types';

const VOICE_LANGS = [
  { code: 'es-ES', key: 'voiceLang.esES' as const },
  { code: 'es-MX', key: 'voiceLang.esMX' as const },
  { code: 'en-US', key: 'voiceLang.enUS' as const },
  { code: 'en-GB', key: 'voiceLang.enGB' as const },
];

function CustomItem({ p }: { p: Pictogram }) {
  const { recordings, setRecordings, customPictograms, setCustomPictograms } = useApp();
  const { t } = useI18n();
  const [recording, setRecording] = useState(false);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      recRef.current = mr;
      chunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setRecordings((prev) => ({ ...prev, [p.id]: reader.result as string }));
          }
        };
        reader.readAsDataURL(blob);
        stream.getTracks().forEach((t) => t.stop());
      };
      mr.start();
      setRecording(true);
    } catch (err) {
      alert(t('settings.micError'));
      console.error(err);
    }
  };

  const stopRecording = () => {
    recRef.current?.stop();
    setRecording(false);
  };

  const playRecording = () => {
    const data = recordings[p.id];
    if (data) new Audio(data).play().catch(() => {});
  };

  const removeRecording = () =>
    setRecordings((prev) => { const c = { ...prev }; delete c[p.id]; return c; });

  const removePicto = () =>
    setCustomPictograms(customPictograms.filter((x) => x.id !== p.id));

  return (
    <li className="card-soft p-3 flex items-center gap-3">
      {p.image ? (
        <img src={p.image} alt="" aria-hidden className="w-14 h-14 rounded-md object-contain bg-soft-bg" />
      ) : (
        <span aria-hidden className="text-4xl">{p.emoji}</span>
      )}
      <div className="flex-1 min-w-0">
        <div className="font-semibold truncate">{p.label}</div>
        <div className="text-sm text-soft-textSoft truncate">{p.phrase}</div>
      </div>
      <div className="flex flex-wrap gap-2">
        {!recording ? (
          <button type="button" className="btn btn-secondary !min-h-0 !py-2 !px-3 text-sm" onClick={startRecording}>🎙️ {t('settings.record')}</button>
        ) : (
          <button type="button" className="btn btn-danger !min-h-0 !py-2 !px-3 text-sm" onClick={stopRecording}>⏹️ {t('settings.stop')}</button>
        )}
        {recordings[p.id] && (
          <>
            <button type="button" className="btn btn-secondary !min-h-0 !py-2 !px-3 text-sm" onClick={playRecording}>▶️</button>
            <button type="button" className="btn btn-secondary !min-h-0 !py-2 !px-3 text-sm" onClick={removeRecording}>🗑️ {t('settings.removeAudio')}</button>
          </>
        )}
        <button type="button" className="btn btn-danger !min-h-0 !py-2 !px-3 text-sm" onClick={removePicto}>{t('settings.remove')}</button>
      </div>
    </li>
  );
}

export default function Settings() {
  const { settings, updateSettings, customPictograms, setCustomPictograms } = useApp();
  const { t, tCategory } = useI18n();

  const [label, setLabel] = useState('');
  const [phrase, setPhrase] = useState('');
  const [emoji, setEmoji] = useState('🌟');
  const [category, setCategory] = useState(CATEGORIES[0].id);
  const [imageData, setImageData] = useState<string | undefined>(undefined);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const addCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) return;
    const cat = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
    const newP: Pictogram = {
      id: Date.now(),
      category,
      label: label.trim(),
      phrase: phrase.trim() || label.trim(),
      emoji: emoji || '🌟',
      color: cat.color,
      image: imageData,
    };
    setCustomPictograms([...customPictograms, newP]);
    setLabel(''); setPhrase(''); setEmoji('🌟'); setImageData(undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5">
        <h1>{t('settings.title')}</h1>
        <p className="text-soft-textSoft">{t('settings.intro')}</p>
      </header>

      <section className="card-soft p-5 flex flex-col gap-3">
        <h2>{t('settings.appearance')}</h2>
        <label className="flex items-center justify-between gap-3 flex-wrap">
          <span>{t('settings.darkMode')}</span>
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={settings.theme === 'dark'}
            onChange={(e) => updateSettings({ theme: e.target.checked ? 'dark' : 'light' })}
          />
        </label>
        <label className="flex items-center justify-between gap-3 flex-wrap">
          <span>{t('settings.distractionFree')}</span>
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={settings.distractionFree}
            onChange={(e) => updateSettings({ distractionFree: e.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between gap-3 flex-wrap">
          <span>{t('settings.softSounds')}</span>
          <input
            type="checkbox"
            className="w-6 h-6"
            checked={settings.softSounds}
            onChange={(e) => updateSettings({ softSounds: e.target.checked })}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>🌐 {t('settings.uiLanguage')}</span>
          <select
            className="input-base"
            value={settings.uiLanguage}
            onChange={(e) => updateSettings({ uiLanguage: e.target.value as 'es' | 'en' })}
          >
            <option value="es">{t('lang.es')}</option>
            <option value="en">{t('lang.en')}</option>
          </select>
        </label>
      </section>

      <section className="card-soft p-5 flex flex-col gap-3">
        <h2>{t('settings.voice')}</h2>
        <label className="flex flex-col gap-1">
          <span>{t('settings.voiceLanguage')}</span>
          <select
            className="input-base"
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
          >
            {VOICE_LANGS.map((l) => <option key={l.code} value={l.code}>{t(l.key)}</option>)}
          </select>
        </label>
        <label className="flex flex-col gap-1">
          <span>{t('settings.speed', { rate: settings.speechRate.toFixed(2) })}</span>
          <input
            type="range" min={0.6} max={1.4} step={0.05}
            value={settings.speechRate}
            onChange={(e) => updateSettings({ speechRate: parseFloat(e.target.value) })}
          />
        </label>
      </section>

      <section className="card-soft p-5 flex flex-col gap-3">
        <h2>{t('settings.custom')}</h2>
        <p className="text-soft-textSoft">{t('settings.customIntro')}</p>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={addCustom}>
          <label className="flex flex-col gap-1">
            <span>{t('settings.label')}</span>
            <input className="input-base" value={label} onChange={(e) => setLabel(e.target.value)} required />
          </label>
          <label className="flex flex-col gap-1">
            <span>{t('settings.phrase')}</span>
            <input className="input-base" value={phrase} onChange={(e) => setPhrase(e.target.value)} placeholder={t('settings.phrasePh')} />
          </label>
          <label className="flex flex-col gap-1">
            <span>{t('settings.emoji')}</span>
            <input className="input-base" value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={4} />
          </label>
          <label className="flex flex-col gap-1">
            <span>{t('settings.category')}</span>
            <select className="input-base" value={category} onChange={(e) => setCategory(e.target.value)}>
              {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{tCategory(c)}</option>)}
            </select>
          </label>
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span>{t('settings.image')}</span>
            <input type="file" accept="image/*" onChange={onFile} />
            {imageData && (
              <img src={imageData} alt={t('settings.imagePreview')} className="w-20 h-20 object-contain rounded-md mt-1 bg-soft-bg" />
            )}
          </label>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-success">{t('settings.add')}</button>
          </div>
        </form>

        {customPictograms.length > 0 && (
          <ul className="flex flex-col gap-2 mt-3">
            {customPictograms.map((p) => <CustomItem key={p.id} p={p} />)}
          </ul>
        )}
      </section>
    </div>
  );
}
