import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { HeaderApiKeyStrategy } from './auth-header-api-key.strategy';
import { ConfigModule } from '@nestjs/config';
import { ApiUserModule } from '../apiUser/apiUser.module';

@Module({
  imports: [PassportModule, ConfigModule, ApiUserModule],
  providers: [HeaderApiKeyStrategy],
})
export class AuthModule {}