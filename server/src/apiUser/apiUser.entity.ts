import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    BeforeInsert,
    Entity,
} from 'typeorm';

import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { ApiUserSO } from './apiUser.dto';

@Entity('apiuser', { schema: 'public' })
export class ApiUserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'text',
        unique: true,
    })
    name: string;

    @Column('text', { name: 'apikey' })
    apiKey: string;

    @CreateDateColumn({ name: 'createdon' })
    createdOn: Date;

    @BeforeInsert()
    hashApiKey = async () => {
        this.apiKey = await hash(this.apiKey, 8);
    };

    compareApiKey = async (attempt: string) => {
        return await compare(attempt, this.apiKey);
    };

    sanitizeObject = (): ApiUserSO => {
        const { id, createdOn, name } = this;
        const responseObj = { id, createdOn, name };
        return responseObj;
    }
}
