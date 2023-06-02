"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxModule = void 0;
const rpc_module_1 = require("./../rpc/rpc.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const theta_tx_num_by_hours_entity_1 = require("./theta-tx-num-by-hours.entity");
const tx_service_1 = require("./tx.service");
const tx_resolver_1 = require("./tx.resolver");
const wallet_module_1 = require("../wallet/wallet.module");
const tx_analyse_service_1 = require("./tx-analyse.service");
const common_module_1 = require("../../common/common.module");
let TxModule = class TxModule {
};
TxModule = __decorate([
    (0, common_1.Module)({
        imports: [
            common_1.CacheModule.register(),
            typeorm_1.TypeOrmModule.forFeature([theta_tx_num_by_hours_entity_1.ThetaTxNumByHoursEntity], 'tx'),
            wallet_module_1.WalletModule,
            common_module_1.CommonModule,
            rpc_module_1.RpcModule
        ],
        providers: [tx_service_1.TxService, tx_resolver_1.TxResolver, tx_analyse_service_1.TxAnalyseService],
        exports: [tx_service_1.TxService]
    })
], TxModule);
exports.TxModule = TxModule;
//# sourceMappingURL=tx.module.js.map