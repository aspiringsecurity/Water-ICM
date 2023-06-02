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
exports.WalletsAnalyseService = void 0;
const rpc_service_1 = require("./../rpc/rpc.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const logger_service_1 = require("../../common/logger.service");
const wallet_entity_1 = require("./wallet.entity");
const utils_service_1 = require("../../common/utils.service");
const const_1 = require("../../const");
const typeorm_2 = require("@nestjs/typeorm");
const enum_1 = require("theta-ts-sdk/dist/types/enum");
const smart_contract_entity_1 = require("../smart-contract/smart-contract.entity");
const moment = require('moment');
let WalletsAnalyseService = class WalletsAnalyseService {
    constructor(loggerService, utilsService, walletConnectionInjected, smartContractConnectionInjected, rpcService) {
        this.loggerService = loggerService;
        this.utilsService = utilsService;
        this.walletConnectionInjected = walletConnectionInjected;
        this.smartContractConnectionInjected = smartContractConnectionInjected;
        this.rpcService = rpcService;
        this.logger = new common_1.Logger('wallet analyse service');
        this.analyseKey = 'under_analyse';
        this.counter = 0;
        this.startTimestamp = 0;
        this.heightConfigFile = const_1.config.get('ORM_CONFIG')['database'] + 'wallet/record.height';
        this.logger.debug(const_1.config.get('THETA_NODE_HOST'));
    }
    async analyse() {
        try {
            this.walletConnectionRunner = this.walletConnectionInjected.createQueryRunner();
            this.smartContractConnectionRunner = this.smartContractConnectionInjected.createQueryRunner();
            await this.walletConnectionRunner.startTransaction();
            let height = 0;
            const lastfinalizedHeight = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
            height = lastfinalizedHeight - 1000;
            if (const_1.config.get('WALLET.START_HEIGHT')) {
                height = const_1.config.get('WALLET.START_HEIGHT');
            }
            const recordHeight = this.utilsService.getRecordHeight(this.heightConfigFile);
            height = recordHeight > height ? recordHeight : height;
            if (height >= lastfinalizedHeight) {
                await this.walletConnectionRunner.commitTransaction();
                this.logger.debug(height + ': commit success');
                this.logger.debug('no height to analyse');
                return;
            }
            let endHeight = lastfinalizedHeight;
            const analyseNumber = const_1.config.get('WALLET.ANALYSE_NUMBER');
            if (lastfinalizedHeight - height > analyseNumber) {
                endHeight = height + analyseNumber;
            }
            this.logger.debug('start height: ' + height + '; end height: ' + endHeight);
            const blockList = await this.rpcService.getBlockSByRange(height, endHeight);
            const actualEndHeight = Number(blockList[blockList.length - 1].height);
            this.logger.debug('block list length:' + blockList.length);
            this.logger.debug('actual end height:' + actualEndHeight);
            this.counter = blockList.length;
            this.logger.debug('init counter', this.counter);
            const blockArr = {};
            for (const block of blockList) {
                const hhTimestamp = moment(moment(Number(block.timestamp) * 1000).format('YYYY-MM-DD HH:00:00')).unix();
                if (!blockArr[hhTimestamp]) {
                    blockArr[hhTimestamp] = [block];
                }
                else {
                    blockArr[hhTimestamp].push(block);
                }
            }
            const blocksToDeal = Object.values(blockArr);
            this.logger.debug('blocks Collection lenght: ' + blocksToDeal.length);
            for (const blocks of blocksToDeal) {
                await this.dealBlocks(blocks);
            }
            await this.walletConnectionRunner.commitTransaction();
            this.logger.debug('commit success');
            if (blockList.length > 0) {
                this.utilsService.updateRecordHeight(this.heightConfigFile, actualEndHeight);
            }
            (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('WALLET.MONITOR_PATH'));
        }
        catch (e) {
            console.error(e.message);
            this.logger.error(e.message);
            this.logger.error('rollback');
            await this.walletConnectionRunner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('WALLET.MONITOR_PATH'));
        }
        finally {
            await this.walletConnectionRunner.release();
            this.logger.debug('release success');
        }
    }
    async handleOrderCreatedEvent(block, latestFinalizedBlockHeight) {
        this.logger.debug(block.height + ' start insert, timestamp:' + block.timestamp);
        const height = Number(block.height);
        const wallets = {};
        for (const transaction of block.transactions) {
            if (transaction.raw.inputs && transaction.raw.inputs.length > 0) {
                for (const wallet of transaction.raw.inputs) {
                    this.updateWallets(wallets, wallet.address, transaction.hash, Number(block.timestamp));
                }
            }
            if (transaction.raw.outputs && transaction.raw.outputs.length > 0) {
                for (const wallet of transaction.raw.outputs) {
                    this.updateWallets(wallets, wallet.address, transaction.hash, Number(block.timestamp));
                }
            }
            if (transaction.raw.from) {
                this.updateWallets(wallets, transaction.raw.from.address, transaction.hash, Number(block.timestamp));
            }
            if (transaction.raw.to) {
                this.updateWallets(wallets, transaction.raw.to.address, transaction.hash, Number(block.timestamp));
            }
            if (transaction.raw.source) {
                this.updateWallets(wallets, transaction.raw.source.address, transaction.hash, Number(block.timestamp));
            }
            if (transaction.raw.proposer) {
                this.updateWallets(wallets, transaction.raw.proposer.address, transaction.hash, Number(block.timestamp));
            }
        }
        const walletsToUpdate = Object.values(wallets);
        this.logger.debug('wallets length: ' + walletsToUpdate.length);
        for (let i = 0; i < walletsToUpdate.length; i++) {
            const wallet = await this.walletConnectionRunner.manager.findOne(wallet_entity_1.WalletEntity, {
                where: {
                    address: walletsToUpdate[i].address
                }
            });
            if (!wallet) {
                await this.walletConnectionRunner.manager.insert(wallet_entity_1.WalletEntity, {
                    address: walletsToUpdate[i].address,
                    latest_active_time: walletsToUpdate[i].latest_active_time,
                    txs_hash_list: JSON.stringify(walletsToUpdate[i].hashs)
                });
            }
            else {
                wallet.latest_active_time = walletsToUpdate[i].latest_active_time;
                const hashList = JSON.parse(wallet.txs_hash_list);
                for (const hash of walletsToUpdate[i].hashs) {
                    if (!hashList.includes(hash)) {
                        hashList.push(hash);
                    }
                }
                wallet.txs_hash_list = JSON.stringify(hashList);
                await this.walletConnectionRunner.manager.save(wallet);
            }
        }
        this.logger.debug(height + ' end upsert wallets');
        await this.snapShotActiveWallets(Number(block.timestamp));
        this.logger.debug(height + ' end update analyse');
        this.counter--;
    }
    async dealBlocks(blocks) {
        const wallets = {};
        for (const block of blocks) {
            const height = Number(block.height);
            for (const transaction of block.transactions) {
                if (transaction.raw.inputs && transaction.raw.inputs.length > 0) {
                    for (const wallet of transaction.raw.inputs) {
                        this.updateWallets(wallets, wallet.address, transaction.hash, Number(block.timestamp));
                    }
                }
                if (transaction.raw.outputs && transaction.raw.outputs.length > 0) {
                    for (const wallet of transaction.raw.outputs) {
                        this.updateWallets(wallets, wallet.address, transaction.hash, Number(block.timestamp));
                    }
                }
                if (transaction.raw.from) {
                    this.updateWallets(wallets, transaction.raw.from.address, transaction.hash, Number(block.timestamp));
                }
                if (transaction.raw.to) {
                    this.updateWallets(wallets, transaction.raw.to.address, transaction.hash, Number(block.timestamp));
                }
                if (transaction.raw.source) {
                    this.updateWallets(wallets, transaction.raw.source.address, transaction.hash, Number(block.timestamp));
                }
                if (transaction.raw.proposer) {
                    this.updateWallets(wallets, transaction.raw.proposer.address, transaction.hash, Number(block.timestamp));
                }
                if (transaction.receipt) {
                    for (const log of transaction.receipt.Logs) {
                        this.updateWallets(wallets, log.address, transaction.hash, Number(block.timestamp));
                    }
                }
                if (transaction.type == enum_1.THETA_TRANSACTION_TYPE_ENUM.smart_contract) {
                    const contractList = {};
                    for (const log of transaction.receipt.Logs) {
                        if (log.data == '') {
                            log.data = '0x';
                        }
                        else {
                            log.data = this.utilsService.getHex(log.data);
                        }
                        if (contractList.hasOwnProperty(log.address)) {
                            contractList[log.address].logs.push(log);
                        }
                        else {
                            const tempContract = await this.smartContractConnectionRunner.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
                                where: {
                                    contract_address: log.address
                                }
                            });
                            if (!tempContract || !tempContract.verified)
                                continue;
                            contractList[log.address] = {
                                contract: tempContract,
                                logs: [log]
                            };
                        }
                    }
                    const contractDecodeList = Object.values(contractList);
                    for (const contract of contractDecodeList) {
                        const logInfo = this.utilsService.decodeLogs(contract.logs, JSON.parse(contract.contract.abi));
                        for (const log of logInfo) {
                            if (log.decode.result && log.decode.result.from) {
                                this.updateWallets(wallets, log.decode.result.from, transaction.hash, Number(block.timestamp));
                            }
                            if (log.decode.result && log.decode.result.to) {
                                this.updateWallets(wallets, log.decode.result.to, transaction.hash, Number(block.timestamp));
                            }
                            if (log.decode.result && log.decode.result.buyer) {
                                this.updateWallets(wallets, log.decode.result.buyer, transaction.hash, Number(block.timestamp));
                            }
                            if (log.decode.result && log.decode.result.owner) {
                                this.updateWallets(wallets, log.decode.result.owner, transaction.hash, Number(block.timestamp));
                            }
                        }
                    }
                }
            }
            this.logger.debug(height + ' end insert wallet');
            this.counter--;
        }
        const walletsToUpdate = Object.values(wallets);
        this.logger.debug('wallets length: ' + walletsToUpdate.length);
        for (let i = 0; i < walletsToUpdate.length; i++) {
            const wallet = await this.walletConnectionRunner.manager.findOne(wallet_entity_1.WalletEntity, {
                where: {
                    address: walletsToUpdate[i].address
                }
            });
            if (!wallet) {
                await this.walletConnectionRunner.manager.insert(wallet_entity_1.WalletEntity, {
                    address: walletsToUpdate[i].address,
                    latest_active_time: walletsToUpdate[i].latest_active_time,
                    txs_hash_list: JSON.stringify(walletsToUpdate[i].hashs)
                });
            }
            else {
                wallet.latest_active_time = walletsToUpdate[i].latest_active_time;
                const hashList = JSON.parse(wallet.txs_hash_list);
                for (const hash of walletsToUpdate[i].hashs) {
                    if (!hashList.includes(hash)) {
                        hashList.push(hash);
                    }
                }
                wallet.txs_hash_list = JSON.stringify(hashList);
                await this.walletConnectionRunner.manager.save(wallet);
            }
            this.logger.debug(walletsToUpdate.length - i + ' upsert left');
        }
        this.logger.debug('start snapshot active wallets');
        await this.snapShotActiveWallets(Number(blocks[0].timestamp));
        this.logger.debug('end snapshot active wallets');
    }
    async updateWallets(wallets, address, hash, timestamp) {
        if (!wallets[address.toLowerCase()]) {
            wallets[address.toLowerCase()] = {
                address: address.toLowerCase(),
                latest_active_time: timestamp,
                hashs: []
            };
        }
        else {
            wallets[address.toLowerCase()]['latest_active_time'] = Number(timestamp);
        }
    }
    async snapShotActiveWallets(timestamp) {
        if (const_1.config.get('IGNORE'))
            return false;
        const hhTimestamp = moment(moment(timestamp * 1000).format('YYYY-MM-DD HH:00:00')).unix();
        const statisticsStartTimeStamp = moment(hhTimestamp * 1000)
            .subtract(24, 'hours')
            .unix();
        const totalAmount = await this.walletConnectionRunner.manager.count(wallet_entity_1.WalletEntity, {
            where: { latest_active_time: (0, typeorm_1.MoreThan)(statisticsStartTimeStamp) }
        });
        const activeWalletLastHour = await this.walletConnectionRunner.manager.count(wallet_entity_1.WalletEntity, {
            where: {
                latest_active_time: (0, typeorm_1.MoreThan)(moment(hhTimestamp * 1000)
                    .subtract(1, 'hours')
                    .unix())
            }
        });
        await this.walletConnectionRunner.manager.query(`INSERT INTO active_wallets_entity(snapshot_time,active_wallets_amount,active_wallets_amount_last_hour) VALUES(${hhTimestamp}, ${totalAmount}, ${activeWalletLastHour}) ON CONFLICT (snapshot_time) DO UPDATE set active_wallets_amount = ${totalAmount},active_wallets_amount_last_hour=${activeWalletLastHour}`);
    }
};
WalletsAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectDataSource)('wallet')),
    __param(3, (0, typeorm_2.InjectDataSource)('smart_contract')),
    __metadata("design:paramtypes", [logger_service_1.LoggerService,
        utils_service_1.UtilsService,
        typeorm_1.DataSource,
        typeorm_1.DataSource,
        rpc_service_1.RpcService])
], WalletsAnalyseService);
exports.WalletsAnalyseService = WalletsAnalyseService;
//# sourceMappingURL=wallets-analyse.service.js.map