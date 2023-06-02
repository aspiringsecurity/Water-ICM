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
exports.StakeService = void 0;
const rpc_service_1 = require("./../rpc/rpc.service");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const stake_statistics_entity_1 = require("./stake-statistics.entity");
const common_1 = require("@nestjs/common");
const stake_reward_entity_1 = require("./stake-reward.entity");
const moment = require('moment');
let StakeService = class StakeService {
    constructor(stakeStatisticsRepository, stakeRewardRepository, cacheManager, rpcService) {
        this.stakeStatisticsRepository = stakeStatisticsRepository;
        this.stakeRewardRepository = stakeRewardRepository;
        this.cacheManager = cacheManager;
        this.rpcService = rpcService;
        this.logger = new common_1.Logger();
    }
    async getLatestFinalizedBlock() {
        let nodeInfo = await this.rpcService.getStatus();
        return nodeInfo.latest_finalized_block_height;
    }
    async getLatestStakeStatics() {
        const key = 'latest-stake-info-key';
        if (await this.cacheManager.get(key))
            return await this.cacheManager.get(key);
        const latestStakeInfo = await this.stakeStatisticsRepository.findOne({
            where: {
                id: (0, typeorm_2.MoreThan)(0)
            },
            order: {
                block_height: 'DESC'
            }
        });
        if (latestStakeInfo) {
            this.logger.debug('latest block height:' + latestStakeInfo.block_height);
            const stakeInfo = await this.stakeStatisticsRepository.find({
                where: {
                    block_height: (0, typeorm_2.MoreThanOrEqual)(latestStakeInfo.block_height - 13800 * 7)
                },
                order: {
                    block_height: 'ASC'
                }
            });
            await this.cacheManager.set(key, stakeInfo, { ttl: 60 * 5 });
            return stakeInfo;
        }
        else {
            return [];
        }
    }
    async getStakeReward(wallet_address, period) {
        let rewardList = [];
        this.logger.debug('period:' + period);
        this.logger.debug('wallet:' + wallet_address);
        switch (period) {
            case 'last_24_hour':
                rewardList = await this.stakeRewardRepository.find({
                    where: {
                        timestamp: (0, typeorm_2.MoreThan)(moment().subtract(24, 'hours').unix()),
                        wallet_address: wallet_address
                    }
                });
                break;
            case 'last_7_days':
                rewardList = await this.stakeRewardRepository.find({
                    where: {
                        timestamp: (0, typeorm_2.MoreThan)(moment().subtract(7, 'days').unix()),
                        wallet_address: wallet_address
                    }
                });
                break;
            case 'last_3_days':
                rewardList = await this.stakeRewardRepository.find({
                    where: {
                        timestamp: (0, typeorm_2.MoreThan)(moment().subtract(3, 'days').unix()),
                        wallet_address: wallet_address
                    }
                });
                break;
            case 'last_30_days':
                rewardList = await this.stakeRewardRepository.find({
                    where: {
                        timestamp: (0, typeorm_2.MoreThan)(moment().subtract(3, 'days').unix()),
                        wallet_address: wallet_address
                    }
                });
                break;
            default:
                break;
        }
        return rewardList.reduce((oldValue, reward) => {
            return oldValue + reward.reward_amount;
        }, 0);
    }
};
StakeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(stake_statistics_entity_1.StakeStatisticsEntity, 'stake')),
    __param(1, (0, typeorm_1.InjectRepository)(stake_reward_entity_1.StakeRewardEntity, 'stake')),
    __param(2, (0, common_1.Inject)(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, Object, rpc_service_1.RpcService])
], StakeService);
exports.StakeService = StakeService;
//# sourceMappingURL=stake.service.js.map