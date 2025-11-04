import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [enhancedImages(), tailwindcss(), sveltekit(), {
    name: 'configure-server',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.endsWith('.pmtiles.gz')) {
          res.setHeader('Content-Encoding', 'identity')
        }
        next()
      })
    }
  }],
  assetsInclude: ['src/data/*.glb', 'src/data/*.pmtiles*', 'src/data/glyphs/**/*.pbf']
});
