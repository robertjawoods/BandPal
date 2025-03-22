import { PrismaClient, Band, Song, Setlist } from "@prisma/client";

export const seedSetlists = async (prisma: PrismaClient, songs: Song[], bands: Band[]): Promise<Setlist[]> => {
  return await prisma.$transaction(async (tx) => {
    const fiveTheHierophantBand = bands.find(b => b.name === "Five The Hierophant")!;
    const paradiseRowBand = bands.find(b => b.name === "Paradise Row")!;

    const fiveTheHierophantSetlist = await tx.setlist.create({
      data: {
        name: "Five The Hierophant Setlist",
        band: { connect: { id: fiveTheHierophantBand.id } },
        songs: {
          connect: songs
            .filter(s => s.bandId === fiveTheHierophantBand.id)
            .map(s => ({ id: s.id }))
        }
      }
    });

    const paradiseRowSetlist = await tx.setlist.create({
      data: {
        name: "Paradise Row Setlist",
        band: { connect: { id: paradiseRowBand.id } },
        songs: {
          connect: songs
            .filter(s => s.bandId === paradiseRowBand.id)
            .map(s => ({ id: s.id }))
        }
      }
    });

    return await tx.setlist.findMany({
      include: { songs: true, band: true }
    });
  });
};
