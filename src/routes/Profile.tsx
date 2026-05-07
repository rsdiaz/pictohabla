import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';
import type { Profile } from '../types';

const COLORS = ['#A7D8FF', '#FFD8E4', '#C7E9B0', '#FFE5A0', '#D5C6F0', '#FFC9B5', '#B5E2E2', '#F0DCC4'];

export default function ProfileRoute() {
  const { profiles, setProfiles, activeProfileId, setActiveProfileId } = useApp();
  const { t } = useI18n();
  const [name, setName] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const p: Profile = { id: `p_${Date.now()}`, name: name.trim(), color };
    setProfiles([...profiles, p]);
    setName('');
  };

  const remove = (id: string) => {
    if (profiles.length <= 1) return;
    setProfiles(profiles.filter((p) => p.id !== id));
    if (activeProfileId === id) setActiveProfileId(profiles[0].id);
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5">
        <h1>{t('profile.title')}</h1>
        <p className="text-soft-textSoft">{t('profile.intro')}</p>
      </header>

      <section className="card-soft p-5 flex flex-col gap-3">
        <h2>{t('profile.active')}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {profiles.map((p) => (
            <li key={p.id} className={`p-3 rounded-md border-2 flex items-center gap-3 ${activeProfileId === p.id ? 'border-brand bg-brand-soft' : 'border-soft-border bg-soft-surface'}`}>
              <span className="w-10 h-10 rounded-full" style={{ backgroundColor: p.color }} aria-hidden />
              <div className="flex-1 font-semibold">{p.name}</div>
              {activeProfileId === p.id ? (
                <span className="text-sm font-semibold text-brand">{t('profile.activeBadge')}</span>
              ) : (
                <button type="button" className="btn btn-secondary !min-h-0 !py-2 !px-3 text-sm" onClick={() => setActiveProfileId(p.id)}>
                  {t('profile.activate')}
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger !min-h-0 !py-2 !px-3 text-sm"
                onClick={() => remove(p.id)}
                disabled={profiles.length <= 1}
                aria-label={t('profile.deleteAria', { name: p.name })}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="card-soft p-5 flex flex-col gap-3">
        <h2>{t('profile.add')}</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-3" onSubmit={add}>
          <label className="flex flex-col gap-1">
            <span>{t('profile.name')}</span>
            <input className="input-base" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
          <div className="flex flex-col gap-1">
            <span>{t('profile.color')}</span>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full border-2 ${color === c ? 'border-brand' : 'border-soft-border'}`}
                  style={{ backgroundColor: c }}
                  aria-label={t('profile.colorAria', { c })}
                  aria-pressed={color === c}
                />
              ))}
            </div>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn btn-success">➕ {t('profile.create')}</button>
          </div>
        </form>
      </section>
    </div>
  );
}
