import { Module } from '@nestjs/common';
import { ApiUserService } from './apiUser.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiUserEntity } from './apiUser.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([ApiUserEntity])],
  exports: [ApiUserService],
  providers: [ApiUserService],
})
export class ApiUserModule {}