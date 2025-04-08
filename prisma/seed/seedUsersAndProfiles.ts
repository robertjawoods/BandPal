import { PrismaClient, Prisma, User, Profile } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { pickRandom } from "./seedHelpers";


export const seedUsersAndProfiles = async (prisma: PrismaClient, roles: { id: string }[]): Promise<{ users: User[]; profiles: Profile[] }> => {
  return await prisma.$transaction(async (tx) => {
    // Helper to generate random user data
    const createRandomUser = () => ({
      email: faker.internet.email(),
      name: `${faker.person.firstName()} ${faker.person.lastName()}`
    });

    // Predefined users and 10 random users
    const userData = [
      { email: "admin@gmail.com", name: "Admin" },
      { email: "user@gmail.com", name: "User" },
      ...faker.helpers.multiple(createRandomUser, { count: 10 })
    ];

    const users: User[] = [];
    for (const data of userData) {
      const user = await tx.user.create({ data });
      users.push(user);
    }

    // Create profiles for each user using a randomly selected role.
    const profiles: Profile[] = [];
    for (const u of users) {
      const profile = await tx.profile.create({
        data: {
          bio: faker.lorem.paragraph(),
          userId: u.id,
          joined: faker.date.recent(),
          location: faker.location.city(),
          role: {
            connect: {
              id: pickRandom(roles).id
            }
          }
        }
      });
      profiles.push(profile);
    }

    return { users, profiles };
  });
};
