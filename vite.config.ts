import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  resolve: {
    alias: {
      $lib: './src/lib',
      $components: './src/components',
      $images: './src/images',
      $data: './src/data'
    }
  },
  assetsInclude: ['src/data/*.pmtiles', 'src/data/glyphs/**/*.pbf']
});
