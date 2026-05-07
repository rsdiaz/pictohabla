import { PICTOGRAMS } from '../data/pictograms';
import { EmotionCard } from '../components/EmotionCard';
import { SentenceBar } from '../components/SentenceBar';
import { useI18n } from '../i18n';

export default function Emotions() {
  const { t } = useI18n();
  const emotions = PICTOGRAMS.filter((p) => p.category === 'emotions');
  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5">
        <h1>{t('emotions.title')}</h1>
        <p className="text-soft-textSoft">{t('emotions.intro')}</p>
      </header>

      <SentenceBar />

      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {emotions.map((p) => <EmotionCard key={p.id} pictogram={p} />)}
      </section>
    </div>
  );
}
