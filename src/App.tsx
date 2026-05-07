import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { SplashScreen } from './components/SplashScreen';
import PWAPrompt from './components/PWAPrompt';
import { useApp } from './context/AppContext';
import { useI18n } from './i18n';

const SPLASH_KEY = 'pictos.splashShown';

export default function App() {
  const { settings } = useApp();
  const { t } = useI18n();
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try { return sessionStorage.getItem(SPLASH_KEY) !== '1'; } catch { return true; }
  });

  const handleFinish = () => {
    try { sessionStorage.setItem(SPLASH_KEY, '1'); } catch { /* noop */ }
    setShowSplash(false);
  };

  return (
    <div className="min-h-full flex flex-col">
      {showSplash && (
        <SplashScreen onFinish={handleFinish} withSound={settings.softSounds} />
      )}
      <Navbar />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-4">
        <Outlet />
      </main>
      <footer className="nav-hide-on-focus border-t border-soft-border dark:border-dark-border py-4 text-center text-sm text-soft-textSoft">
        {t('app.footer')}
      </footer>
      <PWAPrompt />
    </div>
  );
}
