import { prisma } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, params }) => {
	const session = await locals.auth();

	const slug = params.slug;
	if (!slug) {
		throw fail(400, { message: 'slug is required' });
	}

	const band = await prisma.band.findFirst({
		where: { slug },
		include: {
			members: { select: { id: true, displayName: true } },
			influences: true,
			owner: true
		}
	});

	if (!band) {
		throw fail(404, { message: 'Band not found' });
	}

	return {
		session,
		band
	};
};
