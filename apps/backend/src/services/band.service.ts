import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { Band, Prisma } from "@repo/database/node_modules/@prisma/client";

@Injectable()
export class BandService { 
    constructor(private prisma: PrismaService) {}

    async band(bandWhereInput: Prisma.BandWhereInput) : Promise<Band> { 
        return this.prisma.client.band.findFirst({where: bandWhereInput});
    }

    async bands() : Promise<Band[]> {
        return this.prisma.client.band.findMany();
    }

    async createBand(data: Prisma.BandCreateInput) : Promise<Band> { 
        return this.prisma.client.band.create({data});
    }

    async updateBand(bandUpdateInput: Prisma.BandUpdateInput, bandWhereInput : Prisma.BandWhereUniqueInput) : Promise<Band> {
        return this.prisma.client.band.update({
            data: bandUpdateInput,
            where: bandWhereInput
        })
    }
}