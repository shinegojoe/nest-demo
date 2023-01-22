import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActionService } from '../service/actionService';
import { Action } from '../../entity/rbac/Action';
import { DeleteResult, InsertResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LogicErrorResponse } from '../../response/logicErrorResp';
import { errorCode } from '../../response/errorCode';

@ApiTags('action')
@Controller('actions')
export class ActionController {
  constructor(private readonly actionService: ActionService) {}

  @Get('/list')
  @ApiOperation({description: "return the action list"})
  async list(): Promise<Array<Action>> {
    const res: Array<Action> = await this.actionService.list();
    return res;
  }

  @ApiOperation({description: "get action by id"})
  @ApiParam({name: 'id', required: true, description: 'either an integer for the project id or a string for the project name' })
  @Get('/get/:id')
  async get(@Param('id') id: number): Promise<Action | LogicErrorResponse> {
    const res = await this.actionService.get(id);
    if(res === null) {
      const logicErrorResp = new LogicErrorResponse(errorCode.NOT_FOUND, "action not found");
      return logicErrorResp;
    } else {
      return res;
    }
  }

  @ApiOperation({description: "delete action by id"})
  @ApiParam({name: 'id', required: true})
  @Delete('/delete/:id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.actionService.delete(id);
  }


  @ApiOperation({description: "create action"})
  @ApiBody({description: "body: Action", type: Action})
  @Post('/create')
  create(@Body() body: Action): Promise<InsertResult> {
    return this.actionService.create(body);
  }


  @ApiOperation({description: "update action"})
  @ApiBody({description: "body: Action", type: Action})
  @Put('/update')
  update(@Body() body: Action) {
    return this.actionService.update(body);
  }

}



//   // @ApiParam({name: 'id', required: true, description: 'either an integer for the project id or a string for the project name', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
