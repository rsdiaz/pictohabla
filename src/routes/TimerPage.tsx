import { Timer } from '../components/Timer';
import { useI18n } from '../i18n';

export default function TimerPage() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col gap-4 mx-auto">
      <header className="card-soft p-5">
        <h1>{t('timer.pageTitle')}</h1>
        <p className="text-soft-textSoft">{t('timer.pageIntro')}</p>
      </header>
      <Timer />
    </div>
  );
}
