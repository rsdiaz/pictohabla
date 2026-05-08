import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// En GitHub Pages la app vive en https://<usuario>.github.io/pictohabla/
// Para `npm run dev` queremos base '/'.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const base = env.GITHUB_ACTIONS ? '/pictohabla/' : '/';
  return {
    base,
    plugins: [
      tailwindcss(),
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icon-512.svg', 'icon-maskable.svg'],
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico,webp,woff2}'],
          navigateFallback: 'index.html',
          runtimeCaching: [
            {
              urlPattern: ({ request }) =>
                request.destination === 'image' || request.destination === 'audio',
              handler: 'CacheFirst',
              options: {
                cacheName: 'pictohabla-media',
                expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 60 },
              },
            },
          ],
        },
        manifest: {
          name: 'PictoHabla · Comunicación Visual',
          short_name: 'PictoHabla',
          description:
            'Pictogramas con voz, rutinas, emociones e historias sociales para apoyar la comunicación.',
          theme_color: '#A7D8FF',
          background_color: '#FFF8F0',
          display: 'standalone',
          orientation: 'portrait',
          lang: 'es',
          start_url: '.',
          scope: '.',
          icons: [
            { src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' },
            { src: 'icon-512.svg', sizes: '192x192 512x512', type: 'image/svg+xml' },
            { src: 'icon-maskable.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'maskable' },
          ],
        },
      }),
    ],
    server: { port: 5173, open: true },
  };
});
