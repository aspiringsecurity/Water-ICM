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
exports.WalletSendHistoryAnalyseService = void 0;
const enum_1 = require("theta-ts-sdk/dist/types/enum");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utils_service_1 = require("../../../common/utils.service");
const typeorm_2 = require("typeorm");
const rpc_service_1 = require("../../rpc/rpc.service");
const bignumber_js_1 = require("bignumber.js");
const wallet_send_history_entity_1 = require("./wallet-send-history.entity");
const const_1 = require("../../../const");
let WalletSendHistoryAnalyseService = class WalletSendHistoryAnalyseService {
    constructor(utilsService, connection, rpcService) {
        this.utilsService = utilsService;
        this.connection = connection;
        this.rpcService = rpcService;
        this.logger = new common_1.Logger('send history analyse service');
        this.recordLogFile = const_1.config.get('ORM_CONFIG')['database'] + 'wallet-send-history/record.log';
    }
    async analyse() {
        try {
            this.logger.debug('start analyse');
            this.runner = this.connection.createQueryRunner();
            await this.runner.startTransaction();
            const [startHeight, endHeight] = await this.utilsService.getHeightRangeToAnalyse('WALLET_SEND_HISTORY', this.recordLogFile);
            if (endHeight == 0) {
                this.logger.debug('commit success');
                this.logger.debug('no height to analyse');
                return await this.runner.commitTransaction();
            }
            const blockList = await this.rpcService.getBlockSByRange(startHeight, endHeight);
            this.logger.debug('get block length:' + blockList.length);
            for (const block of blockList) {
                await this.analyseBlock(block);
            }
            if (blockList.length > 0) {
                this.utilsService.updateRecordHeight(this.recordLogFile, Number(blockList[blockList.length - 1].height));
            }
            await this.runner.commitTransaction();
            (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('WALLET_SEND_HISTORY.MONITOR_PATH'));
            this.logger.debug('end analyse');
        }
        catch (e) {
            this.logger.error(e);
            console.error(e);
            await this.runner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('WALLET_SEND_HISTORY.MONITOR_PATH'));
        }
        finally {
            await this.runner.release();
        }
    }
    async analyseBlock(block) {
        for (const tx of block.transactions) {
            switch (tx.type) {
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.send:
                    if (tx.raw.inputs.length > 0) {
                        this.logger.debug('analyse ' + tx.hash + ' txs:' + tx.raw.inputs.length);
                        for (let i = 0; i < tx.raw.inputs.length; i++) {
                            const theta = new bignumber_js_1.default(tx.raw.inputs[i].coins.thetawei)
                                .dividedBy('1e18')
                                .toNumber();
                            const tfuel = new bignumber_js_1.default(tx.raw.inputs[i].coins.tfuelwei)
                                .dividedBy('1e18')
                                .toNumber();
                            const from = tx.raw.inputs[i].address.toLocaleLowerCase();
                            if (!tx.raw.outputs[i])
                                continue;
                            const to = tx.raw.outputs[i].address.toLocaleLowerCase();
                            const txHash = tx.hash;
                            const record = await this.runner.manager.findOne(wallet_send_history_entity_1.WalletSendHistoryEntity, {
                                where: {
                                    from: from,
                                    to: to,
                                    tx_hash: txHash
                                }
                            });
                            if (record) {
                                continue;
                            }
                            await this.runner.manager.insert(wallet_send_history_entity_1.WalletSendHistoryEntity, {
                                from: from,
                                to: to,
                                tx_hash: txHash,
                                theta: theta,
                                tfuel: tfuel,
                                timestamp: Number(block.timestamp)
                            });
                        }
                    }
                    else {
                        const theta = new bignumber_js_1.default(tx.raw.from.coins.thetawei).dividedBy('1e18').toNumber();
                        const thetaFuel = new bignumber_js_1.default(tx.raw.from.coins.tfuelwei).dividedBy('1e18').toNumber();
                        const record = await this.runner.manager.findOne(wallet_send_history_entity_1.WalletSendHistoryEntity, {
                            where: {
                                from: tx.raw.from.address.toLocaleLowerCase(),
                                to: tx.raw.to.address.toLocaleLowerCase(),
                                tx_hash: tx.hash
                            }
                        });
                        if (record) {
                            continue;
                        }
                        await this.runner.manager.insert(wallet_send_history_entity_1.WalletSendHistoryEntity, {
                            from: tx.raw.from.address.toLocaleLowerCase(),
                            to: tx.raw.to.address.toLocaleLowerCase(),
                            tx_hash: tx.hash,
                            theta: theta,
                            tfuel: thetaFuel,
                            timestamp: Number(block.timestamp)
                        });
                    }
                    break;
                default:
                    break;
            }
        }
    }
};
WalletSendHistoryAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)('wallet-send-history')),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        typeorm_2.DataSource,
        rpc_service_1.RpcService])
], WalletSendHistoryAnalyseService);
exports.WalletSendHistoryAnalyseService = WalletSendHistoryAnalyseService;
//# sourceMappingURL=wallet-send-history-analyse.service.js.map