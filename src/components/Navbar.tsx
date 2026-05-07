import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';

export function Navbar() {
  const { activeProfile, settings } = useApp();
  const { t } = useI18n();

  const NAV_LINKS = [
    { to: '/',          label: t('nav.home'),      icon: '🏠' },
    { to: '/routines',  label: t('nav.routines'),  icon: '🕒' },
    { to: '/emotions',  label: t('nav.emotions'),  icon: '💗' },
    { to: '/stories',   label: t('nav.stories'),   icon: '📖' },
    { to: '/favorites', label: t('nav.favorites'), icon: '⭐' },
    { to: '/profile',   label: t('nav.profile'),   icon: '👤' },
    { to: '/settings',  label: t('nav.settings'),  icon: '⚙️' },
  ];

  return (
    <header className="nav-hide-on-focus sticky top-0 z-30 bg-soft-surface/90 backdrop-blur border-b border-soft-border dark:bg-dark-surface/90 dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl no-underline text-soft-text dark:text-dark-text">
          <span aria-hidden>🗣️</span>
          <span>{t('app.title')}</span>
        </NavLink>

        <nav className="flex flex-wrap gap-1 ml-auto" aria-label={t('nav.aria')}>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                [
                  'inline-flex items-center gap-1 px-3 py-2 rounded-md font-semibold text-sm sm:text-base no-underline transition-colors',
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-soft-text hover:bg-brand-soft dark:text-dark-text dark:hover:bg-dark-surface2',
                ].join(' ')
              }
            >
              <span aria-hidden>{l.icon}</span>
              <span>{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 ml-auto sm:ml-0">
          {settings.distractionFree && (
            <span className="px-2 py-1 rounded-full bg-pastel-yellow text-soft-text text-sm font-semibold">
              {t('nav.focusMode')}
            </span>
          )}
          <span
            className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-sm font-semibold text-soft-text"
            style={{ backgroundColor: activeProfile.color }}
            aria-label={t('nav.activeProfile', { name: activeProfile.name })}
          >
            <span aria-hidden>👤</span>
            {activeProfile.name}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
