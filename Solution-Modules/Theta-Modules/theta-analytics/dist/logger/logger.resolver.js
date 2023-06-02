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
exports.loggerResolver = exports.LoggerRankByEnum = void 0;
const graphql_1 = require("@nestjs/graphql");
const logger_entity_1 = require("./logger.entity");
const logger_service_1 = require("./logger.service");
var LoggerRankByEnum;
(function (LoggerRankByEnum) {
    LoggerRankByEnum[LoggerRankByEnum["call_times"] = 0] = "call_times";
    LoggerRankByEnum[LoggerRankByEnum["update_time"] = 1] = "update_time";
})(LoggerRankByEnum = exports.LoggerRankByEnum || (exports.LoggerRankByEnum = {}));
(0, graphql_1.registerEnumType)(LoggerRankByEnum, {
    name: 'LoggerRankByEnum'
});
let loggerResolver = class loggerResolver {
    constructor(loggerService) {
        this.loggerService = loggerService;
    }
    async Logger(rankBy) {
        return await this.loggerService.query(rankBy);
    }
};
__decorate([
    (0, graphql_1.Query)(() => [logger_entity_1.LoggerEntity]),
    __param(0, (0, graphql_1.Args)('rank_by', {
        type: () => LoggerRankByEnum,
        nullable: true,
        defaultValue: LoggerRankByEnum.call_times
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], loggerResolver.prototype, "Logger", null);
loggerResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [logger_service_1.LoggerService])
], loggerResolver);
exports.loggerResolver = loggerResolver;
//# sourceMappingURL=logger.resolver.js.map