"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExplorerModule = void 0;
const nft_statistics_module_1 = require("./../../statistics/nft/nft-statistics.module");
const wallet_module_1 = require("./../wallet/wallet.module");
const nft_module_1 = require("../smart-contract/nft/nft.module");
const smart_contract_module_1 = require("../smart-contract/smart-contract.module");
const count_entity_1 = require("./count.entity");
const explorer_service_1 = require("./explorer.service");
const explorer_resolver_1 = require("./explorer.resolver");
const explorer_analyse_service_1 = require("./explorer-analyse.service");
const common_module_1 = require("../../common/common.module");
const transaction_entity_1 = require("./transaction.entity");
const block_list_entity_1 = require("./block-list.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const rpc_module_1 = require("../rpc/rpc.module");
let ExplorerModule = class ExplorerModule {
};
ExplorerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([block_list_entity_1.BlokcListEntity, transaction_entity_1.TransactionEntity, count_entity_1.CountEntity], 'explorer'),
            common_module_1.CommonModule,
            rpc_module_1.RpcModule,
            smart_contract_module_1.SmartContractModule,
            nft_module_1.NftModule,
            wallet_module_1.WalletModule,
            nft_statistics_module_1.NftStatisticsModule
        ],
        providers: [explorer_analyse_service_1.ExplorerAnalyseService, explorer_resolver_1.ExplorerResolver, explorer_service_1.ExplorerService],
        exports: []
    })
], ExplorerModule);
exports.ExplorerModule = ExplorerModule;
//# sourceMappingURL=explorer.module.js.map