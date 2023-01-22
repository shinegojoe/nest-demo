import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActionService } from '../service/actionService';
import { Action } from '../../entity/rbac/Action';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { LogicErrorResponse } from '../../response/Resp';
import { errorCode } from '../../response/errorCode';
// import { DeleteResponse, CreateResponse, UpdateResponse } from '../../../src/response/Resp';
import {DeleteResponse, CreateResponse, UpdateResponse } from '../../response/Resp';

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
  async delete(@Param('id') id: number): Promise<DeleteResponse | LogicErrorResponse> {
    const res: DeleteResult = await this.actionService.delete(id);
    if(res.affected === 0) {
      
      return new LogicErrorResponse(errorCode.NO_AFFECTED, "action delete failed");
    } else {
      return new DeleteResponse();
    }
  }


  @ApiOperation({description: "create action"})
  @ApiBody({description: "body: Action", type: Action})
  @Post('/create')
  async create(@Body() body: Action): Promise<CreateResponse> {
    const res: InsertResult = await this.actionService.create(body);
    return new CreateResponse();    
  }


  @ApiOperation({description: "update action"})
  @ApiBody({description: "body: Action", type: Action})
  @Put('/update')
  async update(@Body() body: Action): Promise<UpdateResponse | LogicErrorResponse> {
    const res = await this.actionService.update(body);
    if(res.affected === 1) {
      return new UpdateResponse();
    } else {
      return new LogicErrorResponse(errorCode.NO_AFFECTED, "action update failed");
    }
  }

}



//   // @ApiParam({name: 'id', required: true, description: 'either an integer for the project id or a string for the project name', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
