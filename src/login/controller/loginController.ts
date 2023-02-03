import { Body, Controller, Get, Param, Post, Request, Session } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { LoginDoc } from "../../doc/login/login";
import { LogicErrorResponse, SuccssResponse } from '../../response/Resp';
import { LoginService } from '../service/loginService';
import { User } from '../../entity/rbac/User';
import { NullObject } from "../../utils/NullObject";
import { errorCode, errorMessage } from "../../response/errorCode";

const tagName = "login";
const path = `api/${tagName}`;

@ApiTags(tagName)
@Controller(`${path}`)
export class LoginController {

    constructor(private loginService: LoginService) {

    }

    @Post('/login')
    @ApiOperation(LoginDoc.loginApiOperation)
    @ApiResponse(LoginDoc.loginApiResponse)
    @ApiBody(LoginDoc.loginApiBody)
    async login(@Body() body: User, @Session() session) {
        const user = await this.loginService.login(body);
        if(user instanceof NullObject) {
            return new LogicErrorResponse(errorCode.NOT_FOUND, errorMessage[errorCode.NOT_FOUND]);
        } else {
            session.user = user;
            return user;

        }

    }


    @Get('/logout')
    @ApiOperation(LoginDoc.logoutApiOperation)
    @ApiResponse(LoginDoc.logoutApiResponse)
    async logout(@Session() session) {
        await session.destroy();
        return new SuccssResponse();
    }


    @Get('/checkLogin')
    checkLogin(@Session() session) {
        const user = session.user;
        console.log("user: ", user);
        if(user === undefined) {
            return new SuccssResponse();

        } else {
            return user;

        }

    }

}