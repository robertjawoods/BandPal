export function slugify(input: string): string {
	return input
		.toLowerCase()
		.trim()
		.replace(/[’'’"]/g, '') // strip quotes
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-') // collapse non-word to hyphen
		.replace(/^-+|-+$/g, ''); // trim hyphens
}
