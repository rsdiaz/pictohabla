import type { Story } from '../types';

export const STORIES: Story[] = [
  {
    id: 'doctor',
    title: 'Voy al médico',
    color: '#A7D8FF',
    cover: '🩺',
    steps: [
      { emoji: '🚗', title: 'Vamos en coche',     text: 'Mamá o papá me llevan al médico en coche.' },
      { emoji: '🏥', title: 'Llegamos',           text: 'Entramos en el centro y esperamos sentados.' },
      { emoji: '🧑‍⚕️', title: 'El médico',        text: 'El médico es amable y me explica todo.' },
      { emoji: '👂', title: 'Me revisa',          text: 'Mira mis oídos, mi boca y escucha mi corazón.' },
      { emoji: '🌟', title: 'Lo he conseguido',   text: '¡Muy bien! He sido valiente.' },
    ],
  },
  {
    id: 'school',
    title: 'Ir al colegio',
    color: '#B5E2E2',
    cover: '🏫',
    steps: [
      { emoji: '🎒', title: 'Mochila lista', text: 'Preparo mi mochila con mis cosas.' },
      { emoji: '🚶', title: 'Camino',        text: 'Voy al colegio caminando o en coche.' },
      { emoji: '👋', title: 'Saludo',        text: 'Saludo a mi profe y a mis amigos.' },
      { emoji: '📚', title: 'Aprendo',       text: 'Aprendo cosas nuevas en clase.' },
      { emoji: '🏠', title: 'Vuelvo a casa', text: 'Cuando termina, vuelvo a casa.' },
    ],
  },
  {
    id: 'teeth',
    title: 'Lavarse los dientes',
    color: '#C7E9B0',
    cover: '🪥',
    steps: [
      { emoji: '🪥', title: 'Cojo el cepillo', text: 'Tomo mi cepillo de dientes.' },
      { emoji: '🧴', title: 'Pasta',           text: 'Pongo un poco de pasta de dientes.' },
      { emoji: '😁', title: 'Cepillar',        text: 'Cepillo arriba y abajo, despacio.' },
      { emoji: '💧', title: 'Enjuagar',        text: 'Me enjuago la boca con agua.' },
      { emoji: '✨', title: 'Limpios',         text: '¡Mis dientes están limpios!' },
    ],
  },
  {
    id: 'street',
    title: 'Cruzar la calle',
    color: '#FFE5A0',
    cover: '🚸',
    steps: [
      { emoji: '✋', title: 'Paro',     text: 'Me paro en la acera, no corro.' },
      { emoji: '👀', title: 'Miro',    text: 'Miro a un lado y al otro.' },
      { emoji: '🚦', title: 'Espero',  text: 'Espero a que el semáforo esté en verde.' },
      { emoji: '🤝', title: 'De la mano', text: 'Cruzo de la mano de un adulto.' },
      { emoji: '😊', title: 'Seguro',  text: 'Cruzo seguro y con calma.' },
    ],
  },
  {
    id: 'shop',
    title: 'Ir al supermercado',
    color: '#FFC9B5',
    cover: '🛒',
    steps: [
      { emoji: '📝', title: 'Lista',     text: 'Llevamos una lista con lo que necesitamos.' },
      { emoji: '🛒', title: 'Carrito',   text: 'Cogemos un carrito o cesta.' },
      { emoji: '🍎', title: 'Compramos', text: 'Buscamos los productos sin correr.' },
      { emoji: '💳', title: 'Pagar',     text: 'Esperamos en la fila y pagamos.' },
      { emoji: '🏠', title: 'Casa',      text: 'Volvemos a casa con la compra.' },
    ],
  },
];
