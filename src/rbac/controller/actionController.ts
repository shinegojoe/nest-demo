import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActionService } from '../service/actionService';
import { Action } from '../../entity/rbac/Action';
import { DeleteResult, InsertResult } from 'typeorm';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { LogicErrorResponse } from '../../response/logicErrorResp';
import { errorCode } from '../../response/errorCode';

@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/list')
  async list(): Promise<Array<Action>> {
    const res: Array<Action> = await this.actionService.list();
    return res;
  }

  @Get('/get/:id')
  @ApiParam({name: 'id', required: true, description: 'either an integer for the project id or a string for the project name', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
  async get(@Param('id') id: number): Promise<Action | LogicErrorResponse> {
    const res = await this.actionService.get(id);
    if(res === null) {
      const logicErrorResp = new LogicErrorResponse(errorCode.NOT_FOUND, "action not found");
      return logicErrorResp;
    } else {
      return res;
    }

  }

  @Delete('/delete/:id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.actionService.delete(id);
  }

  @Post('/create')
  @ApiBody({description: "body:any someMethod", type: Action})
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