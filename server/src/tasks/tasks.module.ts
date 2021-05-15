import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesEntity } from 'src/series/series.entity';
import { UpdateModule } from 'src/update/update.module';
import { UpdateService } from 'src/update/update.service';
import { TasksService } from './tasks.service';

@Module({
    imports: [HttpModule, UpdateModule, TypeOrmModule.forFeature([SeriesEntity])],
    providers: [TasksService, UpdateService],
})
export class TasksModule { }