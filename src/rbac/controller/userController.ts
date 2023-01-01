import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/userService';
import { User } from '../../entity/User';

@Controller('user')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/all')
  all(): Promise<Array<User>> {
    return this.appService.all();
  }
}
