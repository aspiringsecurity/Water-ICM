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
exports.NftStatisticsAnalyseService = void 0;
const common_1 = require("@nestjs/common");
const nft_balance_entity_1 = require("../../block-chain/smart-contract/nft/nft-balance.entity");
const nft_transfer_record_entity_1 = require("../../block-chain/smart-contract/nft/nft-transfer-record.entity");
const smart_contract_entity_1 = require("../../block-chain/smart-contract/smart-contract.entity");
const utils_service_1 = require("../../common/utils.service");
const contact_entity_1 = require("../../contact/contact.entity");
const market_service_1 = require("../../market/market.service");
const typeorm_1 = require("typeorm");
const nft_statistics_entity_1 = require("./nft-statistics.entity");
const fs = require('fs');
const moment = require('moment');
let nftLogoConfig = [];
if (fs.existsSync('resources/nft-logo.json')) {
    nftLogoConfig = JSON.parse(fs.readFileSync('resources/nft-logo.json'));
}
let nftIgnore = [];
if (fs.existsSync('resources/nft-ignore.json')) {
    nftIgnore = JSON.parse(fs.readFileSync('resources/nft-ignore.json'));
}
const const_1 = require("../../const");
const typeorm_2 = require("@nestjs/typeorm");
let NftStatisticsAnalyseService = class NftStatisticsAnalyseService {
    constructor(utilsService, marketService, smartContractConnectionInjected, nftConnectionInjected, nftStatisticsConnectionInjected) {
        this.utilsService = utilsService;
        this.marketService = marketService;
        this.smartContractConnectionInjected = smartContractConnectionInjected;
        this.nftConnectionInjected = nftConnectionInjected;
        this.nftStatisticsConnectionInjected = nftStatisticsConnectionInjected;
        this.logger = new common_1.Logger('nft statistics analyse service');
        this.analyseKey = 'under_analyse';
        this.heightConfigFile = const_1.config.get('ORM_CONFIG')['database'] + 'nft-statistics/record.height';
        this.refetchContractUriId = const_1.config.get('ORM_CONFIG')['database'] + 'nft-statistics/refetch-uri.id';
        this.imgPathRestoreId = const_1.config.get('ORM_CONFIG')['database'] + 'nft-statistics/img-path-restore.id';
    }
    async analyse() {
        try {
            this.logger.debug('start analyse nft data');
            this.smartContractConnectionRunner = this.smartContractConnectionInjected.createQueryRunner();
            this.nftConnectionRunner = this.nftConnectionInjected.createQueryRunner();
            this.nftStatisticsConnectionRunner = this.nftStatisticsConnectionInjected.createQueryRunner();
            await this.nftStatisticsConnectionRunner.startTransaction();
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
            this.tfuelPrice = await this.marketService.getThetaFuelMarketInfo();
            let nftList = [];
            const nftTransferRecordList = await this.nftConnectionRunner.manager.find(nft_transfer_record_entity_1.NftTransferRecordEntity, {
                where: {
                    id: (0, typeorm_1.MoreThan)(startId)
                },
                take: const_1.config.get('NFT_STATISTICS.ANALYSE_NUMBER'),
                order: { id: 'ASC' }
            });
            await this.setZero();
            const promiseArr = [];
            this.logger.debug('nftTransferRecordList.length: ' + nftTransferRecordList.length);
            for (const record of nftTransferRecordList) {
                if (!nftList.includes(record.smart_contract_address)) {
                    nftList.push(record.smart_contract_address);
                }
            }
            const top20 = await this.nftStatisticsConnectionRunner.manager.find(nft_statistics_entity_1.NftStatisticsEntity, {
                order: {
                    last_24_h_users: 'DESC'
                },
                take: 20
            });
            for (const nft of top20) {
                if (!nftList.includes(nft.smart_contract_address)) {
                    nftList.push(nft.smart_contract_address);
                }
            }
            this.logger.debug('nft list length:' + nftList.length);
            for (const nft of nftList) {
                promiseArr.push(this.nftStatistics(nft));
            }
            await Promise.all(promiseArr);
            await this.autoRefetchContractUri();
            if (const_1.config.get('RESTORE_NFT_IMG_PATH')) {
                await this.restoreImgUri();
            }
            await this.nftStatisticsConnectionRunner.commitTransaction();
            if (nftTransferRecordList.length > 0) {
                this.logger.debug('end height:' + Number(nftTransferRecordList[nftTransferRecordList.length - 1].id));
                this.utilsService.updateRecordHeight(this.heightConfigFile, nftTransferRecordList[nftTransferRecordList.length - 1].id);
            }
            (0, utils_service_1.writeSucessExcuteLog)(const_1.config.get('NFT_STATISTICS.MONITOR_PATH'));
        }
        catch (e) {
            console.error(e.message);
            this.logger.error(e.message);
            this.logger.error('rollback');
            await this.nftStatisticsConnectionRunner.rollbackTransaction();
            (0, utils_service_1.writeFailExcuteLog)(const_1.config.get('NFT_STATISTICS.MONITOR_PATH'));
        }
        finally {
            await this.nftStatisticsConnectionRunner.release();
            this.logger.debug('end analyse nft data');
            this.logger.debug('release success');
        }
    }
    async nftStatistics(smartContractAddress) {
        this.logger.debug('start nftStatistics:' + smartContractAddress);
        if (nftIgnore.includes(smartContractAddress)) {
            this.logger.debug('no nedd analyse:' + smartContractAddress);
            return;
        }
        const smartContract = await this.smartContractConnectionRunner.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
            where: { contract_address: smartContractAddress }
        });
        if (!smartContract || smartContract.protocol !== contact_entity_1.SmartContractProtocolEnum.tnt721) {
            this.logger.debug('no contract or not tnt721 protocol:' + smartContractAddress);
            return;
        }
        const allItems = await this.nftConnectionRunner.manager.count(nft_balance_entity_1.NftBalanceEntity, {
            where: {
                owner: (0, typeorm_1.Not)('0x0000000000000000000000000000000000000000'),
                smart_contract_address: smartContractAddress
            }
        });
        const destroyedItems = await this.nftConnectionRunner.manager.count(nft_balance_entity_1.NftBalanceEntity, {
            where: {
                owner: '0x0000000000000000000000000000000000000000',
                smart_contract_address: smartContractAddress
            }
        });
        const uniqueOwners = await this.nftConnectionRunner.query(`select count(distinct(owner)) as _num from nft_balance_entity where nft_balance_entity.smart_contract_address = '${smartContractAddress}' and nft_balance_entity.owner != '0x0000000000000000000000000000000000000000'`);
        const uniqueHolders = uniqueOwners[0]._num;
        const recordList = await this.nftConnectionRunner.manager.find(nft_transfer_record_entity_1.NftTransferRecordEntity, {
            where: {
                smart_contract_address: smartContractAddress,
                timestamp: (0, typeorm_1.MoreThan)(moment().subtract(30, 'days').unix())
            }
        });
        const users24H = [];
        const users7D = [];
        const users30D = [];
        let volume24H = 0, volume7D = 0, volume30D = 0, floorPrice24H = 0, floorPrice7D = 0, floorPrice30D = 0, highestPrice24H = 0, highestPrice7D = 0, highestPrice30D = 0, transactionCount24H = 0, transactionCount7D = 0, transactionCount30D = 0;
        let timestamp = 0;
        for (const record of recordList) {
            if (record.timestamp > timestamp) {
                timestamp = record.timestamp;
            }
            if (record.timestamp >= moment().subtract(24, 'hours').unix()) {
                !users24H.includes(record.from) && users24H.push(record.from);
                !users24H.includes(record.to) && users24H.push(record.to);
                if (record.tdrop_mined == 0 && smartContract.contract_uri.indexOf('thetadrop.com') > -1) {
                    volume24H += record.payment_token_amount;
                    if (record.payment_token_amount > highestPrice24H) {
                        highestPrice24H = record.payment_token_amount;
                    }
                    if (floorPrice24H == 0 ||
                        (record.payment_token_amount < floorPrice24H && record.payment_token_amount != 0)) {
                        floorPrice24H = record.payment_token_amount;
                    }
                    if (record.payment_token_amount > highestPrice24H) {
                        highestPrice24H = record.payment_token_amount;
                    }
                }
                else {
                    volume24H += record.payment_token_amount * this.tfuelPrice.price;
                    if (record.payment_token_amount * this.tfuelPrice.price > highestPrice24H) {
                        highestPrice24H = record.payment_token_amount * this.tfuelPrice.price;
                    }
                    if (floorPrice24H == 0 ||
                        (record.payment_token_amount * this.tfuelPrice.price < floorPrice24H &&
                            record.payment_token_amount != 0)) {
                        floorPrice24H = record.payment_token_amount * this.tfuelPrice.price;
                    }
                    if (record.payment_token_amount * this.tfuelPrice.price > highestPrice24H) {
                        highestPrice24H = record.payment_token_amount * this.tfuelPrice.price;
                    }
                }
                transactionCount24H += 1;
            }
            if (record.timestamp >= moment().subtract(7, 'days').unix()) {
                !users7D.includes(record.from) && users7D.push(record.from);
                !users7D.includes(record.to) && users7D.push(record.to);
                if (record.tdrop_mined == 0 && smartContract.contract_uri.indexOf('thetadrop.com') > -1) {
                    volume7D += record.payment_token_amount;
                    if (record.payment_token_amount > highestPrice7D) {
                        highestPrice7D = record.payment_token_amount;
                    }
                    if (floorPrice7D == 0 ||
                        (record.payment_token_amount < floorPrice7D && record.payment_token_amount != 0)) {
                        floorPrice7D = record.payment_token_amount;
                    }
                    if (record.payment_token_amount > highestPrice7D) {
                        highestPrice7D = record.payment_token_amount;
                    }
                }
                else {
                    volume7D += record.payment_token_amount * this.tfuelPrice.price;
                    if (record.payment_token_amount * this.tfuelPrice.price > highestPrice7D) {
                        highestPrice7D = record.payment_token_amount * this.tfuelPrice.price;
                    }
                    if (floorPrice7D == 0 ||
                        (record.payment_token_amount * this.tfuelPrice.price < floorPrice7D &&
                            record.payment_token_amount != 0)) {
                        floorPrice7D = record.payment_token_amount * this.tfuelPrice.price;
                    }
                }
                transactionCount7D += 1;
            }
            if (record.timestamp >= moment().subtract(30, 'days').unix()) {
                !users30D.includes(record.from) && users30D.push(record.from);
                !users30D.includes(record.to) && users30D.push(record.to);
                if (record.tdrop_mined == 0 && smartContract.contract_uri.indexOf('thetadrop.com') > -1) {
                    volume30D += record.payment_token_amount;
                    if (record.payment_token_amount > highestPrice30D) {
                        highestPrice30D = record.payment_token_amount;
                    }
                    if (floorPrice30D == 0 ||
                        (record.payment_token_amount < floorPrice30D && record.payment_token_amount != 0)) {
                        floorPrice30D = record.payment_token_amount;
                    }
                }
                else {
                    volume30D += record.payment_token_amount * this.tfuelPrice.price;
                    if (record.payment_token_amount * this.tfuelPrice.price > highestPrice30D) {
                        highestPrice30D = record.payment_token_amount * this.tfuelPrice.price;
                    }
                    if (floorPrice30D == 0 ||
                        (record.payment_token_amount * this.tfuelPrice.price < floorPrice30D &&
                            record.payment_token_amount != 0)) {
                        floorPrice30D = record.payment_token_amount * this.tfuelPrice.price;
                    }
                }
                transactionCount30D += 1;
            }
        }
        const nft = await this.nftStatisticsConnectionRunner.manager.findOne(nft_statistics_entity_1.NftStatisticsEntity, {
            where: { smart_contract_address: smartContractAddress }
        });
        if (!nft) {
            const nftStatistics = new nft_statistics_entity_1.NftStatisticsEntity();
            await this.syncNftInfo(smartContract, nftStatistics);
            nftStatistics.name = smartContract.name;
            nftStatistics.smart_contract_address = smartContractAddress;
            nftStatistics.last_24_h_users = users24H.length;
            nftStatistics.last_7_days_users = users7D.length;
            nftStatistics.last_30_days_users = users30D.length;
            nftStatistics.last_24_h_volume = Math.floor(volume24H);
            nftStatistics.last_7_days_volume = Math.floor(volume7D);
            nftStatistics.last_30_days_volume = Math.floor(volume30D);
            nftStatistics.last_24_h_transactions = transactionCount24H;
            nftStatistics.last_7_days_transactions = transactionCount7D;
            nftStatistics.last_30_days_transactions = transactionCount30D;
            nftStatistics.update_timestamp = timestamp;
            nftStatistics.unique_owners = uniqueHolders;
            nftStatistics.items = allItems;
            nftStatistics.destroyed_items = destroyedItems;
            await this.nftStatisticsConnectionRunner.manager.save(nftStatistics);
        }
        else {
            if (nft.contract_uri_update_timestamp < moment().unix() - 24 * 3600) {
                try {
                    nft.contract_uri_update_timestamp = moment().unix();
                    if (nft.contract_uri) {
                        const res = await this.utilsService.getJsonRes(nft.contract_uri);
                        nft.name = res.name;
                        const newImgUri = this.utilsService.getPath(res.image, const_1.config.get('NFT_STATISTICS.STATIC_PATH'));
                        if (newImgUri)
                            nft.img_uri = newImgUri;
                        nft.contract_uri_detail = JSON.stringify(res);
                        if (res.description) {
                            nft.description = res.description;
                        }
                    }
                }
                catch (e) {
                    this.logger.error(e);
                }
            }
            if (!nft.description && nft.contract_uri_detail) {
                const detail = JSON.parse(nft.contract_uri_detail);
                nft.description = detail.description;
            }
            if (!nft.img_uri || !nft.description) {
                const firstToken = await this.nftConnectionRunner.manager.findOne(nft_balance_entity_1.NftBalanceEntity, {
                    order: { id: 'ASC' },
                    where: {
                        smart_contract_address: smartContractAddress,
                        owner: (0, typeorm_1.Not)('0x0000000000000000000000000000000000000000')
                    }
                });
                if (firstToken) {
                    nft.img_uri = nft.img_uri
                        ? nft.img_uri
                        : await this.utilsService.downloadImage(firstToken.img_uri, const_1.config.get('NFT_STATISTICS.STATIC_PATH'));
                    if (firstToken.detail) {
                        const contractInfo = JSON.parse(firstToken.detail);
                        nft.description = nft.description ? nft.description : contractInfo.description;
                    }
                }
            }
            nft.last_24_h_transactions = transactionCount24H;
            nft.last_7_days_transactions = transactionCount7D;
            nft.last_30_days_transactions = transactionCount30D;
            nft.last_24_h_users = users24H.length;
            nft.last_7_days_users = users7D.length;
            nft.last_30_days_users = users30D.length;
            nft.last_24_h_volume = Math.floor(volume24H);
            nft.last_7_days_volume = Math.floor(volume7D);
            nft.last_30_days_volume = Math.floor(volume30D);
            nft.update_timestamp = timestamp;
            nft.last_24_h_floor_price = floorPrice24H;
            nft.last_7_days_floor_price = floorPrice7D;
            nft.last_30_days_floor_price = floorPrice30D;
            nft.last_24_h_highest_price = highestPrice24H;
            nft.last_7_days_highest_price = highestPrice7D;
            nft.last_30_days_highest_price = highestPrice30D;
            nft.unique_owners = uniqueHolders;
            nft.items = allItems;
            nft.destroyed_items = destroyedItems;
            await this.nftStatisticsConnectionRunner.manager.save(nft);
        }
    }
    async setZero() {
        await this.nftStatisticsConnectionRunner.manager.update(nft_statistics_entity_1.NftStatisticsEntity, {
            update_timestamp: (0, typeorm_1.LessThan)(moment().subtract(1, 'days').unix())
        }, {
            last_24_h_volume: 0,
            last_24_h_users: 0,
            last_24_h_transactions: 0
        });
        await this.nftStatisticsConnectionRunner.manager.update(nft_statistics_entity_1.NftStatisticsEntity, {
            update_timestamp: (0, typeorm_1.LessThan)(moment().subtract(7, 'days').unix())
        }, {
            last_7_days_volume: 0,
            last_7_days_users: 0,
            last_7_days_transactions: 0
        });
        await this.nftStatisticsConnectionRunner.manager.update(nft_statistics_entity_1.NftStatisticsEntity, {
            update_timestamp: (0, typeorm_1.LessThan)(moment().subtract(30, 'days').unix())
        }, {
            last_30_days_volume: 0,
            last_30_days_users: 0,
            last_30_days_transactions: 0
        });
    }
    async updateNftsImgUri() {
        for (const logo of nftLogoConfig) {
            if (logo.length < 2)
                continue;
            const nft = await this.nftStatisticsConnectionRunner.manager.findOne(nft_statistics_entity_1.NftStatisticsEntity, {
                where: { smart_contract_address: logo[0].toLowerCase() }
            });
            if (nft) {
                const imgUri = this.utilsService.getPath(logo[1], const_1.config.get('NFT_STATISTICS.STATIC_PATH'));
                if (imgUri == nft.img_uri)
                    continue;
                nft.img_uri = await this.utilsService.downloadImage(logo[1], const_1.config.get('NFT_STATISTICS.STATIC_PATH'));
                await this.nftStatisticsConnectionRunner.manager.save(nft);
            }
        }
    }
    async syncNftInfo(smartContract, nftStatistics) {
        const firtstNft = await this.nftConnectionRunner.manager.findOne(nft_balance_entity_1.NftBalanceEntity, {
            where: {
                smart_contract_address: smartContract.contract_address
            },
            order: {
                id: 'ASC'
            }
        });
        if (!smartContract.contract_uri && firtstNft) {
            nftStatistics.contract_uri = firtstNft.contract_uri;
            nftStatistics.contract_uri_detail = firtstNft.detail;
            nftStatistics.img_uri = firtstNft.img_uri;
        }
        if (smartContract.contract_uri && smartContract.contract_uri_detail) {
            nftStatistics.contract_uri = smartContract.contract_uri;
            nftStatistics.contract_uri_detail = smartContract.contract_uri_detail;
            const contractDetail = JSON.parse(smartContract.contract_uri_detail);
            nftStatistics.description = contractDetail.description;
            if (this.utilsService.getPath(contractDetail.image, const_1.config.get('NFT_STATISTICS.STATIC_PATH'))) {
                nftStatistics.img_uri = await this.utilsService.downloadImage(contractDetail.image, const_1.config.get('NFT_STATISTICS.STATIC_PATH'));
            }
        }
        if (smartContract.contract_uri && !smartContract.contract_uri_detail) {
            try {
                const res = await this.utilsService.getJsonRes(smartContract.contract_uri);
                nftStatistics.name = res.name;
                const newImgUri = this.utilsService.getPath(res.image, const_1.config.get('NFT_STATISTICS.STATIC_PATH'));
                if (newImgUri)
                    nftStatistics.img_uri = newImgUri;
                nftStatistics.contract_uri_detail = JSON.stringify(res);
            }
            catch (e) {
                this.logger.error(e);
            }
        }
        if (!nftStatistics.img_uri && firtstNft) {
            nftStatistics.img_uri = firtstNft.img_uri;
        }
    }
    async autoRefetchContractUri() {
        const startId = this.utilsService.getRecordHeight(this.refetchContractUriId);
        const nfts = await this.nftStatisticsConnectionRunner.manager.find(nft_statistics_entity_1.NftStatisticsEntity, {
            where: {
                id: (0, typeorm_1.MoreThanOrEqual)(startId)
            },
            order: {
                id: 'ASC'
            },
            take: 100
        });
        if (nfts.length == 0) {
            return this.utilsService.updateRecordHeight(this.refetchContractUriId, 0);
        }
        for (const nft of nfts) {
            if (nft.refetch_times >= 3)
                continue;
            const smartContract = await this.smartContractConnectionRunner.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
                where: {
                    contract_address: nft.smart_contract_address
                }
            });
            if (smartContract) {
                await this.syncNftInfo(smartContract, nft);
                nft.refetch_times = nft.refetch_times + 1;
                await this.nftStatisticsConnectionRunner.manager.save(nft);
            }
        }
        this.utilsService.updateRecordHeight(this.refetchContractUriId, nfts[nfts.length - 1].id);
    }
    async restoreImgUri() {
        const startId = this.utilsService.getRecordHeight(this.imgPathRestoreId);
        const nfts = await this.nftStatisticsConnectionRunner.manager.find(nft_statistics_entity_1.NftStatisticsEntity, {
            where: {
                id: (0, typeorm_1.MoreThanOrEqual)(startId)
            },
            order: {
                id: 'ASC'
            },
            take: 100
        });
        if (nfts.length == 0) {
            return;
        }
        for (const nft of nfts) {
            const smartContract = await this.smartContractConnectionRunner.manager.findOne(smart_contract_entity_1.SmartContractEntity, {
                where: {
                    contract_address: nft.smart_contract_address
                }
            });
            if (smartContract) {
                await this.syncNftInfo(smartContract, nft);
                nft.refetch_times = nft.refetch_times + 1;
                await this.nftStatisticsConnectionRunner.manager.save(nft);
            }
        }
        this.utilsService.updateRecordHeight(this.imgPathRestoreId, nfts[nfts.length - 1].id);
    }
    async downloadAllImg() {
        const nfts = await this.nftStatisticsConnectionRunner.manager.find(nft_statistics_entity_1.NftStatisticsEntity);
        for (const nft of nfts) {
            if (nft.img_uri) {
                nft.img_uri = await this.utilsService.downloadImage(nft.img_uri, const_1.config.get('NFT_STATISTICS.STATIC_PATH'));
                await this.nftStatisticsConnectionRunner.manager.save(nft);
            }
        }
    }
};
NftStatisticsAnalyseService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_2.InjectDataSource)('smart_contract')),
    __param(3, (0, typeorm_2.InjectDataSource)('nft')),
    __param(4, (0, typeorm_2.InjectDataSource)('nft-statistics')),
    __metadata("design:paramtypes", [utils_service_1.UtilsService,
        market_service_1.MarketService,
        typeorm_1.DataSource,
        typeorm_1.DataSource,
        typeorm_1.DataSource])
], NftStatisticsAnalyseService);
exports.NftStatisticsAnalyseService = NftStatisticsAnalyseService;
//# sourceMappingURL=nft-statistics-analyse.service.js.map