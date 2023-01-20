import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../../rbac/controller/userController';
import { UserService } from '../../../rbac/service/userService';

class MyServiceStubClass {
  all() {
    return 123;
  }
  xx() {
    // const p = new Promise((resolve, reject)=> {
    //   throw new Error();

    //   // reject(new Error());
    // })
    // return p;
    throw new Error();

  }

}

describe('AppController', () => {
  let userController: UserController;
  let userController2: UserController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
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
        { provide: UserService, useClass: MyServiceStubClass }],
    }).compile();


    userController = app.get<UserController>(UserController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async () => {
      const res = await userController.all();
      expect(res).toBe(123);
    });

    it("xxx", async () => {
      const res = await userController.xx();
      // const res = () => {
      //   throw new TypeError();
      // };
      // expect(res).toThrowError(TypeError);
      // expect(res).toBe(123);
      // expect(() => { userController.xx(); }).toThrow(Error);
      // expect(() => { userController.xx(); }).toThrow(Error);
      expect(res).toBe("err");


    })
  });
});