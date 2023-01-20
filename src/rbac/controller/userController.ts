import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/userService';
import { User } from '../../entity/rbac/User';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  all(): Promise<Array<User>> {
    return this.userService.all();
  }

  @Get('/xx')
  xx(): Promise<string> {
    try {
      return this.userService.xx();

    } catch(err) {
      return new Promise((resolve, reject)=> {
        resolve("err");
      })
    }
  }
}
