import { Module, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SeriesController } from './series.controller';
import { SeriesService } from './series.service';
import { SeriesEntity } from './series.entity';

import { AuthModule } from '../auth/auth.module';

 
@Module({
  imports: [TypeOrmModule.forFeature([SeriesEntity]), AuthModule],
  controllers: [SeriesController],
  providers: [SeriesService],
})
export class SeriesModule {}