import { Injectable } from '@nestjs/common';
const winston = require('winston');


@Injectable()
export class LoggerService {
    logger
    constructor() {
        this.logger = this.loggerInit();
    }

    loggerInit() {
        const logger = winston.createLogger({
            level: 'info',
            format: winston.format.json(),
            defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'error.log', level: 'error' }),
            ],
          });
        return logger;
    }

    getLogger() {
        return this.logger;
    }

  
    xxx() {
        console.log("this is logger service!!");
    }
  
}
