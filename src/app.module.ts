import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/rbac/User';
import { AppDataSource } from './data-source';
import { DataSource } from 'typeorm';
import { RBACModule } from './rbac/rbac.module';
import { ErrorTestModule }  from './errorTest/errorTest.module';
import { LoggerModule } from './logger/logger.module';
import { AuthMiddleware } from './middleware/authMiddleware';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    AppDataSource,
    TypeOrmModule.forFeature([User]),
    RBACModule,
    ErrorTestModule,
    LoggerModule,
    LoginModule
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

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('');
  }

  constructor(private dataSource: DataSource){
    
  }
}
