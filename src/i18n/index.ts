import { useApp } from '../context/AppContext';
import type { Category, Pictogram, Routine, RoutineStep, Story, StoryStep } from '../types';

export type Locale = 'es' | 'en';

/** Convierte un código BCP-47 (es-ES, en-US...) en la locale base soportada. */
export function localeFromLanguage(lang: string): Locale {
  return lang.toLowerCase().startsWith('en') ? 'en' : 'es';
}

/* =====================================================================
   UI strings
   ===================================================================== */
const UI = {
  es: {
    'app.title': 'PictoHabla',
    'app.subtitle': 'Comunicación con pictogramas',
    'app.footer': 'Hecho con 💙 para acompañar la comunicación.',

    'pwa.updateTitle': 'Hay una nueva versión disponible',
    'pwa.updateBody': 'Recarga para obtener las últimas mejoras.',
    'pwa.update': 'Actualizar',
    'pwa.dismiss': 'Más tarde',
    'pwa.offlineReady': 'Listo para usar sin conexión ✨',

    'nav.home': 'Inicio',
    'nav.routines': 'Rutinas',
    'nav.timer': 'Temporizador',
    'nav.emotions': 'Emociones',
    'nav.calm': 'Calma',
    'nav.stories': 'Cuentos',
    'nav.favorites': 'Favoritos',
    'nav.profile': 'Perfil',
    'nav.settings': 'Ajustes',
    'nav.aria': 'Navegación principal',
    'nav.focusMode': 'Modo concentración',
    'nav.activeProfile': 'Perfil activo: {name}',
    'nav.openMenu': 'Abrir menú',
    'nav.closeMenu': 'Cerrar menú',

    'splash.start': 'Empezar',
    'splash.startAria': 'Empezar ahora',
    'splash.hint': 'Pulsa el botón cuando estés listo',
    'splash.audioBlocked': '🔊 Toca la pantalla para activar el sonido',
    'splash.soundOn': 'Activar sonido',
    'splash.soundOff': 'Silenciar sonido',
    'splash.soundOnAria': 'Activar sonido de la pantalla de bienvenida',
    'splash.soundOffAria': 'Silenciar sonido de la pantalla de bienvenida',
    'splash.replayAudio': 'Reiniciar melodía',
    'splash.replayAudioAria': 'Reiniciar melodía de bienvenida',
    'splash.dialogAria': 'Pantalla de bienvenida',

    'home.greeting': 'Hola, {name} 👋',
    'home.intro': 'Toca un pictograma para hablar y construir frases.',
    'home.categories': 'Categorías',
    'home.shortcuts': 'Accesos rápidos',

    'sentence.aria': 'Frase construida con pictogramas',
    'sentence.placeholder': 'Toca pictogramas para formar una frase…',
    'sentence.play': 'Reproducir',
    'sentence.stop': 'Parar',
    'sentence.playAria': 'Reproducir frase',
    'sentence.stopAria': 'Detener lectura',
    'sentence.last': 'Último',
    'sentence.lastAria': 'Borrar último pictograma',
    'sentence.clear': 'Borrar',
    'sentence.clearAria': 'Borrar toda la frase',

    'category.notFound': 'Categoría no encontrada',
    'category.back': '← Volver',
    'category.home': '← Inicio',
    'category.count': '{n} pictogramas',
    'category.empty': 'Aún no hay pictogramas en esta categoría. Añade los tuyos en {settings}.',
    'category.empty.settings': 'Ajustes',

    'emotions.title': '💗 ¿Cómo te sientes?',
    'emotions.intro': 'Toca la emoción que sientes ahora.',

    'calm.title': 'Modo calma',
    'calm.intro': 'Toca el pictograma que necesitas. Respira despacio.',
    'calm.exit': 'Salir',
    'calm.exitAria': 'Salir del modo calma',
    'calm.footer': 'Estoy aquí. Tómate tu tiempo.',
    'calm.cardsAria': 'Pictogramas de calma',
    'calm.breathAria': 'Guía de respiración',
    'calm.breathIn': 'Inhala…',
    'calm.breathOut': 'Exhala…',
    'calm.rest.label': 'Descansar',
    'calm.rest.phrase': 'Necesito descansar.',
    'calm.noise.label': 'Demasiado ruido',
    'calm.noise.phrase': 'Hay demasiado ruido.',
    'calm.alone.label': 'Solo',
    'calm.alone.phrase': 'Quiero estar solo.',
    'calm.hug.label': 'Abrázame',
    'calm.hug.phrase': 'Abrázame, por favor.',
    'calm.noTouch.label': 'No me toques',
    'calm.noTouch.phrase': 'No me toques, por favor.',
    'calm.water.label': 'Agua',
    'calm.water.phrase': 'Necesito agua.',
    'calm.dim.label': 'Menos luz',
    'calm.dim.phrase': 'Necesito menos luz.',
    'calm.help.label': 'Ayuda',
    'calm.help.phrase': 'Necesito ayuda.',

    'routines.title': '🕒 Rutinas diarias',
    'routines.intro': 'Marca cada paso al completarlo. Al terminar la rutina recibirás un refuerzo.',
    'routines.timerTitle': '⏳ Temporizador visual',
    'routines.aria': 'Rutina: {title}',
    'routines.resetAria': 'Reiniciar rutina {title}',
    'routines.reset': '↺ Reiniciar',
    'routines.progress': '{done} de {total} pasos completados',
    'routines.progressAria': 'Progreso {pct}%',
    'routines.completed': '¡Has completado la rutina!',

    'timer.aria': 'Temporizador visual',
    'timer.minLabel': '{n} min',
    'timer.running': 'En marcha',
    'timer.paused': 'En pausa',
    'timer.done': '¡Hecho!',
    'timer.start': 'Empezar',
    'timer.pause': 'Pausa',
    'timer.reset': 'Reiniciar',
    'timer.finishedSpeech': '¡Tiempo cumplido! Buen trabajo.',
    'timer.finishedReward': '¡Tiempo cumplido!',
    'timer.pageTitle': '⏳ Temporizador visual',
    'timer.pageIntro': 'Elige un tiempo y pulsa empezar.',

    'stories.title': '📖 Historias sociales',
    'stories.intro': 'Elige una historia para anticipar situaciones del día a día.',
    'stories.openAria': 'Abrir historia: {title}',
    'stories.steps': '{n} pasos',
    'stories.back': '← Volver',
    'stories.prev': '← Anterior',
    'stories.next': 'Siguiente →',
    'stories.finish': '🌟 Terminar',
    'stories.stepCounter': 'Paso {current} de {total}',
    'stories.completed': '¡Has terminado el cuento!',

    'favorites.title': '⭐ Favoritos',
    'favorites.count': '{n} pictogramas guardados.',
    'favorites.empty.prefix': 'Aún no tienes favoritos. Toca la estrella ☆ en cualquier pictograma o vuelve al ',
    'favorites.empty.link': 'inicio',
    'favorites.empty.suffix': '.',
    'favorites.add': 'Añadir a favoritos',
    'favorites.remove': 'Quitar de favoritos',

    'profile.title': '👤 Perfiles',
    'profile.intro': 'Crea perfiles para distintos peques. Cada uno mantiene sus favoritos y rutinas.',
    'profile.active': 'Perfil activo',
    'profile.activeBadge': 'activo',
    'profile.activate': 'Activar',
    'profile.deleteAria': 'Eliminar perfil {name}',
    'profile.add': 'Añadir perfil',
    'profile.name': 'Nombre',
    'profile.color': 'Color',
    'profile.colorAria': 'Elegir color {color}',
    'profile.create': '➕ Crear perfil',
    'profile.defaultName': 'Mi peque',

    'settings.title': '⚙️ Ajustes',
    'settings.intro': 'Personaliza la experiencia y añade pictogramas propios (modo padre/profesor).',
    'settings.appearance': 'Apariencia',
    'settings.darkMode': '🌗 Modo oscuro',
    'settings.distractionFree': '🧘 Modo sin distracciones',
    'settings.softSounds': '🔔 Sonidos suaves de refuerzo',
    'settings.voice': 'Voz',
    'settings.uiLanguage': 'Idioma de la app',
    'settings.voiceLanguage': 'Idioma de voz',
    'settings.speed': 'Velocidad: {rate}x',
    'settings.custom': '👨‍👩‍👧 Pictogramas personalizados',
    'settings.customIntro': 'Crea pictogramas con imagen y graba la voz de un familiar.',
    'settings.label': 'Etiqueta *',
    'settings.phrase': 'Frase',
    'settings.phrasePh': 'Si está vacío, usaremos la etiqueta',
    'settings.emoji': 'Emoji',
    'settings.category': 'Categoría',
    'settings.image': 'Imagen (opcional)',
    'settings.imagePreview': 'vista previa',
    'settings.add': '➕ Añadir pictograma',
    'settings.record': '🎙️ Grabar',
    'settings.stop': '⏹️ Detener',
    'settings.play': '▶️',
    'settings.removeAudio': '🗑️ Audio',
    'settings.remove': 'Eliminar',
    'settings.micError': 'No se pudo acceder al micrófono.',

    'reward.aria': 'Refuerzo positivo',
    'reward.default': '¡Muy bien!',
    'reward.subtitle': 'Has hecho un gran trabajo.',
    'reward.continue': '¡Sigamos!',
    'reward.msg.1': '¡Muy bien!',
    'reward.msg.2': '¡Lo has conseguido!',
    'reward.msg.3': '¡Genial!',
    'reward.msg.4': '¡Excelente!',
    'reward.msg.5': '¡Buen trabajo!',

    'lang.es': 'Español',
    'lang.en': 'English',
    'voiceLang.esES': 'Español (España)',
    'voiceLang.esMX': 'Español (México)',
    'voiceLang.enUS': 'English (US)',
    'voiceLang.enGB': 'English (UK)',
  },
  en: {
    'app.title': 'PictoTalk',
    'app.subtitle': 'Communicate with pictograms',
    'app.footer': 'Made with 💙 to support communication.',

    'pwa.updateTitle': 'A new version is available',
    'pwa.updateBody': 'Reload to get the latest improvements.',
    'pwa.update': 'Update',
    'pwa.dismiss': 'Later',
    'pwa.offlineReady': 'Ready to use offline ✨',

    'nav.home': 'Home',
    'nav.routines': 'Routines',
    'nav.timer': 'Timer',
    'nav.emotions': 'Emotions',
    'nav.calm': 'Calm',
    'nav.stories': 'Stories',
    'nav.favorites': 'Favorites',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.aria': 'Main navigation',
    'nav.focusMode': 'Focus mode',
    'nav.activeProfile': 'Active profile: {name}',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',

    'splash.start': 'Start',
    'splash.startAria': 'Start now',
    'splash.hint': 'Press the button when you are ready',
    'splash.audioBlocked': '🔊 Tap the screen to enable sound',
    'splash.soundOn': 'Enable sound',
    'splash.soundOff': 'Mute sound',
    'splash.soundOnAria': 'Enable welcome screen sound',
    'splash.soundOffAria': 'Mute welcome screen sound',
    'splash.replayAudio': 'Restart melody',
    'splash.replayAudioAria': 'Restart welcome melody',
    'splash.dialogAria': 'Welcome screen',

    'home.greeting': 'Hi, {name} 👋',
    'home.intro': 'Tap a pictogram to speak and build sentences.',
    'home.categories': 'Categories',
    'home.shortcuts': 'Shortcuts',

    'sentence.aria': 'Sentence built from pictograms',
    'sentence.placeholder': 'Tap pictograms to build a sentence…',
    'sentence.play': 'Play',
    'sentence.stop': 'Stop',
    'sentence.playAria': 'Play sentence',
    'sentence.stopAria': 'Stop reading',
    'sentence.last': 'Undo',
    'sentence.lastAria': 'Remove last pictogram',
    'sentence.clear': 'Clear',
    'sentence.clearAria': 'Clear the whole sentence',

    'category.notFound': 'Category not found',
    'category.back': '← Back',
    'category.home': '← Home',
    'category.count': '{n} pictograms',
    'category.empty': 'No pictograms in this category yet. Add yours in {settings}.',
    'category.empty.settings': 'Settings',

    'emotions.title': '💗 How do you feel?',
    'emotions.intro': 'Tap the emotion you feel right now.',

    'calm.title': 'Calm mode',
    'calm.intro': 'Tap the pictogram you need. Breathe slowly.',
    'calm.exit': 'Exit',
    'calm.exitAria': 'Leave calm mode',
    'calm.footer': 'I am here. Take your time.',
    'calm.cardsAria': 'Calm pictograms',
    'calm.breathAria': 'Breathing guide',
    'calm.breathIn': 'Breathe in…',
    'calm.breathOut': 'Breathe out…',
    'calm.rest.label': 'Rest',
    'calm.rest.phrase': 'I need to rest.',
    'calm.noise.label': 'Too much noise',
    'calm.noise.phrase': 'It is too noisy.',
    'calm.alone.label': 'Alone',
    'calm.alone.phrase': 'I want to be alone.',
    'calm.hug.label': 'Hug me',
    'calm.hug.phrase': 'Please hug me.',
    'calm.noTouch.label': "Don't touch me",
    'calm.noTouch.phrase': "Please don't touch me.",
    'calm.water.label': 'Water',
    'calm.water.phrase': 'I need water.',
    'calm.dim.label': 'Less light',
    'calm.dim.phrase': 'I need less light.',
    'calm.help.label': 'Help',
    'calm.help.phrase': 'I need help.',

    'routines.title': '🕒 Daily routines',
    'routines.intro': 'Check each step as you complete it. When the routine is done you get a reward.',
    'routines.timerTitle': '⏳ Visual timer',
    'routines.aria': 'Routine: {title}',
    'routines.resetAria': 'Reset routine {title}',
    'routines.reset': '↺ Reset',
    'routines.progress': '{done} of {total} steps completed',
    'routines.progressAria': 'Progress {pct}%',
    'routines.completed': 'You finished the routine!',

    'timer.aria': 'Visual timer',
    'timer.minLabel': '{n} min',
    'timer.running': 'Running',
    'timer.paused': 'Paused',
    'timer.done': 'Done!',
    'timer.start': 'Start',
    'timer.pause': 'Pause',
    'timer.reset': 'Reset',
    'timer.finishedSpeech': 'Time is up! Great job.',
    'timer.finishedReward': 'Time is up!',
    'timer.pageTitle': '⏳ Visual timer',
    'timer.pageIntro': 'Choose a duration and press start.',

    'stories.title': '📖 Social stories',
    'stories.intro': 'Pick a story to prepare for everyday situations.',
    'stories.openAria': 'Open story: {title}',
    'stories.steps': '{n} steps',
    'stories.back': '← Back',
    'stories.prev': '← Previous',
    'stories.next': 'Next →',
    'stories.finish': '🌟 Finish',
    'stories.stepCounter': 'Step {current} of {total}',
    'stories.completed': 'You finished the story!',

    'favorites.title': '⭐ Favorites',
    'favorites.count': '{n} saved pictograms.',
    'favorites.empty.prefix': 'No favorites yet. Tap the ☆ on any pictogram or go back to ',
    'favorites.empty.link': 'home',
    'favorites.empty.suffix': '.',
    'favorites.add': 'Add to favorites',
    'favorites.remove': 'Remove from favorites',

    'profile.title': '👤 Profiles',
    'profile.intro': 'Create profiles for different children. Each one keeps its own favorites and routines.',
    'profile.active': 'Active profile',
    'profile.activeBadge': 'active',
    'profile.activate': 'Activate',
    'profile.deleteAria': 'Delete profile {name}',
    'profile.add': 'Add profile',
    'profile.name': 'Name',
    'profile.color': 'Color',
    'profile.colorAria': 'Choose color {color}',
    'profile.create': '➕ Create profile',
    'profile.defaultName': 'My kiddo',

    'settings.title': '⚙️ Settings',
    'settings.intro': 'Customize the experience and add your own pictograms (parent/teacher mode).',
    'settings.appearance': 'Appearance',
    'settings.darkMode': '🌗 Dark mode',
    'settings.distractionFree': '🧘 Distraction-free mode',
    'settings.softSounds': '🔔 Soft reinforcement sounds',
    'settings.voice': 'Voice',
    'settings.uiLanguage': 'App language',
    'settings.voiceLanguage': 'Voice language',
    'settings.speed': 'Speed: {rate}x',
    'settings.custom': '👨‍👩‍👧 Custom pictograms',
    'settings.customIntro': 'Create pictograms with images and record a familiar voice.',
    'settings.label': 'Label *',
    'settings.phrase': 'Phrase',
    'settings.phrasePh': 'If empty, we will use the label',
    'settings.emoji': 'Emoji',
    'settings.category': 'Category',
    'settings.image': 'Image (optional)',
    'settings.imagePreview': 'preview',
    'settings.add': '➕ Add pictogram',
    'settings.record': '🎙️ Record',
    'settings.stop': '⏹️ Stop',
    'settings.play': '▶️',
    'settings.removeAudio': '🗑️ Audio',
    'settings.remove': 'Delete',
    'settings.micError': 'Could not access the microphone.',

    'reward.aria': 'Positive reinforcement',
    'reward.default': 'Great job!',
    'reward.subtitle': 'You have done a great job.',
    'reward.continue': 'Keep going!',
    'reward.msg.1': 'Great job!',
    'reward.msg.2': 'You did it!',
    'reward.msg.3': 'Awesome!',
    'reward.msg.4': 'Excellent!',
    'reward.msg.5': 'Well done!',

    'lang.es': 'Español',
    'lang.en': 'English',
    'voiceLang.esES': 'Español (Spain)',
    'voiceLang.esMX': 'Español (Mexico)',
    'voiceLang.enUS': 'English (US)',
    'voiceLang.enGB': 'English (UK)',
  },
} as const;

