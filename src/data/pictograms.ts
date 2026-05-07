import type { Category, Pictogram } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'needs',      label: 'Necesidades', emoji: '🙋',  color: '#A7D8FF' },
  { id: 'emotions',   label: 'Emociones',   emoji: '💗',  color: '#FFD8E4' },
  { id: 'activities', label: 'Actividades', emoji: '🎨',  color: '#C7E9B0' },
  { id: 'people',     label: 'Personas',    emoji: '👨‍👩‍👧', color: '#FFE5A0' },
  { id: 'places',     label: 'Lugares',     emoji: '🏠',  color: '#D5C6F0' },
  { id: 'food',       label: 'Comida',      emoji: '🍎',  color: '#FFC9B5' },
  { id: 'school',     label: 'Escuela',     emoji: '📚',  color: '#B5E2E2' },
  { id: 'routines',   label: 'Rutinas',     emoji: '🕒',  color: '#F0DCC4' },
];

export const PICTOGRAMS: Pictogram[] = [
  // Necesidades
  { id: 1,  category: 'needs', label: 'Agua',    phrase: 'Quiero agua',           emoji: '💧', color: '#A7D8FF' },
  { id: 2,  category: 'needs', label: 'Baño',    phrase: 'Necesito ir al baño',   emoji: '🚽', color: '#A7D8FF' },
  { id: 3,  category: 'needs', label: 'Ayuda',   phrase: 'Necesito ayuda',        emoji: '🆘', color: '#FFB3B3' },
  { id: 4,  category: 'needs', label: 'Dormir',  phrase: 'Quiero dormir',         emoji: '😴', color: '#D5C6F0' },
  { id: 5,  category: 'needs', label: 'Pausa',   phrase: 'Necesito una pausa',    emoji: '⏸️', color: '#FFE5A0' },

  // Emociones
  { id: 10, category: 'emotions', label: 'Feliz',     phrase: 'Estoy feliz',     emoji: '😊', color: '#FFE5A0' },
  { id: 11, category: 'emotions', label: 'Triste',    phrase: 'Estoy triste',    emoji: '😢', color: '#A7D8FF' },
  { id: 12, category: 'emotions', label: 'Enfadado',  phrase: 'Estoy enfadado',  emoji: '😠', color: '#FFB3B3' },
  { id: 13, category: 'emotions', label: 'Cansado',   phrase: 'Estoy cansado',   emoji: '🥱', color: '#D5C6F0' },
  { id: 14, category: 'emotions', label: 'Nervioso',  phrase: 'Estoy nervioso',  emoji: '😰', color: '#FFC9B5' },
  { id: 15, category: 'emotions', label: 'Tranquilo', phrase: 'Estoy tranquilo', emoji: '😌', color: '#B7E4C7' },

  // Actividades
  { id: 20, category: 'activities', label: 'Jugar',  phrase: 'Quiero jugar',  emoji: '🧸', color: '#C7E9B0' },
  { id: 21, category: 'activities', label: 'Pintar', phrase: 'Quiero pintar', emoji: '🎨', color: '#C7E9B0' },
  { id: 22, category: 'activities', label: 'Música', phrase: 'Quiero música', emoji: '🎵', color: '#C7E9B0' },
  { id: 23, category: 'activities', label: 'Leer',   phrase: 'Quiero leer',   emoji: '📖', color: '#C7E9B0' },

  // Personas
  { id: 30, category: 'people', label: 'Mamá',  phrase: 'Quiero a mamá',  emoji: '👩', color: '#FFE5A0' },
  { id: 31, category: 'people', label: 'Papá',  phrase: 'Quiero a papá',  emoji: '👨', color: '#FFE5A0' },
  { id: 32, category: 'people', label: 'Profe', phrase: 'Mi profe',       emoji: '🧑‍🏫', color: '#FFE5A0' },
  { id: 33, category: 'people', label: 'Amigo', phrase: 'Mi amigo',       emoji: '🧒', color: '#FFE5A0' },

  // Lugares
  { id: 40, category: 'places', label: 'Casa',     phrase: 'Quiero ir a casa',     emoji: '🏠', color: '#D5C6F0' },
  { id: 41, category: 'places', label: 'Parque',   phrase: 'Quiero ir al parque',  emoji: '🌳', color: '#D5C6F0' },
  { id: 42, category: 'places', label: 'Cole',     phrase: 'Voy al colegio',       emoji: '🏫', color: '#D5C6F0' },
  { id: 43, category: 'places', label: 'Tienda',   phrase: 'Vamos a la tienda',    emoji: '🏬', color: '#D5C6F0' },

  // Comida
  { id: 50, category: 'food', label: 'Pan',     phrase: 'Quiero pan',     emoji: '🍞', color: '#FFC9B5' },
  { id: 51, category: 'food', label: 'Manzana', phrase: 'Quiero manzana', emoji: '🍎', color: '#FFC9B5' },
  { id: 52, category: 'food', label: 'Leche',   phrase: 'Quiero leche',   emoji: '🥛', color: '#FFC9B5' },
  { id: 53, category: 'food', label: 'Galleta', phrase: 'Quiero galleta', emoji: '🍪', color: '#FFC9B5' },

  // Escuela
  { id: 60, category: 'school', label: 'Mochila', phrase: 'Mi mochila', emoji: '🎒', color: '#B5E2E2' },
  { id: 61, category: 'school', label: 'Lápiz',   phrase: 'Mi lápiz',   emoji: '✏️', color: '#B5E2E2' },
  { id: 62, category: 'school', label: 'Libro',   phrase: 'Mi libro',   emoji: '📕', color: '#B5E2E2' },
  { id: 63, category: 'school', label: 'Recreo',  phrase: 'Es la hora del recreo', emoji: '⚽', color: '#B5E2E2' },

  // Rutinas (atajos)
  { id: 70, category: 'routines', label: 'Despertar', phrase: 'Es hora de despertar', emoji: '⏰', color: '#F0DCC4' },
  { id: 71, category: 'routines', label: 'Ducha',     phrase: 'Es hora de la ducha',  emoji: '🚿', color: '#F0DCC4' },
  { id: 72, category: 'routines', label: 'Comer',     phrase: 'Es hora de comer',     emoji: '🍽️', color: '#F0DCC4' },
];
