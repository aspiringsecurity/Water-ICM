"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const rpc_module_1 = require("./../rpc/rpc.module");
const smart_contract_entity_1 = require("../smart-contract/smart-contract.entity");
const market_module_1 = require("../../market/market.module");
const common_1 = require("@nestjs/common");
const wallet_resolver_1 = require("./wallet.resolver");
const wallets_service_1 = require("./wallets.service");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("./wallet.entity");
const active_wallets_entity_1 = require("./active-wallets.entity");
const common_module_1 = require("../../common/common.module");
const wallets_analyse_service_1 = require("./wallets-analyse.service");
const latest_stake_info_entity_1 = require("../stake/latest-stake-info.entity");
let WalletModule = class WalletModule {
};
WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register(),
            typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.WalletEntity, active_wallets_entity_1.ActiveWalletsEntity], 'wallet'),
            typeorm_1.TypeOrmModule.forFeature([smart_contract_entity_1.SmartContractEntity], 'smart_contract'),
            typeorm_1.TypeOrmModule.forFeature([latest_stake_info_entity_1.LatestStakeInfoEntity], 'stake'),
            common_module_1.CommonModule,
            market_module_1.MarketModule,
            rpc_module_1.RpcModule
        ],
        providers: [wallet_resolver_1.WalletResolver, wallets_service_1.WalletService, wallets_analyse_service_1.WalletsAnalyseService],
        exports: [wallets_service_1.WalletService]
    })
], WalletModule);
exports.WalletModule = WalletModule;
//# sourceMappingURL=wallet.module.js.map