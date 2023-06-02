"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSendHistoryModule = void 0;
const common_module_1 = require("../../../common/common.module");
const wallet_send_history_analyse_service_1 = require("./wallet-send-history-analyse.service");
const wallet_send_history_entity_1 = require("./wallet-send-history.entity");
const rpc_module_1 = require("../../rpc/rpc.module");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
let WalletSendHistoryModule = class WalletSendHistoryModule {
};
WalletSendHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            rpc_module_1.RpcModule,
            common_module_1.CommonModule,
            typeorm_1.TypeOrmModule.forFeature([wallet_send_history_entity_1.WalletSendHistoryEntity], 'wallet-send-history')
        ],
        controllers: [],
        providers: [wallet_send_history_analyse_service_1.WalletSendHistoryAnalyseService],
        exports: []
    })
], WalletSendHistoryModule);
exports.WalletSendHistoryModule = WalletSendHistoryModule;
//# sourceMappingURL=wallet-send-history.module.js.map