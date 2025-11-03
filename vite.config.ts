import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [enhancedImages(), tailwindcss(), sveltekit()],
  assetsInclude: ['src/data/*.glb', 'src/data/*.pmtiles*', 'src/data/glyphs/**/*.pbf']
});
