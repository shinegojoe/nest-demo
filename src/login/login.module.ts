import { Module } from '@nestjs/common';

import { AppDataSource } from '../data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../logger/logger.service';

import { User } from '../entity/rbac/User';
import { Action } from '../entity/rbac/Action';
import { Role } from '../entity/rbac/Role';

import { LoginController } from './controller/loginController';
import { LoginService } from './service/loginService';





@Module({
    imports: [
        AppDataSource,
        TypeOrmModule.forFeature([User, Action, Role]),
    ],
    controllers: [LoginController],
    providers: [LoginService],
})
export class LoginModule {

}