export type UIKey = keyof typeof UI['es'];

function format(str: string, vars?: Record<string, string | number>): string {
  if (!vars) return str;
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars[k] != null ? String(vars[k]) : `{${k}}`));
}

export function translate(locale: Locale, key: UIKey, vars?: Record<string, string | number>): string {
  const dict = UI[locale] || UI.es;
  const val = (dict as Record<string, string>)[key] ?? (UI.es as Record<string, string>)[key] ?? key;
  return format(val, vars);
}

/* =====================================================================
   Translations of data (categories, pictograms, routines, stories)
   ===================================================================== */
const CATEGORY_T: Record<string, { es: string; en: string }> = {
  needs:      { es: 'Necesidades', en: 'Needs' },
  emotions:   { es: 'Emociones',   en: 'Emotions' },
  activities: { es: 'Actividades', en: 'Activities' },
  people:     { es: 'Personas',    en: 'People' },
  places:     { es: 'Lugares',     en: 'Places' },
  food:       { es: 'Comida',      en: 'Food' },
  school:     { es: 'Escuela',     en: 'School' },
  routines:   { es: 'Rutinas',     en: 'Routines' },
};

/** Traducciones de pictogramas estándar por id. */
const PICTO_T: Record<number, { es: { label: string; phrase: string }; en: { label: string; phrase: string } }> = {
  1:  { es: { label: 'Agua',     phrase: 'Quiero agua' },        en: { label: 'Water',  phrase: 'I want water' } },
  2:  { es: { label: 'Baño',     phrase: 'Necesito ir al baño' },en: { label: 'Toilet', phrase: 'I need the toilet' } },
  3:  { es: { label: 'Ayuda',    phrase: 'Necesito ayuda' },     en: { label: 'Help',   phrase: 'I need help' } },
  4:  { es: { label: 'Dormir',   phrase: 'Quiero dormir' },      en: { label: 'Sleep',  phrase: 'I want to sleep' } },
  5:  { es: { label: 'Pausa',    phrase: 'Necesito una pausa' }, en: { label: 'Break',  phrase: 'I need a break' } },

  10: { es: { label: 'Feliz',     phrase: 'Estoy feliz' },     en: { label: 'Happy',   phrase: 'I feel happy' } },
  11: { es: { label: 'Triste',    phrase: 'Estoy triste' },    en: { label: 'Sad',     phrase: 'I feel sad' } },
  12: { es: { label: 'Enfadado',  phrase: 'Estoy enfadado' },  en: { label: 'Angry',   phrase: 'I feel angry' } },
  13: { es: { label: 'Cansado',   phrase: 'Estoy cansado' },   en: { label: 'Tired',   phrase: 'I feel tired' } },
  14: { es: { label: 'Nervioso',  phrase: 'Estoy nervioso' },  en: { label: 'Anxious', phrase: 'I feel anxious' } },
  15: { es: { label: 'Tranquilo', phrase: 'Estoy tranquilo' }, en: { label: 'Calm',    phrase: 'I feel calm' } },

  20: { es: { label: 'Jugar',  phrase: 'Quiero jugar' },  en: { label: 'Play',  phrase: 'I want to play' } },
  21: { es: { label: 'Pintar', phrase: 'Quiero pintar' }, en: { label: 'Paint', phrase: 'I want to paint' } },
  22: { es: { label: 'Música', phrase: 'Quiero música' }, en: { label: 'Music', phrase: 'I want music' } },
  23: { es: { label: 'Leer',   phrase: 'Quiero leer' },   en: { label: 'Read',  phrase: 'I want to read' } },

  30: { es: { label: 'Mamá',  phrase: 'Quiero a mamá' }, en: { label: 'Mom',     phrase: 'I want mom' } },
  31: { es: { label: 'Papá',  phrase: 'Quiero a papá' }, en: { label: 'Dad',     phrase: 'I want dad' } },
  32: { es: { label: 'Profe', phrase: 'Mi profe' },      en: { label: 'Teacher', phrase: 'My teacher' } },
  33: { es: { label: 'Amigo', phrase: 'Mi amigo' },      en: { label: 'Friend',  phrase: 'My friend' } },

  40: { es: { label: 'Casa',   phrase: 'Quiero ir a casa' },    en: { label: 'Home',   phrase: 'I want to go home' } },
  41: { es: { label: 'Parque', phrase: 'Quiero ir al parque' }, en: { label: 'Park',   phrase: 'I want to go to the park' } },
  42: { es: { label: 'Cole',   phrase: 'Voy al colegio' },      en: { label: 'School', phrase: 'I am going to school' } },
  43: { es: { label: 'Tienda', phrase: 'Vamos a la tienda' },   en: { label: 'Store',  phrase: 'Let’s go to the store' } },

  50: { es: { label: 'Pan',     phrase: 'Quiero pan' },     en: { label: 'Bread',  phrase: 'I want bread' } },
  51: { es: { label: 'Manzana', phrase: 'Quiero manzana' }, en: { label: 'Apple',  phrase: 'I want an apple' } },
  52: { es: { label: 'Leche',   phrase: 'Quiero leche' },   en: { label: 'Milk',   phrase: 'I want milk' } },
  53: { es: { label: 'Galleta', phrase: 'Quiero galleta' }, en: { label: 'Cookie', phrase: 'I want a cookie' } },

  60: { es: { label: 'Mochila', phrase: 'Mi mochila' },          en: { label: 'Backpack', phrase: 'My backpack' } },
  61: { es: { label: 'Lápiz',   phrase: 'Mi lápiz' },            en: { label: 'Pencil',   phrase: 'My pencil' } },
  62: { es: { label: 'Libro',   phrase: 'Mi libro' },            en: { label: 'Book',     phrase: 'My book' } },
  63: { es: { label: 'Recreo',  phrase: 'Es la hora del recreo' },en:{ label: 'Recess',   phrase: 'It is recess time' } },

  70: { es: { label: 'Despertar', phrase: 'Es hora de despertar' }, en: { label: 'Wake up',  phrase: 'It is time to wake up' } },
  71: { es: { label: 'Ducha',     phrase: 'Es hora de la ducha' },  en: { label: 'Shower',   phrase: 'It is shower time' } },
  72: { es: { label: 'Comer',     phrase: 'Es hora de comer' },     en: { label: 'Eat',      phrase: 'It is time to eat' } },
};

