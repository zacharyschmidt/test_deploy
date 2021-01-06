import { Module, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { SeriesEntity } from './series.entity';

 
@Module({
  imports: [TypeOrmModule.forFeature([SeriesEntity])],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}