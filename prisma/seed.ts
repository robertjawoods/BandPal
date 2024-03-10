import { Band, PrismaClient, Song, User } from "@prisma/client";

const prisma = new PrismaClient();

const createUsers = async (): Promise<User[]> => {
    const _ = await prisma.user.createMany({
        data: [
            {
                email: "admin@gmail.com",
                name: "Admin"
            },
            {
                email: "user@gmail.com",
                name: "User"
            }
        ]
    });

    return await prisma.user.findMany();
}

const createBands = async (users: User[]) => {
    await prisma.band.createMany({
        data: [
            {
                name: "Five The Hierophant",
                userId: users[0].id,
            },
            {
                name: "Paradise Row",
                userId: users[0].id,
            },


        ]
    })

    let bands = await prisma.band.findMany({});

    for (let band of bands) {
        console.log(band);

        await prisma.band.update({
            where: {
                id: band.id
            },
            data: {
                members: {
                    connect: users.map(u => {
                        return {
                            id: u.id
                        }
                    })
                }
            }
        })

    }

    return await prisma.band.findMany();
}

const createSongs = async (bands: Band[]) => {
    const fiveTheHierophant = await prisma.band.findFirst({
        where: {
            name: "Five The Hierophant"
        }
    });

    const paradiseRow =  await prisma.band.findFirst({
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
        console.log(users);

        const bands = await createBands(users);
        console.log(bands);

        const songs = await createSongs(bands);
        console.log(songs);

        const setlists = await createSetlists(songs, bands);
        console.log(setlists);

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