import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { ActionController } from '../../../rbac/controller/actionController';
import { ActionService } from '../../../rbac/service/actionService';
import { Action } from '../../../entity/rbac/Action';


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

describe('actionService', () => {
  let service: ActionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      // controllers: [UserController],
      
      providers: [
        ActionService,
        { provide: getRepositoryToken(Action), useFactory: repositoryMockFactory },

       
      ],
    }).compile();

    service = app.get<ActionService>(ActionService);
  });

  describe('root', () => {
    it('should return 123', async() => {
      const res = await service.all();
      expect(res).toBe(123);
    });
  });
});