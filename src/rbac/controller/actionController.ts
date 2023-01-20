import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActionService } from '../service/actionService';
import { Action } from '../../entity/rbac/Action';
import { DeleteResult, InsertResult } from 'typeorm';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/list')
  list(): Promise<Array<Action>> {
    return this.actionService.list();
  }

  @Get('/get/:id')
  get(@Param("id") id: number): Promise<Action> {
    return this.actionService.get(id);
  }

  @Delete('/delete/:id')
  delete(@Param("id") id: number): Promise<DeleteResult> {
    return this.actionService.delete(id);
  }

  @Post('/create')
  create(@Body() body: Action): Promise<InsertResult> {
    return this.actionService.create(body);
  }

  @Put('/update')
  update(@Body() body: Action) {
    return this.actionService.update(body);
  }

  @Get('/errorTest')
  errorTest() {
    return {
      "errorCode": 123,
      "message": "xxx",
      "info": 'this is info'
    }
  }


}