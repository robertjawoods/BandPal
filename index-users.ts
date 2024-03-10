import prisma from "./app/lib/prisma";

const dotenv = require('dotenv');

dotenv.config();

console.log("test");

import algolia from "algoliasearch";

const client = algolia(process.env.ALGOLIA_APP_ID ?? 'QMURIJHZEO', process.env.ALGOLIA_API_KEY || '40e2b5f285436f153868b1ccf580ea11') 

const index = client.initIndex('users');

async function IndexUsers() {
    const users = await prisma.user.findMany();
    console.log(users);


    try {
        const objects = users.map((user) => {
            return {
                objectID: user.id,
                name: user.name,
                email: user.email,
            };
        });

        await index.saveObjects(objects).wait();

        console.log("Users have been indexed");

    } catch (err) {
        console.error(`An error occurred while indexing users:`, err);
    }
}

IndexUsers();