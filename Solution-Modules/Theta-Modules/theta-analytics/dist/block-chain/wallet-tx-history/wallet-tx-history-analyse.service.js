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
exports.WalletTxHistoryAnalyseService = void 0;
const transaction_entity_1 = require("./../explorer/transaction.entity");
const common_1 = require("@nestjs/common");
const utils_service_1 = require("../../common/utils.service");
const typeorm_1 = require("typeorm");
const theta_enum_1 = require("../tx/theta.enum");
const wallet_tx_history_entity_1 = require("./wallet-tx-history.entity");
const const_1 = require("../../const");
const typeorm_2 = require("@nestjs/typeorm");
const fs = require('fs');
let WalletTxHistoryAnalyseService = class WalletTxHistoryAnalyseService {
    constructor(utilsService, walletConnectionInjected, explorerConnectionInjected, walletTxHistoryConnectionInjected) {
        this.utilsService = utilsService;
        this.walletConnectionInjected = walletConnectionInjected;
        this.explorerConnectionInjected = explorerConnectionInjected;
        this.walletTxHistoryConnectionInjected = walletTxHistoryConnectionInjected;
        this.logger = new common_1.Logger('wallet tx history analyse service');
        this.heightConfigFile = const_1.config.get('ORM_CONFIG')['database'] + 'wallet-tx-history/record.height';
    }
    async analyseData() {
        try {
            this.logger.debug('start analyse');
            this.walletConnectionRunner = this.walletConnectionInjected.createQueryRunner();
            this.explorerConnectionRunner = this.explorerConnectionInjected.createQueryRunner();
            this.walletTxHistoryConnectionRunner =
                this.walletTxHistoryConnectionInjected.createQueryRunner();
            await this.walletTxHistoryConnectionRunner.startTransaction();
            let startId = 0;
            if (!fs.existsSync(this.heightConfigFile)) {
                fs.writeFileSync(this.heightConfigFile, '0');
            }
            else {
                const data = fs.readFileSync(this.heightConfigFile, 'utf8');
                if (data) {
                    startId = Number(data);
                }
            }
            const txRecords = await this.explorerConnectionRunner.manager.find(transaction_entity_1.TransactionEntity, {
                where: {
                    id: (0, typeorm_1.MoreThan)(startId)
                },
                take: const_1.config.get('WALLET_TX_HISTORY.ANALYSE_NUMBER'),
                order: { id: 'ASC' }
            });
            const walletToUpdates = {};
            this.logger.debug('tx records: ' + txRecords.length);
            for (const record of txRecords) {
                await this.addWallet(record, walletToUpdates);
            }
            this.logger.debug('add wallet end');
            await this.updateWalletTxHistory(walletToUpdates);
            this.logger.debug('update wallet end');
            await this.walletTxHistoryConnectionRunner.commitTransaction();
            if (txRecords.length > 0) {
                this.logger.debug('end height:' + Number(txRecords[txRecords.length - 1].height));
                this.utilsService.updateRecordHeight(this.heightConfigFile, txRecords[txRecords.length - 1].id);
            }
        }
        catch (e) {
            console.error(e.message);
            this.logger.error(e.message);
            this.logger.error('rollback');
            await this.walletTxHistoryConnectionRunner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('WALLET_TX_HISTORY.MONITOR_PATH'));
        }
        finally {
            await this.walletTxHistoryConnectionRunner.release();
            this.logger.debug('end analyse');
            this.logger.debug('release success');
            (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('WALLET_TX_HISTORY.MONITOR_PATH'));
        }
    }
    async addWallet(record, walletsToupdate) {
        if (record.tx_type === theta_enum_1.THETA_TRANSACTION_TYPE_ENUM.send ||
            record.tx_type === theta_enum_1.THETA_TRANSACTION_TYPE_ENUM.coinbase) {
            let from = [];
            let to = [];
            if (record.from && record.tx_type == theta_enum_1.THETA_TRANSACTION_TYPE_ENUM.send) {
                from = JSON.parse(record.from);
            }
            if (record.from && record.tx_type == theta_enum_1.THETA_TRANSACTION_TYPE_ENUM.coinbase) {
                from = [record.from];
            }
            if (record.to) {
                to = JSON.parse(record.to);
            }
            for (const addr of [...from, ...to]) {
                if (addr.address === '0x0000000000000000000000000000000000000000')
                    continue;
                if (!walletsToupdate[addr.address]) {
                    walletsToupdate[addr.address] = [];
                }
                const id36 = record.id.toString(36) + record.tx_type.toString(36);
                !walletsToupdate[addr.address].includes(id36) && walletsToupdate[addr.address].push(id36);
            }
        }
        else {
            if (record.from && record.from != '0x0000000000000000000000000000000000000000') {
                if (!walletsToupdate[record.from]) {
                    walletsToupdate[record.from] = [];
                }
                const id36 = record.id.toString(36) + record.tx_type.toString(36);
                walletsToupdate[record.from].push(id36);
            }
            if (record.to && record.to != '0x0000000000000000000000000000000000000000') {
                if (!walletsToupdate[record.to]) {
                    walletsToupdate[record.to] = [];
                }
                const id36 = record.id.toString(36) + record.tx_type.toString(36);
                walletsToupdate[record.to].push(id36);
            }
        }
    }
    async updateWalletTxHistory(walletsToupdate) {
        const wallets = Object.keys(walletsToupdate);
        for (const wallet of wallets) {
            const tx = await this.walletTxHistoryConnectionRunner.manager.findOne(wallet_tx_history_entity_1.WalletTxHistoryEntity, {
                where: { wallet: wallet }
            });
            if (tx) {
                tx.tx_ids = JSON.stringify([
                    ...new Set([...JSON.parse(tx.tx_ids), ...walletsToupdate[wallet]])
                ]);
                await this.walletTxHistoryConnectionRunner.manager.save(tx);
            }
            else {
                const newTx = new wallet_tx_history_entity_1.WalletTxHistoryEntity();
                newTx.wallet = wallet;
                newTx.tx_ids = JSON.stringify(walletsToupdate[wallet]);
                await this.walletTxHistoryConnectionRunner.manager.save(newTx);
            }
        }
    }
};
WalletTxHistoryAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectDataSource)('wallet')),
    __param(2, (0, typeorm_2.InjectDataSource)('explorer')),
    __param(3, (0, typeorm_2.InjectDataSource)('wallet-tx-history')),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        typeorm_1.DataSource,
        typeorm_1.DataSource,
        typeorm_1.DataSource])
], WalletTxHistoryAnalyseService);
exports.WalletTxHistoryAnalyseService = WalletTxHistoryAnalyseService;
//# sourceMappingURL=wallet-tx-history-analyse.service.js.map