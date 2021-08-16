import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { SeriesModule } from './series/series.module';
import { CategoryModule } from './categories/category.module';
import { DownloadModule } from './download/download.module';
import { UpdateModule } from './update/update.module';
import { TasksModule } from './tasks/tasks.module';

import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
//import { ConfigModule } from '@nestjs/config';

import { HttpErrorFilter } from './shared/http-error.filter';
import { ValidationPipe } from './shared/validation.pipe';


@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    //ConfigModule.forRoot(),
    TodoModule,
    UserModule,
    SeriesModule,
    CategoryModule,
    DownloadModule,
    UpdateModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule { }
