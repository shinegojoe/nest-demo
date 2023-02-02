import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ActionService } from '../service/actionService';
import { Action } from '../../entity/rbac/Action';
import { DataSource, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogicErrorResponse } from '../../response/Resp';
import { errorCode, errorMessage } from '../../response/errorCode';
// import { DeleteResponse, CreateResponse, UpdateResponse } from '../../../src/response/Resp';
import { DeleteResponse, CreateResponse, UpdateResponse } from '../../response/Resp';
import { ActionDoc } from '../../doc/rbac/action';
import { LoggerService } from '../../logger/logger.service';

const name = "action";

@ApiTags(name)
@Controller(`api/${name}`)
export class ActionController {
  logger;
  constructor(private readonly actionService: ActionService, private dataSource: DataSource,
    private loggerService: LoggerService) {
      this.logger = this.loggerService.getLogger();
    }


  @Get('/list')
  @ApiOperation(ActionDoc.listApiOperation)
  @ApiResponse(ActionDoc.listApiResponse)
  async list(): Promise<Array<Action>> {
    const res: Array<Action> = await this.actionService.list();
    return res;
  }

  @ApiOperation(ActionDoc.getApiOperation)
  @ApiParam(ActionDoc.getApiParam)
  @Get('/get/:id')
  async get(@Param('id') id: number): Promise<Action | LogicErrorResponse> {
    const res = await this.actionService.get(id);
    if (res === null) {
      const logicErrorResp = new LogicErrorResponse(errorCode.NOT_FOUND, "action not found");
      return logicErrorResp;
    } else {
      return res;
    }
  }

  @ApiOperation(ActionDoc.createApiOperation)
  @ApiBody(ActionDoc.createApiBody)
  @ApiResponse(ActionDoc.createApiResponse)
  @Post('/create')
  async create(@Body() body: Action): Promise<CreateResponse | LogicErrorResponse> {
    const res: InsertResult = await this.actionService.create(body);
    if (res === null) {
      return new LogicErrorResponse(errorCode.ALREADY_EXISTS, "action already exists");

    } else {
      return new CreateResponse();

    }
  }


  @ApiOperation(ActionDoc.updateApiOperation)
  @ApiBody(ActionDoc.updateApiBody)
  @Put('/update')
  async update(@Body() body: Action): Promise<UpdateResponse | LogicErrorResponse> {
    const res = await this.actionService.update(body);
    if (res.affected === 1) {
      return new UpdateResponse();
    } else {
      return new LogicErrorResponse(errorCode.NO_AFFECTED, "action update failed");
    }
  }


  @ApiOperation(ActionDoc.deleteApiOperation)
  @ApiParam(ActionDoc.deleteApiParam)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<DeleteResponse | LogicErrorResponse> {
    // delete role_action by aId
    // delete action by id
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await this.actionService.deleteRoleAction(id, queryRunner);
      const res: DeleteResult = await this.actionService.delete(id, queryRunner);
      await queryRunner.commitTransaction();
      if (res.affected === 0) {
        return new LogicErrorResponse(errorCode.NO_AFFECTED, errorMessage[errorCode.NO_AFFECTED]);
      } else {
        return new DeleteResponse();
      }
    } catch (e) {
      await queryRunner.rollbackTransaction();
      this.logger.error(e);
      
      return new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);


    } finally {
      await queryRunner.release();
    }

  }


}



//   // @ApiParam({name: 'id', required: true, description: 'either an integer for the project id or a string for the project name', schema: { oneOf: [{type: 'string'}, {type: 'integer'}]}})
