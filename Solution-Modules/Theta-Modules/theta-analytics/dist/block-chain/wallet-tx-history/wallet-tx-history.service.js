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
exports.WalletTxHistoryService = void 0;
const wallet_dp_wd_history_entity_1 = require("./deposit-withdraw/wallet-dp-wd-history.entity");
const wallet_send_history_entity_1 = require("./send/wallet-send-history.entity");
const nft_transfer_record_entity_1 = require("../smart-contract/nft/nft-transfer-record.entity");
const stake_reward_entity_1 = require("./../stake/stake-reward.entity");
const transaction_entity_1 = require("./../explorer/transaction.entity");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallet_tx_history_entity_1 = require("./wallet-tx-history.entity");
let WalletTxHistoryService = class WalletTxHistoryService {
    constructor(walletTxHistoryRepository, transactionRepository, stakeRewardRepository, nftTransferRecordRepository, walletSendHistoryRepository, walletDpWdHistoryRepository) {
        this.walletTxHistoryRepository = walletTxHistoryRepository;
        this.transactionRepository = transactionRepository;
        this.stakeRewardRepository = stakeRewardRepository;
        this.nftTransferRecordRepository = nftTransferRecordRepository;
        this.walletSendHistoryRepository = walletSendHistoryRepository;
        this.walletDpWdHistoryRepository = walletDpWdHistoryRepository;
        this.logger = new common_1.Logger('wallet tx history  service');
    }
    async getTransactions(wallet, take = 10, skip = 0, txType) {
        const res = await this.walletTxHistoryRepository.findOne({
            where: { wallet: wallet }
        });
        if (!res) {
            return [false, 0, []];
        }
        const txs = JSON.parse(res.tx_ids);
        if (txs.length === 0) {
            return [false, 0, []];
        }
        const idsTyped = [];
        for (let i = 0; i < txs.length; i++) {
            if (txType == undefined || parseInt(txs[i].substring(txs[i].length - 1), 36) == txType) {
                idsTyped.push(parseInt(txs[i].substring(0, txs[i].length - 1), 36));
            }
        }
        if (skip > idsTyped.length) {
            return [false, 0, []];
        }
        const hasNextPage = idsTyped.length > skip + take ? true : false;
        let idsToFind = [];
        if (skip == 0) {
            idsToFind = idsTyped.slice(-take);
        }
        else {
            idsToFind = idsTyped.slice(-skip - take, -skip);
        }
        const list = await this.transactionRepository.find({
            where: { id: (0, typeorm_2.In)(idsToFind) },
            order: { height: 'DESC' }
        });
        return [hasNextPage, idsTyped.length, list];
    }
    async getActivityHistory(type, wallet, startTime, endTime) {
        this.logger.debug('get activity ' + type);
        switch (type) {
            case 'stake_rewards':
                return await this.stakeRewardRepository.find({
                    where: { timestamp: (0, typeorm_2.Between)(startTime, endTime), wallet_address: wallet },
                    order: { timestamp: 'DESC' }
                });
            case 'nft_transfers':
                return await this.nftTransferRecordRepository.find({
                    where: [
                        { timestamp: (0, typeorm_2.Between)(startTime, endTime), from: wallet },
                        { timestamp: (0, typeorm_2.Between)(startTime, endTime), to: wallet }
                    ],
                    order: { timestamp: 'DESC' }
                });
            case 'send_transfers':
                return await this.walletSendHistoryRepository.find({
                    where: [
                        { from: wallet, timestamp: (0, typeorm_2.Between)(startTime, endTime) },
                        { to: wallet, timestamp: (0, typeorm_2.Between)(startTime, endTime) }
                    ],
                    order: { timestamp: 'DESC' }
                });
            case 'deposit_withdraw':
                return await this.walletDpWdHistoryRepository.find({
                    where: { wallet_address: wallet, timestamp: (0, typeorm_2.Between)(startTime, endTime) },
                    order: { timestamp: 'DESC' }
                });
            default:
                return null;
        }
    }
};
WalletTxHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wallet_tx_history_entity_1.WalletTxHistoryEntity, 'wallet-tx-history')),
    __param(1, (0, typeorm_1.InjectRepository)(transaction_entity_1.TransactionEntity, 'explorer')),
    __param(2, (0, typeorm_1.InjectRepository)(stake_reward_entity_1.StakeRewardEntity, 'stake')),
    __param(3, (0, typeorm_1.InjectRepository)(nft_transfer_record_entity_1.NftTransferRecordEntity, 'nft')),
    __param(4, (0, typeorm_1.InjectRepository)(wallet_send_history_entity_1.WalletSendHistoryEntity, 'wallet-send-history')),
    __param(5, (0, typeorm_1.InjectRepository)(wallet_dp_wd_history_entity_1.WalletDpWdHistoryEntity, 'wallet-dp-wd-history')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WalletTxHistoryService);
exports.WalletTxHistoryService = WalletTxHistoryService;
//# sourceMappingURL=wallet-tx-history.service.js.map