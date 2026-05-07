# PictoHabla · Comunicación Visual

App web accesible para niños con autismo: pictogramas con voz, rutinas, emociones, historias sociales, refuerzo positivo y modo padres/profesores. Bilingüe **español / inglés**.

## ✨ Funcionalidades

1. **Pictogramas con sonido** — Web Speech API + audios grabados por familiares.
2. **Categorías** — Necesidades, Emociones, Actividades, Personas, Lugares, Comida, Escuela, Rutinas.
3. **Barra de frases** — construye oraciones, reproduce, borra el último o todo.
4. **Rutinas guiadas** — pasos, progreso y refuerzo al completar.
5. **Emociones** — tarjetas grandes con audio.
6. **Temporizador visual** — presets 5/10/15 min con círculo de progreso.
7. **Favoritos** — persistente en `localStorage`.
8. **Modo padres/profesores** — crear pictogramas personalizados (texto, emoji, color, imagen, categoría).
9. **Grabación de voz** — `MediaRecorder` + dataURL.
10. **Historias sociales** — pasos visuales con navegación.
11. **Refuerzo positivo** — modal con mensajes amables.
12. **Modo sin distracciones** — oculta navegación y agranda los elementos.
13. **Perfiles múltiples** — cada uno con sus favoritos y rutinas.
14. **Accesibilidad** — `aria-labels`, foco visible, `prefers-reduced-motion`, contraste alto.
15. **Bilingüe ES/EN** — interfaz, datos (categorías, pictogramas, rutinas, historias) y voz independientes.
16. **Modo oscuro suave** — sin negro puro.
17. **Pantalla de inicio (Splash)** con música de fondo opcional.

## 🧱 Stack

- **Vite 5** + **React 18** + **TypeScript** (strict)
- **React Router 6** con `HashRouter` (despliegue estático sin reglas de servidor)
- **Tailwind CSS 3** con tema "soft" personalizado
- **Web Speech API** (síntesis de voz)
- **MediaRecorder API** (grabación de audio)
- **localStorage** para todo el estado (favoritos, perfiles, ajustes, pictogramas personalizados, grabaciones)

## 🚀 Comandos

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build  ->  dist/
npm run preview    # sirve dist/
npm run typecheck
```

## 📁 Estructura

```
src/
  main.tsx, App.tsx, router.tsx
  context/AppContext.tsx
  i18n/index.ts                 # diccionario UI + traducción de datos
  hooks/{useSpeech,useLocalStorage}.ts
  data/{pictograms,routines,stories}.ts
  components/
    Navbar.tsx, SplashScreen.tsx
    PictogramCard.tsx, SentenceBar.tsx, CategoryGrid.tsx
    RoutineCard.tsx, EmotionCard.tsx
    Timer.tsx, RewardModal.tsx, FavoriteButton.tsx
  routes/
    Home.tsx, Category.tsx, Routine.tsx, Emotions.tsx,
    Stories.tsx, Favorites.tsx, Settings.tsx, Profile.tsx
  styles/global.css
public/.nojekyll
.github/workflows/deploy.yml    # GitHub Pages
```

## 🌍 Internacionalización

- `settings.uiLanguage`: `'es' | 'en'` — controla todos los textos de la interfaz **y** las etiquetas/frases de los pictogramas, categorías, rutinas e historias estándar.
- `settings.language`: BCP-47 (`es-ES`, `es-MX`, `en-US`, `en-GB`) — voz de la Web Speech API, independiente de la UI.
- Detección inicial automática vía `navigator.language`.
- Los pictogramas creados por el usuario conservan su texto original (no se traducen).

## 🔒 Privacidad

Todos los datos (perfiles, favoritos, pictogramas personalizados, audios grabados) se almacenan **en el navegador** mediante `localStorage`. No hay backend ni telemetría.

## 🚢 Despliegue en GitHub Pages

El repositorio incluye un workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) que se ejecuta en cada push a `main`:

1. `npm ci` + `npm run build`
2. Copia `dist/index.html` a `dist/404.html` (fallback de rutas)
3. Publica `dist/` con `actions/deploy-pages`

[vite.config.ts](vite.config.ts) usa `base: '/pictohabla/'` cuando detecta `GITHUB_ACTIONS=true`, y `'/'` en desarrollo local.

### Pasos

```powershell
git init
git add .
git commit -m "init pictohabla"
git branch -M main
git remote add origin https://github.com/<TU_USUARIO>/pictohabla.git
git push -u origin main
```

Después en GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

URL final: `https://<TU_USUARIO>.github.io/pictohabla/`

> Si cambias el nombre del repositorio, actualiza la cadena `'/pictohabla/'` en [vite.config.ts](vite.config.ts).

## 🧠 Notas técnicas

- **HashRouter** evita configurar rewrites en el servidor estático.
- El audio del Splash se inicializa **dentro de un gesto del usuario** (requisito de los navegadores para `AudioContext`).
- TypeScript estricto: las claves de traducción se validan en tiempo de compilación (`UIKey = keyof typeof UI['es']`).
