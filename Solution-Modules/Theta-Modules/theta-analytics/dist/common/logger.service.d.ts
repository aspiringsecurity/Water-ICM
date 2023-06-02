import { ConsoleLogger } from '@nestjs/common';
export declare class LoggerService extends ConsoleLogger {
    minTs: number;
    timeMonitor(name: string, startTime: number): void;
}
