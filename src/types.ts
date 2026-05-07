/** Tipos compartidos de la aplicación. */

export interface Pictogram {
  id: number;
  category: string;
  label: string;
  phrase: string;
  emoji: string;
  color: string;
  /** dataURL opcional si el padre/profesor sube una imagen propia */
  image?: string;
  favorite?: boolean;
}

export interface Category {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

export interface RoutineStep {
  id: string;
  label: string;
  emoji: string;
}

export interface Routine {
  id: string;
  title: string;
  emoji: string;
  color: string;
  steps: RoutineStep[];
}

export interface StoryStep {
  emoji: string;
  title: string;
  text: string;
}

export interface Story {
  id: string;
  title: string;
  color: string;
  cover: string;
  steps: StoryStep[];
}

export interface Profile {
  id: string;
  name: string;
  color: string;
}

export type ThemeMode = 'light' | 'dark';

export interface Settings {
  theme: ThemeMode;
  distractionFree: boolean;
  /** Idioma de la voz (BCP-47): es-ES, en-US, ... */
  language: string;
  /** Idioma de la interfaz: 'es' | 'en' */
  uiLanguage: 'es' | 'en';
  speechRate: number;
  softSounds: boolean;
}

/** Mapa pictogramId -> dataURL del audio grabado. */
export type Recordings = Record<number, string>;

/** Progreso de rutinas: { routineId: { stepId: completed } } */
export type RoutineProgress = Record<string, Record<string, boolean>>;
