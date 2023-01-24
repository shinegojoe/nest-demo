import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { DeleteResult, Repository, InsertResult, UpdateResult } from 'typeorm';
import { Action } from '../../entity/rbac/Action';

@Injectable()
export class ActionService {

 constructor(@InjectRepository(Action)
 private usersRepository: Repository<Action>) {

 }

  async list(): Promise<Array<Action>> {

    // const r = AppDataSource.getRepository(User);
    const res = await this.usersRepository.find();
    console.log("res: ", res);
    return res;
  }

  async get(id: number): Promise<Action> {
    const res  = await this.usersRepository.findOneBy(
      {id: id}
    );
    return res;
  }

  async create(body: Action): Promise<InsertResult | null> {

    // const r = AppDataSource.getRepository(User);
    const item = await this.usersRepository.findOneBy(
      {name: body.name}
    );
    console.log("item: ", item);
    if(item === null) {
      const res = await this.usersRepository.insert(body);
      console.log("create: ", res);
      return res;
    } else {
      return null;
    }
  }

  async update(body: Action): Promise<UpdateResult> {

    // const r = AppDataSource.getRepository(User);
    const res = await this.usersRepository.update(body.id, body);
    console.log("res: ", res);
    return res;
  }

  async delete(id: number): Promise<DeleteResult> {

    // const r = AppDataSource.getRepository(User);
    const res = await this.usersRepository.delete(id);
    console.log("res: ", res);
    return res;
  }



  
}