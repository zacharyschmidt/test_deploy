import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UpdateService } from './update.service';
import { SeriesEntity } from '../series/series.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SeriesEntity])],
    providers: [UpdateService],
})
export class UpdateModule { }