import { prisma } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	const session = await locals.auth();

	if (session) {
		const profile = await prisma.profile.findFirst({
			where: { userId: session.user?.id ?? '' }
		});

		if (!profile) {
			const user = await prisma.user.findFirst({
				where: { id: session.user?.id ?? '' }
			});

			if (user) {
				const updated = await prisma.profile.create({
					data: {
						displayName: user.email.split('@')[0] ?? user.name ?? 'New User',
						user: { connect: { id: user.id } },
						avatarUrl: user.image ?? undefined
					}
				});
			}
		}
	}

	return {
		session
	};
};
