# Pictos · Comunicación Visual

App web accesible para niños con autismo: pictogramas con voz, rutinas, emociones, historias sociales, refuerzo positivo y modo padres/profesores.

## Stack
- Vite + React + React Router
- JavaScript + CSS Modules
- Web Speech API (síntesis de voz)
- LocalStorage (favoritos, perfiles, ajustes, pictogramas personalizados, grabaciones)

## Comandos
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Estructura
```
src/
  App.jsx
  main.jsx
  router.jsx
  context/AppContext.jsx
  hooks/{useSpeech,useLocalStorage}.js
  data/{pictograms,routines,stories}.js
  components/{Navbar,PictogramCard,SentenceBar,CategoryGrid,RoutineCard,
              EmotionCard,Timer,RewardModal,FavoriteButton}.jsx
  routes/{Home,Category,Routine,Emotions,Stories,Favorites,Settings,Profile}.jsx
  styles/global.css
```

## Funcionalidades
1. **Pictogramas con sonido** — Web Speech API + audios grabados.
2. **Categorías** — Necesidades, Emociones, Actividades, Personas, Lugares, Comida, Escuela, Rutinas.
3. **Barra de frases** — Reproducir / Borrar último / Borrar todo.
4. **Rutinas** — Pasos, progreso, refuerzo al completar, reinicio.
5. **Emociones** — Tarjetas grandes con audio.
6. **Temporizador visual** — Presets 5/10/15 min con círculo de progreso.
7. **Favoritos** — Persistente en LocalStorage.
8. **Modo padres** — Crear pictogramas personalizados (texto, emoji, color, imagen, categoría).
9. **Grabación de voz** — MediaRecorder, guardado como dataURL.
10. **Historias sociales** — Pasos visuales con navegación.
11. **Refuerzo positivo** — RewardModal con mensajes amables.
12. **Modo sin distracciones** — Oculta navegación y agranda elementos.
13. **Perfiles** — Múltiples perfiles persistidos.
14. **Accesibilidad** — aria-labels, foco visible, prefers-reduced-motion, contraste.
15. **Multiidioma básico** — Selector de idioma para Web Speech API.
16. **Modo oscuro suave** — No usa negro puro.

## Notas
- La app usa `HashRouter` para facilitar despliegue estático (GitHub Pages, Azure Static Web Apps).
- Todos los datos personales se quedan en el navegador (LocalStorage).
