"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const logger_entity_1 = require("./logger.entity");
const logger_resolver_1 = require("./logger.resolver");
const moment = require('moment');
let LoggerService = class LoggerService {
    constructor(loggerRepository) {
        this.loggerRepository = loggerRepository;
    }
    async addQueryLog(query, hash) {
        await this.loggerRepository.query(`INSERT INTO  logger_entity (query,hash,call_times,update_timestamp) VALUES (?, ?,1,${moment().unix()}) ON CONFLICT (hash) DO UPDATE set call_times=call_times+1,update_timestamp=${moment().unix()}`, [query, hash]);
    }
    async query(rankBy) {
        const queryParam = {};
        switch (rankBy) {
            case logger_resolver_1.LoggerRankByEnum.call_times:
                queryParam.order = { call_times: 'DESC' };
                break;
            case logger_resolver_1.LoggerRankByEnum.update_time:
                queryParam.order = { update_timestamp: 'DESC' };
                break;
            default:
                break;
        }
        return await this.loggerRepository.find(queryParam);
    }
};
LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(logger_entity_1.LoggerEntity, 'logger')),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LoggerService);
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map