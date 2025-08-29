import { skeleton } from '@skeletonlabs/skeleton/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/@skeletonlabs/skeleton/tailwind.css'
	],
	theme: {
		extend: {},
	},
	plugins: [
		skeleton(),
		require('@tailwindcss/forms'),
		require('@tailwindcss/typography')
	],
};
