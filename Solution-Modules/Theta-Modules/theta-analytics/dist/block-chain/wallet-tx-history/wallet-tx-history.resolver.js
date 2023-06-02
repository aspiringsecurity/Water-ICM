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
exports.WalletTxHistoryResolver = void 0;
const graphql_fields_list_1 = require("graphql-fields-list");
const theta_enum_1 = require("./../tx/theta.enum");
const wallet_tx_history_model_1 = require("./wallet-tx-history.model");
const wallet_tx_history_service_1 = require("./wallet-tx-history.service");
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("graphql");
const moment = require('moment');
let WalletTxHistoryResolver = class WalletTxHistoryResolver {
    constructor(walletTxHistoryService) {
        this.walletTxHistoryService = walletTxHistoryService;
    }
    async TxHistory(walletAddress, take, skip, txType) {
        if (parseInt(walletAddress) == 0)
            return {
                hasNextPage: false,
                nodes: [],
                totalCount: 0,
                take: take,
                skip: skip,
                endCursor: skip + 0
            };
        const [hasNextPage, totalNumber, res] = await this.walletTxHistoryService.getTransactions(walletAddress.toLocaleLowerCase(), take, skip, txType);
        return {
            hasNextPage: hasNextPage,
            nodes: res,
            totalCount: totalNumber,
            take: take,
            skip: skip,
            endCursor: skip + res.length
        };
    }
    async WalletActivityHistory(info, walletAddress, startTime, endTime) {
        const history = new wallet_tx_history_model_1.HistoryTransactionsModel();
        if (!startTime)
            startTime = moment().subtract(7, 'days').unix();
        if (!endTime)
            endTime = moment().unix();
        if (parseInt(walletAddress) == 0)
            return { start_time: startTime, end_time: endTime };
        for (const field of (0, graphql_fields_list_1.fieldsList)(info)) {
            history[field] = await this.walletTxHistoryService.getActivityHistory(field, walletAddress.toLocaleLowerCase(), startTime, endTime);
        }
        history.start_time = startTime;
        history.end_time = endTime;
        return history;
    }
};
__decorate([
    __param(0, (0, graphql_1.Args)('wallet_address')),
    __param(1, (0, graphql_1.Args)('take', { type: () => graphql_1.Int, defaultValue: 10 })),
    __param(2, (0, graphql_1.Args)('skip', { type: () => graphql_1.Int, defaultValue: 0 })),
    __param(3, (0, graphql_1.Args)('tx_type', {
        type: () => theta_enum_1.THETA_TRANSACTION_TYPE_ENUM,
        defaultValue: undefined,
        nullable: true
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], WalletTxHistoryResolver.prototype, "TxHistory", null);
__decorate([
    (0, graphql_1.Query)(() => wallet_tx_history_model_1.HistoryTransactionsModel),
    __param(0, (0, graphql_1.Info)()),
    __param(1, (0, graphql_1.Args)('wallet_address')),
    __param(2, (0, graphql_1.Args)('start_time', { type: () => graphql_2.GraphQLInt, nullable: true })),
    __param(3, (0, graphql_1.Args)('end_time', { type: () => graphql_2.GraphQLInt, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], WalletTxHistoryResolver.prototype, "WalletActivityHistory", null);
WalletTxHistoryResolver = __decorate([
    (0, graphql_1.Resolver)(() => wallet_tx_history_model_1.PaginatedHistoryTransactions),
    __metadata("design:paramtypes", [wallet_tx_history_service_1.WalletTxHistoryService])
], WalletTxHistoryResolver);
exports.WalletTxHistoryResolver = WalletTxHistoryResolver;
//# sourceMappingURL=wallet-tx-history.resolver.js.map