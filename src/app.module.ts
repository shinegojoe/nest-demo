import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { AppDataSource } from './data-source';
import { DataSource } from 'typeorm';
import { RBACModule } from './rbac/rbac.module';


@Module({
  imports: [
    AppDataSource,
    TypeOrmModule.forFeature([User]),
    RBACModule
  ],
  controllers: [AppController],
  providers: [AppService],
})


// @Module({
//   imports: [TypeOrmModule.forRoot({
//     type: "postgres",
//     host: "192.168.161.131",
//     port: 5432,
//     username: "admin",
//     password: "admin",
//     database: "postgres",
//     schema: "test123",
//     synchronize: true,
//     logging: false,
//     entities: [User],
//     migrations: [],
//     subscribers: [],
// }),TypeOrmModule.forFeature([User])],
//   controllers: [AppController],
//   providers: [AppService],
// })

export class AppModule {
 
}
