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
import { UserRoleVO, UserRoleActionVO } from '../vo/userRoleVO';
import { AppDataSource } from '../../data-source'

const tagName = "user";
const path = `api/${tagName}`

@ApiTags(tagName)
@Controller(`${path}`)
export class UserController {

  private logger;

  constructor(private readonly userService: UserService, private dataSource: DataSource,
    private loggerService: LoggerService, private roleService: RoleService) {
      this.logger = this.loggerService.getLogger();
    }



  @Get('/list')
  @ApiOperation(UserDoc.listApiOperation)
  @ApiResponse(UserDoc.listApiResponse)
  // @AuthDecorator(name, "moduleA", "view")
  async list(): Promise<Array<User>> {
    // console.log("req: ", request.url);
    // req.session.uId = 123;
    // console.log(controllerAuthMap);
    const res: Array<User> = await this.userService.list();
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
    
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const res: DeleteResult = await this.userService.deleteUser(id, queryRunner);
      await queryRunner.commitTransaction();
      if(res.affected ===0) {
        return new LogicErrorResponse(errorCode.NO_AFFECTED, errorMessage[errorCode.NO_AFFECTED]);

      } else {
        return new DeleteResponse();

      }
      
    } catch(e) {
      this.logger.error(e);
      await queryRunner.rollbackTransaction();
      return new LogicErrorResponse(errorCode.ROLL_BACK, errorMessage[errorCode.ROLL_BACK]);


    } finally {
      await queryRunner.release();

    }
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
  @Get('/getRolesById/:id')
  async getRolesById(@Param('id') id: number): Promise<LogicErrorResponse | UserRoleVO> {
    const vo  = await this.userService.getRolesById(id);
    if( vo instanceof NullObject) {
      return new LogicErrorResponse(errorCode.NOT_FOUND, errorMessage[errorCode.NOT_FOUND]);

    } else { 
      return vo;
    }
  }



  @ApiOperation(UserDoc.getRoleActionListByIdApiOperation)
  @ApiParam(UserDoc.getRoleActionLisApiParam)
  @ApiResponse(UserDoc.getRoleActionListByIdApiResponse)
  @Get('/getRoleActionListById/:id')
  async getRoleActionListById(@Param('id') id: number): Promise<UserRoleActionVO | LogicErrorResponse> {
    
    const userRoleVO  = await this.userService.getRolesById(id);
    if(userRoleVO instanceof NullObject) {
      return new LogicErrorResponse(errorCode.NOT_FOUND, errorMessage[errorCode.NOT_FOUND]);

    } else {
      const res = new UserRoleActionVO();
      res.user = userRoleVO.user;
      const roleList = userRoleVO.roleList;
      for(let role of roleList) {
        const roleActionVO = await this.roleService.getActionsById(role.id);
        res.roleList.push(roleActionVO);
      }
      return res;


    }

  }

}
