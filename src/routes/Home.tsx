import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CategoryGrid } from '../components/CategoryGrid';
import { SentenceBar } from '../components/SentenceBar';
import { useI18n } from '../i18n';

export default function Home() {
  const { activeProfile } = useApp();
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5">
        <h1 className="mb-1" dangerouslySetInnerHTML={{ __html: t('home.greeting', { name: `<span class="text-brand">${escapeHtml(activeProfile.name)}</span>` }) }} />
        <p className="text-soft-textSoft">{t('home.intro')}</p>
      </header>

      <SentenceBar />

      <h2>{t('home.categories')}</h2>
      <CategoryGrid />

      <section aria-label={t('home.shortcuts')} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-2">
        <Link to="/routines"  className="btn btn-secondary"><span aria-hidden>🕒</span> {t('nav.routines')}</Link>
        <Link to="/timer"     className="btn btn-secondary"><span aria-hidden>⏳</span> {t('nav.timer')}</Link>
        <Link to="/emotions"  className="btn btn-secondary"><span aria-hidden>💗</span> {t('nav.emotions')}</Link>
        <Link to="/calm"      className="btn btn-secondary"><span aria-hidden>🧘</span> {t('nav.calm')}</Link>
        <Link to="/stories"   className="btn btn-secondary"><span aria-hidden>📖</span> {t('nav.stories')}</Link>
        <Link to="/favorites" className="btn btn-secondary"><span aria-hidden>⭐</span> {t('nav.favorites')}</Link>
      </section>
    </div>
  );
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}
