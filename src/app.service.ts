import { Injectable } from '@nestjs/common';
// import { AppDataSource } from './data-source'
import { User } from './entity/User';
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/core/injector/module';

// @Module({
//   imports: [TypeOrmModule.forRoot(), UsersModule],
// })


@Injectable()
export class AppService {

  constructor( @InjectRepository(User)
  private usersRepository: Repository<User>) {

  }

  async getHello(): Promise<string> {

    // const r = AppDataSource.getRepository(User);
    const res = await this.usersRepository.find();
    console.log("res: ", res);
    return 'Hello World!';
  }
}
