import { Repository } from 'typeorm';
import { LoggerEntity } from './logger.entity';
import { LoggerRankByEnum } from './logger.resolver';
export declare class LoggerService {
    private loggerRepository;
    constructor(loggerRepository: Repository<LoggerEntity>);
    addQueryLog(query: string, hash: string): Promise<void>;
    query(rankBy: LoggerRankByEnum): Promise<LoggerEntity[]>;
}