/* Routines */
const ROUTINE_T: Record<string, { es: string; en: string; steps: Record<string, { es: string; en: string }> }> = {
  morning: {
    es: 'Mañana en casa', en: 'Morning at home',
    steps: {
      m1: { es: 'Despertar',       en: 'Wake up' },
      m2: { es: 'Desayunar',       en: 'Have breakfast' },
      m3: { es: 'Lavarse dientes', en: 'Brush teeth' },
      m4: { es: 'Vestirse',        en: 'Get dressed' },
      m5: { es: 'Ir al colegio',   en: 'Go to school' },
    },
  },
  school: {
    es: 'En el colegio', en: 'At school',
    steps: {
      s1: { es: 'Saludar',  en: 'Say hello' },
      s2: { es: 'Aprender', en: 'Learn' },
      s3: { es: 'Recreo',   en: 'Recess' },
      s4: { es: 'Comer',    en: 'Eat' },
      s5: { es: 'Volver',   en: 'Go back' },
    },
  },
  night: {
    es: 'Noche tranquila', en: 'Calm night',
    steps: {
      n1: { es: 'Cenar',  en: 'Have dinner' },
      n2: { es: 'Ducha',  en: 'Shower' },
      n3: { es: 'Pijama', en: 'Pajamas' },
      n4: { es: 'Cuento', en: 'Storytime' },
      n5: { es: 'Dormir', en: 'Sleep' },
    },
  },
};

