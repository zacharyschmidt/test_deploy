import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'

import { DownloadController } from './download.controller';

import { CategoryService } from '../categories/category.service';
import {CategoryEntity, FrequencyFilterEntity,
  GeographyFilterEntity,
  CategoryLeafLookupEntity} from '../categories/category.entity';

import {SeriesService} from '../series/series.service';
import {SeriesEntity} from '../series/series.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity,
    FrequencyFilterEntity, GeographyFilterEntity, CategoryLeafLookupEntity]),
  TypeOrmModule.forFeature([SeriesEntity])],
  controllers: [DownloadController],
  providers: [CategoryService, SeriesService],
})
export class DownloadModule {}