import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { controllerAuthMap, AuthModel } from '../utils/controllerAuthMap';

class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const session = req.session as any
        console.log(session);
        // console.log(req.sessionID);

        // console.log('Request...:', req.url);
        const url = req.url.replace(" ", "");
        const authModel: AuthModel = controllerAuthMap.get(url);
        console.log("authModel: ", authModel);
        // get user from session, get role and action from db
        // check the action is correct

        // if(qq === "qq") {
        //     // throw new Error("xxxx");
        //     const resp = {
        //         "statusCode": 401,
        //         "message": "Unauthorized"
        //     }
        //     res.statusCode = 401;
        //     res.send(resp)
        // } else {
        //     next();
        // }
        next();
      }

}

export { AuthMiddleware }