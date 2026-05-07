import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages la app vive en https://<usuario>.github.io/pictohabla/
// Para `npm run dev` queremos base '/'.
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  const base = env.GITHUB_ACTIONS ? '/pictohabla/' : '/';
  return {
    base,
    plugins: [react()],
    server: { port: 5173, open: true },
  };
});
