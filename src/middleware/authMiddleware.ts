import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '../entity/rbac/User';
import { controllerAuthMap, AuthModel } from '../utils/controllerAuthMap';
import { UserService } from '../rbac/service/userService';
import { RoleService } from '../rbac/service/roleService';
import { NullObject } from '../utils/NullObject';
import { UserRoleVO } from '../rbac/vo/userRoleVO';
import { LoggerService } from '../logger/logger.service';

@Injectable()
class AuthMiddleware implements NestMiddleware {

  private whiteList: Array<string> = ["/login/login", "/login/logout", "/favicon.ico"];
  private logger;

  constructor(private userService: UserService, private roleService: RoleService, private loggerService: LoggerService) {
    this.logger = this.loggerService.getLogger();
  }

  writeLog(req: Request, user: User, url: string, isPass: boolean) {
    const ip = req.ip;
    let uId = 0;
    if (user === undefined) {
      uId = undefined;
    } else {
      uId = user.id;
    }
    const msg = `request: ${ip} ${url} uId: ${uId} isPass: ${isPass}`
    this.logger.info(msg);


  }

  async checkIsPass(user: User, authModel: AuthModel): Promise<boolean> {
    let isPass = false;
    const userRoleVO: UserRoleVO | NullObject = await this.userService.getRolesById(user.id);
    // console.log("roleList: ", userRoleVO);
    if (userRoleVO instanceof NullObject) {
      return isPass;

    } else {
      for (let role of userRoleVO.roleList) {
        // console.log(role);
        if (role.module === authModel.module) {
          const rolwActionVO = await this.roleService.getActionsById(role.id);
          const actionList = rolwActionVO.actionList.map((item) => {
            return item.name;
          })
          if (actionList.includes(authModel.action)) {
            isPass = true;

            // console.log("break");
            break;
          }
        }

      }
      return isPass;
    }
  }

  make401Resp() {
    const resp = {
      "statusCode": 401,
      "message": "Unauthorized"
    }
    return resp;
  }

  getAuthModel(url: string) {
    // console.log("controllerAuthMap: ", controllerAuthMap);

    let authModel = undefined;
    for(let [k, v] of controllerAuthMap) {
      // console.log("k: ", k);
      if(url.includes(k)) {
        authModel = v;
        break;
      }
    }
    return authModel;
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const session = req.session as any
    const user: User = session.user;
    const url = req.url.replace(" ", "");
    // console.log("@@: ", req);
    if (this.whiteList.includes(url)) {
      this.writeLog(req, user, url, true);
      next();
      return;
    }

    // const authModel: AuthModel = controllerAuthMap.get(url);
    const authModel: AuthModel = this.getAuthModel(url);
    // console.log("controllerAuthMap: ", controllerAuthMap);
    // console.log("url: ", url);
    // console.log("authModel: ", authModel);

    if (authModel === undefined) {
      this.writeLog(req, user, url, true);
      next();
      return;
    }

    if (user === undefined) {
      this.writeLog(req, user, url, false);
      const resp = this.make401Resp();
      res.statusCode = 401;
      res.send(resp)
      return;
    }
    const isPass = await this.checkIsPass(user, authModel);

    if (isPass) {
      this.writeLog(req, user, url, true);

      next();

    } else {
      this.writeLog(req, user, url, false);
      const resp = this.make401Resp();
      res.statusCode = 401;
      res.send(resp)
      return;
    }

  }
}



export { AuthMiddleware }