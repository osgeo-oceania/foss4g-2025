import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config = {
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx'],
      layout: './src/lib/svx-layout.svelte'
    })
  ],
  extensions: ['.svelte', '.svx'],
  kit: { adapter: adapter() }
};

export default config;
