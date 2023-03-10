import { BadRequestException, Body, Controller, Delete, Get, HttpException, 
    HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from '../decorator/authDecorator';
import { LoggerService } from '../logger/logger.service';


const name = "errorTest"
const path = `api/${name}`;

@ApiTags(name)
@Controller(`${path}`)
export class ErrorTestController {

    logger
    constructor(private loggerSerivce: LoggerService) {
        this.logger = this.loggerSerivce.getLogger();
    }

    @Get('/err400')
    err400() {
        throw new HttpException('err400', HttpStatus.BAD_REQUEST);
        return {}
    }

    @Get('/noError')
    noError() {
        // this.logger.xxx();
        // console.log("lll: ", this.logger);
        this.logger.info("qq123");
        this.logger.error("qq123");

        return { id: 1, name: "xxx"};
    }

    @Get('/logicError')
    logicError() {
        return { error: 333, message: "user not found"};
    }

    @Get('/moduleA')
    @AuthDecorator(path, "moduleA", "view")
    moduleA() {
        return { data: "this is moduleA"};
    }

    @Get('/moduleB')
    @AuthDecorator(path, "moduleB", "create")
    moduleB() {
        return { data: "this is moduleB"};
    }
}
