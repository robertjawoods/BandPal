import { faker } from "@faker-js/faker";
import { Prisma, User } from "@prisma/client";

export const pickRandom = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const pickRandomMultiple = <T>(arr: T[], count: number): T[] => {
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(arr[Math.floor(Math.random() * arr.length)]);
  }
  return result;
};

export const createRandomUser = () => ({
  email: faker.internet.email(),
  name: `${faker.person.firstName()} ${faker.person.lastName()}`
});

export const createRandomBand = (users: User[]): Prisma.BandCreateInput => ({
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