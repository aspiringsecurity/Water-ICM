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
exports.StakeResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const stake_service_1 = require("./stake.service");
const stake_statistics_entity_1 = require("./stake-statistics.entity");
const common_1 = require("@nestjs/common");
const stake_model_1 = require("./stake.model");
const graphql_fields_list_1 = require("graphql-fields-list");
const graphql_2 = require("graphql");
const market_service_1 = require("../../market/market.service");
const wallets_service_1 = require("../wallet/wallets.service");
let StakeResolver = class StakeResolver {
    constructor(stakeService, marketInfo, walletService) {
        this.stakeService = stakeService;
        this.marketInfo = marketInfo;
        this.walletService = walletService;
        this.logger = new common_1.Logger();
    }
    async StakeStatistics() {
        return await this.stakeService.getLatestStakeStatics();
    }
    async StakeReward(info, wallet_address) {
        const reward = new stake_model_1.StakeRewardModel();
        const thetaFuelMarketInfo = await this.marketInfo.getThetaFuelMarketInfo();
        wallet_address = wallet_address.toLocaleLowerCase();
        for (const field of (0, graphql_fields_list_1.fieldsList)(info)) {
            const rewardAmount = await this.stakeService.getStakeReward(wallet_address, field);
            reward[field] = {
                amount: rewardAmount,
                fiat_currency_value: {
                    usd: thetaFuelMarketInfo.price * rewardAmount,
                    cny: thetaFuelMarketInfo.price * rewardAmount * (await this.walletService.getUsdRate()).CNY,
                    eur: thetaFuelMarketInfo.price * rewardAmount * (await this.walletService.getUsdRate()).EUR
                }
            };
        }
        return reward;
    }
};
__decorate([
    (0, graphql_1.Query)(() => [stake_statistics_entity_1.StakeStatisticsEntity], {
        description: 'Return to statistics related to token pledges',
        nullable: true
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StakeResolver.prototype, "StakeStatistics", null);
__decorate([
    (0, graphql_1.Query)(() => stake_model_1.StakeRewardModel),
    __param(0, (0, graphql_1.Info)()),
    __param(1, (0, graphql_1.Args)('wallet_address', { type: () => graphql_2.GraphQLString })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], StakeResolver.prototype, "StakeReward", null);
StakeResolver = __decorate([
    (0, graphql_1.Resolver)(() => stake_statistics_entity_1.StakeStatisticsEntity),
    __metadata("design:paramtypes", [stake_service_1.StakeService,
        market_service_1.MarketService,
        wallets_service_1.WalletService])
], StakeResolver);
exports.StakeResolver = StakeResolver;
//# sourceMappingURL=stake.resolver.js.map