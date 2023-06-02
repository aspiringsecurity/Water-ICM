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
exports.NftStatisticsService = exports.NftStatisticsOrderByType = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const nft_transfer_record_entity_1 = require("../../block-chain/smart-contract/nft/nft-transfer-record.entity");
const market_service_1 = require("../../market/market.service");
const typeorm_2 = require("typeorm");
const nft_statistics_entity_1 = require("./nft-statistics.entity");
var NftStatisticsOrderByType;
(function (NftStatisticsOrderByType) {
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_24_h_users"] = 0] = "last_24_h_users";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_7_days_users"] = 1] = "last_7_days_users";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_30_days_users"] = 2] = "last_30_days_users";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_24_h_transactions"] = 3] = "last_24_h_transactions";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_7_days_transactions"] = 4] = "last_7_days_transactions";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_30_days_transactions"] = 5] = "last_30_days_transactions";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_24_h_volume"] = 6] = "last_24_h_volume";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_7_days_volume"] = 7] = "last_7_days_volume";
    NftStatisticsOrderByType[NftStatisticsOrderByType["last_30_days_volume"] = 8] = "last_30_days_volume";
})(NftStatisticsOrderByType = exports.NftStatisticsOrderByType || (exports.NftStatisticsOrderByType = {}));
(0, graphql_1.registerEnumType)(NftStatisticsOrderByType, {
    name: 'NftStatisticsOrderByType',
    description: 'NftStatisticsOrderByType'
});
const moment = require('moment');
let NftStatisticsService = class NftStatisticsService {
    constructor(nftStatisticsRepository, nftTransferRecordRepository, marketService) {
        this.nftStatisticsRepository = nftStatisticsRepository;
        this.nftTransferRecordRepository = nftTransferRecordRepository;
        this.marketService = marketService;
        this.logger = new common_1.Logger();
    }
    async getNft(orderBy = NftStatisticsOrderByType.last_24_h_users, take = 20, after, skip = 0, search = '') {
        const condition = {
            where: {},
            take: take + 1,
            skip: skip,
            order: {}
        };
        if (search) {
            condition.where['name'] = (0, typeorm_2.Like)('%' + search + '%');
        }
        switch (orderBy) {
            case NftStatisticsOrderByType.last_24_h_users:
                condition.order.last_24_h_users = 'DESC';
                break;
            case NftStatisticsOrderByType.last_7_days_users:
                condition.order.last_7_days_users = 'DESC';
                break;
            case NftStatisticsOrderByType.last_30_days_users:
                condition.order.last_30_days_users = 'DESC';
                break;
            case NftStatisticsOrderByType.last_24_h_transactions:
                condition.order.last_24_h_transactions = 'DESC';
                break;
            case NftStatisticsOrderByType.last_7_days_transactions:
                condition.order.last_7_days_transactions = 'DESC';
                break;
            case NftStatisticsOrderByType.last_30_days_transactions:
                condition.order.last_30_days_transactions = 'DESC';
                break;
            case NftStatisticsOrderByType.last_24_h_volume:
                condition.order.last_24_h_volume = 'DESC';
                break;
            case NftStatisticsOrderByType.last_7_days_volume:
                condition.order.last_7_days_volume = 'DESC';
                break;
            case NftStatisticsOrderByType.last_30_days_volume:
                condition.order.last_30_days_volume = 'DESC';
                break;
            default:
                condition.order.last_24_h_users = 'DESC';
                break;
        }
        if (after) {
            const num = Number(Buffer.from(after, 'base64').toString('ascii'));
            this.logger.debug('decode from base64:' + num);
            switch (orderBy) {
                case NftStatisticsOrderByType.last_24_h_users:
                    condition.where['last_24_h_users'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_7_days_users:
                    condition.where['last_7_days_users'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_7_days_users:
                    condition.where['last_30_days_users'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_24_h_transactions:
                    condition.where['last_24_h_transactions'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_7_days_transactions:
                    condition.where['last_7_days_transactions'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_30_days_transactions:
                    condition.where['last_30_days_transactions'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_24_h_volume:
                    condition.where['last_24_h_volume'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_7_days_volume:
                    condition.where['last_7_days_volume'] = (0, typeorm_2.LessThan)(num);
                    break;
                case NftStatisticsOrderByType.last_30_days_volume:
                    condition.where['last_30_days_volume'] = (0, typeorm_2.LessThan)(num);
                    break;
                default:
                    condition.where['last_24_h_users'] = (0, typeorm_2.LessThan)(num);
                    break;
            }
        }
        const totalNftCondition = {};
        if (search) {
            totalNftCondition['name'] = (0, typeorm_2.Like)('%' + search + '%');
        }
        const totalNft = await this.nftStatisticsRepository.count({ where: totalNftCondition });
        let nftList = await this.nftStatisticsRepository.find(condition);
        let hasNextPage = false;
        if (nftList.length > take) {
            hasNextPage = true;
            nftList = nftList.slice(0, take);
        }
        return [hasNextPage, totalNft, nftList];
    }
    async updateNftImg(contractAddress, imgUri) {
        const nftStatistics = await this.nftStatisticsRepository.findOne({
            where: { smart_contract_address: contractAddress }
        });
        if (nftStatistics) {
            nftStatistics.img_uri = imgUri;
            return await this.nftStatisticsRepository.save(nftStatistics);
        }
        return {};
    }
    async getNftInfo(contractAddress) {
        const nftDetail = await this.nftStatisticsRepository.findOne({
            where: {
                smart_contract_address: contractAddress
            }
        });
        if (!nftDetail) {
            return {
                name: '',
                contract_uri_detail: '',
                img_uri: ''
            };
        }
        return nftDetail;
    }
    async formatNftStatistics(contractUri, nftStatistics, timezoneOffset) {
        const tfuelPrice = await this.marketService.getThetaFuelMarketInfo();
        if (nftStatistics) {
            const statisticsObj24H = {};
            const statisticsObj7Days = {};
            const statisticsObj30Days = {};
            const usersArr24H = {};
            const usersArr7Days = {};
            const usersArr30Days = {};
            const statisticsArr24H = [];
            const statisticsArr7Days = [];
            const statisticsArr30Days = [];
            for (const record of nftStatistics) {
                if (record.timestamp > moment().subtract(24, 'hours').unix()) {
                    const hourStr = moment(record.timestamp * 1000).format('YYYY-MM-DD-HH');
                    if (statisticsObj24H[hourStr]) {
                        usersArr24H[hourStr].includes(record.from) || usersArr24H[hourStr].push(record.from);
                        usersArr24H[hourStr].includes(record.to) || usersArr24H[hourStr].push(record.to);
                        if (record.tdrop_mined == 0 && contractUri.indexOf('thetadrop.com') > -1) {
                            statisticsObj24H[hourStr].volume += record.payment_token_amount;
                        }
                        else {
                            statisticsObj24H[hourStr].volume += record.payment_token_amount * tfuelPrice.price;
                        }
                        statisticsObj24H[hourStr].users = usersArr24H[hourStr].length;
                        statisticsObj24H[hourStr].transactions += 1;
                    }
                    else {
                        usersArr24H[hourStr] = [record.from, record.to];
                        let volume = 0;
                        if (record.tdrop_mined == 0 && contractUri.indexOf('thetadrop.com') > -1) {
                            volume = record.payment_token_amount;
                        }
                        else {
                            volume = record.payment_token_amount * tfuelPrice.price;
                        }
                        statisticsObj24H[hourStr] = {
                            volume: volume,
                            users: 2,
                            transactions: 1,
                            date: record.timestamp
                        };
                    }
                }
                if (record.timestamp > moment().subtract(7, 'days').unix()) {
                    const dayStr = moment(record.timestamp * 1000)
                        .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
                        .format('YYYY-MM-DD');
                    if (statisticsObj7Days[dayStr]) {
                        usersArr7Days[dayStr].includes(record.from) || usersArr7Days[dayStr].push(record.from);
                        usersArr7Days[dayStr].includes(record.to) || usersArr7Days[dayStr].push(record.to);
                        if (record.tdrop_mined == 0 && contractUri.indexOf('thetadrop.com') > -1) {
                            statisticsObj7Days[dayStr].volume += record.payment_token_amount;
                        }
                        else {
                            statisticsObj7Days[dayStr].volume += record.payment_token_amount * tfuelPrice.price;
                        }
                        statisticsObj7Days[dayStr].users = usersArr7Days[dayStr].length;
                        statisticsObj7Days[dayStr].transactions += 1;
                    }
                    else {
                        usersArr7Days[dayStr] = [record.from, record.to];
                        let volume = 0;
                        if (record.tdrop_mined == 0 && contractUri.indexOf('thetadrop.com') > -1) {
                            volume = record.payment_token_amount;
                        }
                        else {
                            volume = record.payment_token_amount * tfuelPrice.price;
                        }
                        statisticsObj7Days[dayStr] = {
                            volume: volume,
                            users: 2,
                            transactions: 1,
                            date: record.timestamp
                        };
                    }
                }
                if (record.timestamp > moment().subtract(30, 'days').unix()) {
                    const dayStr = moment(record.timestamp * 1000)
                        .subtract(-new Date().getTimezoneOffset() + Number(timezoneOffset), 'minutes')
                        .format('YYYY-MM-DD');
                    if (statisticsObj30Days[dayStr]) {
                        usersArr30Days[dayStr].includes(record.from) || usersArr30Days[dayStr].push(record.from);
                        usersArr30Days[dayStr].includes(record.to) || usersArr30Days[dayStr].push(record.to);
                        if (record.tdrop_mined == 0 && contractUri.indexOf('thetadrop.com') > -1) {
                            statisticsObj30Days[dayStr].volume += record.payment_token_amount;
                        }
                        else {
                            statisticsObj30Days[dayStr].volume += record.payment_token_amount * tfuelPrice.price;
                        }
                        statisticsObj30Days[dayStr].users = usersArr30Days[dayStr].length;
                        statisticsObj30Days[dayStr].transactions += 1;
                    }
                    else {
                        let volume = 0;
                        if (record.tdrop_mined == 0 && contractUri.indexOf('thetadrop.com') > -1) {
                            volume = record.payment_token_amount;
                        }
                        else {
                            volume = record.payment_token_amount * tfuelPrice.price;
                        }
                        usersArr30Days[dayStr] = [record.from, record.to];
                        statisticsObj30Days[dayStr] = {
                            volume: volume,
                            users: 2,
                            transactions: 1,
                            date: record.timestamp
                        };
                    }
                }
            }
            for (let i = 23; i >= 0; i--) {
                const hourStr = moment().subtract(i, 'hours').format('YYYY-MM-DD-HH');
                if (statisticsObj24H[hourStr]) {
                    statisticsArr24H.push(statisticsObj24H[hourStr]);
                }
                else {
                    statisticsArr24H.push({
                        date: moment().subtract(i, 'hours').unix(),
                        volume: 0,
                        users: 0,
                        transactions: 0
                    });
                }
            }
            for (let i = 6; i >= 0; i--) {
                const dayStr = moment().subtract(i, 'days').format('YYYY-MM-DD');
                if (statisticsObj7Days[dayStr]) {
                    statisticsArr7Days.push(statisticsObj7Days[dayStr]);
                }
                else {
                    statisticsArr7Days.push({
                        date: moment().subtract(i, 'days').unix(),
                        volume: 0,
                        users: 0,
                        transactions: 0
                    });
                }
            }
            for (let i = 29; i >= 0; i--) {
                const dayStr = moment().subtract(i, 'days').format('YYYY-MM-DD');
                if (statisticsObj30Days[dayStr]) {
                    statisticsArr30Days.push(statisticsObj30Days[dayStr]);
                }
                else {
                    statisticsArr30Days.push({
                        date: moment().subtract(i, 'days').unix(),
                        volume: 0,
                        users: 0,
                        transactions: 0
                    });
                }
            }
            return {
                by_24_hours: statisticsArr24H,
                by_7_days: statisticsArr7Days,
                by_30_days: statisticsArr30Days
            };
        }
        return {
            by_24_hours: [],
            by_30_days: [],
            by_7_days: []
        };
    }
    async nftStatistics24H(contractAddress, contractUri, timezoneOffset) {
        const nftStatistics = await this.nftTransferRecordRepository.find({
            where: {
                smart_contract_address: contractAddress,
                timestamp: (0, typeorm_2.MoreThan)(moment().subtract(31, 'days').unix())
            },
            order: { timestamp: 'ASC' }
        });
        const res = await this.formatNftStatistics(contractUri, nftStatistics, timezoneOffset);
        return res.by_24_hours;
    }
    async nftStatistics7Days(contractAddress, contractUri, timezoneOffset) {
        const nftStatistics = await this.nftTransferRecordRepository.find({
            where: {
                smart_contract_address: contractAddress,
                timestamp: (0, typeorm_2.MoreThan)(moment().subtract(8, 'days').unix())
            },
            order: { timestamp: 'ASC' }
        });
        const res = await this.formatNftStatistics(contractUri, nftStatistics, timezoneOffset);
        return res.by_7_days;
    }
    async nftStatistics30Days(contractAddress, contractUri, timezoneOffset) {
        const nftStatistics = await this.nftTransferRecordRepository.find({
            where: {
                smart_contract_address: contractAddress,
                timestamp: (0, typeorm_2.MoreThan)(moment().subtract(31, 'days').unix())
            },
            order: { timestamp: 'ASC' }
        });
        const res = await this.formatNftStatistics(contractUri, nftStatistics, timezoneOffset);
        return res.by_30_days;
    }
    async isNftExist(name) {
        return await this.nftStatisticsRepository.findOne({
            where: { name: (0, typeorm_2.Like)(`%${name}%`) }
        });
    }
};
NftStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(nft_statistics_entity_1.NftStatisticsEntity, 'nft-statistics')),
    __param(1, (0, typeorm_1.InjectRepository)(nft_transfer_record_entity_1.NftTransferRecordEntity, 'nft')),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        market_service_1.MarketService])
], NftStatisticsService);
exports.NftStatisticsService = NftStatisticsService;
//# sourceMappingURL=nft-statistics.service.js.map