# PictoHabla · Comunicación Visual

App web accesible para niños con autismo: pictogramas con voz, rutinas, emociones, historias sociales, modo calma, refuerzo positivo y modo padres/profesores. Biligüe **español / inglés**. Instalable como **PWA** y funciona **sin conexión**.

## ✨ Funcionalidades

1. **Pictogramas con sonido** — Web Speech API + audios grabados por familiares.
2. **Categorías** — Necesidades, Emociones, Actividades, Personas, Lugares, Comida, Escuela, Rutinas.
3. **Barra de frases** — construye oraciones, reproduce, borra el último o todo.
4. **Rutinas guiadas** — pasos, progreso y refuerzo al completar.
5. **Emociones** — tarjetas grandes con audio.
6. **Modo calma / crisis** — pantalla rápida con pictogramas ("Necesito descansar", "Demasiado ruido", "Quiero estar solo", "Abrázame", "No me toques", agua, menos luz, ayuda) + guía visual de respiración 4-4 y voz más pausada.
7. **Temporizador visual** — presets 5/10/15 min con círculo de progreso.
8. **Favoritos** — persistente en `localStorage`.
9. **Modo padres/profesores** — crear pictogramas personalizados (texto, emoji, color, imagen, categoría).
10. **Grabación de voz** — `MediaRecorder` + dataURL.
11. **Historias sociales** — pasos visuales con navegación.
12. **Refuerzo positivo** — modal con mensajes amables.
13. **Modo sin distracciones** — oculta navegación y agranda los elementos.
14. **Perfiles múltiples** — cada uno con sus favoritos y rutinas.
15. **Accesibilidad** — `aria-labels`, foco visible, `prefers-reduced-motion`, contraste alto.
16. **Bilingüe ES/EN** — interfaz, datos (categorías, pictogramas, rutinas, historias) y voz independientes.
17. **Modo oscuro suave** — sin negro puro.
18. **Pantalla de inicio (Splash)** con música de fondo opcional.
19. **PWA instalable + offline-first** — service worker con `autoUpdate`, manifest, iconos maskable, runtime caching de imágenes y audio, aviso visual de "Lista sin conexión" y de "Nueva versión disponible".
20. **Navegación adaptable** — hamburguesa animada en móvil, navbar compacto en tablet (solo iconos), avatar de perfil flotante en escritorio.

## 🧱 Stack

- **Vite 5** + **React 18** + **TypeScript** (strict)
- **React Router 6** con `HashRouter` (despliegue estático sin reglas de servidor)
- **Tailwind CSS 3** con tema "soft" personalizado
- **vite-plugin-pwa** + **workbox-window** (service worker, manifest, runtime caching)
- **Web Speech API** (síntesis de voz)
- **MediaRecorder API** (grabación de audio)
- **localStorage** para todo el estado (favoritos, perfiles, ajustes, pictogramas personalizados, grabaciones)

### 🛠 Calidad de código

| Herramienta                 | Propósito                                          |
| --------------------------- | -------------------------------------------------- |
| **ESLint 10** (flat config) | Análisis estático TypeScript + React               |
| **Prettier 3**              | Formato consistente                                |
| **Husky 9**                 | Git hooks (`pre-commit`, `commit-msg`)             |
| **lint-staged**             | Lint + formato solo sobre archivos modificados     |
| **commitlint**              | Mensajes de commit en formato Conventional Commits |

## 🚀 Comandos

```bash
npm install
npm run dev           # http://localhost:5173
npm run build         # tsc -b && vite build  ->  dist/
npm run preview       # sirve dist/
npm run typecheck     # tsc --noEmit
npm run lint          # ESLint
npm run lint:fix      # ESLint con auto-fix
npm run format        # Prettier --write
npm run format:check  # Prettier --check (CI)
npm run check         # lint + typecheck + build (gate completo)
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
    Navbar.tsx, SplashScreen.tsx, PWAPrompt.tsx
    PictogramCard.tsx, SentenceBar.tsx, CategoryGrid.tsx
    RoutineCard.tsx, EmotionCard.tsx
    Timer.tsx, RewardModal.tsx, FavoriteButton.tsx
  routes/
    Home.tsx, Category.tsx, Routine.tsx, Emotions.tsx, Calm.tsx,
    TimerPage.tsx, Stories.tsx, Favorites.tsx, Settings.tsx, Profile.tsx
  styles/global.css
public/
  .nojekyll
  favicon.svg, icon-512.svg, icon-maskable.svg
.github/
  workflows/
    deploy.yml       # GitHub Pages (push a main)
    pr-checks.yml    # Gate de calidad en PRs (lint + typecheck + build)
eslint.config.js
.prettierrc.json
.editorconfig
commitlint.config.cjs
.husky/
  pre-commit         # lint-staged + typecheck
  commit-msg         # commitlint
```

## 🌍 Internacionalización

- `settings.uiLanguage`: `'es' | 'en'` — controla todos los textos de la interfaz **y** las etiquetas/frases de los pictogramas, categorías, rutinas e historias estándar.
- `settings.language`: BCP-47 (`es-ES`, `es-MX`, `en-US`, `en-GB`) — voz de la Web Speech API, independiente de la UI.
- Detección inicial automática vía `navigator.language`.
- Los pictogramas creados por el usuario conservan su texto original (no se traducen).

## 🔒 Privacidad

Todos los datos (perfiles, favoritos, pictogramas personalizados, audios grabados) se almacenan **en el navegador** mediante `localStorage`. No hay backend ni telemetría.

## 📱 PWA / instalación offline

La app es una **Progressive Web App** instalable:

- `vite-plugin-pwa` con `registerType: 'autoUpdate'`.
- Manifest con `name`, `short_name`, `theme_color #A7D8FF`, `display: standalone` y tres iconos (`favicon.svg`, `icon-512.svg`, `icon-maskable.svg`).
- Precache de todos los assets (`js/css/html/svg/png/woff2`).
- Runtime caching `CacheFirst` para imágenes y audio (200 entradas, 60 días).
- `navigateFallback: 'index.html'` para que las rutas `#/...` funcionen offline.
- Componente `PWAPrompt` con dos avisos:
  - 📴 **"Listo para usar sin conexión"** tras el primer registro (auto-cierre 4 s).
  - 🔄 **"Nueva versión disponible"** con botones _Actualizar / Más tarde_.

### Probar localmente

```bash
npm run build
npm run preview
# DevTools → Application → Service Workers (debe estar activo)
# DevTools → Network → Offline → recarga: la app sigue funcionando
```

En Chrome/Edge aparecerá el botón **Instalar** en la barra de direcciones. En Android se puede añadir a la pantalla de inicio.

## 🚢 Despliegue en GitHub Pages

El repositorio incluye dos workflows:

- **[deploy.yml](.github/workflows/deploy.yml)** — se ejecuta en cada push a `main`.
- **[pr-checks.yml](.github/workflows/pr-checks.yml)** — gate de calidad en cada PR (`lint`, `typecheck`, `build`).

### Pasos del deploy

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
- El **service worker** sólo se registra en `npm run build` / `preview`, no en `dev`.
- El **drawer móvil** y el **avatar flotante** se montan vía `createPortal(..., document.body)` para escapar del `backdrop-blur` del header (que crea un nuevo containing block para descendientes `fixed`).
