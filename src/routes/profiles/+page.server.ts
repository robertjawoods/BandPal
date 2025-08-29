export const load = async ({locals}) => {
	const session = await locals.auth();

	const profiles = await locals.prisma.profile.findMany({});

	return {
		session,
		profiles
	};
};
