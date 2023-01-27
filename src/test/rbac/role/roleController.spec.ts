import { Test, TestingModule } from '@nestjs/testing';
import { RoleController } from '../../../rbac/controller/roleController';
import { RoleService } from '../../../rbac/service/roleService';
import { errorCode, errorMessage } from '../../../response/errorCode';
import { CreateResponse, DeleteResponse, LogicErrorResponse, UpdateResponse } from '../../../response/Resp';
import { Role } from '../../../entity/rbac/Role';
import { Action } from '../../../entity/rbac/Action';
import { SetRoleActionDTO } from '../../../rbac/dto/roleActionDTO'
import { GetRoleActionVO } from '../../../rbac/vo/roleActionVO';
import { LoggerService } from '../../../logger/logger.service';
import { DataSource, QueryRunner } from 'typeorm';
import { MockDataSource } from '../../common/mockDataSource';
import { MockLoggerService } from '../../common/mockLogger';


class MockRoleService {
    list() {
        return [];
    }

    get(id: number) {
        const role = new Role();
        return role;
    }


    update(role: Role) {
        return {
            affected: 1
        }
    }

    create(role: Role) {
        return {
            raw: {}
        }
    }

    setActions() {

    }

    getActionsById(id: number): GetRoleActionVO {
        const role = new Role();
        const action1 = new Action();
        const action2 = new Action();
        const actionList:  Array<Action> =[action1, action2];

        const res: GetRoleActionVO = {
            role: role,
            actionList: actionList
        }
        return res;
    }

    addRoleAction(body: SetRoleActionDTO, queryRunner: QueryRunner) {
        return true;
    }

    updateActions(body: SetRoleActionDTO, queryRunner: QueryRunner) {
        return true;
    }

    delete(id: number, queryRunner: QueryRunner) {
        return true;
    }


}

class MockRoleLogicErrorService {

    get(id: number) {
        return null;
    }


    update(role: Role) {
        throw new Error();
    }

    getActionsById(id: number): GetRoleActionVO {
        const res: GetRoleActionVO = {
            role: null,
            actionList: []
        }
        return res;
    }

    addRoleAction(body: SetRoleActionDTO, queryRunner: QueryRunner) {
        const errMsg = errorMessage[errorCode.ALREADY_EXISTS];
        throw new Error(errMsg);
    }

    updateActions(body: SetRoleActionDTO, queryRunner: QueryRunner) {
        throw new Error();
    }

    delete(id: number, queryRunner: QueryRunner) {
        throw new Error();
    }

}

describe('role controller ok test', () => {
    let roleController: RoleController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [
                { provide: RoleService, useClass: MockRoleService },
                { provide: LoggerService, useClass: MockLoggerService},
                { provide: DataSource, useClass: MockDataSource}
            ],
        }).compile();

        roleController = app.get<RoleController>(RoleController);
    });

    describe('root', () => {
        it('should return role[]', async () => {
            const res = await roleController.list();
            expect(res).toHaveLength(0);
        });

        // it('should return role', async () => {
        //     const role = new Role();
        //     const res = await roleController.get(123);
        //     expect(res).toEqual(role);
        // });

        // it('should return delete success resp', async () => {
        //     const resp = new DeleteResponse();
        //     const res = await roleController.delete(123);
        //     expect(res).toEqual(resp);
        // });

        it('should return update success resp', async () => {
            const resp = new UpdateResponse();
            const role = new Role();
            const res = await roleController.update(role);
            expect(res).toEqual(resp);
        });

        // it('should return create success resp', async () => {
        //     const resp = new CreateResponse();
        //     const role = new Role();
        //     const res = await roleController.create(role);
        //     expect(res).toEqual(resp);
        // });

        it('should return role and actionList', async () => {
            const resp: GetRoleActionVO =  new GetRoleActionVO();
            const role = new Role();
            const action1 = new Action();
            const action2 = new Action();
            resp.role = role;
            resp.actionList.push(action1);
            resp.actionList.push(action2);
            const res = await roleController.getActionsById(123);
            expect(res).toEqual(resp);
        });


        it('should return CreateResponse', async () => {
            const resp = new CreateResponse();
            const body = new SetRoleActionDTO();
            const res = await roleController.createRoleAction(body);
            expect(res).toEqual(resp);
        });

        it('should return UpdateResponse', async () => {
            const resp = new UpdateResponse();
            const body = new SetRoleActionDTO();
            const res = await roleController.updateActions(body);
            expect(res).toEqual(resp);
        });

        it('should return DeleteResponse', async () => {
            const resp = new DeleteResponse();
            const res = await roleController.delete(123);
            expect(res).toEqual(resp);
        });

    });
});



describe('role controller logic error test', () => {
    let roleController: RoleController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RoleController],
            providers: [
                { provide: RoleService, useClass: MockRoleLogicErrorService },
                { provide: LoggerService, useClass: MockLoggerService},
                { provide: DataSource, useClass: MockDataSource}


            ],
        }).compile();

        roleController = app.get<RoleController>(RoleController);
    });

    describe('root', () => {
        // it('should return role[]', async () => {
        //     const res = await roleController.list();
        //     expect(res).toHaveLength(0);
        // });

        // it('should return role', async () => {
        //     const role = new Role();
        //     const res = await roleController.get(123);
        //     expect(res).toEqual(role);
        // });

        // it('should return delete success resp', async () => {
        //     const resp = new DeleteResponse();
        //     const res = await roleController.delete(123);
        //     expect(res).toEqual(resp);
        // });

        // it('should return update success resp', async () => {
        //     const resp = new UpdateResponse();
        //     const role = new Role();
        //     const res = await roleController.update(role);
        //     expect(res).toEqual(resp);
        // });

        // it('should return create success resp', async () => {
        //     const resp = new CreateResponse();
        //     const role = new Role();
        //     const res = await roleController.create(role);
        //     expect(res).toEqual(resp);
        // });

        it('should return role and actionList', async () => {
            const resp: LogicErrorResponse =  new LogicErrorResponse(errorCode.NOT_FOUND, "role not found");
            const res = await roleController.getActionsById(123);
            expect(res).toEqual(resp);
        });


        it('should return Logic error response', async () => {
            const resp = new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);
            const body = new SetRoleActionDTO();
            const res = await roleController.createRoleAction(body);
            expect(res).toEqual(resp);
        });

        it('should return Logic error response', async () => {
            const resp = new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);
            const body = new SetRoleActionDTO();
            const res = await roleController.updateActions(body);
            expect(res).toEqual(resp);
        });

        it('should return Logic error response', async () => {
            const resp = new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);
            const res = await roleController.delete(123);
            expect(res).toEqual(resp);
        });


    });
});

