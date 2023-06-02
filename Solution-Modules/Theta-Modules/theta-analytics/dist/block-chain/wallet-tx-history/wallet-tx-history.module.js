"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTxHistoryModule = void 0;
const nft_transfer_record_entity_1 = require("./../smart-contract/nft/nft-transfer-record.entity");
const stake_reward_entity_1 = require("./../stake/stake-reward.entity");
const wallet_tx_history_resolver_1 = require("./wallet-tx-history.resolver");
const wallet_tx_history_service_1 = require("./wallet-tx-history.service");
const common_module_1 = require("./../../common/common.module");
const wallet_tx_history_analyse_service_1 = require("./wallet-tx-history-analyse.service");
const wallet_tx_history_entity_1 = require("./wallet-tx-history.entity");
const transaction_entity_1 = require("./../explorer/transaction.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_entity_1 = require("../wallet/wallet.entity");
const wallet_send_history_entity_1 = require("./send/wallet-send-history.entity");
const wallet_dp_wd_history_entity_1 = require("./deposit-withdraw/wallet-dp-wd-history.entity");
let WalletTxHistoryModule = class WalletTxHistoryModule {
};
WalletTxHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.WalletEntity], 'wallet'),
            typeorm_1.TypeOrmModule.forFeature([transaction_entity_1.TransactionEntity], 'explorer'),
            typeorm_1.TypeOrmModule.forFeature([wallet_tx_history_entity_1.WalletTxHistoryEntity], 'wallet-tx-history'),
            typeorm_1.TypeOrmModule.forFeature([stake_reward_entity_1.StakeRewardEntity], 'stake'),
            typeorm_1.TypeOrmModule.forFeature([nft_transfer_record_entity_1.NftTransferRecordEntity], 'nft'),
            typeorm_1.TypeOrmModule.forFeature([wallet_send_history_entity_1.WalletSendHistoryEntity], 'wallet-send-history'),
            typeorm_1.TypeOrmModule.forFeature([wallet_dp_wd_history_entity_1.WalletDpWdHistoryEntity], 'wallet-dp-wd-history'),
            common_module_1.CommonModule
        ],
        providers: [wallet_tx_history_analyse_service_1.WalletTxHistoryAnalyseService, wallet_tx_history_service_1.WalletTxHistoryService, wallet_tx_history_resolver_1.WalletTxHistoryResolver],
        exports: []
    })
], WalletTxHistoryModule);
exports.WalletTxHistoryModule = WalletTxHistoryModule;
//# sourceMappingURL=wallet-tx-history.module.js.map