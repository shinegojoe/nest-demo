import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../../login/controller/loginController';
import { LoginService } from '../../login/service/loginService';
import { User } from '../../entity/rbac/User';
import { errorCode, errorMessage } from '../../response/errorCode';
import { LogicErrorResponse, SuccssResponse } from '../../response/Resp';

class MockLoginService {

    login() {
        return new User();
    }

    logout() {

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
            // const resp = new LogicErrorResponse(errorCode.NOT_FOUND, errorMessage[errorCode.NOT_FOUND], );
            const resp = new SuccssResponse();
            const user = new User();
            const session = {};
            const res = await loginController.login(user, session);
            expect(res).toEqual(resp);
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


    });
});

