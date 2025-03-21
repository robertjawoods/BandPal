import { Band, Prisma, PrismaClient, Song, User } from "@prisma/client";
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const createUsers = async (): Promise<User[]> => {
    const createRandomUser = () => {
        return {
            email: faker.internet.email(),
            name: `${faker.person.firstName()} ${faker.person.lastName()}`
        }
    }

    const users: Prisma.UserCreateManyArgs = {
        data: [{
            email: "admin@gmail.com",
            name: "Admin"
        },
        {
            email: "user@gmail.com",
            name: "User"
        }, 
        ...faker.helpers.multiple(createRandomUser, {
            count: 10
        })]
    }

 
    const _ = await prisma.user.createMany(users);

    return await prisma.user.findMany();
}

const createProfiles = async (users: User[]) => {
    const profiles: Prisma.ProfileCreateManyArgs = {
        data: users.map(u => {
            return {
                bio: faker.lorem.paragraph(),
                userId: u.id,
                joined: faker.date.recent(),
                location: faker.location.city(),
            }
        })
    }

    await prisma.profile.createMany(profiles)

    return await prisma.profile.findMany();
}

const createBands = async (users: User[]) => {
    const createRandomBands = (): Partial<Band> => {
        return {
            name: `${faker.word.preposition()} ${faker.word.adjective()} ${faker.word.noun()}`,
            bio: faker.lorem.paragraph(),
            genre: faker.music.genre(),
            location: faker.location.city()
        }
    }

    const bands = [{
        name: "Five The Hierophant",
        userId: users[0].id,
        bio: "Five The Hierophant is a London-based experimental band, formed in 2013 by guitarist Marc De Faoite, drummer Gerallt Ruggiero, and bassist Daniel Knight. The band's music is a mix of doom metal, drone, and dark ambient, with influences from jazz and world music",
        genre: "Experimental",
        location: "London"
    },
    {
        name: "Paradise Row",
        userId: users[0].id,
        bio: "Paradise Row is a London-based band, formed in 2015 by singer-songwriter and guitarist, James Collins. The band's music is a mix of indie rock, folk, and blues, with influences from jazz and world music",
        genre: "Indie",
        location: "London",
        lookingForMembers: true
    }, ...faker.helpers.multiple(createRandomBands, { count: 3 })]

    for (let band of bands) {
        let i = 1;

        band.userId = users[i++].id;
    }

    await prisma.band.createMany({
        data: bands as Band[]
    })

    let res = await prisma.band.findMany({});

    let i = 0;
    for (let band of res) {
        console.log(band);

        await prisma.band.update({
            where: {
                id: band.id
            },
            data: {
                members: {
                    connect: users.slice(i, i + 3).map(u => {
                        return {
                            id: u.id
                        };
                    })
                }
            }
        })
        i += 3;
    }

    return await prisma.band.findMany();
}

const createSongs = async (bands: Band[]) => {
    const fiveTheHierophant = await prisma.band.findFirst({
        where: {
            name: "Five The Hierophant"
        }
    });

    const paradiseRow = await prisma.band.findFirst({
        where: {
            name: "Paradise Row"
        }
    });

    await prisma.song.createMany({
        data: [
            {
                name: "Fire from Frozen Cloud",
                lengthSeconds: 300,
                bandId: fiveTheHierophant!.id
            },
            {
                name: "Queen Over Phlegethon",
                lengthSeconds: 300,
                bandId: fiveTheHierophant!.id
            },
            {
                name: "The Hierophant",
                lengthSeconds: 300,
                bandId: fiveTheHierophant!.id
            },
            {
                name: "Adelaide",
                lengthSeconds: 300,
                bandId: paradiseRow!.id
            },
            {
                name: "Lay Me Down",
                lengthSeconds: 300,
                bandId: paradiseRow!.id
            }
        ]
    })

    return await prisma.song.findMany();

}

const createSetlists = async (songs: Song[], bands: Band[]) => {
    const fiveTheHierophantSetlist = await prisma.setlist.create({
        data: {
            name: "Five The Hierophant Setlist",
            band: {
                connect: {
                    id: bands.find(b => b.name === 'Five The Hierophant')!.id
                }
            },
            songs: {
                connect: songs.filter(s => s.bandId === bands.find(b => b.name === 'Five The Hierophant')?.id).map(s => {
                    return {
                        id: s.id
                    }
                })
            }
        }
    })

    const paradiseRowSetlist = await prisma.setlist.create({
        data: {
            name: "Paradise Row Setlist",
            band: {
                connect: {
                    id: bands.find(b => b.name === 'Paradise Row')!.id
                }
            },
            songs: {
                connect: songs.filter(s => s.bandId === bands.find(b => b.name === 'Paradise Row')?.id).map(s => {
                    return {
                        id: s.id
                    }
                })
            }
        }
    })

    return await prisma.setlist.findMany({
        include: {
            songs: true,
            band: true
        }
    });
}

const load = async () => {
    try {
        const users = await createUsers();
        console.log('users', users);

        const profiles = await createProfiles(users);
        console.log('profiles', profiles);

        const bands = await createBands(users);
        console.log('bands', bands);

        const songs = await createSongs(bands);
        console.log('songs', songs);

        const setlists = await createSetlists(songs, bands);
        console.log('setlists', setlists);

        for (let setlist of setlists) {
            console.log(setlist.band.name);
            console.log(setlist.songs);
        }
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

load()