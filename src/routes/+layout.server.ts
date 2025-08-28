import { prisma } from '$lib/server/db';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, locals }) => {
	const session = await locals.auth();

	// console.info("🚀 ~ load ~ session:", session)
	if (session) {
		const profile = await prisma.profile.findFirst({
			where: { userId: session.user?.id ?? '' }
		});

		// console.info("🚀 ~ load ~ profile:", profile)
		if (!profile) {
			const user = await prisma.user.findFirst({
				where: { id: session.user?.id ?? '' }
			});
			// console.info("🚀 ~ load ~ user:", user)

			if (user) {
				const updated = await prisma.profile.create({
					data: {
						displayName: user.email.split('@')[0] ?? user.name ?? 'New User',
						user: { connect: { id: user.id } }
					}
				});
				// console.info("🚀 ~ load ~ updated:", updated)
			}
		}
	}

	return {
		session
	};
};
