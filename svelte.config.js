import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { join } from 'path';

const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'],
      layout: join(process.cwd(), './src/lib/svx-layout.svelte')
    })
  ],
  extensions: ['.svelte', '.svx'],
  kit: {
    adapter: adapter(),
    paths: {
      base: process.env.BASE_PATH ?? '',
      assets: process.env.BASE_PATH ?? ''
    },
    prerender: {
      handleHttpError: 'warn'
    },
    alias: {
      $lib: 'src/lib',
      $components: 'src/components',
      $images: 'src/images',
      $data: 'src/data'
    }
  }
};

export default config;
