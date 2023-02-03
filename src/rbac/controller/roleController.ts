import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RoleService } from '../service/roleService';
import { Role } from '../../entity/rbac/Role';
import { DataSource, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogicErrorResponse } from '../../response/Resp';
import { errorCode, errorMessage } from '../../response/errorCode';
import { DeleteResponse, CreateResponse, UpdateResponse } from '../../response/Resp';
import { RoleDoc } from '../../doc/rbac/role';
import { SetRoleActionDTO } from '../dto/roleActionDTO';
import { GetRoleActionVO } from '../vo/roleActionVO';
import { NullObject } from '../../utils/NullObject';
import { LoggerService } from '../../logger/logger.service';

const tagName = "role";
const path = `api/${tagName}`

@ApiTags(tagName)
@Controller(`${path}`)
export class RoleController {
  private logger;
  constructor(private readonly roleService: RoleService, private dataSource: DataSource,
    private loggerService: LoggerService) {
    this.logger = this.loggerService.getLogger();
  }


  @Get('/list')
  @ApiOperation(RoleDoc.listApiOperation)
  @ApiResponse(RoleDoc.listApiResponse)
  async list(): Promise<Array<Role>> {
    const res: Array<Role> = await this.roleService.list();
    return res;
  }

  @ApiOperation(RoleDoc.getApiOperation)
  @ApiParam(RoleDoc.getApiParam)
  @Get('/get/:id')
  async get(@Param('id') id: number): Promise<Role | LogicErrorResponse> {
    const res = await this.roleService.get(id);
    if (res === null) {
      const logicErrorResp = new LogicErrorResponse(errorCode.NOT_FOUND, "role not found");
      return logicErrorResp;
    } else {
      return res;
    }
  }

  @ApiOperation(RoleDoc.createApiOperation)
  @ApiBody(RoleDoc.createApiBody)
  @ApiResponse(RoleDoc.createApiResponse)
  @Post('/create')
  async create(@Body() body: Role): Promise<CreateResponse | LogicErrorResponse> {
    const res = await this.roleService.create(body);
    if (res instanceof NullObject) {
      const logicErrorResp = new LogicErrorResponse(errorCode.ALREADY_EXISTS, "role already exists");
      return logicErrorResp;
    } else {
      return new CreateResponse();

    }
  }


  @ApiOperation(RoleDoc.updateApiOperation)
  @ApiBody(RoleDoc.updateApiBody)
  @Put('/update')
  async update(@Body() body: Role): Promise<UpdateResponse | LogicErrorResponse> {
    const res = await this.roleService.update(body);
    if (res.affected === 1) {
      return new UpdateResponse();
    } else {
      return new LogicErrorResponse(errorCode.NO_AFFECTED, "role update failed");
    }
  }


  @ApiOperation(RoleDoc.deleteApiOperation)
  @ApiParam(RoleDoc.deleteApiParam)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<DeleteResponse | LogicErrorResponse> {

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const res: boolean = await this.roleService.delete(id, queryRunner);
      await queryRunner.commitTransaction();
      return new DeleteResponse();
      
    } catch(e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      return new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);


    } finally {
      await queryRunner.release();

    }

  }

  @ApiOperation(RoleDoc.createRoleActionApiOperation)
  @ApiBody(RoleDoc.createRoleActionApiBody)
  @ApiResponse(RoleDoc.createRoleActionApiResponse)
  @Post('/createRoleAction')
  async createRoleAction(@Body() body: SetRoleActionDTO) {
    // add role, add actions with transcation
    const queryRunner = this.dataSource.createQueryRunner();
    // this.logger.info("qqq: ", queryRunner);
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await this.roleService.addRoleAction(body, queryRunner);
      await queryRunner.commitTransaction();
      return new CreateResponse();

    } catch (err) {
      // console.log("err: ", err);
      // this.logger.error("create roleAction failed, rollback!");
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
      return new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);

    } finally {
      await queryRunner.release();

    }
  }


  @ApiOperation(RoleDoc.updateRoleActionApiOperation)
  @ApiBody(RoleDoc.updateRoleActionApiBody)
  @ApiResponse(RoleDoc.updateRoleActionApiResponse)
  @Put('/updateRoleAction')
  public async updateActions(@Body() body: SetRoleActionDTO) {
    // update actions by roleId with transcation
    // delete all roleAction where rId
    // add new all roleAction

    const queryRunner = this.dataSource.createQueryRunner();
    // this.logger.info("qqq: ", queryRunner);
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await this.roleService.updateActions(body, queryRunner);
      await queryRunner.commitTransaction();
      return new UpdateResponse();

    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
      return new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);

    } finally {
      await queryRunner.release();
    }
  }


 

  @ApiOperation(RoleDoc.getActionsByIdApiOperation)
  @ApiParam(RoleDoc.getActionsByIdApiParam)
  @ApiResponse(RoleDoc.getActionsByIdApiResponse)
  @Get('/getActionsById/:id')
  async getActionsById(@Param('id') id: number): Promise<LogicErrorResponse | GetRoleActionVO> {
    const res = await this.roleService.getActionsById(id);
    if (res.role === null) {
      const resp: LogicErrorResponse = new LogicErrorResponse(errorCode.NOT_FOUND, "role not found");
      return resp;

    } else {
      return res;
    }
  }


}

