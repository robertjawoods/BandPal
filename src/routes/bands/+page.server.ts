import { slugify } from '$lib';
import { prisma } from '$lib/server/db';
import type { Actions } from './$types';

export const load = async (event) => {
	const session = await event.locals.auth();

	const bands = await prisma.band.findMany({
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
	createBand: async (event) => {
		const session = await event.locals.auth();
		if (!session) {
			return { success: false, message: 'Not authenticated' };
		}

		const formData = await event.request.formData();
		const bandName = formData.get('bandName');

		if (!bandName || typeof bandName !== 'string') {
			return { success: false, message: 'Invalid band name' };
		}

		// Here you would typically save the new band to your database

		if (!session.user?.id) {
			return { success: false, message: 'User ID not found in session' };
		}

		const profile = await prisma.profile.findFirst({
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

		await prisma.band.create({
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
