import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesEntity } from 'src/series/series.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { UpdateModule } from 'src/update/update.module';
import { UpdateService } from 'src/update/update.service';
import { TasksService } from './tasks.service';
import { ApiUserModule } from 'src/apiUser/apiUser.module';


@Module({
    imports: [HttpModule
        // .register({
        //     'headers': {
        //         'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:88.0) Gecko/20100101 Firefox/88.0',
        //         'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        //         'Accept-Encoding': 'gzip, deflate, br',
        //         'Accept-Language': 'en-US,en;q=0.5',
        //         'Connection': 'keep-alive',
        //         'Host': 'api.eia.gov',
        //         'Upgrade-Insecure-Requests': '1',
        //         'Cache-Control': 'max-age=0'
        //     }
        // })
        , UpdateModule, TypeOrmModule.forFeature([SeriesEntity]),
        TypeOrmModule.forFeature([CategoryEntity]), ApiUserModule],
    providers: [TasksService, UpdateService],
})
export class TasksModule { }