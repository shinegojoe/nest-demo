import { Test, TestingModule } from '@nestjs/testing';
import { ActionController } from '../../../rbac/controller/actionController';
import { ActionService } from '../../../rbac/service/actionService';
import { errorCode } from '../../../response/errorCode';
import { LogicErrorResponse } from '../../../response/logicErrorResp';
import { Action } from '../../../entity/rbac/Action';



class MockActionService {
    list() {
        return [];
    }

    get(id: number) {
        const action = new Action();
        return action;
    }
}

class MockActionLogicErrorService {

    get(id: number) {
        const resp = new LogicErrorResponse(errorCode.NOT_FOUND, "action not found");
        return resp;
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

    });
});