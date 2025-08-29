import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { slugify } from '../../src/lib/utils/slugify.ts';

export const prisma = new PrismaClient();

const propositions = [
    'The', 'A', 'An', 'Some', 'Any', 'Every', 'No', 'This', 'That', 'Those',
    'Our', 'Your', 'His', 'Her', 'Its', 'Their', 'My', 'Our', 'Each', 'All',
    'Many', 'Few', 'Several', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',
    'Eight', 'Nine', 'Ten', 'First', 'Second', 'Third', 'Last', 'Next', 'Other', 'Another',
    'Such', 'Which', 'Whose', 'What', 'Whatever', 'Whoever', 'Whichever', 'Neither', 'Either', 'Both'
];
const adjectives = [
    'Blue', 'Fuzzy', 'Electric', 'Silent', 'Wild', 'Golden', 'Broken', 'Loud', 'Cosmic', 'Velvet',
    'Crimson', 'Neon', 'Rapid', 'Gentle', 'Mighty', 'Shy', 'Lucky', 'Brave', 'Clever', 'Funky',
    'Silver', 'Amber', 'Icy', 'Fiery', 'Shadowy', 'Radiant', 'Glowing', 'Stormy', 'Sunny', 'Frosty',
    'Dizzy', 'Groovy', 'Jazzy', 'Sandy', 'Rocky', 'Breezy', 'Chilly', 'Daring', 'Epic', 'Fierce',
    'Giant', 'Happy', 'Jolly', 'Kind', 'Lively', 'Mellow', 'Noble', 'Odd', 'Proud', 'Quick',
    'Royal', 'Sassy', 'Tiny', 'Unique', 'Vivid', 'Witty', 'Young', 'Zany', 'Ancient', 'Bold',
    'Calm', 'Dapper', 'Eager', 'Fancy', 'Gleaming', 'Humble', 'Inventive', 'Jazzy', 'Keen', 'Lucky',
    'Magnetic', 'Nimble', 'Optimistic', 'Playful', 'Quirky', 'Rustic', 'Savvy', 'Trendy', 'Upbeat', 'Vast',
    'Whimsical', 'Zealous', 'Agile', 'Blissful', 'Cheerful', 'Daring', 'Earnest', 'Fearless', 'Gallant', 'Heroic',
    'Intrepid', 'Jubilant', 'Kingly', 'Luminous', 'Majestic', 'Nifty', 'Opulent', 'Plucky', 'Quaint', 'Resilient'
];
const nouns = [
    'Tigers', 'Dreams', 'Wolves', 'Rockets', 'Pirates', 'Giants', 'Stars', 'Riders', 'Echoes', 'Dragons',
    'Owls', 'Rays', 'Shadows', 'Knights', 'Foxes', 'Wizards', 'Bears', 'Vultures', 'Ghosts', 'Rangers',
    'Lions', 'Eagles', 'Falcons', 'Sharks', 'Panthers', 'Crows', 'Hawks', 'Bulls', 'Cubs', 'Doves',
    'Elves', 'Goblins', 'Titans', 'Vikings', 'Warriors', 'Zephyrs', 'Yaks', 'Yetis', 'Unicorns', 'Trolls',
    'Sprites', 'Sirens', 'Rebels', 'Nomads', 'Mystics', 'Legends', 'Jesters', 'Hunters', 'Gladiators', 'Falcons',
    'Dancers', 'Cyclones', 'Banshees', 'Avengers', 'Bandits', 'Captains', 'Dukes', 'Emperors', 'Frogs', 'Geniuses',
    'Heroes', 'Imps', 'Jaguars', 'Kings', 'Llamas', 'Mages', 'Ninjas', 'Oracles', 'Paladins', 'Queens',
    'Ravens', 'Samurai', 'Titans', 'Unicorns', 'Valkyries', 'Witches', 'Xenons', 'Yodelers', 'Zebras', 'Artists',
    'Bards', 'Clerics', 'Druids', 'Engineers', 'Fencers', 'Geeks', 'Hackers', 'Inventors', 'Jugglers', 'Knaves'
];

