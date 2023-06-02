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
exports.TxService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallets_service_1 = require("../wallet/wallets.service");
const theta_tx_num_by_hours_entity_1 = require("./theta-tx-num-by-hours.entity");
const theta_tx_model_1 = require("./theta-tx.model");
const moment = require('moment');
let TxService = class TxService {
    constructor(thetaTxNumRepository, walletService) {
        this.thetaTxNumRepository = thetaTxNumRepository;
        this.walletService = walletService;
    }
    async getThetaDataByDate(timezoneOffset, days = theta_tx_model_1.TX_GET_DATA_AMOUNT._2week) {
        const startTimeStamp = moment().subtract(days, 'days').unix();
        let hours = await this.thetaTxNumRepository.find({
            order: { timestamp: 'DESC' },
            where: {
                timestamp: (0, typeorm_2.MoreThan)(startTimeStamp)
            }
        });
        const activeWallets = await this.walletService.getActiveWallet(startTimeStamp);
        let obj = {};
        hours.forEach((hourData) => {
            const dateObj = moment(hourData.timestamp * 1000).subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes');
            let date = dateObj.format('YYYY_MM_DD');
            if (!obj.hasOwnProperty(date)) {
                obj[date] = {
                    latest_block_height: hourData.latest_block_height,
                    month: dateObj.format('MM'),
                    theta_fuel_burnt: hourData.theta_fuel_burnt,
                    theta_fuel_burnt_by_smart_contract: hourData.theta_fuel_burnt_by_smart_contract,
                    theta_fuel_burnt_by_transfers: hourData.theta_fuel_burnt_by_transfers,
                    timestamp: hourData.timestamp,
                    year: dateObj.format('YYYY'),
                    block_number: hourData.block_number,
                    active_wallet: hourData.active_wallet,
                    date: dateObj.format('DD'),
                    coin_base_transaction: hourData.coin_base_transaction,
                    slash_transaction: hourData.slash_transaction,
                    send_transaction: hourData.send_transaction,
                    reserve_fund_transaction: hourData.reserve_fund_transaction,
                    release_fund_transaction: hourData.reserve_fund_transaction,
                    service_payment_transaction: hourData.service_payment_transaction,
                    split_rule_transaction: hourData.split_rule_transaction,
                    deposit_stake_transaction: hourData.deposit_stake_transaction,
                    withdraw_stake_transaction: hourData.withdraw_stake_transaction,
                    smart_contract_transaction: hourData.smart_contract_transaction
                };
                const activeWalletObj = activeWallets.find((wallet) => {
                    return wallet.snapshot_time === hourData.timestamp;
                });
                if (activeWalletObj)
                    obj[date]['active_wallet'] = activeWalletObj.active_wallets_amount;
            }
            else {
                obj[date].coin_base_transaction += hourData.coin_base_transaction;
                obj[date].slash_transaction += hourData.slash_transaction;
                obj[date].block_number += hourData.block_number;
                obj[date].send_transaction += hourData.send_transaction;
                obj[date].reserve_fund_transaction += hourData.reserve_fund_transaction;
                obj[date].release_fund_transaction += hourData.release_fund_transaction;
                obj[date].service_payment_transaction += hourData.service_payment_transaction;
                obj[date].split_rule_transaction += hourData.split_rule_transaction;
                obj[date].deposit_stake_transaction += hourData.deposit_stake_transaction;
                obj[date].withdraw_stake_transaction += hourData.withdraw_stake_transaction;
                obj[date].smart_contract_transaction += hourData.smart_contract_transaction;
                obj[date].theta_fuel_burnt += hourData.theta_fuel_burnt;
                obj[date].theta_fuel_burnt_by_smart_contract += hourData.theta_fuel_burnt_by_smart_contract;
                obj[date].theta_fuel_burnt_by_transfers += hourData.theta_fuel_burnt_by_transfers;
            }
        });
        const result = Object.values(obj);
        result.pop();
        return result;
    }
    async getThetaByHour(timezoneOffset, amount = theta_tx_model_1.TX_GET_DATA_AMOUNT._2week) {
        const startTime = moment()
            .subtract(amount * 24, 'hours')
            .subtract(-new Date().getTimezoneOffset() - Number(timezoneOffset), 'minutes')
            .unix();
        const res = await this.thetaTxNumRepository.find({
            order: { timestamp: 'DESC' },
            where: {
                timestamp: (0, typeorm_2.MoreThan)(startTime)
            }
        });
        const activeWalletList = await this.walletService.getActiveWallet(startTime - 3600);
        res.forEach((tx) => {
            const dateObj = moment(tx.timestamp * 1000).subtract(-new Date().getTimezoneOffset() - Number(timezoneOffset), 'minutes');
            tx.year = dateObj.format('YYYY');
            tx.month = dateObj.format('MM');
            tx.date = dateObj.format('DD');
            tx.hour = dateObj.format('HH');
            for (const wallet of activeWalletList) {
                if (tx.timestamp === wallet.snapshot_time - 3600) {
                    tx.active_wallet = wallet.active_wallets_amount_last_hour;
                }
            }
        });
        return res;
    }
};
TxService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(theta_tx_num_by_hours_entity_1.ThetaTxNumByHoursEntity, 'tx')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wallets_service_1.WalletService])
], TxService);
exports.TxService = TxService;
//# sourceMappingURL=tx.service.js.map