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
  kit: { adapter: adapter() }
};

export default config;
