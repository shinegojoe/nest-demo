import { BadRequestException, Body, Controller, Delete, Get, HttpException, 
    HttpStatus, Param, Post, Put } from '@nestjs/common';
import { LoggerService } from '../logger/logger.service';


@Controller('errorTest')
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
}