/* Stories */
const STORY_T: Record<string, {
  es: string; en: string;
  steps: { es: { title: string; text: string }; en: { title: string; text: string } }[];
}> = {
  doctor: {
    es: 'Voy al médico', en: 'I go to the doctor',
    steps: [
      { es: { title: 'Vamos en coche', text: 'Mamá o papá me llevan al médico en coche.' },
        en: { title: 'We go by car',   text: 'Mom or dad drives me to the doctor.' } },
      { es: { title: 'Llegamos',       text: 'Entramos en el centro y esperamos sentados.' },
        en: { title: 'We arrive',      text: 'We go in and wait seated.' } },
      { es: { title: 'El médico',      text: 'El médico es amable y me explica todo.' },
        en: { title: 'The doctor',     text: 'The doctor is kind and explains everything.' } },
      { es: { title: 'Me revisa',      text: 'Mira mis oídos, mi boca y escucha mi corazón.' },
        en: { title: 'Check-up',       text: 'They look at my ears and mouth and listen to my heart.' } },
      { es: { title: 'Lo he conseguido', text: '¡Muy bien! He sido valiente.' },
        en: { title: 'I did it!',         text: 'Great! I was brave.' } },
    ],
  },
  school: {
    es: 'Ir al colegio', en: 'Going to school',
    steps: [
      { es: { title: 'Mochila lista', text: 'Preparo mi mochila con mis cosas.' },
        en: { title: 'Backpack ready',text: 'I pack my backpack with my things.' } },
      { es: { title: 'Camino',        text: 'Voy al colegio caminando o en coche.' },
        en: { title: 'On the way',    text: 'I go to school by walk or by car.' } },
      { es: { title: 'Saludo',        text: 'Saludo a mi profe y a mis amigos.' },
        en: { title: 'Greetings',     text: 'I say hello to my teacher and friends.' } },
      { es: { title: 'Aprendo',       text: 'Aprendo cosas nuevas en clase.' },
        en: { title: 'I learn',       text: 'I learn new things in class.' } },
      { es: { title: 'Vuelvo a casa', text: 'Cuando termina, vuelvo a casa.' },
        en: { title: 'Going home',    text: 'When it is over, I go back home.' } },
    ],
  },
  teeth: {
    es: 'Lavarse los dientes', en: 'Brushing my teeth',
    steps: [
      { es: { title: 'Cojo el cepillo', text: 'Tomo mi cepillo de dientes.' },
        en: { title: 'Take the brush',  text: 'I pick up my toothbrush.' } },
      { es: { title: 'Pasta',           text: 'Pongo un poco de pasta de dientes.' },
        en: { title: 'Toothpaste',      text: 'I add a little toothpaste.' } },
      { es: { title: 'Cepillar',        text: 'Cepillo arriba y abajo, despacio.' },
        en: { title: 'Brush',           text: 'I brush up and down, slowly.' } },
      { es: { title: 'Enjuagar',        text: 'Me enjuago la boca con agua.' },
        en: { title: 'Rinse',           text: 'I rinse my mouth with water.' } },
      { es: { title: 'Limpios',         text: '¡Mis dientes están limpios!' },
        en: { title: 'All clean',       text: 'My teeth are clean!' } },
    ],
  },
  street: {
    es: 'Cruzar la calle', en: 'Crossing the street',
    steps: [
      { es: { title: 'Paro',         text: 'Me paro en la acera, no corro.' },
        en: { title: 'I stop',       text: 'I stop on the sidewalk, I don’t run.' } },
      { es: { title: 'Miro',         text: 'Miro a un lado y al otro.' },
        en: { title: 'I look',       text: 'I look both ways.' } },
      { es: { title: 'Espero',       text: 'Espero a que el semáforo esté en verde.' },
        en: { title: 'I wait',       text: 'I wait for the green light.' } },
      { es: { title: 'De la mano',   text: 'Cruzo de la mano de un adulto.' },
        en: { title: 'Hand in hand', text: 'I cross holding an adult’s hand.' } },
      { es: { title: 'Seguro',       text: 'Cruzo seguro y con calma.' },
        en: { title: 'Safe',         text: 'I cross safely and calmly.' } },
    ],
  },
  shop: {
    es: 'Ir al supermercado', en: 'Going to the supermarket',
    steps: [
      { es: { title: 'Lista',     text: 'Llevamos una lista con lo que necesitamos.' },
        en: { title: 'List',      text: 'We bring a list of what we need.' } },
      { es: { title: 'Carrito',   text: 'Cogemos un carrito o cesta.' },
        en: { title: 'Cart',      text: 'We take a cart or basket.' } },
      { es: { title: 'Compramos', text: 'Buscamos los productos sin correr.' },
        en: { title: 'Shopping',  text: 'We look for items calmly.' } },
      { es: { title: 'Pagar',     text: 'Esperamos en la fila y pagamos.' },
        en: { title: 'Pay',       text: 'We wait in line and pay.' } },
      { es: { title: 'Casa',      text: 'Volvemos a casa con la compra.' },
        en: { title: 'Home',      text: 'We go back home with the groceries.' } },
    ],
  },
};

