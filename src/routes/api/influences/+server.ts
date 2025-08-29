import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals }) => {
	const q = (url.searchParams.get('q') ?? '').trim();
	if (q.length < 2) {
		return new Response(JSON.stringify([]), { headers: { 'content-type': 'application/json' } });
	}
	const items = await locals.prisma.influence.findMany({
		where: { name: { contains: q, mode: 'insensitive' } },
		select: { id: true, name: true, slug: true },
		orderBy: { name: 'asc' },
		take: 10
	});
	return new Response(JSON.stringify(items), { headers: { 'content-type': 'application/json' } });
};
