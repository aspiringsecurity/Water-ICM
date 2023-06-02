"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftModule = void 0;
const smart_contract_call_log_entity_1 = require("./../smart-contract-call-log.entity");
const nft_retrive_entity_1 = require("./nft-retrive.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nft_service_1 = require("./nft.service");
const nft_balance_entity_1 = require("./nft-balance.entity");
const nft_transfer_record_entity_1 = require("./nft-transfer-record.entity");
const smart_contract_call_record_entity_1 = require("../smart-contract-call-record.entity");
const smart_contract_entity_1 = require("../smart-contract.entity");
const nft_resolver_1 = require("./nft.resolver");
const common_module_1 = require("../../../common/common.module");
const nft_analyse_service_1 = require("./nft-analyse.service");
let NftModule = class NftModule {
};
NftModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([nft_balance_entity_1.NftBalanceEntity, nft_transfer_record_entity_1.NftTransferRecordEntity, nft_retrive_entity_1.NftRetriveEntity], 'nft'),
            typeorm_1.TypeOrmModule.forFeature([smart_contract_call_record_entity_1.SmartContractCallRecordEntity, smart_contract_entity_1.SmartContractEntity, smart_contract_call_log_entity_1.SmartContractCallLogEntity], 'smart_contract'),
            common_module_1.CommonModule
        ],
        providers: [nft_service_1.NftService, nft_resolver_1.NftResolver, nft_analyse_service_1.NftAnalyseService],
        exports: [nft_service_1.NftService]
    })
], NftModule);
exports.NftModule = NftModule;
//# sourceMappingURL=nft.module.js.map