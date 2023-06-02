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
exports.WalletService = void 0;
const latest_stake_info_entity_1 = require("./../stake/latest-stake-info.entity");
const common_1 = require("@nestjs/common");
const market_service_1 = require("../../market/market.service");
const bignumber_js_1 = require("bignumber.js");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wallet_entity_1 = require("./wallet.entity");
const active_wallets_entity_1 = require("./active-wallets.entity");
const stake_model_1 = require("../stake/stake.model");
const rpc_service_1 = require("../rpc/rpc.service");
const utils_service_1 = require("../../common/utils.service");
let WalletService = class WalletService {
    constructor(cacheManager, walletRepository, latestStakeInfoRepository, activeWalletsRepository, marketInfo, rpcService, utilsService) {
        this.cacheManager = cacheManager;
        this.walletRepository = walletRepository;
        this.latestStakeInfoRepository = latestStakeInfoRepository;
        this.activeWalletsRepository = activeWalletsRepository;
        this.marketInfo = marketInfo;
        this.rpcService = rpcService;
        this.utilsService = utilsService;
        this.logger = new common_1.Logger();
    }
    async getBalanceByAddress(address) {
        const accountBalance = await this.rpcService.getAccount(address);
        if (!accountBalance || !accountBalance || !accountBalance.coins) {
            return {
                theta: {
                    amount: 0,
                    fiat_currency_value: {
                        usd: 0,
                        cny: 0,
                        eur: 0
                    }
                },
                theta_fuel: {
                    amount: 0,
                    fiat_currency_value: {
                        usd: 0,
                        cny: 0,
                        eur: 0
                    }
                }
            };
        }
        const thetaBalance = {
            amount: Number(new bignumber_js_1.default(accountBalance.coins.thetawei).dividedBy('1e18').toFixed()),
            fiat_currency_value: {
                usd: (await this.marketInfo.getPrice('theta')) *
                    Number(new bignumber_js_1.default(accountBalance.coins.thetawei).dividedBy('1e18').toFixed()),
                cny: 0,
                eur: 0
            }
        };
        const usdRate = await this.getUsdRate();
        thetaBalance.fiat_currency_value.cny = thetaBalance.fiat_currency_value.usd * usdRate.CNY;
        thetaBalance.fiat_currency_value.eur = thetaBalance.fiat_currency_value.usd * usdRate.EUR;
        const thetaFuelBalance = {
            amount: Number(new bignumber_js_1.default(accountBalance.coins.tfuelwei).dividedBy('1e18').toFixed()),
            fiat_currency_value: {
                usd: (await this.marketInfo.getPrice('tfuel')) *
                    Number(new bignumber_js_1.default(accountBalance.coins.tfuelwei).dividedBy('1e18').toFixed()),
                cny: 0,
                eur: 0
            }
        };
        thetaFuelBalance.fiat_currency_value.cny =
            thetaFuelBalance.fiat_currency_value.usd * usdRate.CNY;
        thetaFuelBalance.fiat_currency_value.eur =
            thetaFuelBalance.fiat_currency_value.usd * usdRate.EUR;
        return {
            theta: thetaBalance,
            theta_fuel: thetaFuelBalance
        };
    }
    async getStakeInfoByAddress(address) {
        const gcpStake = [];
        const eenpStake = [];
        const vcpStake = [];
        const thetaPrice = await this.marketInfo.getPrice('theta');
        const tfuelPrice = await this.marketInfo.getPrice('tfuel');
        const usdRate = await this.getUsdRate();
        const gcpRes = await this.latestStakeInfoRepository.findOne({
            where: { node_type: stake_model_1.STAKE_NODE_TYPE_ENUM.guardian }
        });
        if (gcpRes) {
            const gcpList = JSON.parse(gcpRes.holder);
            gcpList.BlockHashGcpPairs[0].Gcp.SortedGuardians.forEach((guardian) => {
                guardian.Stakes.forEach((stake) => {
                    if (stake.source === address) {
                        gcpStake.push({
                            node_address: guardian.Holder,
                            amount: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()),
                            withdrawn: stake.withdrawn,
                            return_height: stake.return_height,
                            fiat_currency_value: {
                                usd: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) * thetaPrice,
                                cny: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) *
                                    tfuelPrice *
                                    usdRate.CNY,
                                eur: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) *
                                    thetaPrice *
                                    usdRate.EUR
                            }
                        });
                    }
                });
            });
        }
        const eenpRes = await this.latestStakeInfoRepository.findOne({
            where: { node_type: stake_model_1.STAKE_NODE_TYPE_ENUM.edge_cache }
        });
        if (eenpRes) {
            const eenpList = JSON.parse(eenpRes.holder);
            eenpList.BlockHashEenpPairs[0].EENs.forEach((een) => {
                een.Stakes.forEach((stake) => {
                    if (stake.source === address) {
                        eenpStake.push({
                            node_address: een.Holder,
                            amount: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()),
                            withdrawn: stake.withdrawn,
                            return_height: stake.return_height,
                            fiat_currency_value: {
                                usd: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) * tfuelPrice,
                                cny: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) *
                                    tfuelPrice *
                                    usdRate.CNY,
                                eur: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) *
                                    tfuelPrice *
                                    usdRate.EUR
                            }
                        });
                    }
                });
            });
        }
        const vaRes = await this.latestStakeInfoRepository.findOne({
            where: { node_type: stake_model_1.STAKE_NODE_TYPE_ENUM.validator }
        });
        if (vaRes) {
            const validatorList = JSON.parse(vaRes.holder);
            validatorList.BlockHashVcpPairs[0].Vcp.SortedCandidates.forEach((vcp) => {
                vcp.Stakes.forEach((stake) => {
                    if (stake.source === address) {
                        vcpStake.push({
                            node_address: vcp.Holder,
                            amount: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()),
                            withdrawn: stake.withdrawn,
                            return_height: stake.return_height,
                            fiat_currency_value: {
                                usd: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) * thetaPrice,
                                cny: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) *
                                    thetaPrice *
                                    usdRate.CNY,
                                eur: Number(new bignumber_js_1.default(stake.amount).dividedBy('1e18').toFixed()) *
                                    thetaPrice *
                                    usdRate.EUR
                            }
                        });
                    }
                });
            });
        }
        return {
            stake_to_guardian: gcpStake,
            stake_to_elite_node: eenpStake,
            stake_to_vcp: vcpStake
        };
    }
    async getALlBalance(address) {
        const totalBalance = {
            fiat_currency_value: {
                usd: 0,
                cny: 0,
                eur: 0
            },
            theta_amount: 0,
            theta_fuel_amount: 0
        };
        let walletBalance = await this.getBalanceByAddress(address);
        totalBalance.theta_amount += walletBalance.theta.amount;
        totalBalance.theta_fuel_amount += walletBalance.theta_fuel.amount;
        totalBalance.fiat_currency_value.usd +=
            walletBalance.theta_fuel.fiat_currency_value.usd + walletBalance.theta.fiat_currency_value.usd;
        totalBalance.fiat_currency_value.cny +=
            walletBalance.theta_fuel.fiat_currency_value.cny + walletBalance.theta.fiat_currency_value.cny;
        totalBalance.fiat_currency_value.eur +=
            walletBalance.theta_fuel.fiat_currency_value.eur + walletBalance.theta.fiat_currency_value.eur;
        let stakeBalance = await this.getStakeInfoByAddress(address);
        stakeBalance.stake_to_guardian.concat(stakeBalance.stake_to_vcp).forEach((stakeInfo) => {
            totalBalance.theta_amount += stakeInfo.amount;
            totalBalance.fiat_currency_value.usd += stakeInfo.fiat_currency_value.usd;
            totalBalance.fiat_currency_value.cny += stakeInfo.fiat_currency_value.cny;
            totalBalance.fiat_currency_value.eur += stakeInfo.fiat_currency_value.eur;
        });
        stakeBalance.stake_to_elite_node.forEach((stakeInfo) => {
            totalBalance.theta_fuel_amount += stakeInfo.amount;
            totalBalance.fiat_currency_value.usd += stakeInfo.fiat_currency_value.usd;
            totalBalance.fiat_currency_value.cny += stakeInfo.fiat_currency_value.cny;
            totalBalance.fiat_currency_value.eur += stakeInfo.fiat_currency_value.eur;
        });
        return {
            total: totalBalance,
            theta: walletBalance.theta,
            theta_fuel: walletBalance.theta_fuel,
            stake_to_guardian: stakeBalance.stake_to_guardian,
            stake_to_elite_node: stakeBalance.stake_to_elite_node,
            stake_to_validator_node: stakeBalance.stake_to_vcp
        };
    }
    async getUsdRate() {
        const key = 'usd-rate-key';
        if (await this.cacheManager.get(key))
            return await this.cacheManager.get(key);
        const jsonInfo = await this.utilsService.getJsonRes('https://api.exchangerate-api.com/v4/latest/USD', 3000);
        await this.cacheManager.set(key, jsonInfo['rates'], { ttl: 60 * 60 * 24 * 7 });
        return jsonInfo['rates'];
    }
    async markActive(wallets) {
        try {
            const sqlArr = [];
            for (const wallet of wallets) {
                sqlArr.push({
                    address: wallet.address,
                    latest_active_time: wallet.timestamp
                });
                if (sqlArr.length > 900) {
                    await this.walletRepository.upsert(sqlArr, ['address']);
                    sqlArr.length = 0;
                }
            }
            await this.walletRepository.upsert(sqlArr, ['address']);
        }
        catch (e) {
            this.logger.error('update wallet fail');
            this.logger.error(e);
        }
    }
    async getActiveWallet(startTime) {
        return await this.activeWalletsRepository.find({
            where: { snapshot_time: (0, typeorm_2.MoreThan)(startTime) }
        });
    }
    async getWalletByAddress(address) {
        return await this.walletRepository.findOne({
            where: { address: address.toLowerCase() }
        });
    }
};
WalletService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __param(1, (0, typeorm_1.InjectRepository)(wallet_entity_1.WalletEntity, 'wallet')),
    __param(2, (0, typeorm_1.InjectRepository)(latest_stake_info_entity_1.LatestStakeInfoEntity, 'stake')),
    __param(3, (0, typeorm_1.InjectRepository)(active_wallets_entity_1.ActiveWalletsEntity, 'wallet')),
    __metadata("design:paramtypes", [Object, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        market_service_1.MarketService,
        rpc_service_1.RpcService,
        utils_service_1.UtilsService])
], WalletService);
exports.WalletService = WalletService;
//# sourceMappingURL=wallets.service.js.map