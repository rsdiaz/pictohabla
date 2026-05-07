import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
  type ReactNode, type Dispatch, type SetStateAction,
} from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import type {
  Pictogram, Profile, Recordings, RoutineProgress, Settings,
} from '../types';

interface AppContextValue {
  // frase
  sentence: Pictogram[];
  addToSentence: (p: Pictogram) => void;
  clearSentence: () => void;
  popSentence: () => void;
  // favoritos
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  // perfiles
  profiles: Profile[];
  setProfiles: Dispatch<SetStateAction<Profile[]>>;
  activeProfile: Profile;
  activeProfileId: string;
  setActiveProfileId: Dispatch<SetStateAction<string>>;
  // ajustes
  settings: Settings;
  updateSettings: (patch: Partial<Settings>) => void;
  // personalizables
  customPictograms: Pictogram[];
  setCustomPictograms: Dispatch<SetStateAction<Pictogram[]>>;
  recordings: Recordings;
  setRecordings: Dispatch<SetStateAction<Recordings>>;
  // rutinas
  routineProgress: RoutineProgress;
  setRoutineProgress: Dispatch<SetStateAction<RoutineProgress>>;
}

const AppContext = createContext<AppContextValue | null>(null);

const DEFAULT_PROFILE: Profile = { id: 'default', name: 'Mi peque', color: '#A7D8FF' };
const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  distractionFree: false,
  language: 'es-ES',
  uiLanguage: (typeof navigator !== 'undefined' && navigator.language?.toLowerCase().startsWith('en')) ? 'en' : 'es',
  speechRate: 0.95,
  softSounds: true,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [sentence, setSentence] = useState<Pictogram[]>([]);
  const [favorites, setFavorites] = useLocalStorage<number[]>('pictos.favorites', []);
  const [profiles, setProfiles] = useLocalStorage<Profile[]>('pictos.profiles', [DEFAULT_PROFILE]);
  const [activeProfileId, setActiveProfileId] = useLocalStorage<string>('pictos.activeProfile', DEFAULT_PROFILE.id);
  const [settings, setSettings] = useLocalStorage<Settings>('pictos.settings', DEFAULT_SETTINGS);
  const [customPictograms, setCustomPictograms] = useLocalStorage<Pictogram[]>('pictos.custom', []);
  const [recordings, setRecordings] = useLocalStorage<Recordings>('pictos.recordings', {});
  const [routineProgress, setRoutineProgress] = useLocalStorage<RoutineProgress>('pictos.routineProgress', {});

  // Aplicar tema y modo sin distracciones al <html>
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = settings.theme;
    root.dataset.distractionFree = settings.distractionFree ? 'true' : 'false';
    if (settings.theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, [settings.theme, settings.distractionFree]);

  const addToSentence = useCallback((p: Pictogram) => setSentence((prev) => [...prev, p]), []);
  const clearSentence = useCallback(() => setSentence([]), []);
  const popSentence = useCallback(() => setSentence((prev) => prev.slice(0, -1)), []);

  const toggleFavorite = useCallback(
    (id: number) =>
      setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setFavorites]
  );
  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  const updateSettings = useCallback(
    (patch: Partial<Settings>) => setSettings((prev) => ({ ...prev, ...patch })),
    [setSettings]
  );

  const activeProfile = useMemo<Profile>(
    () => profiles.find((p) => p.id === activeProfileId) || profiles[0] || DEFAULT_PROFILE,
    [profiles, activeProfileId]
  );

  const value = useMemo<AppContextValue>(
    () => ({
      sentence, addToSentence, clearSentence, popSentence,
      favorites, toggleFavorite, isFavorite,
      profiles, setProfiles, activeProfile, activeProfileId, setActiveProfileId,
      settings, updateSettings,
      customPictograms, setCustomPictograms,
      recordings, setRecordings,
      routineProgress, setRoutineProgress,
    }),
    [
      sentence, addToSentence, clearSentence, popSentence,
      favorites, toggleFavorite, isFavorite,
      profiles, setProfiles, activeProfile, activeProfileId, setActiveProfileId,
      settings, updateSettings,
      customPictograms, setCustomPictograms,
      recordings, setRecordings,
      routineProgress, setRoutineProgress,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp debe usarse dentro de AppProvider');
  return ctx;
}
