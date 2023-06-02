import { LoggerEntity } from './logger.entity';
import { LoggerService } from './logger.service';
export declare enum LoggerRankByEnum {
    call_times = 0,
    update_time = 1
}
export declare class loggerResolver {
    private loggerService;
    constructor(loggerService: LoggerService);
    Logger(rankBy: LoggerRankByEnum): Promise<LoggerEntity[]>;
}
