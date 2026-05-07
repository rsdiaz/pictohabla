import { ROUTINES } from '../data/routines';
import { RoutineCard } from '../components/RoutineCard';
import { Timer } from '../components/Timer';
import { useI18n } from '../i18n';

export default function Routine() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-4">
      <header className="card-soft p-5">
        <h1>{t('routines.title')}</h1>
        <p className="text-soft-textSoft">{t('routines.intro')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {ROUTINES.map((r) => <RoutineCard key={r.id} routine={r} />)}
      </div>

      <h2 className="mt-2">{t('routines.timerTitle')}</h2>
      <Timer />
    </div>
  );
}
