import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/pictograms';
import { useI18n } from '../i18n';

export function CategoryGrid() {
  const { tCategory, t } = useI18n();
  return (
    <section aria-label={t('home.categories')} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          to={`/category/${cat.id}`}
          className="group rounded-lg shadow-soft border-2 border-soft-border p-5 flex flex-col items-center gap-2 text-soft-text font-semibold no-underline transition-transform duration-200 hover:scale-[1.03] active:scale-[0.97] min-h-[140px]"
          style={{ backgroundColor: cat.color }}
        >
          <span aria-hidden className="text-5xl sm:text-6xl">{cat.emoji}</span>
          <span className="text-lg sm:text-xl">{tCategory(cat)}</span>
        </Link>
      ))}
    </section>
  );
}

export default CategoryGrid;
