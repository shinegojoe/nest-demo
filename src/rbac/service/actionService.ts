import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, InsertResult, UpdateResult, QueryRunner } from 'typeorm';
import { Action } from '../../entity/rbac/Action';

@Injectable()
export class ActionService {

  schema: string = process.env.schema;


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
    const res = await this.usersRepository.findOneBy(
      { id: id }
    );
    return res;
  }

  async create(body: Action): Promise<InsertResult | null> {

    // const r = AppDataSource.getRepository(User);
    const item = await this.usersRepository.findOneBy(
      { name: body.name }
    );
    console.log("item: ", item);
    if (item === null) {
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

  async delete(id: number, queryRunner: QueryRunner): Promise<DeleteResult> {

    // const r = AppDataSource.getRepository(User);
    const res = await queryRunner.manager.delete(Action, {id: id});
    console.log("res: ", res);
    return res;
  }

  async deleteRoleAction(id: number, queryRunner: QueryRunner): Promise<boolean> {
    const sql = `delete from ${this.schema}.role_action where a_id=$1`;
    const res = await queryRunner.query(sql, [id]);
    return true;
  }




}