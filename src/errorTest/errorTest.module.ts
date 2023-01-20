import { Module } from '@nestjs/common';
import { ErrorTestController } from './errorTestController';
import { LoggerService } from '../logger/logger.service';

@Module({
    imports: [],
    controllers: [ErrorTestController],
    providers: [LoggerService],
})
export class ErrorTestModule {

}