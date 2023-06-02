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
exports.ExplorerAnalyseService = void 0;
const rpc_service_1 = require("./../rpc/rpc.service");
const const_1 = require("./const");
const count_entity_1 = require("./count.entity");
const transaction_entity_1 = require("./transaction.entity");
const block_list_entity_1 = require("./block-list.entity");
const utils_service_1 = require("../../common/utils.service");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const bignumber_js_1 = require("bignumber.js");
const enum_1 = require("theta-ts-sdk/dist/types/enum");
const const_2 = require("../../const");
const typeorm_2 = require("@nestjs/typeorm");
const path = require('path');
let ExplorerAnalyseService = class ExplorerAnalyseService {
    constructor(utilsService, explorerConnectionInjected, rpcService) {
        this.utilsService = utilsService;
        this.explorerConnectionInjected = explorerConnectionInjected;
        this.rpcService = rpcService;
        this.logger = new common_1.Logger('explorer analyse service');
        this.heightConfigFile = const_2.config.get('ORM_CONFIG')['database'] + 'explorer/record.height';
        this.current = {};
        this.transactionNum = 0;
    }
    async analyse() {
        try {
            this.explorerConnectionRunner = this.explorerConnectionInjected.createQueryRunner();
            await this.explorerConnectionRunner.startTransaction();
            this.transactionNum = 0;
            const [startHeight, endHeight] = await this.getInitHeight('explorer');
            if (endHeight == 0) {
                await this.explorerConnectionRunner.commitTransaction();
                await this.explorerConnectionRunner.release();
                return;
            }
            this.logger.debug('start analyse data, start height:' + startHeight + ', end height:' + endHeight);
            const blockList = await this.rpcService.getBlockSByRange(startHeight, endHeight);
            this.logger.debug('get block list length:' + blockList.length);
            for (const block of blockList) {
                await this.handleData(block);
            }
            const tansactionCountEntity = await this.explorerConnectionRunner.manager.findOne(count_entity_1.CountEntity, {
                where: {
                    key: const_1.TRANSACTION_COUNT_KEY
                }
            });
            if (tansactionCountEntity) {
                tansactionCountEntity.count += this.transactionNum;
                await this.explorerConnectionRunner.manager.save(tansactionCountEntity);
            }
            else {
                await this.explorerConnectionRunner.manager.insert(count_entity_1.CountEntity, {
                    key: const_1.TRANSACTION_COUNT_KEY,
                    count: this.transactionNum
                });
            }
            const blockCountEntity = await this.explorerConnectionRunner.manager.findOne(count_entity_1.CountEntity, {
                where: { key: const_1.BLOCK_COUNT_KEY }
            });
            if (blockCountEntity) {
                blockCountEntity.count += blockList.length;
                await this.explorerConnectionRunner.manager.save(blockCountEntity);
            }
            else {
                await this.explorerConnectionRunner.manager.insert(count_entity_1.CountEntity, {
                    key: const_1.BLOCK_COUNT_KEY,
                    count: blockList.length
                });
            }
            if (blockList.length > 0) {
                this.utilsService.updateRecordHeight(this.heightConfigFile, Number(blockList[blockList.length - 1].height));
            }
            await this.explorerConnectionRunner.commitTransaction();
            (0, utils_service_1.writeSucessExcuteLog)(const_2.config.get('EXPLORER.MONITOR_PATH'));
        }
        catch (e) {
            this.logger.error(e);
            console.error(e);
            this.logger.debug(JSON.stringify(this.current));
            await this.explorerConnectionRunner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_2.config.get('EXPLORER.MONITOR_PATH'));
        }
        finally {
            await this.explorerConnectionRunner.release();
        }
    }
    async handleData(block) {
        const tfuelBurnt = block.transactions.reduce((acc, cur) => {
            if (cur.raw.fee && cur.raw.fee.tfuelwei)
                return acc + new bignumber_js_1.default(cur.raw.fee.tfuelwei).dividedBy('1e18').toNumber();
            else
                return acc;
        }, 0);
        this.logger.debug(block.height);
        for (const transaction of block.transactions) {
            this.current = transaction;
            let theta = 0, thetaFuel = 0, from = '', to = '';
            switch (transaction.type) {
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.send:
                    if (transaction.raw.inputs.length > 0) {
                        theta = transaction.raw.inputs.reduce((curr, item) => {
                            return curr + new bignumber_js_1.default(item.coins.thetawei).dividedBy('1e18').toNumber();
                        }, 0);
                        thetaFuel = transaction.raw.inputs.reduce((curr, item) => {
                            return curr + new bignumber_js_1.default(item.coins.tfuelwei).dividedBy('1e18').toNumber();
                        }, 0);
                        from = JSON.stringify(transaction.raw.inputs);
                        to = JSON.stringify(transaction.raw.outputs);
                    }
                    else {
                        theta = new bignumber_js_1.default(transaction.raw.from.coins.thetawei).dividedBy('1e18').toNumber();
                        thetaFuel = new bignumber_js_1.default(transaction.raw.from.coins.tfuelwei)
                            .dividedBy('1e18')
                            .toNumber();
                        from = JSON.stringify([transaction.raw.from]);
                        to = JSON.stringify([transaction.raw.to]);
                    }
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.smart_contract:
                    from = transaction.raw.from.address;
                    to = transaction.raw.to.address;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.coinbase:
                    from = transaction.raw.proposer.address;
                    to = JSON.stringify(transaction.raw.outputs);
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.service_payment:
                    from = transaction.raw.source.address;
                    to = transaction.raw.target.address;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.reserve_fund:
                    from = transaction.raw.source.address;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.split_rule:
                    from = transaction.raw.initiator.address;
                    break;
                case 11:
                    from = transaction.raw.holder.address;
                    break;
                default:
                    if (transaction.raw.from)
                        from = transaction.raw.from.address;
                    else {
                        from = transaction.raw.source.address;
                    }
                    break;
            }
            const gasPrice = transaction.raw.gas_price;
            const gasLimit = transaction.raw.gas_limit;
            if (const_2.config.get('CONFLICT_TRANSACTIONS').indexOf(transaction.hash) !== -1) {
                continue;
            }
            else {
                await this.explorerConnectionRunner.manager.insert(transaction_entity_1.TransactionEntity, {
                    tx_hash: transaction.hash,
                    height: Number(block.height),
                    fee: JSON.stringify(transaction.raw.fee),
                    tx_type: transaction.type,
                    from: from,
                    to: to,
                    timestamp: Number(block.timestamp),
                    theta: theta,
                    theta_fuel: thetaFuel,
                    gas_price: gasPrice,
                    gas_limit: gasLimit
                });
            }
        }
        this.transactionNum += block.transactions.length;
        return await this.explorerConnectionRunner.manager.insert(block_list_entity_1.BlokcListEntity, {
            height: Number(block.height),
            block_hash: block.hash,
            timestamp: Number(block.timestamp),
            tfuel_burnt: tfuelBurnt,
            txns: block.transactions.length
        });
    }
    async getInitHeight(configPath) {
        let height = 0;
        this.logger.debug(this.heightConfigFile);
        const lastfinalizedHeight = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
        this.logger.debug(JSON.stringify(const_2.config.get(configPath.toUpperCase() + '.START_HEIGHT')));
        if (const_2.config.get(configPath.toUpperCase() + '.START_HEIGHT')) {
            height = const_2.config.get(configPath.toUpperCase() + '.START_HEIGHT');
        }
        const recordHeight = this.utilsService.getRecordHeight(this.heightConfigFile);
        height = recordHeight > height ? recordHeight : height;
        if (height >= lastfinalizedHeight) {
            this.logger.debug('commit success');
            this.logger.debug('no height to analyse');
            return [0, 0];
        }
        let endHeight = lastfinalizedHeight;
        const analyseNumber = const_2.config.get(configPath.toUpperCase() + '.ANALYSE_NUMBER');
        if (lastfinalizedHeight - height > analyseNumber) {
            endHeight = height + analyseNumber;
        }
        return [height, endHeight];
    }
};
ExplorerAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectDataSource)('explorer')),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        typeorm_1.DataSource,
        rpc_service_1.RpcService])
], ExplorerAnalyseService);
exports.ExplorerAnalyseService = ExplorerAnalyseService;
//# sourceMappingURL=explorer-analyse.service.js.map