/* =====================================================================
   Translation helpers for data
   ===================================================================== */
export function tCategory(c: Category, locale: Locale): string {
  return CATEGORY_T[c.id]?.[locale] || c.label;
}

export function tPicto(p: Pictogram, locale: Locale): { label: string; phrase: string } {
  const t = PICTO_T[p.id];
  if (t) return t[locale];
  // Personalizado: sin traducción
  return { label: p.label, phrase: p.phrase };
}

export function tRoutine(r: Routine, locale: Locale): string {
  return ROUTINE_T[r.id]?.[locale] || r.title;
}

export function tRoutineStep(routineId: string, step: RoutineStep, locale: Locale): string {
  return ROUTINE_T[routineId]?.steps?.[step.id]?.[locale] || step.label;
}

export function tStory(s: Story, locale: Locale): string {
  return STORY_T[s.id]?.[locale] || s.title;
}

export function tStoryStep(storyId: string, step: StoryStep, idx: number, locale: Locale): { title: string; text: string } {
  const ts = STORY_T[storyId]?.steps?.[idx]?.[locale];
  if (ts) return ts;
  return { title: step.title, text: step.text };
}

/* =====================================================================
   React hook
   ===================================================================== */
export interface I18n {
  locale: Locale;
  t: (key: UIKey, vars?: Record<string, string | number>) => string;
  tCategory: (c: Category) => string;
  tPicto: (p: Pictogram) => { label: string; phrase: string };
  tRoutine: (r: Routine) => string;
  tRoutineStep: (routineId: string, step: RoutineStep) => string;
  tStory: (s: Story) => string;
  tStoryStep: (storyId: string, step: StoryStep, idx: number) => { title: string; text: string };
}

export function useI18n(): I18n {
  const { settings } = useApp();
  // El idioma de la UI puede no estar guardado todavía: caemos al idioma del navegador / voz.
  const raw = (settings as { uiLanguage?: string }).uiLanguage || settings.language;
  const locale: Locale = raw === 'en' || raw === 'es' ? raw : localeFromLanguage(raw);
  return {
    locale,
    t: (key, vars) => translate(locale, key, vars),
    tCategory: (c) => tCategory(c, locale),
    tPicto: (p) => tPicto(p, locale),
    tRoutine: (r) => tRoutine(r, locale),
    tRoutineStep: (routineId, step) => tRoutineStep(routineId, step, locale),
    tStory: (s) => tStory(s, locale),
    tStoryStep: (storyId, step, idx) => tStoryStep(storyId, step, idx, locale),
  };
}
