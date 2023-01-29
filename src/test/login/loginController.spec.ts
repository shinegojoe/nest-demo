import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../../login/controller/loginController';
import { LoginService } from '../../login/service/loginService';
import { User } from '../../entity/rbac/User';
import { errorCode, errorMessage } from '../../response/errorCode';
import { LogicErrorResponse, SuccssResponse } from '../../response/Resp';
import { NullObject } from '../../utils/NullObject';

class MockLoginService {

    login(body: User) {
        return new User();
    }

    logout() {

    }
}

class MockLoginLogicErrorService {
    login(body: User) {
        return new NullObject();
    }
}


describe('login controller ok test', () => {
    let loginController: LoginController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                { provide: LoginService, useClass: MockLoginService },


            ],
        }).compile();

        loginController = app.get<LoginController>(LoginController);
    });

    describe('root', () => {
        it('should return success response', async () => {
            const user = new User();
            const session = {};
            const res = await loginController.login(user, session);
            expect(res).toEqual(user);
        });

        it('should return role', async () => {
            const resp = new SuccssResponse();
            const session = {
                destroy: (()=> {

                })
            }
            const res = await loginController.logout(session);
            expect(res).toEqual(resp);
        });

    });
});


describe('login controller logic error test', () => {
    let loginController: LoginController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [LoginController],
            providers: [
                { provide: LoginService, useClass: MockLoginLogicErrorService },


            ],
        }).compile();

        loginController = app.get<LoginController>(LoginController);
    });

    describe('root', () => {
        it('should return logic error response', async () => {
            const resp = new LogicErrorResponse(errorCode.NOT_FOUND, errorMessage[errorCode.NOT_FOUND], );
            const user = new User();
            const session = {};
            const res = await loginController.login(user, session);
            expect(res).toEqual(resp);
        });

     

    });
});

