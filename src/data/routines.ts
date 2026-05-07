import type { Routine } from '../types';

export const ROUTINES: Routine[] = [
  {
    id: 'morning',
    title: 'Mañana en casa',
    emoji: '🌞',
    color: '#FFE5A0',
    steps: [
      { id: 'm1', label: 'Despertar',         emoji: '⏰' },
      { id: 'm2', label: 'Desayunar',         emoji: '🥣' },
      { id: 'm3', label: 'Lavarse dientes',   emoji: '🪥' },
      { id: 'm4', label: 'Vestirse',          emoji: '👕' },
      { id: 'm5', label: 'Ir al colegio',     emoji: '🎒' },
    ],
  },
  {
    id: 'school',
    title: 'En el colegio',
    emoji: '🏫',
    color: '#B5E2E2',
    steps: [
      { id: 's1', label: 'Saludar',  emoji: '👋' },
      { id: 's2', label: 'Aprender', emoji: '📚' },
      { id: 's3', label: 'Recreo',   emoji: '⚽' },
      { id: 's4', label: 'Comer',    emoji: '🍽️' },
      { id: 's5', label: 'Volver',   emoji: '🏠' },
    ],
  },
  {
    id: 'night',
    title: 'Noche tranquila',
    emoji: '🌙',
    color: '#D5C6F0',
    steps: [
      { id: 'n1', label: 'Cenar',  emoji: '🍲' },
      { id: 'n2', label: 'Ducha',  emoji: '🚿' },
      { id: 'n3', label: 'Pijama', emoji: '👚' },
      { id: 'n4', label: 'Cuento', emoji: '📖' },
      { id: 'n5', label: 'Dormir', emoji: '😴' },
    ],
  },
];