export const seedBands = async () => {
    // Get all influence IDs and all profiles
    const allInfluences = await prisma.influence.findMany({ select: { id: true } });
    const allProfiles = await prisma.profile.findMany({ select: { id: true } });
    const allSlugs = await prisma.band.findMany({ select: { slug: true } });
    const existingSlugs = new Set(allSlugs.map(b => b.slug));
    if (allProfiles.length < 10) throw new Error('Not enough profiles to assign unique owners.');

    type BandData = {
        name: string;
        slug: string;
        description: string;
        ownerId: string;
        lookingForMembers: boolean;
    };
    type BandInfluence = { influenceId: string };
    type BandMember = { memberId: string };

    const bandsData: BandData[] = [];
    const bandInfluencesData: BandInfluence[][] = [];
    const bandMembersData: BandMember[][] = [];

    let bandCount = 0, bandLimit = 50;
    while (bandsData.length < bandLimit) {
        const name = `${faker.helpers.arrayElement(propositions)} ${faker.helpers.arrayElement(adjectives)} ${faker.helpers.arrayElement(nouns)}`;
        const slug = slugify(name);
        if (existingSlugs.has(slug)) continue;
        existingSlugs.add(slug);
        const description = faker.lorem.sentence();
        const shuffledInfluences = faker.helpers.shuffle(allInfluences);
        const selectedInfluences = shuffledInfluences.slice(0, 10);
        const owner = allProfiles[bandCount % allProfiles.length];
        const shuffledMembers = faker.helpers.shuffle(allProfiles.filter((p) => p.id !== owner.id));
        const memberIds = [owner.id, ...shuffledMembers.slice(0, 2).map((p) => p.id)];
        const lookingForMembers = faker.datatype.boolean();

        bandsData.push({
            name,
            slug,
            description,
            ownerId: owner.id,
            lookingForMembers
        });

        bandInfluencesData.push(selectedInfluences.map((inf) => ({ influenceId: inf.id })));
        bandMembersData.push(memberIds.map((id) => ({ memberId: id })));
        bandCount++;
    }

    let i = 0;
    const batchSize = 200;

    while (i < bandsData.length) {
        const batchBands = bandsData.slice(i, i + batchSize);

        await prisma.$transaction(async (tx) => {
            const createdBands = await tx.band.createMany({ data: batchBands });
            const allCreatedBands = await tx.band.findMany({ where: { slug: { in: batchBands.map(b => b.slug) } }, select: { id: true, slug: true } });

            // Map slugs to ids
            const slugToId = Object.fromEntries(allCreatedBands.map(b => [b.slug, b.id]));

            // Now create band-influence and band-member relations
            type BandInfluenceRow = { bandId: string; influenceId: string };
            type BandMemberRow = { bandId: string; profileId: string };
            const bandInfluenceRows: BandInfluenceRow[] = [];
            const bandMemberRows: BandMemberRow[] = [];
            for (let i = 0; i < batchBands.length; i++) {
                const bandId = slugToId[batchBands[i].slug];
                for (const { influenceId } of bandInfluencesData[i]) {
                    bandInfluenceRows.push({ bandId, influenceId });
                }
                for (const { memberId } of bandMembersData[i]) {
                    bandMemberRows.push({ bandId, profileId: memberId });
                }
            }

            // Insert band-influences (BandInfluence join table)
            if (bandInfluenceRows.length > 0) {
                await tx.$executeRawUnsafe(`
				INSERT INTO "_BandToInfluence" ("A", "B")
				VALUES ${bandInfluenceRows.map(r => `('${r.bandId}', '${r.influenceId}')`).join(', ')}
			`);
            }
            // Insert band-members (BandMembers join table)
            if (bandMemberRows.length > 0) {
                await tx.$executeRawUnsafe(`
				INSERT INTO "_BandMembers" ("A", "B")
				VALUES ${bandMemberRows.map(r => `('${r.bandId}', '${r.profileId}')`).join(', ')}
			`);
            }
        });

        console.log(`Inserted batch of ${batchSize} bands up to index ${i + batchSize}`);
        i += batchSize;
    }
};
