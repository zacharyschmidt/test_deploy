import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UpdateService } from './update.service';
import { SeriesEntity } from '../series/series.entity';
import { CategoryEntity } from '../categories/category.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SeriesEntity]),
              TypeOrmModule.forFeature([CategoryEntity])],
    providers: [UpdateService],
})
export class UpdateModule { }