import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const load = async () => {
    try {

        const connectOrCreate = {
            create: {
                email: "admin@gmail.com",
                name: "Admin"
            },
            where: { 
                email: "admin@gmail.com"
            }
        }

        var band = await prisma.band.findFirst({
            where: { 
                AND: { 
                    name: "Five The Hierophant", 
                    admin: { 
                        email: "admin@gmail.com"
                    }
                }
            }
        })
        if (!band) { 
            await prisma.band.create({
                data: {
                    name: "Five The Hierophant",
                    admin: { 
                        connectOrCreate
                    }
                },
    
            })    
        }


        var band = await prisma.band.findFirst({
            where: { 
                AND: { 
                    name: "Paradise Row", 
                    admin: { 
                        email: "admin@gmail.com"
                    }
                }
            }
        })

        if (!band) {
            await prisma.band.create({
                data: {
                    name: "Paradise Row",
                    admin: { 
                        connectOrCreate
                    }
                },
    
            })
        }
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}
load()