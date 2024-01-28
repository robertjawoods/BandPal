import { Controller, Get } from "@nestjs/common";
import { BandService } from "src/services/band.service";
import { Band } from "@repo/database/node_modules/@prisma/client";

@Controller("/band")
export class BandController { 
    constructor(private readonly bandService: BandService) {

    }    

    @Get("/")
    async getBands(): Promise<Band[]> { 
        return this.bandService.bands();
    }
}