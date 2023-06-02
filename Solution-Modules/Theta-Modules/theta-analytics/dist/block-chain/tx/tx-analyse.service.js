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
exports.TxAnalyseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const enum_1 = require("theta-ts-sdk/dist/types/enum");
const bignumber_js_1 = require("bignumber.js");
const utils_service_1 = require("../../common/utils.service");
const const_1 = require("../../const");
const typeorm_2 = require("@nestjs/typeorm");
const rpc_service_1 = require("../rpc/rpc.service");
const moment = require('moment');
let TxAnalyseService = class TxAnalyseService {
    constructor(utilsService, connection, rpcService) {
        this.utilsService = utilsService;
        this.connection = connection;
        this.rpcService = rpcService;
        this.logger = new common_1.Logger('tx analyse service');
        this.analyseKey = 'under_analyse';
        this.counter = 0;
        this.heightConfigFile = const_1.config.get('ORM_CONFIG')['database'] + 'tx/record.height';
    }
    async analyse() {
        try {
            this.txConnectionRunner = this.connection.createQueryRunner();
            await this.txConnectionRunner.startTransaction();
            let height = 0;
            const lastfinalizedHeight = Number((await this.rpcService.getStatus()).latest_finalized_block_height);
            height = lastfinalizedHeight - 1000;
            if (const_1.config.get('TX.START_HEIGHT')) {
                height = const_1.config.get('TX.START_HEIGHT');
            }
            const recordHeight = this.utilsService.getRecordHeight(this.heightConfigFile);
            height = recordHeight > height ? recordHeight : height;
            if (height >= lastfinalizedHeight) {
                await this.txConnectionRunner.commitTransaction();
                this.logger.debug('commit success');
                this.logger.debug('no height to analyse');
                return;
            }
            let endHeight = lastfinalizedHeight;
            const analyseNumber = const_1.config.get('TX.ANALYSE_NUMBER');
            if (lastfinalizedHeight - height > analyseNumber) {
                endHeight = height + analyseNumber;
            }
            this.logger.debug('start height: ' + height + '; end height: ' + endHeight);
            const blockList = await this.rpcService.getBlockSByRange(height, endHeight);
            this.counter = blockList.length;
            this.logger.debug('init counter', this.counter);
            for (let i = 0; i < blockList.length; i++) {
                const block = blockList[i];
                this.logger.debug(block.height + ' start hanldle');
                await this.handleOrderCreatedEvent(block, lastfinalizedHeight);
            }
            this.logger.debug('start update calltimes by period');
            await this.txConnectionRunner.commitTransaction();
            this.logger.debug('commit success');
            if (blockList.length > 1) {
                this.utilsService.updateRecordHeight(this.heightConfigFile, Number(blockList[blockList.length - 1].height));
            }
            (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('TX.MONITOR_PATH'));
        }
        catch (e) {
            console.error(e.message);
            this.logger.error(e.message);
            this.logger.error('rollback');
            await this.txConnectionRunner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('TX.MONITOR_PATH'));
        }
        finally {
            await this.txConnectionRunner.release();
            this.logger.debug('release success');
        }
    }
    async handleOrderCreatedEvent(block, latestFinalizedBlockHeight) {
        this.logger.debug(block.height + ' start insert');
        const height = Number(block.height);
        const timestamp = moment(moment(Number(block.timestamp) * 1000).format('YYYY-MM-DD HH:00:00')).unix();
        let coin_base_transaction = 0, theta_fuel_burnt_by_smart_contract = 0, theta_fuel_burnt_by_transfers = 0, deposit_stake_transaction = 0, release_fund_transaction = 0, reserve_fund_transaction = 0, send_transaction = 0, service_payment_transaction = 0, slash_transaction = 0, smart_contract_transaction = 0, split_rule_transaction = 0, withdraw_stake_transaction = 0, block_number = 0, active_wallet = 0, theta_fuel_burnt = 0;
        const wallets = {};
        const smartContractToDeal = {};
        for (const transaction of block.transactions) {
            switch (transaction.type) {
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.coinbase:
                    coin_base_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.deposit_stake:
                    deposit_stake_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.tx_deposit_stake_v2:
                    deposit_stake_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.release_fund:
                    release_fund_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.reserve_fund:
                    reserve_fund_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.send:
                    send_transaction++;
                    if (transaction.raw.fee && transaction.raw.fee.tfuelwei != '0') {
                        theta_fuel_burnt_by_transfers += new bignumber_js_1.default(transaction.raw.fee.tfuelwei)
                            .dividedBy('1e18')
                            .toNumber();
                    }
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.service_payment:
                    service_payment_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.slash:
                    slash_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.smart_contract:
                    smart_contract_transaction++;
                    this.logger.debug('start parse nft record');
                    if (transaction.raw.gas_limit && transaction.raw.gas_price) {
                        theta_fuel_burnt_by_smart_contract += new bignumber_js_1.default(transaction.raw.gas_price)
                            .multipliedBy(transaction.receipt.GasUsed)
                            .dividedBy('1e18')
                            .toNumber();
                        theta_fuel_burnt += new bignumber_js_1.default(transaction.raw.gas_price)
                            .multipliedBy(transaction.receipt.GasUsed)
                            .dividedBy('1e18')
                            .toNumber();
                    }
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.split_rule:
                    split_rule_transaction++;
                    break;
                case enum_1.THETA_TRANSACTION_TYPE_ENUM.withdraw_stake:
                    withdraw_stake_transaction++;
                    break;
                default:
                    this.logger.error('no transaction.tx_type:' + transaction.type);
                    break;
            }
            if (transaction.raw.fee && transaction.raw.fee.tfuelwei != '0') {
                theta_fuel_burnt += new bignumber_js_1.default(transaction.raw.fee.tfuelwei).dividedBy('1e18').toNumber();
            }
        }
        this.logger.debug(height + ' end upsert wallets');
        block_number++;
        await this.txConnectionRunner.query(`INSERT INTO theta_tx_num_by_hours_entity (block_number,theta_fuel_burnt,theta_fuel_burnt_by_smart_contract,theta_fuel_burnt_by_transfers,active_wallet,coin_base_transaction,slash_transaction,send_transaction,reserve_fund_transaction,release_fund_transaction,service_payment_transaction,split_rule_transaction,deposit_stake_transaction,withdraw_stake_transaction,smart_contract_transaction,latest_block_height,timestamp) VALUES (${block_number},${theta_fuel_burnt}, ${theta_fuel_burnt_by_smart_contract},${theta_fuel_burnt_by_transfers},0,${coin_base_transaction},${slash_transaction},${send_transaction},${reserve_fund_transaction},${release_fund_transaction},${service_payment_transaction},${split_rule_transaction},${deposit_stake_transaction},${withdraw_stake_transaction},${smart_contract_transaction},${height},${timestamp})  ON CONFLICT (timestamp) DO UPDATE set block_number=block_number+${block_number},  theta_fuel_burnt=theta_fuel_burnt+${theta_fuel_burnt},theta_fuel_burnt_by_smart_contract=theta_fuel_burnt_by_smart_contract+${theta_fuel_burnt_by_smart_contract},theta_fuel_burnt_by_transfers=theta_fuel_burnt_by_transfers+${theta_fuel_burnt_by_transfers},coin_base_transaction=coin_base_transaction+${coin_base_transaction},slash_transaction=slash_transaction+${slash_transaction},send_transaction=send_transaction+${send_transaction},reserve_fund_transaction=reserve_fund_transaction+${reserve_fund_transaction},release_fund_transaction=release_fund_transaction+${release_fund_transaction},service_payment_transaction=service_payment_transaction+${service_payment_transaction},split_rule_transaction=split_rule_transaction+${split_rule_transaction},deposit_stake_transaction=deposit_stake_transaction+${deposit_stake_transaction},withdraw_stake_transaction=withdraw_stake_transaction+${withdraw_stake_transaction},smart_contract_transaction=smart_contract_transaction+${smart_contract_transaction},latest_block_height=${height};`);
        this.logger.debug(height + ' end update theta tx num by hours');
        this.logger.debug(height + ' end update analyse');
        this.counter--;
    }
};
TxAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_2.InjectDataSource)('tx')),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        typeorm_1.DataSource,
        rpc_service_1.RpcService])
], TxAnalyseService);
exports.TxAnalyseService = TxAnalyseService;
//# sourceMappingURL=tx-analyse.service.js.map