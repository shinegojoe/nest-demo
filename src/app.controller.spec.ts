import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService, useValue: {
          getHello: jest.fn(()=> {
            const p = new Promise<string>((resolve)=> {
              resolve("Hello World!");
            });

            return p;
          })
        }
      }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', async() => {
      const res = await appController.getHello();
      expect(res).toBe('Hello World!');
    });
  });
});
