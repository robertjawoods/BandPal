import { PrismaClient, Prisma, Band, Song } from "@prisma/client";

export const seedSongs = async (prisma: PrismaClient, bands: Band[]): Promise<Song[]> => {
  return await prisma.$transaction(async (tx) => {
    // Find the two specific bands in this transaction
    const fiveTheHierophant = await tx.band.findFirst({
      where: { name: "Five The Hierophant" }
    });
    const paradiseRow = await tx.band.findFirst({
      where: { name: "Paradise Row" }
    });

    // Define songs for the bands
    const songsData: Prisma.SongCreateManyArgs = {
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
    };

    await tx.song.createMany(songsData);
    return await tx.song.findMany();
  });
};
