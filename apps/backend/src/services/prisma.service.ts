import { Injectable, OnModuleInit } from "@nestjs/common";
import { prisma, type PrismaClient } from "@repo/database";

@Injectable()
export class PrismaService  { 
    client: PrismaClient
    constructor () {
        this.client = prisma
    }
}