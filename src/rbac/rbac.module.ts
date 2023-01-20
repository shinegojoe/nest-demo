import { Module } from '@nestjs/common';

import { AppDataSource } from '../data-source';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../entity/rbac/User';
import { Action } from '../entity/rbac/Action';


import { UserController } from './controller/userController';
import { UserService } from './service/userService';

import { ActionController } from './controller/actionController';
import { ActionService } from './service/actionService';


@Module({
    imports: [
        AppDataSource,
        TypeOrmModule.forFeature([User, Action]),
    ],
    controllers: [UserController, ActionController],
    providers: [UserService, ActionService],
})
export class RBACModule {

}