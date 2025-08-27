import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/db';

export const GET: RequestHandler = async ({ url }) => {
	const q = (url.searchParams.get('q') ?? '').trim();
	if (q.length < 2) {
		return new Response(JSON.stringify([]), { headers: { 'content-type': 'application/json' } });
	}
	const items = await prisma.influence.findMany({
		where: { name: { contains: q, mode: 'insensitive' } },
		select: { id: true, name: true, slug: true },
		orderBy: { name: 'asc' },
		take: 10
	});
	return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json' } });
};
