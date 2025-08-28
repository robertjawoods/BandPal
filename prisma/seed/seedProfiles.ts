import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const prisma = new PrismaClient();

export const seedProfiles = async () => {
	// Get all influence IDs
	const allInfluences = await prisma.influence.findMany({ select: { id: true } });
	for (let i = 0; i < 10; i++) {
		const email = faker.internet.email();
		const displayName = faker.person.firstName() + ' ' + faker.person.lastName();
		const bio = faker.lorem.sentence();
		const avatarUrl = faker.image.avatar();
		const name = faker.person.fullName();
		const image = faker.image.avatar();

		// Pick 10 random influences
		const shuffled = faker.helpers.shuffle(allInfluences);
		const selectedInfluences = shuffled.slice(0, 10);

		// Upsert user by email
		console.log(`Upserting user: ${email}`);
		await prisma.user.upsert({
			where: { email },
			update: {
				name,
				image,
				Profile: {
					update: {
						displayName,
						bio,
						avatarUrl,
						influences: {
							set: selectedInfluences.map((inf) => ({ id: inf.id }))
						}
					}
				}
			},
			create: {
				email,
				name,
				image,
				Profile: {
					create: {
						displayName,
						bio,
						avatarUrl,
						influences: {
							connect: selectedInfluences.map((inf) => ({ id: inf.id }))
						}
					}
				}
			},
			include: { Profile: true }
		});
	}
};
