import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    base: '/atrv/',
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.js',
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        devOptions: {
          enabled: true,
        },
        injectManifest: {
          injectionPoint: undefined,
        },
        includeAssets: ['logo.png'],
        manifest: {
          name: 'Atoyac Radio Veracruz',
          short_name: 'ATRV',
          description: 'La RADIO que promueve el turismo, la cultura, la educación, la historia y resaltar los valores del ser humano, para mantener las buenas relaciones entre las personas y su comunidad.',
          theme_color: '#faeb00',
          background_color: '#f45e03',
          display: 'standalone',
          dir: 'auto',
          orientation: 'any',
          scope: '/',
          start_url: '/',
          id: 'ATRV',
          lang: 'es',
          categories: ['entertainment', 'music', 'news', 'social'],
          icons: [
            {
              src: 'logo.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'logo.png',
              sizes: '512x512',
              type: 'image/png'
            },
            {
              src: 'logo.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
