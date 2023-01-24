import { Test, TestingModule } from '@nestjs/testing';
import { ActionController } from '../../../rbac/controller/actionController';
import { ActionService } from '../../../rbac/service/actionService';
import { errorCode } from '../../../response/errorCode';
import { CreateResponse, DeleteResponse, LogicErrorResponse, UpdateResponse } from '../../../response/Resp';
import { Action } from '../../../entity/rbac/Action';



class MockActionService {
    list() {
        return [];
    }

    get(id: number) {
        const action = new Action();
        return action;
    }

    delete(id: number) {
        return {
            affected: 1
        }
    }

    update(action: Action) {
        return {
            affected: 1
        }
    }

    create(action: Action) {
        return {
            raw: {}
        }
    }
}

class MockActionLogicErrorService {

    get(id: number) {
        return null;
    }

    delete(id: number) {
        return {
            affected: 0
        }
    }

    update(action: Action) {
        return {
            affected: 0
        }
    }

    create(action: Action) {
        return null;
    }

}

describe('action controller ok test', () => {
    let actionController: ActionController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ActionController],
            providers: [
                // {
                //   provide: UserService, useValue: {
                //     all: jest.fn(() => {
                //       const p = new Promise<string>((resolve) => {
                //         resolve("Hello World!");
                //       });

                //       return p;
                //     })
                //   }
                // },
                { provide: ActionService, useClass: MockActionService }],
        }).compile();

        actionController = app.get<ActionController>(ActionController);
    });

    describe('root', () => {
        it('should return Action[]', async () => {
            const res = await actionController.list();
            expect(res).toHaveLength(0);
        });

        it('should return Action', async () => {
            const action = new Action();
            const res = await actionController.get(123);
            expect(res).toEqual(action);
        });

        it('should return delete success resp', async () => {
            const resp = new DeleteResponse();
            const res = await actionController.delete(123);
            expect(res).toEqual(resp);
        });

        it('should return update success resp', async () => {
            const resp = new UpdateResponse();
            const action = new Action();
            const res = await actionController.update(action);
            expect(res).toEqual(resp);
        });

        it('should return create success resp', async () => {
            const resp = new CreateResponse();
            const action = new Action();
            const res = await actionController.create(action);
            expect(res).toEqual(resp);
        });

    });
});



describe('action controller logic error test', () => {
    let actionController: ActionController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ActionController],
            providers: [
                { provide: ActionService, useClass: MockActionLogicErrorService }],
        }).compile();

        actionController = app.get<ActionController>(ActionController);
    });

    describe('root', () => {

        it('should return error resp', async () => {
            const resp = new LogicErrorResponse(errorCode.NOT_FOUND, "action not found");
            const res = await actionController.get(123);
            expect(res).toEqual(resp);
        });

        it('should return no affected resp', async () => {
            const resp = new LogicErrorResponse(errorCode.NO_AFFECTED, "action delete failed");
            const res = await actionController.delete(123);
            expect(res).toEqual(resp);
        });

        it('should return no affected resp', async () => {
            const resp = new LogicErrorResponse(errorCode.NO_AFFECTED, "action update failed");
            const action = new Action();
            const res = await actionController.update(action);
            expect(res).toEqual(resp);
        });
        
        it('should return already exists', async () => {
            const resp = new LogicErrorResponse(errorCode.ALREADY_EXISTS, "action already exists");
            const action = new Action();
            const res = await actionController.create(action);
            expect(res).toEqual(resp);
        });

    });
});