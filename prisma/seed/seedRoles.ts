import { PrismaClient, Prisma, Role } from "@prisma/client";

export const seedRoles = async (prisma: PrismaClient): Promise<Role[]> => {
  return await prisma.$transaction(async (tx) => {
    const rolesData: Prisma.RoleCreateManyArgs = {
      data: [
        { name: "Lead Guitar" },
        { name: "Rhythm Guitar" },
        { name: "Bass Guitar" },
        { name: "Drums" },
        { name: "Vocals" }
      ]
    };

    await tx.role.createMany(rolesData);
    return await tx.role.findMany();
  });
};