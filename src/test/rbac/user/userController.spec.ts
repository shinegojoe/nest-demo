import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../rbac/controller/userController';
import { UserService } from '../../../rbac/service/userService';
import { CreateResponse, UpdateResponse, DeleteResponse, LogicErrorResponse } from '../../../response/Resp';
import { MockDataSource } from '../../common/mockDataSource';
import { MockLoggerService } from '../../common/mockLogger';
import { LoggerService } from '../../../logger/logger.service';
import { DataSource, QueryRunner } from 'typeorm';
import { SetUserRoleDTO } from '../../../rbac/dto/userRoleDTO';
import { User } from '../../../entity/rbac/User';
import { errorCode, errorMessage } from '../../../response/errorCode';
import { NullObject } from '../../../utils/NullObject';
import { RoleService } from '../../../rbac/service/roleService';
import { GetRoleActionVO } from '../../../rbac/vo/roleActionVO';
import { UserRoleActionVO, UserRoleVO } from '../../../rbac/vo/userRoleVO';

class MockUserService {
  list() {
    return [];
  }

  create(body: User) {
    return {
      raw: {}
    }
  }

  setUserRole(body: SetUserRoleDTO) {
    return true;

  }

  updateUserRole(body: SetUserRoleDTO) {
    return true;
  }

  getRolesById(id: number) {
    const user = new User();
    return new UserRoleVO(user, []);
  }

  deleteUser(id: number, q: QueryRunner) {
    return {
      affected: 1
    }
  }

}

class MockLogicErrorUserService {
  create(body: User) {
    return new NullObject();
  }

  setUserRole(body: SetUserRoleDTO) {
    throw new Error();

  }

  updateUserRole(body: SetUserRoleDTO) {
    throw new Error();
  }

  getRolesById(id: number) {
    return new NullObject();
  }

  deleteUser(id: number, q: QueryRunner) {
    return {
      affected: 0
    }
  }

}


class MockRoleService {
  getActionsById(id: number) {
    const vo = new GetRoleActionVO();

  }
}

class MockRoleLogicErrorService {
  
}

describe('AppController ok test', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: DataSource, useClass: MockDataSource },
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: RoleService, useClass: MockRoleService }

      ],
    }).compile();


    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return user list', async () => {
      const res = await userController.list();
      expect(res).toHaveLength(0)
    });

    it('should return create response', async () => {
      const resp = new CreateResponse();
      const body = new User();
      const res = await userController.create(body);
      expect(res).toEqual(resp);
    });

    it('should return create response', async () => {
      const resp = new CreateResponse();
      const body = new SetUserRoleDTO();
      const res = await userController.setUserRole(body);
      expect(res).toEqual(resp);
    });

    it('should return update response', async () => {
      const resp = new UpdateResponse();
      const body = new SetUserRoleDTO();
      const res = await userController.updateUserRole(body);
      expect(res).toEqual(resp);
    });

    it('should return UserRoleActionVO ', async () => {
      const resp = new UserRoleActionVO();
      resp.user = new User();
      const res = await userController.getRoleActionListById(123);
      expect(res).toEqual(resp);
    });

    it('should return DeleteResponse ', async () => {
      const resp = new DeleteResponse();
      const res = await userController.delete(123);
      expect(res).toEqual(resp);
    });






  });
});


describe('AppController error test', () => {
  let userController: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UserService, useClass: MockLogicErrorUserService },
        { provide: DataSource, useClass: MockDataSource },
        { provide: LoggerService, useClass: MockLoggerService },
        { provide: RoleService, useClass: MockRoleLogicErrorService }


      ],
    }).compile();


    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {

    it('should return Logic error response', async () => {
      const resp = new LogicErrorResponse(errorCode.ALREADY_EXISTS, `user ${errorMessage[errorCode.ALREADY_EXISTS]}`);
      const body = new User();
      const res = await userController.create(body);
      expect(res).toEqual(resp);
    });

    it('should return Logic error response', async () => {
      const resp = new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);
      const body = new SetUserRoleDTO();
      const res = await userController.setUserRole(body);
      expect(res).toEqual(resp);
    });

    it('should return Logic error response', async () => {
      const resp = new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);
      const body = new SetUserRoleDTO();
      const res = await userController.updateUserRole(body);
      expect(res).toEqual(resp);
    });

    it('should return Logic error response', async () => {
      const resp = new LogicErrorResponse(errorCode.NOT_FOUND, errorMessage[errorCode.NOT_FOUND]);
      // const body = new SetUserRoleDTO();
      const res = await userController.getRoleActionListById(123);
      expect(res).toEqual(resp);
    });

    it('should return Logic error response', async () => {
      const resp = new LogicErrorResponse(errorCode.NO_AFFECTED, errorMessage[errorCode.NO_AFFECTED]);
      const res = await userController.delete(123);
      expect(res).toEqual(resp);
    });


  });
});