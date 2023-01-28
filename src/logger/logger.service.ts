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

        const fileNameErr = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + "err.log";
        const fileNameInfo = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + "-" + "info.log";

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
                new winston.transports.File({ filename: `log/${fileNameErr}`, level: 'error' }),
                new winston.transports.File({ filename: `log/${fileNameInfo}`, level: 'info' }),

            ],
          });
        return logger;
    }

    getLogger() {
        return this.logger;
    }

}
