import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiUserEntity } from './apiUser.entity';
import { ApiUserDTO, ApiUserSO } from './apiUser.dto';

@Injectable()
export class ApiUserService {
    constructor(
        @InjectRepository(ApiUserEntity)
        private apiUserRepository: Repository<ApiUserEntity>,
    ) { }

    validateKey = async (data: ApiUserDTO): Promise<boolean> => {
        const { name, apiKey } = data;
        const apiUser = await this.apiUserRepository.findOne({ name });
        if (!apiUser || !(await apiUser.compareApiKey(apiKey))) {
            console.log(name)
            console.log(apiUser)
            console.log(apiKey)
            throw new HttpException(
                'Invalid API key',
                HttpStatus.UNAUTHORIZED,
            );
        }
        return true;

    }

    insertApiUser = async (data: ApiUserDTO): Promise<ApiUserSO> => {
        let user = await this.apiUserRepository.create(data);
        await this.apiUserRepository.save(user);

        return user;
    }

}
