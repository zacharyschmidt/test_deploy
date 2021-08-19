import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
//import { ConfigService } from '@nestjs/config';
import { ApiUserService } from '../apiUser/apiUser.service';
import Strategy from 'passport-headerapikey';

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(
        private readonly apiUserService: ApiUserService,
    ) {
        super({ header: 'X-API-KEY', prefix: '' },
            true,
            async (apiKey, done) => {
                return this.validate(apiKey, done);
            });
    }

    public validate = (apiKey: string, done: (error: Error, data) => {}) => {
        if (this.apiUserService.validateKey({ name: 'RMI', apiKey: apiKey })) {

            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}