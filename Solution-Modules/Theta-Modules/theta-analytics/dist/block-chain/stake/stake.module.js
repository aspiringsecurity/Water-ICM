"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StakeModule = void 0;
const rpc_module_1 = require("./../rpc/rpc.module");
const latest_stake_info_entity_1 = require("./latest-stake-info.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const stake_service_1 = require("./stake.service");
const stake_resolver_1 = require("./stake.resolver");
const stake_statistics_entity_1 = require("./stake-statistics.entity");
const stake_reward_entity_1 = require("./stake-reward.entity");
const wallet_module_1 = require("../wallet/wallet.module");
const wallet_entity_1 = require("../wallet/wallet.entity");
const market_module_1 = require("../../market/market.module");
const stake_analyse_service_1 = require("./stake-analyse.service");
const common_module_1 = require("../../common/common.module");
let StakeModule = class StakeModule {
};
StakeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            wallet_module_1.WalletModule,
            market_module_1.MarketModule,
            rpc_module_1.RpcModule,
            typeorm_1.TypeOrmModule.forFeature([stake_statistics_entity_1.StakeStatisticsEntity, stake_reward_entity_1.StakeRewardEntity, latest_stake_info_entity_1.LatestStakeInfoEntity], 'stake'),
            typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.WalletEntity], 'wallet'),
            common_1.CacheModule.register(),
            common_module_1.CommonModule
        ],
        providers: [stake_service_1.StakeService, stake_resolver_1.StakeResolver, stake_analyse_service_1.StakeAnalyseService],
        exports: [stake_service_1.StakeService]
    })
], StakeModule);
exports.StakeModule = StakeModule;
//# sourceMappingURL=stake.module.js.map