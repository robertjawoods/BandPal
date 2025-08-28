import { seedBands } from './seedBands.ts';
import { seedInfluences } from './seedInfluences.ts';
import { seedProfiles } from './seedProfiles.ts';

async function main() {
	console.log('Seeding influences...');

	await seedInfluences();
	await seedProfiles();
	await seedBands();

	console.log('Seeding completed.');
}

await main();
