import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PICTOGRAMS } from '../data/pictograms';
import { PictogramCard } from '../components/PictogramCard';
import { SentenceBar } from '../components/SentenceBar';
import { useI18n } from '../i18n';

export default function Favorites() {
  const { favorites, customPictograms } = useApp();
  const { t } = useI18n();
  const all = [...PICTOGRAMS, ...customPictograms];
  const items = all.filter((p) => favorites.includes(p.id));

  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5">
        <h1>{t('favorites.title')}</h1>
        <p className="text-soft-textSoft">{t('favorites.count', { n: items.length })}</p>
      </header>

      <SentenceBar />

      {items.length === 0 ? (
        <div className="card-soft p-5 text-center text-soft-textSoft">
          {t('favorites.empty.prefix')}<Link to="/" className="underline">{t('favorites.empty.link')}</Link>{t('favorites.empty.suffix')}
        </div>
      ) : (
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((p) => <PictogramCard key={p.id} pictogram={p} />)}
        </section>
      )}
    </div>
  );
}
