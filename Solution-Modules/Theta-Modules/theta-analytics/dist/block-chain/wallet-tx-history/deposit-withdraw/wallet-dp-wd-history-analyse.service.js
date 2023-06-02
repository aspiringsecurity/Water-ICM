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
exports.WalletDpWdHistoryAnalyseService = void 0;
const wallet_dp_wd_history_entity_1 = require("./wallet-dp-wd-history.entity");
const enum_1 = require("theta-ts-sdk/dist/types/enum");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const utils_service_1 = require("../../../common/utils.service");
const typeorm_2 = require("typeorm");
const rpc_service_1 = require("../../rpc/rpc.service");
const bignumber_js_1 = require("bignumber.js");
const stake_model_1 = require("../../stake/stake.model");
const const_1 = require("../../../const");
let WalletDpWdHistoryAnalyseService = class WalletDpWdHistoryAnalyseService {
    constructor(utilsService, connection, rpcService) {
        this.utilsService = utilsService;
        this.connection = connection;
        this.rpcService = rpcService;
        this.logger = new common_1.Logger('deposit withdraw history analyse service');
        this.recordLogFile = const_1.config.get('ORM_CONFIG')['database'] + 'wallet-dp-wd-history/record.log';
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
            for (const block of blockList) {
                await this.analyseBlock(block);
            }
            if (blockList.length > 0) {
                this.utilsService.updateRecordHeight(this.recordLogFile, Number(blockList[blockList.length - 1].height));
            }
            await this.runner.commitTransaction();
            (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('WALLET_DP_WD_HISTORY.MONITOR_PATH'));
            this.logger.debug('end analyse');
        }
        catch (e) {
            this.logger.error(e);
            console.error(e);
            await this.runner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('WALLET_DP_WD_HISTORY.MONITOR_PATH'));
        }
        finally {
            await this.runner.release();
        }
    }
    async analyseBlock(block) {
        for (const tx of block.transactions) {
            let thetaAmount = 0;
            let tfuelAmount = 0;
            switch (tx.type) {
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.withdraw_stake:
                    if (tx.raw.purpose == stake_model_1.STAKE_NODE_TYPE_ENUM.validator) {
                        const vcp = await this.rpcService.getVcpByHeight(Number(block.height));
                        if (vcp && vcp.BlockHashVcpPairs) {
                            for (const vcpPair of vcp.BlockHashVcpPairs) {
                                for (const vcpNode of vcpPair.Vcp.SortedCandidates) {
                                    if (vcpNode.Holder.toLocaleLowerCase() == tx.raw.holder.address.toLocaleLowerCase()) {
                                        for (const stake of vcpNode.Stakes) {
                                            if (stake.source.toLocaleLowerCase() ==
                                                tx.raw.source.address.toLocaleLowerCase()) {
                                                thetaAmount = new bignumber_js_1.default(stake.amount).dividedBy('1e18').toNumber();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (tx.raw.purpose == stake_model_1.STAKE_NODE_TYPE_ENUM.guardian) {
                        const gcp = await this.rpcService.getGcpByHeight(Number(block.height));
                        if (gcp && gcp.BlockHashGcpPairs) {
                            for (const gcpPair of gcp.BlockHashGcpPairs) {
                                for (const gcpNode of gcpPair.Gcp.SortedGuardians) {
                                    if (gcpNode.Holder.toLocaleLowerCase() == tx.raw.holder.address.toLocaleLowerCase()) {
                                        for (const stake of gcpNode.Stakes) {
                                            if (stake.source.toLocaleLowerCase() ==
                                                tx.raw.source.address.toLocaleLowerCase()) {
                                                thetaAmount = new bignumber_js_1.default(stake.amount).dividedBy('1e18').toNumber();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (tx.raw.purpose == stake_model_1.STAKE_NODE_TYPE_ENUM.edge_cache) {
                        const ecp = await this.rpcService.getEenpByHeight(Number(block.height));
                        if (ecp && ecp.BlockHashEenpPairs) {
                            for (const ecpPair of ecp.BlockHashEenpPairs) {
                                for (const ecpNode of ecpPair.EENs) {
                                    if (ecpNode.Holder.toLocaleLowerCase() == tx.raw.holder.address.toLocaleLowerCase()) {
                                        for (const stake of ecpNode.Stakes) {
                                            if (stake.source.toLocaleLowerCase() ==
                                                tx.raw.source.address.toLocaleLowerCase()) {
                                                tfuelAmount = new bignumber_js_1.default(stake.amount).dividedBy('1e18').toNumber();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else {
                        throw new common_1.ForbiddenException(tx.hash + ' unkown withdraw purpose');
                    }
                    const history = await this.runner.manager.findOne(wallet_dp_wd_history_entity_1.WalletDpWdHistoryEntity, {
                        where: {
                            wallet_address: tx.raw.source.address.toLocaleLowerCase(),
                            node_address: tx.raw.holder.address.toLocaleLowerCase(),
                            height: Number(block.height)
                        }
                    });
                    if (!history)
                        await this.runner.manager.insert(wallet_dp_wd_history_entity_1.WalletDpWdHistoryEntity, {
                            wallet_address: tx.raw.source.address.toLocaleLowerCase(),
                            node_address: tx.raw.holder.address.toLocaleLowerCase(),
                            height: Number(block.height),
                            theta: thetaAmount,
                            tfuel: tfuelAmount,
                            tx_type: tx.type,
                            tx_hash: tx.hash,
                            node_type: tx.raw.purpose,
                            timestamp: Number(block.timestamp)
                        });
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.deposit_stake:
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.tx_deposit_stake_v2:
                    if (tx.raw.purpose == stake_model_1.STAKE_NODE_TYPE_ENUM.validator) {
                        thetaAmount = new bignumber_js_1.default(tx.raw.source.coins.thetawei).dividedBy('1e18').toNumber();
                    }
                    else if (tx.raw.purpose == stake_model_1.STAKE_NODE_TYPE_ENUM.edge_cache) {
                        tfuelAmount = new bignumber_js_1.default(tx.raw.source.coins.tfuelwei).dividedBy('1e18').toNumber();
                    }
                    else if (tx.raw.purpose == stake_model_1.STAKE_NODE_TYPE_ENUM.guardian) {
                        thetaAmount = new bignumber_js_1.default(tx.raw.source.coins.thetawei).dividedBy('1e18').toNumber();
                    }
                    else {
                        throw new common_1.ForbiddenException(tx.hash + ' unkown deposit purpose');
                    }
                    const dpHistory = await this.runner.manager.findOne(wallet_dp_wd_history_entity_1.WalletDpWdHistoryEntity, {
                        where: {
                            wallet_address: tx.raw.source.address.toLocaleLowerCase(),
                            node_address: tx.raw.holder.address.toLocaleLowerCase(),
                            height: Number(block.height)
                        }
                    });
                    if (!dpHistory) {
                        await this.runner.manager.insert(wallet_dp_wd_history_entity_1.WalletDpWdHistoryEntity, {
                            wallet_address: tx.raw.source.address.toLocaleLowerCase(),
                            node_address: tx.raw.holder.address.toLocaleLowerCase(),
                            height: Number(block.height),
                            theta: thetaAmount,
                            tfuel: tfuelAmount,
                            tx_type: tx.type,
                            node_type: tx.raw.purpose,
                            tx_hash: tx.hash,
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
WalletDpWdHistoryAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectDataSource)('wallet-dp-wd-history')),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        typeorm_2.DataSource,
        rpc_service_1.RpcService])
], WalletDpWdHistoryAnalyseService);
exports.WalletDpWdHistoryAnalyseService = WalletDpWdHistoryAnalyseService;
//# sourceMappingURL=wallet-dp-wd-history-analyse.service.js.map