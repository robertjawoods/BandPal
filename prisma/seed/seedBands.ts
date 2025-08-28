import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { slugify } from '../../src/lib/utils/slugify.ts';

export const prisma = new PrismaClient();

const propositions = ['The', 'A', 'An', 'Some', 'Any', 'Every', 'No', 'This', 'That', 'Those'];
const adjectives = [
	'Blue',
	'Fuzzy',
	'Electric',
	'Silent',
	'Wild',
	'Golden',
	'Broken',
	'Loud',
	'Cosmic',
	'Velvet',
	'Crimson',
	'Neon',
	'Rapid',
	'Gentle',
	'Mighty',
	'Shy',
	'Lucky',
	'Brave',
	'Clever',
	'Funky'
];
const nouns = [
	'Tigers',
	'Dreams',
	'Wolves',
	'Rockets',
	'Pirates',
	'Giants',
	'Stars',
	'Riders',
	'Echoes',
	'Dragons',
	'Owls',
	'Rays',
	'Shadows',
	'Knights',
	'Foxes',
	'Wizards',
	'Bears',
	'Vultures',
	'Ghosts',
	'Rangers'
];

export const seedBands = async () => {
	// Get all influence IDs and all profiles
	const allInfluences = await prisma.influence.findMany({ select: { id: true } });
	const allProfiles = await prisma.profile.findMany({ select: { id: true } });
	if (allProfiles.length < 10) throw new Error('Not enough profiles to assign unique owners.');
	for (let i = 0; i < 10; i++) {
		// Generate band name
		const name = `${faker.helpers.arrayElement(propositions)} ${faker.helpers.arrayElement(adjectives)} ${faker.helpers.arrayElement(nouns)}`;
		const slug = slugify(name);
		const description = faker.lorem.sentence();
		// Pick 10 random influences
		const shuffledInfluences = faker.helpers.shuffle(allInfluences);
		const selectedInfluences = shuffledInfluences.slice(0, 10);
		// Assign unique owner
		const owner = allProfiles[i];
		// Pick 2 more random members (distinct, including owner)
		const shuffledMembers = faker.helpers.shuffle(allProfiles.filter((p) => p.id !== owner.id));
		const memberIds = [owner.id, ...shuffledMembers.slice(0, 2).map((p) => p.id)];
		// Randomize lookingForMembers
		const lookingForMembers = faker.datatype.boolean();
		// Create band
		console.log(
			`Creating band: ${name} (Owner: ${owner.id}, Members: ${memberIds.join(', ')}, Looking: ${lookingForMembers})`
		);
		await prisma.band.upsert({
			where: { slug },
			update: {
				name,
				description,
				ownerId: owner.id,
				lookingForMembers,
				influences: { set: selectedInfluences.map((inf) => ({ id: inf.id })) },
				members: { set: memberIds.map((id) => ({ id })) }
			},
			create: {
				name,
				slug,
				description,
				ownerId: owner.id,
				lookingForMembers,
				influences: { connect: selectedInfluences.map((inf) => ({ id: inf.id })) },
				members: { connect: memberIds.map((id) => ({ id })) }
			},
			include: { influences: true, members: true }
		});
	}
};
