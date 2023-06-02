"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftStatisticsModule = void 0;
const nft_detail_resolver_1 = require("./nft-detail.resolver");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nft_balance_entity_1 = require("../../block-chain/smart-contract/nft/nft-balance.entity");
const nft_transfer_record_entity_1 = require("../../block-chain/smart-contract/nft/nft-transfer-record.entity");
const common_module_1 = require("../../common/common.module");
const market_module_1 = require("../../market/market.module");
const nft_statistics_analyse_service_1 = require("./nft-statistics-analyse.service");
const nft_statistics_entity_1 = require("./nft-statistics.entity");
const nft_statistics_resolver_1 = require("./nft-statistics.resolver");
const nft_statistics_service_1 = require("./nft-statistics.service");
let NftStatisticsModule = class NftStatisticsModule {
};
NftStatisticsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register(),
            typeorm_1.TypeOrmModule.forFeature([nft_transfer_record_entity_1.NftTransferRecordEntity, nft_balance_entity_1.NftBalanceEntity], 'nft'),
            typeorm_1.TypeOrmModule.forFeature([nft_statistics_entity_1.NftStatisticsEntity], 'nft-statistics'),
            common_module_1.CommonModule,
            market_module_1.MarketModule
        ],
        providers: [
            nft_statistics_analyse_service_1.NftStatisticsAnalyseService,
            nft_statistics_resolver_1.NftStatisticsResolver,
            nft_statistics_service_1.NftStatisticsService,
            nft_detail_resolver_1.NftDetailResolver
        ],
        exports: [nft_statistics_service_1.NftStatisticsService]
    })
], NftStatisticsModule);
exports.NftStatisticsModule = NftStatisticsModule;
//# sourceMappingURL=nft-statistics.module.js.map