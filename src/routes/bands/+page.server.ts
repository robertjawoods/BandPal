import { slugify } from '$lib';
import type { Actions } from './$types';

export const load = async ({locals}) => {
	const session = await locals.auth();

	const bands = await locals.prisma.band.findMany({
		include: {
			influences: true
		}
	});

	return {
		session,
		bands
	};
};

export const actions = {
	createBand: async ({request, locals}) => {
		const session = await locals.auth();
		if (!session) {
			return { success: false, message: 'Not authenticated' };
		}

		const formData = await request.formData();
		const bandName = formData.get('bandName');

		if (!bandName || typeof bandName !== 'string') {
			return { success: false, message: 'Invalid band name' };
		}

		// Here you would typically save the new band to your database

		if (!session.user?.id) {
			return { success: false, message: 'User ID not found in session' };
		}

		const profile = await locals.prisma.profile.findFirst({
			where: {
				userId: session.user.id
			}
		});

		if (!profile) {
			return { success: false, message: 'Profile not found for user' };
		}

		if (!profile.id) {
			return { success: false, message: 'Profile ID not found' };
		}

		await locals.prisma.band.create({
			data: {
				name: bandName,
				owner: { connect: { id: profile.id } },
				slug: slugify(bandName),
				members: {
					connect: { id: profile.id }
				}
			}
		});

		return { success: true, message: `Band "${bandName}" created successfully` };
	}
} satisfies Actions;
