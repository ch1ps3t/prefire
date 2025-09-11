import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	compilerOptions: { runes: true }, // Enable Svelte 5 runes
	kit: {
		adapter: adapter(),
		alias: {
			'@': './src',
			'@/*': './src/lib/*'
		}
	}
};

export default config;
