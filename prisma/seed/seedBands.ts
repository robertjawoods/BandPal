import { PrismaClient, Prisma, Band, User } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { pickRandom, pickRandomMultiple } from "./seedHelpers";

export const seedBands = async (prisma: PrismaClient, users: User[]): Promise<Band[]> => {
  return await prisma.$transaction(async (tx) => {
    // Helper to create a random band using provided users
    const createRandomBand = (): Prisma.BandCreateInput => ({
      name: `${faker.word.preposition()} ${faker.word.adjective()} ${faker.word.noun()}`,
      bio: faker.lorem.paragraph(),
      genre: faker.music.genre(),
      location: faker.location.city(),
      admin: {
        connect: { id: pickRandom(users).id }
      },
      members: {
        connect: pickRandomMultiple(users, 3).map(u => ({ id: u.id }))
      }
    });

    // Hardcoded bands plus random bands
    const bandsData: Prisma.BandCreateInput[] = [
      {
        name: "Five The Hierophant",
        admin: { connect: { id: users[0].id } },
        bio: "Five The Hierophant is a London-based experimental band...",
        genre: "Experimental",
        location: "London"
      },
      {
        name: "Paradise Row",
        bio: "Paradise Row is a London-based band...",
        genre: "Indie",
        location: "London",
        lookingForMembers: true,
        admin: { connect: { id: users[0].id } }
      },
      ...faker.helpers.multiple(createRandomBand, { count: 3 })
    ];

    // Create each band individually in the transaction.
    const createdBands = await Promise.all(
      bandsData.map(data => tx.band.create({ data }))
    );

    return createdBands;
  });
};
