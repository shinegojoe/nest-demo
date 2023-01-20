import { Injectable } from '@nestjs/common';
// import { AppDataSource } from './data-source'
import { InjectRepository  } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/core/injector/module';
import { User } from '../../entity/rbac/User';


@Injectable()
export class UserService {

 constructor(@InjectRepository(User)
 private usersRepository: Repository<User>) {

 }

  async all(): Promise<Array<User>> {

    // const r = AppDataSource.getRepository(User);
    const res = await this.usersRepository.find();
    console.log("res: ", res);
    return res;
  }

  xx(): Promise<string> {
    const p = new Promise<string>((resolve, reject)=> {
      resolve("xx");
    })
    return p;
  }



  
}




