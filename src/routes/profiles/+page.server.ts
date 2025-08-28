import { prisma } from '$lib/server/db';

export const load = async (event) => {
	const session = await event.locals.auth();

	const profiles = await prisma.profile.findMany({});

	return {
		session,
		profiles
	};
};
