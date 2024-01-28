import { Module } from '@nestjs/common';

import { PrismaService } from './services/prisma.service';
import { BandController } from './controllers/band.controller';
import { BandService } from './services/band.service';

@Module({
  imports: [],
  controllers: [BandController],
  providers: [PrismaService, BandService],
})
export class AppModule {}
