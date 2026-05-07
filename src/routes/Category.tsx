import { Link, useParams } from 'react-router-dom';
import { CATEGORIES, PICTOGRAMS } from '../data/pictograms';
import { useApp } from '../context/AppContext';
import { PictogramCard } from '../components/PictogramCard';
import { SentenceBar } from '../components/SentenceBar';
import { useI18n } from '../i18n';

export default function Category() {
  const { id } = useParams<{ id: string }>();
  const { customPictograms } = useApp();
  const { t, tCategory } = useI18n();
  const cat = CATEGORIES.find((c) => c.id === id);
  const items = [...PICTOGRAMS, ...customPictograms].filter((p) => p.category === id);

  if (!cat) {
    return (
      <div className="card-soft p-5">
        <h1>{t('category.notFound')}</h1>
        <Link to="/" className="btn btn-secondary mt-3">{t('category.back')}</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5 flex items-center gap-3" style={{ borderTop: `8px solid ${cat.color}` }}>
        <span aria-hidden className="text-5xl">{cat.emoji}</span>
        <div className="flex-1">
          <h1>{tCategory(cat)}</h1>
          <p className="text-soft-textSoft">{t('category.count', { n: items.length })}</p>
        </div>
        <Link to="/" className="btn btn-secondary">{t('category.home')}</Link>
      </header>

      <SentenceBar />

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {items.map((p) => <PictogramCard key={p.id} pictogram={p} />)}
      </section>
      {items.length === 0 && (
        <div className="card-soft p-5 text-center text-soft-textSoft">
          {(() => {
            const tpl = t('category.empty', { settings: '\u0000' });
            const [pre, post] = tpl.split('\u0000');
            return (
              <>
                {pre}
                <Link to="/settings" className="underline">{t('category.empty.settings')}</Link>
                {post || ''}
              </>
            );
          })()}
        </div>
      )}
    </div>
  );
}
