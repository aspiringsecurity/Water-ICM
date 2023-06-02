"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractModule = void 0;
const rpc_module_1 = require("./../rpc/rpc.module");
const smart_contract_call_log_entity_1 = require("./smart-contract-call-log.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const smart_contract_entity_1 = require("./smart-contract.entity");
const smart_contract_call_record_entity_1 = require("./smart-contract-call-record.entity");
const smart_contract_service_1 = require("./smart-contract.service");
const smart_contract_resolver_1 = require("./smart-contract.resolver");
const nft_module_1 = require("./nft/nft.module");
const common_module_1 = require("../../common/common.module");
const smart_contract_analyse_service_1 = require("./smart-contract-analyse.service");
let SmartContractModule = class SmartContractModule {
};
SmartContractModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([smart_contract_entity_1.SmartContractEntity, smart_contract_call_record_entity_1.SmartContractCallRecordEntity, smart_contract_call_log_entity_1.SmartContractCallLogEntity], 'smart_contract'),
            nft_module_1.NftModule,
            common_module_1.CommonModule,
            rpc_module_1.RpcModule
        ],
        providers: [smart_contract_service_1.SmartContractService, smart_contract_resolver_1.SmartContractResolver, smart_contract_analyse_service_1.SmartContractAnalyseService],
        exports: [smart_contract_service_1.SmartContractService]
    })
], SmartContractModule);
exports.SmartContractModule = SmartContractModule;
//# sourceMappingURL=smart-contract.module.js.map