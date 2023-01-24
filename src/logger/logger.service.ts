import { Injectable } from '@nestjs/common';
const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;



@Injectable()
export class LoggerService {
    logger
    constructor() {
        this.logger = this.loggerInit();
    }

    loggerInit() {
        const date = new Date();

        const fileName = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + "err.log";

        const customFormat = printf(({ level, message, timestamp }) => {
            return `${timestamp} ${level}: ${message}`;
          });

        const logger = winston.createLogger({
            level: 'info',
            // format: winston.format.json(),
            format: combine(timestamp(), customFormat),

            // defaultMeta: { service: 'user-service' },
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: `log/${fileName}`, level: 'error' }),
            ],
          });
        return logger;
    }

    getLogger() {
        return this.logger;
    }

}
