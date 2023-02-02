import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository  } from '@nestjs/typeorm';
import { DeleteResult, Repository, InsertResult, UpdateResult, QueryRunner } from 'typeorm';
import { threadId } from 'worker_threads';
import { Role } from '../../entity/rbac/Role';
import { LoggerService } from '../../logger/logger.service';
import { errorCode, errorMessage } from '../../response/errorCode';
import { NullObject } from '../../utils/NullObject';
import { SetRoleActionDTO } from '../dto/roleActionDTO';
import { GetRoleActionVO } from '../vo/roleActionVO';

@Injectable()
export class RoleService {

    schema: string = process.env.schema;

    constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) {
    }

    public list(): Promise<Array<Role>> {
        return this.roleRepository.find();
    }

    public async get(id: number): Promise<Role> {
        const role: Role = await this.roleRepository.findOneBy({id: id})
        return role;
    }

    public async create(body: Role): Promise<InsertResult | NullObject> {
        const item = await this.roleRepository.findOneBy({name: body.name});
        if(item === null) {
            const res = await this.roleRepository.insert(body);
            return res;
        } else {
            return new NullObject();
        }
    }

    private async createWithTranscation(body: Role, queryRunner: QueryRunner): Promise<InsertResult | NullObject> {
        const item = await queryRunner.manager.findOneBy(Role, {name: body.name});
        if(item === null) {
            const res = await queryRunner.manager.insert(Role, body);
            return res;
        } else {
            return new NullObject();
        }
    }

    public update(body: Role): Promise<UpdateResult> {

        const res = this.roleRepository.update(body.id, body);
        return res;
    }

    public async delete(id: number, queryRunner: QueryRunner): Promise<boolean> {
        // delete role_action, delete user_role, then delete role
        await this.deleteRoleAction(id, queryRunner);
        await this.deleteUserRole(id, queryRunner);
        await queryRunner.manager.delete( Role, {id: id});
        return true;
    }

    private async insertRoleAction(rId: number, aId: number, queryRunner: QueryRunner) {
        const sql = `insert into ${this.schema}.role_action (r_id, a_id) values ($1, $2)`;
        // const res = await this.roleRepository.query(sql, [rId, aId]);
        const res = await queryRunner.query(sql, [rId, aId]);
        console.log("insert: ", res);
    }

    public async addRoleAction(body: SetRoleActionDTO, queryRunner: QueryRunner): Promise<boolean> {
        const role: Role = body.role;
        // this.roleRepository.manager.transaction(async(transactionalEntityManager)=> {
        // })
        
       
        // const addRes = await this.create(role);
        const addRes = await this.createWithTranscation(role, queryRunner);
        if(addRes instanceof NullObject) {
            // error msg todo...
            const errMsg = errorMessage[errorCode.ALREADY_EXISTS];
            throw new Error(errMsg);
        }

        for(let aId of body.actionIdList) {
            await this.insertRoleAction(role.id, aId, queryRunner);
        }
       
        return true;
        
    }

    private deleteRoleAction(rId: number, queryRunner: QueryRunner) {
        const sql = `delete from ${this.schema}.role_action where r_id=$1`;
        return queryRunner.manager.query(sql, [rId]);
    }

    private deleteUserRole(rId: number, queryRunner: QueryRunner) {
        const sql = `delete from ${this.schema}.user_role where r_id=$1`;
        return queryRunner.manager.query(sql, [rId]);
    }

   

    public async updateActions(body: SetRoleActionDTO, queryRunner: QueryRunner) {
        // add aId, rId to roleAction
        const role: Role = body.role;
        // const sql = `delete from ${this.schema}.role_action where r_id=$1`;
        // await queryRunner.manager.query(sql, [role.id]);
        await this.deleteRoleAction(role.id, queryRunner);
        for(let aId of body.actionIdList) {
            await this.insertRoleAction(role.id, aId, queryRunner);
        }
        return true;
        
    }

    public async getActionsById(id: number): Promise<GetRoleActionVO> {
        // select id, name from "action" a inner join role_action ra on a.id = ra.a_id
        // get role by id
        const role = await this.get(id);
        console.log("role: ", role);
        const sql = `select id, name from ${this.schema}."action" a inner join ${this.schema}.role_action ra on a.id = ra.a_id where ra.r_id =$1`;
        const actionList = await this.roleRepository.query(sql, [id]);
        console.log("actionList: ", actionList);
        const vo = new GetRoleActionVO();
        vo.role = role;
        vo.actionList = actionList;
        return vo;
    }

}