import { Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { DeleteResult, Repository, InsertResult } from 'typeorm';
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

  get(id: number): Promise<Action> {
    const res  = this.usersRepository.findOneBy(
      {id: id}
    );
    return res;
  }

  async create(body: Action): Promise<InsertResult> {

    // const r = AppDataSource.getRepository(User);
    const res = await this.usersRepository.insert(body);
    console.log("res: ", res);
    return res;
  }

  async update(body: Action): Promise<Action> {

    // const r = AppDataSource.getRepository(User);
    const res = await this.usersRepository.save(body);
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