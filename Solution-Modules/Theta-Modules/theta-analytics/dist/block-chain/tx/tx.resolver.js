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
exports.TxResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tx_service_1 = require("./tx.service");
const theta_tx_model_1 = require("./theta-tx.model");
const common_1 = require("@nestjs/common");
const moment = require('moment');
let TxResolver = class TxResolver {
    constructor(txService, cacheManager) {
        this.txService = txService;
        this.cacheManager = cacheManager;
    }
    TransactionsStatistics() {
        return {};
    }
    async ByDate(timezoneOffset, amount) {
        const currDate = moment()
            .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
            .format('DD');
        const cacheKey = 'tx-by-date_' + currDate + '_' + amount + '_' + timezoneOffset;
        if (await this.cacheManager.get(cacheKey)) {
            return await this.cacheManager.get(cacheKey);
        }
        const res = await this.txService.getThetaDataByDate(timezoneOffset, amount);
        await this.cacheManager.set(cacheKey, res, { ttl: 60 * 60 * 12 });
        return res;
    }
    async ByHour(timezoneOffset, amount) {
        return await this.txService.getThetaByHour(timezoneOffset, amount);
    }
};
__decorate([
    (0, graphql_1.Query)(() => theta_tx_model_1.ThetaTransactionStatisticsType),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TxResolver.prototype, "TransactionsStatistics", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('timezoneOffset', {
        type: () => graphql_1.Int,
        nullable: true,
        defaultValue: '0',
        description: 'the timezone difference in minutes, between the UTC and the current local time.' +
            'Such as PDT time is utc-07, should pass -420'
    })),
    __param(1, (0, graphql_1.Args)('amount', {
        type: () => theta_tx_model_1.TX_GET_DATA_AMOUNT,
        defaultValue: theta_tx_model_1.TX_GET_DATA_AMOUNT._2week
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TxResolver.prototype, "ByDate", null);
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, graphql_1.Args)('timezoneOffset', {
        type: () => graphql_1.Int,
        nullable: true,
        defaultValue: '0',
        description: 'the timezone difference in minutes, between the UTC and the current local time.' +
            'Such as PDT time is utc-07, should pass -420'
    })),
    __param(1, (0, graphql_1.Args)('amount', {
        type: () => theta_tx_model_1.TX_GET_DATA_AMOUNT,
        defaultValue: theta_tx_model_1.TX_GET_DATA_AMOUNT._2week
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], TxResolver.prototype, "ByHour", null);
TxResolver = __decorate([
    (0, graphql_1.Resolver)((of) => theta_tx_model_1.ThetaTransactionStatisticsType),
    __param(1, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [tx_service_1.TxService, Object])
], TxResolver);
exports.TxResolver = TxResolver;
//# sourceMappingURL=tx.resolver.js.map