import { PrismaClient } from "@prisma/client";
import { seedBands } from "./seedBands";
import { seedRoles } from "./seedRoles";
import { seedSetlists } from "./seedSetlists";
import { seedSongs } from "./seedSongs";
import { seedUsersAndProfiles } from "./seedUsersAndProfiles";

const prisma = new PrismaClient();

const seed = async () => {
    try {  
        const roles = await seedRoles(prisma);
        const { users } = await seedUsersAndProfiles(prisma, roles);
        const bands = await seedBands(prisma, users);
        const songs = await seedSongs(prisma, bands);
        const setlists = await seedSetlists(prisma, songs, bands);

        console.log("Seed complete", { roles, users, bands, songs, setlists });
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

seed()