import { Module } from '@nestjs/common';
import { UserController } from './controller/userController';
import { UserService } from './service/userService';
import { AppDataSource } from '../data-source';
import { User } from '../entity/User';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
        AppDataSource,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class RBACModule {

}