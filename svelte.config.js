import adapter from '@sveltejs/adapter-cloudflare'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		typescript: {
			config: (tsconfig) => {
				tsconfig.include = [
					...(tsconfig.include ?? []),
					...['src/**/*.d.ts', 'src/**/*.ts', 'src/**/*.svelte']
				];

				return tsconfig;
			}
		}
	}
};
export default config;
