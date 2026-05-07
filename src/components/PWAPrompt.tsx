import { useEffect, useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { useI18n } from '../i18n';

export default function PWAPrompt() {
  const { t } = useI18n();
  const [showOffline, setShowOffline] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW({
    onOfflineReady() { setShowOffline(true); },
  });

  useEffect(() => {
    if (!offlineReady) return;
    const id = setTimeout(() => { setShowOffline(false); setOfflineReady(false); }, 4000);
    return () => clearTimeout(id);
  }, [offlineReady, setOfflineReady]);

  if (!needRefresh && !showOffline) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[80] flex justify-center px-4 pointer-events-none">
      <div
        role="status"
        className="pointer-events-auto card-soft p-4 max-w-md w-full flex items-start gap-3 shadow-2xl border-2 border-brand bg-soft-surface dark:bg-dark-surface animate-[fadeIn_.25s_ease-out]"
      >
        {needRefresh ? (
          <>
            <span aria-hidden className="text-2xl">🔄</span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold">{t('pwa.updateTitle')}</div>
              <div className="text-sm text-soft-textSoft">{t('pwa.updateBody')}</div>
              <div className="flex gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-success !min-h-0 !py-2 !px-3 text-sm"
                  onClick={() => updateServiceWorker(true)}
                >
                  {t('pwa.update')}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary !min-h-0 !py-2 !px-3 text-sm"
                  onClick={() => setNeedRefresh(false)}
                >
                  {t('pwa.dismiss')}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <span aria-hidden className="text-2xl">📴</span>
            <div className="flex-1 min-w-0 font-semibold">{t('pwa.offlineReady')}</div>
          </>
        )}
      </div>
    </div>
  );
}
