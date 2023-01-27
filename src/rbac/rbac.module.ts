import { Module } from '@nestjs/common';

import { AppDataSource } from '../data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from '../logger/logger.service';

import { User } from '../entity/rbac/User';
import { Action } from '../entity/rbac/Action';
import { Role } from '../entity/rbac/Role';


import { UserController } from './controller/userController';
import { UserService } from './service/userService';

import { RoleController } from './controller/roleController';
import { RoleService } from './service/roleService';

import { ActionController } from './controller/actionController';
import { ActionService } from './service/actionService';


@Module({
    imports: [
        AppDataSource,
        TypeOrmModule.forFeature([User, Action, Role]),
    ],
    controllers: [UserController, ActionController, RoleController],
    providers: [UserService, ActionService, RoleService, LoggerService],
})
export class RBACModule {

}