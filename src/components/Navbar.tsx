import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useI18n } from '../i18n';

export function Navbar() {
  const { activeProfile, settings } = useApp();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const NAV_LINKS = [
    { to: '/',          label: t('nav.home'),      icon: '🏠' },
    { to: '/routines',  label: t('nav.routines'),  icon: '🕒' },
    { to: '/emotions',  label: t('nav.emotions'),  icon: '💗' },
    { to: '/calm',      label: t('nav.calm'),      icon: '🧘' },
    { to: '/stories',   label: t('nav.stories'),   icon: '📖' },
    { to: '/favorites', label: t('nav.favorites'), icon: '⭐' },
    { to: '/profile',   label: t('nav.profile'),   icon: '👤' },
    { to: '/settings',  label: t('nav.settings'),  icon: '⚙️' },
  ];

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header className="nav-hide-on-focus sticky top-0 z-30 bg-soft-surface/90 backdrop-blur border-b border-soft-border dark:bg-dark-surface/90 dark:border-dark-border">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3 flex-nowrap">
        <NavLink to="/" className="flex items-center gap-2 font-bold text-xl no-underline text-soft-text dark:text-dark-text shrink-0">
          <span aria-hidden>🗣️</span>
          <span className="hidden sm:inline">{t('app.title')}</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex flex-nowrap items-center gap-0.5 lg:gap-1 ml-auto min-w-0" aria-label={t('nav.aria')}>
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              title={l.label}
              className={({ isActive }) =>
                [
                  'inline-flex items-center gap-1.5 px-2 lg:px-3 py-2 rounded-md font-semibold text-sm lg:text-base no-underline transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-brand text-white'
                    : 'text-soft-text hover:bg-brand-soft dark:text-dark-text dark:hover:bg-dark-surface2',
                ].join(' ')
              }
            >
              <span aria-hidden className="text-lg leading-none">{l.icon}</span>
              <span className="hidden lg:inline">{l.label}</span>
              <span className="sr-only lg:hidden">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          {settings.distractionFree && (
            <span
              className="px-2 py-1 rounded-full bg-pastel-yellow text-soft-text text-xs lg:text-sm font-semibold whitespace-nowrap"
              title={t('nav.focusMode')}
            >
              <span aria-hidden>🧘</span>
              <span className="hidden xl:inline ml-1">{t('nav.focusMode')}</span>
            </span>
          )}
        </div>

        {/* Avatar móvil + hamburguesa */}
        <div className="flex md:hidden items-center gap-2 ml-auto">
          <span
            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-base font-bold text-soft-text shadow-sm"
            style={{ backgroundColor: activeProfile.color }}
            aria-label={t('nav.activeProfile', { name: activeProfile.name })}
            title={activeProfile.name}
          >
            {activeProfile.name.charAt(0).toUpperCase()}
          </span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative w-11 h-11 flex flex-col items-center justify-center rounded-md hover:bg-brand-soft dark:hover:bg-dark-surface2 transition-colors"
          >
            <span
              className={[
                'block h-[3px] w-7 rounded-full bg-soft-text dark:bg-dark-text transition-all duration-300 ease-out',
                open ? 'translate-y-[9px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'block h-[3px] w-7 rounded-full bg-soft-text dark:bg-dark-text mt-[6px] transition-all duration-200 ease-out',
                open ? 'opacity-0 scale-x-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'block h-[3px] w-7 rounded-full bg-soft-text dark:bg-dark-text mt-[6px] transition-all duration-300 ease-out',
                open ? '-translate-y-[9px] -rotate-45' : '',
              ].join(' ')}
            />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            aria-hidden
            className={[
              'md:hidden fixed inset-0 top-[64px] bg-black/40 backdrop-blur-sm transition-opacity duration-300',
              'z-[60]',
              open ? 'opacity-100' : 'opacity-0 pointer-events-none',
            ].join(' ')}
          />

          {/* Drawer móvil */}
          <nav
            id="mobile-menu"
            aria-label={t('nav.aria')}
            className={[
              'md:hidden fixed top-[64px] right-0 bottom-0 w-72 max-w-[85vw] z-[70]',
              'bg-soft-surface dark:bg-dark-surface border-l border-soft-border dark:border-dark-border',
              'shadow-2xl flex flex-col p-4 gap-2 overflow-y-auto',
              'transition-transform duration-300 ease-out',
              open ? 'translate-x-0' : 'translate-x-full',
            ].join(' ')}
          >
            {settings.distractionFree && (
              <span className="self-start px-2 py-1 rounded-full bg-pastel-yellow text-soft-text text-xs font-semibold mb-2">
                {t('nav.focusMode')}
              </span>
            )}

            {NAV_LINKS.map((l, i) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-base no-underline',
                    'transform transition-all duration-300 ease-out',
                    open ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6',
                    isActive
                      ? 'bg-brand text-white shadow-md'
                      : 'text-soft-text hover:bg-brand-soft dark:text-dark-text dark:hover:bg-dark-surface2',
                  ].join(' ')
                }
              >
                <span aria-hidden className="text-2xl">{l.icon}</span>
                <span>{l.label}</span>
              </NavLink>
            ))}

            <div
              className="mt-auto pt-3 border-t border-soft-border dark:border-dark-border"
              style={{ transitionDelay: open ? `${80 + NAV_LINKS.length * 40}ms` : '0ms' }}
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold text-soft-text w-full"
                style={{ backgroundColor: activeProfile.color }}
                aria-label={t('nav.activeProfile', { name: activeProfile.name })}
              >
                <span aria-hidden>👤</span>
                {activeProfile.name}
              </span>
            </div>
          </nav>
        </>,
        document.body
      )}

      {/* Avatar flotante de perfil (solo escritorio) */}
      {typeof document !== 'undefined' && createPortal(
        <NavLink
          to="/profile"
          aria-label={t('nav.activeProfile', { name: activeProfile.name })}
          title={activeProfile.name}
          className="hidden md:flex group fixed top-3 right-4 z-40 items-center gap-2 pl-1.5 pr-2 py-1.5 rounded-full shadow-lg ring-2 ring-white/60 dark:ring-dark-surface/80 backdrop-blur transition-all duration-300 ease-out hover:scale-105 hover:shadow-xl no-underline text-soft-text"
          style={{ backgroundColor: activeProfile.color }}
        >
          <span
            aria-hidden
            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/70 dark:bg-dark-surface/80 text-base font-bold shadow-inner"
          >
            {activeProfile.name.charAt(0).toUpperCase()}
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-[max-width,padding,opacity] duration-300 ease-out opacity-0 group-hover:max-w-[10rem] group-hover:opacity-100 group-hover:pr-1 group-focus-visible:max-w-[10rem] group-focus-visible:opacity-100 group-focus-visible:pr-1">
            {activeProfile.name}
          </span>
        </NavLink>,
        document.body
      )}
    </header>
  );
}

export default Navbar;
