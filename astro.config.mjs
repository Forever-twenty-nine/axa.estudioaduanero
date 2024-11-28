// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';

// https://astro.build/config
export default defineConfig({
  base: '/axa.estudioaduanero', // Para GitHub Pages
  site: 'https://forever-twenty-nine.github.io/axa.estudioaduanero',
  integrations: [
    tailwind(),
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