import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InsertQueryBuilder, Repository } from 'typeorm';
// import { ActionController } from '../../../rbac/controller/actionController';
import { ActionService } from '../../../rbac/service/actionService';
import { Action } from '../../../entity/rbac/Action';


class MockActionDao  {
  find() {
    const action = new Action();
    return [action];
  }

  insert(body: Action) {
    return true;
  }

  save() {

  }

  delete() {

  }

  findOneBy() {

  }

}

class MockActionDaoLogicError  {
  find() {
    return [];
  }

}


export type MockType<T> = {
    [P in keyof T]?: jest.Mock<unknown>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
    find: jest.fn(()=> {
        return 123;
    }),
    // ...
  }));

// export class MockFactory {
//     static getMock<T>(type: new (...args: any[]) => T, includes?: string[]): MockType<T> {
//         const mock: MockType<T> = {};

//         Object.getOwnPropertyNames(type.prototype)
//             .filter((key: string) => key !== 'constructor' && (!includes || includes.includes(key)))
//             .map((key: string) => {
//                 mock[key] = jest.fn();
//             });

//         return mock;
//     }
// }

describe('action service ok test', () => {
  let service: ActionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // controllers: [UserController],
      
      providers: [
        ActionService,
        // { provide: getRepositoryToken(Action), useFactory: repositoryMockFactory },
        { provide: getRepositoryToken(Action), useClass: MockActionDao },

       
      ],
    }).compile();

    service = app.get<ActionService>(ActionService);
  });

  describe('action service ok test', () => {
    // it('should return 123', async() => {
    //   const res = await service.list();
    //   expect(res).toBe(123);
    // });

    it('should return Array<Action>', async() => {
      const res = await service.list();
      expect(res).toHaveLength(1);
      
    });

    // it('should return true', async() => {
    //   const body = new Action();
    //   const res = await service.create(body);
    //   expect(res).toBe(true)
      
    // });

  });
});


// describe('action service logic error test', () => {
//   let service: ActionService;

//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       // controllers: [UserController],
      
//       providers: [
//         ActionService,
//         // { provide: getRepositoryToken(Action), useFactory: repositoryMockFactory },
//         { provide: ActionService, useClass: MockActionDao },

       
//       ],
//     }).compile();

//     service = app.get<ActionService>(ActionService);
//   });



// });