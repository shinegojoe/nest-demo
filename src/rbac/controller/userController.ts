import { UserService } from '../service/userService';
import { User } from '../../entity/rbac/User';
import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RoleService } from '../service/roleService';
import { Role } from '../../entity/rbac/Role';
import { DataSource, DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { ApiBody, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LogicErrorResponse } from '../../response/Resp';
import { errorCode, errorMessage } from '../../response/errorCode';
import { DeleteResponse, CreateResponse, UpdateResponse } from '../../response/Resp';
import { UserDoc } from '../../doc/rbac/user';
import { SetUserRoleDTO } from '../dto/userRoleDTO';
import { GetRoleActionVO } from '../vo/roleActionVO';
import { NullObject } from '../../utils/NullObject';
import { LoggerService } from '../../logger/logger.service';
import { AuthDecorator } from '../../decorator/authDecorator';
import { Request } from 'supertest';
import { controllerAuthMap } from '../../utils/controllerAuthMap';

const name = "user";

@ApiTags(name)
@Controller(name)
export class UserController {

  private logger;

  constructor(private readonly userService: UserService, private dataSource: DataSource,
    private loggerService: LoggerService) {
      this.logger = this.loggerService.getLogger();
    }



  @Get('/list')
  @ApiOperation(UserDoc.listApiOperation)
  @ApiResponse(UserDoc.listApiResponse)
  @AuthDecorator(name, "qq", "action")
  async list(): Promise<Array<Role>> {
    // console.log("req: ", request.url);
    // req.session.uId = 123;
    console.log(controllerAuthMap);
    const res: Array<Role> = await this.userService.list();
    return res;
  }

  @ApiOperation(UserDoc.getApiOperation)
  @ApiParam(UserDoc.getApiParam)
  @Get('/get/:id')
  async get(@Param('id') id: number): Promise<Role | LogicErrorResponse> {
    // const res = await this.roleService.get(id);
    // if (res === null) {
    //   const logicErrorResp = new LogicErrorResponse(errorCode.NOT_FOUND, "role not found");
    //   return logicErrorResp;
    // } else {
    //   return res;
    // }
    return;
  }

  @ApiOperation(UserDoc.createApiOperation)
  @ApiBody(UserDoc.createApiBody)
  @ApiResponse(UserDoc.createApiResponse)
  @Post('/create')
  async create(@Body() body: User): Promise<CreateResponse | LogicErrorResponse> {
    const res = await this.userService.create(body);
    if (res instanceof NullObject) {
      const logicErrorResp = new LogicErrorResponse(errorCode.ALREADY_EXISTS, `user ${errorMessage[errorCode.ALREADY_EXISTS]}`);
      return logicErrorResp;
    } else {
      return new CreateResponse();
    }
  }


  @ApiOperation(UserDoc.updateApiOperation)
  @ApiBody(UserDoc.updateApiBody)
  @Put('/update')
  async update(@Body() body: Role): Promise<UpdateResponse | LogicErrorResponse> {
    // const res = await this.roleService.update(body);
    // if (res.affected === 1) {
    //   return new UpdateResponse();
    // } else {
    //   return new LogicErrorResponse(errorCode.NO_AFFECTED, "role update failed");
    // }
    return;
  }


  @ApiOperation(UserDoc.deleteApiOperation)
  @ApiParam(UserDoc.deleteApiParam)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<DeleteResponse | LogicErrorResponse> {

    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();

    // try {
    //   const res: boolean = await this.roleService.delete(id, queryRunner);
    //   await queryRunner.commitTransaction();
    //   return new DeleteResponse();
      
    // } catch(e) {
    //   this.logger.error(e);
    //   await queryRunner.rollbackTransaction();
    //   return new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);


    // } finally {
    //   await queryRunner.release();

    // }
    return;

  }

  @ApiOperation(UserDoc.createRoleActionApiOperation)
  @ApiBody(UserDoc.createRoleActionApiBody)
  @ApiResponse(UserDoc.createRoleActionApiResponse)
  @Post('/setUserRole')
  async setUserRole(@Body() body: SetUserRoleDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await this.userService.setUserRole(body, queryRunner);
      await queryRunner.commitTransaction();
      return new CreateResponse();

    } catch (err) {
      this.logger.error(err);
      await queryRunner.rollbackTransaction();
      return new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);

    } finally {
      await queryRunner.release();
    }
  }


  @ApiOperation(UserDoc.updateRoleActionApiOperation)
  @ApiBody(UserDoc.updateRoleActionApiBody)
  @ApiResponse(UserDoc.updateRoleActionApiResponse)
  @Put('/updateUserRole')
  public async updateUserRole(@Body() body: SetUserRoleDTO) {
    // update actions by roleId with transcation
    // delete all userRole where uId
    // add new all userRole

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await this.userService.updateUserRole(body, queryRunner);
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


 

  @ApiOperation(UserDoc.getActionsByIdApiOperation)
  @ApiParam(UserDoc.getActionsByIdApiParam)
  @ApiResponse(UserDoc.getActionsByIdApiResponse)
  @Get('/getActionsById/:id')
  async getActionsById(@Param('id') id: number): Promise<LogicErrorResponse | GetRoleActionVO> {
    // const res = await this.roleService.getActionsById(id);
    // if (res.role === null) {
    //   const resp: LogicErrorResponse = new LogicErrorResponse(errorCode.NOT_FOUND, "role not found");
    //   return resp;

    // } else {
    //   return res;
    // }
    return;
  }

}
