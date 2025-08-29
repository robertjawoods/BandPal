import { error } from '@sveltejs/kit';

export const load = async ({ locals, params }) => {
	const session = await locals.auth();
	const profileId = params.id;
	if (!profileId) {
		throw error(400, { message: 'Profile ID is required' });
	}

	const profile = await locals.prisma.profile.findFirst({
		where: { id: profileId },
		include: {
			bands: true,
			influences: true
		}
	});

	if (!profile) {
		throw error(404, { message: 'Profile not found' });
	}

	return {
		session,
		profile
	};
};
