// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  base: '/axa.estudioaduanero', // Para GitHub Pages
  site: 'https://forever-twenty-nine.github.io/axa.estudioaduanero',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    compress({
      // Opciones de configuración
      CSS: true,
      HTML: true,
      JavaScript: true,
      Image: true,
      SVG: true
    })
  ]
});