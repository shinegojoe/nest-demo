import { Injectable } from '@nestjs/common';
// import { AppDataSource } from './data-source'
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, QueryRunner, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { Module } from '@nestjs/core/injector/module';
import { User } from '../../entity/rbac/User';
import { NullObject } from '../../utils/NullObject';
import { SetUserRoleDTO } from '../dto/userRoleDTO';
import { errorCode, errorMessage } from '../../response/errorCode';
import { UserRoleVO } from '../vo/userRoleVO';


@Injectable()
export class UserService {

  schema: string = process.env.schema;

  constructor(@InjectRepository(User)
  private userRepository: Repository<User>) {

  }

  async list(): Promise<Array<User>> {
    // const r = AppDataSource.getRepository(User);
    const res = await this.userRepository.find();
    return res;
  }


  async create(body: User): Promise<InsertResult | NullObject> {
    const item = await this.userRepository.findOneBy({ name: body.name });
    if (item === null) {
      const res = await this.userRepository.insert(body);
      return res;
    } else {
      return new NullObject();
    }
  }

  async setUserRole(body: SetUserRoleDTO, queryRunner: QueryRunner): Promise<boolean> {
    
    const user = await queryRunner.manager.find(User);
    if(user === null) {
      const msg = errorMessage[errorCode.NOT_FOUND];
      throw new Error(msg);
    }
    for(let rId of body.roleIdList) {
      const sql = `insert into ${this.schema}.user_role (u_id, r_id) values($1, $2)`;
      await queryRunner.manager.query(sql, [body.user.id, rId]);
    }
    return true;

  }

  async updateUserRole(body: SetUserRoleDTO, queryRunner: QueryRunner): Promise<boolean> {
    const sql = `delete from ${this.schema}.user_role where u_id=$1`;
    await queryRunner.manager.query(sql, [body.user.id]);
    for(let rId of body.roleIdList) {
      const sql = `insert into ${this.schema}.user_role (u_id, r_id) values($1, $2)`;
      await queryRunner.manager.query(sql, [body.user.id, rId]);
    }
    return true;

  }

  async getRolesById(id: number): Promise<UserRoleVO | NullObject> {
    const user = await this.userRepository.findOneBy({id: id});
    if(user === null) {
      return new NullObject();
    }
    const sql = `select r."name" , r.id  from ${this.schema}.user_role ur  inner join ${this.schema}."role" r on ur.r_id = r.id and ur.u_id=$1`;
    const roleList = await this.userRepository.query(sql, [id]);
    const vo = new UserRoleVO(user, roleList);
    return vo;
    

  }






}




